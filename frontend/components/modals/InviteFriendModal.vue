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
        <v-alert
          v-if="showError"
          border="top"
          class="mt-4"
          color="error"
          dense
          outlined>
          <template #prepend>
            <custom-icon
              custom-class="mr-4"
              :fill="errorColor"
              :height="30"
              name="exclamation-triangle"
              :width="30" />
            <p class="body-text-1 mb-0 error--text">
              You have provided an invalid email. Please fix and resubmit.
            </p>
          </template>
        </v-alert>
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
            hint="TIP: Press spacebar after entering an email to set it."
            item-text="email"
            item-value="id"
            :items="existingFriends"
            :loading="isLoading"
            multiple
            open-on-clear
            outlined
            return-object
            :search-input.sync="search"
            @change="handleChange"
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
          class="mr-4"
          color="primary"
          depressed
          :disabled="submitting || showError"
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
  import { findIndex } from 'lodash';
  import { mapActions } from 'vuex';
  import { friendService } from '~/services';
  import { validateEmail } from '~/helpers/functions';
  import Avatar from '~/components/Avatar';
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
      errorColor: '',
      existingFriends: [],
      isLoading: false,
      search: null,
      showError: false,
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
      handleChange (e) {
        this.showError = false;
        // convert newly added email to an object for easier backend processing
        const item = e[e.length - 1];
        if (typeof item === 'string') {
          if (validateEmail(item)) {
            const index = findIndex(this.chosenFriends, item);
            this.chosenFriends.splice(index, 1, { email: item });
          } else {
            this.showError = true;
          }
        }
      },
      async handleInviteFriend () {
        this.submitting = true;
        const numFriends = `${this.chosenFriends.length - this.friends.length} ${this.chosenFriends.length === 1 ? 'friend' : 'friends'}`;

        const payload = {
          fields: { trip: this.trip.id, friends: this.chosenFriends },
          apollo: this.$apollo
        };

        await friendService.addFriend(payload);

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
      this.errorColor = this.$nuxt.$vuetify.theme.themes.light.error;
      if (this.friends.length) {
        // this.friends.forEach(friend => delete friend.__typename);
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

<style lang="scss">
  .selects-wrapper {
    .v-autocomplete {
      .v-select__selections {
        .v-chip--select {
          margin: 2px 4px;
        }
      }
    }
  }
</style>
