// 基于准备好的dom，初始化echarts实例
var mapBoxEchart = echarts.init(document.getElementById('a4'));

/* var geoCoordMap = { //可以在地图上显示的城市的坐标信息
    "石家庄": [114.52, 38.05],
    "长春": [125.8154, 44.2584],
    "长沙": [113.0823, 28.2568],
    "贵阳": [106.6992, 26.7682],
    "杨凌": [109.1162, 34.2004],
    "深圳": [114.5435, 22.5439],
    "济南": [117.1582, 36.8701],
    "海口": [110.3893, 19.8516],
    "沈阳": [123.1238, 42.1216],
    "武汉": [114.3896, 30.6628],
    "红安": [114.23, 31.1],
    "昆明": [102.9199, 25.4663],
    "包头": [109.83, 40.63],
    "杭州": [119.5313, 29.8773],
    "成都": [103.9526, 30.7617],
    "拉萨": [91.1865, 30.1465],
    "天津": [117.4219, 39.4189],
    "合肥": [117.29, 32.0581],
    "呼和浩特": [111.4124, 40.4901],
    "哈尔滨": [127.9688, 45.368],
    "北京": [116.4551, 40.2539],
    "南京": [118.8062, 31.9208],
    "南宁": [108.479, 23.1152],
    "南昌": [116.0046, 28.6633],
    "乌鲁木齐": [87.9236, 43.5883],
    "上海": [121.4648, 31.2891],
    "三亚": [109.5000, 18.2000]
} */
var geoCoordMap;
axios.get("http://localhost:8080/areachain").then(function (res) {
    geoCoordMap = res.data.data;
    var HFData;
    axios.get("http://localhost:8080/migrate").then(function (res) {
        /* for(var i = 0; i < res.data.data.length; i++){
            HFData.push(res.data.data[i])
        } */
        HFData = res.data.data;
        /* var HFData = [ // 数据中name的城市名称必须与geoCoordMap中城市名称一致, 不然关联不上，武汉到各地区的线路
            [{ name: "武汉" }, { name: "武汉", value: 87 }],
            [{ name: "武汉" }, { name: "济南", value: 87 }],
            [{ name: "武汉" }, { name: "武汉", value: 101 }],
            [{ name: "武汉" }, { name: "包头", value: 101 }],
            [{ name: "武汉" }, { name: "武汉", value: 150 }],
            [{ name: "武汉" }, { name: "石家庄", value: 150 }],
            [{ name: "武汉" }, { name: "武汉", value: 120 }],
            [{ name: "武汉" }, { name: "哈尔滨", value: 120 }],
            [{ name: "武汉" }, { name: "武汉", value: 78 }],
            [{ name: "武汉" }, { name: "长春", value: 77 }],
            [{ name: "武汉" }, { name: "武汉", value: 89 }],
            [{ name: "武汉" }, { name: "天津", value: 89 }],
            [{ name: "武汉" }, { name: "武汉", value: 67 }],
            [{ name: "武汉" }, { name: "乌鲁木齐", value: 67 }],
            [{ name: "武汉" }, { name: "武汉", value: 45 }],
            [{ name: "武汉" }, { name: "拉萨", value: 45 }],
            [{ name: "武汉" }, { name: "武汉", value: 56 }],
            [{ name: "武汉" }, { name: "昆明", value: 56 }],
            [{ name: "武汉" }, { name: "武汉", value: 23 }],
            [{ name: "武汉" }, { name: "合肥", value: 23 }],
        ]; */
        var planePath = "arrow"; // 箭头的svg
        // push进去线路开始-结束地点-经纬度
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem[0].name];//出发地坐标获取
                var toCoord = geoCoordMap[dataItem[1].name];//目的地坐标获取
                if (fromCoord && toCoord) {
                    res.push({
                        fromName: dataItem[0].name,//出发地名称
                        toName: dataItem[1].name,//目的地名称
                        numValue: dataItem[1].value,//数值
                        coords: [fromCoord, toCoord]
                    });
                }
            }
            return res;
        };
        var max = 0;
        var len = HFData.length;
        for (var i = 0; i < len; i++) {
            if (HFData[i][1].value > max) {
                max = HFData[i][1].value;
            }
        }
        var avg = 0;
        avg = max / 3;
        //var color = ['#FFDF31']; //圆圈和字的颜色，线的颜色，箭头颜色
        var color1 = ['#157be8', '#FFE153', '#D87A80']; //蓝  黄  红
        // 数据
        var series = [];
        // 遍历由武汉到其他城市的线路
        [
            [HFData, '湖北省']
        ].forEach(function (item, i) {
            // 配置
            series.push({
                // 系列名称，用于tooltip的显示
                name: item[1],
                type: 'lines',
                zlevel: 1, // 用于 Canvas 分层，不同zlevel值的图形会放置在不同的 Canvas 中
                // effect出发到目的地 的白色尾巴线条
                // 线特效的配置
                effect: {
                    show: true,
                    period: 6, // 特效动画的时间，单位为 s
                    trailLength: 0.1, // 特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长
                    color: '#46bee9', // 移动箭头拖尾颜色
                    symbol: planePath,
                    symbolSize: 6 // 特效标记的大小
                },
                // lineStyle出发到目的地 的线条颜色
                lineStyle: {
                    normal: {
                        color: function (params) {
                            var num = params.data.numValue;
                            if (num > 0 && num <= avg) {
                                return color1[0];
                            } else if (num > avg && num <= 2 * avg) {
                                return color1[1];
                            } else if (num > 2 * avg && num <= 3 * avg) {
                                return color1[2];
                            }
                        },
                        width: function (params) {
                            var num = params.data.numValue;
                            if (num > 0 && num <= avg) {
                                return 1;
                            } else if (num > avg && num <= 2 * avg) {
                                return 20;
                            } else if (num > 2 * avg && num <= 3 * avg) {
                                return 40;
                            }
                        },
                        curveness: 0.2
                    }
                },
                data: convertData(item[0]) //开始到结束数据
            }, {
                //出发地信息
                name: '湖北省',
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: planePath,
                    symbolSize: 6
                },
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        lineStyle: {
                            type: 'solid',
                            shadowBlur: 10
                        }
                    }
                },
                lineStyle: {
                    normal: {
                        color: function (params) {
                            var num = params.data.numValue;
                            if (num > 0 && num <= avg) {
                                return color1[0];
                            } else if (num > avg && num <= 2 * avg) {
                                return color1[1];
                            } else if (num > 2 * avg && num <= 3 * avg) {
                                return color1[2];
                            }
                        },
                        width: 1.5,
                        opacity: 0.9,
                        curveness: 0.2
                    }
                },
                data: convertData(item[0])
            }, {
                // 目的地信息
                name: item[0],
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: false,//设置true的话就代表显示各个省的名字
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                /*symbolSize: function(val) {
                    return val[2]/ 8;
                },*/
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var str = params.value;
                            var num = str[2];
                            if (params.name == '湖北省') {
                                return '#F7F7F7';
                            } else {
                                if (num > 0 && num <= avg) {
                                    return color1[0];
                                } else if (num > avg && num <= 2 * avg) {
                                    return color1[1];
                                } else if (num > 2 * avg && num <= 3 * avg) {
                                    return color1[2];
                                }
                            }
                        }
                    }
                },
                data: item[0].map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            }
            );
        })
        // 指定相关的配置项和数据
        var option4 = {
            title: {
                text: '人口迁徒图',
                left: 'center',
                textStyle: {
                    fontSize: 15
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    if (params.value) {
                        return params.name + ":" + params.value[2]
                    }
                }
            },
            geo: {
                map: 'china',
                roam: false, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                aspectScale: 0.75,
                zoom: 1.20,
                label: {
                    normal: {
                        show: false,
                        textStyle: {
                            color: '#00a0c9'
                        }
                    },
                    emphasis: { // 对应的鼠标悬浮效果
                        show: false,
                        textStyle: {
                            color: "#00a0c9"
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#0B1C30',
                        borderColor: '#0066ba'
                    },
                    emphasis: {
                        borderWidth: 0,
                        borderColor: '#0066ba',
                        areaColor: "#0494e1",
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            series: series
        };

        // 使用制定的配置项和数据显示图表
        mapBoxEchart.setOption(option4);
        // echart图表自适应
        window.addEventListener("resize", function () {
            mapBoxEchart.resize();
        });

    })
    var chart5 = echarts.init(document.getElementById('a5'));
    var data_a5 = [];
    axios.get("http://localhost:8080/allconfirmed").then(function (res) {

        data_a5 = res.data.data;
        chart5.setOption({
            title: {
                text: '各个省市累计确诊人数',
                left: 'center',
                textStyle: {
                    fontSize: 15
                }
            },
            tooltip: {
                triggerOn: "mousemove",   //mousemove、click
                padding: 8,
                borderWidth: 1,
                borderColor: '#409eff',
                backgroundColor: 'rgba(255,255,255,0.7)',
                formatter: function (e, t, n) {
                    let data = e.data;
                    if (data) {
                        let context = `
                            <div>
                                <p>地区：<b style="font-size:15px;">${data.name}</b></p>
                                <p class="tooltip_style"><span class="tooltip_left">确诊人数</span><span class="tooltip_right">${data.value}</span></p>
                            </div>
                            `
                        return context;
                    }else{
                        let context = `
                            <div>
                                <p>当前无数据</p>
                            </div>
                            `
                        return context;
                    }

                }
            },
            visualMap: {
                show: true,
                top: 'center',
                bottom: 10,
                showLabel: true,
                pieces: [
                    {
                        gte: 1500,
                        label: ">= 1500",
                        color: "#2f0000"
                    },
                    {
                        gte: 1000,
                        lt: 1500,
                        label: "1000 - 1500",
                        color: "#750000"
                    },
                    {
                        gte: 800,
                        lt: 1000,
                        label: "800 - 1000",
                        color: "#ce0000"
                    },
                    {
                        gte: 500,
                        lt: 800,
                        label: "500 - 800",
                        color: "#ff2d2d"
                    },
                    {
                        gte: 100,
                        lt: 500,
                        label: "100 - 500",
                        color: "#ff7575"
                    },
                    {
                        lt: 100,
                        label: '<100',
                        color: "#ffb5b5"
                    }
                ]
            },
            geo: {
                map: "china",
                scaleLimit: {
                    min: 1,
                    max: 2
                },
                zoom: 1,
                top: 40,
                layoutSize: "100%", //保持地图宽高比
                label: {
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: "#F3F3F3"
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: "rgba(0, 0, 0, 0.2)",
                        areaColor: '#1955a4',
                    },
                    emphasis: {
                        areaColor: "#f2d5ad",
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        borderWidth: 0
                    }
                }
            },
            series: [
                {
                    name: "成果预览",
                    type: "map",
                    geoIndex: 0,
                    data: data_a5
                }
            ]
        });
    })
})