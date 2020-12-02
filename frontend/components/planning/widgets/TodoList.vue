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
      v-resize="onResize"
      :class="['todos-table', {mobile: isMobile}]"
      disable-pagination
      :headers="headers"
      hide-default-footer
      :items="todos"
      :mobile-breakpoint="0"
      show-select>
      <template #header.data-table-select>
        <v-simple-checkbox
          color="primary"
          :ripple="false"
          :value="allSelected"
          @input="updateAllItems($event)" />
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
            <td class="text-start pl-1">
              <click-to-edit
                :unique-identifier="`title${item.id}Ref`"
                :value="item.title"
                @handle-update-item="updateItem($event, item, 'title')" />
            </td>
            <td class="text-end">
              <v-btn
                class="deleteTodo"
                color="error"
                icon
                :ripple="false"
                @click="removeTodo(item, index)">
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
  import ClickToEdit from '~/components/ClickToEdit';
  import CustomIcon from '~/components/icons/CustomIcon';
  import isMobile from '~/mixins/isMobile';
  import PlusButton from '~/components/icons/PlusButton';
  import Todo from '~/data/models/todo';

  export default {
    mixins: [isMobile],

    props: {
      tripId: {
        type: String,
        default: ''
      }
    },

    data: () => ({
      deleteColor: '',
      editableItem: null,
      headers: [
        { text: 'Item', value: 'title', align: 'left', sortable: true, width: '95%' },
        { text: '', value: 'delete', align: 'left', sortable: false, width: '5%' }
      ]
    }),

    computed: {
      allSelected () {
        return this.todos.every(item => item.checked);
      },
      todos () {
        return Todo.query().where('trip_id', this.tripId).get();
      }
    },

    methods: {
      async addTodo () {
        const payload = { title: 'New Todo', checked: false, trip: this.tripId };
        const { todos } = await Todo.insert({ data: { ...payload } });
        todos[0].$persist();
      },
      removeTodo (todo, index) {
        todo.$deleteAndDestroy();
      },
      setEditing (ref) {
        this.editableItem = ref;
        this.$nextTick(() => document.querySelector(`#${ref}`).focus());
      },
      async updateAllItems (value) {
        const { todos } = await Todo.update({
          data: this.todos.map(todo => {
            return {
              id: todo.id,
              checked: value
            };
          })
        });
        todos.forEach(todo => todo.$push());
      },
      async updateItem (value, todo, field) {
        this.editableItem = null;
        // return if value hasn't changed
        if (value === String(todo[field])) { return; }

        const newItem = await Todo.update({
          where: Number(todo.id),
          data: {
            [field]: value
          }
        });
        newItem.$push();
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
  .v-data-table.todos-table {
    background: transparent;

    thead {
      th.text-start {
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

          .deleteTodo {
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
            .deleteTodo {
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
