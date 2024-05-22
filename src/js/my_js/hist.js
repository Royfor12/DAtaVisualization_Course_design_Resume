
// 画直方图
function Hist(width, height, where, path) {
    // var width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) * 0.98;
    // var height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) * 0.9;
    var color = d3.scaleOrdinal(d3.schemeCategory20);
    d3.json(path, function (error, data) {
        console.log(data);
        var dataset = new Array(data.length);
        console.log(dataset);
        for (let i = 0; i < data.length; i++) {
            dataset[i] = data[i][1] * 40;
        }
        console.log(dataset);
        var svg = d3.select(where)			//选择<body>
            .append("svg")			//在<body>中添加<svg>
            .attr("width", width)	//设定<svg>的宽度属性
            .attr("height", height);//设定<svg>的高度属性				
        //矩形所占的宽度（包括空白），单位为像素		
        var rectStep = width / dataset.length;
        //矩形所占的宽度（不包括空白），单位为像素
        var rectWidth = rectStep - 10;
        var rect = svg.selectAll("rect")
            .data(dataset)		//绑定数据
            .enter()			//获取enter部分
            .append("rect")	    //添加rect元素，使其与绑定数组的长度一致
            .attr("x", function (d, i) {		//设置矩形的x坐标
                return i * rectStep;
            })
            .attr("y", height)
            .attr("fill", function (i) {
                return color(i);
            })
            .attr("width", rectWidth)		//设置矩形的宽度
            .attr("height", 0)
            .on("mouseover", function (d, i) {
                d3.select(this)
                    .attr("fill", "#b700fbff");
            })
            .on("mouseout", function (d, i) {
                d3.selectAll("rect")
                    .attr("fill", function (d, i) {
                        return color(i);
                    });
            })
            .transition()
            .duration(2400)
            .ease(d3.easeElasticOut)
            .attr("height", function (d) {	//设置矩形的高度
                return d;
            })
            .attr("y", function (d) {		//设置矩形的y坐标
                return height - d;
            });
        var ttext = svg.append("text")
            .attr("transform", function (d) {
                var x = width / 2;
                var y = height - dataset[data.length - 2] - data[2][1] * 4.6;
                return "translate(" + x + "," + y + ")";
            })
            // .attr("text-anchor", "middle")
            // .attr("font-size", 20)
            // .text("专业课绩点分布情况")
            // .attr("stroke-width", 0.5)
            // .attr("stroke", "black");
        var ButtonText = svg.selectAll("ButtonText")
            .data(dataset)
            .enter()
            .append("text")
            .attr("transform", function (d, i) {
                var x = (i * rectStep) + rectStep / 2.3;
                var y = height - d * 1.02;
                return "translate(" + x + "," + y + ")";
            })
            .attr("text-anchor", "middle")
            .attr("font-size", 10)
            .text(function (d, i) {
                return data[i][0] + "：" + (data[i][1] / 17).toFixed(2) * 100 + "%";
            })
            .attr("stroke-width", 0.5)
            .attr("stroke", "black");
    })
}

