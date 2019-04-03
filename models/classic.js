import {HTTP} from '../util/http.js'
class ClassicModel extends HTTP {
    getLatest(cb) {
        this.request({
            url: "classic/latest",
            success: (res)=> {
                cb(res)
                this._setLatsetIndex(res.index)
                wx.setStorageSync(this._getKey(res.index), res)
            }
          })
    }
    getFavor(cb) {
        this.request({
            url: "classic/favor",
            success: (res)=> {
                cb(res)
            }
          })
    }
    getClassicData(index, nextOrPrevious, cb) {
        const key = nextOrPrevious === 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
        const classicData = wx.getStorageSync(key)
        if (!classicData) {
            this.request({
                url: "classic/"+ index +"/"+ nextOrPrevious,
                success: (res) => {
                    wx.setStorageSync(this._getKey(res.index), res)
                    cb(res)
                }
              })
        } else {
            cb(classicData)
        }
    }

    isFirst(index) {
        return index === 1? true:false
    }

    isLatest(index) {
        return index === this._getLatsetIndex()? true:false
    }
    _setLatsetIndex(index) {
        wx.setStorageSync('latest', index)
    }
    _getLatsetIndex() {
        return wx.getStorageSync('latest')
    }

    _getKey(index) {
        return 'classic' + index;
    }

}
export {ClassicModel}