<template>
  <div class="star-box">
  	<div class="star" @mousemove="mousemove()" :class="{'move':move}">
  		<ul class="star1">
  			<li><i class="fa fa-star"></i></li>
  			<li><i class="fa fa-star"></i></li>
  			<li><i class="fa fa-star"></i></li>
  			<li><i class="fa fa-star"></i></li>
  			<li><i class="fa fa-star"></i></li>
  		</ul>
  		<ul class="star2" :style="{width:width+'%'}" >
  			<li><i class="fa fa-star"></i></li>
  			<li><i class="fa fa-star"></i></li>
  			<li><i class="fa fa-star"></i></li>
  			<li><i class="fa fa-star"></i></li>
  			<li><i class="fa fa-star"></i></li>
  		</ul>
    </div>
      <span v-if="move">{{width}}分(滑动评分~点击提交)</span>
  </div>
</template>

<script>
  export default{
    props: [ 'socure', 'maxsocure', 'move' ],
    data () {
      return {
        width:0
      }
    },
    mounted (){
      this.init()
    },
    methods: {
      init () {
        if(!this.move) this.width =  parseInt((this.socure || 0) / (this.maxsocure || 100) * 100)
      },
      mousemove () {
        if(!this.move) return
        let a = this.getPoint(event.currentTarget)
        this.width = parseInt(parseFloat(a.x / event.currentTarget.offsetWidth).toFixed(2) * 100)
        this.$emit('score',this.width)
      },
      getPoint(obj, e) {
        let t = obj.offsetTop
        let l = obj.offsetLeft
        while (obj = obj.offsetParent) {
            t += obj.offsetTop
            l += obj.offsetLeft
        }
        let newe = e || window.event
        return {t, l, x : newe.clientX - l + 1, y : newe.clientY - t}
      }
    },
    watch:{
      socure () {
        this.init()
      }
    }
  }
</script>

<style lang="scss">
@import url("../../static/css/font-awesome.min.css");
.star-box{
  display: inline-block;
}
.move{
  cursor:pointer;
}
.star{
  position:relative;
  display: inline-block;
  font-size:14px;
  .star1{
    color:#c3c3c3;
    list-style: none;
    padding: 0;
    text-align: left;
    white-space: nowrap;
  }
  .star2{
    position:absolute;
    top:0;
    color:#F90;
    overflow:hidden;
    list-style: none;
    padding: 0;
    text-align: left;
    white-space: nowrap;
  }
  li{
    display:inline-block;
  }
}
</style>