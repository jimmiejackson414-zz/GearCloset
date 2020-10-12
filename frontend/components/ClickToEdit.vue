<template>
  <v-text-field
    :id="uniqueIdentifier"
    :ref="uniqueIdentifier"
    v-focus
    :class="[ 'click-to-edit', active ? 'active' : 'b-none' ]"
    color="primary"
    dense
    hide-details
    outlined
    :type="type"
    :value="localValue"
    @blur="handleUpdateItem($event)"
    @click="activateInput"
    @keyup.enter.native="handleUpdateItem($event)" />
</template>

<script>
  export default {
    props: {
      uniqueIdentifier: {
        type: String,
        default: () => ''
      },
      type: {
        type: String,
        default: () => 'text'
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
