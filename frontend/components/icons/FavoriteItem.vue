<template>
  <v-badge
    bordered
    color="grey4"
    :content="item.favorite.likes"
    icon
    overlap>
    <v-btn
      :class="[item.favorite.active ? 'active' : 'inactive', 'favorite-btn']"
      icon
      :ripple="false"
      small
      @click="toggleFavoriteItem">
      <custom-icon
        :height="16"
        name="heart"
        :width="16" />
    </v-btn>
  </v-badge>
</template>

<script>
  export default {
    // props: {
    //   item: {
    //     type: Object,
    //     default: () => {}
    //   }
    // },

    data: () => ({
      item: { // TODO: This is a temporary value
        favorite: {
          likes: Math.floor(Math.random() * 100),
          active: true
        }
      }
    }),

    methods: {
      toggleFavoriteItem (e) {
        console.log({ e });
        console.log('toggleFavoriteItem');
        this.item.favorite.active = !this.item.favorite.active;

        this.item.favorite.active ? this.item.favorite.likes++ : this.item.favorite.likes--;
      }
    }
  };
</script>

<style lang="scss">
  .favorite-btn {
    background-color: transparent;
    transition: 0.5s all $cubicBezier;

    &.inactive {
      &:hover {
        background-color: lighten($error, 40%);
      }
    }

    &.active {
      background-color: lighten($error, 10%);

      svg {
        fill: white;
      }
    }
  }

  .v-badge__wrapper {
    .v-badge__badge {
      color: $grey8;
    }
  }
</style>
