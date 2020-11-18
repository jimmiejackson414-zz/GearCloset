<template>
  <div class="widget-wrapper">
    <div class="widget-header">
      <div class="text-h6">
        Shopping List
      </div>
      <plus-button @handle-click="addListItem" />
    </div>
    <!-- <v-data-table
      v-if="items.length"
      v-resize="onResize"
      :class="['items-table', {mobile: isMobile}]"
      disable-pagination
      :headers="headers"
      hide-default-footer
      :items="items"
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
            <td class="text-start">
              <v-simple-checkbox
                color="primary"
                :ripple="false"
                :value="Boolean(item.checked)"
                @input="updateItem($event, item, 'checked')" />
            </td>
            <td class="text-start">
              <span
                v-if="editableItem !== `title${item.id}Ref`"
                @click="setEditing(`title${item.id}Ref`)">
                {{ item.title }}
              </span>
              <v-text-field
                v-else
                :id="`title${item.id}Ref`"
                :ref="`title${item.id}Ref`"
                color="primary"
                dense
                hide-details
                outlined
                type="text"
                :value="item.title"
                @blur="updateItem($event, item, 'title')"
                @change="updateItem($event, item, 'title')"
                @keyup.enter="updateItem($event, item, 'title')" />
            </td>
            <td class="text-center">
              <span
                v-if="editableItem !== `quantity${item.id}Ref`"
                @click="setEditing(`quantity${item.id}Ref`)">
                {{ item.quantity }}
              </span>
              <v-text-field
                v-else
                :id="`quantity${item.id}Ref`"
                :ref="`quantity${item.id}Ref`"
                color="primary"
                dense
                hide-details
                outlined
                type="text"
                :value="item.quantity"
                @blur="updateItem($event, item, 'quantity')"
                @change="updateItem($event, item, 'quantity')"
                @keyup.enter="updateItem($event, item, 'quantity')" />
            </td>
            <td class="text-end">
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
    </v-data-table> -->
    <p>
      You haven't created any items for your shopping list yet!<br>Click the plus button in the top right to get started.
    </p>
  </div>
</template>

<script>
  // import CustomIcon from '~/components/icons/CustomIcon';
  import isMobile from '~/mixins/isMobile';
  import PlusButton from '~/components/icons/PlusButton';

  export default {
    mixins: [isMobile],

    data: () => ({
      deleteColor: '',
      editableItem: null,
      headers: [
        { text: 'Item', align: 'left', sortable: true, value: 'title', width: '60%' },
        { text: 'Quantity', align: 'center', sortable: true, value: 'quantity', width: '40%' },
        { text: '', align: 'end', sortable: false, value: 'actions', width: '1%' }
      ],
      items: [
        { id: 9, title: 'Smartwater Bottles', checked: 1, quantity: 2, created_at: '2020-03-08 11:31:45', updated_at: '2020-03-08 11:31:45' },
        { id: 10, title: 'Beef Jerkey', checked: 0, quantity: 1, created_at: '2020-03-08 11:31:45', updated_at: '2020-03-08 11:31:45' },
        { id: 11, title: 'Clif Bars', checked: 1, quantity: 4, created_at: '2020-03-08 11:31:45', updated_at: '2020-03-08 11:31:45' },
        { id: 12, title: 'Ramen', checked: 0, quantity: 6, created_at: '2020-03-08 11:31:45', updated_at: '2020-03-08 11:31:45' }
      ]
    }),

    computed: {
      allSelected () {
        return this.items.every(item => item.checked);
      }
    },

    methods: {
      addListItem () {
        console.log('addListItem');
        const hasItems = !!this.items[this.items.length - 1];
        this.items.push({
          id: hasItems ? this.items[this.items.length - 1].id + 1 : 1,
          title: 'Test',
          checked: 0,
          quantity: 0,
          created_at: Date.now(),
          updated_at: Date.now()
        });
      },
      removeItem (item, index) {
        this.items.splice(index, 1);
      },
      setEditing (ref) {
        this.editableItem = ref;
        this.$nextTick(() => document.querySelector(`#${ref}`).focus());
      },
      updateAllItems (value) {
        this.items.forEach(i => this.updateItem(value, i, 'checked'));
      },
      updateItem (event, item, field) {
        // TODO: Need to handle editing better overall (or edit in modal)
        this.editableItem = null;

        // return if value hasn't changed
        if (event === String(item[field])) { return; }
        item[field] = event;

        console.log('updateItem');
        // await shoppingListService.update(item);
      }
    },

    mounted () {
      this.deleteColor = $nuxt.$vuetify.theme.themes.light.secondary;
    },

    components: {
      // CustomIcon,
      PlusButton
    }
  };
</script>

<style lang="scss">
  @import 'widget-styles';
  @import '~/css/list-transition';

  .v-data-table.items-table {
    background: transparent;

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
