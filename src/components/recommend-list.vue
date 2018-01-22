<template>
  <div class="recommend-list">
    <router-link :to="'food_particulars/'+LikeFoods.cate_id" class="recommend-item">
      <div class="recommend-card-wrapper">
        <div class="img-box"><img :src="'//39.106.40.235'+LikeFoods.cate_preview"alt="" class="image"></div>
        <div class="info-box">
          <div class="title">{{LikeFoods.cate_name}}</div>
          <div class="score-line">
            <finestar :socure="LikeFoods.score"></finestar>
          <div class="comment-number">{{LikeFoods.comment_num}}个评价</div>
          </div>
          <div class="desc-line">
            <!-- <div class="desc">{{LikeFoods.comment_num}}</div> -->
          </div>
          <div class="bottom-line">
            <div class="price-box">
              <span><span class="yuan">￥</span>
              <span class="price-number">{{LikeFoods.price}}</span>
              <span class="price-desc">起</span></span>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import finestar from '~/components/finestar.vue'
export default {
  components: {
    finestar
  },
  props: ['LikeFoods'],
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