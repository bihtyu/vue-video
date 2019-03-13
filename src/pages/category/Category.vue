<template>
  <div class="container">
    <category-header></category-header>
    <div class="category-wrap">
      <router-link
        tag="div"
        class="category-list"
        v-for="(item, index) of list"
        :key="index"
        :to="{path:'/list/' + item.data.id + '/' + item.data.title}"
      >
        <img :src="item.data.icon" alt="">
        <span class="tag">{{ item.data.title}}</span>
      </router-link>
    </div>
    <div class="van-list__finished-text">没有更多了</div>
  </div>
</template>

<script>
import axios from 'axios'
import CategoryHeader from './component/Header'
export default {
  name: 'Category',
  components: {
    CategoryHeader
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    getCategory () {
      axios.post('/api/v5/category/list')
        .then(this.handleGetCategorySucc)
    },
    handleGetCategorySucc (res) {
      if (res.status === 200) {
        this.list = res.data.itemList
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].data.title = this.list[i].data.title.replace('#', '')
        }
      }
    }
  },
  mounted () {
    this.getCategory()
  }
}
</script>

<style scoped lang="stylus">
  .category-wrap
    width: 100%
    height: auto
    overflow: hidden
    margin: 40px auto 15px
    .category-list
      position: relative
      width: 50%
      height: 0
      float: left
      overflow: hidden
      padding-bottom: 50%
      box-sizing: border-box
      margin-bottom: 1px;
      &:nth-child(even)
        border-left: 1px solid white
      &:nth-child(odd)
        border-right: 1px solid white
      img
        width: 100%
        height: auto
      span
        display: block
        width: 100%
        height: 100%
        position: absolute
        top: 50%
        left: 0
        color: white
        font-size: 16px
        text-align: center
  .van-list__finished-text
    margin-top: -15px
</style>
