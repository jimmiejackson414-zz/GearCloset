<template>
  <v-dialog
    v-model="show"
    max-width="750"
    scrollable>
    <v-card>
      <v-card-title>View Notification</v-card-title>
      <v-card-text>{{ content }}</v-card-text>
      <v-card-actions class="justify-space-between">
        <v-btn
          class="grey6--text"
          :ripple="false"
          text
          @click="closeModal">
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          depressed
          :ripple="false"
          @click="handleMarkAsRead">
          <custom-icon
            fill="#fff"
            :height="20"
            name="check"
            :width="20" />
          <span>Mark As Read</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  // import { MARK_AS_READ_MUTATION } from '~/apollo/mutations/notifications/markAsRead';
  import CustomIcon from '~/components/icons/CustomIcon.vue';

  export default {
    props: {
      notification: {
        type: Object,
        default: () => {}
      },
      value: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      content () {
        return this.notification ? this.notification.message : '';
      },
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
      closeModal () {
        this.show = false;
      },
      handleMarkAsRead () {
        // TODO: handleMarkAsRead
        console.log('NEED TO RECREATE THIS METHOD');
        // const payload = { id: this.notification.id, viewed: true };
        // await this.$apollo.mutate({
        //   mutation: MARK_AS_READ_MUTATION,
        //   variables: payload
        // });
        this.show = false;
      }
    },

    components: {
      CustomIcon
    }
  };
</script>

<style lang="scss" scoped>

</style>
