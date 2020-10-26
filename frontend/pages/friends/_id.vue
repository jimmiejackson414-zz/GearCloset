<template>
  <section class="pt-6">
    <div class="content-container">
      <v-container grid-list-lg>
        <div class="header">
          <h3 class="text-h3 font-weight-bold text-center mr-3">
            {{ friend | prettyName }}
          </h3>
          <membership-chip :user="friend" />
        </div>
        <v-row>
          <v-col class="col-12 text-center">
            <div class="friend-details">
              <v-avatar
                class="mr-4"
                color="info"
                size="50">
                <img
                  v-if="friend.avatar_url"
                  alt="avatar"
                  :src="friend.avatar_url">
                <span
                  v-else
                  class="white--text text-body-1 font-weight-bold">{{ friend | initials }}</span>
              </v-avatar>
              <div class="right">
                <p class="body-text-1 mb-0">
                  {{ friend.country }}
                </p>
                <p class="body-text-1 mb-0">
                  {{ packQuantityCopy }}
                </p>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row class="friend-pack-list-wrapper">
          <v-col class="wrapper col-12 col-md-6 offset-md-3">
            <selected-pack-graph :height="300" />
          </v-col>
        </v-row>

        <!-- Data Tables -->
        <h4 class="text-h4 text-left">
          {{ activePack.name }}
        </h4>
        <v-list
          v-for="(category, index) in activePack.categories"
          :key="category.id"
          :class="['categories-container', activePack.categories.length === index + 1 ? 'last' : '']">
          <p class="text-body-1 font-weight-medium">
            {{ category.name }}
          </p>
          <v-data-table
            calculate-widths
            class="items-table-container"
            dense
            disable-pagination
            :headers="headers"
            hide-default-footer
            :items="category.items">
            <template v-slot:item.weight="{item}">
              {{ item.weight }}{{ item.weight_type }}
            </template>
            <template v-slot:item.price="{ item }">
              {{ itemPrice(item) }}
            </template>
            <template v-slot:item.consumable="{ item }">
              <div :class="['boolean-wrapper consumable', {active: item.consumable}]">
                <custom-icon
                  height="20px"
                  name="utensils-alt"
                  width="20px" />
              </div>
            </template>
            <template v-slot:item.worn="{ item }">
              <div :class="['boolean-wrapper worn', {active: item.worn}]">
                <custom-icon
                  height="20px"
                  name="layer-group"
                  width="20px" />
              </div>
            </template>
            <template v-slot:body.append="{ items }">
              <tr>
                <td :colspan="1">
                  <span class="font-weight-bold">Totals:</span>
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
                  class="text-center"
                  :colspan="1">
                  {{ quantityTotal(items) }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-list>
      </v-container>
    </div>
  </section>
</template>

<script>
  import { convertToDollars } from '~/helpers/functions';
  import currentUser from '~/mixins/currentUser';
  import MembershipChip from '~/components/MembershipChip.vue';

  export default {
    name: 'FriendPackList',

    mixins: [currentUser],

    data: () => ({
      headers: [
        { text: 'Type', align: 'left', sortable: true, value: 'generic_type', width: '25%' },
        { text: 'Name', align: 'left', sortable: true, value: 'name', width: '25%' },
        { text: 'Consumable', align: 'center', sortable: true, value: 'consumable', width: '1%' },
        { text: 'Worn', align: 'center', sortable: true, value: 'worn', width: '1%' },
        { text: 'Weight', align: 'center', sortable: true, value: 'weight', width: '15%' },
        { text: 'Price', align: 'center', sortable: true, value: 'price', width: '15%' },
        { text: 'Quantity', align: 'center', sortable: true, value: 'quantity', width: '25%' }
      ]
    }),

    computed: {
      activePack () {
        // TODO: need to update this later to reflect accurate info
        return this.friend.packs.find(pack => pack.active);
      },
      friend () {
        return this.currentUser.friends.find(friend => friend.id === Number(this.$route.params.id));
      },
      packQuantityCopy () {
        const numOfPacks = this.friend.packs.length;
        return `${numOfPacks} Pack${numOfPacks !== 1 ? 's' : ''}`;
      }
    },

    methods: {
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
      weightTotal (items) {
        return `${items.reduce((sum, elem) => sum + elem.weight, 0)}oz`;
      }
    },

    components: {
      MembershipChip
    }
  };
</script>

<style lang="scss">
  @import '~/css/colors';

  .header {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .friend-details {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .items-table-container {
    td {
      .boolean-wrapper {
        &.active {
          max-width: 30px;
          max-height: 30px;
          padding: 5px;
          margin: 0 auto;

          svg {
            fill: #fff;
          }

          &.worn {
            background-color: $success;
            border-radius: 50%;
          }

          &.consumable {
            background-color: $warning;
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>
