<template>
  <div class="widget-wrapper">
    <div class="widget-header">
      <div class="text-h6">
        Todo List
      </div>
      <plus-button @handle-click="addTodo" />
    </div>
    <v-data-table
      v-if="todos.length"
      class="todos-table"
      :headers="headers"
      hide-default-footer
      :items="todos"
      show-select>
      <template v-slot:header.data-table-select>
        <v-simple-checkbox
          color="primary"
          :ripple="false"
          :value="allSelected"
          @input="updateAllItems($event)" />
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
            <td
              class="text-start">
              <span
                v-if="editableItem !== `title${item.id}Ref`"
                class="text-body-2"
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
            <td
              class="text-end"
              width="25">
              <v-btn
                class="deleteTodo"
                color="error"
                icon
                :ripple="false"
                @click="removeTodo(item, index)">
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
        { text: 'Item', value: 'title', align: 'left', sortable: true },
        { text: '', value: 'delete', align: 'left', sortable: false }
      ],
      todos: [
        { id: 28, title: 'Book Car Rental', checked: 0, created_at: '2020-03-08 11:31:27', updated_at: '2020-03-08 11:31:27' },
        { id: 29, title: 'Call hostel', checked: 1, created_at: '2020-04-08 11:31:27', updated_at: '2020-04-08 11:31:27' }
      ]
    }),

    computed: {
      allSelected () {
        return this.todos.every(item => item.checked);
      }
    },

    methods: {
      addTodo () {
        console.log('addTodo');
        const hasTodos = !!this.todos[this.todos.length - 1];
        this.todos.push({
          id: hasTodos ? this.todos[this.todos.length - 1].id + 1 : 1,
          title: 'Test',
          checked: 0,
          created_at: Date.now(),
          updated_at: Date.now()
        });
      },
      removeTodo (todo, index) {
        this.todos.splice(index, 1);
      },
      setEditing (ref) {
        this.editableItem = ref;
        this.$nextTick(() => document.querySelector(`#${ref}`).focus());
      },
      updateAllItems (value) {
        this.todos.forEach(i => this.updateItem(value, i, 'checked'));
      },
      updateItem (event, todo, field) {
        // TODO: Need to handle editing better overall (or edit in modal)
        this.editableItem = null;

        // return if value hasn't changed
        if (event === String(todo[field])) { return; }
        todo[field] = event;

        console.log('updateItem');
        // await todoService.update(todo);
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

  .v-data-table.todos-table {
    background: transparent;

    tbody {
      tr {
        td {
          border-bottom: none !important;
        }

        td.text-end .delete-icon {
          opacity: 0;
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
