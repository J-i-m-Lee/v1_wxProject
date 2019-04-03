import {
  classicBeh
} from '../classic_beh.js'
const mMgr = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    playBtn: "./images/player@play.png",
    pauseBtn: "./images/player@pause.png",
  },
  attached(e) {
    this._resetStatus()
    this._monitorSwitch()
  },
  detached(e) {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(e) {
      if (!this.data.playing) {
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
      } else {
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },
    _resetStatus() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src === this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },
    //监视手机上的播放器事件
    _monitorSwitch() {
      mMgr.onPlay(() => {
        this._resetStatus()
      })
      mMgr.onPause(() => {
        this._resetStatus()
      })
      mMgr.onStop(() => {
        this._resetStatus()
      })
      mMgr.onEnded(() => {
        this._resetStatus()
      })
    }
  }

})
