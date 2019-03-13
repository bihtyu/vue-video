<template>
  <div class="header">
    <p>全部分类</p>
    <router-link
      class="iconfont"
      tag="i"
      to="/"
    >&#xe637;</router-link>
  </div>
</template>

<script>
export default {
  name: 'CategoryHeader'
}
</script>

<style scoped lang="stylus">
  .header
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 40px
    line-height: 1
    border-bottom: .1px solid #dedede
    background: white
    z-index: 1;
    p
      width: 100%
      text-align: center
      line-height: 40px
      font-size: 16px
    .iconfont
      width: 20px
      position: absolute
      top: 12px
      left: 15px
</style>
