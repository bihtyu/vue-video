<template>
  <div class="container">
    <list-header :categoryName="categoryName" ></list-header>
    <div class="list-wrap">
      <router-link
        tag="div"
        class="list-detail"
        v-for="(item, index) of list"
        :key="index"
        :to="'/detail/' + item.data.id"
      >
        <div class="list-cover">
          <img :src="item.data.cover.detail" alt="">
          <span class="video-time">{{ item.data.duration }}</span>
        </div>
        <div class="list-info">
          <h5 class="list-title">{{ item.data.title }}</h5>
          <span class="list-tag"># {{ item.data.category }}</span>
        </div>
      </router-link>
      <div class="van-list__finished-text">{{ loadingText }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ListHeader from './component/Header'
export default {
  name: 'List',
  components: {
    ListHeader
  },
  data () {
    return {
      list: [],
      categoryName: this.$route.params.name,
      loadingText: '加载中...'
    }
  },
  methods: {
    getCategoryList (categoryId) {
      axios.post('/api/v4/categories/detail/index?id=' + categoryId)
        .then(this.getCategoryListSucc)
    },
    getCategoryListSucc (res) {
      if (res.status === 200) {
        this.list = res.data.itemList.filter(function (item) {
          return item.type === 'video'
        })
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].data.duration = this.formatTime(this.list[i].data.duration)
        }
      }
      this.loadingText = '没有更多了'
    },
    formatTime (time) {
      if (time <= 0) return 0
      let minute, second
      minute = Math.floor(time / 60) % 60
      second = time % 60
      minute = minute >= 10 ? minute : '0' + minute
      second = second >= 10 ? second : '0' + second
      return minute + ':' + second
    }
  },
  mounted () {
    this.getCategoryList(this.$route.params.id)
  }
}
</script>

<style scoped lang="stylus">
  @import '../../assets/styles/list.styl'
  .list-wrap
    min-height: 100vh;
    margin-top: 40px
</style>
