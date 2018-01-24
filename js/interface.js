/* 定义数据层和绘图库之间的接口 */

// 渲染数据节点的"名称"属性到图像节点
function transferName(dataNode, graphNode) {
    graphNode.label = dataNode.name;
}

// 渲染数据节点的"链接"属性到图像节点
function transferLink(dataNode, graphNode) {
    graphNode.url = dataNode.link;
}

// 渲染数据节点的"备注"属性到图像节点
function transferComment(dataNode, graphNode) {
    graphNode.comment = dataNode.comment;
}

// 渲染数据节点的"批注"属性到图像节点
function transferRemark(dataNode, graphNode){
    graphNode.remark = dataNode.remark;
}

// 渲染数据节点的"风格"属性到图像节点
function transferStyle(dataNode, graphNode) {
    var layer = dataNode.layer;
    var style = dataNode.style;
    if (style === "default") {
        //默认风格渲染
        if (layer === 0) {
            graphNode.font.size = 35;
            graphNode.shape = "ellipse";
        }
        else if (layer === 1) {
            graphNode.font.size = 25;
            graphNode.shape = "ellipse";
        }
        else if (layer === 2) {
            graphNode.font.size = 25;
            graphNode.shape = "box";
        }
        else {
            graphNode.font.size = 15;
            graphNode.shape = "dot";
        }
    }
    else {
        // 按定义的风格渲染
        if (layer === 0)
            graphNode.font.size = 35;
        else if (layer === 1 || layer === 2)
            graphNode.font.size = 25;
        else
            graphNode.font.size = 15;
        graphNode.shape = style;
    }
}

// 渲染数据节点的"图标"属性到图像节点
function transferIcon(dataNode, graphNode) {
    var icon = dataNode.icon;
    if (icon === "none")
    // 默认没有图标
        graphNode.icon = {};
    else {
        // 如定义了图标，按定义的图标渲染
        graphNode.shape = "icon";
        graphNode.icon.face = "FontAwesome";
        graphNode.icon.code = icon;
        graphNode.icon.size = 100;
        // graphNode.icon.color = "#6495ED";
        graphNode.icon.color = "#228B22";
    }
}

// 渲染数据节点的"外框"属性到图像节点
function transferBorder(dataNode, graphNode) {
    var border = dataNode.border;
    if (border === "default")
    //默认外框渲染
        graphNode.shapeProperties.borderDashes = false;
    else {
        // 按定义的外框渲染
        if (border === "long-dash")
            graphNode.shapeProperties.borderDashes = [20, 5];
        else if (border === "short-dash")
            graphNode.shapeProperties.borderDashes = [5, 5];
        else
            graphNode.shapeProperties.borderDashes = false;
    }
}

// 从自定义的数据结构中解析出符合库的节点的格式
function parseNodesFromTree(root) {
    var graphNodesArray = [];
    // todo:这里需要执行一下渲染函数
    var graphNode = new GraphNode();
    // 渲染图像节点属性
    transferName(root, graphNode);
    transferLink(root, graphNode);
    transferComment(root, graphNode);
    transferRemark(root, graphNode);
    transferStyle(root, graphNode);
    transferIcon(root, graphNode);
    transferBorder(root, graphNode);
    // 补充程序定位值
    graphNode.id = root.id;
    graphNode.level = root.layer;
    graphNodesArray.push(graphNode);
    for (var i = 0; i < root.children.length; i++) {
        graphNodesArray = graphNodesArray.concat(parseNodesFromTree(root.children[i]));
    }
    return graphNodesArray;
}

// 从自定义的数据结构中解析出符合库的边的格式
function parseEdgesFromTree(root) {
    var graphEdgesArray = [];
    for (var i = 0; i < root.children.length; i++) {
        var graphEdge = new GraphEdge(root.id, root.children[i].id);
        graphEdgesArray.push(graphEdge);
        graphEdgesArray = graphEdgesArray.concat(parseEdgesFromTree(root.children[i]));
    }
    return graphEdgesArray;
}