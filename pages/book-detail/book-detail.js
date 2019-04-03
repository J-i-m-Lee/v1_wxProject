import {
  BookModel
} from '../../models/book.js';
import { LikeModel } from '../../models/like.js';
const bookModel = new BookModel();
const likeModel = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: [],
    book: null,
    like: null,
    posting:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading();
    const bid = options.id;
    Promise.all([bookModel.getBookComment(bid), bookModel.getBookDetail(bid), bookModel.getBookLike(bid)]).then(res => {
      this.setData({
        comment: res[0].comments,
        book: res[1],
        like:res[2],
      })
      wx.hideLoading();
    })

    // bookModel.getBookComment(bid).then(res => {
    //   this.setData({
    //     comment:res.comments,
    //   })
    // });
    // bookModel.getBookDetail(bid).then(res => {
    //   this.setData({
    //     book:res,
    //   })
    // });
    // bookModel.getBookLike(bid).then(res => {
    //   this.setData({
    //     like:res,
    //   })
    // });
  },
  onLike(e) {
    const behavior = e.detail.behavior
    likeModel.clickLike(behavior,this.data.book.id,400)
  },
  onFakePost(e) {
    this.setData({
      posting: true,
    })
  },
  onCancel(e) {
    this.setData({
      posting: false,
    })
  },
  onPost(e) {
    const content = e.detail.text || e.detail.value;
    if (!content) {
      return
    };

    if (content.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    };

    bookModel.addBookComment(this.data.book.id, content).then(res => {
      wx.showToast({
        title: '+1',
        icon: 'none'
      });
      this.data.comment.unshift({
        content,
        nums: 1
      });

      this.setData({
        comment: this.data.comment,
        posting: false
      });
    });

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