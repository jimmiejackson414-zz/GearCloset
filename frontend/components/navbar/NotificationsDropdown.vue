<template>
  <div
    class="notifications-wrapper"
    @click="openNotificationsMenu">
    <v-badge
      bottom
      class="notification-badge"
      color="error"
      :content="currentUser.notifications.length || 0"
      dot
      left
      overlap
      :value="currentUser.notifications.length || 0">
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

    <v-menu
      v-model="showMenu"
      absolute
      offset-y
      :position-x="menuPosition.x"
      :position-y="menuPosition.y"
      style="max-width: 400px">
      <v-list
        dense
        elevation="1">
        <v-list-item-group>
          <v-list-item
            v-for="item in currentUser.notifications"
            :key="item.id"
            two-line>
            <v-list-item-content>
              <v-list-item-title>{{ item.message }}</v-list-item-title>
              <v-list-item-subtitle>{{ formatDate(item) }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  import * as dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';

  export default {
    props: {
      currentUser: {
        type: Object,
        default: () => {}
      }
    },

    data: () => ({
      menuPosition: {
        x: 0,
        y: 0
      },
      showMenu: false
    }),

    methods: {
      formatDate (item) {
        return dayjs(item.date).fromNow();
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
    }

  };
</script>

<style lang="scss" scoped>

</style>
