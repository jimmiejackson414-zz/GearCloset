<template>
  <div class="uploader-wrapper">
    <file-pond
      ref="filepondUploader"
      :accepted-file-types="['image/jpeg', 'image/png']"
      :allow-multiple="false"
      :instant-upload="false"
      max-file-size="4MB"
      name="avatar"
      @addfile="addFile"
      @removefile="removeFile" />
    <slide-fade-transition>
      <div
        v-if="error"
        class="error-wrapper mt-3">
        <p class="body-text-1 text-center mb-0 font-weight-bold error--text">
          {{ error.main }}
        </p>
        <p class="body-text-1 text-center error--text">
          {{ error.sub }}
        </p>
      </div>
    </slide-fade-transition>
  </div>
</template>

<script>
  import vueFilePond, { setOptions } from 'vue-filepond';
  import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
  import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
  import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
  import 'filepond/dist/filepond.min.css';
  import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

  const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginFileValidateSize,
    FilePondPluginImagePreview,
    FilePondPluginFileEncode
  );

  setOptions({
    labelIdle: 'Drag & Drop your picture<br/>or <span class="filepond--label-action">Browse</span>',
    imagePreviewHeight: 170,
    imageCropAspectRatio: '1:1',
    imageResizeTargetWidth: 250,
    imageResizeTargetHeight: 250,
    stylePanelLayout: 'compact circle',
    styleLoadIndicatorPosition: 'center bottom',
    styleButtonRemoveItemPosition: 'center bottom'
  });

  export default {
    data: () => ({
      error: null
    }),

    methods: {
      removeFile () {
        this.$emit('handle-image-upload', null);
      },
      addFile (e) {
        if (e) {
          this.error = e;
          this.$refs.filepondUploader.removeFile();
          return;
        }
        const initial = this.$refs.filepondUploader.getFile(0);
        const file = initial.getFileEncodeDataURL();
        this.$emit('handle-image-upload', file);
      }
    },

    components: {
      FilePond,
      SlideFadeTransition: () => import(/* webpackPrefetch: true */ './transitions/SlideFadeTransition.vue')
    }
  };
</script>

<style lang="scss">
  .uploader-wrapper {
    cursor: pointer;

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
  }
</style>
