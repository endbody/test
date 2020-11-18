<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="'120'">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="'120'">
          <el-select v-model="form.pid" placeholder="请选择菜单" @change="changePid">
              <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 23 list遍历 -->
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>


        
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="'120'" >
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="'120'" v-if="form.type==1">
          <el-select v-model="form.icon" placeholder="请选择图标"  @change="changePid">
            <el-option :value="item" v-for="item in icon" :key="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" :label-width="'120'" v-else>
          <el-select v-model="form.url" placeholder="请选择菜单地址">
            <el-option
              :value="'/'+item.path"
              :label="item.name+'--/'+item.path"
              v-for="item in routes"
              :key="item.path"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqMenuAdd,reqMenuDetail,reqMenuUpdate } from "../../../utils/http";
import { routes } from "../../../router";
import { successAlert, errorAlert } from "../../../utils/alert";

export default {
  data() {
    return {
      form: {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1
      },
      routes,
      icon: [
        "el-icon-setting",
        "el-icon-user-solid",
        "el-icon-star-off",
        "el-icon-question",
        "el-icon-s-help",
        "el-icon-s-promotion"
      ]
    };
  },
  props: ["info","list"],
  mounted() {},
  methods: {
    add() {
      reqMenuAdd(this.form).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.info.isShow = false;
          this.form = {
            pid: "",
            title: "",
            icon: "",
            type: "",
            url: "",
            status: 1
          };
          this.$emit("resData")
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
  getOne(id){
        reqMenuDetail(id).then(res=>{
            //此时form上是没有id的
            this.form=res.data.list
            //补id
            this.form.id=id
        })
    },
     changePid() {
      // 如果上级菜单是 顶级菜单，那么 form.type=1;否则是2
      if (this.form.pid === 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },

       update(){
        reqMenuUpdate(this.form).then(res=>{
            if(res.data.code===200){
                //成功弹框
                successAlert("修改成功")
                //弹框消失
                this.cancel()
                //form重置
                this.empty()
                //列表刷新
                this.$emit("init")
            }else{
                errorAlert(res.data.msg)
            }

        })
    },

  },
 
};
</script>

<style>
</style>