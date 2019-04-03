import {
    HTTP
} from '../util/http-p.js'
class BookModel extends HTTP {
    getBookList() {
        return this.request({
            url: 'book/hot_list'
        })
    }
    getBookCount() {
        return this.request({
            url: 'book/favor/count'
        })
    }

    search(q,start) {
        return this.request({
            url: "book/search?summary=1",
            data: {
                q: q,
                start:start,
            }
        })
    }
    getBookComment(id) {
        return this.request({
            url: `book/${id}/short_comment`
        })
    }
    getBookLike(id) {
        return this.request({
            url: `book/${id}/favor`
        })
    }
    getBookDetail(id) {
        return this.request({
            url: `book/${id}/detail`
        })
    }
    addBookComment(id, content) {
        return this.request({
            url: 'book/add/short_comment',
            data: {
                book_id: id,
                content
            },
            method: 'POST'
        })
    }


}
export {
    BookModel
}