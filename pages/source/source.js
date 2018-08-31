// pages/source/source.js 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shaiXuan: 0,
    page: 0,
    rows: [],
    cityIDTo: 0,
    cityIDFrom: 0,
    isLogin: false,
    fromProID: 0,
    fromProIDX: 0,
    fromCityID: 0,
    toProID: 0,
    toProIDX: 0,
    toCityID: 0,
    proList: [],
    cityList: [],
    fromCityName: "到达地",
    toCityName: "出发地",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.page = 0
    this.request()
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    that.data.page = 0
    that.request()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    that.request()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "货源列表",
    }
  },
  /**
   * 详情
   */
  detailTap(e){
    wx.navigateTo({
      url: '/pages/source-details/source-details?bean='+JSON.stringify(this.data.rows[e.currentTarget.dataset.index]),
    })
  },
  /**
   * 点击省
   */
  shengTap(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    for (let i = 0; i < that.data.proList.length; i++) {
      that.data.proList[i].select = false
    }
    that.data.proList[index].select = true
    if (that.data.shaiXuan == 1) {
      that.data.fromProIDX = that.data.proList[index].proID
    } else if (that.data.shaiXuan == 2) {
      that.data.toProIDX = that.data.proList[index].proID
    }
    that.setData({
      proList: that.data.proList
    })
    that.requestCity(index)
  },
  /**
   * 点击市
   */
  shiTap(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    for (let i = 0; i < that.data.cityList.length; i++) {
      that.data.cityList[i].select = false
    }
    that.data.cityList[index].select = true
    if (that.data.shaiXuan == 1) {
      that.data.fromCityID = that.data.cityList[index].cityID
      that.data.fromProID = that.data.fromProIDX
      that.setData({
        fromCityName: that.data.cityList[index].cityName
      })
    } else if (that.data.shaiXuan == 2) {
      that.data.toCityID = that.data.cityList[index].cityID
      that.data.toProID = that.data.toProIDX
      that.setData({
        toCityName: that.data.cityList[index].cityName
      })
    }
    that.setData({
      cityList: that.data.cityList,
      shaiXuan: 0
    })
    if (that.data.fromCityID != 0 && that.data.toCityID != 0) {
      that.onPullDownRefresh()
    }
  },
  /**
   * 打电话
   */
  call(e) {
    if (!getApp().appData.userInfo) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.mobile,
    })
  },

  /**
   * 筛选布局
   */
  shaiXuan(e) {
    var that = this
    var shaiXuan = parseInt(e.currentTarget.dataset.shaixuan)
    if (shaiXuan == 0) {
      that.setData({
        shaiXuan: 0,
        fromProID: that.data.proList[0].proID,
        fromProIDX: that.data.proList[0].proID,
        toProID: that.data.proList[0].proID,
        toProIDX: that.data.proList[0].proID,
        fromCityID: 0,
        toCityID: 0,
        toCityName: "到达地",
        fromCityName: "出发地"
      })
      that.onPullDownRefresh()
    } else {
      if (shaiXuan != that.data.shaiXuan) {
        if (that.data.proList.length > 0) {
          for (let i = 0; i < that.data.proList.length; i++) {
            that.data.proList[i].select = false
            if (shaiXuan == 1) {
              if (that.data.proList[i].proID == that.data.fromProID) {
                that.data.proList[i].select = true
                that.requestCity(i)
              }
            } else if (shaiXuan == 2) {
              if (that.data.proList[i].proID == that.data.toProID) {
                that.data.proList[i].select = true
                that.requestCity(i)
              }
            }
          }
          that.setData({
            proList: that.data.proList
          })
        } else {
          that.requestSheng()
        }
        that.setData({
          shaiXuan: shaiXuan
        })
      } else {
        that.setData({
          shaiXuan: 0
        })
      }
    }
  },
  dismiss() {
    this.setData({
      shaiXuan: 0
    })
  },
  request() {
    var that = this
    var json = new Object()
    var jsonStr = ""
    if (that.data.toCityID > 0 && that.data.fromCityID > 0) {
      json.city = that.data.fromCityID
      json.tocity = that.data.toCityID
      jsonStr = JSON.stringify(json)
    } else {

    }
    var mod = "godds"
    wx.request({
      url: getApp().appData.host + "novaild_page", //仅为示例，并非真实的接口地址
      data: {
        "mod": mod,
        "json": jsonStr,
        "size": "10",
        "page": that.data.page,
        "token": getApp().md5(jsonStr + mod)
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        //请求成功
        if (res.data.state == 1) {
          if (that.data.page == 0) {
            that.data.rows = []
          }
          that.data.page = that.data.page + 1
          if (res.data.data.length > 0) {
            for (let i = 0; i < res.data.data[0].rows.length; i++) {
              res.data.data[0].rows[i].time = getApp().TimeFormatX(Date.parse(new Date()) - parseInt(res.data.data[0].rows[i].idate.substring(6, 19)))
              var fromSplit = res.data.data[0].rows[i].FromPlace.split("-")
              if (fromSplit.length > 0) {
                res.data.data[0].rows[i].fromSheng = fromSplit[0]
                if (fromSplit.length > 1) {
                  res.data.data[0].rows[i].fromShi = fromSplit[1]
                } else {
                  res.data.data[0].rows[i].fromShi = ""
                }
              } else {
                res.data.data[0].rows[i].fromSheng = ""
                res.data.data[0].rows[i].fromShi = ""
              }
              var toSplit = res.data.data[0].rows[i].ToPlace.split("-")
              if (toSplit.length > 0) {
                res.data.data[0].rows[i].toSheng = toSplit[0]
                if (toSplit.length > 1) {
                  res.data.data[0].rows[i].toShi = toSplit[1]
                } else {
                  res.data.data[0].rows[i].toShi = ""
                }
              } else {
                res.data.data[0].rows[i].toSheng = ""
                res.data.data[0].rows[i].toShi = ""
              }
            }
            Array.prototype.push.apply(that.data.rows, res.data.data[0].rows);
            that.setData({
              rows: that.data.rows,
            })
          } else {
            that.setData({
              rows: that.data.rows
            })
          }
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
  // 网络请求
  requestSheng: function() {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    wx.request({
      url: getApp().appData.host + "novaild_list", //仅为示例，并非真实的接口地址
      data: {
        "json": "",
        "mod": "provin",
        "token": getApp().md5("provin")
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        //请求成功
        if (res.data.state == 1) {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].select = false
          }
          res.data.data[0].select = true
          that.data.fromProID = res.data.data[0].proID
          that.data.fromProIDX = res.data.data[0].proID
          that.data.toProID = res.data.data[0].proID
          that.data.toProIDX = res.data.data[0].proID
          that.setData({
            proList: res.data.data
          })
          that.requestCity(0);
          // wx.hideLoading()
          that.setData({
            isfail: false,
          })
        } else { //请求失败
          that.setData({
            isfail: true,
          })
          wx.hideLoading()
        }
      },
      fail: function(res) {
        that.setData({
          isfail: true,
        })
        wx.hideLoading()
      },
      complete: function() {
        wx.stopPullDownRefresh();
      }
    })
  },
  // 网络请求
  requestCity: function(index) {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    wx.request({
      url: getApp().appData.host + "novaild_list", //仅为示例，并非真实的接口地址
      data: {
        "json": "{vin:" + that.data.proList[index].proID + "}",
        "mod": "city",
        "token": getApp().md5("{vin:" + that.data.proList[index].proID + "}" + "city")
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        //请求成功
        if (res.data.state == 1) {
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].select = false
            if (that.data.shaiXuan == 1) {
              if (res.data.data[i].cityID == that.data.fromCityID) {
                res.data.data[i].select = true
              }
            } else if (that.data.shaiXuan == 2) {
              if (res.data.data[i].cityID == that.data.toCityID) {
                res.data.data[i].select = true
              }
            }
          }
          that.setData({
            cityList: res.data.data,
          })
          wx.hideLoading()
          that.setData({
            isfail: false,
          })
        } else { //请求失败
          that.setData({
            isfail: true,
          })
          wx.hideLoading()
        }
      },
      fail: function(res) {
        that.setData({
          isfail: true,
        })
        wx.hideLoading()
      },
      complete: function() {
        wx.stopPullDownRefresh();
      }
    })
  },
})