<!--
 * @Author: your name
 * @Date: 2020-12-22 09:24:19
 * @LastEditTime: 2020-12-22 10:08:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\views\user-profile\components\update-name.vue
-->
<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar title="编辑昵称"
                 left-text="取消"
                 right-text="确定"
                 @click-left="$emit('close')"
                 @click-right="onClickRight" />
    <!-- /导航栏 -->

    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field v-model.trim="message"
                 rows="2"
                 autosize
                 type="textarea"
                 maxlength="7"
                 placeholder="请输入昵称"
                 show-word-limit />
    </div>

    <!-- /输入框 -->
  </div>
</template>

<script>
import { updateUserName } from '@/api/user.js'
export default {
  name: 'UpdateName',
  components: {},
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      message: this.value,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onClickRight() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0,
      })
      try {
        if (this.message === '') return this.$toast('请输入昵称')
        await updateUserName({
          name: this.message,
        })
        this.$emit('input', this.message)
        this.$emit('close')
        this.$toast('更新成功')
      } catch (err) {
        this.$toast('更新失败')
      }
    },
  },
}
</script>

<style lanf="less" scoped>
.field-wrap {
  padding: 20px;
}
</style>