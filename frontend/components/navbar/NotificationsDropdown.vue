<template>
  <div
    class="notifications-wrapper"
    @click="openNotificationsMenu">
    <v-badge
      v-if="showBadge"
      bottom
      class="notification-badge"
      color="error"
      :content="currentUser ? currentUser.notifications.length : 0"
      dot
      left
      overlap
      :value="currentUser ? currentUser.notifications.length : 0">
      <v-btn
        depressed
        icon
        :ripple="false">
        <custom-icon
          color="#4a4a4a"
          :height="20"
          name="bell"
          :width="20" />
      </v-btn>
    </v-badge>

    <v-btn
      v-else
      depressed
      icon
      :ripple="false">
      <custom-icon
        color="#4a4a4a"
        :height="20"
        name="bell"
        :width="20" />
    </v-btn>

    <v-menu
      v-model="showMenu"
      absolute
      :close-on-content-click="false"
      offset-y
      :position-x="menuPosition.x"
      :position-y="menuPosition.y"
      style="max-width: 400px">
      <v-list
        dense
        elevation="1">
        <v-subheader>Notifications</v-subheader>
        <v-list-item-group v-if="currentUser">
          <v-list-item
            v-for="item in currentUser.notifications"
            :key="item.id"
            active-class="no-active"
            :class="[item.viewed ? 'read' : 'unread']"
            two-line
            @click="handleShowNotification(item)">
            <v-list-item-content>
              <v-list-item-title>{{ item.message }}</v-list-item-title>
              <v-list-item-subtitle>{{ formatDate(item) }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <v-btn
            block
            color="primary"
            text
            @click="handleMarkAllAsRead">
            Mark All As Read
          </v-btn>
        </v-list-item-group>
        <v-list-item-group v-else>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>You have no new notifications.</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>

    <notification-modal
      v-model="showNotification"
      :notification="activeNotification" />
  </div>
</template>

<script>
  import * as dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import CustomIcon from '~/components/icons/CustomIcon.vue';
  import markAllReadMutation from '~/apollo/mutations/notifications/markAllRead.gql';
  import meQuery from '~/apollo/queries/user/me.gql';

  export default {
    props: {
      currentUser: {
        type: Object,
        default: () => {}
      }
    },

    data: () => ({
      activeNotification: null,
      menuPosition: {
        x: 0,
        y: 0
      },
      showMenu: false,
      showNotification: false
    }),

    computed: {
      showBadge () {
        return this.currentUser?.notifications.some(notification => !notification.viewed);
      }
    },

    methods: {
      formatDate (item) {
        return dayjs(item.date).fromNow();
      },
      async handleMarkAllAsRead () {
        await this.$apollo.mutate({
          mutation: markAllReadMutation,
          update (store, { data: { markAllRead } }) {
            const data = store.readQuery({ query: meQuery });
            data.currentUser.notifications = markAllRead.notifications;
            store.writeQuery({ query: meQuery, data });
          }
        });
      },
      handleShowNotification (item) {
        this.activeNotification = item;
        this.showNotification = true;
      },
      openNotificationsMenu (e) {
        this.showMenu = true;
        this.menuPosition.x = e.clientX - 250;
        if (e.clientY < 60) {
          this.menuPosition.y = 60;
        } else {
          this.menuPosition.y = e.clientY;
        }
      }
    },

    created () {
      dayjs.extend(relativeTime);
    },

    components: {
      CustomIcon,
      NotificationModal: () => import(/* webpackPrefetch: true */ '~/components/modals/NotificationModal')
    }

  };
</script>

<style lang="scss" scoped>
  .no-active {
    &:before {
      opacity: 0;
    }
  }

  .v-list-item {
    transition: 0.2s background-color ease-in-out;

    &.unread {
      background-color: lighten($accent, 30%);
    }
  }
</style>
