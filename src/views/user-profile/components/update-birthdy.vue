<!--
 * @Author: your name
 * @Date: 2020-12-22 09:24:19
 * @LastEditTime: 2020-12-22 16:18:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\views\user-profile\components\update-name.vue
-->
<template>
  <div class="update-birthdy">
    <van-datetime-picker v-model="currentDate"
                         type="date"
                         title="选择年月日"
                         :min-date="minDate"
                         :max-date="maxDate"
                         @cancel="$emit('close')"
                         @confirm="onConfirm" />
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'

import dayJs from 'dayjs'
export default {
  name: 'UpdateBirthdy',
  components: {},
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
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
        const currentDate = dayJs(this.currentDate).format('YYYY-MM-DD')
        await getUserProfile({
          birthday: currentDate,
        })
        this.$emit('input', currentDate)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
  },
}
</script>

<style lanf="less" scoped>
</style>