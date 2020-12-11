<template>
  <v-dialog
    v-model="show"
    max-width="750">
    <v-card>
      <v-card-title>
        Choose a New Chart Color Theme
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="localTheme"
                color="primary"
                dense
                hide-details
                item-text="text"
                item-value="value"
                :items="themeOptions"
                label="Theme Options"
                outlined>
                <template #selection="{ item }">
                  <p class="mb-0 mr-4 text-body-1">
                    {{ item.text }}
                  </p>
                  <color-swatch :colors="item.colors" />
                </template>
                <template #item="{ item, attrs, on }">
                  <v-list-item
                    v-bind="attrs"
                    v-on="on">
                    <v-list-item-content>
                      <v-list-item-title>
                        <span class="mr-4">{{ item.text }}</span>
                        <color-swatch :colors="item.colors" />
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions class="justify-space-between">
        <v-btn
          class="grey7--text"
          :ripple="false"
          text
          @click="closeModal">
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          depressed
          :ripple="false"
          @click="handleUpdate">
          <span>Update Theme</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import ColorSwatch from '~/components/ColorSwatch.vue';

  export default {
    props: {
      theme: {
        type: String,
        default: ''
      },
      themeOptions: {
        type: Array,
        default: () => []
      },
      value: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        localTheme: this.theme
      };
    },

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
      closeModal () {
        this.show = false;
      },
      handleUpdate () {
        this.$emit('handle-update', this.localTheme);
      }
    },

    watch: {
      theme (val) {
        this.localTheme = val;
      }
    },

    components: {
      ColorSwatch
    }
  };
</script>

<style lang="scss" scoped>
  .v-card {
    border-top: 5px solid $primary;
  }
</style>
