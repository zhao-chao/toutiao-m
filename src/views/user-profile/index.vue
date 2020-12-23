<!--
 * @Author: your name
 * @Date: 2020-12-21 22:32:28
 * @LastEditTime: 2020-12-23 20:35:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\views\user-profile\index.vue
-->
<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 title="个人信息"
                 left-arrow
                 @click-left="$router.back()" />
    <!-- /导航栏 -->

    <input type="file"
           hidden
           ref="file"
           @change="onFileChange">
    <!-- 个人信息 -->
    <van-cell title="头像"
              is-link
              center
              @click="$refs.file.click()">
      <van-image class="avatar"
                 fit="cover"
                 round
                 :src="user.photo" />
    </van-cell>
    <van-cell title="昵称"
              :value="user.name"
              is-link
              @click="isShowUpdateName = true" />
    <van-cell title="性别"
              :value="user.gender ? '女' : '男'"
              is-link
              @click="isShowUpdateGender = true" />
    <van-cell title="生日"
              :value="user.birthday"
              is-link
              @click="isShowUpdateBirthdy=true" />

    <!-- 编辑昵称弹层 -->
    <van-popup v-model="isShowUpdateName"
               style="height: 100%"
               position="bottom">
      <update-name v-if="isShowUpdateName"
                   @close="isShowUpdateName= false"
                   v-model=" user.name" />
    </van-popup>
    <!-- 编辑昵称弹层 -->

    <!-- 编辑性别弹层 -->
    <van-popup v-model="isShowUpdateGender"
               position="bottom">
      <update-gender v-if="isShowUpdateGender"
                     v-model="user.gender"
                     @close="isShowUpdateGender = false" />

    </van-popup>
    <!-- 编辑昵称弹层 -->

    <!-- 编辑生日弹层 -->
    <van-popup v-model="isShowUpdateBirthdy"
               position="bottom">
      <update-birthdy v-if="isShowUpdateBirthdy"
                      v-model="user.birthday"
                      @close="isShowUpdateBirthdy = false" />
    </van-popup>
    <!-- 编辑生日弹层 -->

    <!-- 编辑头像弹层 -->
    <van-popup v-model="isShowUpdateAvatar"
               style="height: 100%"
               position="bottom">
      <update-avatar v-if="isShowUpdateAvatar"
                     @update-avatar="user.photo = $event"
                     :img="img"
                     @close='isShowUpdateAvatar=false' />
    </van-popup>
    <!-- 编辑头像弹层 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'

// 修改名称的弹出层
import UpdateName from './components/update-name'

// 修改性别
import updateGender from './components/update-gender'

import UpdateBirthdy from './components/update-birthdy'

import UpdateAvatar from './components/update-avatar'
export default {
  name: 'userProfile',
  data() {
    return {
      user: {},
      isShowUpdateName: false,
      isShowUpdateGender: false,
      isShowUpdateBirthdy: false,
      isShowUpdateAvatar: false,
      img: null,
    }
  },
  components: {
    UpdateName,
    updateGender,
    UpdateBirthdy,
    UpdateAvatar,
  },
  created() {
    this.loadProfile()
  },

  methods: {
    async loadProfile() {
      try {
        const res = await getUserProfile()
        this.user = res.data.data
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },

    onFileChange() {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 获取blob数据
      this.img = window.URL.createObjectURL(file)

      this.isShowUpdateAvatar = true

      this.$refs.file.value = ''
    },
  },
}
</script>

<style scoped lang='less'>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }

  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
