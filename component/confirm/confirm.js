// component/confirm.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: '标题'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSubmit: function (e) {
      this.setData({
        show: false
      })
    },
    handleConfirmHide: function () {
      this.setData({
        show: false
      })
    }
  }
})
