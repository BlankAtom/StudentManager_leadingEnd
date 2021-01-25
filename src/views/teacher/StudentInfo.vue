<template>
    <div>
        <h1 style="font-size: 2em; padding: 15px;">学生信息</h1>
        <el-divider content-position="left">班级选项会自动根据已存在信息筛选</el-divider>
        <el-row :gutter="24">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="3">
                <el-input placeholder="选择班级" v-model="search.classname">
                    <el-option
                        v-for="item in classes"
                        :key="item.classname"
                        :label="item.classname"
                        :value="item.classname"></el-option>
                </el-input>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="3">
                <el-input placeholder="搜索学号" v-model="search.sno"></el-input>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="3">
                <el-input placeholder="搜索姓名"  v-model="search.sname"></el-input>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="3" >
                <el-button type="primary" @click="toSearch">开始搜索</el-button>
                <el-button type="primary" @click="printFile">打印成绩</el-button>
            </el-col>

        </el-row>

        <el-table
                :data="filterData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                border
                style="width: 100%">
            <el-table-column
                    prop="class"
                    label="班级"
            >
            </el-table-column>
            <el-table-column
                    prop="sno"
                    label="学号">
            </el-table-column>
            <el-table-column
                    prop="sname"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="cname"
                    label="课程">
            </el-table-column>
<!--            <el-table-column-->
<!--                    prop="etype"-->
<!--                    label="考核类型">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                    prop="percent"-->
<!--                    label="占比">-->
<!--            </el-table-column>-->
            <el-table-column
                    prop="score"
                    label="成绩">
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.length">
        </el-pagination>
    </div>
</template>

<script>
    import {downloadXlsx} from '@/utils/xlsx'
    export default {
        name: "StudentInfo",
        data() {
            return {
                classes: [],
                filterData: [],
                tableData: [
                    {
                        sname: '',
                        sno: '',
                        class: '',
                        cname: '',
                        score: ''
                    },
                ],
                search: {
                    class: '',
                    sno: '',
                    sname: '',
                },
                dalen: 0,
                pageSize: 10,
                currentPage: 1,
            }
        },
        beforeMount() {
            this.toSearch();
            this.getClassList();
            this.filterData = this.tableData;
        },
        methods: {

            handleSizeChange(size) {
                this.pageSize = size
            },

            handleCurrentChange(page) {
                this.currentPage = page
            },
            searchResource() {
                this.currentPage = 1; //将当前页设置为1，确保每次都是从第一页开始搜
                let filerName = this.search.sname.trim()
                let filerReasource = this.tableData.filter(item => { //过滤全部数据
                    if (item.sname.includes(filerName)) {
                        return item
                    }
                })
                let filerClass = this.search.class.trim()
                filerReasource = filerReasource.filter(item => {
                    if( item.class.includes(filerClass))
                        return item
                })
                let filerSno = this.search.sno.trim()
                filerReasource = filerReasource.filter(item => {
                    if( item.sno.includes(filerSno))
                        return item
                })
                this.filterData = filerReasource; //将符合条件的内容赋给filterDataShow
            },
            printFile() {
                let datalist = [];
                datalist.push([
                    "班级",
                    "学号",
                    "姓名",
                    "课程",
                    "成绩",
                ]);
                this.tableData.forEach(item => {
                    datalist.push([
                        item.class,
                        item.sno,
                        item.sname,
                        item.cname,
                        item.score,
                    ]);
                });
                downloadXlsx(datalist, this.$store.state.username+"_学生成绩.xlsx")
            },
            toSearch(){
                this.$store.dispatch('getGradeInfo', {classname: this.search.classname, sno: this.search.sno, sname: this.search.sname})
                    .then(res => {
                        this.tableData = res.data;
                        console.log(res.data);
                        this.filterData = this.tableData
                 });
            },
            getClassList(){
                this.$store.dispatch('getClassList').then(res => {
                    this.classes = res.data;
                })
            },
            classChanged(){
            }
        }
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 10px;
    }
    .el-col {
        /*margin-bottom: 40px;*/
        border-radius: 4px;
        font-size: 1.1em;
    }
</style>