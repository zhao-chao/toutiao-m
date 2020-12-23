<!--
 * @Author: your name
 * @Date: 2020-12-22 09:24:19
 * @LastEditTime: 2020-12-23 20:49:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\views\user-profile\components\update-name.vue
-->
<template>
  <div class="update-avatar">
    <img :src="img"
         ref="img" />
    <div class="toolbar">
      <span @click="$emit('close')">取消</span>
      <span @click="confirm">完成</span>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

import { updateUserAvatar } from '@/api/user.js'

export default {
  name: 'UpdateAvatar',
  components: {},
  props: {
    img: {
      type: [String, Object],
      retuired: true,
    },
  },
  data() {
    return {
      cropper: '',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    })
  },
  methods: {
    confirm() {
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.updateAvatar(blob)
      })
    },

    async updateAvatar(blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0,
      })
      try {
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updateUserAvatar(formData)
        // 关闭弹层，更新视图
        this.$emit('close')
        this.$emit('update-avatar', data.data.photo)
        this.$toast('更新成功')
      } catch (err) {
        this.$toast('更新失败')
      }
    },
  },
}
</script>



<style scoped lang='less'>
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
  }
  img {
    display: block;
    min-width: 100%;
  }
}
</style>