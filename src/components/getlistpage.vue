<template>
  <div i="getlistpage">
      <slot></slot>
      <div class="paginationbg">
        <ol class="pagination clear">
          <li @click="getData(i+1);pageIndex=i"  v-for="(v,i) in maxpage" v-show="i<9"><span :class="{'active':pageIndex==i}">{{i+1}}</span></li>
        </ol>
      </div>
  </div>
</template>

<script>
export default{
   props:['maxpage'],
   data () {
      return {
        pageIndex:0
      }
   },
  methods:{
    getData (i) {
      this.$emit('getdata',i)
    }
  }

}
</script>

<style lang="scss">
[i="getlistpage"]{
  .paginationbg{
      margin:20px 0;
      text-align:center;
  }
  .pagination{
    display:inline-block;
  }
  .pagination li{
    float:left;
    width:40px;
    height:40px;
    margin:0 10px;
    color:#999;
    text-align:center;
    line-height:40px;
    cursor:pointer;
    span {
      border: 1px solid #E5E5E5;
      display: block;
      width: 100%;
      border-radius: 50%;
      text-decoration: none;
    }
    .active {
      color: #fff;
      background-color: #13d1be;
      border-color: #13d1be;
    }
  }
}
</style>