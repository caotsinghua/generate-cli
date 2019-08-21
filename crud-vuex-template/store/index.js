import { get{{upperFirst resourceName}}s } from '@/api/{{resourceName}}';

export default {
    namespaced:true,
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
    mutations:{
        setData(state,payload){

        },
        setLoading(state,payload){
            state.loading=payload;
        }
    },
    // actions
    actions:{
        async getData({commit,state},query={}) {
            let res = null;
            let page=query.page||state.page;
            let pageSize=query.pageSize||state.pageSize;
            let queryName=query.queryName||state.queryName;
            let queryType=query.queryType||state.queryType;
            try {
                commit('setLoading',true);
                res = await get{{upperFirst resourceName}}s({ page, pageSize, queryName, queryType });
                const {
                    data: { data }
                } = res;
                commit('setData',data);
            } catch (e) {
                throw e;
            } finally {
                commit('setLoading',false);
            }
            return res;
        },
        setQueryName({state},value) {
            state.queryName = value;
        },
        setQueryType({state},value) {
            state.queryType = value;
        }
    }
};
