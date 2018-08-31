// pages/area-select/area-select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countyShow: [false, false],
    proID: 0,
    proName: "",
    toCitys: "",
    proList: [],
    cityList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      proID: options.proid,
      toCitys: options.sid
    })
    that.requestSheng()
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
   * 提交
   */
  tiJiao() {
    var that = this
    var toCitys = ""
    for (var i = 0; i < that.data.cityList.length; i++) {
      var townList = that.data.cityList[i].townList
      if (townList) {
        for (var j = 0; j < townList.length; j++) {
          var has = false
          if (townList[j].select) {
            toCitys = toCitys + townList[j].townID + ","
            has = true
          }
          if (has) {
            toCitys = toCitys + that.data.cityList[i].cityID + ","
          }
        }
      }
    }
    if (!toCitys) {
      wx.showToast({
        title: '请选择到达地',
      })
      return
    }
    toCitys = toCitys.substring(0, toCitys.length - 1)
    console.log(toCitys)
    getApp().shuaXin.toProvin = that.data.proID
    getApp().shuaXin.toCitys = toCitys
    getApp().shuaXin.proName = that.data.proName
    console.log()
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * town选择
   */
  townTap(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var indexx = e.currentTarget.dataset.indexx
    console.log(index)
    console.log(indexx)
    that.data.cityList[index].townList[indexx].select = !that.data.cityList[index].townList[indexx].select
    /**
     * 检查全选
     */
    that.data.cityList[index].select = true
    for (let i = 0; i < that.data.cityList[index].townList.length; i++) {
      if (!that.data.cityList[index].townList[i].select) {
        that.data.cityList[index].select = false
        break
      }
    }
    that.setData({
      cityList: that.data.cityList
    })
  },
  /**
   * 全选
   */
  quanXuan(e) {
    var that = this
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index;
    that.data.cityList[index].select = !that.data.cityList[index].select
    if (that.data.cityList[index].townList.length > 0) {
      for (let i = 0; i < that.data.cityList[index].townList.length; i++) {
        that.data.cityList[index].townList[i].select = that.data.cityList[index].select
      }
    } else {
      that.requestTown(index)
    }
    that.setData({
      cityList: that.data.cityList
    })
  },
  /**
   * 展开和关闭
   */
  showCounty: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index;
    that.data.cityList[index].open = !that.data.cityList[index].open
    that.setData({
      cityList: that.data.cityList
    })
    if (that.data.cityList[index].townList.length > 0) {
      return
    }
    that.requestTown(index)
  },
  /**
   * 选择省份
   */
  proTap(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    for (var i = 0; i < that.data.proList.length; i++) {
      that.data.proList[i].select = false
    }
    that.data.proList[index].select = true
    that.setData({
      proList: that.data.proList
    })
    that.data.proID = that.data.proList[index].proID
    that.data.proName = that.data.proList[index].proName
    that.requestCity(that.data.proList[index].proID);
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
        console.log("获取省份", res.data)
        //请求成功
        if (res.data.state == 1) {
          if (that.data.proID != 0) {
            for (let i = 0; i < res.data.data.length; i++) {
              res.data.data[i].select = false
              if (res.data.data[i].proID == that.data.proID) {
                res.data.data[i].select = true
                that.data.proName = res.data.data[i].proName
              }
            }
          } else {
            for (let i = 0; i < res.data.data.length; i++) {
              res.data.data[i].select = false
            }
            res.data.data[0].select = true
            that.data.proID = res.data.data[0].proID
            that.data.proName = res.data.data[0].proName
          }
          that.setData({
            proList: res.data.data
          })
          that.requestCity(that.data.proID);
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
  requestCity: function(proID) {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    wx.request({
      url: getApp().appData.host + "novaild_list", //仅为示例，并非真实的接口地址
      data: {
        "json": "{vin:" + proID + "}",
        "mod": "city",
        "token": getApp().md5("{vin:" + proID + "}" + "city")
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        console.log("获取城市", res.data)
        //请求成功
        if (res.data.state == 1) {
          if (!that.data.toCitys) {
            that.data.cityList = res.data.data
            for (let i = 0; i < that.data.cityList.length; i++) {
              that.data.cityList[i].townList = []
              that.data.cityList[i].select = false
              that.data.cityList[i].open = false
            }
            that.data.cityList[0].open = true
            that.requestTown(0)
          } else {
            var split = that.data.toCitys.split(",")
            var cityList = []
            for (var i = 0; i < split.length; i++) {
              if (parseInt(split[i]) % 100 == 0) {
                cityList.push(parseInt(split[i]))
              }
            }
            that.data.cityList = res.data.data
            for (var i = 0; i < that.data.cityList.length; i++) {
              that.data.cityList[i].townList = []
              that.data.cityList[i].select = false
              that.data.cityList[i].open = false
              for (var j = 0; j < cityList.length; j++) {
                if (that.data.cityList[i].cityID == cityList[j]) {
                  var townList = []
                  for (var k = 0; k < split.length; k++) {
                    if (parseInt(split[k]) - cityList[j] > 0 && parseInt(split[k]) - cityList[j] < 100) {
                      townList.push(parseInt(split[k]))
                    }
                  }
                  that.data.cityList[i].checkList = townList
                  that.data.cityList[i].open = true
                  that.requestTown(i)
                }
              }
            }
          }
          that.setData({
            cityList: that.data.cityList,
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
  // 网络请求
  requestTown: function(index) {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    wx.request({
      url: getApp().appData.host + "novaild_list", //仅为示例，并非真实的接口地址
      data: {
        "json": "{city:" + that.data.cityList[index].cityID + "}",
        "mod": "town",
        "token": getApp().md5("{city:" + that.data.cityList[index].cityID + "}" + "town")
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        console.log("获取乡镇", res.data)
        //请求成功
        if (res.data.state == 1) {
          if (res.data.data) {
            if (res.data.data.length > 0) {
              for (let i = 0; i < res.data.data.length; i++) {
                if (that.data.cityList[index].select) {
                  res.data.data[i].select = true
                } else {
                  res.data.data[i].select = false
                  if (that.data.cityList[index].checkList) {
                    for (let j = 0; j < that.data.cityList[index].checkList.length; j++) {
                      if (that.data.cityList[index].checkList[j] == res.data.data[i].townID) {
                        res.data.data[i].select = true
                        break
                      }
                    }
                  }
                }
              }
              that.data.cityList[index].select = true
              for (let i = 0; i < res.data.data.length; i++) {
                if (!res.data.data[i].select) {
                  that.data.cityList[index].select = false
                }
              }
              console.log(that.data.cityList[index].select)
              that.data.cityList[index].townList = res.data.data
              that.setData({
                cityList: that.data.cityList
              })
            } else {

            }
          } else {

          }
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