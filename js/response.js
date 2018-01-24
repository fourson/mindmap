/* 对用户操作进行响应的函数 */

// 点击"添加节点"时执行的响应
function addNodeResponse() {
    if (selectedId !== null) {
        console.log("response: add node at id {0}".format(selectedId));
        // 通过id寻找数据层节点并对其执行操作
        var selectedNode = findNode(rootNode, selectedId);
        addNode(selectedNode);
        // 生成视图
        initializeNetworkGraph(networkGraph);
    }
    else
        alert("请先选择节点再进行操作！");
}

// 点击"删除节点"时执行的响应
function deleteNodeResponse() {
    if (selectedId !== null) {
        console.log("response: delete node at id {0}".format(selectedId));
        // 通过id寻找数据层节点并对其执行操作
        var selectedNode = findNode(rootNode, selectedId);
        deleteNode(selectedNode);
        // 生成视图
        initializeNetworkGraph(networkGraph);
    }
    else
        alert("请先选择节点再进行操作！");
}

// 点击"复制节点"时执行的响应
function copyNodeResponse() {
    if (selectedId !== null) {
        console.log("response: copy node at id {0}".format(selectedId));
        // 通过id寻找数据层节点并对其执行操作
        var selectedNode = findNode(rootNode, selectedId);
        copyNode(selectedNode);
        // 生成视图
        initializeNetworkGraph(networkGraph);
    }
    else
        alert("请先选择节点再进行操作！");
}

// 点击"剪切节点"时执行的响应
function cutNodeResponse() {
    if (selectedId !== null) {
        console.log("response: cut node at id {0}".format(selectedId));
        // 通过id寻找数据层节点并对其执行操作
        var selectedNode = findNode(rootNode, selectedId);
        cutNode(selectedNode);
        // 生成视图
        initializeNetworkGraph(networkGraph);
    }
    else
        alert("请先选择节点再进行操作！");
}

// 点击"粘贴节点"时执行的响应
function pasteNodeResponse() {
    if (selectedId !== null) {
        console.log("response: paste node at id {0}".format(selectedId));
        // 通过id寻找数据层节点并对其执行操作
        var selectedNode = findNode(rootNode, selectedId);
        pasteNode(selectedNode);
        // 生成视图
        initializeNetworkGraph(networkGraph);
    }
    else
        alert("请先选择节点再进行操作！");
}

// 点击"生成文件"时执行的响应
function generateJsonFileResponse() {
    console.log("response: generate json file");
    // 生成json
    var jsonString = JSON.stringify(rootNode);
    // 注意,Blob对象第一个参数必须是array形式
    var jsonBlob = new Blob([jsonString], {"type": "application/json"});
    // 显示下载链接,并且设置参数
    var downloadLink = document.getElementById("json-file-download");
    downloadLink.removeAttribute("style");// 注:初始时设置成了style = "display:none",是不显示的
    downloadLink.href = window.URL.createObjectURL(jsonBlob);
    downloadLink.download = "mindmap.json";
}

// 点击"初始化"时执行的响应
function initializeResponse() {
    if (confirm("你确定要初始化吗？当前所做的工作将会丢失。")) {
        console.log("response: initialize");
        // 隐藏之前生成的下载链接并初始化
        var downloadLink = document.getElementById("json-file-download");
        downloadLink.setAttribute("style", "display:none");
        initialize();
    }
}

// 点击"修改内容"时执行的响应
function editNameResponse() {
    if (selectedId !== null) {
        console.log("response: edit name at id {0}".format(selectedId));
        // 通过id寻找数据层节点并对其执行操作
        var selectedNode = findNode(rootNode, selectedId);
        var inputNodeDOM = document.getElementById("node-name");
        if (inputNodeDOM.value) {
            editName(selectedNode, inputNodeDOM.value);
            inputNodeDOM.value = "";
        }
        else
            alert("输入内容不能为空！");
        // 模拟点击下拉框使之不出现在界面上
        var editDropdownToggleDOM = document.getElementById("edit-dropdown-toggle");
        editDropdownToggleDOM.click();
        // 生成视图
        initializeNetworkGraph(networkGraph);
    }
    else
        alert("请先选择节点再进行操作！");
}

// 点击"设置链接"时执行的响应
function setLinkResponse() {
    if (selectedId !== null) {
        console.log("response: set link at id {0}".format(selectedId));
        // 通过id寻找数据层节点并对其执行操作
        var selectedNode = findNode(rootNode, selectedId);
        var inputNodeDOM = document.getElementById("node-link");
        if (inputNodeDOM.value) {
            setLink(selectedNode, inputNodeDOM.value);
            inputNodeDOM.value = "";
        }
        else
            selectedNode.link = null;
        // 模拟点击下拉框使之不出现在界面上
        var editDropdownToggleDOM = document.getElementById("edit-dropdown-toggle");
        editDropdownToggleDOM.click();
        // 生成视图
        initializeNetworkGraph(networkGraph);
    }
    else
        alert("请先选择节点再进行操作！");
}

// 点击"添加备注"时执行的响应
function addCommentResponse() {
    if (selectedId !== null) {
        console.log("response: add comment at id {0}".format(selectedId));
        // 通过id寻找数据层节点并对其执行操作
        var selectedNode = findNode(rootNode, selectedId);
        var inputNodeDOM = document.getElementById("node-comment");
        if (inputNodeDOM.value) {
            addComment(selectedNode, inputNodeDOM.value);
            inputNodeDOM.value = "";
        }
        else
            selectedNode.comment = null;
        // 模拟点击下拉框使之不出现在界面上
        var editDropdownToggleDOM = document.getElementById("edit-dropdown-toggle");
        editDropdownToggleDOM.click();
        // 生成视图
        initializeNetworkGraph(networkGraph);
    }
    else
        alert("请先选择节点再进行操作！");
}

// 点击"修改批注"时执行的响应
function editRemarkResponse() {
    if (selectedId !== null) {
        console.log("response: edit remark at id {0}".format(selectedId));
        // 通过id寻找数据层节点并对其执行操作
        var selectedNode = findNode(rootNode, selectedId);
        var inputNodeDOM = document.getElementById("node-remark");
        if (inputNodeDOM.value) {
            editRemark(selectedNode, inputNodeDOM.value);
            inputNodeDOM.value = "";
        }
        else
            selectedNode.remark = null;
        // 生成视图
        initializeNetworkGraph(networkGraph);
    }
    else
        alert("请先选择节点再进行操作！");
}

// 点击"图标"时执行的响应
function setIconResponse(obj) {
    if (selectedId !== null) {
        console.log("response: set icon at id {0}".format(selectedId));
        // 通过id寻找数据层节点并对其执行操作
        var selectedNode = findNode(rootNode, selectedId);
        setIcon(selectedNode, obj.id);
        // 生成视图
        initializeNetworkGraph(networkGraph);
    }
    else
        alert("请先选择节点再进行操作！");
}

// 点击"风格"时执行的响应
function setStyleResponse(obj) {
    if (selectedId !== null) {
        console.log("response: set style at id {0}".format(selectedId));
        // 通过id寻找数据层节点并对其执行操作
        var selectedNode = findNode(rootNode, selectedId);
        setStyle(selectedNode, obj.id);
        // 生成视图
        initializeNetworkGraph(networkGraph);
    }
    else
        alert("请先选择节点再进行操作！");
}

// 点击"外框"时执行的响应
function setBorderResponse(obj) {
    if (selectedId !== null) {
        console.log("response: set border at id {0}".format(selectedId));
        // 通过id寻找数据层节点并对其执行操作
        var selectedNode = findNode(rootNode, selectedId);
        setBorder(selectedNode, obj.id);
        // 生成视图
        initializeNetworkGraph(networkGraph);
    }
    else
        alert("请先选择节点再进行操作！");
}

// 点击"上传"时执行的响应
function uploadClickResponse() {
    console.log("response: click upload button");
    //清空原有的值
    var fileInput = document.getElementById("json-file-upload");
    fileInput.value = "";
}

// "上传"文件输入框内容改变的时候执行的响应
function uploadJsonFileResponse() {
    console.log("response: upload json file");
    // 获取上传的json文件对象
    var file = document.getElementById("json-file-upload").files[0];
    // 用正则表达式检验是否为json文件
    var pattern = /.+\.json/;
    if (file && pattern.test(file.name)) {
        // 解析上传的json文件
        uploadJsonFile(file);
    }
    else
        alert("请上传思维导图生成的json文件！");
}