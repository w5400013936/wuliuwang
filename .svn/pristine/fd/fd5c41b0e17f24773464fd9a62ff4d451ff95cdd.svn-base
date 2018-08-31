// pages/source-manage/source-manage.js 
var WxNotificationCenter = require("../../WxNotificationCenter/WxNotificationCenter.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: false,
    listStyle: ['', ''],
    startX: 0,
    delBtnWidth: 416,
    confirmShow: false,
    profile: "",
    userInfo1: "",
    enable: false,
    page: 0,
    adapter: [],
    isAllCheck: false,
    totalPage: 1,
    pageArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      profile: JSON.parse(options.bean),
      userInfo1: JSON.parse(options.bean1)
    })
    that.setData({
      page: 0
    })
    that.request()
    WxNotificationCenter.addNotification(getApp().shuaXin.faBuHuoYuan, that.guanBi, that)
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
    WxNotificationCenter.removeNotification(getApp().shuaXin.faBuHuoYuan, this)
  },
  guanBi() {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 选择
   */
  checkTap(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    that.data.adapter[index].isCheck = !that.data.adapter[index].isCheck
    that.setData({
      adapter: that.data.adapter
    })
    that.data.isAllCheck = true
    for (var i = 0; i < that.data.adapter.length; i++) {
      if (!that.data.adapter[i].isCheck) {
        that.data.isAllCheck = false
        break
      }
    }
    console.log(that.data.isAllCheck)
    that.setData({
      isAllCheck: that.data.isAllCheck
    })
  },
  /**
   * 警告
   */
  warnTap() {
    wx.showModal({
      title: '提示',
      content: '审核中……',
      showCancel: false
    })
  },
  /**
   * 上一页
   */
  shangYiYe() {
    var that = this
    if (!that.data.enable) {
      return
    }
    if ((that.data.page + 1) > 1) {
      that.setData({
        page: that.data.page - 1
      })
    } else {
      return
    }
    that.request();
  },
  /**
   * 下一页
   */
  xiaYiYe() {
    var that = this
    if (!that.data.enable) {
      return
    }
    if ((that.data.page + 1) < that.data.totalPage) {
      that.setData({
        page: that.data.page + 1
      })
    } else {
      wx.showToast({
        title: '没有更多页了',
      })
      return
    }
    that.request()
  },
  /**
   * 页码选择
   */
  bindPickerChange(e) {
    var that = this
    console.log(e.detail.value)
    that.setData({
      page: parseInt(e.detail.value)
    })
    that.request()
  },
 
  /**
   * 获取ID 
   */
  getIntegers(tips) {
    var that = this
    var integerList = []
    for (var i = 0; i < that.data.adapter.length; i++) {
      if (that.data.adapter[i].isCheck) {
        integerList.push(that.data.adapter[i].ID)
      }
    }
    if (integerList.length == 0) {
      return ""
    }
    return integerList.join(",")
  },
  /**
   * 删除
   */
  delTap() {
    var that = this
    if (!that.data.enable) {
      return
    }
    var that = this
    if (!that.data.enable) {
      return
    }
    var idStr = that.getIntegers()
    if (!idStr) {
      wx.showModal({
        title: '提示',
        content: "请选择要删除的货源",
        showCancel: false
      })
      return
    }
    that.shanChu(idStr)
  },
  /**
   * 单个删除
   */
  shanChuTap(e) {
    this.shanChu(e.currentTarget.dataset.id)
  },
  /**
   * 删除
   */
  shanChu(idStr) {
    var that = this
    wx.showModal({
      title: '提示',
      content: "确定要删除吗？",
      success(e) {
        if (e.confirm) {
          wx.showLoading({
            title: '加载中……',
            mask: true
          })
          that.setData({
            enable: false
          })
          var json = new Object()
          var mod = "goddsdel"
          json.ids = idStr
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
            success: function (res) {
              //请求成功
              if (res.data.state == 1) {
                setTimeout(function () {
                  wx.showToast({
                    title: '删除成功',
                  })
                }, 300)
                getApp().shuaXin.SHUA_XIN_TONG_JI = true
                that.request()
                that.setData({
                  isfail: false,
                  enable: true
                })
                wx.hideLoading()
              } else { //请求失败
                that.setData({
                  isfail: true,
                })

              }
            },
            fail: function (res) {
              that.setData({
                isfail: true,
              })
            },
            complete: function () {
              wx.stopPullDownRefresh();
            }
          })
        }
      }
    })
  },
  /**
   * 全选
   */
  quanXuan() {
    var that = this
    if (!that.data.enable) {
      return
    }
    that.setData({
      isAllCheck: !that.data.isAllCheck
    })
    for (var i = 0; i < that.data.adapter.length; i++) {
      that.data.adapter[i].isCheck = that.data.isAllCheck
    }
    that.setData({
      adapter: that.data.adapter
    })
  },
  /**
   * 货源管理列表
   */
  request() {
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    that.setData({
      enable: false
    })
    var json = new Object()
    var mod = "godds"
    wx.request({
      url: getApp().appData.host + "vaild_page", //仅为示例，并非真实的接口地址
      data: {
        "mod": mod,
        "json": "",
        "page": that.data.page,
        "size": 20,
        "token": getApp().appData.userInfo.token
      },
      header: {
        'content-type': 'application/json', // 默认值
      },
      method: 'POST',
      success: function (res) {
        //请求成功
        if (res.data.state == 1) {
          var pointBean = res.data.data
          that.data.adapter = []
          var list = []
          if (pointBean) {
            if (pointBean.length > 0) {
              list = pointBean[0].rows
              that.data.totalPage = parseInt(pointBean[0].total / 20)
              if (pointBean[0].total % 20 > 0) {
                that.data.totalPage = that.data.totalPage + 1
              }
            }
          } else {

          }
          var listPage = []
          for (var i = 1; i <= that.data.totalPage; i++) {
            listPage.push(i + "")
          }
          that.setData({
            pageArr: listPage
          })
          for (var i = 0; i < list.length; i++) {
            list[i].isCheck = that.data.isAllCheck
            list[i].shuaXinTime = getApp().formatTimeX(parseInt(list[i].idate.substring(6, 19)))
          }
          that.setData({
            isfail: false,
            adapter: list,
            enable: true
          })
          wx.hideLoading()
        } else { //请求失败
          that.setData({
            isfail: true,
          })

        }
      },
      fail: function (res) {
        that.setData({
          isfail: true,
        })
      },
      complete: function () {
        wx.stopPullDownRefresh();
      }
    })
  },

  bianJiTap(e) {
    wx.navigateTo({
      url: '/pages/add-source/add-source?bean=' + JSON.stringify(this.data.profile) + "&bean1=" + JSON.stringify(this.data.userInfo1) + "&value=" + JSON.stringify(e.currentTarget.dataset.item),
    })
  },

  /**
   * 添加货源
   */
  addNet() {
    wx.navigateTo({
      url: '/pages/add-source/add-source?bean=' + JSON.stringify(this.data.profile) + "&bean1=" + JSON.stringify(this.data.userInfo1),
    })
  },

  touchS: function (e) {
    var that = this;
    if (e.touches.length == 1) {
      var startX = e.touches[0].clientX;
      that.setData({
        startX: startX
      })
    }
  },
  touchM: function (e) {
    var that = this;
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = that.data.delBtnWidth;
      var style = "";
      if (disX == 0 || disX < 0) { //如果移动距离小于等于0，文本层位置不变
        style = "left:0;transition: left 0.5s;";
      } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离
        style = "left:-" + disX + "rpx;";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "rpx;";
        }
      }

      var index = e.currentTarget.dataset.index;
      that.data.adapter[index].listStyle = style;
      //更新列表的状态
      that.setData({
        adapter: that.data.adapter
      })
    }
  },
  touchE: function (e) {
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var style = disX > 130 ? "left:-" + delBtnWidth + "rpx;transition: left 0.5s;" : "left:0;transition: left 0.5s;";

      var index = e.currentTarget.dataset.index;
      that.data.adapter[index].listStyle = style;
      //更新列表的状态
      that.setData({
        adapter: that.data.adapter
      })
    }
  }
})