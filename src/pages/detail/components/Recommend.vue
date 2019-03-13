<template>
  <div class="list-wrap">
    <h5 class="title">相关推荐</h5>
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
    <div class="van-list__finished-text">没有更多了</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DetailRecommend',
  props: {
    videoId: Number
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    getRecommend (videoId) {
      axios.post('/api/v4/video/related?id=' + videoId)
        .then(this.getRecommendSucc)
    },
    getRecommendSucc (res) {
      if (res.status === 200) {
        this.list = res.data.itemList.filter(function (item) {
          return item.type === 'videoSmallCard'
        })
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].data.duration = this.formatTime(this.list[i].data.duration)
        }
      }
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
  watch: {
    videoId: function (transmitId) {
      this.getRecommend(transmitId)
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../../assets/styles/list.styl'
</style>
