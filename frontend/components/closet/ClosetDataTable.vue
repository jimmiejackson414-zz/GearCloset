<template>
  <div class="items-list-styles">
    <div class="items-list-container">
      <h2 class="text-h6">
        Pack Items
      </h2>
      <v-list
        v-for="(category, index) in categories"
        :key="category.id"
        :class="['categories-container', categories.length === index + 1 ? 'last' : '']">
        <click-to-edit
          :custom-style="{ width: 'fit-content' }"
          :unique-identifier="`title${category.id}Ref`"
          :value="category.name"
          @handle-update-item="updateItem($event, category, 'name')" />
        <v-data-table
          :ref="`sortableTable${index}`"
          calculate-widths
          :class="['items-table-container', {mobile: isMobile}]"
          dense
          disable-pagination
          :headers="headers"
          hide-default-footer
          :items="category.items"
          :mobile-breakpoint="0">
          <!-- Drag Handle -->
          <template #item.drag>
            <custom-icon
              color="#4a4a4a"
              custom-class="drag"
              :height="20"
              name="grip-horizontal-line"
              :width="20" />
          </template>

          <!-- Generic Type Click To Edit -->
          <template #item.generic_type="{ item }">
            <click-to-edit
              :style="{ fontSize: '0.875rem' }"
              :unique-identifier="`type${item.id}`"
              :value="item.generic_type"
              @handle-update-item="updateItem($event, item, 'generic_type')" />
          </template>

          <!-- Name Click To Edit -->
          <template #item.name="{ item }">
            <click-to-edit
              :style="{ fontSize: '0.875rem' }"
              :unique-identifier="`name${item.id}Ref`"
              :value="item.name"
              @handle-update-item="updateItem($event, item, 'name')" />
          </template>

          <!-- Consumable Toggle -->
          <template #item.consumable="{ item }">
            <v-btn
              :class="[{ active: item.consumable }, 'consumable-btn']"
              icon
              :ripple="false"
              text
              @click="updateBooleanItem(item, 'consumable')">
              <custom-icon
                :height="20"
                name="utensils-alt"
                :width="20" />
            </v-btn>
          </template>

          <!-- Worn Toggle -->
          <template #item.worn="{ item }">
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
          </template>

          <!-- Weight Click To Edit and Dropdown -->
          <template #item.weight="{ item }">
            <span class="weight-column">
              <click-to-edit
                :style="{ fontSize: '0.875rem' }"
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
          </template>

          <!-- Price Click To Edit -->
          <template #item.price="{ item }">
            <click-to-edit
              :custom-class="'price-column'"
              :mask="currencyMask"
              :style="{ fontSize: '0.875rem' }"
              :unique-identifier="`price${item.id}Ref`"
              :value="itemPrice(item)"
              @handle-update-item="updateItem($event, item, 'price')" />
          </template>

          <!-- Quantity Click To Edit -->
          <template #item.quantity="{ item }">
            <click-to-edit
              :custom-class="'quantity-column'"
              :style="{ fontSize: '0.875rem' }"
              type="number"
              :unique-identifier="`quantity${item.id}Ref`"
              :value="String(item.quantity)"
              @handle-update-item="updateItem($event, item, 'quantity')" />
          </template>

          <!-- Totals -->
          <template #body.append="{ items }">
            <tr>
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
                {{ weightTotal(items) }}
              </td>

              <!-- Price Total -->
              <td
                class="text-center"
                :colspan="1">
                {{ priceTotal(items) }}
              </td>

              <!-- Quantity Total -->
              <td
                class="text-center pr-4"
                :colspan="1">
                {{ quantityTotal(items) }}
              </td>
            </tr>
          </template>
        </v-data-table>

        <!-- Add New Item Button -->
        <v-btn
          v-if="!friend"
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
      </v-list>

      <!-- Add New Category Button -->
      <v-container
        v-if="!friend"
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
  import ClickToEdit from '~/components/ClickToEdit.vue';
  import { convertToDollars } from '~/helpers/functions';

  export default {
    props: {
      activePack: {
        type: Object,
        default: () => {}
      },
      friend: {
        type: Boolean,
        default: false
      }
    },

    data: () => ({
      currentItemKey: 0,
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
          // requireDecimal: true, // TODO: Need to figure out why 00 isn't appending
          thousandsSeparatorSymbol: ','
        });
      }
    },

    methods: {
      handleAddNewCategory () {
        console.log('handleAddNewCategory');
      },
      handleAddNewItem () {
        console.log('handleAddNewItem');
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
        const reduced = items.reduce((sum, elem) => sum + elem.price, 0);
        return convertToDollars(reduced);
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
      },
      weightTotal (items) {
        return `${items.reduce((sum, elem) => sum + elem.weight, 0)}oz`;
      }
    },

    mounted () {
      this.primaryColor = this.$nuxt.$vuetify.theme.themes.light.primary;
    },

    components: {
      ClickToEdit
    }
  };
</script>

<style lang="scss">

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
