<template>
  <div class="channel-edit">
    <!-- 我的频道标题 -->
    <van-cell :border="false">
      <div slot="title"
           class="title-text">我的频道</div>
      <van-button class="edit-btn"
                  type="danger"
                  plain
                  round
                  size="mini"
                  @click="isEdit = !isEdit">{{ isEdit ? '完成': '编辑' }}</van-button>
    </van-cell>
    <!-- 我的频道内容 -->
    <van-grid class="my-grid"
              :gutter="10">
      <van-grid-item class="grid-item"
                     v-for="(value, index) in myChannels"
                     :key="index"
                     @click="onMyChannelClick( value.id ,index)">

        <!-- 通过插槽自定义图标 -->
        <van-icon v-show="isEdit && !fiexChannels.includes(value.id)"
                  slot="icon"
                  name="clear" />

        <span class="text"
              :class="{ active : value.id === ido}"
              slot="text">
          {{value.name}}
        </span>

      </van-grid-item>
    </van-grid>
    <!-- 频道推荐标题 -->
    <van-cell :border="false">
      <div slot="title"
           class="title-text">频道推荐</div>
    </van-cell>
    <!-- 频道推荐内容 -->
    <van-grid class="recommend-grid"
              :gutter="10">
      <van-grid-item class="channel-item"
                     v-for="channel in recommendChannels"
                     :key="channel.id"
                     :text="channel.name"
                     @click="onAdd(channel)" />
    </van-grid>
  </div>
</template>




<script>
// 请求所有数据
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel,
} from '@/api/channels.js'

import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    ido: '',
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
      fiexChannels: [0],
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((channel) => {
        const mychannel = this.myChannels.find((myChannel) => {
          return myChannel.id === channel.id
        })
        return !mychannel
      })
    },
    // 获取user
    ...mapState(['user']),
  },
  watch: {},
  created() {
    this.loadAllChannels()
  },
  mounted() {},

  methods: {
    // 加载所有频道
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取失败')
      }
    },

    // 点击添加频道
    async onAdd(channel) {
      this.myChannels.push(channel)
      if (this.user) {
        try {
          // 已登录，数据存储到线上
          await addUserChannel({
            id: channel.id, // 频道 id
            seq: this.myChannels.length, // 频道的 序号
          })
          this.$toast('添加成功')
        } catch (err) {
          this.$toast('保存失败')
        }
      } else {
        // 未登陆
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },

    // 点击我的频道
    onMyChannelClick(id, index) {
      if (this.isEdit) {
        if (this.fiexChannels.includes(id)) {
          return
        }
        // 执行删除操作
        this.myChannels.splice(index, 1)

        // 删除数据持久化
        this.deleteChannel(id)
      } else {
        // 执行跳转操作
        this.$emit('update-active', id)
      }
      //   console.log(channel, index)
    },

    async deleteChannel(id) {
      try {
        if (this.user) {
          // 已登录，将数据存储到线上
          await deleteUserChannel(id)
        } else {
          // 未登录，将数据存储到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        console.log(err)
        this.$toast('删除频道失败，请稍后重试')
      }
    },
  },
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333333;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
