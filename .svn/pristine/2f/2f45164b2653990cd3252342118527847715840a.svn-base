// component/popup/popup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type:Boolean,
      value:false
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
    hidePopup:function(){
      this.setData({
        show:false
      })
      this.triggerEvent('clickmask',{}); // 点击遮罩触发
    }
  }
})
