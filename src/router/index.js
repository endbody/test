import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export let routes = [
  {
    path: "banner",
    component: () => import("../pages/banner/banner"),
    name: "轮播图管理"
  },
  {
    path: "cate",
    component: () => import("../pages/cate/cate"),
    name: "商品分类"
  },
  {
    path: "goods",
    component: () => import("../pages/goods/goods"),
    name: "商品管理"
  },
  {
    path: "manage",
    component: () => import("../pages/manage/manage"),
    name: "管理员管理"
  },
  {
    path: "menu",
    component: () => import("../pages/menu/menu"),
    name: "菜单管理"
  },
  {
    path: "role",
    component: () => import("../pages/role/role"),
    name: "角色管理"
  },
  {
    path: "seckill",
    component: () => import("../pages/seckill/seckill"),
    name: "秒杀活动"
  },
  {
    path: "vip",
    component: () => import("../pages/vip/vip"),
    name: "会员管理"
  },
  {
    path: "specs",
    component: () => import("../pages/specs/specs"),
    name: "商品规格"
  }
]

export default new Router({
  routes: [
    {
      path: "/",
      component: () => import("../pages/index/index"),
      children: [
        {
          path: "",
          component: () => import("../pages/home/home"),
        },
        ...routes
      ]
    },
    {
      path: "/login",
      component: () => import("../pages/login/login")
    }
  ]
})
