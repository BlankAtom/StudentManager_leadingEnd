<template>
    <div>
        <div slot="header" style="padding: 10px;">首页</div>
        <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <el-card>
                    <div slot="header">个人信息</div>
                    <div id="self-info">
                        <div>
                            工号：
                            <span v-if="info.tno">{{info.tno}}</span>
                        </div>
                        <div>
                            姓名：
                            <span v-if="info.name">{{info.name}}</span>
                        </div>
                        <div>
                            职称：
                            <span v-if="info.level">{{info.level}}</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Profile",
        data() {
            return {
                nodeEnv: process.env.NODE_ENV,
                info: {
                    tno: '',
                    name: '',
                    level: ''
                },
            }
        },
        mounted() {
            this.getInfo()
        },
        getInfo() {
            // console.log("do it")
            this.$store.dispatch("getTeaProfile").then(res => {
                // res = JSON.stringify(res)
                console.log(res)
                this.info = res.data.info
            }).catch(res => {
                console.log(res)
            })
        }
    }
</script>

<style scoped>

.more-container .el-card {
    margin-top: 10px;
}
#self-info {
    height: 150px;
    padding: 8px;
    font-size: 14pt;
}
#these-term-grade {
    height: 200px;
    padding: 5px;
    font-size: 12pt;
}
</style>