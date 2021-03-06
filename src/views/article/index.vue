<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 left-arrow
                 title="黑马头条"
                 @click-left="$router.back()"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap"
           v-if="isLoading">
        <van-loading color="#3296fa"
                     vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail"
           v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info"
                  center
                  :border="false">
          <van-image class="avatar"
                     slot="icon"
                     round
                     fit="cover"
                     :src="article.aut_photo" />
          <div slot="title"
               class="user-name">{{ article.aut_name }}</div>
          <div slot="label"
               class="publish-date">{{ article.pubdate | relativeTime }}</div>
          <follow-user class="follow-btn"
                       :is_followed="article.is_followed"
                       :user_id="article.aut_id"
                       @update-follow="article.is_followed = $event">
          </follow-user>
          <!-- <van-button v-if="article.is_followed"
                      class="follow-btn"
                      round
                      size="small"
                      :loading="isFollowLoading"
                      @click="onFollow">已关注</van-button>

          <van-button v-else
                      class="follow-btn"
                      type="info"
                      color="#3296fa"
                      round
                      size="small"
                      icon="plus"
                      :loading="isFollowLoading"
                      @click="onFollow">关注</van-button> -->
          <!-- 底部区域 -->
          <div class="article-bottom">
            <van-button class="comment-btn"
                        type="default"
                        round
                        size="small"
                        @click="isPostShow = true">写评论</van-button>
            <van-icon name="comment-o"
                      :badge=" totalCommentCount"
                      color="#777" />
            <!-- <van-icon color="#777"
                name="star-o" /> -->
            <collect-article class="btn-item"
                             v-model="article.is_collected"
                             :article-id="article.art_id" />

            <!-- <van-icon color="#777"
                      name="good-job-o" /> -->
            <like-article v-model="article.attitude"
                          :article-id="article.art_id" />

            <van-icon name="share"
                      color="#777777"></van-icon>
          </div>
          <!-- /底部区域 -->

        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content  markdown-body"
             v-html="article.content"
             ref="article-content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论 -->
        <comment-list :source="article.art_id"
                      :list="commentList"
                      @onload-success="totalCommentCount=$event.total_count"
                      @reply-click="onReplyClick" />

        <van-popup v-model="isPostShow"
                   position="bottom">
          <comment-post :target="article.art_id"
                        @post-success="onPpstSuccess" />
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap"
           v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap"
           v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn"
                    @click=" loadArtcileInfo">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow"
               position="bottom"
               style="height: 100%">

      <!-- v-if 条件渲染 
               true:渲染元素节点
               false：不渲染

               有销毁组件的作用
                -->
      <comment-reply :comment="currentComment"
                     v-if=" isReplyShow"
                     @close="isReplyShow = false" />
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import { getArticleById } from '@/api/article.js'

import { ImagePreview } from 'vant'
// 关注
import FollowUser from '@/components/follow-user'

// 收藏
import CollectArticle from '@/components/collect-article'

// 点赞
import likeArticle from '@/components/like-article'

// 评论
import CommentList from './components/comment-list'

// 评论弹出层
import CommentPost from './components/comment-post'

// 评论回复弹出层
import CommentReply from './components/comment-reply'

export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    likeArticle,
    CommentList,
    CommentPost,
    CommentReply,
  },

  provide: function () {
    return {
      articleId: this.articleId,
    }
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true,
    },
  },
  data() {
    return {
      article: {}, // 文章详情
      isLoading: true,
      errStatus: 0,
      isFollowLoading: false,
      totalCommentCount: 0,
      //  发表弹出层
      isPostShow: false,
      //   评论列表
      commentList: [],
      //   评论回复弹出层
      isReplyShow: false,
      currentComment: {}, // 点击回复的那个评论对象
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadArtcileInfo()
  },
  mounted() {},
  methods: {
    async loadArtcileInfo() {
      this.isLoading = true
      try {
        const { data } = await getArticleById(this.articleId)
        this.article = data.data

        // 数据加载完成
        setTimeout(() => {
          this.previewImg()
        }, 10)

        // this.isLoading = false
      } catch (err) {
        // 加载失败 404
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        // this.isLoading = false
        this.$toast('获取失败')
      }
      this.isLoading = false
    },
    // 得到img 节点
    previewImg() {
      const contentEl = this.$refs['article-content']
      const allImg = contentEl.querySelectorAll('img')
      const images = []
      allImg.forEach((element, index) => {
        images.push(element.src)
        element.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
          })
        }
      })
    },

    // async onFollow() {
    //   // 开启按钮的 loading 状态
    //   this.article.aut_id = true

    //   try {
    //     // 如果已关注，则取消关注
    //     const authorId = this.article.aut_id
    //     if (this.article.is_followed) {
    //       await deleteFollow(authorId)
    //     } else {
    //       // 否则添加关注
    //       await addFollow(authorId)
    //     }

    //     // 更新视图
    //     this.article.is_followed = !this.article.is_followed
    //   } catch (err) {
    //     console.log(err)
    //     this.$toast.fail('操作失败')
    //   }

    //   // 关闭按钮的 loading 状态
    //   this.article.aut_id = false
    // },

    onPpstSuccess(data) {
      this.isPostShow = false
      this.commentList.unshift(data.new_obj)
    },

    onReplyClick(c) {
      this.isReplyShow = true
      this.currentComment = c
      console.log(this.currentComment)
    },
  },
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
