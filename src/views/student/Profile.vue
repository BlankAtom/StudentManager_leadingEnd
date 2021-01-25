<template>
  <div class="more-container">
    <div slot="header" style="padding: 10px;">首页</div>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card id="chart-card">
          <div slot="header">各学期平均成绩</div>
          <div>
            <div id="main-charts"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card>
          <div slot="header">个人信息</div>
          <div id="self-info">
            <div>
              学号：
              <span v-if="info.sno">{{info.sno}}</span>
            </div>
            <div>
              姓名：
              <span v-if="info.name">{{info.name}}</span>
            </div>
            <div>
              班级：
              <span v-if="info.class">{{info.class}}</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card>
          <div slot="header">各科成绩</div>
          <div id="these-term-grade">
            <ul id="near-grade-list">
              <li v-for="(item, index) in near_grade" :key="index">
                {{ item.course }}: {{ item.score }}
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
    export default {
        props: ['id', 'name'],
        name: "UserProfile",
        beforeRouteEnter: (to, from, next) => {
            next();
        },
        beforeMount() {
        },
        data() {
            return {
                nodeEnv: process.env.NODE_ENV,
                avgData: {
                    "20181": 10,
                    "20182": 52,
                    "20191": 20,
                    "20192": 33,
                    "20201": 39,
                    "20202": 33,
                    "20211": 22,
                    "20212": 90
                },
                term_grade: [10, 52, 20, 33, 39, 33, 22, 90],
                near_grade: [
                    {course: 'math', score: 90},
                    {course: 'physic', score: 88},
                ],
                info: {
                    sno: '',
                    name: '',
                    class: ''
                },

            }
        },
        created() {
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
                        trigger: 'axis',
                        position: 'top',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985',
                            },
                        },
                    },
                    xAxis: [
                        {
                            type: 'category',
                            /*boundaryGap: false,*/
                            //坐标轴两边留白策略，即x轴坐标点开始与结束点位置都不在最边缘
                            // boundaryGap: true,
                            axisLine: {
                                show: false,
                                //x轴线样式
                                lineStyle: {
                                    color: '#17273B',
                                    width: 1,
                                    type: 'solid',
                                },
                            },
                            //x轴字体设置
                            axisLabel: {
                                show: true,
                                fontSize: 12,
                                color: 'black',
                            },
                            data: [
                                '20181',
                                '20182',
                                '20191',
                                '20192',
                                '20201',
                                '20202',
                                '20211',
                                '20212',
                            ],
                            axisTick: {
                                alignWithLabel: true,
                            },
                        },
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            //y轴字体设置
                            axisLabel: {
                                show: true,
                                color: 'black',
                                fontSize: 12,
                            },
                            //y轴线设置不显示
                            axisLine: {
                                show: false,
                            },
                            //与x轴平行的线样式
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#17273B',
                                    width: 1,
                                    type: 'solid',
                                },
                            },
                        },
                    ],
                    series: [
                        {
                            name: '成绩',
                            type: 'line',
                            smooth: true,
                            symbol: 'circle',
                            symbolSize: 6,
                            lineStyle: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            // 0% 处的颜色
                                            offset: 0,
                                            color: '#6ae6dd',
                                        },
                                        {
                                            offset: 1,
                                            // 100% 的颜色
                                            color: 'gray',
                                        },
                                    ],
                                    globalCoord: false,
                                },
                                width: 2,
                                type: 'solid',
                            },
                            // 折线连接点的颜色
                            itemStyle: {
                                // width: 310,
                                color: '#00e5de',
                            },
                            // 折线堆积区的颜色
                            // areaStyle: {
                            //   // color: '#004c5e'
                            // },
                            barWidth: '60%',
                            data: this.term_grade,
                        },
                    ],
                }
                // 绘制图表
                myChart.setOption(all_average_grade)
            },
            initTheseGrade() {
                this.term_grade[0] = this.avgData[20181];
                this.term_grade[1] = this.avgData[20182];
                this.term_grade[2] = this.avgData[20191];
                this.term_grade[3] = this.avgData[20182];
                this.term_grade[4] = this.avgData[20201];
                this.term_grade[5] = this.avgData[20202];
                this.term_grade[6] = this.avgData[20211];
                this.term_grade[7] = this.avgData[20212];
            },
            getInfo() {
                // console.log("do it")
                this.$store.dispatch("getStudentInfo").then(res => {
                    // res = JSON.stringify(res)
                    console.log(res)
                    this.avgData = res.data.avg
                    this.info = res.data.info
                    this.near_grade = res.data.grade

                    this.drawLine()
                    console.log(this.avgData)

                }).catch(res => {
                    console.log(res)
                })
            }
        }
    }
</script>

<!--<style scoped>-->
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