import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

export const asyncRoutes: Array<RouteRecordRaw> = [
    {
        path:"/",
        redirect: "/guide"
    },
    {
        path: "/",
        name: "/",
        // meta:{
        //     title:'首页',//配置title
        //     keepAlive:false,//是否缓存
        //     requireAuth:false//是否需要身份验证
        // },
        component: () => import("@/views/RootVIew.vue"),
        children: [{
            path: "guide",
            name: "guide",
            component: () => import("@/views/Guide/GuideView.vue"),
            children: []
        },
            {
                path: "explore",
                name: "explore",
                // meta:{
                //     title:'首页',//配置title
                //     keepAlive:false,//是否缓存
                //     requireAuth:false//是否需要身份验证
                // },
                component: () => import("@/views/Explore/ExploreView.vue")
            },
            {
                path: "user",
                name: "user",
                // meta:{
                //     title:'首页',//配置title
                //     keepAlive:false,//是否缓存
                //     requireAuth:false//是否需要身份验证
                // },
                component: () => import("@/views/User/UserView.vue")
            }],

    },
    {
        path: "/guide/:id",
        name: "guideDetail",
        component: () => import("@/components/guide/guideDetails/GuideDetailList.vue"),
    },
    // //活动中心
    // {
    //     path: "/activity",
    //     name: "activity",
    //     //路由懒加载
    //     component: () => import("@/views/activity/Activity.vue"),
    // },
    // //通过ID进入藏品详细
    // {
    //     path: "/collectionDetails/:id",
    //     name: "collectionDetails",
    //     component: () => import("@/views/collection-details/CollectionDetails.vue"),
    // },
];

const router = createRouter({
    // 始终滚动到顶部
    // scrollBehavior() {
    //     return { top: 0 };
    // },
    history: createWebHistory(),
//设置路由前缀，默认为空
// history: createWebHashHistory("/cs"),
    routes: asyncRoutes,
});

export default router;