import {
    HTTP
} from '../util/http-p.js'

class KeywordModel extends HTTP {
    key = 'q';
    maxLength = 10;
    getHistory() {
        const word = wx.getStorageSync(this.key);
        if (!word) {
            return [];
        }
        return word;
    }
    getHot() {
      return  this.request({
            url:"book/hot_keyword",
        })
    }
    addHistory(word) {
        const historyArr = this.getHistory();
        const has = historyArr.includes(word);
        if (!has) {
            if (historyArr.length >= this.maxLength) {
                historyArr.pop();
            }
            historyArr.unshift(word);
            wx.setStorageSync(this.key, historyArr)
        }
    }
}

export {
    KeywordModel
}