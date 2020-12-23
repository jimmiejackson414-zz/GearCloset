<template>
  <div class="totals-wrapper">
    <v-simple-table dense>
      <template>
        <thead>
          <tr>
            <th class="text-left">
              Category
            </th>
            <th class="text-center">
              Price
            </th>
            <th class="text-center">
              Weight
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="( category, index ) in categories"
            :key="index">
            <td class="text-left">
              {{ category.name }}
            </td>
            <td class="text-center">
              <div class="price-column">
                <custom-icon
                  fill="#494f57"
                  :height="14"
                  name="dollar-alt"
                  :width="14" />
                {{ priceTotal(category) }}
              </div>
            </td>
            <td class="text-center">
              {{ category | displayCategoryWeight('lb', true) }}
            </td>
          </tr>

          <!-- Consumable Weight -->
          <tr>
            <td class="font-weight-bold text-left">
              Consumable:
            </td>
            <td></td>
            <td class="text-center">
              {{ packTotal.consumable }}
            </td>
          </tr>

          <!-- Worn Weight -->
          <tr>
            <td class="font-weight-bold text-left">
              Worn:
            </td>
            <td></td>
            <td class="text-center">
              {{ packTotal.worn }}
            </td>
          </tr>

          <!-- Base Weight -->
          <tr>
            <td class="font-weight-bold text-left">
              Base:
            </td>
            <td></td>
            <td class="text-center">
              {{ packTotal.base }}
            </td>
          </tr>

          <!-- Total Weights -->
          <tr>
            <td class="font-weight-bold text-left">
              Total:
            </td>
            <td class="text-center">
              <div class="price-column">
                <custom-icon
                  fill="#494f57"
                  :height="14"
                  name="dollar-alt"
                  :width="14" />
                {{ packTotal.price }}
              </div>
            </td>
            <td class="text-center">
              {{ packTotal.total }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
  import convert from 'convert-units';
  import { calculatePackWeights, convertToDollars } from '~/helpers/functions';
  import CustomIcon from '~/components/icons/CustomIcon.vue';

  export default {
    props: {
      selectedPack: {
        type: Object,
        default: () => {}
      }
    },

    computed: {
      categories () {
        return this.selectedPack.categories.map(category => category);
      },
      packTotal () {
        const { base, consumable, total, worn } = calculatePackWeights(this.selectedPack);

        const priceTotal = this.categories.reduce((sum, elem) => {
          return sum + elem.items.reduce((sum, e) => sum + Number(e.price), 0);
        }, 0);

        return {
          base: `${convert(base).from('mg').to('lb').toFixed(2)}lb`,
          consumable: `${convert(consumable).from('mg').to('lb').toFixed(2)}lb`,
          price: convertToDollars(priceTotal),
          total: `${convert(total).from('mg').to('lb').toFixed(2)}lb`,
          worn: `${convert(worn).from('mg').to('lb').toFixed(2)}lb`
        };
      }
    },

    methods: {
      priceTotal (category) {
        const reduced = category.items.reduce((sum, elem) => sum + Number(elem.price), 0);
        return convertToDollars(reduced);
      },
      weightTotal (category) {
        const reduced = category.items.reduce((sum, elem) => sum + elem.weight, 0).toFixed(2);
        return `${convert(reduced).from('g').to('oz').toFixed(2)}oz`;
      }
    },

    components: {
      CustomIcon
    }
  };
</script>

<style lang="scss" scoped>
  .totals-wrapper {
    .v-data-table {
      tbody {
        .price-column {
          align-items: center;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
</style>
