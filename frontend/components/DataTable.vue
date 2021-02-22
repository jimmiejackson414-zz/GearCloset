<template>
  <div
    aria-label="Pack List"
    class="table-container"
    role="table">
    <div
      v-for="(category, i) in data.categories"
      :key="i"
      class="flex-table column"
      role="rowgroup">
      <div
        class="flex-row first group-header font-weight-bold"
        role="cell">
        <v-btn
          icon
          @click="handleDeleteCategory(category)">
          <client-only>
            <unicon
              class="pointer"
              :fill="errorColor"
              height="20"
              name="trash-alt"
              width="20" />
          </client-only>
        </v-btn>
        <click-to-edit
          :unique-identifier="`title${category.id}Ref`"
          :value="category.name"
          @handle-update-item="handleUpdateCategory($event, category, 'name')" />
      </div>
      <div
        class="flex-table header mb-2"
        role="rowgroup">
        <div
          v-for="(header, index) in headers"
          :key="index"
          :class="`flex-row ${header.padding} justify-${header.align} ${index === 0 ? 'first' : ''}`"
          role="columnheader"
          :style="{ width: `${header.width}`}">
          <p class="mb-0 text-body-2 font-weight-medium">
            {{ header.label }}
          </p>
        </div>
      </div>

      <!-- Need to get drag 'n drop working -->
      <draggable
        v-bind="dragOptions"
        class="group-items"
        handle=".drag"
        :list="category.items"
        @end="drag = false"
        @start="drag = true">
        <transition-group
          :name="!drag ? 'flip-list' : null"
          type="transition">
          <div
            v-for="item in category.items"
            :key="item.id"
            class="flex-table row"
            role="rolegroup">
            <!-- Drag Handle -->
            <div
              :class="`flex-cell drag d-flex align-center justify-center text-${headers[0].align}`"
              role="cell"
              :style="{ width: `${headers[0].width}`}">
              <client-only>
                <unicon
                  class="drag"
                  fill="#9e9e9e"
                  height="20"
                  name="grip-horizontal-line"
                  width="20" />
              </client-only>
            </div>

            <!-- Generic Type Click To Edit -->
            <div
              :class="`flex-cell text-${headers[1].align}`"
              role="cell"
              :style="{ width: `${headers[1].width}`}">
              <click-to-edit
                :style="{ fontSize: '0.875rem' }"
                :unique-identifier="`type${item.id}`"
                :value="item.generic_type"
                @handle-update-item="handleUpdateItem($event, item, 'generic_type')" />
            </div>

            <!-- Name Click To Edit -->
            <div
              :class="`flex-cell text-${headers[2].align}`"
              role="cell"
              :style="{ width: `${headers[2].width}`}">
              <click-to-edit
                :style="{ fontSize: '0.875rem' }"
                :unique-identifier="`name${item.id}Ref`"
                :value="item.name"
                @handle-update-item="handleUpdateItem($event, item, 'name')" />
            </div>

            <!-- Consumable Toggle -->
            <div
              :class="`flex-cell text-${headers[3].align}`"
              role="cell"
              :style="{ width: `${headers[3].width}`}">
              <v-btn
                :class="[{ active: item.consumable }, 'consumable-btn']"
                icon
                :ripple="false"
                text
                @click.native="handleUpdateBooleanItem(item, 'consumable')">
                <client-only>
                  <unicon
                    fill="#9e9e9e"
                    height="20"
                    name="utensils-alt"
                    width="20" />
                </client-only>
              </v-btn>
            </div>

            <!-- Worn Toggle -->
            <div
              :class="`flex-cell text-${headers[4].align}`"
              role="cell"
              :style="{ width: `${headers[4].width}`}">
              <v-btn
                :class="[{ active: item.worn }, 'worn-btn']"
                icon
                :ripple="false"
                text
                @click="handleUpdateBooleanItem(item, 'worn')">
                <client-only>
                  <unicon
                    fill="#9e9e9e"
                    height="20"
                    name="layer-group"
                    width="20" />
                </client-only>
              </v-btn>
            </div>

            <!-- Weight Click To Edit -->
            <div
              :class="`flex-cell text-${headers[5].align}`"
              role="cell"
              :style="{ width: `${headers[5].width}`}">
              <span class="weight-column">
                <click-to-edit
                  :style="{ fontSize: '0.875rem' }"
                  :unique-identifier="`weight${item.id}Ref`"
                  :value="item | displayWeight(item.unit)"
                  @handle-update-item="updateItem($event, item, 'weight')" />
                <v-select
                  dense
                  hide-details
                  :items="weightItems"
                  :value="item.unit"
                  @change="handleUpdateUnits($event, item)" />
              </span>
            </div>

            <!-- Price Click To Edit -->
            <div
              :class="`flex-cell text-${headers[6].align}`"
              role="cell"
              :style="{ width: `${headers[6].width}`}">
              <click-to-edit
                :custom-class="'price-column'"
                :style="{ fontSize: '0.875rem', maxWidth: '100px', margin: '0 auto' }"
                :unique-identifier="`price${item.id}Ref`"
                :value="itemPrice(item)"
                @handle-update-item="handleUpdateItem($event, item, 'price')">
                <client-only>
                  <unicon
                    fill="#494f57"
                    height="14"
                    name="dollar-alt"
                    width="14" />
                </client-only>
              </click-to-edit>
            </div>

            <!-- Quantity Click To Edit -->
            <div
              :class="`flex-cell text-${headers[7].align}`"
              role="cell"
              :style="{ width: `${headers[7].width}`}">
              <click-to-edit
                :custom-class="'quantity-column'"
                :style="{ fontSize: '0.875rem', width: '60px', margin: '0 auto', textAlign: 'center' }"
                type="number"
                :unique-identifier="`quantity${item.id}Ref`"
                :value="String(item.quantity)"
                @handle-update-item="handleUpdateItem($event, item, 'quantity')" />
            </div>

            <!-- Remove Item Button -->
            <div
              :class="`flex-cell d-flex justify-center align-center remove text-${headers[8].align}`"
              role="cell"
              :style="{ width: `${headers[8].width}`}">
              <v-btn
                icon
                x-small
                @click="handleRemoveRow(item, category)">
                <client-only>
                  <unicon
                    class="pointer"
                    :fill="errorColor"
                    height="20"
                    name="trash-alt"
                    width="20" />
                </client-only>
              </v-btn>
            </div>
          </div>
        </transition-group>
      </draggable>

      <!-- Totals -->
      <div
        class="flex-table footer mb-4"
        role="rowgroup">
        <div
          class="flex-row"
          role="columnheader">
          <div
            :class="`flex-cell drag d-flex align-center justify-center text-${headers[0].align}`"
            role="cell"
            :style="{ width: `${headers[0].width}`}">
          </div>

          <div
            class="flex-cell text-left font-weight-bold mb-2 text-body-2 pl-5"
            role="cell"
            :style="{ width: `${headers[1].width}`}">
            Totals:
          </div>

          <div
            :class="`flex-cell text-${headers[2].align}`"
            role="cell"
            :style="{ width: `${headers[2].width}`}">
          </div>

          <div
            :class="`flex-cell text-${headers[3].align}`"
            role="cell"
            :style="{ width: `${headers[3].width}`}">
          </div>

          <div
            :class="`flex-cell text-${headers[4].align}`"
            role="cell"
            :style="{ width: `${headers[4].width}`}">
          </div>

          <div
            :class="`flex-cell text-${headers[5].align}`"
            role="cell"
            :style="{ width: `${headers[5].width}`}">
            <span
              class="weight-column align-center"
              :style="{ fontSize: '0.875rem' }">
              {{ category | displayCategoryWeight(category.unit) }}
              <v-select
                dense
                hide-details
                :items="weightItems"
                :value="category.unit"
                @change="handleUpdateUnits($event, category)" />
            </span>
          </div>

          <div
            :class="`flex-cell text-${headers[6].align}`"
            role="cell"
            :style="{ width: `${headers[6].width}`}">
            <span class="price-total">
              <client-only>
                <unicon
                  fill="#494f57"
                  height="14"
                  name="dollar-alt"
                  width="14" />
              </client-only>
              {{ priceTotal(category.items) }}
            </span>
          </div>

          <div
            :class="`flex-cell quantity-total text-${headers[7].align}`"
            role="cell"
            :style="{ width: `${headers[7].width}`}">
            {{ quantityTotal(category.items) }}
          </div>

          <!-- Remove Item Button -->
          <div
            :class="`flex-cell d-flex justify-center align-center remove text-${headers[8].align}`"
            role="cell"
            :style="{ width: `${headers[8].width}`}">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import convert from 'convert-units';
  import draggable from 'vuedraggable';
  import ClickToEdit from '~/components/ClickToEdit.vue';
  import { convertToDollars } from '~/helpers/functions';

  export default {
    props: {
      data: {
        type: Object,
        default: () => {}
      }
    },

    data () {
      return {
        drag: false,
        errorColor: '',
        headers: [
          { label: '', align: 'start', field: 'drag', sortable: false, width: '3%', padding: '' },
          { label: 'Type', align: 'start', field: 'generic_type', sortable: true, width: '15%', padding: 'pl-5' },
          { label: 'Name', align: 'start', field: 'name', sortable: true, width: '19%', padding: 'pl-5' },
          { label: 'Consumable', align: 'center', field: 'consumable', type: 'boolean', sortable: true, width: '12%', padding: '' },
          { label: 'Worn', align: 'center', field: 'worn', type: 'boolean', sortable: true, width: '10%', padding: '' },
          { label: 'Weight', align: 'center', field: 'weight', type: 'decimal', sortable: true, width: '17%', padding: '' },
          { label: 'Price', align: 'center', field: 'price', type: 'decimal', sortable: true, width: '13%', padding: '' },
          { label: 'Quantity', align: 'center', field: 'quantity', type: 'number', sortable: true, width: '8%', padding: '' },
          { label: '', align: 'end', field: 'remove', sortable: false, width: '3%', padding: '' }
        ],
        primaryColor: '',
        weightItems: ['oz', 'lb', 'g', 'kg']
      };
    },

    computed: {
      dragOptions () {
        return {
          animation: 200,
          group: 'category',
          disabled: false,
          ghostClass: 'ghost'
        };
      }
    },

    methods: {
      ...mapActions({
        updateCategory: 'entities/categories/updateCategory',
        updateItem: 'entities/items/updateItem'
      }),
      handleDeleteCategory () {
        console.log('handleDeleteCategory');
      },
      handleRemoveRow () {
        console.log('handleRemoveRow');
      },
      async handleUpdateBooleanItem (item, field) {
        const payload = { variables: { id: item.id, [field]: !item[field] } };
        await this.updateItem(payload);
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

        // handle floating point issue converting between string & number
        if (field === 'price') {
          payload.variables.price = Number((value * 100)).toFixed(2);
        }

        // convert back to g for storage in db
        if (field === 'weight') {
          payload.variables.weight = convert(value).from(item.unit).to('g');
        }

        await this.updateItem(payload);
      },
      handleUpdateUnits () {
        console.log('handleUpdateUnits');
      },
      itemPrice (item) {
        return convertToDollars(item.price);
      },
      quantityTotal (items) {
        return items.reduce((sum, elem) => sum + elem.quantity, 0);
      },
      priceTotal (items) {
        const reduced = items.reduce((sum, elem) => sum + Number(elem.price), 0);
        return convertToDollars(reduced);
      }
    },

    mounted () {
      this.primaryColor = this.$nuxt.$vuetify.theme.themes.light.primary;
      this.errorColor = this.$nuxt.$vuetify.theme.themes.light.error;
    },

    components: {
      ClickToEdit,
      draggable
    }
  };
</script>

<style lang="scss" scoped>
  $table-header: #1976D2;
  $table-header-border: #1565C0;
  $table-border: #d9d9d9;
  $row-bg: #f4f2f1;

  .table-container {
    display: block;

    div {
      box-sizing: border-box;
    }
  }

  .flex-table {
    display: flex;
    flex-flow: row wrap;
    transition: 0.5s;

    &.column {
      .flex-row {
        &.group-header {
          background: $row-bg;
          border-radius: 4px;
          margin-bottom: 1rem;

          .v-btn {
            opacity: 0;
            transition: 0.2s opacity ease-in-out;
          }

          &:hover {
            .v-btn {
              opacity: 1;
            }
          }
        }
      }
    }

    &.row {
      margin: 0;

      &:hover {
        background: #F5F5F5;
        transition: 500ms;
      }

      .flex-cell {
        p {
          margin-bottom: 0;
        }

        &.drag, &.remove {
          opacity: 0;
          transition: 0.25s opacity ease-in-out;
        }
      }

      &:hover {
        .flex-cell {
          &.drag, &.remove {
            opacity: 1;
          }
        }
      }
    }
  }

  .flex-row {
    text-align: center;
    padding: 0.5em 0.5em;
  }

  .rowspan {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: center;
  }

  .column {
    display: flex;
    flex-flow: column;
    width: 100%;
    padding: 0;

    .flex-row {
      display: flex;
      flex-flow: row wrap;
      width: 100%;
      padding: 0;
      border: 0;
    }
  }

  .flex-cell {
    text-align: center;
    padding: 0 0.5em;
  }

  @media all and (max-width: 767px) {
    .flex-row {
      width: calc(100% / 3); //1px = border right

    &.first {
      width: 100%;
    }
    }

    .column {
      width: 100%;
    }
  }

  @media all and (max-width: 430px) {

    .flex-table {
      .flex-row {
        border-bottom: 0;
      }
    }

    .header {
      .flex-row {
        border-bottom: solid 1px;
      }
    }

    .flex-row {
      width: 100%; //1px = border right

    &.first {
      width: 100%;
    }
    }

    .column {
      width: 100%;
    }

    .flex-cell {
      width: 100%; //1px = border right
    }
  }
</style>

.<style lang="scss">
  .flex-cell, .footer {
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

    .flex-row {
      .flex-cell {
        align-items: center;
        display: flex;
        height: 40px;
      }
    }

    .weight-column {
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
    }

    .unicon {
      align-items: center;
      display: flex;
      justify-content: center;
    }

    .weight-column {
      align-items: center;
      display: flex;
      margin: 0 0 0 auto;
      width: 100%;

      .v-input {
        margin: 0 0 0 10px;
        /* max-width: 57px; */

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
      font-size: 0.875rem;
      justify-content: center;
      padding: 0 12px;
    }

    .quantity-total {
      font-size: 0.875rem;
      padding: 0 12px;
    }
  }

  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
  .group-items {
    min-height: 20px;
  }
</style>
