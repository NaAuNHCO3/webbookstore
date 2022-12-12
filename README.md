# WebBookStore网上书店
简单的WebBookStore网上书店架构，基于CS架构和前后端分离，采用node.js作为脚本语言。依托express框架实现web服务端搭建，并通过Connection pooling机制维护与mysql数据库的连接。

## 简介
### 业务动机
// TO DO... （业务的需求及背景，这部分内容主要靠编）

### 项目介绍
// TO DO... （我们网站实现的功能（基本功能看老师那边的文件，扩展功能往上面码），运用到的技术（Nodejs，HTML，CSS））

## 假设
### 用户假设
// TO DO... （用户分成两类client和staff，为什么这样分，各自的需求和目的以及对应的功能等与用户有关的假设）

### 书本假设
// TO DO... （书本有哪些属性，在这些属性中哪些是重要的，需不需要分类，哪些属性可变）

### 订单假设
// TO DO... （定单有哪些属性，有几种状态status，这些状态是什么含义，为什么要设置这样几种状态）

## 系统描述
### 基础架构
本项目采用前后端分离的技术，因而系统架构自然也是围绕前后端来展开。首先，在前端由html报文和css层叠样式表组成用户交互界面。然后，利用javascript来在浏览器发起GET/POST的http请求，在这一过程中浏览器充当了客户端client的角色，我们的服务端server将始终监听8080端口，当接受到http请求后，根据其url将其引导至对应的路由并调用回调，之后进行数据库的连接并执行查询或者修改的事务。当事务完成后返回相应的相应体，供前端更新、渲染界面或是提示用户操作。

在这一架构中，“消息传递”是核心，也即http的GET/POST请求及其响应，包括报文格式的约定，报文字段的含义规定，在前后端分离的架构当中，这些约定和协议至关重要，可以说是本项目的生命和核心。在后面我们将看到，处理这些请求体的发送和解析相应体是前后端交互的主要任务，而后端则致力于读懂这些请求体并返回正确的相应体，我们的项目就是在一次次request和response中逐步搭建起来的。

### 项目亮点
- 1.采用javascript作为脚本语言，可被绝大多数浏览器编译执行，同时避免了apache或nginx等网络服务器的使用，因而项目具有较高的泛用性，轻量化，容易部署。
- 2.基于回调函数的异步非阻塞代码运行模式，在后端提高了数据库的查询、修改、更新速率，在前端提高了页面更新的速度。
- 3.利用Promis机制对数据库事务的执行进行了封装，能在更新表项发生故障时即时回滚，较好地维护了数据库事务的ACID性质，有利于维护数据库的正确性和完整性。

```
const exec = function(sqlArr) {
	return new Promise(function(resolve, reject) {
		var promiseArr = []
		db.getConnection(function(err, conn) {
			if(err) {
				console.log('connect failed')
				reject(err)
			}
			conn.beginTransaction(function(err) {
				if(err) {
					console.log('beginTransaction failed')
					reject(err)
				}
				// 将所有需要执行的sql封装为数组
				promiseArr = sqlArr.map(function({sql, value}) {
					return new Promise(function(resolve, reject) {
						conn.query(sql, value, function(e, results) {
							e ? reject(e) : resolve({ results, success: true })
						})
					})
				})
				// Promise调用所有的sql，一旦出错则回滚，否则提交事务并释放连接
				Promise.all(promiseArr).then(function(res) {
					conn.commit(function(err) {
						if(err) {
							console.log('commit failed')
							reject(err)
						}
						conn.release()
						resolve(res)
					})
				}).catch(function(err) {
					conn.rollback(function() {
						console.log('rollback')
					})
					reject(err)
				})
			})
		})
	})
}
```

- 4.前后端分离架构，使得前端具有极高的自主性，前端不再依赖于后端，因而从理论上使前端更有可能按自己的想法丰富并完善网页设计任务。
- 5.良好的代码结构及模块化编程，提高了本项目的兼容性和易扩展性，团队之间分工协作，提升了代码质量和代码之间的耦合度。
- 6.前端建立储存机制sessionStorage，有效沟通前后端数据和消息体，维护了请求体数据的正确性，提升了前后端交流的效率。

### 前端部分
// TO DO... （郭鸣康负责的部分，网站的功能设计与视觉效果等）

### 后端部分
#### 注册登录
##### 注册
- 建立连接
- 查询用户是否已存在
- 插入用户数据
- 释放连接
 
##### 登录
- 建立连接
- 查询用户是否不存在
- 比对用户密码
- 释放连接
- 返回用户标识码

#### 用户信息
##### 查询用户信息
- 建立连接
- 由accountid单表查询user表
- 释放连接
- 返回用户基本信息

##### 修改用户信息
- 建立连接
- 截获请求体，编写update的sql修改语句
- 执行sql语句
- 释放连接

#### 图书信息
##### 图书信息查询
- 建立连接
- 由bookid单表查询book表
- 释放连接
- 返回图书信息
  
##### 图书检索
- 建立连接
- 截获请求体数据
- 由截获数据编写检索式
- 执行检索任务
- 释放连接
- 返回图书检索结果

具有对不同检索方式具有较高的兼容性，针对未给出的检索关键词，由后台系统进行默认值补充，用以规范用户的检索条件。

#### 订单
##### 历史订单查询
- 建立数据库连接
- 由accountid查询orders表orderid，orderstatus
- 由orderid查询book，orderdetail的等值连接表bookname等属性
- 由book属性计算order总价
- 释放数据库连

由于mysql在node里面查询所采用的function回调函数方式是异步操作，直接循环查询会导致响应体整合滞后于响应体发送，致使响应体数据缺失；因而，采用promise封装+await等待使之强行同步，确保响应体数据的完整性。

##### 订单修改

##### ······

### 前后端连接
### 发起GET/POST请求
使用jquery库，借助其ajax功能，设置请求的url，headers，body并在前端发起GET/POST的http请求至后端，成功后将后端发来的http响应体解析并根据相应体的内容如status，msg，data等属性内容来决定前端将要执行的任务。

### 连接缓存
在用户浏览网页时经常会遇到链接点击的需求，连接点击的实质是由浏览器作为客户端client发送http的GET请求，由服务器发送适合的html报文，这些报文固定存储在一个硬盘地址上。然而，在前后端分离的架构下，后端不负责渲染网页内容，它仅将对应的报文发送出去，这带来了一定的问题。

以图书为例，在搜索界面，我们期望用户点击图书名字后跳转之图书信息的页面，这个页面详细地介绍了图书的名称、作者、出版社、价格等信息。显然，我们不可能为每本图书都写一个独一无二的界面，相应的，我们希望他们具有相同的框架而只是内容不一样，所以服务器仅会发送这个框架的html，这个框架目前还没有任何内容！

当前端收到这个html报文，首先由浏览器进行渲染。渲染完成后，立刻向后端发送POST请求，期望获取有关这个图书的相关信息，因而请求体会需要图书id，而这个id从何而来呢？显然，我们需要在用户点击图书名字后缓存该图书的id（window.sessionStorage.setItem("bookid", 图书id)）。这种做法非常有效。

#### 订单管理
利用浏览器的sessionStorage执行订单管理，通过addOrder()和dropOrder()等函数来维护订单内容并在cart购物车界面发起makeorder下单请求时将其作为请求体的数据发送给后端。order数据格式是前后端协定的。形如：

```
{
    accountid: 用户ID,
    booklist: [
        {bookname: 书名A, buynum: 购买数量},
        {bookname: 书名B, buynum: 购买数量},
        {bookname: 书名C, buynum: 购买数量},
    ]
}
```

### 显示数据
在前端更新页面内容时用到了jquery库，通过$美元符号取DOM元素，并借助诸如attr，text，val等函数更改页面内容，结合复杂的数据结构可以实现前端页面内容的异步更新

## 数据库
### 数据库模式
- 图书（图书号，书名，作者，出版社，摘要，价格，库存）
- 订单（订单号，订单项数，订单状态，账号）
- 订单详情（订单详情号，订单号，图书号，购买数量，总价，折扣）
- 用户（账号，密码，用户名，描述，邮箱，电话，地址，权限）
- 用户限制（权限，限制）

### 完整性约束
- 用户名不能重复
- 用户有且仅有两类
- 订单状态有且仅有三类
- 单价乘以数量必须等于总价
- orders表里的订单号（orderid）应该对应于orderdetail表里的订单号
- orderdetail表里的图书号（bookid）应该对应于book表里的图书号
- orderdetail表里的数据量应该大于等于orders表里的数据量

### 用户权限
- client
  - 在orders表里能添加数据
  - 在book表里查询图书信息
  - 在orderdetail表没有进入权限
  - 在user表里能添加数据，也能修改自己添加的数据（不能重复）

- staff
  - 在orders表里能看出订单状态（orderstatus）
  - 在book表里能添加、删除、修改、查询图书信息
  - 在orderdetail表里查询订单信息
  - 在user表里能查询client信息

## 测试
### 测试数据
- 图书数据（有50本书籍的数据）
- 订单数据 （有20条数据）
- 订单详情数据 （有24条数据）
- 用户信息数据 （有10条数据）
- 用户权限数据 （有2条数据）

总共有106数据

### 测试方式
// TO DO... （到时候再说）

### 测试结果
// TO DO... （到时候再说）

## 用户手册

### 首页
![index](https://user-images.githubusercontent.com/111762194/206899381-b185c374-bbdc-4a06-a866-e7b2125cf419.png)
- 进入首页（inidex.html）能看到两个按钮：login, register。按login按钮，跳转到login界面，按register按钮，跳转到register界面。

### 注册登陆
![register](https://user-images.githubusercontent.com/111762194/206899108-9004d0d1-4407-4820-b186-8c267004ec34.png)
- 这是register界面。添加信息之后，按submit就能登记成功。

![login](https://user-images.githubusercontent.com/111762194/206899117-101ba4ae-2701-4bce-b5c6-bfef784d6eb5.png)
- 这是login界面。准确添加登记时使用的信息之后，按submit就能登录成功。

![client](https://user-images.githubusercontent.com/111762194/206899192-ed111455-a736-494b-83aa-9b1a9ea9d76b.png)
- client界面上显示具有client权限的用户能选择的选项。按quit，返回到login界面。

![staff](https://user-images.githubusercontent.com/111762194/206899196-c8959438-5d42-4e67-9a4f-a548040680e2.png)
- staff界面上显示具有staff权限的用户能选择的选项。按Exit，返回到login界面。

### 个人信息
![profile](https://user-images.githubusercontent.com/111762194/206899122-3b7e91a5-159c-4ce8-8aae-7589d9c74cc4.png)
- 在profile界面上，用户能看到自己的个人信息。

![changeprofile](https://user-images.githubusercontent.com/111762194/206899126-f4ebda8f-b234-49d9-98c5-ce954efdec76.png)
- 在changeprofile界面上，用户能修改个人信息。

### 查询书本
![search1](https://user-images.githubusercontent.com/111762194/206909726-3a9c4bbf-ea00-4ac4-b996-86a411526e08.png)
- 在search界面上，能查询书本。简单地输入书名之后查询书本也可以，按extend search之后附加其他信息之后更准确地查询也可以。
- 下面黑框里面，会显示跟输入信息对应的查询结果。用户能看到书本的书名、作者、出版社和价格，为了查看更详细的结果，点击蓝色的书名就能跳转到bookinfo界面。把鼠标箭头放在黑框上面，会显示add to order,modify按钮。按add to order按钮，能把书放在购物车里。 具有staff权限的用户能按modify按钮，修改书本信息。

![bookinfo](https://user-images.githubusercontent.com/111762194/206899467-810e20bf-9d98-4802-807e-02f0fb05dfe6.png)
- 在bookinfo界面上，除了书名、作者、出版社和价格以外，还能查询到存库信息和摘要。具有staff权限的用户能点击modify，修改书籍信息。

### 订单操作
![order1](https://user-images.githubusercontent.com/111762194/206899239-f1f591c4-51a7-462b-831f-2e0cdca615e6.png)
- 在order界面上，能查询到用户下单的书本信息。用户会能看到书本的按back按钮，就能跳转到orderhistory界面。
- 按urge按钮，用户能催单。

![cart](https://user-images.githubusercontent.com/111762194/206899148-3f6c2bed-53e5-4fe1-9b7b-4a5ec58a061d.png)
- 在cart界面上实现了购物车的功能。点击书名，能跳转到bookinfo界面，能查看书本详细信息。 在界面右下角，显示用户加入购物车的书本的总量和总价。
- 在quantity方框里，用户能调整想要购买的数量。
- 按remove按钮，用户能删除加入到购物车的书本信息。
- 按confirm按钮，能确认并保存修改的信息。
- 按search按钮，用户能跳转到search界面，继续查询书本。

### 购买记录
![orderhistory](https://user-images.githubusercontent.com/111762194/206899264-5c95f7a5-7fd8-4e9a-9fbe-8a183a7a814c.png)
- 在order history界面上，用户能查看订单的大概信息。把鼠标箭头放在order id,total price, processing上点击，就能进入到order界面，能查看更详细的信息。
- 点击书名，能跳转到bookinfo界面。

## 局限性
## 改进
## 程序清单
### 文件结构
```
.
├── index.js	(主函数/入口点)
├── index.html	(首页界面)
├── html		(诸html文件)
│   ├── login.html		(html示例)
│   └── register.html	(html示例)
├── public		(站点可调用资源)
│   ├── css		(css文件)
│   ├── img		(图片文件)
│   ├── js		(脚本文件)
│   └── lib		(函数库)
├── package.json
├── package-lock.json
└── README.md
```
### 前端清单
```
html
├── addbook.html
├── bookinfo.html
├── cart.html
├── changeprofile.html
├── client.html
├── login.html
├── orderhistory.html
├── order.html
├── profile.html
├── register.html
├── search.html
└── staff.html
```

```
public/css
├── bookinfo.css
├── index.css
├── login.css
├── order.css
├── orderhistory.css
├── profile.css
├── search.css
├── template.css
└── usercenter.css

```

### 后端清单
```
public/lib
├── base.js
├── bookinfo.js
├── cart.js
├── exec.js
├── order.js
├── profile.js
├── search.js
└── sql.js

```

### 前后端交互清单
```
public/js
├── bookinfo.js
├── cart.js
├── changeprofile.js
├── hidden.js
├── jquery-3.6.1.min.js
├── jquery.form.min.js
├── link.js
├── login.js
├── logout.js
├── orderHistory.js
├── order.js
├── orderManage.js
├── profile.js
├── register.js
└── search.js

```

## 贡献
