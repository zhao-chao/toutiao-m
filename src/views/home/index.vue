<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 fixed>
      <van-button class="search-btn"
                  slot="title"
                  type="info"
                  size="small"
                  round
                  icon="search">搜索</van-button>
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs class="channel-tabs"
              v-model="active"
              animated
              swipeable>
      <van-tab v-for="channel in channels"
               :key="channel.id"
               :title="channel.name">
        <!-- 文章列表 -->
        <article-list :channel="channel" />
        <!-- 文章列表 -->
      </van-tab>
      <div slot="nav-right"
           class="placeholder">
      </div>
      <div slot="nav-right"
           class="hamburger-btn"
           @click="show = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 文章编辑弹出层 -->
    <van-popup v-model="show"
               closeable
               position="bottom"
               close-icon-position="top-left"
               :style="{ height: '100%' }">
      <channel-edit :my-channels="channels" />
    </van-popup>
  </div>

</template>


<script>
// 1. 导入 获取频道列表的方法
import { getUserChannels } from '@/api/user'

import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit,
  },
  props: {},
  data() {
    return {
      active: 0,
      // 4. 定义数据接收频道列表
      channels: [],
      show: false,
    }
  },
  computed: {},
  watch: {},
  created() {
    // 3. 调用获取频道列表
    this.loadChannels()
  },
  mounted() {},
  methods: {
    // 2. 定义加载频道列表数据的方法
    async loadChannels() {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道列表数据失败')
      }
    },
  },
}
</script>

<style lang="less" scoped>
// 当前组件中加了 scoped 对内部样式的修改需要加 /deep/，或者去掉 scoped
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      z-index: 2;
      width: 100%;
    }
    // Tab 标签页
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
    // 汉堡
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.902);
      i.iconfont {
        font-size: 33px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
