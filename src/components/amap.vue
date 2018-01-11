<template>
  <div class="near">
    <div class="amap-main" :id="id">

    </div>
    <div style="display:none" id="map-hide"></div>
  </div>
</template>
<script>
import { lazyAMapApiLoaderInstance } from 'vue-amap'
export default{
  name:'near',
  props:['id', 'pointers', 'poin', 'zoom', 'first'],
  data () {
    return {
      localData:{},
      markers:[]
    }
  },
  mounted() {
    this.init()
  },
  watch:{
    pointers () {
      this.newInit()
    }
  },
  methods: {
      init(){
        let lng = (this.poin&&this.poin.lng)||(this.pointers[0]&&this.pointers[0].lng)||113.309213
        let lat = (this.poin&&this.poin.lat)||(this.pointers[0]&&this.pointers[0].lat)||23.146569
        let vid = this.id||'map-hide'
        lazyAMapApiLoaderInstance.load().then(() => {
            this.map = new AMap.Map(vid, {
              resizeEnable: true,
              zoom: this.zoom || 11,
              center: new AMap.LngLat(lng, lat)
            });
            this.pointers&&this.marker(this.pointers)
        })
      },
      newInit(){
        let lng = (this.poin&&this.poin.lng)||(this.pointers[0]&&this.pointers[0].lng)||113.309213
        let lat = (this.poin&&this.poin.lat)||(this.pointers[0]&&this.pointers[0].lat)||23.146569
        lazyAMapApiLoaderInstance.load().then(() => {
          try{this.map.setZoomAndCenter(this.zoom || 11, [lng, lat])}catch(e){}
          this.marker(this.pointers)
        })
      },
      // onComplete (data) {
      //    this.localData = data
      // },
      // getPointer(){
      //     let self = this
      //     map.plugin('AMap.Geolocation', function() {
      //       let geolocation = new AMap.Geolocation({
      //           enableHighAccuracy: true,//是否使用高精度定位，默认:true
      //           timeout: 10000,          //超过10秒后停止定位，默认：无穷大
      //           buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      //           zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      //           buttonPosition:'RB'
      //       })
      //       map.addControl(geolocation)
      //       geolocation.getCurrentPosition()
      //       AMap.event.addListener(geolocation, 'complete', self.onComplete)//返回定位信息
      //     })
      // },
      removeMarkers () {
       try{ this.map.remove(this.markers)}catch(e){}
      },
      marker(data){
          this.removeMarkers()
          AMapUI.loadUI(['overlay/SimpleMarker'], (SimpleMarker) => {
          for(let i=0; i<data.length; i++){
              let marker = new SimpleMarker({
                iconLabel: {
                    innerHTML: i+1, //设置文字内容
                    style: {
                        color: '#fff' //设置文字颜色
                    }
                },
                iconStyle: 'red',
                map: this.map,
                position: [data[i].lng, data[i].lat],
              })
              this.markers.push(marker)
          }
        })
      }
  }

}
</script>
<style lang="scss">
.near{
  width:100%;
  height:100%;
  .amap-main{
    width:100%;
    height:100%;
  }
}

</style>