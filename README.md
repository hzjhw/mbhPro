上门网331手机app test6
====

### 服务端API文档 - 数据接口
- http://192.168.1.99:1111/330jfinal

### app.js API文档  - app.js框架
- http://code.kik.com/app/2/docs.html#ui-content

### UI navigation and transition utility  - 转场效果文档
- https://github.com/kikinteractive/swapper

### seajs API文档 - 模块加载
- http://seajs.org/docs/#docs

### artDialog API文档 - 对话框
- http://aui.github.io/artDialog/doc/index.html

### handlebars API文档 - 模板引擎
- http://handlebarsjs.com/

### Zepto API文档 - DOM选择器
- http://zeptojs.com/

### git API文档 - 项目管理
- http://git-scm.com/book/zh/v1
- 抓取并合并 ：git fetch origin master:jhw -> git merge jhw
- 提交 ：git add . -> git commit -m "wyj" -> git push origin
- 更新之前必须先stash自己的内容， 为了减少git逻辑错误
- 若抓取合并失败， 先stash自己的内容[命令git stash]， 然后执行[git merge jhw], 然后再unstash自己的[命令git stash pop]
- 清空stash[git stash clear]


### 架构目录
- const.js [常量配置]
- config.js [配置模块路径、模板与路由与全局变量]
- config.local.js [本地配置文件， 此文件未加入到版本管理中]
- images [存放图片， 样式中background:url()中的url图片地址存放到styles/img文件夹中， 且为相对地址]
- lib文件夹 [APP核心组件]
- scripts [包含所有帮助类与基础脚本， 如：handlebars模板引擎帮助类]
- styles [所有样式文件]
- vendor [所有第三方插件]

### 常见案件
1) 对话框
seajs.use(['dialog'], function (dialog) {
                    window.dialog = dialog({
                        id: '330dialog',
                        title: '我的330',
                        align: 'bottom right',
                        width: WINDOW_WIDTH - 280,
                        content: $('.container-my', $(page)).html()
                    }).showModal($dom);
                })
                
2) 数据渲染
var $container = $('#merchants-show', $(page));
                var template = $container.html();
                $container.empty();
                App.render({ render: '#merchants-show', page: page, template: template, data: {
                    title: '品牌展示馆',
                    list: result.brandList.list
                }});
                
3) tag标签切换
var $sub = $(page).find('.cate-item-sub');
            $(page).find('.cate-item').each(function (index) {
                $(this).click(function () {
                    $(this).addClass('current').siblings('.cate-item').removeClass('current');
                    $sub.eq(index).addClass('cate-cur').siblings().removeClass('cate-cur');
                });
            });
            
4) 添加加载动画
$(page).find('.cate-ul li').click(function () {
    App.addLoading(); // 移除为App.removeLoading();
});

5) 初始化页面载入
App.controller('brand_detail', function (page) {
    App.initLoad(page, { transition: 'fade', page: 'brand_detail', 
        appReady: function(page){}, // 页面载入完毕事件
        appShow: function(page){} // 页面显示事件
    }, ctx);
    .....
});

6) 设置返回点
App.setBackPage('brand_list'); // 获取 App.getBackPage()

7) 图片延迟加载
 // html
 <!--品牌展示-->
        <div id="merchants-show" class="app-lazyload">  // 这里必需加app-lazyload 且为滚动页面那个div
            <img class="lazy" data-original="{{CONST 'PIC_URL'}}{{brand_path}}" src="images/bottom-logo.png" alt="" width="284" height="347"/>
        </div>
 // js
App.initLazyLoad(page);

//刷新lazyload
App.resetLazyLoad('#merchants-show', page);

8) 设置DIV可滚动 解决ios scroll不可滚动问题
App.Scrollable($('.clickxiala .ui-dialog-content').get(0), false); // 注意滚动区域内只能容纳一个元素
或（有缓冲效果）
new App._IScroll($left.get(0), {
            mouseWheel: true,
            vScrollbar: false, 
            fadeScrollbars: true
          });
参数说明：
hScroll: true, //是否水平滚动  
vScroll: true, //是否垂直滚动  
x: 0, //滚动水平初始位置  
y: 0, //滚动垂直初始位置  
bounce: true, //是否超过实际位置反弹  
bounceLock: false, //当内容少于滚动是否可以反弹，这个实际用处不大  
momentum: true, //动量效果，拖动惯性  
lockDirection: true,  
//当水平滚动和垂直滚动同时生效时，当拖动开始是否锁定另一边的拖动  
useTransform: true, //是否使用CSS形变  
useTransition: false, //是否使用CSS变换  
topOffset: 0, //已经滚动的基准值(一般情况用不到)  
checkDOMChanges: false, //是否自动检测内容变化  
// Scrollbar 的相关参数  
hScrollbar: true, //是否显示水平滚动条  
vScrollbar: true, //同上垂直滚动条  
fixedScrollbar: isAndroid, //对andriod的fixed  
hideScrollbar: isIDevice,  //是否隐藏滚动条  
fadeScrollbar: isIDevice && has3d, //滚动条是否渐隐渐显  
scrollbarClass: '', //字定义滚动条的样式名  
// Zoom 放大相关的参数  
zoom: false, //默认是否放大  
zoomMin: 1, //放大的最小倍数  
zoomMax: 4, //最大倍数  
doubleTapZoom: 2, //双触放大几倍  
wheelAction: 'scroll', //鼠标滚动行为（还可以是zoom） 

// 自定义 Events 的相关参数   
onRefresh: null, //refresh 的回调，关于自身何时调用refresh 后面会继续谈到  
onBeforeScrollStart: function (e) { e.preventDefault(); },   
//开始滚动前的时间回调，默认是阻止浏览器默认行为  
onScrollStart: null, //开始滚动的回调  
onBeforeScrollMove: null, //在内容移动前的回调  
onScrollMove: null, //内容移动的回调  
onBeforeScrollEnd: null, 在滚动结束前的回调  
onScrollEnd: null, //在滚动完成后的回调  
onTouchEnd: null, //手离开屏幕后的回调  
onDestroy: null, //销毁实例的回调  
onZoomStart: null,  
onZoom: null,   
onZoomEnd: null  


9)登录弹窗
var cntVal = '<span style="font-size: 20px"> 对不起,您还未登录!现在就登录吗?</span>';
          App.showConfirm('未登录', cntVal, null, function () {
            App.load('login_dealers');
          });

var cntVal = '<span style="font-size: 20px"> 无法找到该产品详细信息</span>';
                  App.showMsg('收藏错误', cntVal);

### 响应速度方面
1) 按钮点击响应速度
    在需要点击的按钮上添加app-btn选择符  如：<input type="button" class="app-button app-btn" value="确定"/>
    
2) 页面切换速度
    在模块文件中添加setTimeout(function(){}, 0);
    BrandList = function (page, id, title, banner, area) {
        setTimeout(function () {
            ....
        }, 0);
    });
    
### 样式方面
1) 所有的文字统一最小24px
1) app-list : 列表
    app-btn : 按钮
    app-back: 返回按钮
    app-topbar : 顶部
    app-content: 内容
    app-input : 输入框

### 注册事项
1) 控制好App._Stack深度， 返回按钮尽量调用App.back('home'); 
   标记返回点App.setBackPage('brand_list');尽早缩减Stack长度
2) 多添加debug语句， 容易及早发现问题
3) 请求数据最好加上cache: true缓存
4) 所有返回按钮需加app-back 选择符
5) appReady、appShow里注册事件必需先注销事件   
[appShow在App.back中有效， appReady无效， appReady在App.load中有效]

6) 创建页面报addEventListener错误 
   先在首页index.html中加入  <div class="app-page" data-page="brand_cooperate"><div class="loading-text">拼命加载中...</div></div>
   然后在controllers.js中添加App.controller('brand_cooperate', function(page){
    ......
   });


