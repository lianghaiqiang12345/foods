<template>
  <div class="search">
    <div class="search-block">
      <input type="text" class="search-input" v-model="text">
      <button class="search-btn" @click="search">
        <i class="fa fa-search"></i>
      </button>
    </div>
    <p class="more">
      <!-- <span>JJ美食欢迎你</span> -->
      <!-- <span>JJ美食欢迎你</span> -->
      <!-- <span>JJ美食欢迎你</span> -->
    </p>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        text:"",
        show:false
      }
    },
    methods : {
      search () {
        this.$store.commit('search',this.text)
        this.text = ''
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="scss">
@import url("../../static/css/font-awesome.min.css");
.search{
  .search-block{
    width: 550px;
    height: 40px;
    border: 1px solid var(--allcolor);
    background: #fff;
    border-radius: 4px;
    .search-input{
      border: none;
      line-height: 100%;
      box-sizing: border-box;
      display: inline-block!important;
      padding: 10px;
      font-size: 15px;
      height: 100%;
      background: 0 0;
      width: 84%;
      outline: 0;
    }
    .search-btn{
      outline: 0;
      width: 16%;
      box-sizing: border-box;
      line-height: 100%;
      height: 100%;
      background: var(--allcolor);
      border: none;
      float: right;
      color: #fff;
      cursor: pointer;
    }
  }
  .more{
    margin-top:8px;
    padding-left:5px;
    span{
      font-size: 13px;
      margin-right:5px;
      color:#999;
      &:hover{
        color:var(--allcolor);
        cursor:pointer;
      }
    }
  }
}
</style>