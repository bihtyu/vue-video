<template>
  <div class="container">
    <detail-video-player :playerInfo="playerInfo"></detail-video-player>
    <div class="video-info-wrap">
      <h4 class="title">{{ this.title }}</h4>
      <p class="tag">{{ this.tag }}</p>
      <p class="intro">{{ this.intro }}</p>
      <div class="icon-wrap">
        <span>
          <i class="iconfont">&#xe608;</i>
          <em>0</em>
        </span>
        <span>
          <i class="iconfont">&#xe612;</i>
          <em>0</em>
        </span>
        <span>
          <i class="iconfont">&#xe6c7;</i>
          <em>0</em>
        </span>
        <span>
          <i class="iconfont">&#xe68b;</i>
          <em>缓存</em>
        </span>
      </div>
    </div>
    <div class="video-author">
      <img class="avatar" :src="this.avatar" alt="">
      <div class="author-info">
        <h5 class="name">{{ this.authorName }}</h5>
        <p class="intro">{{ this.authorIntro }}</p>
      </div>
    </div>
    <detail-recommend :videoId="videoId"></detail-recommend>
  </div>
</template>

<script>
import axios from 'axios'
import DetailVideoPlayer from './components/VideoPlayer'
import DetailRecommend from './components/Recommend'

export default {
  name: 'Detail',
  components: {
    DetailVideoPlayer,
    DetailRecommend
  },
  data () {
    return {
      playerInfo: {},
      title: '',
      tag: '',
      intro: '',
      avatar: '',
      authorName: '',
      authorIntro: '',
      videoId: 0
    }
  },
  methods: {
    getDetailInfo (id) {
      axios.post('/api/v1/video/' + id, {
      }).then(this.handleGetDataSucc)
    },
    handleGetDataSucc (res) {
      if (res.status === 200) {
        let data = res.data
        this.playerInfo = {
          playUrl: data.playUrl,
          coverImage: data.coverForFeed
        }
        this.title = data.title
        this.tag = '# ' + data.category
        this.intro = data.description
        this.avatar = data.author.icon
        this.authorName = data.author.name
        this.authorIntro = data.author.description
        this.videoId = data.id
      }
    }
  },
  mounted () {
    this.getDetailInfo(this.$route.params.id)
  },
  watch: {
    $route () {
      this.id = this.$route.params.id
      this.getDetailInfo(this.id)
    }
  }
}
</script>

<style scoped lang="stylus">
  .video-info-wrap
    padding: 20px 15px 8px
    overflow: hidden
    background: linear-gradient(left, #302b27, #40332b)
    color: white
    font-size: 12px
    .title
      font-size: 20px
      line-height: 1.5
    .tag
      line-height: 3.5
      margin-bottom: 5px
    .intro
      width: 100%
      height: auto
      min-height: 3em
      margin-bottom: 10px
      font-size: 14px
      line-height: 1.5
    .icon-wrap
      overflow: hidden
      span
        display: block
        width: 25%
        float: left
        line-height: 40px
        i.iconfont
          font-size: 24px
          vertical-align: middle
        em
          margin-left: 5px
          font-style: normal
          font-size: 14px
          vertical-align: middle
  .video-author
    display: flex
    overflow: hidden
    padding: 20px 15px
    border-top: .1px solid #fff;
    background: linear-gradient(left, #3b312a, #564239)
    color: white
    .avatar
      width: 40px
      height: 40px
      margin-right: 15px
      border-radius: 50%
      border: 1px solid #dedede;
      vertical-align: middle
    .author-info
      flex: 1
      vertical-align: middle
      .name
        margin-bottom: 10px
        font-size: 16px
      .intro
        line-height: 1.5;
        font-size: 12px;
</style>
