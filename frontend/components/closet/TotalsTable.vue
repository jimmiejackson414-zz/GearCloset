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
            <th class="text-center unit-select">
              <v-select
                v-model="selectedUnit"
                dense
                hide-details
                :items="weightItems" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="( category, index ) in selectedPack.categories"
            :key="index">
            <td class="text-left">
              {{ category.name }}
            </td>
            <td class="text-center">
              <div class="price-column">
                <client-only>
                  <unicon
                    class="d-flex"
                    fill="#494f57"
                    height="14"
                    name="dollar-alt"
                    width="14" />
                </client-only>
                {{ priceTotal(category) }}
              </div>
            </td>
            <td class="text-center">
              {{ category | displayCategoryWeight(selectedUnit) }}
            </td>
            <td class="text-left pl-0">
              {{ selectedUnit }}
            </td>
          </tr>

          <!-- Consumable Weight -->
          <tr class="totals">
            <td class="font-weight-bold text-left">
              Consumable:
            </td>
            <td class="text-center">
              <div class="price-column">
                <client-only>
                  <unicon
                    fill="#494f57"
                    height="14"
                    name="dollar-alt"
                    width="14" />
                </client-only>
                {{ prices.consumable }}
              </div>
            </td>
            <td class="text-center">
              {{ weights.consumable }}
            </td>
            <td class="text-left pl-0">
              {{ selectedUnit }}
            </td>
          </tr>

          <!-- Worn Weight -->
          <tr>
            <td class="font-weight-bold text-left">
              Worn:
            </td>
            <td class="text-center">
              <div class="price-column">
                <client-only>
                  <unicon
                    fill="#494f57"
                    height="14"
                    name="dollar-alt"
                    width="14" />
                </client-only>
                {{ prices.worn }}
              </div>
            </td>
            <td class="text-center">
              {{ weights.worn }}
            </td>
            <td class="text-left pl-0">
              {{ selectedUnit }}
            </td>
          </tr>

          <!-- Base Weight -->
          <tr>
            <td class="font-weight-bold text-left">
              Base:
            </td>
            <td class="text-center">
              <div class="price-column">
                <client-only>
                  <unicon
                    fill="#494f57"
                    height="14"
                    name="dollar-alt"
                    width="14" />
                </client-only>
                {{ prices.base }}
              </div>
            </td>
            <td class="text-center">
              {{ weights.base }}
            </td>
            <td class="text-left pl-0">
              {{ selectedUnit }}
            </td>
          </tr>

          <!-- Total Weights -->
          <tr>
            <td class="font-weight-bold text-left">
              Total:
            </td>
            <td class="text-center">
              <div class="price-column">
                <client-only>
                  <unicon
                    fill="#494f57"
                    height="14"
                    name="dollar-alt"
                    width="14" />
                </client-only>
                {{ prices.total }}
              </div>
            </td>
            <td class="text-center">
              {{ weights.total }}
            </td>
            <td class="text-left pl-0">
              {{ selectedUnit }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
  import convert from 'convert-units';
  import { calculatePackPrices, calculatePackWeights, convertToDollars } from '~/helpers/functions';

  export default {
    props: {
      selectedPack: {
        type: Object,
        default: () => {}
      }
    },

    data: () => ({
      selectedUnit: 'lb',
      weightItems: ['oz', 'lb', 'g', 'kg']
    }),

    computed: {
      prices () {
        const { base, consumable, total, worn } = calculatePackPrices(this.selectedPack);

        return {
          base: convertToDollars(base),
          consumable: convertToDollars(consumable),
          total: convertToDollars(total),
          worn: convertToDollars(worn)
        };
      },
      weights () {
        const { base, consumable, total, worn } = calculatePackWeights(this.selectedPack);

        return {
          base: `${convert(base).from('g').to(this.selectedUnit).toFixed(2)}`,
          consumable: `${convert(consumable).from('g').to(this.selectedUnit).toFixed(2)}`,
          total: `${convert(total).from('g').to(this.selectedUnit).toFixed(2)}`,
          worn: `${convert(worn).from('g').to(this.selectedUnit).toFixed(2)}`
        };
      }
    },

    methods: {
      priceTotal (category) {
        const reduced = category.items.reduce((sum, elem) => sum + Number(elem.price), 0);
        return convertToDollars(reduced);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .totals-wrapper {
    .v-data-table {
      tbody {
        tr {
          &.totals {
            td {
              border-top: 1px solid $grey5;
            }
          }
        }
        .price-column {
          align-items: center;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
</style>

<style lang="scss">
  .totals-wrapper {
    .v-data-table {
      thead {
        th {
          &.unit-select {
            padding: 0;

            .v-select {
              margin-bottom: 2px;
              margin-top: 0;

              .v-input__slot {
                &::before {
                  border-bottom: none;
                  border-color: transparent;
                }

                .v-select__selections {
                  input {
                    display: none;
                  }
                }
              }

              .v-select__selection {
                color: rgba(0, 0, 0, 0.6);
                font-size: 12px;
              }

              &:hover {
                .v-input__slot {
                  &::before, &::after {
                    border-bottom: none;
                    border-color: transparent;
                    transform: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
