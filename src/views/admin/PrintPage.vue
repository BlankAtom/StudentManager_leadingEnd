<template>
    <div>
        <div slot="header">打印</div>
        <div align="center" style="padding: 5px">
            <el-row :gutter="10" style="padding: 20px">
                <el-col :span="10">
                    <el-button @click="printGrade">打印年级平均成绩</el-button>

                </el-col>
            </el-row>
            <el-row :gutter="20" style="padding: 20px">

                <el-col :span="10">
                    <el-input v-model="clsno" placeholder="班级号"></el-input>
                </el-col>
                <el-col :span="10">
                    <el-button @click="printClass">打印班级平均成绩</el-button>
                </el-col>

            </el-row>
        </div>

    </div>
</template>

<script>
import {downloadXlsx} from "@/utils/xlsx";

export default {
    name: "PrintPage",
    data() {
        return {
            clsno: "",
            data: [
                {
                    cname: '',
                    clsno: '',
                    average: '',
                    sum: '',
                    less: ''
                }
            ],
            dalen: 0,
        }

    },
    methods: {
        printClass() {
            if(this.clsno === ''){
                alert("请输入班级号")
            }
            else {
                this.$store.dispatch('printClassGrade',
                    { clsno: this.clsno} ).then(res => {
                    console.log(res.data);
                    this.data = res.data;
                    this.dalen = this.data.length
                    this.printFile();
                })
            }
        },
        printGrade() {
            console.log("312")
        },
        printFile() {
            let datalist = [];
            datalist.push([
                "班级",
                "课程",
                "平均分",
                "总人数",
                "不及格人数",
            ]);
            this.data.forEach(item => {
                datalist.push([
                    item.clsno,
                    item.cname,
                    item.average,
                    item.sum,
                    item.less,
                ]);
            });
            downloadXlsx(datalist, this.clsno+"_班级成绩.xlsx")
        },
    }
}
</script>

<style scoped>

</style>