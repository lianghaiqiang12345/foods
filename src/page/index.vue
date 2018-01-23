<template>
  <div i="index">
    <myHeader></myHeader>
    <section class="content-block container">
      <!-- <p class="content-url">广州 > </p> -->
      <div class="center-content clear">
        <!-- 左边：开始 -->
        <div class="left-content">
          <!-- 选择条件区域：开始 -->
          <div class="filter-box">
            <!-- 已选条件：开始 -->
            <div class="filter-selected-condition" v-show="filterShow">
              <label>已选条件</label>
              <div class="filter-a">
                <a class="close-filter" href="javascript:void(0);" v-for="(v,i) in tag.fillter" @click="deletfilter(i)" v-show="v.name">{{v.name}}</a>
              </div>
              <span class="close-allfilter" @click="deletAllfilter();setDistrictName()">· 清除全部</span>
            </div>
            <!-- 分类条件：开始 -->
            <div class="filter-section-wrapper">
              <div class="filter-component">
                <div class="label">
                  <label>区域</label>
                  <span :class="{'check':tag.streetsIndex==''}" @click="subType(0,'','');setDistrictName();streetsI=''">全部</span>
                </div>
                <div class="tags">
                  <div class="tag-group">
                    <div class="div" v-for="(v,i) in tag.district">
                      <span :class="{'more':v.streets.length>0,'check':streetsI===i}">{{v.district}}
                        <div class="more-div">
                          <div class="div">
                               <span :class="{'check':tag.streetsIndex==''+i}" @click="streetsI=i;subType(0,''+i,v.district);setDistrictName(v.district)">全部</span>
                          </div>
                          <div class="div" v-for="(value,index) in v.streets">
                            <span :class="{'check':tag.streetsIndex==''+i+index}" @click="streetsI=i;subType(0,''+i+index,value);setDistrictName(v.district,value)">{{value}}</span>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="filter-component">
                <div class="label">
                  <label>分类</label>
                   <span :class="{'check':tag.sub_typeIndex==''}" @click="subType(1,'','');typeI=''">全部</span>
                </div>
                <div class="tags">
                  <div class="tag-group">
                    <div class="div" v-for="(v,i) in tag.foodType">
                      <span :class="{'more':v.sub_type.length>0,'check':typeI===i}">{{v.name}}
                          <div class="more-div">
                            <div class="div">
                              <span :class="{'check':tag.sub_typeIndex==v.id}" @click="typeI=i;subType(1,v.id,v.name)" >{{v.name}}</span>
                            </div>
                          <div class="div" v-for="(v,index) in v.sub_type">
                            <span :class="{'check':tag.sub_typeIndex==v.id}" @click="typeI=i;subType(1,v.id,v.name);" >{{v.name}}</span>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 显示区域：开始 -->
          <getlistpage :maxpage="pageCount" @getdata = "getcate">
              <div class="common-list clear">
              <div class="sort-option">
                <span class="sort-cur" :class="{'active':order==null}" @click="order=null">智能排序</span>
                <span class="sort-price" :class="{'active':order==1||order==2,'before':order==2,'after':order==1}" :order="order" @click="order=order==1?2:order==2?1:2">价格排序</span>
                <span :class="{'active':order==3}" @click="order=3">人气最高</span>
                <span :class="{'active':order==4}" @click="order=4">评价最高</span>
              </div>
              <div class="common-list-main" v-if="cateFoods.length!=0" v-loading="loading">
                  <list-item v-for="(item,index) in cateFoods" :itemIndex="index + 1" :cateFoods = "item" @ShowMap="ShowMap" :key="index"></list-item>
              </div>
              <div class="common-list-main" v-else v-loading="loading">
                不好意思,没有你需要的美食
              </div>
            </div>
          </getlistpage>
        </div>
        <!-- 右边：开始 -->
        <div class="right-content">
          <div class="map">
            <myamap :pointers="pointers" :poin="poin" :id="'amap-main'" ></myamap>
          </div>
          <div class="recommend-box">
            <div class="top-nav-box">猜你喜欢</div>
                <recommend-list v-for="(item,index) in LikeFoods" :LikeFoods = "item" :key="index"></recommend-list>
          </div>
        </div>
      </div>
      <div class="MaxmapBg" v-show="mapData.show">
        <div class="Maxmap">
          <span class="r" @click="mapData.show=false">X</span>
          <myamap :pointers="mapData.p" :id="'amap-main2'" :zoom="20" ></myamap>
        </div>
      </div>
    </section>
    <myFooter></myFooter>
  </div>
</template>
<script>
import myHeader from '~/components/header.vue'
import myFooter from '~/components/footer.vue'
import listItem from '~/components/list-item.vue'
import myamap from '~/components/amap.vue'
import recommendList from '~/components/recommend-list.vue'
import getlistpage from '~/components/getlistpage.vue'
import {mapState} from 'vuex'
export default {
  components: {
    myHeader,
    myFooter,
    listItem,
    myamap,
    recommendList,
    getlistpage
  },
  created () {
    this.getData()
    this.getCate()
    this.$store.state.isLogin&&this.getLike()
  },
  data () {
    return {
      pageNow: 1,
      tag:{
        district: '',
        foodType: '',
        fillter: [{id:'',name:''},{id:'',name:''},{id:'',name:this.$store.state.searchText}],
        streetsIndex: '',
        sub_typeIndex: '',
        districtName: []
      },
      streetsI:'',
      typeI:'',
      order:null,
      cateFoods:'',
      pageCount:1,
      pointers:[],
      poin:{
        lng:0,
        lat:0
      },
      mapData:{
        show:false,
        p:[]
      },
      loading:true,
      LikeFoods:[]
    }
  },
  methods: {
      getData () {
        //区域
        this.$api.post('/cate/getDistrict.shtml',{city:this.city},res=>{
          this.tag.district = res
        })
        //分类
        this.$api.get('/cate/getType.shtml',null,res=>{
           this.tag.foodType = res
        })
      },
      getCate () {
           this.loading = true
        //美食
        let params = {
          type_id : this.tag.fillter[1].id,
          city : this.city,
          search:this.searchText,
          district : this.tag.districtName[0] || '',
          street : this.tag.districtName[1] || '',
          pageNow : this.pageNow,
          order : this.order
        }
         this.$api.post('/cate/getCate.shtml',params,res=>{
           this.pageNow = 1
           this.cateFoods = res.cates
           this.getPointer(res.cates)
           this.pageCount = res.pageCount
           this.loading = false
        },res=>{
          this.loading = false
        })
      },
      getLike (){
          this.$api.post('/cate/getLike.shtml',{user_id:this.$store.state.user.id},res=>{
              if(({}).toString.call(res) == '[object Object]'){
                  res = [res]
              }
              this.LikeFoods = res
              console.log(res)
          })
      },
      getPointer(res){
        let arr = []
        let lat = []
        let lng = []
        for(let i in res){
          arr.push({
            lat:+res[i].lat,
            lng:+res[i].lng
          })
          lat.push(+res[i].lat)
          lng.push(+res[i].lng)
        }
        this.pointers = arr
        this.poin.lat = (Math.max(...lat) + Math.min(...lat))/2
        this.poin.lng = (Math.max(...lng) + Math.min(...lng))/2
      },
      deletAllfilter () {
        for(let v in this.tag.fillter){
          this.tag.fillter[v].id=''
           this.tag.fillter[v].name=''
        }
        this.tag.sub_typeIndex = ''
        this.tag.streetsIndex = ''
        this.$store.commit('search','')
      },
      deletfilter (index) {
         if (index == 1) {
            this.tag.sub_typeIndex = ''
            this.typeI = ''
        } else if (index == 0) {
            this.tag.streetsIndex = ''
            this.streetsI = ''
            this.setDistrictName()
        } else if (index == 2) {
          this.$store.commit('search','')
        }
        this.tag.fillter[index].id=''
        this.tag.fillter[index].name=''
      },
      subType (i,id,name) {
        this.tag.fillter[i].id = id
        this.tag.fillter[i].name = name
        if (i) {
           this.tag.sub_typeIndex = id
        } else {
           this.tag.streetsIndex = id
        }
      },
      setDistrictName () {
          this.tag.districtName = [...arguments]
      },
      getcate (i) {
        this.pageNow = i
        this.getCate()
      },
      ShowMap (p) {
        this.mapData.show = true
        this.mapData.p.shift()
        this.mapData.p.push({
          lng:p[0],
          lat:p[1],
        })
      }

  },
  computed: {
    filterShow () {
        return this.tag.fillter[0].name !== '' || this.tag.fillter[1].name !== ''|| this.tag.fillter[2].name !== ''
    },
    fillter () {
        return this.tag.fillter
    },
    searchText () {
      return this.$store.state.searchText
    },
    city () {
      return this.$store.state.city
    }
  },
  watch: {
   fillter: {
　　　　handler(newValue, oldValue) {
　　　　　　this.getCate()
　　　　},
　　　　deep: true
　　},
   order: {
     handler(newValue, oldValue) {
　　　　　　this.getCate()
　　　　},
　　　　deep: true
   },
   city(){
　　　this.getData()
      this.getCate()
   },
   searchText () {
      this.tag.fillter[2].name = this.searchText
   }
  }
}
</script>
<style  src="~/style/scss/_index.scss" lang="scss"></style>