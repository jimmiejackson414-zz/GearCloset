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
              <!-- Test of Click To Edit component -->
              <click-to-edit
                :unique-identifier="`title${item.id}Ref`"
                :value="item.title"
                @handle-update-item="updateItem($event, item, 'title')" />

              <!-- Original Click to Edit -->
              <!-- <span
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
                @blur="updateItem(item, 'title', $event)"
                @change="updateItem(item, 'title', $event)"
                @keyup.enter="updateItem(item, 'title', $event)" /> -->
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
  import ClickToEdit from '~/components/ClickToEdit';
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
      updateItem (value, todo, field) {
        if (value === String(todo[field])) {
          // return if value hasn't changed
          return;
        } else {
          todo[field] = value;
        }

        console.log('updateItem');
        // await todoService.update(todo);
      }
    },

    mounted () {
      this.deleteColor = $nuxt.$vuetify.theme.themes.light.secondary;
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
</style>
