<!--
 * @Author: your name
 * @Date: 2020-12-21 14:40:19
 * @LastEditTime: 2020-12-21 22:23:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\views\article\components\comment-reply.vue
-->
<template>
  <div class="comment-reply">

    <!-- 导航栏 -->
    <van-nav-bar :title="comment.reply_count > 0 ? `${comment.reply_count}条回复`: '暂无回复'">
      <van-icon slot="left"
                name="cross"
                color="#fff"
                @click="$emit('close')" />
    </van-nav-bar>
    <!-- /导航栏 -->
    <div class="scroll-wrap">
      <!-- 当前评论项 -->
      <comment-item :comment="comment" />
      <!-- /当前评论项 -->

      <van-cell title="全部回复" />
      <comment-list :source="comment.com_id"
                    type="c"
                    :list="commentList" />

      <!-- 评论的回复列表 -->
      <div class="reply-bottom">
        <van-button class="write-btn"
                    size="small"
                    round
                    @click="aa">写评论</van-button>
      </div>
      <!-- /评论的回复列表 -->
    </div>

    <!-- 发布评论 -->
    <van-popup v-model=" isPostShow"
               position="bottom">
      <comment-post :target="comment.com_id"
                    @post-success="onp" />
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
// 当前评论的回复

import CommentItem from './comment-item'

// 全部的评论的回复
import CommentList from './comment-list'

// 发布评论
import CommentPost from './comment-post'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost,
  },

  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isPostShow: false,
      commentList: [], //评论的列表
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    aa() {
      this.isPostShow = true
    },
    onp(data) {
      this.comment.reply_count++
      this.isPostShow = false
      this.commentList.unshift(data.new_obj)
    },
  },
}
</script>

<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.van-nav-bar {
  background-color: #3296fa;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;

  .write-btn {
    width: 60%;
    border-radius: 44px;
    background-color: #3296fa;
    color: #fff;
    font-size: 35px;
  }
}

/deep/ .van-ellipsis {
  color: #ffffff;
}
</style>
