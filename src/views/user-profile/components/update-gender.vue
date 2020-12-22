<!--
 * @Author: your name
 * @Date: 2020-12-22 10:16:45
 * @LastEditTime: 2020-12-22 15:38:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\views\user-profile\components\update-gender.vue
-->
<template>
  <div class="update-gender">
    <van-picker title="性别"
                show-toolbar
                :default-index="value"
                :columns="columns"
                @cancel="$emit('close')"
                @confirm="onConfirm"
                @change="onChange" />
  </div>

</template>


 getUserProfile
<script>
import { getUserProfile } from '@/api/user.js'
export default {
  name: 'updateGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ['男', '女'],
      gender: this.value,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0,
      })
      try {
        const gender = this.gender
        await getUserProfile({
          name: gender,
        })
        this.$emit('input', gender)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    onChange(picker, value, index) {
      this.gender = index
    },
  },
}
</script>


<style scoped lang='less'>
</style>