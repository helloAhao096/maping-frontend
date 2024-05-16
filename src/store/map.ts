import {defineStore} from "pinia";
import {computed, Ref, ref} from "vue";
// import AMap from "@amap/amap-jsapi-loader";

export const useMapStore = defineStore('map', () => {
    // const map = ref()
    // const AMap = ref()
    const zoom = ref()
    const currentCity = ref("")
    const currentAdcode = ref()
    const selfLngLat: Ref<string> = ref("")// "120.283839,31.513945"
    const targetLngLat = ref()
    const markManager = ref([])
    // const doubleCount = computed(() => count.value * 2)
    // function increment() {
    //     count.value++
    // }
    const splitSelfLngLat = computed(() => {
        const coordinate = selfLngLat.value.split(",")
        const lng = coordinate[0]
        const lat = coordinate[1]
        return {
            lng: lng,
            lat: lat
        }
    })
    const splitTargetLngLat = computed(() => {
        const coordinate = targetLngLat.value.split(",")
        const lng = coordinate[0]
        const lat = coordinate[1]
        return {
            lng: lng,
            lat: lat
        }
    })
    // function splitSelfLngLat() {
    //     const coordinate = LngLat.value.split(",")
    //     const lng = coordinate[0]
    //     const lat = coordinate[1]
    //     return {
    //         lng:lng,
    //         lat: lat
    //     }
    // }
    function setZC(zoom, lng,lat) {
        // 设置zoom和center，使用
        // const coordinate = splitSelfLngLat.value
        window.map.setZoomAndCenter(zoom, [lng, lat], true); //同时设置地图层级与中心点
    }

    function removeAllMarker(){
        // map.value.remove(markManager.value)
        map.value.clearMap()
    }

    function addTargetMarker(lng,lat) {
            var marker = new window.AMap.Marker({
                position: new window.AMap.LngLat(lng,lat),
            });
            window.map.add(marker)
    }

    function removeTargetMarker() {
        // map.value.on('mapload', function () {
        //     // 获取 AMap.Map 实例
        //     const AMap = map.value.getMap();
        //     // 使用 AMap.Map 基本方法添加插件
        //     marker.setMap(map.value)
        //     // map.value.add(marker)
        // });
    }

    return {
        // ref
        currentAdcode,

        // map,
        currentCity,
        selfLngLat,
        markManager,
        targetLngLat,

        // computed
        splitSelfLngLat,
        splitTargetLngLat,

        // function
        setZC,
        removeAllMarker,
        addTargetMarker
    }
})