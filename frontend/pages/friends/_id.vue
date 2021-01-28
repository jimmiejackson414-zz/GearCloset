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
          <v-col
            v-if="friend.packs.length"
            class="wrapper col-12 col-md-6 offset-md-3">
            <selected-pack-graph
              v-resize="onResize"
              :chart-data="chartData"
              :is-mobile="isMobile"
              :styles="graphStyles" />
            <!-- Data Tables -->
            <div
              class="table-wrapper col-12">
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
                  <template #item.weight="{item}">
                    {{ item.weight }}{{ item.weight_type }}
                  </template>
                  <template #item.price="{ item }">
                    {{ itemPrice(item) }}
                  </template>
                  <template #item.consumable="{ item }">
                    <div :class="['boolean-wrapper consumable', {active: item.consumable}]">
                      <custom-icon
                        :height="20"
                        name="utensils-alt"
                        :width="20" />
                    </div>
                  </template>
                  <template #item.worn="{ item }">
                    <div :class="['boolean-wrapper worn', {active: item.worn}]">
                      <custom-icon
                        :height="20"
                        name="layer-group"
                        :width="20" />
                    </div>
                  </template>
                  <template #body.append="{ items }">
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
            </div>
          </v-col>
          <div
            v-else
            class="mt-10 mx-auto text-center">
            <p>Looks like {{ friend.first_name }} hasn't set a Pack for this Trip yet!</p>
          </div>
        </v-row>
      </v-container>
    </div>
  </section>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import { convertToDollars } from '~/helpers/functions';
  import currentUser from '~/mixins/currentUser';
  import MembershipChip from '~/components/MembershipChip.vue';
  import Trip from '~/database/models/trip';
  import SelectedPackGraph from '~/components/graphs/SelectedPackGraph.vue';

  export default {
    name: 'FriendPackList',

    mixins: [currentUser],

    middleware: 'authenticated',

    async fetch () {
      const payload = { variables: { id: this.$route.params.id } };
      const { friend } = await this.fetchFriend(payload);
      this.friend = friend;
    },

    data: () => ({
      chartData: {
        labels: null,
        datasets: null
      },
      chartHeight: 300,
      chartWidth: 500,
      friend: null,
      headers: [
        { text: 'Type', align: 'left', sortable: true, value: 'generic_type', width: '25%' },
        { text: 'Name', align: 'left', sortable: true, value: 'name', width: '25%' },
        { text: 'Consumable', align: 'center', sortable: true, value: 'consumable', width: '1%' },
        { text: 'Worn', align: 'center', sortable: true, value: 'worn', width: '1%' },
        { text: 'Weight', align: 'center', sortable: true, value: 'weight', width: '15%' },
        { text: 'Price', align: 'center', sortable: true, value: 'price', width: '15%' },
        { text: 'Quantity', align: 'center', sortable: true, value: 'quantity', width: '25%' }
      ],
      isMobile: true
    }),

    computed: {
      ...mapState({
        selectedTripId: state => state.entities.trips.selectedTripId
      }),
      activePack () {
        if (!this.friend.packs.length) { return null; }
        return this.friend.packs.find(pack => {
          return this.selectedTrip.pack_id === pack.id;
        });
      },
      graphStyles () {
        return {
          height: `${this.chartHeight}px`,
          margin: '0 auto',
          position: 'relative',
          width: `${this.chartWidth}px`
        };
      },
      packQuantityCopy () {
        const numOfPacks = this.friend.packs.length;
        return `${numOfPacks} Pack${numOfPacks !== 1 ? 's' : ''}`;
      },
      selectedTrip () {
        return Trip.find(this.selectedTripId);
      }
    },

    methods: {
      ...mapActions('entities/users', [
        'fetchFriend'
      ]),
      itemPrice (item) {
        return convertToDollars(item.price);
      },
      onResize () {
        const width = window.innerWidth;
        if ((width < 560) || (width < 1264 && width > 959)) {
          this.chartWidth = 400;
          this.isMobile = true;
        } else {
          this.chartWidth = 500;
          this.isMobile = false;
        }
      },
      priceTotal (items) {
        const reduced = items.reduce((sum, elem) => sum + elem.price, 0);
        return convertToDollars(reduced);
      },
      quantityTotal (items) {
        return items.reduce((sum, elem) => sum + elem.quantity, 0);
      },
      weightTotal (items) {
        return `${items.reduce((sum, elem) => sum + elem.weight, 0)}oz`;
      }
    },

    components: {
      MembershipChip,
      SelectedPackGraph
    },

    head () {
      return {
        title: `${this.$options.filters.prettyName(this.friend)} | Pack List`
      };
    }
  };
</script>

<style lang="scss" scoped>
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
</style>

<style lang="scss">
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
            background-color: $accentDarkest;
            border-radius: 50%;
          }

          &.consumable {
            background-color: darken($secondaryLight, 10%);
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>
