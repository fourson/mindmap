/* 封装对自定义数据结构各种功能操作的函数 */

// 初始化函数
function initialize() {
    console.log("operation: initialize");
    // 初始化根节点
    rootNode = new DataNode("root node");
    rootNode.id = 0;
    rootNode.layer = 0;
    // 初始化数据层全局变量
    copy = null;
    sumCounter = 1;
    maxId = rootNode.id;
    selectedId = null;
    // 初始化图像层全局变量
    options = {
        nodes: {
            color: {
                border: "#0000CD",
                background: "#D2E5FF",
                highlight: {
                    border: "#CD5C5C",
                    background: "#F5DEB3"
                }
            }
        },
        layout: {
            hierarchical: {
                enabled: true,
                levelSeparation: 250,
                nodeSpacing: 200,
                treeSpacing: 200,
                blockShifting: true,
                edgeMinimization: true,
                parentCentralization: true,
                direction: "LR",        // UD, DU, LR, RL
                sortMethod: "directed"   // hubsize, directed
            }
        },
        physics: {
            enabled: false
        },
        edges: {
            smooth: {
                type: "cubicBezier",
                forceDirection: "horizontal",
                roundness: 0.5
            }
        }
    };
    // 生成视图
    initializeNetworkGraph(networkGraph);
}

// 给某一节点添加子节点
function addNode(node) {
    console.log("operation: add node at {0}".format(node.id));
    // 创建新节点
    var newNode = new DataNode("new node");
    newNode.id = maxId + 1;
    newNode.layer = node.layer + 1;
    // 添加父子关系
    newNode.parentId = node.id;
    node.children.push(newNode);
    // 修改全局变量
    sumCounter++;
    maxId++;
    return newNode;
}

// 删除选中的节点
function deleteNode(node) {
    console.log("operation: delete node at {0}".format(node.id));
    // 根节点则不删除
    if (node.id !== 0) {
        // 修改全局变量
        sumCounter -= countNode(node);
        // 解除父子关系
        var parentNode = findNode(rootNode, node.parentId);
        removeChild(parentNode, node.id);
    }
    else
        alert("不能删除根节点！");
}

// 复制选中节点
function copyNode(node) {
    console.log("operation: copy node at {0}".format(node.id));
    // 根节点则不复制
    if (node.id !== 0)
    // 深度复制(deep copy)对象
        copy = JSON.parse(JSON.stringify(node));
    else
        alert("不能复制根节点！");
}

// 剪切选中节点
function cutNode(node) {
    console.log("operation: cut node at {0}".format(node.id));
    // 根节点则不剪切
    if (node.id !== 0) {
        // 剪切 = 复制 + 删除
        copyNode(node);
        deleteNode(node);
    }
    else
        alert("不能剪切根节点！");
}

// 粘贴剪贴板中的节点树到选中的节点上
function pasteNode(node) {
    console.log("operation: paste node at {0}".format(node.id));
    if (copy) {
        // 深度复制(deep copy)对象
        var temp = JSON.parse(JSON.stringify(copy));
        // 修改全局变量
        sumCounter += countNode(temp);
        // 更新被粘贴的节点树的节点id和layer
        renewNodeId(temp);
        renewNodeLayer(temp, node.layer);
        // 添加父子关系
        temp.parentId = node.id;
        node.children.push(temp);
        return temp;
    }
    else
        alert("剪贴板为空！");
}

// 修改节点名称
function editName(node, name) {
    console.log("operation: edit name at {0}".format(node.id));
    node.name = name;
}

// 设置节点链接
function setLink(node, link) {
    console.log("operation: set link at {0}".format(node.id));
    node.link = link;
}

// 添加节点备注
function addComment(node, comment) {
    console.log("operation: add comment at {0}".format(node.id));
    node.comment = comment;
}

// 修改节点批注
function editRemark(node, remark) {
    console.log("operation: edit remark at {0}".format(node.id));
    node.remark = remark;
}

// 设置节点图标
function setIcon(node, icon) {
    console.log("operation: set icon at {0}".format(node.id));
    node.icon = icon;
}

// 设置节点风格
function setStyle(node, style) {
    console.log("operation: set style at {0}".format(node.id));
    node.style = style;
}

// 设置节点外框
function setBorder(node, border) {
    console.log("operation: set border at {0}".format(node.id));
    node.border = border;
}

// 解析上传的json文件
function uploadJsonFile(file) {
    console.log("operation: upload json file");
    // 调用html5的FileAPI
    var reader = new FileReader();
    // 将文件以文本形式读入页面
    reader.readAsText(file);
    // 注:onload是异步事件！
    reader.onload = function () {
        // 把上传的json文件解析成对象
        try {
            var root = JSON.parse(this.result);
        }
        catch (err) {
            var err_msg = "解析json文件失败:" + err.message;
            alert(err_msg);
            return false;
        }

        // 假设用户上传的json文件是该程序生成的而不是随便编造的，否则很可能会出bug
        // 要过滤所有的非法输入很难，后面有空编写一个函数逐项对比属性，并且判断是否符合该程序生成的文件格式
        // todo:暂时假设用户上传正确
        // 如果要部署到远程服务器则应该schema验证以防止安全性隐患
        // 一种思路:
        // Object.keys(root).sort().join() === Object.keys(new DataNode()).sort().join()

        // 变更根节点为上传节点树的根节点
        rootNode = root;
        // 修改全局变量
        copy = null;
        sumCounter = countNode(rootNode);
        maxId = findMaxId(rootNode);
        selectedId = null;
        // 生成视图
        initializeNetworkGraph(networkGraph);
    }
}

//测试使用,简单地对节点进行一些操作
function simpleTest() {
    var node1 = addNode(rootNode);
    var node2 = addNode(node1);
    var node3 = addNode(node1);
    cutNode(node1);
    pasteNode(rootNode);

    node1 = rootNode.children[0];
    node2 = rootNode.children[0].children[0];
    node3 = rootNode.children[0].children[1];
    pasteNode(node2);
    copyNode(node3);
    pasteNode(node1);

    initializeNetworkGraph(networkGraph);

    console.log(rootNode);
}

