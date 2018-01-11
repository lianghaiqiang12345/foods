<template>
  <div class="myReply clear">
     <div class="list" v-for="(v,i) in comment">
     <span class="name"> {{v.from_name}}</span>回复你:<span class="cont">{{v.content}}</span>
      <span class="trash r" title="删除评论" @click="deletCommetn(v.reply_id)"><i class="fa fa-trash-o"></i></span>
      <span class="time r">{{$utils.goodTime(v.reply_time)}}</span>
    </div>
    <div v-if="comment.length==0">
      你还没有被回复的评论哦~
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
    this.getReply()
  },
  methods:{
    getReply(){
      this.$api.post('user/myReply.shtml',{
        user_id:this.$store.state.user.id
      },res=>{
        this.comment = res
      })
    },
    deletCommetn (data) {
      this.$api.post('user/delReply.shtml',{reply_id:data},res=>{
        this.getReply()
        this.$message({
            message: '删除成功',
            type: 'success'
        });
      },res=>{
        this.$message({
            message: res.msg,
            type: 'error'
        });
      })
    }
  }
}
</script>

<style lang="scss">
.myReply{
  background-color:#FFF;
  height:600px;
  overflow:auto;
  box-shadow:0 0 24px rgba(0,0,0,0.21);
  padding:20px;
  .list{
    height:40px;
    line-height:40px;
    font-size:14px;
    .trash,.time{
      font-size:14px;
      margin-left:15px;
    }
    .cont{
      margin-left:15px;
      color:black;
      font-size:15px;
    }
    .trash{
      cursor:pointer;
      &:hover{
        color:red;
      }
    }
  }
}
</style>