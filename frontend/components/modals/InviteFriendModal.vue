<template>
  <v-dialog
    v-model="show"
    max-width="750"
    :persistent="submitting">
    <v-card>
      <v-card-title>Invite A Friend</v-card-title>
      <v-card-text>
        <div class="text-body-1">
          Bring along an existing friend or invite a new one.
        </div>
        <div class="selects-wrapper mt-4">
          <!-- Select multiple from existing friends -->
          <v-combobox
            v-model="chosenFriends"
            autofocus
            cache-items
            chips
            clearable
            deletable-chips
            :delimiters="[',', ' ']"
            dense
            :filter="filter"
            hide-details
            item-text="email"
            item-value="id"
            :items="existingFriends"
            :loading="isLoading"
            multiple
            open-on-clear
            outlined
            :search-input.sync="search"
            @click="populateFriends">
            <template #item="{ item }">
              <span>
                <avatar
                  :size="30"
                  :user="item" />
                {{ item | prettyName('noTrailName') }}
              </span>
            </template>
          </v-combobox>
        </div>
      </v-card-text>
      <v-card-actions class="justify-space-between">
        <v-btn
          class="grey7--text"
          :disabled="submitting"
          :ripple="false"
          text
          @click="closeModal">
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          depressed
          :disabled="submitting"
          :ripple="false"
          @click="handleInviteFriend">
          <loading
            v-if="submitting"
            color="#fff"
            height="30px"
            width="30px" />
          <span v-else>Invite</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapActions } from 'vuex';
  import Avatar from '~/components/Avatar';
  import { friendService } from '~/services';
  import Loading from '~/components/Loading';

  export default {
    props: {
      friends: {
        type: Array,
        default: () => []
      },
      trip: {
        type: Object,
        default: () => {}
      },
      value: {
        type: Boolean,
        default: false
      }
    },

    data: () => ({
      chosenFriends: [],
      existingFriends: [],
      isLoading: false,
      search: null,
      submitting: false
    }),

    computed: {
      show: {
        get () {
          return this.value;
        },
        set (value) {
          this.$emit('input', value);
        }
      }
    },

    methods: {
      ...mapActions({
        success: 'alert/success',
        error: 'alert/error'
      }),
      closeModal () {
        this.show = false;
      },
      filter (item, queryText, itemText) {
        const text = this.$options.filters.prettyName(item, 'noTrailName');
        return text.toLowerCase().includes(queryText.toLowerCase());
      },
      handleInviteFriend () {
        this.submitting = true;
        const numFriends = `${this.chosenFriends.length} ${this.chosenFriends.length === 1 ? 'friend' : 'friends'}`;

        const payload = {
          data: { friends: this.chosenFriends, trip_id: this.trip.id },
          apollo: this.$apollo
        };
        console.log({ payload });

        // await friendService.addFriend(payload);

        this.submitting = false;
        this.$emit('handle-reset-modal');
        this.success(`Successfully invited ${numFriends}`);
      },
      async populateFriends () {
        this.isLoading = true;
        const payload = { apollo: this.$apollo };
        const { data } = await friendService.getFriends(payload);
        this.existingFriends = data.friends;
        this.isLoading = false;
      },
      removeItem (item) {
        this.chosenFriends = this.chosenFriends.filter(friend => friend !== item);
      }
    },

    mounted () {
      if (this.friends.length) {
        this.chosenFriends = this.friends;
      }
    },

    components: {
      Avatar,
      Loading
    }
  };
</script>

<style lang="scss" scoped>
  .v-card {
    border-top: 5px solid $primary;
  }
</style>
