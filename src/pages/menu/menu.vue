<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <list :list="list" @refresh="getMenu()" @edit="edit($event)"></list>
    <detail :info="info" @resData="getMenu()" :list="list" ref="form"></detail>
  </div>
</template>

<script>
import list from "./components/list.vue";
import detail from "./components/detail.vue";
import { reqMenuList ,reqMenuListAll} from "../../utils/http";

export default {
  data() {
    return {
      info: {
        isShow: false,
        title:"添加菜单"
      },
      form: {
        name: ""
      },
      list: []
    };
  },
  components: {
    list,
    detail
  },
  methods: {
    add() {
      this.info.isShow = true;
      this.info.title = "添加菜单"
    },
    getMenu() {
      reqMenuList().then(res => {
        if (res.data.code === 200) {
          this.list = res.data.list;
        }
      });
    },
    getMenuList(){
      reqMenuListAll().then(res=>{
        // console.log()
      })
    },
    edit(id){
      this.info.isShow = true;
      this.info.title = "编辑菜单";
      this.$refs.form.getOne(id)
     
    }
  },
  mounted() {
    this.getMenu();
  }
};
</script>

<style>
</style>