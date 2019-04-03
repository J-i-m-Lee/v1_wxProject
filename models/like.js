import {HTTP} from '../util/http.js'
class LikeModel extends HTTP {
    clickLike(urlType,artId,category) {
        this.request({
            url: urlType === 'like' ? 'like' : 'like/cancel',
            method:'POST'
            ,data:{art_id:artId,type:category}
          })
    }

    getClassicLikeStatus(artId, category,cb) {
        this.request({
            url: 'classic/' + category + '/' + artId + '/favor',
            success: cb
          })
    }
}
export {LikeModel}