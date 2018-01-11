<template>
  <div class="recommend-list">
    <a href="javascript:;" class="recommend-item">
      <div class="recommend-card-wrapper">
        <div class="img-box"><img src="static/images/dog.jpg"alt="" class="image"></div>
        <div class="info-box">
          <div class="title">淼鑫猪肚鸡（嘉禾望岗店）</div>
          <div class="score-line">
            <finestar :socure="socure"></finestar>
          <div class="comment-number">25个评价</div>
          </div>
          <div class="desc-line">
            <div class="desc">螺丝</div>
          </div>
          <div class="bottom-line">
            <div class="price-box">
              <span><span class="yuan">￥</span>
              <span class="price-number">15.8</span>
              <span class="price-desc">起</span></span>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import finestar from '~/components/finestar.vue'
export default {
  components: {
    finestar
  },
  props: [],
  data () {
    return {
      socure: 2
    }
  }
}
</script>

<style lang="scss">
.recommend-list{
  .recommend-item {
    margin-bottom: 20px;
    display: inline-block;
    width: 190px;
    .recommend-card-wrapper {
      width: 100%;
      box-sizing: border-box;
      .img-box {
        height: 0;
        width: 100%;
        padding-bottom: 56.25%;
        background-color: #f4f4f4;
        border-radius: 4px;
        overflow: hidden;
        img {
          width: 100%;
          font-size: 0;
        }
      }
      .info-box {
        position: relative;
        margin-top: 10px;
        .title {
          font-size: 14px;
          color: #222;
          line-height: 20px;
          width: 100%;
          margin: 0;
          font-weight: 500;
        }
        .comment-number {
          font-size: 12px;
          color: #999;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
        }
        .price-box {
          color: #F60;
          .yuan {
            font-size: 14px;
            font-weight: 700;
          }
          .price-number {
            font-size: 22px;
          }
          .price-desc {
            font-size: 12px;
            margin-left: 4px;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>