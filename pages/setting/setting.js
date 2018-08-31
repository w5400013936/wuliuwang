// pages/setting/setting.js
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
  onLoad: function (options) {
    WxNotificationCenter.addNotification(getApp().shuaXin.guanBiSheZhi, this.guanBi, this)
  },

  guanBi(){
    wx.navigateBack({
      delta:1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    WxNotificationCenter.removeNotification(getApp().shuaXin.guanBiSheZhi, this)
  },

  /**
   * 退出登录
   */
  exitTap() {
    wx.showModal({
      title: '提示',
      content: '您确定要退出登录吗？',
      success: function (res) {
        if (res.confirm) {
          getApp().appData.changeControl = getApp().appData.changeControl + 1
          getApp().appData.userInfo = ""
          wx.clearStorage()
          wx.navigateBack({
            delta:1
          })
        }
      }
    })
  },
  /**
   * 修改密码
   */
  goChangePwd:function(){
    wx.navigateTo({
      url: '/pages/changePwd/changePwd',
    })
  },
  /**
   * 意见反馈
   */
  goFeedback:function(){
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })
  }
})