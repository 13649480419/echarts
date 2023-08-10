// 仪表盘图
var chartDom = document.getElementById('a1');
var myChart = echarts.init(chartDom);
var option;
var data_a1;
axios.get("http://localhost:8080/dead").then(function (res) {
    data_a1 = res.data.data
    option = {
        title: {
            text: '国内新冠疫情死亡率',
            left: 'center',
            textStyle: {
                fontSize: 15
            }
        },
        series: [
            {
                max: 10,
                min: 0,
                type: 'gauge',
                axisLine: {
                    lineStyle: {
                        width: 20,
                        color: [
                            [0.2, '#91c7ae'],
                            [0.8, '#63869e'],
                            [1, '#c23531']
                        ]
                    }
                },
                radius: '80%',
                pointer: {
                    itemStyle: {
                        color: 'inherit'
                    }
                },
                axisTick: {
                    distance: -20,
                    length: 8,
                    lineStyle: {
                        color: '#fff',
                        width: 1
                    }
                },
                splitLine: {
                    distance: -20,
                    length: 20,
                    lineStyle: {
                        color: '#fff',
                        width: 1
                    }
                },
                axisLabel: {
                    color: 'inherit',
                    distance: 25,
                    fontSize: 8
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value} %',
                    color: 'inherit',
                    fontSize: 30
                },
                data: [
                    {
                        value: data_a1
                    }
                ]
            }
        ]
    };
    option && myChart.setOption(option);
})



//折线图
var chartDom2 = document.getElementById('a2');
var myChart2 = echarts.init(chartDom2);
var date_a2_date = [];
var date_a2_count = [];
var option2;
axios.get("http://localhost:8080/add").then(function (res) {

    for (var i = 0; i < res.data.data.length; i++) {
        date_a2_date.push(res.data.data[i].updateTime.substring(8));
        date_a2_count.push(res.data.data[i].addCount)
    }
    option2 = {
        title: {
            text: '全国每日新增的确诊人数（二月份）',
            left: 'center',
            textStyle: {
                fontSize: 15
            }
        },
        xAxis: {
            type: 'category',
            data: date_a2_date
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: date_a2_count,
                type: 'line',
                color: 'red'
            }
        ]
    }
    option2 && myChart2.setOption(option2);
})

//散点图
var chartDom3 = document.getElementById('a3');
var myChart3 = echarts.init(chartDom3);
var option3;
var data_a3
axios.get("http://localhost:8080/confirmed").then(function (res) {
    data_a3 = res.data.data;
    option3 = {
        title: {
            text: '各省市从湖北迁入的人口比例与该省累计确诊人数的关系',
            left: 'center',
            textStyle: {
                fontSize: 15
            }
        },
        xAxis: {},
        yAxis: {},
        series: [
            {
                symbolSize: 7,
                data: data_a3,
                type: 'scatter',
                color: 'red'
            }
        ]
    }
    option3 && myChart3.setOption(option3);
})
