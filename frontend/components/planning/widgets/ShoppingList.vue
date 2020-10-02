<template>
  <div class="widget-wrapper">
    <div class="widget-header">
      <div class="text-h6">
        Shopping List
      </div>
      <plus-button @handle-click="addListItem" />
    </div>
    <v-data-table
      v-if="items.length"
      class="items-table"
      :headers="headers"
      hide-default-footer
      :items="items"
      show-select>
      <template v-slot:header.data-table-select>
        <v-simple-checkbox
          color="primary"
          :ripple="false"
          :value="allSelected"
          @input="updateAllItems($event)" />
      </template>
      <template v-slot:header.title="{ header }">
        <span class="font-italic font-weight-medium">{{ header.text }}</span>
      </template>
      <template v-slot:header.quantity="{ header }">
        <span class="font-italic font-weight-medium">{{ header.text }}</span>
      </template>
      <template v-slot:body="{ items }">
        <tbody
          is="transition-group"
          name="list">
          <tr
            v-for="(item, index) in items"
            :key="item.id">
            <td
              class="text-start"
              width="25">
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
            <td
              class="text-end"
              width="25">
              <v-btn
                class="deleteItem"
                color="error"
                icon
                :ripple="false"
                @click="removeItem(item, index)">
                <custom-icon
                  class="delete-icon"
                  :fill="deleteColor"
                  height="25px"
                  name="trash-alt"
                  width="25px" />
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
  import CustomIcon from '~/components/icons/CustomIcon';
  import PlusButton from '~/components/icons/PlusButton';

  export default {
    data: () => ({
      deleteColor: '',
      editableItem: null,
      headers: [
        { text: 'Item', align: 'left', sortable: true, value: 'title' },
        { text: 'Quantity', align: 'center', sortable: true, value: 'quantity' },
        { text: '', align: 'end', sortable: false, value: 'actions' }
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
      CustomIcon,
      PlusButton
    }
  };
</script>

<style lang="scss" scoped>
  @import 'widget-styles';

  .v-data-table.items-table {
    background: transparent;

    tbody {
      tr {
        td {
          border-bottom: none !important;
        }

        td.text-end .delete-icon {
          opacity: 0;
          padding-left: 4px;
          padding-right: 4px;
          transition: opacity 0.25s ease-in-out;
        }

        &:hover {
          td.text-end .delete-icon {
            opacity: 1;
          }
        }
      }
    }
  }

  .list-enter-active,
  .list-leave-active,
  .list-move {
    transition: 250ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
    transition-property: opacity, transform;
  }

  .list-enter {
    opacity: 0;
    transform: translateX(50px) scaleY(0.5);
  }

  .list-enter-to {
    opacity: 1;
    transform: translateX(0) scaleY(1);
  }

  .list-leave-active {
    position: absolute;
  }

  .list-leave-to {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: center top;
  }
</style>
