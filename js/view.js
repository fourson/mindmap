/* 封装视图层操作的函数 */

// 在"mindmap-canvas"区域绘制网络图并返回该网络图对象
function createNetworkGraph(options) {
    var containerDOM = document.getElementById("mindmap-canvas");
    graphNodes = new vis.DataSet(parseNodesFromTree(rootNode));
    graphEdges = new vis.DataSet(parseEdgesFromTree(rootNode));
    graphData = {nodes: graphNodes, edges: graphEdges};
    return new vis.Network(containerDOM, graphData, options);
}

// 摧毁网络图
function destroyNetworkGraph(network) {
    if (network !== null)
        network.destroy();
}

// 给network绑定事件回调函数
function setNetworkEvent(network, eventName, eventFunction) {
    network.on(eventName, eventFunction);
}

// 生成一张视图所需要的全部操作
function initializeNetworkGraph(network) {
    console.log("starting initializeNetworkGraph");

    // 摧毁原始绘图
    destroyNetworkGraph(network);
    // 重绘,重新绑定事件
    networkGraph = createNetworkGraph(options);
    setNetworkEvent(networkGraph, "selectNode", selectNodeCallback);// 设置"选中节点"事件
    setNetworkEvent(networkGraph, "deselectNode", deselectNodeCallback);// 设置"取消选中节点"事件
    setNetworkEvent(networkGraph, "doubleClick", doubleClickCallback);// 设置"双击节点"事件
    // 清除被选中的id
    selectedId = null;
    console.log("current selected id is null");
    // 利用显示的函数来清空表单的输入框
    displayNodeName();
    displayNodeLink();
    displayNodeComment();

    console.log("ending initializeNetworkGraph");
}

