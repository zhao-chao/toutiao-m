<!--
 * @Author: your name
 * @Date: 2020-12-16 16:44:06
 * @LastEditTime: 2020-12-18 11:31:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\views\search\components\search-history.vue
-->
<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-history')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow =false ">完成</span>
      </div>

      <van-icon name="delete"
                v-else
                @click="isDeleteShow = true" />
    </van-cell>
    <van-cell :title="item"
              v-for="(item,index) in searchHistories"
              :key="index"
              @click="onHistoryClick(item, index)">
      <van-icon name="close"
                v-if="isDeleteShow" />
    </van-cell>

  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDeleteShow: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onHistoryClick(item, index) {
      // 如果是删除状态，则执行删除操作
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        // 否则执行搜索操作
        // 否则执行搜索操作
        this.$emit('search', item)
      }
    },
  },
}
</script>

<style scoped lang="less"></style>
