<template>
<div i="userexinfo">
  <myHeader></myHeader>
    <section class="userinfo container">
      <div class="userinfo-left">
        <div class="avator-wapper">
      <div class="avator-mode">
        <img class="avator-img" :src="head_pic" width="92" height="92" v-if="head_pic">
        <img class="avator-img" src="static/images/dog.jpg" width="92" height="92" v-else>
        <div class="update-avator">
          <label>更换头像<input type="file" style="display:none" @change="x_headPic()"></label>
        </div>
      </div>
      <!-- <div class="des-mode"><p>{{nickname}}</p></div> -->
      <div class="list-wapper">
      <h2>账户管理</h2>
      <div class="line"></div>
      <ul class="menu">
        <li v-for='(value, index) in meau' @click="onIndex=value.url">
          <router-link :class="{on:onIndex==value.url}" :to="value.url">{{value.name}}
           <span class="arr"><i class="fa fa-angle-right"></i></span>
          </router-link>
        </li>
      </ul>
    </div>
    </div>
      </div>
      <div class="userinfo-right">
        <router-view></router-view>
      </div>
    </section>
  <myFooter></myFooter>
</div>
</template>

<script>
import myHeader from '~/components/header.vue'
import myFooter from '~/components/footer.vue'
import {mapState} from 'vuex'
export default {
  components: {
    myHeader,
    myFooter
  },
  created () {
    this.getUserInfo()
  },
  data () {
    return {
      meau:[
        {
          name:'个人信息',
          url:'user_info'
        },
        {
          name:'我的评论',
          url:'myComment'
        },
        {
          name:'回复我的',
          url:'myReply'
        },
        {
          name:'修改密码',
          url:'put_password'
        },
      ],
      onIndex:window.location.href.split('/')[window.location.href.split('/').length- 1],
      head_pic:'',
      nickname:'匿名人士'
    }
  },
  computed:mapState(['user']),
  methods: {
    getUserInfo () {
      this.$api.post('user/findUser.shtml',{id:this.user.id},res=>{
          this.head_pic = "http://39.106.40.235/"+res.head_pic
          this.nickname = res.nickname
       },res=>{
          console.error(res.msg)
       })
    },
    x_headPic () {
      console.log(event.currentTarget)
        let file = event.currentTarget.files[0]
        let URL = window.URL || window.webkitURL
        let blob = URL.createObjectURL(file)
        console.log(blob)
        let img = new Image()
        let self = this
        img.src = blob
          img.onload = function(){
            let canvas = document.createElement('canvas')
            let ctx = canvas.getContext('2d')
              let that = this
              //生成比例
              let w = that.width,
                h = that.height,
                scale = w / h;
                w = w>300?300:w;
                h = w / scale;
              //生成canvas
              canvas.width = w
              canvas.height = h
              console.log(w,h)
          ctx.drawImage(that, 0, 0, w, h)
          let base64 = canvas.toDataURL('image/jpg',0.8)
          self.$api.post('user/editUser.shtml',{
            id:self.user.id,
            head_pic : base64.split(',')[1]
          },res=>{
              self.head_pic = base64
              this.$message({
                message: '成功上传头像',
                type: 'success'
              });
           },res=>{
              this.$alert(res.msg, '上传失败', {
                confirmButtonText: '确定'
              });
           })
       }
    }
  }
}
</script>
<style src="~/style/scss/_userexinfo.scss" lang="scss"></style>