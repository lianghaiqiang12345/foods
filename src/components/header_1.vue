<template>
    <header class="header">
      <div class="container">
        <div class="header_left">
          <logo></logo>
        </div>
        <div class="header_right">
            <span class="tip">已有JJ美食的账号？</span>
            <router-link class="login" :to="'/login'">登录</router-link>
          </div>
      </div>
    </header>
</template>

<script>
import logo from '~/components/logo.vue'
export default{
  components:{
    logo
  }
}
</script>

<style lang="scss">
  .header{
    height:100px;
    background:#fff;
    box-shadow: 0 2px 27px 0 rgba(0,0,0,.1);
  }
  .header_left{
    float:left;
  }
  .header .header_right{
    float:right;
    height:100%;
    line-height:100px;
  }
  .header img{
    width:60px;
    height:60px;
    margin-top:10px;
  }
</style>