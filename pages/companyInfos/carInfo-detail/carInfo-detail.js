// pages/companyInfos/carInfo-detail/carInfo-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    isfail:true,
    contact: "",
    carid:0,
    bean:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.id)
    that.data.id = options.id
    that.data.carid = options.carid
    that.setData({
      contact: JSON.parse(options.contact)
    })
    that.request()
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
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  call(e) {
    getApp().call(e.currentTarget.dataset.mobile)
  },

  showDetail(e) {
    this.data.bean.car_source.to_citys[e.currentTarget.dataset.index].select = !this.data.bean.car_source.to_citys[e.currentTarget.dataset.index].select
    this.setData({
      bean: this.data.bean
    })
  },
  /**
   * 网络请求
   */
  request() {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    var json = new Object()
    var act = "carsourcedetail"
    json.id = that.data.carid
    wx.request({
      url: getApp().appData.hostPhp + "logistics/carsourcedetail", //仅为示例，并非真实的接口地址
      data: {
        "id": that.data.carid,
        "token": getApp().md5Php(act + JSON.stringify(json))
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function (res) {
        //请求成功
        if (res.data.status == 100) {
          wx.hideLoading()
          for (let i = 0; i < res.data.data.car_source.to_citys.length; i++) {
            res.data.data.car_source.to_citys[i].select = false
          }
          that.setData({
            isfail: false,
            bean: res.data.data
          })
        } else { //请求失败
          that.setData({
            isfail: true,
          })
          wx.hideLoading()
          setTimeout(function () {
            wx.showToast({
              title: res.data.msg,
            })
          }, 300)
        }
      },
      fail: function (res) {
        that.setData({
          isfail: true,
        })
        wx.hideLoading()
        setTimeout(function () {
          wx.showToast({
            title: "请求失败",
          })
        }, 300)
      },
      complete: function () {
        wx.stopPullDownRefresh();
      }
    })
  },
})