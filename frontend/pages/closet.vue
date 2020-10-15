<template>
  <div class="closet-page-styles">
    <!-- Sidebar -->
    <closet-sidebar />

    <!-- Content -->
    <div class="content-container">
      <transition name="fade">
        <v-container grid-list-lg>
          <div class="header mb-6">
            <h3 class="text-h3 font-weight-bold">
              {{ activePack.name }}
            </h3>
            <div class="actions">
              <div class="share-wrapper">
                <v-btn
                  class="share-btn"
                  icon
                  :ripple="false"
                  @click="shareListModalOpen = true">
                  <custom-icon
                    fill="#4a4a4a"
                    height="20px"
                    name="share"
                    width="20px" />
                  <p class="body-2 mb-0">
                    Share
                  </p>
                </v-btn>
              </div>
            </div>
          </div>
          <v-row class="closet-pack-graph-wrapper">
            <v-col class="wrapper col-12 col-md-6 offset-md-3">
              <selected-pack-graph :height="300" />
            </v-col>
          </v-row>
          <div class="items-list-styles">
            <div class="items-list-container">
              <h2 class="text-h6">
                Pack Items
              </h2>
              <v-list
                v-for="(category, index) in categories"
                :key="category.id"
                class="categories-container">
                <click-to-edit
                  :unique-identifier="`title${category.id}Ref`"
                  :value="category.name"
                  @handle-update-item="updateItem($event, category, 'name')" />
                <v-data-table
                  :ref="`sortableTable${index}`"
                  calculate-widths
                  class="items-table-container"
                  disable-pagination
                  :headers="headers"
                  hide-default-footer
                  :items="category.items">
                  <template v-slot:body="{ items }">
                    <tbody :data-category="JSON.stringify(category.id)">
                      <tr
                        v-for="item in items"
                        :key="itemKey(item)"
                        class="sortableRow"
                        :data-items="JSON.stringify(item)">
                        <!-- Drag Handle -->
                        <td
                          class="px-1"
                          style="width: 0.1%">
                          <custom-icon
                            color="#4a4a4a"
                            height="20px"
                            name="grip-horizontal-line"
                            width="20px" />
                        </td>

                        <!-- Type Edit In Place -->
                        <td>
                          <click-to-edit
                            :unique-identifier="`type${item.id}`"
                            :value="item.generic_type"
                            @handle-update-item="updateItem($event, item, 'generic_type')" />
                        </td>

                        <!-- Name Edit In Place -->
                        <td>
                          <click-to-edit
                            :unique-identifier="`name${item.id}Ref`"
                            :value="item.name"
                            @handle-update-item="updateItem($event, item, 'name')" />
                        </td>

                        <!-- TODO: Figure out how to handle weights -->
                        <!-- Weight Edit In Place -->
                        <td>
                          <span class="weight-column">
                            <click-to-edit
                              :unique-identifier="`weight${item.id}Ref`"
                              :value="String(item.weight)"
                              @handle-update-item="updateItem($event, item, 'weight')" />
                            <v-select
                              dense
                              hide-details
                              :items="weightItems"
                              value="oz"
                              @change="handleUpdateUnits($event, item)" />
                          </span>
                        </td>

                        <!-- Price Edit In Place -->
                        <td>
                          <span class="price-column">
                            <click-to-edit
                              :mask="currencyMask"
                              :unique-identifier="`price${item.id}Ref`"
                              :value="String(item.price / 100)"
                              @handle-update-item="updateItem($event, item, 'price')" />
                          </span>
                        </td>

                        <!-- Consumable Toggle -->
                        <td class="text-center">
                          <v-btn
                            :class="[{ active: item.consumable }, 'consumable-btn']"
                            icon
                            :ripple="false"
                            text
                            @click="updateBooleanItem(item, 'consumable')">
                            <custom-icon
                              height="20px"
                              name="utensils-alt"
                              width="20px" />
                          </v-btn>
                        </td>

                        <!-- Worn Toggle -->
                        <td class="text-center">
                          <v-btn
                            :class="[{ active: item.worn }, 'worn-btn']"
                            icon
                            :ripple="false"
                            text
                            @click="updateBooleanItem(item, 'worn')">
                            <custom-icon
                              height="20px"
                              name="layer-group"
                              width="20px" />
                          </v-btn>
                        </td>

                        <!-- Remove Item -->
                        <td
                          class="text-right pr-2"
                          width="1%">
                          <v-btn
                            class="px-1 remove"
                            color="error"
                            icon
                            :ripple="false"
                            style="width: 1%"
                            text
                            @click="handleRemoveModalOpen(item)">
                            <custom-icon
                              height="20px"
                              name="trash-alt"
                              width="20px" />
                          </v-btn>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-data-table>
              </v-list>
            </div>
          </div>

          <!-- Share Pack List Modal -->
          <share-pack-list-modal
            v-model="shareListModalOpen"
            :list="list" />
        </v-container>
      </transition>
    </div>
  </div>
</template>

<script>
  import createNumberMask from 'text-mask-addons/dist/createNumberMask';
  import ClickToEdit from '~/components/ClickToEdit';
  import ClosetSidebar from '~/components/closet/ClosetSidebar';
  import { convertToDollars, generateUUID } from '~/helpers/functions';
  import currentUser from '~/mixins/currentUser';
  import CustomIcon from '~/components/icons/CustomIcon';
  import SelectedPackGraph from '~/components/graphs/SelectedPackGraph';
  import SharePackListModal from '~/components/modals/SharePackListModal';

  export default {
    name: 'Closet',

    mixins: [currentUser],

    data: () => ({
      currentItemKey: 0,
      deleteConfirmOpen: false,
      headers: [
        { text: '', align: 'left', sortable: false, value: 'drag', width: '2%' },
        { text: 'Type', align: 'left', sortable: true, value: 'generic_type', width: '20%' },
        { text: 'Name', align: 'left', sortable: true, value: 'name', width: '20%' },
        { text: 'Weight', align: 'center', sortable: true, value: 'weight', width: '13%' },
        { text: 'Price', align: 'center', sortable: true, value: 'price', width: '14%' },
        { text: 'Consumable', align: 'center', sortable: true, value: 'consumable', width: '101' },
        { text: 'Worn', align: 'center', sortable: true, value: 'worn', width: '8%' },
        { text: '', align: 'right', sortable: false, value: 'remove', width: '2%' }
      ],
      integerRule: [
        v => /^(((\d{1,3})(,\d{3})*)|(\d+))(.\d+)?$/.test(v) || 'Only numbers are permitted'
      ],
      itemKeys: new WeakMap(),
      list: {
        id: 1,
        title: 'Summer',
        uuid: generateUUID()
      },
      selectedItem: null,
      shareListModalOpen: false,
      weightItems: ['oz', 'lbs', 'g', 'kg']
    }),

    computed: {
      activePack () {
        return this.currentUser.packs.find(pack => pack.active);
      },
      categories () {
        if (this.activePack) {
          return this.activePack.categories;
        }
        return [];
      },
      currencyMask () {
        return createNumberMask({
          allowDecimal: true,
          allowNegative: false,
          includeThousandsSeparator: true,
          prefix: '$',
          requireDecimal: true, // TODO: Need to figure out why 00 isn't appending
          thousandsSeparatorSymbol: ','
        });
      }
    },

    methods: {
      convertCurrency (amount) {
        return convertToDollars(amount);
      },
      handleRemoveModalOpen (item) {
        this.selectedItem = item;
        this.deleteConfirmOpen = true;
      },
      handleUpdateUnits (e, item) {
        // access ref using item to convert specific text field's value
        console.log('handleUpdateUnits');
      },
      itemKey (item) {
        if (!this.itemKeys.has(item)) { this.itemKeys.set(item, ++this.currentItemKey); }
        return this.itemKeys.get(item);
      },
      update (item, field, value) {
        const payload = { id: item.id, [field]: value };
        console.log('update payload: ', payload);
        // await itemService.update(payload);
      },
      updateBooleanItem (item, action) {
        // if (action === 'consumable' || action === 'worn') { item[action] = !item[action]; }
        this.update(item, action, item[action]);
      },
      updateItem (value, category, field) {
        if (value === String(category[field])) {
          // return if value hasn't changed
          return;
        } else {
          category[field] = value;
        }

        console.log('updateItem');
        // await categoryService.update(category);
      }
    },

    components: {
      ClickToEdit,
      ClosetSidebar,
      CustomIcon,
      SelectedPackGraph,
      SharePackListModal
    }
  };
</script>

<style lang="scss">
  @import '~/css/colors';

  .closet-page-styles {
    display: flex;
    height : 100%;

    .content-container {
      width: 100%;

      .header {
        align-items    : center;
        display        : flex;
        justify-content: space-between;

        .actions {
          margin-right: 2rem;

          .share-wrapper {
            display: flex;

            .share-btn {
              p, svg {
                transition: 0.2s color ease-in-out;
              }

              &:hover {
                p {
                  color: $primary;
                }

                svg {
                  fill: $primary;
                }
              }
            }
          }
        }
      }

      .items-list-styles {
        .items-table-container {
          tr {
            td {
              padding: 0 4px;

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

              .v-btn {
                &.active {
                  &.worn-btn {
                    background-color: $success;
                    svg {
                      fill: white;
                    }
                  }

                  &.consumable-btn {
                    background-color: $warning;

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

              &:last-child, &:first-child {
                opacity   : 0;
                transition: 0.2s opacity $cubic-bezier;
              }
            }

            &:hover {
              td:first-child, td:last-child {
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
</style>
