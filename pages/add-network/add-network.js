// pages/add-network/add-network.js
var WxNotificationCenter = require("../../WxNotificationCenter/WxNotificationCenter.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    profile: "",
    userInfo1: "",
    netDetail: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      profile: JSON.parse(options.bean),
      userInfo1: JSON.parse(options.bean1),
    })
    if (options.value) {
      that.setData({
        netDetail: JSON.parse(options.value)
      })
    } else {
      that.data.netDetail = new Object()
      var splitLink =that.data.profile.linkMan.split(",")
      if(splitLink.length>0){
        that.data.netDetail.linkMan = splitLink[0];
      }else{
        that.data.netDetail.linkMan = ""
      }
      var splitMobile = that.data.userInfo1.mobile.split(",")
      if(splitMobile.length>0){
        that.data.netDetail.mobile = splitMobile[0];
      }else{
        that.data.netDetail.mobile = "";
      }
      that.data.netDetail.ID = 0;
      that.data.netDetail.Vinc = "";
      that.data.netDetail.address = "";
      that.data.netDetail.city = 0;
      that.data.netDetail.cityName = "";
      that.data.netDetail.fax = "";
      that.data.netDetail.idate = "";
      that.data.netDetail.mID = 0;
      that.data.netDetail.pointName = "";
      that.data.netDetail.provin = 0;
      that.data.netDetail.qq = "";
      that.data.netDetail.shenhe = false;
      that.data.netDetail.tel = "";
      that.data.netDetail.town = 0;
      that.data.netDetail.townName = "";
      that.setData({
        netDetail: that.data.netDetail
      })
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
  /**
   * 跳转网点列表
   */
  wangDianTap(){
    var that =this
    WxNotificationCenter.postNotificationName(getApp().shuaXin.faBuWangDian);
    wx.redirectTo({
      url: '/pages/network-manage/network-manage?bean=' + JSON.stringify(that.data.profile) + "&bean1=" + JSON.stringify(that.data.userInfo1),
    })
  },
  /**
   * 选地址回调
   */
  chooseAddress(e) {
    var that = this
    console.log("回调", e)
    that.data.netDetail.provin = e.detail.proID
    that.data.netDetail.city = e.detail.cityID
    that.data.netDetail.town = e.detail.townID
  },
  /**
   * 提交
   */
  tiJiao(e) {
    console.log(e)
    var that = this
    var pointName = e.detail.value.pointName
    var linkMan = e.detail.value.linkMan
    var mobile = e.detail.value.mobile
    var tel = e.detail.value.tel
    var fax = e.detail.value.fax
    var qq = e.detail.value.qq
    var address = e.detail.value.address
    var proID = that.data.netDetail.provin
    var cityID = that.data.netDetail.city
    var townID = that.data.netDetail.town
    if (!pointName) {
      wx.showToast({
        title: '请输入网点名称',
      })
      return
    }
    if (!linkMan) {
      wx.showToast({
        title: '请输入联系人',
      })
      return
    }
    if (!getApp().checkPhone(mobile)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号',
        showCancel:false
      })
      return
    }
    if (proID == 0) {
      wx.showToast({
        title: '请选择详细地址',
      })
      return
    }
    if (!address) {
      wx.showToast({
        title: '请输入街道地址',
      })
      return
    }
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    var json = new Object()
    var mod = "netpoint"
    json.ID = that.data.netDetail.ID
    json.pointname = pointName
    json.contact = linkMan
    json.mobile = mobile
    json.tel = tel
    json.fax = fax
    json.qq = qq
    json.vin = proID
    json.city = cityID
    json.town = townID
    json.dress = address
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
          getApp().shuaXin.SHUA_XIN_TONG_JI = true
          that.setData({
            isfail: false,
          })
          wx.hideLoading()
          setTimeout(function() {
            if (that.data.netDetail.ID == 0) {
              wx.showToast({
                title: '发布成功',
              })
            } else {
              wx.showToast({
                title: '修改成功',
              })
            }
          }, 300)
          WxNotificationCenter.postNotificationName(getApp().shuaXin.faBuWangDian);
          wx.redirectTo({
            url: '/pages/network-manage/network-manage?bean=' + JSON.stringify(that.data.profile) + "&bean1=" + JSON.stringify(that.data.userInfo1),
          })
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
  }
})