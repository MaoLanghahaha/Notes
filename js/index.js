$(function () {
  /********************屏幕适配***start*************** */
  // * 默认缩放值
  var scale = {
    width: '1',
    height: '1',
  }

  // * 设计稿尺寸（px）
  var baseWidth = 1920
  var baseHeight = 1080

  // * 需保持的比例（默认1.77778）
  var baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5))

  var drawTiming = null

  function calcRate () {
    var appRef = $('#iesm-screen')[0]
    if (!appRef) return
    // 当前宽高比
    var currentRate = parseFloat((window.innerWidth / window.innerHeight).toFixed(5))
    if (appRef) {
      if (currentRate > baseProportion) {
        // 表示更宽
        scale.width = ((window.innerHeight * baseProportion) / baseWidth).toFixed(5)
        scale.height = (window.innerHeight / baseHeight).toFixed(5)
        appRef.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`
      } else {
        // 表示更高
        scale.height = ((window.innerWidth / baseProportion) / baseHeight).toFixed(5)
        scale.width = (window.innerWidth / baseWidth).toFixed(5)
        appRef.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`
      }
    }
  }

  calcRate()
  window.addEventListener('resize', calcRate)
  /********************屏幕适配***end*************** */


  /********************业务功能***start*************** */

  // 故障统计
  var faultStatisticsLineOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line' // 默认为直线，可选为：'line' | 'shadow'
      },
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderWidth: 0,
      textStyle: {
        fontSize: 14,
        color: '#fff',
        //fontFamily: '思源黑体CNMedium',
      },
      formatter: function (e) {
        console.log(e);
        const str =
          e[0].axisValue +
          '<br>' +
          "<span style='display:inline-block;border-radius:50%;width:10px;height:10px;background-color:" +
          e[0].color +
          ";'></span>" +
          '&nbsp;&nbsp;' +
          e[0].seriesName +
          ' :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
          e[0].value +
          `&nbsp;部<br>`
        return str
      }
    },
    grid: {
      left: '2%',
      right: '4%',
      bottom: '4%',
      top: '16%',
      containLabel: true
    },
    legend: {
      itemGap: 30,
      textStyle: {
        color: "#000",
        fontSize: 13,
        //fontFamily: '思源黑体CNMedium',
      }
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      axisLine: {
        show: true,
        lineStyle: {
          color: '#000'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        // interval: 0,
        // rotate: 40,
        textStyle: {
          //fontFamily: '思源黑体CNMedium',
          color: '#000',
          fontWeight: 'normal',
          fontSize: 12
        },
        interval: 0, // 标签设置为全部显示
        margin: 10
      }
    },

    yAxis: [
      {
        type: 'value',
        splitNumber: 4,
        axisLine: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            opacity: 0.5
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#000',
            fontSize: 12,
            //fontFamily: '思源黑体CNMedium',
          },
          margin: 10
        }
      }
    ],
    series: [
      {
        name: '电梯故障数',
        type: 'line',
        itemStyle: {
          color: "rgb(0, 77, 229)"
        },
        smooth: true,
        showSymbol: false,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(0, 77, 229, 0.5)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(0, 77, 229, 0)' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        },
        data: [26127, 34513, 47396, 47848, 65555, 37267]
      }
    ]
  }

  // 地图分布
  var mapDistributionMapdata = [
    { name: "浦东新区", value: 655 },
    { name: "嘉定区", value: 69 },
    { name: "奉贤区", value: 337 },
    { name: "虹口区", value: 25 },
    { name: "静安区", value: 44 },
    { name: "崇明区", value: 447 },
    { name: "青浦区", value: 109 },
    { name: "金山区", value: 92 },
    { name: "黄浦区", value: 12 },
    { name: "徐汇区", value: 7 },
    { name: "长宁区", value: 9 },
    { name: "普陀区", value: 16 },
    { name: "杨浦区", value: 12 },
    { name: "宝山区", value: 174 },
    { name: "闵行区", value: 1171 },
    { name: "松江区", value: 443 },

  ];

  var gradientColor = function (startRGB, endRGB, step) {
    var startR = startRGB[0];
    var startG = startRGB[1];
    var startB = startRGB[2];

    var endR = endRGB[0];
    var endG = endRGB[1];
    var endB = endRGB[2];

    var sR = (endR - startR) / step;//总差值
    var sG = (endG - startG) / step;
    var sB = (endB - startB) / step;

    var colorArr = [];
    for (var i = 0; i < step; i++) {
      colorArr.push('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')');
    }
    return colorArr;
  };
  var mapColorList = gradientColor([0, 110, 221], [165, 211, 244], 16);

  var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = shanghaiCenter[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value),
          itemStyle: {
            normal: {
              areaColor: mapColorList[i]
            }
          }
        });
      }
    }
    return res;
  };

  var mapConvertData = convertData(mapDistributionMapdata)

  var mapDistributionMapOption = {
    backgroundColor: 'transparent',
    tooltip: {
      show: true,
      formatter: function (params) {
        console.log(params);
        return "<span style='display:inline-block;border-radius:50%;width:10px;height:10px;background-color:" +
          params.data.itemStyle.areaColor +
          ";'></span>&nbsp;&nbsp;" + params.data.name + "：" + params.data.value[2] + ' 部';
      },
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderWidth: 0,
      textStyle: {
        fontSize: 14,
        color: '#fff',
        //fontFamily: '思源黑体CNMedium',
      }
    },
    grid: {
      x: '50%'
    },
    geo: [
      {
        map: "js",
        roam: false, //是否允许缩放
        zoom: 1.1, //默认显示级别
        scaleLimit: {
          min: 0,
          max: 3,
        }, //缩放级别
        itemStyle: {
          normal: {
            // areaColor: "#013C62",
            shadowColor: "#013C62",
            shadowBlur: 15,
            shadowOffsetX: -5,
            shadowOffsetY: 10,
          },
        }

      },
    ],
    series: [
      {
        type: "map",
        mapType: "js",
        zoom: 1.1, //默认显示级别
        label: {
          show: true,
          color: "#fff",
          emphasis: {
            color: "#fff",
          },
        },
        itemStyle: {
          normal: {
            borderColor: "#2980b9",
            borderWidth: 1,
          },
          emphasis: {
            borderWidth: 0,
            areaColor: "#004de5",
          },
        },
        data: mapConvertData,
      },
    ]
  };

  // 故障分析
  var pieColorList = [
    "#004DE5",
    "#515466",
    "#696C80",
    "#828699",
    "#9A9EB2",
    "#BABDCC",
    "#D8DAE5",
    "#EBECF2"
  ];
  var faultTypeList = ["安全触板、光幕动作超时", "关门到位门锁不通", "换站停靠失败", "安全回路断开", "电梯系统断电", "IO板电源故障", "轿厢通讯故障", "有运行信号，无硬件使能信号"];
  var faultTypeVlaueList = [2176, 1420, 328, 36, 436, 556, 310, 157];
  var faultnalysisData = [];
  for (var i = 0; i < faultTypeList.length; i++) {
    faultnalysisData.push({
      name: faultTypeList[i],
      value: faultTypeVlaueList[i],
      color: pieColorList[i]
    });
  }
  console.log(faultnalysisData);

  var faultAnalysisPieOption = {
    title: {
      text: "5419",
      subtext: "总计",
      left: "center",
      top: "40%",
      itemGap: 2.5,
      textStyle: {
        fontSize: 18
      },
      subtextStyle: {
        fontSize: 12
      }
    },
    series: [
      {
        itemStyle: {
          normal: {
            color: function (params) {
              return pieColorList[params.dataIndex];
            },
            borderWidth: 2,
            shadowBlur: 10,
            borderColor: 'rgba(198, 224, 253,1)',
            shadowColor: 'rgba(255,255,255,1)',
          },
        },
        type: "pie",
        radius: ["50%", "60%"],
        center: ["50%", "50%"],
        labelLine: {
          normal: {
            lineStyle: {
              color: "#34569D",
            },
          },
        },
        label: {
          normal: {
            show: false,
          },
        },
        data: faultnalysisData,
      },
      {
        itemStyle: {
          normal: {
            color: "rgba(255,255,255,0.1)",
          },
        },
        type: "pie",
        hoverAnimation: false,
        radius: ["45%", "65%"],
        center: ["50%", "50%"],
        label: {
          normal: {
            show: false,
          },
        },
        data: [
          {
            value: 1,
          },
        ],
        z: -1,
      },
    ],
  };

  // 全国地图
  var chinaData = [
    { name: "北京", value: 199 },
    { name: "天津", value: 42 },
    { name: "河北", value: 102 },
    { name: "山西", value: 81 },
    { name: "内蒙古", value: 47 },
    { name: "辽宁", value: 67 },
    { name: "吉林", value: 82 },
    { name: "黑龙江", value: 123 },
    { name: "上海", value: 24 },
    { name: "江苏", value: 92 },
    { name: "浙江", value: 114 },
    { name: "安徽", value: 109 },
    { name: "福建", value: 116 },
    { name: "江西", value: 91 },
    { name: "山东", value: 119 },
    { name: "河南", value: 137 },
    { name: "湖北", value: 116 },
    { name: "湖南", value: 114 },
    { name: "重庆", value: 91 },
    { name: "四川", value: 125 },
    { name: "贵州", value: 62 },
    { name: "云南", value: 83 },
    { name: "西藏", value: 9 },
    { name: "陕西", value: 80 },
    { name: "甘肃", value: 56 },
    { name: "青海", value: 10 },
    { name: "宁夏", value: 18 },
    { name: "新疆", value: 180 },
    { name: "广东", value: 123 },
    { name: "广西", value: 59 },
    { name: "海南", value: 14 },
  ];

  var chinaMapConvertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var geoCoord = chinaCenter[data[i].name];
      if (geoCoord) {
        res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value),
        });
      }
    }
    return res;
  };

  var chinaMapOption = {
    // tooltip: {
    //   trigger: "item",
    //   formatter: function (params) {
    //     if (typeof params.value[2] == "undefined") {
    //       return params.name + " : " + params.value;
    //     } else {
    //       return params.name + " : " + params.value[2];
    //     }
    //   },
    // },
    legend: {
      orient: "vertical",
      y: "bottom",
      x: "right",
      data: ["pm2.5"],
      textStyle: {
        color: "#fff",
      },
    },
    visualMap: {
      show: false,
      min: 0,
      max: 500,
      left: "left",
      top: "bottom",
      text: ["高", "低"], // 文本，默认为数值文本
      calculable: true,
      seriesIndex: [1],
      inRange: {},
    },
    geo: {
      map: "china",
      show: true,
      roam: false,
      label: {
        normal: {
          show: true,
          textStyle: {
              color: "#fff",
            },
        },
        emphasis: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
      },
      itemStyle: {
        normal: {
          areaColor: "#3A7FD5",
          borderColor: "#0a53e9", //线
          shadowColor: "#092f8f", //外发光
          shadowBlur: 20,
        },
        emphasis: {
          areaColor: "#004DE5", //悬浮区背景
        },
      },
    },
    series: [
      {
        type: "map",
        mapType: "china",
        geoIndex: 0,
        aspectScale: 0.75, //长宽比
        showLegendSymbol: false, // 存在legend时显示
        label: {
          normal: {
            show: true,
            textStyle: {
              color: "#fff",
            },
          },
          emphasis: {
            show: true,
            textStyle: {
              color: "#fff",
            },
          },
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: "#3A7FD5",
            borderColor: "#FFFFFF",
          },
          emphasis: {
            areaColor: "#004DE5",
          },
        },
        animation: false,
        data: chinaData,
      },
      // {
      //   name: "Top 5",
      //   type: "scatter",
      //   coordinateSystem: "geo",
      //   symbol: "pin",
      //   symbolSize: [50, 50],
      //   label: {
      //     normal: {
      //       show: true,
      //       textStyle: {
      //         color: "#fff",
      //         fontSize: 9,
      //       },
      //       formatter (value) {
      //         return value.data.value[2];
      //       },
      //     },
      //   },
      //   itemStyle: {
      //     normal: {
      //       color: "#D8BC37", //标志颜色
      //     },
      //   },
      //   data: chinaMapConvertData(chinaData),
      //   showEffectOn: "render",
      //   rippleEffect: {
      //     brushType: "stroke",
      //   },
      //   hoverAnimation: true,
      //   zlevel: 1,
      // },
    ],
  };



  var faultStatisticsChart = echarts.init($('#fault-statistics-chart')[0])
  faultStatisticsChart.setOption(faultStatisticsLineOption)

  var faultAnalysisChart = echarts.init($('#fault-analysis-chart')[0])
  faultAnalysisChart.setOption(faultAnalysisPieOption)
  faultnalysisData.forEach(function (item) {
    $('.fault-analysis-legend').append(`<div class="fault-analysis-legend-item"><span class="legend-icon" style="background-color:${item.color};"></span><span class="legend-label">${item.name} (${item.value})</span></div>`)
  })

  echarts.registerMap("js", shanghaiMapJson);
  var mapDistributionChart = echarts.init($('#map-distribution-chart')[0])
  mapDistributionChart.setOption(mapDistributionMapOption)
  mapConvertData.forEach(function (item) {
    $('.map-chart-legend').append(`<div class="map-chart-legend-item"><span class="legend-icon" style="background-color:${item.itemStyle.normal.areaColor};"></span><span class="legend-label">${item.name} (${item.value[2]})</span></div>`)
  })

  echarts.registerMap("china", chinaMapJson);
  var chinaChart = echarts.init($('#china-map-chart')[0])
  chinaChart.setOption(chinaMapOption)
  /********************业务功能***end*************** */
})