A mindmap written by javascript :)

require:
1. jquery-3.0.0
2. bootstrap3
3. font-awesome-4.7.0
4. vis.js

functions:
1. basic functions of a mindmap: add, delete, edit and so on.
2. set icon, hyperlink, comment, remark, border, style and so on.
3. save and upload the mindmap as json file
4. copy, cut and paste

features:
1. automatic balanced layout
2. friendly user interface
3. easy to deploy in your server
4. "backendless": the project is a full front-end project, just run it in your browser. 

写代码过程的坑(原谅我不用英文了2333)：
1. onload是一个异步事件，触发条件是加载完成才执行，要注意顺序（上传文件功能的时候踩的坑）。
2. onchange事件是必须要内容改变才可以触发，也就是说你输入的内容如果和原来一样不会触发。所以要写一个清除的逻辑（同样是上传文件功能的时候踩的坑）
3. 输入表单的type=submit会导致提交表单而刷新界面，从而把内容刷新掉。如果只是想要一个点击触发效果请务必用type=button（界面有时候会奇怪地刷新）
4. js的变量传递原理"http://blog.csdn.net/chelen_jak/article/details/48915679"。（节点复制功能的时候踩的坑，应该是deep copy）

在此感谢当时请教过的学长们，从他们那里学到了很多东西。

written by silhouette
2018.1.24