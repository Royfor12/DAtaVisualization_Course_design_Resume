// 画饼(包含文字)
function Pie2(w, h, name, outerRadius) {
    var width = w * 0.98;
    var height = h * 0.96;
    d3.json("src/json/pie.json", function (error, data) {
        var dataset = data;
        // 自学则:初始值11,课程学习过则:初始值+11,应用过课程实践则:初始值+11+11;
        // 内环声明
        var svg = d3.select(name)
            .append("svg")
            .attr("width", width)
            .attr("height", height);
        var pie = d3.pie()
            .value(function (d) { return d[1]; });
        var piedata = pie(dataset);
        // var outerRadius = 200;	//外半径
        var innerRadius = 0;	//内半径，为0则中间没有空白
        var arc = d3.arc()	//弧生成器
            /*---------内半径形成圆环--------*/
            .innerRadius(innerRadius)	//设置内半径
            /*---------内半径形成圆环--------*/
            .outerRadius(outerRadius);	//设置外半径
        var color = d3.scaleOrdinal(d3.schemeCategory20);
        var arcs = svg.selectAll("g")
            .data(piedata)
            .enter()
            .append("g")
            .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
        arcs.append("path")//每个g元素都追加一个path元素用绑定到这个g的数据d生成路径信息
            .attr("fill", function (d, i) {
                return color(i);
            })
            .attr("d", function (d) {
                return arc(d);//将角度转为弧度（d3使用弧度绘制）
            })
            .on("mouseover", function (d, i) {
                d3.select(this)
                    .attr("fill", "#b700fbff");
            })
            .on("mouseout", function (d, i) {
                svg.selectAll('path')
                    .attr("fill", function (d, i) {
                        return color(i);
                    });
            });

        // 外圆环声明
        var svg_outer = d3.select("g_outer")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
        var arc_outer = d3.arc()	//弧生成器
            .innerRadius(outerRadius + 20)	//设置内半径
            .outerRadius(outerRadius + 50);	//设置外半径
        var arcs_outer = svg.selectAll("g_outer")
            .data(piedata)
            .enter()
            .append("g")
            .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
        arcs_outer.append("path")//每个g元素都追加一个path元素用绑定到这个g的数据d生成路径信息
            .attr("fill", function (d, i) {
                return color(i);
            })
            .attr("d", function (d) {
                return arc_outer(d);//将角度转为弧度（d3使用弧度绘制）
            })
            .on("mouseover", function (d, i) {
                d3.select(this)
                    .attr("fill", "#b700fbff");
            })
            .on("mouseout", function (d, i) {
                svg.selectAll('path')
                    .attr("fill", function (d, i) {
                        return color(i);
                    });
            });

        // 内圆环移位与响应事件配置	
        arcs.append("text")
            .attr("transform", function (d) {
                var x = arc.centroid(d)[0] * 0.99;
                var y = arc.centroid(d)[1] * 1.1;
                return "translate(" + x + "," + y + ")";
            })
            .attr("text-anchor", "middle")
            .attr("font-size", function (d) {
                if (d.data[1] > 20) return d.data[1] / (outerRadius / 50) + "px";
            })
            .text(function (d) {
                // return (d.value / 1.65).toFixed(2) + "%";
                return d.data[0];
            })
            .on("mouseover", function (d, i) {

                if (d.data[1] < 10) {
                    d3.select(this)
                        .attr("font-size", 10);
                }
            })
            .on("mouseout", function (d, i) {
                if (d.data[1] < 10) {
                    d3.select(this)
                        .attr("font-size", function (d) {
                            if (d.data[1] > 10) return d.data[1] / (outerRadius / 150) + "px";
                            else return 8 + "px";
                        });
                }
            });

        //添加一个提示框
        var tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0.0);
        // 内圆环
        arcs.on("mouseover", function (d) {
            tooltip.html(d.data[0] + "熟悉程度" + "<br />" + (d.data[1] / 1.65).toFixed(2) + "%")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .style("opacity", 1.0);
            d3.select(this)
                .style("cursor", "move");
        })
            /*---------实现框在圆环中间---------*/
            .on("mousemove", function (d) {
                tooltip.style("left", d3.event.pageX + "px")
                    .style("top", d3.event.pageY + "px");
            })
            /*---------实现框在圆环中间---------*/
            .on("mouseout", function (d) {
                tooltip.style("opacity", 0.0);
            });
        // 外圆环
        arcs_outer.on("mouseover", function (d) {
            tooltip.html(d.data[0] + ":" + "<br />" + d.data[2])
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .style("opacity", 1.0);
            d3.select(this)
                .style("cursor", "move");
        })
            /*---------实现框在圆环中间---------*/
            .on("mousemove", function (d) {
                tooltip.style("left", d3.event.pageX + "px")
                    .style("top", d3.event.pageY + "px");
            })
            /*---------实现框在圆环中间---------*/
            .on("mouseout", function (d) {
                tooltip.style("opacity", 0.0);
            });
    })
}
function Pie1(w, h, name, outerRadius) {
    // 创建SVG元素
    const svg = d3.select(name)
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    // 创建数据
    const data = [10, 20, 30, 40]; // 示例数据，你可以替换为实际数据

    // 创建颜色 scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // 创建饼图生成器
    const pie = d3.pie()
        .value(d => d)
        .padAngle(0.05)
        .outerRadius(outerRadius)
        .innerRadius(0);

    // 计算饼图弧度
    const arcs = pie(data);

    // 创建路径
    const g = svg.append("g")
        .attr("transform", `translate(${w / 2}, ${h / 2})`);

    g.selectAll("path")
        .data(arcs)
        .enter()
        .append("path")
        .attr("d", d3.arc())
        .attr("fill", d => color(d.data))
        .attr("stroke", "white")
        .attr("stroke-width", 0.5);
}
// window.onload = function() {
//   Pie2(400, 400, "svg_pie", 80);
// };