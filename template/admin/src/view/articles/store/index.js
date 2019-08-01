import { getArticles } from '../../../api/data';

export default {
    debug: true,
    state: {
        data: [],
        page: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        // queryInfo
        queryName: '',
        queryType: ''
    },
    // actions
    async getData({ page = 1, pageSize = 10, queryName = '', queryType = '' }) {
        let res = null;
        try {
            this.state.loading = true;
            res = await getArticles({ page, pageSize, queryName, queryType });

            const {
                data: { data }
            } = res;
            this.state.data = data;
            this.state.total = data.length;
        } catch (e) {
            throw e;
        } finally {
            this.state.loading = false;
        }
        return res;
    },
    setQueryName(value) {
        this.state.queryName = value;
    },
    setQueryType(value) {
        this.state.queryType = value;
    }
};
