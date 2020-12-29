<template>
  <div class="widget-wrapper">
    <div class="widget-header">
      <div class="text-h6">
        Shopping List
      </div>
      <plus-button @handle-click="addListItem" />
    </div>
    <v-data-table
      v-if="shoppingListItems.length"
      v-resize="onResize"
      :class="['items-table', {mobile: isMobile}]"
      disable-pagination
      :headers="headers"
      hide-default-footer
      :items="shoppingListItems"
      :mobile-breakpoint="0"
      show-select>
      <template #header.data-table-select>
        <v-simple-checkbox
          color="primary"
          :ripple="false"
          :value="allSelected"
          @input="updateAllItems($event)" />
      </template>
      <template #header.title="{ header }">
        <span class="font-weight-bold">{{ header.text }}</span>
      </template>
      <template #header.quantity="{ header }">
        <span class="font-weight-bold">{{ header.text }}</span>
      </template>
      <template #body="{ items }">
        <tbody
          is="transition-group"
          name="list">
          <tr
            v-for="(item, index) in items"
            :key="item.id">
            <td
              class="text-start"
              style="width: 10%">
              <v-simple-checkbox
                color="primary"
                :ripple="false"
                :value="Boolean(item.checked)"
                @input="updateItem($event, item, 'checked')" />
            </td>
            <td
              class="text-start"
              style="width: 70%">
              <click-to-edit
                :unique-identifier="`shoppingItemTitle${item.id}Ref`"
                :value="item.title"
                @handle-update-item="updateItem($event, item, 'title')" />
            </td>
            <td
              class="text-center quantity"
              style="width: 10%">
              <click-to-edit
                :unique-identifier="`shoppingItemQuantity${item.id}Ref`"
                :value="item.quantity"
                @handle-update-item="updateItem($event, item, 'quantity')" />
            </td>
            <td
              class="text-end"
              style="width: 10%">
              <v-btn
                class="deleteItem"
                color="error"
                icon
                :ripple="false"
                @click="removeItem(item, index)">
                <custom-icon
                  class="delete-icon"
                  :fill="deleteColor"
                  :height="25"
                  name="trash-alt"
                  :width="25" />
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <p v-else>
      You haven't created any items for your shopping list yet!<br>Click the plus button in the top right to get started.
    </p>
  </div>
</template>

<script>
  import isMobile from '~/mixins/isMobile';
  import { shoppingListItemService } from '~/services';
  import ClickToEdit from '~/components/ClickToEdit.vue';
  import CustomIcon from '~/components/icons/CustomIcon.vue';
  import PlusButton from '~/components/icons/PlusButton.vue';

  export default {
    mixins: [isMobile],

    props: {
      trip: {
        type: Object,
        default: () => {}
      }
    },

    data: () => ({
      deleteColor: '',
      editableItem: null,
      headers: [
        { text: 'Item', align: 'left', sortable: true, value: 'title', width: '70%' },
        { text: 'Quantity', align: 'center', sortable: true, value: 'quantity', width: '10%' },
        { text: '', align: 'end', sortable: false, value: 'actions', width: '10%' }
      ]
    }),

    computed: {
      allSelected () {
        return this.shoppingListItems.every(item => item.checked);
      },
      shoppingListItems () {
        if (this.trip) {
          return this.trip.shoppingListItems;
        }
        return [];
      }
    },

    methods: {
      addListItem () {
        const payload = {
          fields: { title: 'New Item', checked: false, trip: this.trip.id, quantity: 0 },
          apollo: this.$apollo
        };

        shoppingListItemService.create(payload);
      },
      removeItem (item) {
        const payload = {
          fields: { id: item.id, trip: this.trip.id },
          apollo: this.$apollo
        };
        shoppingListItemService.destroy(payload);
      },
      setEditing (ref) {
        this.editableItem = ref;
        this.$nextTick(() => document.querySelector(`#${ref}`).focus());
      },
      updateAllItems (value) {
        // TODO: Come up with batch update mutation instead
        this.trip.shoppingListItems.forEach(i => this.updateItem(value, i, 'checked'));
      },
      updateItem (event, item, field) {
        this.editableItem = null;

        // return if value hasn't changed
        if (event === String(item[field])) { return; }

        const payload = {
          fields: { id: item.id, [field]: event, trip: this.trip.id },
          apollo: this.$apollo
        };
        shoppingListItemService.update(payload);
      }
    },

    mounted () {
      this.deleteColor = $nuxt.$vuetify.theme.themes.light.error;
    },

    components: {
      ClickToEdit,
      CustomIcon,
      PlusButton
    }
  };
</script>

<style lang="scss" scoped>
  @import 'widget-styles';
  @import '~/css/list-transition';
</style>

<style lang="scss">
  .v-data-table.items-table {
    background: transparent;
    overflow-y: scroll;

    thead {
      th.text-start, th.text-left, th.text-center {
        padding: 0 8px;
      }
    }

    tbody {
      tr {
        td {
          border-bottom: none !important;
        }

        td.text-start {
          padding: 0 8px;
        }

        td.text-center.quantity {
          input {
            text-align: center;
          }
        }

        td.text-end {
          padding: 0 8px;
          display: flex;
          align-items: center;
          justify-content: flex-end;

          @include breakpoint(laptop) {
            padding: 0 16px;
          }

          .deleteItem {
            .delete-icon {
              opacity: 1;

              @include breakpoint(laptop) {
                opacity: 0;
                transition: opacity 0.25s ease-in-out;
              }
            }
          }
        }

        &:hover {
          td.text-end {
            .deleteItem {
              .delete-icon {
                @include breakpoint(laptop) {
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
