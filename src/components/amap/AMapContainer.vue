<script setup>
import {onMounted, onUnmounted} from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import axios from "axios";
import md5 from 'crypto-js/md5';
import CommandSearch from "@/components/commandSearch/CommandSearch.vue";
import {convert} from "@/api/map/map.ts";
import {useMapStore} from "@/store/map.ts";

const mapStore = useMapStore()

let map = null;

let geolocation = null;

const markManager = []

onMounted(() => {

  init()

  // 初始化地图，获取地图大概坐标，
  // 查询高进度坐标，
  // 拿到高进度坐标之后设置中心点，
  // 设置人所在的mark位置
  // AMapLoader.load({
  //   key: "da6d92116f23e902b34690df1efc527f", // 申请好的Web端开发者Key，首次调用 load 时必填
  //   version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  //   plugins: [
  //     "AMap.Scale",
  //     "AMap.ToolBar",
  //     "AMap.ControlBar",
  //     "AMap.Geolocation",
  //     "AMap.PlaceSearch"
  //   ], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  // })
  //     .then((AMap) => {
  //
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  console.log(window.AMap)

  // map.setFeatures['road']
  // console.log(
  //     map.getFeatures()
  // )
  //
});

onUnmounted(() => {
  map?.destroy();
  mapStore.map = null
});

function init() {
  window._AMapSecurityConfig = {
    securityJsCode: "12c36030c5c1323bf9806038bad24caa",
  };

  AMapLoader.load({
    key: "da6d92116f23e902b34690df1efc527f", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [
      "AMap.Scale",
      "AMap.ToolBar",
      "AMap.ControlBar",
      "AMap.Geolocation",
      "AMap.PlaceSearch",
      "AMap.AutoComplete",
      "AMap.CitySearch"
    ], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
      .then((AMap) => {
        window.AMap = AMap;
        window.map = new window.AMap.Map("container", {
          // 设置地图容器id
          viewMode: "3D", // 是否为3D地图模式
          zoom: 12, // 初始化地图级别
          resizeEnable: true,
          // jogEnable: false,
          // 初始化地图中心点位置
        });


        mapStore.map = window.map
        mapStore.AMap = AMap

        console.log(window.map)
        console.log(window.AMap)

        // getCoordinate()
        scaleBar()
        // toolBar()
        // controlBar()
        getCityInfo()
        setGeolocationBar()
        // map.setZoom(15)
        locationButton()
      })
      .catch((e) => {
        console.log(e);
      });

}

function initSelfCenter() {
  const sp = mapStore.selfLngLat.split(",")
  const position = new window.AMap.LngLat(sp[0], sp[1])
  // setSelfMapMarker(position)
  // map.setCenter(position)
  // map.setZoom(18)
  // mapClicker()
}

function getCityInfo() {
  //实例化城市查询类
  var citysearch = new AMap.CitySearch();
  //自动获取用户IP，返回当前城市
  citysearch.getLocalCity(function(status, result) {
    if (status === 'complete' && result.info === 'OK') {
      mapStore.currentAdcode = result.adcode
    }
  })
}
    //   if (result && result.city && result.bounds) {
    //     // var cityinfo = result.city;
    //     // var citybounds = result.bounds;
    //     console.log(result)
    //     console.log(cityinfo)
    //     console.log(citybounds)
    //     // document.getElementById('info').innerHTML = '您当前所在城市：'+cityinfo;
    //     //地图显示当前城市
    //     // map.setBounds(citybounds);
    //   }
    // } else {
    //   // document.getElementById('info').innerHTML = result.info;
    // }

function scaleBar() {
  // https://lbs.amap.com/demo/javascript-api-v2/example/mapbar/mapcontrol-control-add-remove
  const scale = new AMap.Scale({
    visible: true
  })
  window.map.addControl(scale);
  return scale
}

function toolBar() {
  const toolBar = new AMap.ToolBar({
    visible: true
  })
  window.map.addControl(toolBar);
  return toolbar
}

function controlBar() {
  const controlBar = new AMap.ControlBar({
    visible: true
  })
  window.map.addControl(controlBar);
  return controlBar
}

function locationButton() {
  const amapGeolocation = document.querySelector('.amap-geolocation')
  console.log(amapGeolocation)
  amapGeolocation.addEventListener(('click'), (ev) => {
    window.map.setZoom(18)
  })
}

function setGeolocationBar() {
  var options = {
    'showButton': true,//是否显示定位按钮
    'position': 'RB',//定位按钮的位置
    'timeout': 1000,
    'convert': true,
    /* LT LB RT RB */
    'offset': [30, 80],//定位按钮距离对应角落的距离
    'showMarker': true,//是否显示定位点
    'showCircle': true,//是否显示定位精度圈
    'circleOptions': {//定位精度圈的样式
      'strokeColor': '#0093FF',
      'noSelect': true,
      'strokeOpacity': 0.5,
      'strokeWeight': 1,
      'fillColor': '#02B0FF',
      'fillOpacity': 0.25
    },
    // 'panToLocation ': true,
    'enableHighAccuracy': false,
  }

  const geolocation = new window.AMap.Geolocation(options)
  window.map.setZoom(12)
  geolocation.getCurrentPosition()
  // getCoordinate(geolocation)
  window.map.addControl(geolocation);
  return geolocation
}

function getCoordinate(geolocation) {
  geolocation.getCurrentPosition((status, result) => {
    if (status === 'complete') {
      // getConvertCoordinate(result.position.lng, result.position.lat)
    } else {
      // onError(result)
      console.log(result)
    }
  })
}

function getConvertCoordinate(lng, lat) {
  // 获取转换后的高德坐标
  const key = import.meta.env.VITE_AMAP_WEB_KEY
  const coordsys = 'gps'
  const sig = import.meta.env.VITE_AMAP_WEB_KEY_SIG
  const output = 'json'
  const variable = `coordsys=${coordsys}&key=${key}&locations=${lng},${lat}&output=${output}`
  // const SIGMD5 = md5(variable+sig).toString()
  // const params = {coordsys: coordsys, key: key, locations: `${lng},${lat}`, output: output, sig: SIGMD5}
  const params = {coordsys: coordsys, key: key, locations: `${lng},${lat}`, output: output}
  // axios.get(`https://restapi.amap.com/v3/assistant/coordinate/convert?${variable}&sig=${SIGMD5}`)
  convert(params)
      .then(response => {
        if (response.status === "1") {
          // const locations = response.locations.split(",")
          mapStore.selfLngLat = response.locations
          initSelfCenter()
        }
      })
}


function setSelfMapMarker(position) {

  // map.setCenter(position, false, 2000);
  // map.setZoom(18)
  // const center = new AMap.LngLat(locations[0], locations[1]) //经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]

  // const marker = new AMap.Marker({
  //   position: position
  // });
  const circleMarker = new AMap.CircleMarker({
    center: position, //圆心
    radius: 15, //半径
    strokeColor: "white", //轮廓线颜色
    strokeWeight: 3, //轮廓线宽度
    strokeOpacity: 0.5, //轮廓线透明度
    fillColor: "rgb(0,158,255)", //多边形填充颜色
    fillOpacity: .8, //多边形填充透明度
    zIndex: 10, //多边形覆盖物的叠加顺序
    cursor: "pointer", //鼠标悬停时的鼠标样式
  });
  map.add(circleMarker)
  mapStore.markManager.push(circleMarker)
  // return circleMarker
  // map.setFitView([circleMarker])// 设置地图的合适视野
  // map.add(marker)
}

function mapClicker() {
  const clickHandler = function (e) {
    console.log('您在[ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ]的位置点击了地图！');
    // mapStore.removeAllMarker()
  };
//绑定事件
  map.on('click', clickHandler);
}

</script>

<template>
  <div id="container"></div>
</template>

<style scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
