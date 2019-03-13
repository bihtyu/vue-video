<template>
  <div class="container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!--<van-search placeholder="请输入搜索关键词" v-model="searchValue" />-->
      <h2 class="page-title">今日开眼精选</h2>
      <div class="video-wrap">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check=false
          finished-text="没有更多了"
          @load="onLoad"
        >
          <router-link
            tag="div"
            class="video-list"
            v-for="(item, index) of list" :key="index"
            :to="'/detail/' + item.data.id"
          >
            <div class="video-cover">
              <img :src="item.data.cover.feed" alt="">
              <span class="video-time">{{ item.data.duration }}</span>
            </div>
            <div class="video-content">
              <img alt="" class="avatar" :src="item.data.author.icon">
              <div class="text">
                <p class="title">{{ item.data.title }}</p>
                <div class="subtitle">{{ item.data.author.name }} / # {{ item.data.category }}</div>
              </div>
            </div>
          </router-link>
        </van-list>
      </div>
    </van-pull-refresh>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" url="/">首页</van-tabbar-item>
      <van-tabbar-item icon="browsing-history-o" dot url="/#/category">分类</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { Search, List, PullRefresh, Cell, Tabbar, TabbarItem } from 'vant'
Vue.use(Search).use(List).use(PullRefresh).use(Cell).use(Tabbar).use(TabbarItem)
export default {
  name: 'Home',
  data () {
    return {
      searchValue: '',
      list: [],
      temp: [],
      loading: false, // 往下拖动时是否继续加载
      finished: false, // 数据是否加载完成
      nextPageUrl: '',
      num: 0, // 往下拖动加载数据次数
      isLoading: false, // 是否下拉
      active: 0
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      this.getHomeList(this.nextPageUrl)
    },
    onRefresh () {
      this.list = []
      this.getHomeList('/api/v2/feed?num=1')
      // 重置计数器
      this.num = 0
      this.finished = false
    },
    getHomeList (url) {
      url = url === '' ? '/api/v2/feed?num=1' : url
      axios.post(url)
        .then(this.getHomeListSucc)
    },
    getHomeListSucc (res) {
      // 加载状态结束
      this.loading = false
      // 整理数据
      this.temp = []
      this.nextPageUrl = res.data.nextPageUrl.replace('https://baobab.kaiyanapp.com/', '')
      let data = res.data.issueList[0].itemList
      this.temp.push(data.filter(function (item) {
        return item.type === 'video'
      }))
      this.temp = this.temp[0]
      for (let i = 0; i < this.temp.length; i++) {
        this.temp[i].data.duration = this.formatTime(this.temp[i].data.duration)
      }
      this.list = this.list.concat(this.temp)
      this.num++
      // 数据全部加载完成
      if (this.num >= 5) {
        this.finished = true
      }
      this.isLoading = false
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
    this.getHomeList('')
  }
}
</script>

<style scoped lang="stylus">
  @import '../../assets/styles/mixins.styl'
  .container
    margin-top: 10px
    padding: 0 15px
    .page-title
      line-height: 2.5
      font-size: 20px
      color: #444
    .video-wrap
      overflow: hidden
      margin-bottom: 50px;
      font-size: 12px
      .video-list:last-child
        margin-bottom: 0
      .video-list
        margin-bottom: 15px
        border-bottom: 1px solid #e3e3e3
        .video-cover
          position: relative
          img
            width: 100%
            border-radius: 3px
          .video-time
            position: absolute
            bottom: 5px
            right: 5px
            padding: 3px 5px
            font-size: 14px;
            color: white;
            background: black
            border-radius: 2px
        .video-content
          display: flex
          margin: 15px 0
          .avatar
            width: 40px
            height: 40px
            margin-right: 15px
            border-radius: 50%
            border: 1px solid #dedede;
          .text
            flex: 1
            max-width: 80%
            .title
              width: 100%
              margin-bottom: 3px
              line-height: 1.5
              font-size: 16px
              color: #444
              ellipsis()
            .subtitle
              color: #c5c5c5
  >>>.van-list__finished-text, >>>.van-list__loading
    margin-top: -15px
</style>
