// pages/companyInfos/carInfo/carInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    isfail: true,
    page: 1,
    totalPage: 0,
    list: [],
    contact: "",
    toProvin: "省份",
    toCity: "请选择",
    toCityId: 0,
    typeX: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options.id)
    that.data.id = options.id
    that.setData({
      contact: JSON.parse(options.contact),
    })
    that.data.typeX = 0
    that.requestList()
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
    console.log("到底了？")
    var that = this
    if (that.data.page > that.data.totalPage) {
      wx.showToast({
        title: '没有更多了',
      })
      return
    }
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    if (typeX == 0) {
      that.requestList()
    }else{
      that.requestChaXun()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  roCarDetail(e) {
    wx.navigateTo({
      url: '/pages/companyInfos/carInfo-detail/carInfo-detail?carid=' + e.currentTarget.dataset.carid + "&contact=" + JSON.stringify(this.data.contact) + "&id=" + this.data.id,
    })
  },
  /**
   * 电话
   */
  call(e) {
    getApp().call(e.currentTarget.dataset.phone)
  },
  requestList() {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    var json = new Object()
    json.id = that.data.id
    json.p = that.data.page
    json.size = 10
    var act = "carsource"
    wx.request({
      url: getApp().appData.hostPhp + "logistics/carsource", //仅为示例，并非真实的接口地址
      data: {
        "id": that.data.id,
        "p": that.data.page,
        "size": 10,
        "token": getApp().md5Php(act + JSON.stringify(json))
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        //请求成功
        if (res.data.status == 100) {
          if (that.data.page == 1) {
            that.data.list = []
            that.data.totalPage = res.data.data.end_page
            // if (that.data.page && res.data.data.list.length==0){
            //   setTimeout(function () {
            //     wx.showToast({
            //       title: "无车源信息",
            //     })
            //   }, 300) 
            // }
          }
          that.data.page = that.data.page + 1
          for (let i = 0; i < res.data.data.list.length; i++) {
            res.data.data.list[i].carNo = res.data.data.list[i].carNo.substring(0, res.data.data.list[i].carNo.length - 3) + "***"
          }
          Array.prototype.push.apply(that.data.list, res.data.data.list);
          that.setData({
            list: that.data.list,
          })
          that.setData({
            isfail: false,
          })
          wx.hideLoading()
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

  cityChange: function(e) {
    if (e.detail.type == 1) {
      this.data.contact.city = e.detail.cityName
      this.data.contact.cityId = e.detail.cityId
      this.data.contact.province = e.detail.proName
      this.data.toProvin = e.detail.proName
      this.setData({
        contact: this.data.contact
      })
    } else if (e.detail.type == 2) {
      this.setData({
        toCity: e.detail.cityName,
        toCityId: e.detail.cityId,
        toProvin: e.detail.proName,
      })
    }
  },

  /**
   * 查询
   */
  chaXun() {
    var that = this
    if (that.data.contact.cityId == 0) {
      wx.showToast({
        title: '请选择出发地',
      })
      return
    }
    if (that.data.toCityId == 0) {
      wx.showToast({
        title: '请选择到达地',
      })
      return
    }
    that.data.page = 1;
    that.data.typeX = 1;
    that.requestChaXun()
  },

  requestChaXun() {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    var json = new Object()
    json.id = that.data.id
    json.p = that.data.page
    json.fromCity = that.data.contact.cityId
    json.toCity = that.data.toCityId
    json.size = 10
    var act = "carsource"
    wx.request({
      url: getApp().appData.hostPhp + "logistics/carsearch", //仅为示例，并非真实的接口地址
      data: {
        "id": that.data.id,
        "p": that.data.page,
        "fromCity": that.data.contact.cityId,
        "toCity": that.data.toCityId,
        "size": 10,
        "token": getApp().md5Php(act + JSON.stringify(json))
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        //请求成功
        if (res.data.status == 100) {
          if (that.data.page == 1) {
            that.data.list = []
            that.data.totalPage = res.data.data.end_page
            if (that.data.page && res.data.data.list.length == 0) {
              setTimeout(function() {
                wx.showToast({
                  title: "无车源信息",
                })
              }, 300)
            }
          }
          that.data.page = that.data.page + 1
          for (let i = 0; i < res.data.data.list.length; i++) {
            res.data.data.list[i].carNo = res.data.data.list[i].carNo.substring(0, res.data.data.list[i].carNo.length - 3) + "***"
          }
          Array.prototype.push.apply(that.data.list, res.data.data.list);
          that.setData({
            list: that.data.list,
          })
          that.setData({
            isfail: false,
          })
          wx.hideLoading()
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