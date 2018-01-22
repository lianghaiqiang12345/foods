<template>
	<header>
     <section class="header">
      <div class="container">
        <div class="header_left">
          <i class="fa fa-map-marker"></i>
          <span>{{city}}<span class="qie-city" @click="selectShow = !selectShow">[<span v-show="selectShow">取消</span>切换]</span></span>
          <router-link :to="'/'" title="首页">　　　首页</router-link>
        <transition name="fade">
          <div class="select-bg" v-show="selectShow">
            <select name="one" id="one" @change="changeOption($event,'oneCNum')">
              <option :value="v.name" v-for="(v,i) in oneC">{{v.name}}</option>
            </select>
            <select name="two" id="two" @change="changeOption($event,'twoCNum')">
              <option :value="v.name" v-for="(v,i) in twoC">{{v.name}}</option>
            </select>
           <!--  <select name="three" id="three">
              <option :value="v.name" v-for="(v,i) in threeC">{{v.name}}</option>
            </select> -->
            <button class="btn" @click="getselectCity">确定</button>
          </div>
        </transition>
        </div>
        <div class="header_right" v-if="isLogin">
          欢迎你，
          <router-link class="login" :to="'/userexinfo'"
          v-text="user.nickname"></router-link>,
          <span @click="goback()">注销</span>
        </div>
        <div class="header_right" v-else>
        <router-link class="login" :to="'/login'">立即登录</router-link>
        <router-link class="" :to="'/register'">注册</router-link>
        </div>
      </div>
    </section>
    <!-- 头部第二部分搜索：开始 -->
    <section class="serlo container">
      <div class="logobg">
        <logo></logo>
      </div>
      <div class="searchbg">
        <search></search>
      </div>
    </section>
    <div style="display:none" id="hideMap"></div>
  </header>
</template>

<script>
import search from '~/components/search.vue'
import logo from '~/components/logo.vue'
import {mapState} from 'vuex'
import { lazyAMapApiLoaderInstance } from 'vue-amap'
let map
export default {
  components: {
    search,
    logo
  },
  data () {
    return {
      citylist:this.$utils.getlocalStorage('citylist') || '',
      oneCNum:0,
      twoCNum:0,
      selectShow:false
    }
  },
  computed: {
    oneC () {
      return this.citylist
    },
    twoC () {
      return this.citylist[this.oneCNum]&&this.citylist[this.oneCNum].districts
    },
    city () {
      return this.$store.state.city
    },
    ...mapState(['isLogin', 'user'])
  },
  mounted () {
    !this.$store.state.isDing && lazyAMapApiLoaderInstance.load().then(() => {
      map = new AMap.Map('hideMap', { center: new AMap.LngLat(0,0)})
      this.getPointer()
    })
    this.citylist || this.getCityList()

  },
  methods: {
    getCityList () {
      this.$api.axios.get('http://restapi.amap.com/v3/config/district?key=4d5eaf350e8af3f04f5575112621cc76&keywords=中国&subdistrict=3').then(res=>{
        this.$utils.setlocalStorage('citylist',res.data.districts[0].districts)
        this.citylist = res.data.districts[0].districts
      })
    },
    goback () {
      localStorage.removeItem('user')
      this.$store.state.isLogin = false
      this.$router.push('/login')
    },
    onComplete (data) {
      this.$store.commit('setDing')
      this.$store.commit('setcity',data.addressComponent.city)
    },
    getPointer(){
        let self = this
        map.plugin('AMap.Geolocation', function() {
          let geolocation = new AMap.Geolocation({
              enableHighAccuracy: true,//是否使用高精度定位，默认:true
              timeout: 10000,          //超过10秒后停止定位，默认：无穷大
              buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
              zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
              buttonPosition:'RB'
          })
          map.addControl(geolocation)
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', self.onComplete)//返回定位信息
        })
    },
    changeOption (e,num) {
      this.twoCNum = 0
      this[num] = e.target.selectedIndex
    },
    getselectCity () {
      let city =  document.getElementById('two').value || document.getElementById('one').value
      this.$store.commit('setcity',city)
      this.selectShow = false
    }
  },
  watch:{
    city () {
      this.$message({
            message: '切换成功',
            type: 'success'
      });
      this.$store.commit('setcity',this.city)
    }
  }
}
</script>

<style lang="scss">
header{
  background:#fff;
  box-shadow: 0 2px 27px 0 rgba(0,0,0,.1);
  .header{
    width: 100%;
    color: #999;
    height: 40px;
    font-size:13px;
    background: #F8F8F8;
    .header_left{
      float:left;
      height:40px;
      line-height:40px;
      position:relative;
      i.fa{
        font-size:15px;
        margin-right:5px;
      }
      .qie-city{
        margin-left:3px;
        cursor:pointer;
        color:var(--allcolor);
      }
      .select-bg{
        position:absolute;
        bottom:-40px;
        left:0;
        width:350px;
        height:40px;
        border-radius:10px;
        background-color:#fff;
        box-shadow: 0 0px 24px 0 rgba(7,17,27,.2);
        z-index:99;
        select{
          width:130px;
          margin-left:5px;
          outline: 0;
        }
        button{
          padding:5px 10px;
          margin-left:10px;
          border-radius:10px;
          font-size:13px;
          margin-top:-3px;
        }
        &:before{
          content:'';
          border:8px solid transparent;
          border-bottom-color:#fff;
          position:absolute;
          top:-15px;
          left:20px;
        }
      }
    }
    .header_right{
      float:right;
      height:40px;
      line-height:40px;
      .login{
        color:var(--allcolor);
        margin-right:15px;
      }
      a{
        color:#999;
      }
      span{
        cursor:pointer;
      }
    }
  }
  .serlo{
      height:122px;
      .logobg{
        float: left;
        width:318px;
        font-size: 16px;
        padding:21px 120px 0  0;
        height: 80px;
      }
      .searchbg{
        float: left;
        padding-top: 28px;
        position: relative;
      }
    }
}


</style>