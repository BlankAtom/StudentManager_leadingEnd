<template>
  <div id="page-box">
    <el-container>
      <el-aside  id="left-aside">
        <el-menu
            router
            default-active="1-2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse">

          <div id="sider-header" @click="changeCollapse(!isCollapse)" >
            <i class="el-icon-s-home"></i>
            <span v-if="!isCollapse">学生成绩管理系统</span>
          </div>
          <el-menu-item-group>
            <el-menu-item index="/student/self">
                <i class="el-icon-user-solid"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/student/grades">
                <i class="el-icon-collection"></i>
                <span slot="title">成绩</span>
            </el-menu-item>
            <el-menu-item index="/student/sc">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">课程选修</span>
            </el-menu-item>
          </el-menu-item-group>

        </el-menu>
      </el-aside>

      <el-container>
        <el-header >
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
                screenHeight: '',
            }
        },
      mounted() {
        this.changeCollapse(false)
        this.showInfo()
      },
      methods: {
          changeCollapse(colla){
            const aside = document.getElementById("left-aside");
            this.isCollapse = colla;

            if (!colla) {
              aside.style.width = "210px"
            }
            else {
              aside.style.width = "80px"
            }
          },
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
            },
            showInfo() {
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
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
  min-height: 100%;
  margin: 0;
}
    #page-box,.el-container {
      height: 100%;
      margin: 0;
    }
  .el-menu{
    height: 100%;
  }
    .el-aside {
      text-align: center;
      line-height: 200px;
      color: white;
      margin: 0;
      /*height: 100%;*/
      /*position: relative;*/
    }
    .el-menu-item {
      color: white;
      font-size: 12pt;
    }
    .el-header{
        padding: 10px;
        text-align: right;
        font-size: 20px;
      color: white;

    }
    .el-dropdown-link{
        cursor: pointer;
    }
    #sider-header {
      text-align: center;
    }
</style>