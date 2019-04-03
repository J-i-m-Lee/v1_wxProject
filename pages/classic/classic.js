import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    first: false,
    latest: true,
    likeCount: 0,
    likeStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res) => {
      this.setData({
        classicData: res,
        likeCount: res.fav_nums,
        likeStatus:res.like_status
      })
    })
  },
  onLike(e) {
    const behavior = e.detail.behavior
    likeModel.clickLike(behavior,this.data.classicData.id,this.data.classicData.type)
  },
  onNext(e) {
    this._getClassicData("next")
  },
  onPrevious(e) {
    this._getClassicData("previous")
  },
  _getClassicData(nextOrPrevious) {
    classicModel.getClassicData(this.data.classicData.index, nextOrPrevious, (res) => {
      this._getClassicLike(res.id,res.type)
      this.setData({
        classicData: res,
        latest:classicModel.isLatest(res.index),
        first:classicModel.isFirst(res.index)
      })
    })
  },
  _getClassicLike(artId, category) {
    likeModel.getClassicLikeStatus(artId, category, (res) => {
      this.setData({
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      })
    })
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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})