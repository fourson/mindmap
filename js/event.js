/* 视图层network事件回调函数 */

// "选中节点"事件回调函数
function selectNodeCallback(params){
    getSelectedNodeId(params);
    displayNodeName();
    displayNodeLink();
    displayNodeComment();
    displayNodeRemark();
}

// "取消选中节点"事件回调函数
function deselectNodeCallback(params){
    revokeSelectedNodeId(params);
    displayNodeName();
    displayNodeLink();
    displayNodeComment();
    displayNodeRemark();
}

// "双击节点"事件回调函数
function doubleClickCallback(params) {
    redirectToUrl(params);
}
