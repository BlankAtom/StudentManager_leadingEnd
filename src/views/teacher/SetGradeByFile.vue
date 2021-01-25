<template>
    <div>

        <div>
            <div slot="header">成绩</div>
            <el-divider content-position="left"></el-divider>
            <el-upload
                class="upload-demo" action=""
                :on-change="handleChange"
                :on-remove="handleRemove"
                :on-exceed="handleExceed"
                :limit="limitUpload"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                :auto-upload="false">
                <el-button  class="el-icon-upload" size="small" type="primary">点击上传</el-button>

            </el-upload>
            <el-button class="el-icon-success" size="small"
                       type="primary"   @click="onSubmit">确定上传</el-button>
            <el-table
                :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                border
                style="width: 100%">
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
                <el-table-column
                    prop="tname"
                    label="教师">
                </el-table-column>
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
    </div>
</template>

<script>
export default {
    name: "SetGradeByFile",
    data() {
        return {
            tableData: [
                {}
            ],
            dalen: 0,
            pageSize: 10,
            currentPage: 1,
            limitUpload: 1,
            file: null,
            fileTemp: null,
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
            this.$store.dispatch('setGrades', this.tableData ).then(res => {
                console.log(res.data);
            }).catch();

        },
        importfxx(obj) {
            let _this = this;
            let inputDOM = this.$refs.inputer;
            // 通过DOM取文件数据

            this.file = event.currentTarget.files[0];

            var rABS = false; //是否将文件读取为二进制字符串
            var f = this.file;

            var reader = new FileReader();
            //if (!FileReader.prototype.readAsBinaryString) {
            FileReader.prototype.readAsBinaryString = function(f) {
                var binary = "";
                var rABS = false; //是否将文件读取为二进制字符串
                var pt = this;
                var wb; //读取完成的数据
                var outdata;
                var reader = new FileReader();
                reader.onload = function(e) {
                    var bytes = new Uint8Array(reader.result);
                    var length = bytes.byteLength;
                    for (var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    //此处引入，用于解析excel
                    var XLSX = require("xlsx");
                    if (rABS) {
                        wb = XLSX.read(btoa(binary), {
                            //手动转化
                            type: "base64"
                        });
                    } else {
                        wb = XLSX.read(binary, {
                            type: "binary"
                        });
                    }
                    outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                    //outdata就是读取的数据（不包含标题行即表头，表头会作为对象的下标）
                    //此处可对数据进行处理
                    let arr = [];
                    outdata.map(v => {
                        let obj = {}
                        obj.sno = v['sno']
                        obj.sname = v['sname']
                        obj.cname = v['cname']
                        obj.tname = v['tname']
                        obj.score = v['score']
                        arr.push(obj)
                    });
                    _this.tableData = arr;
                    _this.dalen = arr.length;
                    return arr;
                };
                reader.readAsArrayBuffer(f);
            };
            if (rABS) {
                reader.readAsArrayBuffer(f);
            } else {
                reader.readAsBinaryString(f);
            }
        },
        //上传文件时处理方法
        handleChange(file, fileList){
            this.fileTemp = file.raw;
            if(this.fileTemp){
                if((this.fileTemp.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                    || (this.fileTemp.type === 'application/vnd.ms-excel')){
                    this.importfxx(this.fileTemp);
                } else {
                    this.$message({
                        type:'warning',
                        message:'附件格式错误，请删除后重新上传！'
                    })
                }
            } else {
                this.$message({
                    type:'warning',
                    message:'请上传附件！'
                })
            }
        },
        //超出最大上传文件数量时的处理方法
        handleExceed(){
            this.$message({
                type:'warning',
                message:'超出最大上传文件数量的限制！'
            })

        },
        //移除文件的操作方法
        handleRemove(file,fileList){
            this.fileTemp = null
        },

        handleSizeChange(size) {
            this.pageSize = size
        },

        handleCurrentChange(page) {
            this.currentPage = page
        }
    }
}
</script>

<style scoped>

</style>