<template>
  <main role="main">
    <div class="col-md-12">
      <label class="custom-file" for="file">
        <i class="fa fa-camera" style="font-size: 1.5rem"></i>
        <input
          @change="handleSelectedFiles"
          id="file"
          multiple
          name="file"
          accept="image/*"
          ref="fileInput"
          type="file"
        />
      </label>
      <div
        class="image-area mt-4"
        v-for="(file, index) in fileList"
        :key="index"
      >
        <img
          id="imageResult"
          :src="`${mediaUrl}/file/${file.id}`"
          alt=""
          class="col-md-2 img-fluid rounded shadow-sm mx-auto d-block"
        />
        <span class="remove-file" @click="removeFile(index)"
          ><i class="fa fa-times-circle" style="font-size: 20px"></i
        ></span>
      </div>
      <!-- <div >
            <div
              v-for="(file, index) in fileList"
              :key="index"
            >
              {{ file.name }}
              <div class="col-md-6">
                <img 
                :src="`http://media.idp.vn:8080/file/${file.id}`"
              />
              </div>
              <span class="remove-file" @click="removeFile(index)"
                >Remove</span
              >
            </div>
          </div> -->
    </div>
    <!--Show Selected Files-->

    <!--Submit Button && Progress Bar-->
    <div>
      <!-- <button @click="uploadFile">Start Upload</button> -->
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      fileList: [],
      mediaUrl: null,
    };
  },
  created() {
    this.mediaUrl = process.env.MEDIA_URL;
  },
  methods: {
    handleSelectedFiles() {
      let selectedFiles = this.$refs.fileInput.files;

      for (let i = 0; i < selectedFiles.length; i++) {
        /*Check Already Has Been Selected Or Not ...*/
        let isFileExists = this.files.find(
          (file) =>
            file.type === selectedFiles[i].type &&
            file.name === selectedFiles[i].name &&
            file.size === selectedFiles[i].size &&
            file.lastModified === selectedFiles[i].lastModified
        );
        !isFileExists
          ? this.files.push(selectedFiles[i])
          : this.$toast
              .error("File đã tồn tại. Vui lòng chọn file khác")
              .goAway(1500);
      }
      this.uploadFile();
    },
    removeFile(key) {
      this.fileList.splice(key, 1);
      // this.file.splice(key, 1);
      // this.uploadFile();
    },
    uploadFile() {
      this.$store.dispatch("app/showLoadingOverlay", true);
      this.files.map((file, index) => {
        const formdata = new FormData();
        formdata.append("files[" + index + "]", file);
        this.$store
          .dispatch("app/uploadFile", {
            data: formdata,
            param: `${this.mediaUrl}/upload`,
          })
          .then((res) => {
            this.$store.dispatch("app/showLoadingOverlay", false);
            this.fileList.push(res);
            this.files = [];
            this.$emit("getFileUpload", this.fileList);
          })
          .catch((err) => {
            this.$store.dispatch("app/showLoadingOverlay", false);
          });
      });
    },
  },
};
</script>

<style>
.custom-file {
  width: auto !important;
  border: 1px solid #006e43;
  border-radius: 10px;
  color: #006e43;
  line-height: 31.5px;
  padding-left: 15px;
  padding-right: 15px;
}
.custom-file i {
  padding: 1.2rem;
  border-radius: 0.8rem;
  display: inline-block;
  border: 2px dashed #a0a0a0;
  line-height: 10px;
}
.custom-file img {
  margin-top: -5px !important;
}

.custom-file input {
  display: none;
}
/* img {
  border-radius: 8px;
  float: left;
} */
.image-area {
  position: relative;
}

.image-area::before {
  color: rgba(255, 255, 255, 0.7);
  font-weight: bold;
  text-transform: uppercase;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.8rem;
  z-index: 1;
}

.image-area img {
  z-index: 2;
  position: relative;
  float: left;
}
.remove-file {
  position: absolute;
  margin: 0 !important;
  right: 0;
  z-index: 10;
}
</style>
