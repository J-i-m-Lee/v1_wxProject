// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: String,
      observer(newVal, oldVal, changePath) {
        let val = newVal < 10 ? '0' + newVal : newVal
        this.setData({
          _count:val
        })
      }
    }

  },
  attached() {
    let date = new Date()
    this.setData({
      month:this.data.monthList[date.getMonth()],
      year:date.getFullYear()
    })
  },
  /**
   * 组件的初始数据
   */
  data: {
    monthList:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    _count:'',
    month:0,
    year:''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
