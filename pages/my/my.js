import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'

const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refresh();
    wx.setStorageSync('bookCount', this.data.bookCount);
  },

  refresh() {
    this.isGetUserInfo();
    bookModel.getBookCount().then(res => {
      this.setData({
        bookCount: res.count
      })
    });
    classicModel.getFavor((res) => {
      this.setData({
        classics:res
      })
    })
  },
  onGetUserInfo(e) {
    const userInfo = e.detail.userInfo;
    if (userInfo) {
      this.setData({
        authorized: true,
        userInfo
      })

    }
  },
  isGetUserInfo() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.setData({
                authorized: true,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  onJumpToAbout(e) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  onJumpToDetail(e) {
    const cid = e.detail.cid
    const type = e.detail.type
    // wx.navigateTo
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
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
    this.refresh();

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