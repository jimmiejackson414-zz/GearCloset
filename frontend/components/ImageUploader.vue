<template>
  <div class="uploader-wrapper">
    <file-pond
      ref="filepondUploader"
      accepted-file-types="image/jpeg, image/png"
      :allow-multiple="false"
      :instant-upload="false"
      name="avatar"
      :server="server"
      @addfile="submit"
      @removefile="removeFile" />
  </div>
</template>

<script>
  import vueFilePond, { setOptions } from 'vue-filepond';
  import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
  import 'filepond/dist/filepond.min.css';
  import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

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

    data () {
      return {
        server: {
          process: (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
            const formData = new FormData();
            formData.append(fieldName, file, file.name);
            console.log({ formData });

            const request = new XMLHttpRequest();
            request.open('POST', this.$config.apiUrl);

            request.upload.onprogress = e => {
              progress(e.lengthComputable, e.loaded, e.total);
            };

            request.onload = function () {
              if (request.status >= 200 && request.status < 300) {
                load(request.responseText);
              } else {
                error('oh no');
              }
            };

            request.send(formData);

            return {
              abort: () => {
                request.abort();
                abort();
              }
            };
          }
        }
      };
    },
    computed: {
      apiUrl () {
        return this.$config.apiUrl;
      }
    },

    methods: {
      removeFile () {
        this.$emit('handle-image-upload', null);
      },
      submit () {
        this.$refs.filepondUploader.processFiles().then(files => {
          console.log({ files });
          this.$emit('handle-image-upload', files);
        });
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
