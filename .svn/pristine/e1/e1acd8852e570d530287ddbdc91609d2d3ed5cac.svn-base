// pages/authentication/authentication.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    renZhengListRenZhengList: [],
    isAll: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      renZhengListRenZhengList: JSON.parse(options.value)
    })
    that.checkAll()
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
   * 检查全选
   */
  checkAll() {
    var that = this
    var isAll = true;
    for (let i = 0; i < that.data.renZhengListRenZhengList.length; i++) {
      if (!that.data.renZhengListRenZhengList[i].isCheck) {
        isAll = false
        break
      }
    }
    that.setData({
      isAll: isAll
    })
  },
  /**
   * 选择
   */
  checkboxChange(e) {
    var that = this
    console.log(e)
    for (let i = 0; i < that.data.renZhengListRenZhengList.length; i++) {
      that.data.renZhengListRenZhengList[i].isCheck = false
    }
    for (let i = 0; i < e.detail.value.length; i++) {
      that.data.renZhengListRenZhengList[e.detail.value[i]].isCheck = true
    }
    that.checkAll()
  },
  /**
   * 全选
   */
  checkboxAll: function(e) {
    var that = this
    if (that.data.isAll) {
      that.data.isAll = false
      for (let i = 0; i < that.data.renZhengListRenZhengList.length; i++) {
        that.data.renZhengListRenZhengList[i].isCheck = false
      }
    } else {
      that.data.isAll = true
      for (let i = 0; i < that.data.renZhengListRenZhengList.length; i++) {
        that.data.renZhengListRenZhengList[i].isCheck = true
      }
    }
    that.setData({
      renZhengListRenZhengList: that.data.renZhengListRenZhengList
    })
  },
  /**
   * 提交
   */
  tiJiaoTap() {
    var that = this
    var manageCert = "";
    for (let i = 0; i < that.data.renZhengListRenZhengList.length; i++) {
      if (that.data.renZhengListRenZhengList[i].isCheck) {
        manageCert = manageCert + that.data.renZhengListRenZhengList[i].renZheng + ","
      }
    }
    if (manageCert.length > 0) {
      manageCert = manageCert.substring(0, manageCert.length - 1)
    }
    getApp().appData.manageCert = manageCert
    getApp().shuaXin.manageCert = true
    wx.navigateBack({
      delta:1
    })
  },
})