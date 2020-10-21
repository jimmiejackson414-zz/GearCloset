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

        <!-- Add New Item Button -->
        <v-btn
          :ripple="false"
          text
          @click="handleAddNewItem">
          <custom-icon
            :fill="primaryColor"
            height="18px"
            name="plus"
            width="18px" />
          <p class="body-2 primary--text mb-0 ml-3">
            Add New Item
          </p>
        </v-btn>
      </v-list>

      <!-- Add New Category Button -->
      <v-container class="new-category-container">
        <v-row>
          <v-col class="col-12">
            <v-btn
              class="pl-1"
              :ripple="false"
              text
              @click="handleAddNewCategory">
              <custom-icon
                :fill="primaryColor"
                height="18px"
                name="plus"
                width="18px" />
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

  export default {
    props: {
      activePack: {
        type: Object,
        default: () => {}
      }
    },

    data: () => ({
      currentItemKey: 0,
      headers: [
        { text: '', align: 'left', sortable: false, value: 'drag', width: '1%' },
        { text: 'Type', align: 'left', sortable: true, value: 'generic_type', width: '25%' },
        { text: 'Name', align: 'left', sortable: true, value: 'name', width: '25%' },
        { text: 'Weight', align: 'center', sortable: true, value: 'weight', width: '15%' },
        { text: 'Price', align: 'center', sortable: true, value: 'price', width: '15%' },
        { text: 'Consumable', align: 'center', sortable: true, value: 'consumable', width: '10%' },
        { text: 'Worn', align: 'center', sortable: true, value: 'worn', width: '8%' },
        { text: '', align: 'right', sortable: false, value: 'remove', width: '1%' }
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

    mounted () {
      this.primaryColor = this.$nuxt.$vuetify.theme.themes.light.primary;
    },

    components: {
      ClickToEdit
    }
  };
</script>

<style lang="scss" scoped>

</style>
