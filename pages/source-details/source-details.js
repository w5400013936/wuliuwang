// pages/source-details/source-details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: "",
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var item = JSON.parse(options.bean)
    switch (item.sentType) {
      case 0:
        item.sentText = "不限"
        break
      case 1:
        item.sentText = "物流公司"
        break
      case 2:
        item.sentText = "整车配货"
        break
      case 3:
        item.sentText = "零担配货"
        break
    }
    that.setData({
      item: item
    })
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
    if (getApp().appData.userInfo) {
      this.setData({
        isLogin: true
      })
    } else {
      this.setData({
        isLogin: false
      })
    }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "货源详情",
    }
  },
  call() {
    if (!getApp().appData.userInfo) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    getApp().call(this.data.item.mobile)
  },
})