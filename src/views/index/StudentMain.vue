<template>
<div>
<!--    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
<!--        <el-radio-button :label="false">展开</el-radio-button>-->
<!--        <el-radio-button :label="true">收起</el-radio-button>-->
<!--    </el-radio-group>-->
    <el-container>
      <div>
        <el-menu
            router
            default-active="1-2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse">

          <div id="sider-header">
            <span><i class="el-icon-s-home"></i></span>学生成绩管理系统
          </div>
          <el-menu-item index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span slot="title">首页</span>
            </template>
          </el-menu-item>
          <el-menu-item index="2">
            <template slot="title">
              <i class="el-icon-collection"></i>
              <span slot="title">成绩</span>
            </template>
          </el-menu-item>
          <el-menu-item index="3">
            <template slot="title">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">课程选修</span>
            </template>
          </el-menu-item>
        </el-menu>
      </div>

        <el-container>
            <el-header >
                <el-radio-group v-model="isCollapse" style="float: left;margin-bottom: 20px;">
                    <el-radio-button :label="true" >收起</el-radio-button>
                    <el-radio-button :label="false" >展开</el-radio-button>
                </el-radio-group>
                <el-dropdown style="margin-right: 15px; font-size: 25px" >

                    <span class="el-dropdown-link">
                        <span>{{username}}</span>
                        <i class="el-icon-setting"><span></span></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="toProfile" >个人信息</el-dropdown-item>
                        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>

    export default {
        name: "Main",
        props: ['username'],
        data(){
            return {
                isCollapse: false,
                screenHeight: ''
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                //console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                //console.log(key, keyPath);
            },
            toProfile(){
                this.$router.push("/student/self");
            },
            logout(){
                this.$router.push("/logout");
            }
        },
        beforeCreate() {
            let t = this.$store.state.power;
            if(t===2){
                this.$router.push('/teacher')
            }
            if( t===9){
                this.$router.push('/admin')
            }
        }

    }
</script>

<style scoped>
    .el-header{
        padding-top: 10px;
        text-align: right;
        font-size: 20px;
        background-color: #f0fcff;

    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 250px;
        min-height: 500px;
    }
    .el-dropdown-link{
        cursor: pointer;
    }

    #sider-header {
      /*height: px;*/
      padding-top: 40px;
      padding-bottom: 40px;
      text-align: center;
    }
</style>