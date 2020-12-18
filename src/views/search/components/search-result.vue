<!--
 * @Author: your name
 * @Date: 2020-12-16 16:45:42
 * @LastEditTime: 2020-12-17 23:52:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\views\search\components\search-result.vue
-->
<template>
  <div class="search-result">
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :error.sync="error"
              error-text="请求失败，点击重新加载"
              @load="onLoad">
      <van-cell v-for="(article,index) in list"
                :key="index"
                :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchText: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data } = await getSearch({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.searchText, // 搜索关键字
        })

        // 2. 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)

        // 3. 设置加载状态结束
        this.loading = false

        // 4. 判断数据是否加载完毕
        if (results.length) {
          this.page++ // 更新获取下一页数据的页码
        } else {
          this.finished = true // 没有数据了，将加载状态设置结束，不再 onLoad
        }
      } catch (err) {
        this.error = true
        this.loading = false
        this.$toast('失败')
      }
    },
  },
}
</script>

<style scoped lang="less"></style>