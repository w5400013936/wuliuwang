// pages/companyInfos/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    fromCity: 0,
    fromProvince: 0,
    toProvince: 0,
    toCity: 0,
    yunShuLeiXing: "不限",
    sendType: 0,
    yunShuLeiXingArr: ["不限", "物流公司", "整车配货", "零担配货"],
    goodsType: "货",
    goodsTypeArr: ["货", "重货", "轻货"],
    unit: "公斤",
    unitArr: ["公斤", "吨"],
    startDate: "2018-08-27",
    limitTime: "",
    fromCityName: "",
    fromProvinceName: "",
    toCityName: "请选择",
    toProvinceName: "省份",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.data.id = options.id
    that.setData({
      fromCity: options.fromCity,
      fromCityName: options.fromCityName,
      fromProvinceName: options.fromProvinceName,
      fromProvince: options.fromProvince,
    })
    var date = new Date();
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    that.setData({
      startDate: year + "-" + month + "-" + day
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  cityChange: function(e) {
    if (e.detail.type == 1) {
      this.setData({
        fromCity: e.detail.cityId,
        fromCityName: e.detail.cityName,
        fromProvince: e.detail.proId,
        fromProvinceName: e.detail.proName,
      })
    } else if (e.detail.type == 2) {
      this.setData({
        toCity: e.detail.cityId,
        toCityName: e.detail.cityName,
        toProvince: e.detail.proId,
        fromProvinceName: e.detail.proName,
      })
    }
  },
  yunShuLeiXing() {
    var that = this;
    wx: wx.showActionSheet({
      itemList: that.data.yunShuLeiXingArr,
      success: function(e) {
        that.setData({
          yunShuLeiXing: that.data.yunShuLeiXingArr[e.tapIndex],
          sendType: e.tapIndex
        })
      }
    })
  },

  zhongHuo() {
    var that = this;
    wx: wx.showActionSheet({
      itemList: that.data.goodsTypeArr,
      success: function(e) {
        that.setData({
          goodsType: that.data.goodsTypeArr[e.tapIndex],
        })
      }
    })
  },
  unitSelect() {
    var that = this;
    wx: wx.showActionSheet({
      itemList: that.data.unitArr,
      success: function(e) {
        that.setData({
          unit: that.data.unitArr[e.tapIndex],
        })
      }
    })
  },

  expiryDateChange(e) {
    this.setData({
      limitTime: e.detail.value
    })
  },

  xiaDan(e) {
    var that = this
    if (that.data.fromCity == 0) {
      wx.showToast({
        title: '请选择出发城市',
      })
      return
    }
    if (that.data.toCity == 0) {
      wx.showToast({
        title: '请选择到达城市',
      })
      return
    }
    if (!e.detail.value.name) {
      wx.showToast({
        title: '请输入货物名称',
      })
      return
    }
    if (!e.detail.value.weight) {
      wx.showToast({
        title: '请输入货物重量',
      })
      return
    }
    if (!that.data.limitTime) {
      wx.showToast({
        title: '请选择有效期',
      })
      return
    }
    if (!e.detail.value.contact) {
      wx.showToast({
        title: '请输入联系人',
      })
      return
    }
    if (!e.detail.value.phone) {
      wx.showToast({
        title: '请输入联系电话',
      })
      return
    }
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    var json = new Object()
    var act = "placeorder"
    json.mID = that.data.id
    json.fromCity = that.data.fromCity
    json.toCity = that.data.toCity
    json.goodsName = e.detail.value.name
    json.sentType = that.data.sendType
    json.goodsType = that.data.goodsType
    json.weight = e.detail.value.weight
    json.unit = that.data.unit
    json.volume = e.detail.value.tiJi
    json.limitTime = that.data.limitTime
    json.mobile = e.detail.value.phone
    json.linkMan = e.detail.value.contact
    json.fromProvince = that.data.fromProvince
    json.toProvince = that.data.toProvince
    json.fromProvinceName = that.data.fromProvinceName
    json.fromCityName = that.data.fromCityName
    json.toProvinceName = that.data.toProvinceName
    json.toCityName = that.data.toCityName
    json.fromCityName = that.data.fromCityName
    wx.request({
      url: getApp().appData.hostPhp + "logistics/placeorder", //仅为示例，并非真实的接口地址
      data: {
        mID: that.data.id,
        fromCity: that.data.fromCity,
        toCity: that.data.toCity,
        goodsName: e.detail.value.name,
        sentType: that.data.sendType,
        goodsType: that.data.goodsType,
        weight: e.detail.value.weight,
        unit: that.data.unit,
        volume: e.detail.value.tiJi,
        limitTime: that.data.limitTime,
        mobile: e.detail.value.phone,
        linkMan: e.detail.value.contact,
        fromProvince: that.data.fromProvince,
        toProvince: that.data.toProvince,
        fromProvinceName: that.data.fromProvinceName,
        fromCityName: that.data.fromCityName,
        toProvinceName: that.data.toProvinceName,
        toCityName: that.data.toCityName,
        fromCityName: that.data.fromCityName,
        "token": getApp().md5Php(act + JSON.stringify(json))
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        //请求成功
        if (res.data.status == 100) {
          wx.hideLoading()
          that.setData({
            isfail: false,
          })
          setTimeout(function() {
            wx.showToast({
              title: res.data.msg,
            })
          }, 300)
          wx.navigateBack({
            delta: 1
          })
        } else { //请求失败
          that.setData({
            isfail: true,
          })
          wx.hideLoading()
          setTimeout(function() {
            wx.showToast({
              title: res.data.msg,
            })
          }, 300)
        }
      },
      fail: function(res) {
        that.setData({
          isfail: true,
        })
        wx.hideLoading()
        setTimeout(function() {
          wx.showToast({
            title: "请求失败",
          })
        }, 300)
      },
      complete: function() {
        wx.stopPullDownRefresh();
      }
    })
  },


})