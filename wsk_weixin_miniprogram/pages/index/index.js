//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: app.globalData.userInfo,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    customerInfo: ""
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
      this.updateCustomerInfo()
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        this.updateCustomerInfo()
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.updateCustomerInfo()
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.updateCustomerInfo()
  },
  updateCustomerInfo: function() {
    this.setData({
      customerInfo: JSON.stringify({
        "customerName": this.data.userInfo.nickName,
        "headimgurl": this.data.userInfo.avatarUrl,
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
      })
    })
  }
})
