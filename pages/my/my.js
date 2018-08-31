// pages/my/my.js
var changeControl = 2016;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toastShow: false,
    numberList: ['0592-3799502', '0592-3698000'],
    userInfo: "",
    tongJi: "",
    menberTime: "",
    profile: "",
    company: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    changeControl = getApp().appData.changeControl - 1
    that.initData()
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
    var that = this
    if (changeControl != getApp().appData.changeControl) {
      that.setData({
        userInfo: getApp().appData.userInfo
      })
      this.initData()
      changeControl = changeControl + 1
    }
    if (getApp().shuaXin.SHUA_XIN_PROFILE) {
      wx.showLoading({
        title: '加载中……',
      })
      that.profile(false)
      getApp().shuaXin.SHUA_XIN_PROFILE = false
    }
    if (getApp().shuaXin.SHUA_XIN_USERINFO1) {
      wx.showLoading({
        title: '加载中……',
      })
      that.getUserInfo(false)
      getApp().shuaXin.SHUA_XIN_USERINFO1 = false
    }
    if (getApp().shuaXin.SHUA_XIN_COMPANY) {
      wx.showLoading({
        title: '加载中……',
      })
      that.company(false)
      getApp().shuaXin.SHUA_XIN_COMPANY = false
    }
    if (getApp().shuaXin.SHUA_XIN_TONG_JI) {
      wx.showLoading({
        title: '加载中……',
      })
      that.tongji()
      getApp().shuaXin.SHUA_XIN_TONG_JI = false
    }
  },

  /**
   * 初始化数据
   */
  initData() {
    var that = this
    if (getApp().appData.userInfo) {
      that.getUserInfo(true)
    } else {
      that.setData({
        userInfo: "",
        tongJi: "",
        menberTime: "",
        profile: "",
        company: "",
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 企业图片/荣誉证书/业绩案例
   */
  tuPianTap(e) {
    if (!getApp().appData.userInfo) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    wx.navigateTo({
      url: '/pages/companyPic/companyPic?type=' + e.currentTarget.dataset.type
    })
  },
  /**
   * 更换头像
   */
  chooseHeadTap() {
    var that = this
    var mod = ""
    var json = new Object()
    mod = "upphoto"
    json.oldphoto = that.data.profile.photo
    console.log(json.oldlogo)
    if (that.data.profile.photo) {
      wx.showActionSheet({
        itemList: [
          "查看",
          "重新上传"
        ],
        success(e1) {
          if (e1.tapIndex == 0) {
            wx.previewImage({
              urls: [that.data.profile.photoUrl],
            })
          } else if (e1.tapIndex == 1) {
            wx.navigateTo({
              url: '/cutInside/cutInside?mod=' + mod + "&json=" + JSON.stringify(json),
            })
          }
        }
      })
    } else {
      wx.navigateTo({
        url: '/cutInside/cutInside?mod=' + mod + "&json=" + JSON.stringify(json),
      })
    }
  },

  handleConsult: function() {
    this.setData({
      toastShow: true,
    })
  },

  /**
   * 获取用户信息
   */
  getUserInfo(isfrist) {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    var json = new Object()
    var mod = "userinfo"
    wx.request({
      url: getApp().appData.host + "vaild_one", //仅为示例，并非真实的接口地址
      data: {
        "mod": mod,
        "json": "",
        "token": getApp().appData.userInfo.token
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        //请求成功
        if (res.data.state == 1) {
          that.setData({
            isfail: false,
          })
          var menberTime = ""
          if (res.data.data.isMember) {
            menberTime = getApp().formatTime(parseInt(res.data.data.serviceEnd.substring(6, 19)))
          }
          that.setData({
            userInfo: res.data.data,
            menberTime: menberTime
          })
          if (isfrist) {
            that.profile(true)
          } else {
            wx.hideLoading()
          }
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
  /**
   * 个人信息
   */
  profile(isfrist) {
    var that = this
    var json = new Object()
    var mod = "profile"
    wx.request({
      url: getApp().appData.host + "vaild_one", //仅为示例，并非真实的接口地址
      data: {
        "mod": mod,
        "json": "",
        "token": getApp().appData.userInfo.token
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        //请求成功
        if (res.data.state == 1) {
          that.setData({
            isfail: false,
          })
          that.setData({
            profile: res.data.data
          })
          if (isfrist) {
            that.company(true)
          } else {
            wx.hideLoading()
          }
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
  /**
   * 公司信息
   */
  company(isFrist) {
    var that = this
    var json = new Object()
    var mod = "company"
    wx.request({
      url: getApp().appData.host + "vaild_one", //仅为示例，并非真实的接口地址
      data: {
        "mod": mod,
        "json": "",
        "token": getApp().appData.userInfo.token
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        //请求成功
        if (res.data.state == 1) {
          that.setData({
            isfail: false,
          })
          that.setData({
            company: res.data.data
          })
          if (isFrist) {
            that.tongji()
          } else {
            wx.hideLoading()
          }
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
  /**
   * 统计
   */
  tongji() {
    var that = this
    var json = new Object()
    var mod = "tongji"
    wx.request({
      url: getApp().appData.host + "vaild_one", //仅为示例，并非真实的接口地址
      data: {
        "mod": mod,
        "json": "",
        "token": getApp().appData.userInfo.token
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function(res) {
        //请求成功
        if (res.data.state == 1) {
          wx.hideLoading()
          that.setData({
            isfail: false,
          })
          that.setData({
            tongJi: res.data.data
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
  },
  /**
   * 用户信息
   */
  userInfoTap() {
    if (!getApp().appData.userInfo) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    wx.navigateTo({
      url: '/pages/userInfo/userInfo?bean=' + JSON.stringify(this.data.profile) + "&bean1=" + JSON.stringify(this.data.userInfo),
    })
  },
  /**
   * 企业信息
   */
  companyTap() {
    if (!getApp().appData.userInfo) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    wx.navigateTo({
      url: '/pages/companyInfo/companyInfo?bean=' + JSON.stringify(this.data.company),
    })
  },
  /**
   * 货源管理
   */
  huoYuanTap() {
    if (!getApp().appData.userInfo) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    wx.navigateTo({
      url: '/pages/source-manage/source-manage?bean=' + JSON.stringify(this.data.profile) + "&bean1=" + JSON.stringify(this.data.userInfo),
    })
  },
  /**
   * 网点管理
   */
  wangDianTap() {
    if (!getApp().appData.userInfo) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    wx.navigateTo({
      url: '/pages/network-manage/network-manage?bean=' + JSON.stringify(this.data.profile) + "&bean1=" + JSON.stringify(this.data.userInfo),
    })
  },
  /**
   * 专线管理
   */
  zhuanXianTap() {
    if (!getApp().appData.userInfo) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    wx.navigateTo({
      url: '/pages/line-manage/line-manage?bean=' + JSON.stringify(this.data.userInfo),
    })
  },
  /**
   * 企业标志
   */
  qiYeBiaoZhiTap() {
    if (!getApp().appData.userInfo) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    wx.navigateTo({
      url: '/pages/companyLogo/companyLogo?bean=' + JSON.stringify(this.data.userInfo),
    })
  },
  /**
   * 搜索
   */
  search(){
    wx.navigateTo({
      url: '/pages/company/company',
    })
  },
  /**
   * 意见反馈
   */
  yiJianTap(){
    if (!getApp().appData.userInfo) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    wx.navigateTo({
      url: '/pages/feedback-list/feedback-list',
    })
  }
})