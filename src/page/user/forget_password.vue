<template>
<div>
  <myHeader></myHeader>
  <section class="container">
    <formPut></formPut>
  </section>
  <myFooter></myFooter>
</div>
</template>
<script>
import formPut from '~/components/form-put.vue'
import myHeader from '~/components/header_1.vue'
import myFooter from '~/components/footer.vue'
export default{
  components:{
    formPut,
    myHeader,
    myFooter
  }
}
</script>