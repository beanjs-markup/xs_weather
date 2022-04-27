<template>
  <div class="container-wrap">
    <div class="container">
      <el-upload
        class="upload-demo"
        drag
        action="/upload/"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        :show-file-list="false"
        :on-success="uploadSuccess"
        v-if="isUpload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传xslx文件</div>
      </el-upload>
      <el-link class="download-link" type="success" href="/download" v-else>下载文件</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      isUpload: false,
    };
  },
  methods: {
    uploadSuccess() {
      // console.log("uploadSuccess")
      setTimeout(() => {
        this.isUpload = false;
      }, 2000);
    },
  },
};
</script>

<style lang="scss" >
body {
  background-color: #eee;
}
.container-wrap {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .container {
    .download-link{
      background-color: white;
      padding: 2rem;
    }
  }
}
</style>
