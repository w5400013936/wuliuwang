// pages/changePwd/changePwd.js 
var WxNotificationCenter = require("../../WxNotificationCenter/WxNotificationCenter.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  wanCheng(e) {
    var oldPassword = e.detail.value.oldPassword
    var password01 = e.detail.value.password01
    var password02 = e.detail.value.password02
    if (!oldPassword) {
      wx.showToast({
        title: '请输入旧密码',
      })
      return
    }
    if (!password01) {
      wx.showToast({
        title: '请输入新密码',
      })
      return
    }
    if (!password02) {
      wx.showToast({
        title: '请再次输入密码',
      })
      return
    }
    console.log("完成")
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    that.setData({
      enable: false
    })
    var json = new Object()
    var mod = "changepwd"
    json.oldpwd = oldPassword
    json.newpwd = password01
    wx.request({
      url: getApp().appData.host + "vaild_post", //仅为示例，并非真实的接口地址
      data: {
        "mod": mod,
        "json": JSON.stringify(json),
        "token": getApp().appData.userInfo.token
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        //请求成功
        if (res.data.state == 1) {
          WxNotificationCenter.postNotificationName(getApp().shuaXin.guanBiSheZhi);
          getApp().appData.changeControl = getApp().appData.changeControl + 1
          getApp().appData.userInfo = ""
          wx.clearStorage()
          wx.redirectTo({
            url: '/pages/login/login',
          })
          setTimeout(function() {
            wx.showToast({
              title: '密码修改成功',
            })
          }, 300)
          that.setData({
            isfail: false,
          })
          wx.hideLoading()
        } else { //请求失败
          that.setData({
            isfail: true,
          })

        }
      },
      fail: function(res) {
        that.setData({
          isfail: true,
        })
      },
      complete: function() {
        wx.stopPullDownRefresh();
      }
    })
  },
})