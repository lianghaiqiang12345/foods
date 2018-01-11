<template>
  <div class="common-list-item">
    <!-- 店铺图片 -->
    <router-link :to="'food_particulars/'+cateFoods.id" class="list-item-pic">
      <span>{{itemIndex}}</span>
      <div><img :src="'http://39.106.40.235'+cateFoods.cate_preview" alt=""></div>
    </router-link>
    <div class="list-item-desc">
      <!-- 内容上半部分 -->
      <div class="list-item-desc-top">
      <router-link :to="'food_particulars/'+cateFoods.id" class="item-title">{{cateFoods.cate_name}}</router-link>
      <div class="item-eval-info">
        <finestar :socure="cateFoods.score" :maxsocure="100"></finestar>
        <span>{{cateFoods.score}}分</span>
        <span class="highlight">{{cateFoods.comment_num}}人评论</span>
        <span>{{cateFoods.agree_num}}人点赞</span>
      </div>
      <div class="item-site-info clear">
        <span>{{cateFoods.type_name}} | {{cateFoods.address}}</span>
        <div class="tem-site-map">
          <i class="fa fa-map-marker"></i>
          <span @click="ShowMap()">查看地图</span></div>
      </div>
      <div class="item-price-info">
        <span>人均 ¥ {{cateFoods.price}}</span>
      </div>
      </div>
      <!-- 折扣区 -->
      <div class="list-item-desc-bottom">
        <div class="item-discount">

          <!-- 图：z1买 z2团 z3劵 z4外 -->
          <div v-if="cateFoods.discount<10&&cateFoods.discount>0"><img src="static/images/z1.png"alt=""><span>{{cateFoods.discount}}折(买单立享)</span></div>
          <!-- <div><img src="static/images/z2.png"alt=""><span>蛋糕7选1</span></div> -->
          <!-- <div><img src="static/images/z3.png"alt=""><span>43代50元</span></div> -->
          <!-- <div><img src="static/images/z4.png"alt=""><span>满100减30</span></div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import finestar from '~/components/finestar.vue'
import { lazyAMapApiLoaderInstance } from 'vue-amap'
let map
export default {
  components: {
    finestar
  },
  props: ['itemIndex','cateFoods'],
  data () {
    return {
      socure: 2
    }
  },
  methods:{
    ShowMap () {
      this.$emit('ShowMap',[+this.cateFoods.lng,+this.cateFoods.lat])
    }
  }
}
</script>

<style lang="scss">
.common-list-item{
    padding: 20px 0;
    min-height: 125px;
    border-top: 1px solid #E5E5E5;
    .list-item-pic{
      float: left;
      width: 220px;
      overflow: hidden;
      height: 124px;
      border-radius: 4px;
      span{
        background: #FB6433;
        border-radius: 2px;
        position: absolute;
        line-height: 13px;
        width: 20px;
        margin-left: -3px;
        margin-top: 3px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        z-index: 200;
      }
      >div {
        position: relative;
        height: 100%;
        width: 100%;
        img{
          width: 100%;
          height: auto;
          display: block;
          border: none;
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
        }
      }
    }
    .list-item-desc {
      margin-left: 220px;
      padding-left: 20px;
      font-size: 12px;
      color: #666;
      overflow: hidden;
      .list-item-desc-top {
        position: relative;
        padding-bottom: 10px;
        .item-title{
          font-weight: 500;
          font-size: 16px;
          color: #333;
        }
        .item-eval-info{
          >*{
            margin-right:10px;
          }
          .highlight{
            color:#F90;
          }
        }
        .item-site-info{
          margin-top:4px;
          >* {
            float: left;
            margin-right: 10px;
          }
          .tem-site-map{
            color: #31BBAC;
            cursor: pointer;
          }
        }
        .item-price-info{
          margin-top:7px;
        }
      }
      .list-item-desc-bottom {
          float: left;
          clear: both;
          border-top: 1px dashed #E5E5E5;
          width: 100%;
          .item-discount {
            position: relative;
            padding-top: 4px;
            float: left;
            width: 100%;
            >div {
              margin-top: 6px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              img {
                display: inline;
                width: auto;
                max-height: 15px;
                vertical-align: sub;
              }
              span {
                margin-left: 10px;
                line-height: 15px;
              }
            }
          }
        }
    }
}
</style>