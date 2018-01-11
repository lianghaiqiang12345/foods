<template>
<div i="login">
  <section class="container logobg">
    <logo></logo>
  </section>
  <section class="container" id="login">
    <div class="promotion-banner">
       <img src="static/images/login-bg.jpg" alt="">
    </div>
    <div class="login-section">
    <div class="validate-info" v-show="error.opinfo">
      <i class="tip-status tip-status-opinfo"></i>
      {{error.msg}}
    </div>
    <p>帐号登录</p>
    <!-- 用户名 -->
    <div class="form-field form-icon">
         <i class="fa fa-user"></i>
        <input type="text" class="f-text" maxlength="11" name="username" placeholder="手机号"
        v-model="item.username"
        >
    </div>
    <!-- 密码 -->
    <div class="form-field form-icon">
         <i class="fa fa-lock"></i>
        <input type="password" maxlengh="16" class="f-text" name="password" placeholder="密码"
        v-model="item.password"
        >
    </div>
    <div class="form-field form-nor clear">
      <router-link class="forget-password" :to="'/forget_password'">忘记密码？</router-link>
      <input v-model="timeChecked" type="checkbox" value="1" name="auto_login" id="autologin" class="f-check ui-checkbox">
      <label class="normal" for="autologin">七天内自动登录</label>
    </div>
    <!-- 登录  -->
    <div class="form-field">
      <input type="submit" class="btn" name="commit" value="登录"
        @click="submitLogin()"
      >
    </div>
    <p class="signup-guide">还没有账号？<router-link :to="'/register'" target="_top">免费注册</router-link></p>
    </div>
  </section>
  <myfooter></myfooter>
</div>
</template>
<script>
import logo from '~/components/logo.vue'
import myfooter from '~/components/footer.vue'
export default {
  components: {
    logo,
    myfooter
  },
  data () {
    return {
      url: '/user/login.shtml',
      item: {
        username: '',
        password: ''
      },
      error: {
        opinfo: false,
        msg: ''
      },
      timeChecked: false
    }
  },
  methods: {
    submitLogin () {
      if (this.item.username === '' && this.item.password === '') {
        this.error.opinfo = true
        this.error.msg = '请输入帐号密码'
        return false
      }
      this.$api.post(this.url, {
        username: this.item.username,
        password: this.item.password
      }, res => {
        console.log(res)
        let user = {
          id: res.id,
          nickname: res.nickname,
          username: res.username
        }
        if (this.timeChecked) {
          user.time = res.last_login_time
        }
        this.$utils.setlocalStorage('user', user)
        this.$store.state.isLogin = true
        this.$store.state.user = user
        this.$router.push('/')
      }, res => {
        this.error.opinfo = true
        this.error.msg = res.msg
      })
    }
  }
}
</script>

<style src="~/style/scss/_login.scss"lang="scss"></style>