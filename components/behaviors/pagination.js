export const paginationBev = Behavior({
    data: {
        booksArr:[],
        total: null,
        noneResult: false,
    },
    methods: {
        setMoreData(dataArray) {
            this.setData({
                booksArr: this.data.booksArr.concat(dataArray),
              });
        },

        getCurrentStart() {
            return this.data.booksArr.length;
        },

        setTotal(total) {
            this.data.total = total;
            if (total == 0) {
                this.setData({
                    noneResult: true,
                })

            }
        },

        hasMore() {
            if (this.data.booksArr.length >= this.data.total) {
                return false;
            } else {
                return true;
            }
        },
        initialize() {
            this.setData({
                booksArr: [],
                noneResult: false,
            })
            this.data.total = null;
        },
    },
})