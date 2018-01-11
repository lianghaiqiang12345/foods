<template>
<div i="put_password">
    <div class="title">
      修改密码
    </div>
    <div class="line"></div>
    <formPut></formPut>
  </div>
</template>

<script>
import formPut from '~/components/form-put.vue'
export default{
  components:{
    formPut
  }
}
</script>

<style src="~/style/scss/_put_password.scss" lang="scss"></style>