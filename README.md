# 微信小程序接入微上客客服系统

## 简介
微信小程序接入微上客客服系统后，小程序用户的对话消息会自动转发到微上客客服工作台，客服就可以在微上客统一回复咨询，可以非常便捷的回复来自小程序的客户咨询。在微信小程序接入后，可以通过后台设置客服的工作时间、机器人等功能

## 绑定小程序
在电脑上以管理员身份登录微上客客服系统后，进入「配置」-「渠道管理」：

![WSK_SDK_iOS](https://raw.githubusercontent.com/visionetwsk/Resource/master/image/wxmini_1.png)  


点击「添加消息渠道」按钮，「选择微信小程序」 渠道，然后点击确认，

![WSK_SDK_iOS](https://raw.githubusercontent.com/visionetwsk/Resource/master/image/wxmini_2.png)  

「点击进入扫码」

![WSK_SDK_iOS](https://raw.githubusercontent.com/visionetwsk/Resource/master/image/wxmini_3.png)  


接着跳转到微信授权页面，需要小程序管理员用微信扫码，即可绑定微信小程序。

![WSK_SDK_iOS](https://raw.githubusercontent.com/visionetwsk/Resource/master/image/wxmini_4.png) 

绑定成功后会跳转回客服工作台，这时候就可以看到绑定的小程序渠道, 点击「渠道设置」，可以对小程序渠道配置工作时间、机器人等功能

> 注意：添加绑定的微信小程序必须是经过微信认证的，否则无法正常使用。 
![WSK_SDK_iOS](https://raw.githubusercontent.com/visionetwsk/Resource/master/image/wxmini_5.jpg)  


## 给小程序添加「联系客服」按钮，以及参数传递
小程序自带的组件库里就有微信聊天窗按钮，就用这个按钮组件即可让用户点击后跳转到聊天窗，在聊天窗发送的消息都会转发到微上客客服系统，客服就可以统一接收回复。

``` 
<button open-type="contact">联系客服</button> 
```   
或者如下按钮（详细参考微信文档）

``` 
<contact-button >联系客服</contact-button>
```   
 
> 微信文档地址 [https://developers.weixin.qq.com/miniprogram/dev/component/contact-button.html](https://developers.weixin.qq.com/miniprogram/dev/component/contact-button.html "")

### 传递客户信息
默认的情况下，微上客无法获取小程序用户的头像昵称等用户信息，可以通过下面的方式将小程序用户信息传递给微上客客服系统，以便在对话的时候了解用户更多信息。

小程序的```<button open-type="contact" />```可以增加属性 ```session-from```，这个属性会在用户进入对话窗的时候传递给微上客，因此可以从这里传递用户信息。
```
<button open-type="contact" session-from="{{customerInfo}}">联系客服</button>
```
传递的数据必须为严格的 json 字符串格式，可以看下面的数据处理方式：

``` 
var userInfo = res.userInfo; 	//这里通过微信小程序提供的方法自行获取用户信息
var customerInfo = JSON.stringify({
        "customerName": userInfo.nickName,
        "headimgurl": userInfo.avatarUrl,
        "gender": 1,  // 性别, 1：男、2：女 
        "phoneNumber": "18600000006", // 电话
        "email": "test@wsk.cn", // 邮箱
        "address": "上海市", // 地址
        "title": "经理", // 职位
        "department": "某单位", // 单位
        "birthday": "1986-12-12", // 生日
        "remark": "描述", //备注
        // 自定义用户信息（可不传），label_cn：中文名称，label_en：英文名称，value：值
        "customData": encodeURIComponent("[{\"label_cn\":\"订单号\", \"label_en\":\"orderNo\", \"value\":\"fecx864532\"}]")
      }); 
```

### 参考示例代码
[https://github.com/visionetwsk/WSK_Weixin_MiniProgram](https://github.com/visionetwsk/WSK_Weixin_MiniProgram "")

