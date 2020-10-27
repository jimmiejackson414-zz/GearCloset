<template>
  <v-form
    ref="userSettingsForm"
    v-model="valid">
    <v-container class="pt-0">
      <v-row class="justify-center align-center mb-6">
        <div class="avatar-container">
          <v-avatar
            v-if="!currentUser || !currentUser.avatar_url"
            color="primary"
            size="200">
            <h1 class="white--text">
              {{ currentUser | initials }}
            </h1>
            <div class="overlay">
              <v-btn
                color="#fff"
                outlined
                :ripple="false">
                Change
              </v-btn>
            </div>
          </v-avatar>
          <v-avatar
            v-else
            size="250">
            <img
              alt="User Avatar"
              :src="currentUser.avatar_url">
            <div class="overlay">
              <v-btn
                color="#fff"
                outlined
                :ripple="false"
                @click="toggleUppyOpen">
                Change
              </v-btn>
            </div>
          </v-avatar>
          <v-btn
            v-if="currentUser && currentUser.avatar_url"
            color="primary"
            :ripple="false"
            text
            @click="removeAvatar">
            Remove
          </v-btn>
          </v-col>
        </div>
        <div class="names-container">
          <div class="text-h6 font-weight-bold">
            {{ currentUser | prettyName }}
          </div>
          <div class="text-body-1">
            {{ currentUser.email }}
          </div>
          <div class="text-body-1">
            {{ currentUser.country }}
          </div>
          <membership-chip
            :custom-class="'mt-2'"
            :user="currentUser" />
        </div>
      </v-row>
      <v-row>
        <!-- First Name -->
        <v-col class="col-12 col-md-6">
          <v-text-field
            v-model="currentUser.first_name"
            color="primary"
            dense
            :disabled="submitting"
            label="First Name"
            outlined
            required
            :rules="nameRules"
            validate-on-blur>
            <template v-slot:prepend-inner>
              <custom-icon
                :fill="primaryColor"
                height="20px"
                name="user-circle"
                width="20px" />
            </template>
          </v-text-field>
        </v-col>

        <!-- Last Name -->
        <v-col class="col-12 col-md-6">
          <v-text-field
            v-model="currentUser.last_name"
            color="primary"
            dense
            :disabled="submitting"
            label="Last Name"
            outlined
            required
            :rules="nameRules"
            validate-on-blur>
            <template v-slot:prepend-inner>
              <custom-icon
                :fill="primaryColor"
                height="20px"
                name="user-circle"
                width="20px" />
            </template>
          </v-text-field>
        </v-col>

        <!-- Trail Name -->
        <v-col class="col-12 col-md-6">
          <v-text-field
            v-model="currentUser.trail_name"
            color="primary"
            dense
            :disabled="submitting"
            label="Trail Name"
            outlined
            required
            :rules="nameRules"
            validate-on-blur>
            <template v-slot:prepend-inner>
              <custom-icon
                :fill="primaryColor"
                height="20px"
                name="user-circle"
                width="20px" />
            </template>
          </v-text-field>
        </v-col>

        <!-- Country -->
        <v-col class="col-12 col-md-6">
          <v-select
            v-model="currentUser.country"
            color="primary"
            dense
            :disabled="submitting"
            :items="countriesArr"
            label="Country"
            outlined
            required
            validate-on-blur>
            <template v-slot:prepend-inner>
              <custom-icon
                :fill="primaryColor"
                height="20px"
                name="globe"
                width="20px" />
            </template>
          </v-select>
        </v-col>

        <!-- Email -->
        <v-col class="col-12 col-md-6">
          <v-text-field
            v-model="currentUser.email"
            color="primary"
            dense
            :disabled="submitting"
            label="Email"
            outlined
            required
            :rules="emailRules"
            validate-on-blur>
            <template v-slot:prepend-inner>
              <custom-icon
                fill="#0077be"
                height="20px"
                name="envelope-alt"
                width="20px" />
            </template>
          </v-text-field>
        </v-col>

        <!-- Preferred System -->
        <v-col class="col-12 col-md-6">
          <v-select
            v-model="currentUser.system"
            color="primary"
            dense
            :disabled="submitting"
            :items="systems"
            label="Measurement System"
            outlined
            required
            validate-on-blur>
            <template v-slot:prepend-inner>
              <custom-icon
                :fill="primaryColor"
                height="20px"
                name="balance-scale"
                width="20px" />
            </template>
          </v-select>
        </v-col>
      </v-row>

      <!-- Form Submit -->
      <v-row class="text-right">
        <v-col class="col-12">
          <v-btn
            color="primary"
            depressed
            :disabled="submitting"
            :ripple="false"
            @click="handleSubmit">
            <loading
              v-if="submitting"
              color="#fff"
              height="30px"
              width="30px" />
            <span v-else>Submit</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  import { countries } from '~/helpers';
  import MembershipChip from '~/components/MembershipChip';

  export default {
    props: {
      currentUser: {
        type: Object,
        default: () => {}
      },
      submitting: {
        type: Boolean,
        default: false
      }
    },

    data: () => ({
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      iconColor: '',
      nameRules: [
        v => !!v || 'This is a required field.'
      ],
      primaryColor: '',
      systems: [
        { text: 'Imperial (oz, lb)', value: 'Imperial' },
        { text: 'Metric (g, kg)', value: 'Metric' }
      ],
      valid: false
    }),

    computed: {
      countriesArr () {
        return countries;
      }
    },

    methods: {
      handleSubmit () {
        this.$emit('handle-submit');
      }
    },

    mounted () {
      this.iconColor = $nuxt.$vuetify.theme.themes.light['dark-grey'];
      this.primaryColor = $nuxt.$vuetify.theme.themes.light.primary;
    },

    components: {
      MembershipChip
    }
  };
</script>

<style lang="scss" scoped>
  @import '~/css/breakpoints';

  .avatar-container {
    margin-right: 3rem;

    .v-avatar {
      .white--text {
        font-size: 4rem;
        font-weight: 300;
      }

      .overlay {
        align-items: center;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 50%;
        display: flex;
        height: 100%;
        justify-content: center;
        opacity: 0;
        position: absolute;
        transition: all 0.2s ease-in-out;
        width: 100%;
      }

      &:hover {
        .overlay {
          opacity: 1;
        }
      }
    }
  }

  .names-container {
    text-align: center;

    @include breakpoint(laptop) {
      text-align: left;
    }
  }
</style>
