/* 操作自定义数据结构时需要用到的工具函数 */

// 以node为根通过待查找节点id寻找某一节点
function findNode(node, theNodeId) {
    if (theNodeId === node.id)
        return node;
    else {
        for (var i = 0; i < node.children.length; i++) {
            var theNode = findNode(node.children[i], theNodeId);
            if (theNode)
                return theNode;
        }
    }
    return null;
}

// 更新以node为根的所有节点的id
function renewNodeId(node) {
    node.id = maxId + 1;
    maxId++;
    for (var i = 0; i < node.children.length; i++) {
        renewNodeId(node.children[i]);
    }
    return node;
}

// 更新以node为根的所有节点的layer
function renewNodeLayer(node, parentLayer) {
    node.layer = parentLayer + 1;
    for (var i = 0; i < node.children.length; i++) {
        renewNodeLayer(node.children[i], node.layer);
    }
    return node;
}

// 根据子节点id删除node节点的子节点
function removeChild(node, childId) {
    for (var i = 0; i < node.children.length; i++) {
        if (node.children[i].id === childId) {
            node.children.splice(i, 1);
            break;
        }
    }
}

// 以node为根对节点进行计数
function countNode(node) {
    var count = 0;
    count++;
    for (var i = 0; i < node.children.length; i++) {
        count += countNode(node.children[i]);
    }
    return count;
}

// 以node为根寻找其中id的最大值
function findMaxId(node) {
    var max = 0;
    if (node.id > max)
        max = node.id;
    for (var i = 0; i < node.children.length; i++) {
        var temp = findMaxId(node.children[i]);
        if (temp > max)
            max = temp;
    }
    return max;
}
