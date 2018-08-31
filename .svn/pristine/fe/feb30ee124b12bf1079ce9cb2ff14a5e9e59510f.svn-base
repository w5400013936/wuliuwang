// pages/transport-price/transport-price.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    origList: ['元/公斤', '元/吨', '元/整车'],
    orig: '元/公斤',
    discount: '元/公斤',
    agreement: '元/公斤',
    bean: new Object()
  },
  changeOrig: function() {
    var that = this;
    wx.showActionSheet({
      itemList: that.data.origList,
      success: function(e) {
        switch (e.tapIndex) {
          case 0:
            that.data.bean.oriUnit = "kg"
            break
          case 1:
            that.data.bean.oriUnit = "ton"
            break
          case 2:
            that.data.bean.oriUnit = "car"
            break
        }
        that.setData({
          orig: that.data.origList[e.tapIndex]
        })
      }
    })
  },
  changeDiscount: function() {
    var that = this;
    wx.showActionSheet({
      itemList: that.data.origList,
      success: function(e) {
        switch (e.tapIndex) {
          case 0:
            that.data.bean.line.tipUnit = "kg"
            break
          case 1:
            that.data.bean.line.tipUnit = "ton"
            break
          case 2:
            that.data.bean.line.tipUnit = "car"
            break
        }
        that.setData({
          discount: that.data.origList[e.tapIndex]
        })
      }
    })
  },
  changeAgreement: function() {
    var that = this;
    wx.showActionSheet({
      itemList: that.data.origList,
      success: function(e) {
        switch (e.tapIndex) {
          case 0:
            that.data.bean.line.xyUnit = "kg"
            break
          case 1:
            that.data.bean.line.xyUnit = "ton"
            break
          case 2:
            that.data.bean.line.xyUnit = "car"
            break
        }
        that.setData({
          agreement: that.data.origList[e.tapIndex]
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      bean: JSON.parse(options.bean)
    })
    switch (that.data.bean.oriUnit) {
      case "kg":
        that.setData({
          orig: that.data.origList[0]
        })
        break
      case "ton":
        that.setData({
          orig: that.data.origList[1]
        })
        break
      case "car":
        that.setData({
          orig: that.data.origList[2]
        })
        break
    }
    switch (that.data.bean.line.tipUnit) {
      case "kg":
        that.setData({
          discount: that.data.origList[0]
        })
        break
      case "ton":
        that.setData({
          discount: that.data.origList[1]
        })
        break
      case "car":
        that.setData({
          discount: that.data.origList[2]
        })
        break
    }
    switch (that.data.bean.line.xyUnit) {
      case "kg":
        that.setData({
          agreement: that.data.origList[0]
        })
        break
      case "ton":
        that.setData({
          agreement: that.data.origList[1]
        })
        break
      case "car":
        that.setData({
          agreement: that.data.origList[2]
        })
        break
    }
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
    var oriPriceZ = e.detail.value.oriPriceZ
    var oriPriceQ = e.detail.value.oriPriceQ
    var tipPriceZ = e.detail.value.tipPriceZ
    var tipPriceQ = e.detail.value.tipPriceQ
    var xyPriceZ = e.detail.value.xyPriceZ
    var xyPriceQ = e.detail.value.xyPriceQ
    if (!oriPriceZ) {
      oriPriceZ = 0
    }
    if (!oriPriceQ) {
      oriPriceQ = 0
    }
    if (!tipPriceZ) {
      tipPriceZ = 0
    }
    if (!tipPriceQ) {
      tipPriceQ = 0
    }
    if (!xyPriceZ) {
      xyPriceZ = 0
    }
    if (!xyPriceQ) {
      xyPriceQ = 0
    }
    this.data.bean.oriPriceZ =oriPriceZ
    this.data.bean.oriPriceQ = oriPriceQ
    this.data.bean.line.tipPriceZ = tipPriceZ
    this.data.bean.line.tipPriceQ = tipPriceQ
    this.data.bean.line.xyPriceZ = xyPriceZ
    this.data.bean.line.xyPriceQ = xyPriceQ
    getApp().shuaXin.yunShuJiaGe = this.data.bean
    wx.navigateBack({
      delta:1
    })
  },
})