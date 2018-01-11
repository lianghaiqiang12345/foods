<template>
  <div class="myComment clear">
    <div class="list" v-for="(v,i) in comment">
      <h3 title="去主页瞧一瞧"><router-link :to="'/food_particulars/'+v.cate_id">{{v.cate_name}}</router-link></h3>
      <p>{{v.content}}</p>
      <span class="time">{{$utils.goodTime(v.comment_time)}}</span>
      <span class="trash" title="删除评论" @click="deletCommetn(v.comment_id)"><i class="fa fa-trash-o"></i></span>
    </div>
    <div v-if="comment.length==0">
      你还没有评论过任何一个美食哦，快去找找<router-link :to="'/'">美食</router-link>吧~
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      comment:{}
    }
  },
  created () {
    this.getComment()
  },
  methods:{
    getComment(){
      this.$api.post('user/myComment.shtml',{
        user_id:this.$store.state.user.id
      },res=>{
        this.comment = res
      })
    },
    deletCommetn (data) {
      this.$api.post('user/delComment.shtml',{comment_id:data},res=>{
        this.getComment()
        this.$message({
            message: '删除成功',
            type: 'success'
        });
      },res=>{
        this.$message({
            message: '删除失败',
            type: 'error'
        });
      })
    }
  }
}
</script>

<style lang="scss">
.myComment{
  background-color:#FFF;
  height:600px;
  overflow:auto;
  box-shadow:0 0 24px rgba(0,0,0,0.21);
  padding:20px;
  .list{
    width: 23.5%;
    float:left;
    border-radius:10px;
    height:150px;
    background-color:#5dcbef;
    margin-right:2%;
    margin-bottom:10px;
    padding:12px;
    box-sizing:border-box;
    position:relative;
    color:#fff;
    box-shadow:0 12px 24px rgba(0,0,0,0.21);
    transition:.3s;
      bottom:0px;
    &:nth-child(4n){
      margin-right:0px;
    }
    &:hover{
      bottom:5px;
      // background-color:var(--allcolor);
    }
    h3{
      font-weight:normal;
      margin-top:-5px;
      text-align:center;
      font-size:15px;
      margin-bottom:8px;
      a{
        color:#fff;
        &:hover{
          color:crimson;
        }
      }
    }
    p{
      font-size:12px;
    }
    .time{
      position:absolute;
      bottom:5px;
      right:5px;
    }
    .trash{
      position:absolute;
      bottom:5px;
      left:12px;
      cursor:pointer;
      // color:rgba(0,0,0,0.5);
      &:hover{
        color:red;
      }
    }
  }
}
</style>