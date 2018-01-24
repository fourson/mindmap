/* 定义数据层模型和传给绘图库的模型 */


// 数据层全局变量
var rootNode = null;// 作为根节点
var copy = null;// 作为剪切&粘贴功能的剪贴板
var sumCounter = 0;// 表示目前总的节点数目
var maxId = 0;// 表示已分配的id的最大值
var selectedId = null;// 表示目前被选中节点的id（同一时刻只允许一个节点被选中）

// 数据层节点
function DataNode(name) {
    // 绘图用得到的属性控制字段
    this.name = name;// 节点名称（内容）
    this.link = null;// 链接
    this.comment = null;// 备注
    this.remark = null;// 批注
    this.style = "default";// 风格:ellipse,box,dot,default
    this.icon = "none";// 图标
    this.border = "default";// 外框

    // 程序用得到的属性
    this.id = null;// 节点id
    this.layer = null;// 节点所在层级
    this.children = [];// 节点的子节点
    this.parentId = null;// 节点的父节点id
}


// 图像层全局变量
var networkGraph = null;// 网络图
var graphNodes = null;// 图像层节点集
var graphEdges = null;// 图像层边集
var graphData = null;// 图像数据合集
var options = null;// 网络图配置

// 图像节点
function GraphNode() {
    // todo:记得有些东西修改成对象
    // 节点属性
    this.label = null;// 节点标签
    this.url = null;// 超链接url
    this.comment = null;// 备注
    this.remark = null;// 批注
    this.icon = {};// 图标
    this.shape = null;// 形状
    this.shapeProperties = {};// 形状属性
    this.font = {};// 字体
    this.border = null;// 外框

    // 程序定位
    this.id = null;// 节点id
    this.level = null;// 层级
}

// 图像的边
function GraphEdge(from, to) {
    this.from = from;// 起点id
    this.to = to;// 终点id
}


