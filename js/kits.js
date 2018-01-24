/* 视图层用到的工具函数 */

// 获取用户选择节点的id
function getSelectedNodeId(params) {
    // 注:params是事件回调函数的参数，是一个object,其中nodes属性是所有节点的id
    selectedId = params.nodes[0];
    console.log("current selected id: {0}".format(selectedId));
}

// 取消选择的节点id
function revokeSelectedNodeId(params) {
    selectedId = null;
    console.log("current selected id is null");
}

// 跳转到所设置链接的url
function redirectToUrl(params) {
    selectedId = params.nodes[0];
    var url = graphNodes.get(selectedId).url;
    if (url)
        window.open(url);
}

// 显示节点名称
function displayNodeName(){
    var inputNodeDOM = document.getElementById("node-name");
    if (selectedId !== null){
        var selectedNode = findNode(rootNode, selectedId);
        inputNodeDOM.value = selectedNode.name;
    }
    else
        inputNodeDOM.value = "";
}

// 显示节点链接
function displayNodeLink() {
    var inputNodeDOM = document.getElementById("node-link");
    if (selectedId !== null){
        var selectedNode = findNode(rootNode, selectedId);
        inputNodeDOM.value = selectedNode.link;
    }
    else
        inputNodeDOM.value = "";
}

// 显示节点备注
function displayNodeComment() {
    var inputNodeDOM = document.getElementById("node-comment");
    if (selectedId !== null){
        var selectedNode = findNode(rootNode, selectedId);
        inputNodeDOM.value = selectedNode.comment;
    }
    else
        inputNodeDOM.value = "";
}

// 显示节点批注
function displayNodeRemark() {
    var inputNodeDOM = document.getElementById("node-remark");
    if (selectedId !== null){
        var selectedNode = findNode(rootNode, selectedId);
        inputNodeDOM.value = selectedNode.remark;
    }
    else
        inputNodeDOM.value = "";
}

