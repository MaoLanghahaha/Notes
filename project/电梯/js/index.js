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
          `&nbsp;度<br>`
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
        interval: 0 // 标签设置为全部显示
      }
    },

    yAxis: [
      {
        type: 'value',
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
          }
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
        data: [1, 2, 3, 7, 5, 6, 15, 8, 9, 10, 11, 12]
      }
    ]
  }

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
      colorArr.push( 'rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')');
    }
    return colorArr;
  };
  var colorList = gradientColor([0, 110, 221], [165, 211, 244], 16);

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
              areaColor: colorList[i]
            }
          }
        });
      }
    }
    return res;
  };

  var mapConvertData = convertData(mapDistributionMapdata)

  var mapDistributionMapoption = {
    backgroundColor: 'transparent',
    tooltip: {
      show: true,
      formatter: function (params) {
        console.log(params);
        return   "<span style='display:inline-block;border-radius:50%;width:10px;height:10px;background-color:" +
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
    grid:{
      x:'50%'
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

  var faultStatisticsChart = echarts.init($('#fault-statistics-chart')[0])
  faultStatisticsChart.setOption(faultStatisticsLineOption)

  echarts.registerMap("js", shanghaiMapJson);
  var mapDistributionChart = echarts.init($('#map-distribution-chart')[0])
  mapDistributionChart.setOption(mapDistributionMapoption)
  mapConvertData.forEach(function (item) {
    console.log(item);
    $('.map-chart-legend').append(`<div class="map-chart-legend-item"><span class="legend-icon" style="background-color:${item.itemStyle.normal.areaColor};"></span><span class="legend-label">${item.name} (${item.value[2]})</span></div>`)
  })
  /********************业务功能***end*************** */
})