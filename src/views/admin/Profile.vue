<template>
    <div>
        <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-card id="chart-card">
                    <div slot="header">各学期平均成绩</div>
                    <div>
                        <div id="main-charts"></div>
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
            avgData: {
                "2018": 10,
                "2019": 33,
                "2020": 39,
                "2021": 10
            },
            term_grade: [10, 52, 20, 33],

        }
    },
    mounted() {
        this.drawLine()
        this.getInfo()
    },
    methods: {
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            const myChart = this.$echarts.init(
                document.getElementById('main-charts')
            )
            // var temp_avg
            // var t = this
            // .near_grade[0].
            this.initTheseGrade()
            const all_average_grade = {
                grid: {
                    left: '4%',
                    right: '6%',
                    bottom: '4%',
                    top: 80,
                    containLabel: true,
                },
                tooltip: {
                },
                xAxis:
                    {
                        data: [
                            '2018',
                            '2019',
                            '2020',
                            '2021',
                        ],
                    },

                yAxis:
                    {},
                series: [
                    {
                        name: '成绩',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.term_grade,
                    },
                ],
            }
            // 绘制图表
            myChart.setOption(all_average_grade)
        },
        initTheseGrade() {
            this.term_grade[0] = this.avgData[2018];
            this.term_grade[1] = this.avgData[2019];
            this.term_grade[2] = this.avgData[2020];
            this.term_grade[3] = this.avgData[2021];
        },
        getInfo() {
            // console.log("do it")
            this.$store.dispatch("getAverageGrade").then(res => {
                // res = JSON.stringify(res)
                console.log(res)
                this.avgData = res.data
                this.drawLine()

            }).catch(res => {
                console.log(res)
            })
        }
    }
}
</script>

<style scoped>


.more-container .el-card {
    margin-top: 10px;
}
#main-charts {
    width: 100%;
    height: 400px;
}
#chart-card {
    width: 100%;
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