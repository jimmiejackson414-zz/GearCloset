<template>
  <div class="closet-page-styles">
    <!-- Sidebar? -->
    <div class="content-container">
      <transition name="fade">
        <v-container grid-list-lg>
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

                        <!-- Weight Edit In Place -->
                        <td>
                          <click-to-edit
                            type="number"
                            :unique-identifier="`weight${item.id}Ref`"
                            :value="String(item.weight)"
                            @handle-update-item="updateItem($event, item, 'weight')" />
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
        </v-container>
      </transition>
    </div>
  </div>
</template>

<script>
  import ClickToEdit from '~/components/ClickToEdit';
  import currentUser from '~/mixins/currentUser';
  import CustomIcon from '~/components/icons/CustomIcon';

  export default {
    name: 'Closet',

    mixins: [currentUser],

    data: () => ({
      currentItemKey: 0,
      deleteConfirmOpen: false,
      headers: [
        { text: '', align: 'left', sortable: false, value: 'drag' },
        { text: 'Type', align: 'left', sortable: true, value: 'generic_type' },
        { text: 'Name', align: 'left', sortable: true, value: 'name' },
        { text: 'Weight', align: 'left', sortable: true, value: 'weight' },
        { text: 'Consumable', align: 'center', sortable: true, value: 'consumable' },
        { text: 'Worn', align: 'center', sortable: true, value: 'worn' },
        { text: '', align: 'right', sortable: false, value: 'remove' }
      ],
      integerRule: [
        v => /^(((\d{1,3})(,\d{3})*)|(\d+))(.\d+)?$/.test(v) || 'Only numbers are permitted'
      ],
      itemKeys: new WeakMap(),
      selectedItem: null
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
      }
    },

    methods: {
      handleRemoveModalOpen (item) {
        this.selectedItem = item;
        this.deleteConfirmOpen = true;
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
      CustomIcon
    }
  };
</script>

<style lang="scss">
  @import '~/css/colors';

  .closet-page-styles {
    .content-container {
      .items-list-styles {
        .items-table-container {
          tr {
            td {
              padding: 0 4px;

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
                opacity: 0;
                transition: 0.2s opacity cubic-bezier(0.57, 0.06, 0, 1.06);
              }
            }

            &:hover {
              td:first-child, td:last-child {
                opacity: 1;
              }
            }
          }

          td {

          }
        }
      }
    }
  }
</style>
