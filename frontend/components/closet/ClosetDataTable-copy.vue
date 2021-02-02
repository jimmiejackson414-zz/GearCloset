<template>
  <div class="items-list-styles">
    <div class="items-list-container">
      <h2 class="text-h6 ml-3">
        Pack Items
      </h2>
      <v-row
        v-for="(category, index) in activePack.categories"
        :key="category.id"
        :class="['categories-container', activePack.categories.length === index + 1 ? 'last' : '']">
        <v-lazy
          min-height="100"
          :options="{ threshold: .25}"
          :style="{ width: '100%' }"
          transition="fade-transition"
          :value="false">
          <v-col
            cols="12">
            <div class="category-title">
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
            <v-data-table
              v-if="category.items"
              :ref="`sortableTable${index}`"
              calculate-widths
              class="items-table-container"
              dense
              disable-pagination
              :headers="headers"
              hide-default-footer
              :items="category.items"
              :mobile-breakpoint="0">
              <template #body="{ items }">
                <draggable
                  v-bind="dragOptions"
                  class="dragArea"
                  group="items"
                  handle=".drag"
                  :list="items"
                  tag="tbody"
                  @end="handleDragEnd"
                  @start="drag = true">
                  <tr
                    v-for="(item, i) in items"
                    :key="item.id">
                    <!-- Drag Handle -->
                    <td
                      :key="`${item.id}-drag-${i}-${index}`"
                      class="px-0 py-1">
                      <client-only>
                        <unicon
                          class="drag"
                          fill="#9e9e9e"
                          height="20"
                          name="grip-horizontal-line"
                          width="20" />
                      </client-only>
                    </td>

                    <!-- Generic Type Click To Edit -->
                    <td
                      :key="`${item.id}-type-${i}-${index}`"
                      class="px-0 py-1">
                      <click-to-edit
                        :style="{ fontSize: '0.875rem' }"
                        :unique-identifier="`type${item.id}`"
                        :value="item.generic_type"
                        @handle-update-item="handleUpdateItem($event, item, 'generic_type')" />
                    </td>

                    <!-- Name Click To Edit -->
                    <td
                      :key="`${item.id}-name-${i}-${index}`"
                      class="px-0 py-1">
                      <click-to-edit
                        :style="{ fontSize: '0.875rem' }"
                        :unique-identifier="`name${item.id}Ref`"
                        :value="item.name"
                        @handle-update-item="handleUpdateItem($event, item, 'name')" />
                    </td>

                    <!-- Consumable Toggle -->
                    <td
                      :key="`${item.id}-consumable-${i}-${index}`"
                      class="text-center px-0 py-1">
                      <v-btn
                        :class="[{ active: item.consumable }, 'consumable-btn']"
                        icon
                        :ripple="false"
                        text
                        @click.native="updateBooleanItem(item, 'consumable')">
                        <client-only>
                          <unicon
                            fill="#9e9e9e"
                            height="20"
                            name="utensils-alt"
                            width="20" />
                        </client-only>
                      </v-btn>
                    </td>

                    <!-- Worn Toggle -->
                    <td
                      :key="`${item.id}-worn-${i}-${index}`"
                      class="text-center px-0 py-1">
                      <v-btn
                        :class="[{ active: item.worn }, 'worn-btn']"
                        icon
                        :ripple="false"
                        text
                        @click="updateBooleanItem(item, 'worn')">
                        <client-only>
                          <unicon
                            fill="#9e9e9e"
                            height="20"
                            name="layer-group"
                            width="20" />
                        </client-only>
                      </v-btn>
                    </td>

                    <!-- Weight Click To Edit and Dropdown -->
                    <weight-row
                      :identifier="`${item.id}-weight-${i}-${index}`"
                      :item="item"
                      @handle-update-item="handleUpdateItem"
                      @handle-update-units="handleUpdateUnits" />

                    <!-- Price Click To Edit -->
                    <td
                      :key="`${item.id}-price-${i}-${index}`"
                      class="px-0 py-1">
                      <client-only>
                        <click-to-edit
                          :custom-class="'price-column'"
                          :style="{ fontSize: '0.875rem', maxWidth: '100px', margin: '0 auto' }"
                          :unique-identifier="`price${item.id}Ref`"
                          :value="itemPrice(item)"
                          @handle-update-item="handleUpdateItem($event, item, 'price')">
                          <unicon
                            fill="#494f57"
                            height="14"
                            name="dollar-alt"
                            width="14" />
                        </click-to-edit>
                      </client-only>
                    </td>

                    <!-- Quantity Click To Edit -->
                    <td
                      :key="`${item.id}-quantity-${i}-${index}`"
                      class="px-0 py-1">
                      <click-to-edit
                        :custom-class="'quantity-column'"
                        :style="{ fontSize: '0.875rem', width: '60px', margin: '0 auto' }"
                        type="number"
                        :unique-identifier="`quantity${item.id}Ref`"
                        :value="String(item.quantity)"
                        @handle-update-item="handleUpdateItem($event, item, 'quantity')" />
                    </td>

                    <!-- Remove button -->
                    <td
                      :key="`${item.id}-remove-${i}-${index}`"
                      class="px-0 py-1">
                      <v-btn
                        icon
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
                    </td>
                  </tr>

                  <!-- Totals -->
                  <tr class="totals cursor-default">
                    <td :colspan="1"></td>
                    <td :colspan="1">
                      <span class="font-weight-bold px-3">Totals:</span>
                    </td>
                    <td :colspan="1"></td>
                    <td :colspan="1"></td>
                    <td :colspan="1"></td>

                    <!-- Weight Total -->
                    <td
                      class="text-center"
                      :colspan="1">
                      <span class="weight-column">
                        {{ category | displayCategoryWeight(category.unit) }}
                        <v-select
                          dense
                          hide-details
                          :items="weightItems"
                          :value="category.unit"
                          @change="handleUpdateUnits($event, category)" />
                      </span>
                    </td>

                    <!-- Price Total -->
                    <td
                      class="text-center"
                      :colspan="1">
                      <span class="price-total">
                        <client-only>
                          <unicon
                            fill="#494f57"
                            height="14"
                            name="dollar-alt"
                            width="14" />
                        </client-only>
                        {{ priceTotal(items) }}
                      </span>
                    </td>

                    <!-- Quantity Total -->
                    <td
                      class="text-center pr-4"
                      :colspan="1">
                      {{ quantityTotal(items) }}
                    </td>
                    <td :colspan="1"></td>
                  </tr>
                </draggable>
              </template>
            </v-data-table>

            <!-- Add New Item Button -->
            <v-btn
              class="mb-8"
              :ripple="false"
              text
              @click="handleAddNewItem(category.id)">
              <client-only>
                <unicon
                  :fill="primaryColor"
                  height="18"
                  name="plus"
                  width="18" />
              </client-only>
              <p class="body-2 primary--text mb-0 ml-3">
                Add New Item
              </p>
            </v-btn>
          </v-col>
        </v-lazy>
      </v-row>

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
  import draggable from 'vuedraggable';
  import WeightRow from './WeightRow.vue';
  import { convertToDollars } from '~/helpers/functions';
  import ClickToEdit from '~/components/ClickToEdit.vue';

  export default {
    props: {
      activePack: {
        type: Object,
        default: () => {}
      }
    },

    data: () => ({
      drag: false,
      errorColor: '',
      headers: [
        { text: '', align: 'left', sortable: false, value: 'drag' },
        { text: 'Type', align: 'left', sortable: true, value: 'generic_type' },
        { text: 'Name', align: 'left', sortable: true, value: 'name' },
        { text: 'Consumable', align: 'center', sortable: true, value: 'consumable' },
        { text: 'Worn', align: 'center', sortable: true, value: 'worn' },
        { text: 'Weight', align: 'center', sortable: true, value: 'weight' },
        { text: 'Price', align: 'center', sortable: true, value: 'price' },
        { text: 'Quantity', align: 'center', sortable: true, value: 'quantity' },
        { text: '', align: 'right', sortable: false, value: 'remove' }
      ],
      primaryColor: '',
      weightItems: ['oz', 'lb', 'g', 'kg']
    }),

    computed: {
      dragOptions () {
        return {
          animation: 200,
          group: 'description',
          disabled: false,
          ghostClass: 'ghost'
        };
      }
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
      handleDragEnd (evt) {
        console.log({ evt });
        // evt.newIndex
        // evt.oldIndex
        // evt.from
        // evt.to
        if (evt.from !== evt.to) {
          console.log('dragged to new category');
        }

        if (evt.newIndex !== evt.oldIndex) {
          console.log('here is where i will update');
          const payload = { variables: {} };
          this.updateItemPosition(payload);
        }
        this.drag = false;
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
      itemPrice (item) {
        return convertToDollars(item.price);
      },
      quantityTotal (items) {
        return items.reduce((sum, elem) => sum + elem.quantity, 0);
      },
      priceTotal (items) {
        const reduced = items.reduce((sum, elem) => sum + Number(elem.price), 0);
        return convertToDollars(reduced);
      },
      async updateBooleanItem (item, field) {
        const payload = { variables: { id: item.id, [field]: !item[field] } };
        await this.updateItem(payload);
      },
      weightTotal (category) {
        const weight = category.items.reduce((sum, elem) => sum + elem.weight, 0);
        const payload = { weight };
        return this.$options.filters.displayWeight(payload, category.unit);
      }
    },

    mounted () {
      this.primaryColor = this.$nuxt.$vuetify.theme.themes.light.primary;
      this.errorColor = this.$nuxt.$vuetify.theme.themes.light.error;
    },

    components: {
      ClickToEdit,
      draggable,
      WeightRow
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
      td {

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

        &:last-child svg, &:first-child svg {
          opacity   : 0;
          transition: 0.2s opacity $cubicBezier;
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
