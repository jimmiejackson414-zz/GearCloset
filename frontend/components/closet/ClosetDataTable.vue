<template>
  <div class="items-list-styles">
    <div class="items-list-container">
      <h2 class="text-h6 ml-3">
        Pack Items
      </h2>
      <client-only>
        </v-row>
        <v-list
          v-for="(category, index) in categories"
          :key="category.id"
          :class="['categories-container', categories.length === index + 1 ? 'last' : '']">
          <v-row>
            <v-col
              cols="12"
              lg="4"
              md="6">
              <click-to-edit
                :unique-identifier="`title${category.id}Ref`"
                :value="category.name"
                @handle-update-item="updateCategory($event, category, 'name')" />
            </v-col>
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
                  @change="log"
                  @end="drag = false"
                  @start="drag = true">
                  <tr
                    v-for="(item, i) in items"
                    :key="item.id">
                    <!-- Drag Handle -->
                    <td :key="`${item.id}-drag-${i}-${index}`">
                      <custom-icon
                        color="#4a4a4a"
                        custom-class="drag"
                        :height="20"
                        name="grip-horizontal-line"
                        :width="20" />
                    </td>

                    <!-- Generic Type Click To Edit -->
                    <td :key="`${item.id}-type-${i}-${index}`">
                      <click-to-edit
                        :style="{ fontSize: '0.875rem' }"
                        :unique-identifier="`type${item.id}`"
                        :value="item.generic_type"
                        @handle-update-item="updateItem($event, item, 'generic_type')" />
                    </td>

                    <!-- Name Click To Edit -->
                    <td :key="`${item.id}-name-${i}-${index}`">
                      <click-to-edit
                        :style="{ fontSize: '0.875rem' }"
                        :unique-identifier="`name${item.id}Ref`"
                        :value="item.name"
                        @handle-update-item="updateItem($event, item, 'name')" />
                    </td>

                    <!-- Consumable Toggle -->
                    <td
                      :key="`${item.id}-consumable-${i}-${index}`"
                      class="text-center">
                      <v-btn
                        :class="[{ active: item.consumable }, 'consumable-btn']"
                        icon
                        :ripple="false"
                        text
                        @click.native="updateBooleanItem(item, 'consumable')">
                        <custom-icon
                          :height="20"
                          name="utensils-alt"
                          :width="20" />
                      </v-btn>
                    </td>

                    <!-- Worn Toggle -->
                    <td
                      :key="`${item.id}-worn-${i}-${index}`"
                      class="text-center">
                      <v-btn
                        :class="[{ active: item.worn }, 'worn-btn']"
                        icon
                        :ripple="false"
                        text
                        @click="updateBooleanItem(item, 'worn')">
                        <custom-icon
                          :height="20"
                          name="layer-group"
                          :width="20" />
                      </v-btn>
                    </td>

                    <!-- Weight Click To Edit and Dropdown -->
                    <td :key="`${item.id}-weight-${i}-${index}`">
                      <span class="weight-column">
                        <click-to-edit
                          :style="{ fontSize: '0.875rem' }"
                          :unique-identifier="`weight${item.id}Ref`"
                          :value="convertWeight(item)"
                          @handle-update-item="updateItem($event, item, 'weight')" />
                        <v-select
                          dense
                          hide-details
                          :items="weightItems"
                          :value="item.unit"
                          @change="handleUpdateUnits($event, item)" />
                      </span>
                    </td>

                    <!-- Price Click To Edit -->
                    <td :key="`${item.id}-price-${i}-${index}`">
                      <click-to-edit
                        :custom-class="'price-column'"
                        :style="{ fontSize: '0.875rem', maxWidth: '100px', margin: '0 auto' }"
                        :unique-identifier="`price${item.id}Ref`"
                        :value="itemPrice(item)"
                        @handle-update-item="updateItem($event, item, 'price')">
                        <custom-icon
                          fill="#494f57"
                          :height="14"
                          name="dollar-alt"
                          :width="14" />
                      </click-to-edit>
                    </td>

                    <!-- Quantity Click To Edit -->
                    <td :key="`${item.id}-quantity-${i}-${index}`">
                      <click-to-edit
                        :custom-class="'quantity-column'"
                        :style="{ fontSize: '0.875rem', width: '60px', margin: '0 auto' }"
                        type="number"
                        :unique-identifier="`quantity${item.id}Ref`"
                        :value="String(item.quantity)"
                        @handle-update-item="updateItem($event, item, 'quantity')" />
                    </td>

                    <!-- Remove button -->
                    <td :key="`${item.id}-remove-${i}-${index}`">
                      <v-btn
                        icon
                        @click="handleRemoveRow(item, category)">
                        <custom-icon
                          :color="errorColor"
                          custom-class="pointer"
                          :height="20"
                          name="trash-alt"
                          :width="20" />
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
                        {{ weightTotal(category) }}
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
                        <custom-icon
                          fill="#494f57"
                          :height="14"
                          name="dollar-alt"
                          :width="14" />
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
              :ripple="false"
              text
              @click="handleAddNewItem">
              <custom-icon
                :fill="primaryColor"
                :height="18"
                name="plus"
                :width="18" />
              <p class="body-2 primary--text mb-0 ml-3">
                Add New Item
              </p>
            </v-btn>
          </v-row>
        </v-list>
      </client-only>

      <!-- Add New Category Button -->
      <v-container
        class="new-category-container">
        <v-row>
          <v-col class="col-12">
            <v-btn
              class="pl-1"
              :ripple="false"
              text
              @click="handleAddNewCategory">
              <custom-icon
                :fill="primaryColor"
                :height="18"
                name="plus"
                :width="18" />
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
  import createNumberMask from 'text-mask-addons/dist/createNumberMask';
  import convert from 'convert-units';
  import draggable from 'vuedraggable';
  import ClickToEdit from '~/components/ClickToEdit.vue';
  import { convertToDollars } from '~/helpers/functions';
  import CustomIcon from '~/components/icons/CustomIcon.vue';
  import { categoryService, itemService } from '~/services';

  export default {
    props: {
      activePack: {
        type: Object,
        default: () => {}
      }
    },

    data: () => ({
      currentItemKey: 0,
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
      itemKeys: new WeakMap(),
      primaryColor: '',
      weightItems: ['oz', 'lbs', 'g', 'kg']
    }),

    computed: {
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
          thousandsSeparatorSymbol: ','
        });
      },
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
      log (evt) {
        console.log('data table log: ', evt);
      },

      convertWeight (item) {
        return convert(item.weight).from('g').to(item.unit).toFixed(2);
      },
      handleAddNewCategory () {
        const payload = {
          fields: { name: 'New Category', pack_id: this.activePack.id },
          apollo: this.$apollo
        };
        categoryService.create(payload);
      },
      handleAddNewItem () {
        console.log('handleAddNewItem');
      },
      async handleRemoveRow (item, category) {
        console.log('handleRemoveRow');
        const payload = {
          fields: {
            item_id: item.id,
            category_id: category.id
          },
          pack_id: this.activePack.id,
          apollo: this.$apollo
        };
        await itemService.removeItem(payload);
      },
      handleUpdateUnits (e, item) {
        // access ref using item to convert specific text field's value
        console.log('handleUpdateUnits');
      },
      itemKey (item) {
        if (!this.itemKeys.has(item)) { this.itemKeys.set(item, ++this.currentItemKey); }
        return this.itemKeys.get(item);
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
        const payload = {
          fields: { id: item.id, [field]: !item[field] },
          apollo: this.$apollo
        };
        await itemService.update(payload);
      },
      async updateCategory (value, category, field) {
        // return if value hasn't changed
        if (value === String(category[field])) { return; }

        const payload = {
          fields: { id: category.id, [field]: value },
          apollo: this.$apollo
        };
        await categoryService.update(payload);
      },
      async updateItem (value, item, field) {
        // return if value hasn't changed
        if (value === String(item[field])) { return; }

        const payload = {
          fields: {
            id: item.id,
            [field]: value
          },
          apollo: this.$apollo
        };

        // handle floating point issue converting between string & number
        if (field === 'price') {
          payload.fields.price = Number((value * 100).toFixed(2));
        }

        await itemService.update(payload);
      },
      weightTotal (category) {
        const reduced = `${category.items.reduce((sum, elem) => sum + elem.weight, 0)}`;
        return convert(Number(reduced)).from('g').to(category.unit).toFixed(2);
      }
    },

    mounted () {
      this.primaryColor = this.$nuxt.$vuetify.theme.themes.light.primary;
      this.errorColor = this.$nuxt.$vuetify.theme.themes.light.error;
    },

    components: {
      ClickToEdit,
      CustomIcon,
      draggable
    }
  };
</script>

<style lang="scss">
  .items-table-container {
    width: 100%;
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

  .price-column, .quantity-column {
    input {
      text-align: center;
    }
  }

  .weight-column {
    margin: 0 auto;
    max-width: max-content;

    input {
      max-width: 50px;
    }
  }

</style>
