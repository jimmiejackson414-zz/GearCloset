<template>
  <div class="uploader-wrapper">
    <file-pond
      ref="filepondUploader"
      accepted-file-types="image/jpeg, image/png"
      :allow-multiple="false"
      :instant-upload="false"
      name="avatar"
      @addfile="submit"
      @removefile="removeFile" />
  </div>
</template>

<script>
  import vueFilePond, { setOptions } from 'vue-filepond';
  import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
  import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
  import 'filepond/dist/filepond.min.css';
  import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

  const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview,
    FilePondPluginFileEncode
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
      removeFile () {
        this.$emit('handle-image-upload', null);
      },
      submit () {
        const initial = this.$refs.filepondUploader.getFile(0);
        const file = initial.getFileEncodeDataURL();
        this.$emit('handle-image-upload', file);
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
