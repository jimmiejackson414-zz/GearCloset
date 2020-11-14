<template>
  <div class="uploader-wrapper">
    <file-pond
      ref="filepondUploader"
      accepted-file-types="image/jpeg, image/png"
      :allow-multiple="false"
      :instant-upload="false"
      name="avatar"
      @addfile="submit" />
  </div>
</template>

<script>
  import vueFilePond, { setOptions } from 'vue-filepond';
  import 'filepond/dist/filepond.min.css';

  import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
  import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

  const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview
  );

  setOptions({
    labelIdle: 'Drag & Drop your picture<br/>or <span class="filepond--label-action">Browse</span>',
    imagePreviewHeight: 170,
    imageCropAspectRatio: '1:1',
    imageResizeTargetWidth: 200,
    imageResizeTargetHeight: 200,
    stylePanelLayout: 'compact circle',
    styleLoadIndicatorPosition: 'center bottom',
    styleButtonRemoveItemPosition: 'center bottom'
  });

  export default {
    methods: {
      submit () {
        const files = this.$refs.filepondUploader.getFiles();
        this.$emit('handle-image-upload', files[0]);
      }
    },

    components: {
      FilePond
    }
  };
</script>

<style lang="scss">
  .filepond--wrapper {
    .filepond--root {
      max-height: 20rem;
      max-width: 20rem;
      margin: 0 auto;
    }
  }

  .filepond--credits {
    display: none;
  }
</style>
