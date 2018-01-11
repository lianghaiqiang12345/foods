<template>
    <div class="cny-log" v-show="show">
      {{message}}
    </div>
</template>

<script>
export default{
  data (){
    return {
      show:false,
      duration: 3000,
      timer: null,
      message: '',
      closed: false,
      onClose: null,
    }
  },
  mounted() {
    this.startTimer();
  },
  watch: {
      closed(newVal) {
        if (newVal) {
          // this.show = false;
        }
      }
    },
  methods:{
    shows:function(){
      console.log('显示出来吧~')
    },
    close() {
        this.closed = true;
        if (typeof this.onClose === 'function') {
          this.onClose(this);
        }
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.close();
            }
          }, this.duration);
        }
    },
  }
}
</script>

<style lang="scss">
.cny-log{
  position:fixed;
  width:200px;
  height:auto;
  border:1px solid green;
  padding:10px;
  border-radius:10px;
  // display: flex;
  // align-items: center;
  text-align:center;
  top:20px;
  left:50%;
  margin-left:-100px;
  z-index:201;
  color:#fff;
  font-size:14px;
  background-color:green;
}
</style>