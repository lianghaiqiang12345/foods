<template>
  <div i="user_info">
    <div class="title">
      个人信息
      <a href="javascript: void(0);" class="pull-right js-edit-info" @click="formShow = true"><i class="fa fa-pencil"></i> 编辑</a>
    </div>
    <div class="line"></div>
    <div class="info-wapper" v-loading="loading" v-if="userInfo">
       <div class="info-box clear">
            <label class="pull-left">昵称</label><div class="pull-left">{{userInfo.nickname}}</div>
        </div>
        <div class="info-box clear">
            <label class="pull-left">喜好</label>
            <div class="pull-left">
              <span class="hobby-span" v-for="(v,i) in userInfo.hobby">{{v}}</span>
            </div>
        </div>
        <div class="info-box clear">
            <label class="pull-left">性别</label>
            <div class="pull-left" v-if="userInfo.sex == 0">保密</div>
            <div class="pull-left" v-else-if="userInfo.sex == 1">男</div>
            <div class="pull-left" v-else-if="userInfo.sex == 2">女</div>
            <div class="pull-left" v-else>保密</div>
        </div>
        <div class="info-box clear">
            <label class="pull-left">个性签名</label><div class="pull-left" v-text="userInfo.idiograph?userInfo.idiograph:'快来写一个签名~'">{{}}</div>
        </div>
    </div>
    <div v-else style="text-align:center;"><h2 style="margin:20px 0;">404</h2><a herf="javascript:void(0);" @click="creatfun">点击再次获取</a></div>
    <transition name="fade">
    <div id="user-info-form" v-show="formShow">
      <div class="user-title">
        <div><span>编辑个人信息</span><a href="javascript:void(0)" class="close" @click="closeForm()">X</a></div>
      </div>
        <div class="inner">
            <div class="moco-modal-dialog">
              <div class="form-list"><label for="nickname">昵称：</label><input type="text" v-model="udloadUserInfo.nickname"></div>

              <div class="form-list"><label for="nickname">喜好: </label>
               <span class="hobby">
                <label  v-for="(v,i) in hobby">
                  <input type="checkbox" :value="v.id" v-model="udloadUserInfo.hobby" name="auto_login" :id="'autologin'+i" class="f-check ui-checkbox">
                  <label class="normal" :for="'autologin'+i"></label>{{v.flavor_name}}
                  </label>
                </span>
              </div>
              <div class="form-list"><label for="nickname">性别: </label><select type="text" v-model="udloadUserInfo.sex">
                      <option value="0">保密</option>
                      <option value="1">男</option>
                      <option value="2">女</option>
                </select>
              </div>
              <div class="form-list"><label for="nickname">个性签名: </label><input type="text" v-model="udloadUserInfo.idiograph"></div>
            </div>
        </div>
        <div class="form-field">
          <input type="submit" class="btn" name="commit" value="确定"
            @click="submitForm()"
          >
          <input type="submit" class="btn" name="commit" value="取消"
            @click="closeForm()"
          >
        </div>
    </div>
    </transition>
  </div>

</template>

<script>
export default {
  created () {
    this.creatfun()
  },
  data () {
    return {
      userInfo:'',
      udloadUserInfo:'',
      mappingInfo:'',
      formShow:false,
      hobby:'',
      loading:true,
    }
  },
  methods: {
    getHobby () {
      //爱好
     return new Promise((resolve, reject)=>{
          this.$api.post('user/findFlavor.shtml',null,res=>{
            this.hobby = res
            resolve();
          },res=>{
            reject("爱好失败");
         })
      })
    },
    getUserInfo () {
      //用户信息
    return new Promise((resolve, reject)=>{
      this.$api.post('user/findUser.shtml',{id:this.$store.state.user.id},res=>{
              res.hobby = res.hobby.length?res.hobby.split(','):[]
              this.udloadUserInfo = this.$utils.extend(res)
              this.mappingInfo = this.$utils.extend(res)
              res.hobby = function(h,y){
                let arr = h
                let brr = []
                for(let i of y){
                  if(arr.includes(i.id.toString())){
                    brr.push(i.flavor_name)
                  }
                }
                return brr
              }(res.hobby,this.hobby)
              this.userInfo = res
              resolve();
           },res=>{
              reject("用户信息失败");
           })
      })
    },
    getallInfo: async function () {
        const f1 = await this.getHobby();
        const f2 = await this.getUserInfo();
    },
    creatfun(){
      this.loading = true
      this.getallInfo().then(()=>{
         this.loading = false
      }).catch((value)=>{
        this.loading = false
        console.error(value)
      })
    },
    isHobby (h) {
      let arr = h.map(x=> +x)
      let brr = []
      for(let i of this.hobby){
        if(arr.includes(i.id)){
          brr.push(i.flavor_name)
        }
      }
      return brr
    },
    closeForm (){
      this.formShow = false
      this.udloadUserInfo = this.$utils.extend(this.mappingInfo)
    },
    submitForm(){
       this.$api.post('user/editUser.shtml',{
        id:this.$store.state.user.id,
        nickname:this.udloadUserInfo.nickname,
        sex:this.udloadUserInfo.sex,
        idiograph:this.udloadUserInfo.idiograph,
        hobby:this.udloadUserInfo.hobby
      },res=>{
          this.formShow = false
          this.userInfo = this.$utils.extend(this.udloadUserInfo)
          this.userInfo.hobby = this.isHobby(this.userInfo.hobby)
          const user = this.$utils.getlocalStorage('user')
          user.nickname = this.udloadUserInfo.nickname
          this.$utils.setlocalStorage('user',user)
          this.$store.commit('refashuser')
          this.$message({
            message: '修改资料成功',
            type: 'success'
          });
       },res=>{
          this.$alert(res.msg, '修改失败', {
            confirmButtonText: '确定'
          });
       })
    }
  },
}
</script>

<style src="~/style/scss/_user_info.scss" lang="scss"></style>