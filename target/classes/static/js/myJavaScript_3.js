/*export default {
    data() {
        return {
            data_a6: []
        }
    },
    // 请求数据

}*/
var data_a6=[]
var chartDom6 = document.getElementById('a6');
var myChart6 = echarts.init(chartDom6);
var option6;
axios.get("http://localhost:8080/news").then(function (res) {
    data_a6 = res.data.data
    option6 = {
        title: {
            text: '各媒体发布的新闻占比情况',
            left: 'center',
            textStyle: {
                fontSize: 15
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '10%',
            left: '75%'
        },
        series: [
            {
                name: '占比情况',
                type: 'pie',
                radius: ['30%', '80%'],
                avoidLabelOverlap: false,
                label: {
                    show: true,
                    position: 'inside',
                    formatter: '{d}%'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 20,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: data_a6[0].newsCount, name: data_a6[0].newsSource},
                    {value: data_a6[1].newsCount, name: data_a6[1].newsSource},
                    {value: data_a6[2].newsCount, name: data_a6[2].newsSource},
                    {value: data_a6[3].newsCount, name: data_a6[3].newsSource}
                ]
            }
        ]
    }
    option6 && myChart6.setOption(option6);
});

var data_a7 = []
var data_a7_1 = []
var chartDom7 = document.getElementById('a7');
var myChart7 = echarts.init(chartDom7);
var option7;
axios.get("http://localhost:8080/days").then(function (res) {

    for (var i = 0; i < res.data.data.length; i++) {
        data_a7_1.push(res.data.data[i].publishTime);
        data_a7_1.push(res.data.data[i].newsCount);
        data_a7_1.push(res.data.data[i].newsSource);
        data_a7.push(data_a7_1);
        data_a7_1=[];
    }

        // console.log(res.data.data)
        option7 = {
            title: {
                text: '各媒体每一天的新闻数量',
                left: 'center',
                textStyle: {
                    fontSize: 15
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: 'rgba(0,0,0,0.2)',
                        width: 1,
                        type: 'solid'
                    }
                }
            },
            legend: {
                top: 20,
                data: ['人民日报','央视网','新华社','国家卫健委']
                // ['DQ', 'TY', 'SS', 'QG', 'SY', 'DD']
            },
            singleAxis: {
                top: 50,
                bottom: 50,
                axisTick: {},
                axisLabel: {},
                type: 'time',
                axisPointer: {
                    animation: true,
                    label: {
                        show: true
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        opacity: 0.2
                    }
                }
            },
            series: [
                {
                    type: 'themeRiver',
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 20,
                            shadowColor: 'rgba(0, 0, 0, 0.8)'
                        }
                    },
                    data: data_a7
                }
            ]
        };

        option7 && myChart7.setOption(option7);
    }
)


var chartDom8 = document.getElementById('a8');
var myChart8 = echarts.init(chartDom8);
var data_a8=[];
var option8;
axios.get("http://localhost:8080/count").then(function (res) {
    data_a8=res.data.data;
    option8 = {
        title: {
            text: '所有新闻的关键字',
            left: 'center',
            textStyle: {
                fontSize: 15
            }
        },
        series: [{
            type: 'wordCloud',
            shape: 'circle', //circle cardioid diamond triangle-forward triangle
            left: 0,
            right: 0,
            top: 0,
            width: '100%',
            height: '100%',
            gridSize: 0, //值越大，word间的距离越大，单位像素
            sizeRange: [10, 32], //word的字体大小区间，单位像素
            rotationRange: [-90, 90], //word的可旋转角度区间
            textStyle: {
                normal: {
                    color: function () {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 2,
                    shadowColor: '#000'
                }
            },
            data: data_a8
        }],
        // backgroundColor: 'rgba(100, 255, 255, 0.6)'
    },
    option8 && myChart8.setOption(option8);
})
