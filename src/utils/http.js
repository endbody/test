import axios from "axios"
import qs from "qs"


let baseUrl = "/api"

// 响应拦截
axios.interceptors.response.use(res=>{

    console.log(res.config.url)
    console.log(res)


    return res;
})

// 菜单管理列表请求

export const reqMenuList = ()=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/menulist",
    })
}


//菜单管理列表添加请求

export const reqMenuAdd = (form)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/menuadd",
        data:qs.stringify(form)
    })
}

//菜单管理列表删除请求

export const reqMenuDel = (id)=>{
    return axios({
        method:"post",
        url:baseUrl+"/api/menudelete",
        data:qs.stringify({
            id
        })
    })
}


//菜单管理列表修改请求

export const reqMenuDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        method:"get",
        params:{
            id:id
        }
    })
}

//菜单管理交互请求

export const reqMenuListAll = (id)=>{
    return axios({
        method:"get",
        url:baseUrl+"/api/menulist",
        params:{
            istree:true
        }
    })
}

// 修改
export const reqMenuUpdate=(form)=>{
    return axios({
        url:baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(form)
    })
}