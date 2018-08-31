// pages/feedback-list/feedback-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listStyle: ['', '', ''],
    startX: 0,
    delBtnWidth: 104,
    arrowDown: [false, false],
    page: 0,
    rows: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.page = 0
    this.qiYe()
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
    var that = this
    wx.showLoading({
      title: '加载中……',
      mask: true
    })
    that.data.page = 0
    that.qiYe()
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
    that.data.page = that.data.page + 1
    that.qiYe()
  },

  qiYe() {
    var that = this
    var json = new Object()
    var mod = "userfeed"
    wx.request({
      url: getApp().appData.host + "vaild_page", //仅为示例，并非真实的接口地址
      data: {
        "mod": mod,
        "json": "",
        "size": "10",
        "page": that.data.page,
        "token": getApp().appData.userInfo.token
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
              res.data.data[0].rows[i].show = false
              res.data.data[0].rows[i].time = getApp().formatTime(parseInt(res.data.data[0].rows[i].idate.substring(6, 19)))
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

  touchS: function(e) {
    var that = this;
    if (e.touches.length == 1) {
      var startX = e.touches[0].clientX;
      that.setData({
        startX: startX
      })
    }
  },
  touchM: function(e) {
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
      that.data.rows[index].listStyle = style;
      //更新列表的状态
      that.setData({
        rows: that.data.rows
      })
    }
  },
  touchE: function(e) {
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
      that.data.rows[index].listStyle = style;
      //更新列表的状态
      that.setData({
        rows: that.data.rows
      })
    }
  },

  showContent: function(e) {
    var index = e.currentTarget.dataset.index;
    this.data.rows[index].show = !this.data.rows[index].show
    this.setData({
      rows: this.data.rows
    })
  }
})