<template>
  <v-text-field
    :id="uniqueIdentifier"
    :ref="uniqueIdentifier"
    v-focus
    v-mask="mask"
    :class="[ 'click-to-edit', active ? 'active' : 'b-none', ...customClass ]"
    color="primary"
    dense
    hide-details
    outlined
    :style="{...customStyle}"
    :type="type"
    :value="localValue"
    @blur="handleUpdateItem($event)"
    @click="activateInput"
    @keyup.enter.native="handleUpdateItem($event)" />
</template>

<script>
  /* eslint-disable vue/require-default-prop */
  export default {
    props: {
      customClass: { // additional custom classes
        type: String,
        default: ''
      },
      customStyle: { // if additional custom styles need to be added
        type: Object,
        default: () => {}
      },
      mask: {
        type: Function,
        required: false
      },
      type: {
        type: String,
        default: () => 'text'
      },
      uniqueIdentifier: {
        type: String,
        default: () => ''
      },
      value: {
        type: String,
        default: () => ''
      }
    },

    data () {
      return {
        active: false,
        localValue: this.value
      };
    },

    methods: {
      activateInput () {
        this.active = true;
      },
      handleUpdateItem (e) {
        this.valueLocal = e.target.value;
        this.active = false;
        this.$emit('handle-update-item', this.valueLocal);

        if (e.type === 'keyup') { this.$refs[this.uniqueIdentifier].blur(); }
      }
    },

    watch: {
      value () {
        this.valueLocal = this.value;
      }
    },

    directives: {
      focus: {
        update (el) {
          el.focus();
        }
      }
    }
  };
</script>

<style lang="scss">
  .v-input.click-to-edit {
    &.b-none {
      fieldset {
        border: none !important;
      }
    }
  }
</style>
