
// 修改内容
function Change(id_name, content) {
    document.getElementById(id_name).innerHTML = content;
};
// 电荷作用力 已经移植到d3.v4
function force(path, where, width, height) {
    // let width = 50;
    // let height = 50;
    let color = d3.scaleOrdinal(d3.schemeCategory20);
    var force = d3.forceSimulation();
    let svg = d3.select(where).append("svg")
        .attr("width", width)
        .attr("height", height);
    d3.json(path, function (error, graph) {
        console.log(graph);
        force.nodes(graph.nodes)
            .force("link", d3.forceLink(graph.links).distance(40))   //distance设置连线距离
            .force("charge", d3.forceManyBody().strength(-460))
            .force("center", d3.forceCenter(width / 2, height / 2))  //设置力学仿真器的中心
            .on("tick", ticked);

        let node = svg.selectAll(".node")
            .data(graph.nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 10)
            .style("fill", function (d, i) {
                return color(i);
            }).call(d3.drag().on("start", dragstarted) //d3.drag() 创建一个拖曳行为
                .on("drag", dragged)
                .on("end", dragended));
        let link = svg.selectAll(".link")
            .data(graph.links)
            .enter().append("line")
            .attr("class", "link")
            .attr("stroke", "black") // 设置连线颜色为黑色
            .style("stroke-width", function (d) { return Math.sqrt(d.value); });
        //监听拖拽开始    
        function dragstarted(d) {
            if (!d3.event.active) force.alphaTarget(0.9).restart(); //alpha是动画的冷却系数，运动过程中会不断减小，直到小于0.005为止，此时动画会停止。
            d.fx = d.x;    //fx为固定坐标，x为初始坐标  注3>  
            d.fy = d.y;
        }
        //监听拖拽中  
        function dragged(d) {
            d.fx = d3.event.x;  //fevent.x为拖拽移动时的坐标
            d.fy = d3.event.y;
        }
        //监听拖拽结束
        function dragended(d) {
            if (!d3.event.active) force.alphaTarget(0);
            d.fx = null;        //固定坐标清空
            d.fy = null;
        }
        //拖拽时的事件监听器  以实时更新坐标
        // 拖拽时的事件监听器  以实时更新坐标并添加旋转效果
        function ticked() {
            link.attr("x1", function (d) { return d.source.x; })
                .attr("y1", function (d) { return d.source.y; })
                .attr("x2", function (d) { return d.target.x; })
                .attr("y2", function (d) { return d.target.y; });

            node.attr("cx", function (d) { return d.x; }) // 更新节点的中心X坐标
                .attr("cy", function (d) { return d.y; }) // 更新节点的中心Y坐标
                // 添加旋转效果，这里使用d.x和d.y来决定旋转角度，你可以根据需要调整旋转逻辑
                .attr("transform", function (d) {
                    // 计算一个基于当前节点位置的旋转角度，这里仅作为示例，实际情况可能需要更复杂的计算
                    let rotation = Math.atan2(d.y - height / 2, d.x - width / 2) * 180 / Math.PI;
                    return "rotate(" + rotation + "," + d.x + "," + d.y + ")";
                });
        }
        // function ticked() {
        //     link.attr("x1", function (d) {
        //         return d.source.x;
        //     })
        //         .attr("y1", function (d) {
        //             return d.source.y;
        //         })
        //         .attr("x2", function (d) {
        //             return d.target.x;
        //         })
        //         .attr("y2", function (d) {
        //             return d.target.y;
        //         });
        //     node.attr("cx", function (d) { return d.x; })
        //         .attr("cy", function (d) { return d.y; });
        // }
    });
}
for (let i = 1; i <= 6; i++) {
    Change('forceSvg', "<script>" + force("src/json/force.json", "force_" + i, 200, 200) + "</script>")
};