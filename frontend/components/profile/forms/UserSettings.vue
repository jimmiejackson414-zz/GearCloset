<template>
  <v-form
    ref="userSettingsForm"
    v-model="valid"
    @submit.prevent="handleSubmit">
    <v-container class="pt-0">
      <v-row class="justify-center align-center mb-6">
        <div class="avatar-container">
          <div
            v-if="!currentUser || !currentUser.avatar_url"
            class="image-wrapper">
            <image-uploader @handle-image-upload="handleImageUpload" />
          </div>

          <v-avatar
            v-else
            size="250">
            <client-only>
              <cld-image
                crop="fill"
                fetch-format="auto"
                gravity="auto:subject"
                height="250"
                :public-id="currentUser.avatar_url"
                quality="auto"
                radius="max"
                width="250">
                <cld-placeholder type="pixelate" />
              </cld-image>
            </client-only>
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
      <v-row v-if="localUser">
        <!-- First Name -->
        <v-col class="col-12 col-md-6">
          <v-text-field
            v-model="localUser.first_name"
            color="primary"
            dense
            :disabled="submitting"
            label="First Name"
            outlined
            required
            :rules="nameRules"
            validate-on-blur>
            <template #prepend-inner>
              <custom-icon
                :fill="primaryColor"
                :height="20"
                name="user-circle"
                :width="20" />
            </template>
          </v-text-field>
        </v-col>

        <!-- Last Name -->
        <v-col class="col-12 col-md-6">
          <v-text-field
            v-model="localUser.last_name"
            color="primary"
            dense
            :disabled="submitting"
            label="Last Name"
            outlined
            required
            :rules="nameRules"
            validate-on-blur>
            <template #prepend-inner>
              <custom-icon
                :fill="primaryColor"
                :height="20"
                name="user-circle"
                :width="20" />
            </template>
          </v-text-field>
        </v-col>

        <!-- Trail Name -->
        <v-col class="col-12 col-md-6">
          <v-text-field
            v-model="localUser.trail_name"
            color="primary"
            dense
            :disabled="submitting"
            label="Trail Name"
            outlined
            required
            :rules="nameRules"
            validate-on-blur>
            <template #prepend-inner>
              <custom-icon
                :fill="primaryColor"
                :height="20"
                name="user-circle"
                :width="20" />
            </template>
          </v-text-field>
        </v-col>

        <!-- Country -->
        <v-col class="col-12 col-md-6">
          <v-select
            v-model="localUser.country"
            color="primary"
            dense
            :disabled="submitting"
            :items="countriesArr"
            label="Country"
            outlined
            required
            validate-on-blur>
            <template #prepend-inner>
              <custom-icon
                :fill="primaryColor"
                :height="20"
                name="globe"
                :width="20" />
            </template>
          </v-select>
        </v-col>

        <!-- Email -->
        <v-col class="col-12 col-md-6">
          <v-text-field
            v-model="localUser.email"
            color="primary"
            dense
            :disabled="submitting"
            label="Email"
            outlined
            required
            :rules="emailRules"
            validate-on-blur>
            <template #prepend-inner>
              <custom-icon
                fill="#0077be"
                :height="20"
                name="envelope-alt"
                :width="20" />
            </template>
          </v-text-field>
        </v-col>

        <!-- Preferred System -->
        <v-col class="col-12 col-md-6">
          <v-select
            v-model="localUser.measuring_system"
            color="primary"
            dense
            :disabled="submitting"
            :items="systems"
            label="Measurement System"
            outlined
            required
            validate-on-blur>
            <template #prepend-inner>
              <custom-icon
                :fill="primaryColor"
                :height="20"
                name="balance-scale"
                :width="20" />
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
            type="submit">
            <loading
              v-if="submitting"
              color="#fff"
              height="30px"
              width="30px" />
            <span v-else>Submit</span>
          </v-btn>
        </v-col>
      </v-row>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  /* eslint-disable camelcase */
  import { countries } from '~/helpers';
  import { userService } from '~/services';
  import CustomIcon from '~/components/icons/CustomIcon.vue';
  import ImageUploader from '~/components/ImageUploader.vue';
  import Loading from '~/components/Loading.vue';
  import MembershipChip from '~/components/MembershipChip.vue';

  export default {
    props: {
      currentUser: {
        type: Object,
        default: () => {}
      }
    },

    data: () => ({
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      iconColor: '',
      localUser: null,
      nameRules: [
        v => !!v || 'This is a required field.'
      ],
      primaryColor: '',
      submitting: false,
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
      async handleImageUpload (avatar) {
        const payload = { fields: { file: avatar }, apollo: this.$apollo };
        await userService.updateAvatar(payload);
      },
      async handleSubmit () {
        if (this.$refs.userSettingsForm.validate()) {
          this.submitting = true;

          const payload = {
            fields: { id: this.currentUser.id, ...this.localUser },
            apollo: this.$apollo
          };
          await userService.update(payload);

          this.submitting = false;
        }
      },
      async removeAvatar () {
        const payload = { fields: { file: null }, apollo: this.$apollo };
        await userService.updateAvatar(payload);
      }
    },

    mounted () {
      const { first_name, last_name, trail_name, country, email, measuring_system } = this.currentUser;
      this.localUser = {
        first_name,
        last_name,
        trail_name,
        country,
        email,
        measuring_system
      };
      this.iconColor = $nuxt.$vuetify.theme.themes.light['dark-grey'];
      this.primaryColor = $nuxt.$vuetify.theme.themes.light.primary;
    },

    components: {
      CustomIcon,
      ImageUploader,
      Loading,
      MembershipChip
    }
  };
</script>

<style lang="scss" scoped>
  .avatar-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    margin-right: 0;

    .image-wrapper {
      height: 200px;
      width: 200px;
    }

    @include breakpoint(laptop) {
      margin-bottom: 0;
      margin-right: 3rem;
    }

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
