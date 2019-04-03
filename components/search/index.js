import {
  KeywordModel
} from '../../models/keyword.js';
import {
  BookModel
} from '../../models/book.js';
import {
  paginationBev
} from '../behaviors/pagination.js';
const keywordModel = new KeywordModel();
const bookModel = new BookModel();
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  attached() {
    this.setData({
      historyArr: keywordModel.getHistory(),
    });
    keywordModel.getHot().then(res => {
      this.setData({
        hotWordArr: res.hot,
      });
    });

  },

  /**
   * 组件的初始数据
   */
  data: {
    historyArr: [],
    hotWordArr:[],
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if (!this.data.q) {
        return;
      }
      if (this.data.loading) {
        return;
      }
      if (this.hasMore()) {
        this.setData({
          loading : true,
        });
        bookModel.search(this.data.q, this.getCurrentStart()).then(res => {
          this.setMoreData(res.books);
          this.setData({
            loading : false,
          });
        }, err => {
          this.setData({
            loading : false,
          });
        });
      }
    },
    onCancel(e) {
      this.triggerEvent('cancel', {}, {});
      this.initialize();
    },
    onDelete(e) {
      this.setData({
        searching: false,
        q:''
      });
      this.initialize();

    },
    onConfirm(e) {
      this.setData({
        searching:true,
      });
      this.setData({
        loadingCenter : true,
      });
      this.initialize();
      const q = e.detail.value || e.detail.text
      bookModel.search(q, 0).then(res => {
        this.setMoreData(res.books);
        this.setTotal(res.total)
        this.setData({
          loadingCenter : false,
          q
        });
        keywordModel.addHistory(q);
      });
    },
  }
})
