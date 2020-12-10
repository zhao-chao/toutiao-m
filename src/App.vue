<!--
 * @Author: your name
 * @Date: 2020-12-09 16:10:29
 * @LastEditTime: 2020-12-10 10:46:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \toutiao-m\src\App.vue
-->
<template>
  <div id="App">
    <router-view></router-view>

    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <div class="a"></div>
  </div>

</template>

<script>
export default {
  name: 'App',
}
</script>


<style lang="less" scoped>
.a {
  width: 200px;
  height: 300px;
  background-color: pink;
}
</style>