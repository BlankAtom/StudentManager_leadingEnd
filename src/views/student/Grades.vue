<template>
    <div>
      <div slot="header">成绩</div>
        <el-divider content-position="left"></el-divider>
        <el-table
                :data="tableData"
                height="250"
                border
                style="width: 100%">
            <el-table-column
                    prop="term"
                    label="学期">
            </el-table-column>
            <el-table-column
                    prop="cname"
                    label="课程">
            </el-table-column>
            <el-table-column
                    prop="tname"
                    label="教师">
            </el-table-column>
            <el-table-column
                    prop="grade"
                    label="成绩">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "Grades",
        data() {
            return {
                tableData: [
                    {  }
                ]
            }
        },
        beforeCreate() {

        },
        computed: {
        }
    }
</script>

<style scoped>

</style>