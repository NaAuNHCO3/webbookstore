# WebBookStore网上书店
简单的WebBookStore网上书店架构，基于CS架构和前后端分离，采用node.js作为脚本语言。依托express框架实现web服务端搭建，并通过Connection pooling机制维护与mysql数据库的连接。

## 简介
### 业务动机

### 项目介绍

## 假设
### 用户假设
通过组内讨论，决定用户分成两类client和staff。这两类用户对网上书店的需求和目的是如下：
- client在网上书店想登记、登录、查询图书、催单、购买图书。对应地，在网上书店上设计了登记、登录、查询图书、催单、购买图书的功能。
- staff在网上书店想管理并查询顾客、图书和订单信息。对应地，在网上书店上设计了顾客管理功能、图书馆里功能，销售管理功能。

### 书本假设
书本的属性有图书号，书名，作者，出版社，摘要，价格，库存。其中图书号是作为主码，要能唯一识别一本书，因此图书号的重要性很大。价格和库存应该根据销售情况可变。

### 订单假设
订单的属性有订单号，订单项数，订单状态，账号，购买数量，图书号。订单装填有三类processing,failed和finished。processing表示订单正在进行中，failed表示因为某种原因订单被取消，finished表示订单已经完成。

## 系统描述
### 基础架构
// TO DO... （前端GET/POST => 后端监听 => 导入路由的回调函数 => 与数据库建立连接 => 执行事务 => 响应前端）

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
// TO DO... （肖萧负责的部分，怎样处理前后端数据，确定数据的格式，怎样在前端保存信息）

## 数据库
### 数据库模式
- 图书（图书号，书名，作者，出版社，摘要，价格，库存）
- 订单（订单号，订单项数，订单状态，账号）
- 订单详情（订单详情号，订单号，图书号，购买数量）
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
// TO DO... （陈民后负责的部分，有多少数据，准备了哪些数据）
- 图书数据（有50本书籍的数据）
- 订单数据 （有30条数据）
- 订单详情数据 （有60条数据）
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
![order_history](https://user-images.githubusercontent.com/111762194/206899264-5c95f7a5-7fd8-4e9a-9fbe-8a183a7a814c.png)
- 在order history界面上，用户能查看订单的大概信息。把鼠标箭头放在order id,total price, processing上点击，就能进入到order界面，能查看更详细的信息。
- 点击书名，能跳转到bookinfo界面。

## 局限性
## 改进
## 程序清单
## 贡献
