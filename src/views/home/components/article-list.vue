<template>
  <div class="artcile-list">
    <!--
        loading 控制上拉加载更多的 loading 状态
        finished 控制数据是否加载结束
        load 事件：当触发上拉加载更多的时候会触发调用 load 事件

        List 初始化后会触发一次 load 事件，用于加载第一屏的数据
        如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成
      -->

    <van-pull-refresh v-model="isLoading"
                      :success-text="refreshSuccessText"
                      :success-duration="1500"
                      @refresh="onRefresh">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                @load="onLoad">

        <article-item v-for="(article, index) in list"
                      :key="index"
                      :article="article" />

        <!-- <van-cell v-for="(article, index) in list"
                  :key="index"
                  :title="article.title" /> -->

      </van-list>

    </van-pull-refresh>

  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [], // 文章列表数据

      loading: false, // 上拉加载更多的 loading 状态

      finished: false, // 是否加载结束

      timestamp: null, // 请求下一页数据的时间戳

      error: false, //控制列表加载失败的提示状态

      isLoading: false, // 控制下拉刷新的 loading 状态

      refreshSuccessText: '',
    }
  },
  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    // 当触发上拉加载更多的时候调用该函数
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 id
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })

        // 2. 把数据添加到 list 数组中
        const { results } = data.data
        this.list.push(...results)

        // 3. 设置本次加载中 loading 状态结束  可以继续加载
        this.loading = false

        // 4. 判断数据是否加载结束
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true
        }
      } catch (err) {
        this.loading = false // 关闭 loading 效果
        this.error = true // 开启错误提示
      }
    },

    // 当触发下拉刷新的时候调用该函数
    async onRefresh() {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 id

          timestamp: Date.now(), // 下拉刷新每次都应该获取最新数据

          with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })

        // 2. 将数据追加到列表的顶部

        const { results } = data.data

        this.list.unshift(...results)

        // 3. 关闭下拉刷新的 loading 状态
        this.isLoading = false

        // 提示成功
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.isLoading = false // 关闭下拉刷新的 loading 状态

        this.$toast('刷新失败')
      }
    },
  },
}
</script>

<style scoped lang="less">
.artcile-list {
  height: 79vh;
  overflow: auto;
}
</style>