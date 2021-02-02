<template>
  <div class="items-list-styles">
    <div class="items-list-container">
      <h2 class="text-h6 ml-3">
        Pack Items
      </h2>

      <client-only>
        <data-table :data="activePack" />
      </client-only>

      <!-- Add New Category Button -->
      <v-container
        class="new-category-container">
        <v-row>
          <v-col class="col-12 pl-0">
            <v-btn
              class="pl-1"
              :ripple="false"
              text
              @click="handleAddNewCategory">
              <client-only>
                <unicon
                  :fill="primaryColor"
                  height="18"
                  name="plus"
                  width="18" />
              </client-only>
              <p class="body-2 primary--text mb-0 ml-3">
                Add New Category
              </p>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
  /* eslint-disable camelcase */
  import { mapActions } from 'vuex';
  import convert from 'convert-units';
  import DataTable from '~/components/DataTable.vue';

  export default {
    props: {
      activePack: {
        type: Object,
        default: () => {}
      }
    },

    data () {
      return {
        errorColor: '',
        primaryColor: '',
        weightItems: ['oz', 'lb', 'g', 'kg']
      };
    },

    methods: {
      ...mapActions({
        createCategory: 'entities/categories/createCategory',
        createItem: 'entities/items/createItem',
        removeItem: 'entities/items/removeItem',
        success: 'alert/success',
        updateCategory: 'entities/categories/updateCategory',
        updateItem: 'entities/items/updateItem',
        updateItemPosition: 'entities/items/updateItemPosition'
      }),
      async handleAddNewCategory () {
        const payload = { variables: { name: 'New Category', pack_id: this.activePack.id } };
        await this.createCategory(payload);
      },
      async handleAddNewItem (category_id) {
        const payload = { variables: { category_id, pack_id: this.activePack.id } };
        await this.createItem(payload);
      },
      handleDeleteCategory (category) {
        this.$emit('handle-delete-category', category);
      },
      async handleRemoveRow (item, category) {
        const payload = {
          variables: {
            item_id: item.id,
            category_id: category.id
          },
          pack_id: this.activePack.id
        };

        await this.removeItem(payload);
      },
      async handleUpdateCategory (value, category, field) {
        // return if value hasn't changed
        if (value === String(category[field])) { return; }

        const payload = { variables: { id: category.id, [field]: value } };
        await this.updateCategory(payload);
      },
      async handleUpdateItem (value, item, field) {
        // return if value hasn't changed
        if (value === String(item[field])) { return; }

        const payload = {
          variables: {
            id: item.id,
            [field]: value
          }
        };

        // // handle floating point issue converting between string & number
        if (field === 'price') {
          payload.variables.price = Number((value * 100).toFixed(2));
        }

        // // convert back to mg for storage in db
        if (field === 'weight') {
          payload.variables.weight = convert(value).from(item.unit).to('g');
          this.$emit('trigger-rerender');
        }

        if (field === 'quantity' || field === 'theme') {
          this.$emit('trigger-rerender');
        }

        await this.updateItem(payload);
      },
      handleUpdateUnits (event, item) {
        if ('quantity' in item) {
          this.handleUpdateItem(event, item, 'unit');
        } else {
          this.handleUpdateCategory(event, item, 'unit');
        }
      },
      async updateBooleanItem (item, field) {
        const payload = { variables: { id: item.id, [field]: !item[field] } };
        await this.updateItem(payload);
      }
    },

    mounted () {
      this.primaryColor = this.$nuxt.$vuetify.theme.themes.light.primary;
      this.errorColor = this.$nuxt.$vuetify.theme.themes.light.error;

      // const el = document.querySelector('.items-table-container tbody');
      // this.sortable = Sortable.create(el, {
      //   onEnd ({ newIndex, oldIndex }) {
      //     console.log({ newIndex });
      //     console.log({ oldIndex });
      //   },
      //   animation: 150,
      //   draggable: '.draggable-row',
      //   easing: 'cubic-bezier(1, 0, 0, 1)',
      //   group: 'items',
      //   handle: '.drag',
      //   swapThreshold: 0.25
      // });
    },

    components: {
      DataTable
    }
  };
</script>

<style lang="scss">
  .category-title {
    align-items: center;
    display: grid;
    grid-template-columns: auto 1fr;

    .unicon {
      display: flex;
      opacity: 0;
      transition: 0.15s opacity ease-in-out;
    }

    &:hover {
      .unicon {
        opacity: 1;
      }
    }
  }

  .items-table-container {
    width: 100%;

    tr {
      &.group-header {
        background: #eeeeee;
      }

      td {
        &:last-child svg, &:first-child svg {
          opacity   : 0;
          transition: 0.2s opacity $cubicBezier;
        }

        .price-column, .quantity-column {
          input {
            text-align: center;
          }
        }

        .price-column {
          .click-to-edit {
            .v-input__slot {
              input {
                text-align: center;
              }
            }
          }
        }

        .weight-column {
          display: grid;
          grid-template-columns: auto minmax(auto, 57px);
          margin: 0 auto;
          max-width: max-content;

          .v-select {
            .v-input__slot {
              &:before, &:after {
                border: none;
              }
            }
          }

          .click-to-edit {
            .v-input__slot {
              input {
                text-align: right;
              }
            }
          }

          input {
            max-width: 50px;
          }
        }

        .v-btn {
          &.active {
            &.worn-btn {
              background-color: $accentDarkest;
              svg {
                fill: white;
              }
            }

            &.consumable-btn {
              background-color: darken($secondaryLight, 10%);

              svg {
                fill: white;
              }
            }
          }

          &.remove {
            svg {
              fill: $error;
            }
          }
        }
      }

      &:hover {
        td:first-child svg, td:last-child svg {
          opacity: 1;
        }
      }

      &.totals {
        .weight-column {
          align-items: center;
          display: flex;
          margin: 0 0 0 auto;
          width: 100%;

          .v-input {
            margin: 0 0 0 10px;
            max-width: 57px;

            .v-select__selection {
              margin-bottom: 0;
              margin-top: 0;
            }

            .v-icon {
              margin-top: 0;
            }
          }
        }

        .price-total {
          display: flex;
          justify-content: center;
        }
      }

      &.add-new-item-row {
        svg {
          opacity: 1 !important;
        }
      }
    }
  }

  .new-category-container {
    border-top: 1px solid $grey5;
  }

  .flip-list-move {
    transition: transform 0.15s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }

</style>
