<template>
  <div i="food_particulars">
    <myHeader></myHeader>
      <section class="container">
        <div class="foood-top clear">
              <div class="d-left">
                <div class="name">{{cateFoods.cate_name}}
                  <span :class="{'agree':cateFoods.agree_status==1}" @click="agree()">
                  <i class="fa " :class="{
                    'fa-thumbs-o-up':cateFoods.agree_status==0,
                    'fa-thumbs-up':cateFoods.agree_status==1}"
                     style="margin-left:15px;"></i>({{cateFoods.agree_num}})
                  </span>
                </div>
                <div class="score"><finestar :socure="cateFoods.score" :maxsocure="100"></finestar>
                  <p>{{cateFoods.score}}分({{cateFoods.score_num}}人参与了评分)<span>人均￥{{cateFoods.price}}</span></p></div>
                <div class="address">
                  <p>地址：{{cateFoods.address}}</p>
                  <p>电话：{{cateFoods.phone}}</p>
                  <p>营业时间：周一至周日 09:00-14:30 17:00-22:00</p>
                </div>
                <div class="score" @click="postScore()" v-show="cateFoods.score_status==0"><finestar :move="true" @score="scores"></finestar></div>
                <div class="score" v-show="cateFoods.score_status==1">您已经对该美食评过分了哦~</div>
                <div @click="req" class="req"><i class="fa fa-chain"></i> 点击复制美食地址分享<input type="hidden" id="url-input" :value="url"></div>
              </div>
              <div class="d-right">
                <div class="big"><img :src="'http://39.106.40.235/'+cateFoods.cate_preview" alt=""></div>
              </div>
        </div>
        <div class="food-js" v-html="cateFoods.cate_info"></div>
        <div class="food-com">
          <p>评论</p>
            <div class="p-desc clear">
              <textarea class="cont-left l" placeholder="在这里填写你的评论哦~" v-model="replyContent"></textarea>
              <div class="cont-right l">
                <button class="btn desc-sub" @click="comment()">提交</button>
              </div>
            </div>
            <p>网友评论({{cateFoods.comment_num}})</p>
            <getlistpage :maxpage="1" @getdata = "getcomment()">
              <div class="list clear" v-if="Comment.list.length == 0">还没有人评论，快去做第一个吧~</div>
              <div class="list clear" v-for="(v,i) in Comment.list" v-else>
                <div class="header-pic"><img :src="'http://39.106.40.235/'+v.comment_head_pic"></div>
                <div class="info">
                  <div class="name">{{v.comment_uname}}</div>
                  <div class="date"><span>{{$utils.goodTime(v.comment_time)}}</span></div>
                  <div class="desc">{{v.comment_content}}</div>
                  <div class="replayfu clear">
                    <span class="r title" @click="
                    textIndex=textIndex===i?'':i;
                    replyContent2 = '';
                    replyname=v.comment_uname;
                    replyid=v.comment_uid;
                    comment_id=v.id;
                    "><span v-show="textIndex===i">收起</span>回复({{v.replys.length}})</span>
                      <div class="clear content" v-show="textIndex===i">
                          <div class="cont-item clear" v-for="(v,i) in v.replys">
                            <div class="header-pic l"><img :src="'http://39.106.40.235/'+v.reply_head_pic"></div>
                            <div class="name l">
                              <span>{{v.reply_uname}}</span><span> 回复 </span><span>{{v.to_name}}</span>：
                            </div>
                            <div class="text l">{{v.reply_content}}</div>
                            <div class="r">{{$utils.goodTime(v.reply_time)}}</div>
                            <div class="clirep r"@click="replyname=v.reply_uname;replyid=v.reply_uid">回复</div>
                          </div>
                          <div class="repaly">
                            回复 @<span>{{replyname}}</span>：
                            <div class="p-desc clear">
                            <textarea class="cont-left l" v-model="replyContent2"></textarea>
                            <div class="cont-right l">
                              <button class="btn desc-sub" @click="reply()">提交</button>
                            </div>
                          </div>
                          </div>
                      </div>
                  </div>
                </div>
              </div>
              <div class="list clear" v-if="cateFoods.comment_num>0&&!Comment.list">啊哦，评论太美味了，是被谁吃了？大家快去找他</div>
            </getlistpage>
        </div>
      </section>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from '~/components/header.vue'
import myFooter from '~/components/footer.vue'
import finestar from '~/components/finestar.vue'
import getlistpage from '~/components/getlistpage.vue'
export default {
  components: {
    myHeader,
    myFooter,
    finestar,
    getlistpage
  },
  created () {
    this.getFoodXq()
    this.getComment()
    this.url = window.location.href
  },
  data () {
    return {
      url:'',
      cate_id: this.$route.params.id,
      cateFoods: '',
      replyContent:'',
      textIndex:'',
      score:0,
      Comment:{
        pageNow:1,
        list:''
      },
      replyContent2:'',
      replyname:'',
      replyid:'',
      comment_id:'',
    }
  },
  methods: {
    getFoodXq () {
      let params = {cate_id:this.cate_id}
      if(this.$store.state.isLogin){
        params.user_id = this.$store.state.user.id
      }
      this.$api.post('/cate/getOneCate.shtml',params,res=>{
            this.cateFoods = res
            this.cateFoods.cate_info = this.$utils.replaceImgUrl(this.cateFoods.cate_info)
            console.log(this.cateFoods)
      })
    },
    getComment () {
      this.$api.post('/cate/getComment.shtml',{pageNow:this.Comment.pageNow,cate_id:this.cate_id},res=>{
        console.log(res)
        this.Comment.list = res.comments
      })
    },
    getcomment (i) {
      this.Comment.pageNow = i
      this.getComment()
    },
    scores (s) {
      this.score = s
    },
    comment () { //回复
      if(this.$store.state.isLogin){
        if(this.replyContent.trim()==''){
          this.$message({
            message: '评论不能为空',
            type: 'error'
          });
          return false
        }
        this.$api.post('/cate/comment.shtml',{
          cate_id : this.cate_id,
          from_uid : this.$store.state.user.id,
          content : this.replyContent.trim()
        },res=>{
          this.$message({
            message: '评论成功',
            type: 'success'
          });
          this.replyContent = ''
          this.Comment.pageNow = 1
          this.getComment()
        },res=>{
          console.log(res)
        })
      }else{
        gologin()
      }
    },
    reply () {
      if(this.$store.state.isLogin){
        if(this.replyContent2.trim()==''){
          this.$message({
            message: '回复不能为空',
            type: 'error'
          });
          return false
        }
           this.$api.post('/cate/reply.shtml',{
            comment_id : this.comment_id,
            from_uid : this.$store.state.user.id,
            to_uid : this.replyid,
            content : this.replyContent2.trim()
          },res=>{
            this.$message({
              message: '回复成功',
              type: 'success'
            });
            this.replyContent2 = ''
            this.Comment.pageNow = 1
            this.getComment()
          },res=>{
            console.log(res)
          })

      }else{
        gologin()
      }
    },
    postScore () { //评分
      if(this.$store.state.isLogin){
        this.$api.post('/cate/score.shtml',{
          cate_id : this.cate_id,
          user_id : this.$store.state.user.id,
          score : this.score
        },res=>{
          this.cateFoods.score_status = 1
          this.cateFoods.score = res
          this.cateFoods.score_num += 1
          this.$message({
            message: '评分成功',
            type: 'success'
          });
        },res=>{
          this.$message({
            message: res.msg,
            type: 'error'
          });
        })
      }else{
        gologin()
      }
    },
    agree () { //点赞
      if(this.$store.state.isLogin){
        if(this.cateFoods.agree_status==1) return
        this.$api.post('/cate/agree.shtml',{
          cate_id : this.cate_id,
          user_id : this.$store.state.user.id
        },res=>{
          this.cateFoods.agree_num += 1
          this.cateFoods.agree_status = 1
          this.$message({
            message: '点赞成功',
            type: 'success'
          });
        },res=>{
          console.log(res)
        })
      }else{
        gologin()
      }
    },
    gologin(){
       this.$confirm('需要先登录哦~点击确定跳转登录页面', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/login')
        })
    },
    req () {
      var Url2=document.getElementById("url-input");
      Url2.type = 'text'
      Url2.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      Url2.type = 'hidden'
      this.$message({
            message: '已经复制好咯~快去分享吧',
            type: 'success'
      });
    }
  }
}
</script>

<style lang="scss" src="~/style/scss/_food_particulars.scss"></style>