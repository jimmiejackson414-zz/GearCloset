<template>
  <v-card
    class="category-box-wrapper"
    outlined>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-list-item class="px-0">
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                {{ category.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ category.description }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          class="pb-0"
          cols="8">
          <p class="body-text-1 font-weight-bold mb-0">
            Category
          </p>
        </v-col>
        <v-col
          class="pb-0 text-center"
          cols="2">
          <p class="body-text-1 font-weight-bold mb-0">
            Topics
          </p>
        </v-col>
        <v-col
          class="pb-0 text-center"
          cols="2">
          <p class="body-text-1 font-weight-bold mb-0">
            Posts
          </p>
        </v-col>
      </v-row>
      <v-row
        v-for="sub in category.subcategories"
        :key="sub.id">
        <v-col
          cols="8">
          <div
            class="subcategory d-flex">
            <nuxt-link
              class="d-flex align-center mb-4"
              :to="{ name: 'forums-slug', params: { slug: sub.slug } }">
              <custom-icon
                custom-class="mr-4"
                :fill="primaryColor"
                :height="20"
                name="comment-alt-dots"
                :width="20" />
              {{ sub.title }}
            </nuxt-link>
          </div>
        </v-col>
        <v-col class="text-center">
          {{ topicsCount(sub) }}
        </v-col>
        <v-col class="text-center">
          {{ postsCount(sub) }}
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    props: {
      category: {
        type: Object,
        default: () => {}
      }
    },

    data: () => ({
      primaryColor: ''
    }),

    methods: {
      postsCount (sub) {
        return sub.topics.reduce((sum, elem) => sum + elem.posts.length, 0);
      },
      topicsCount (sub) {
        return sub.topics.length;
      }
    },

    created () {
      this.primaryColor = this.$nuxt.$vuetify.theme.themes.light.primary;
    }
  };
</script>

<style lang="scss" scoped>
  .category-box-wrapper {
    margin-bottom: 1rem;
    padding: 0 2rem;
  }
</style>
