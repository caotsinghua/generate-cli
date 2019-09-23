const get{{upperFirst resourceName}}s=()=>{
    return {
        data: {
            data: {
                list: [
                    {
                        id: 1,
                        title: 'aa',
                        author: 'james'
                    }
                ],
                totalCount: 1
            }
        }
    }
}

export default {
    namespaced:true,
    state: {
        data: [],
        page: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        // queryInfo
        queryInfo:{}
    },
    mutations:{
        setData(state,payload){
            state.data=payload.data.list;
            state.total=payload.data.totalCount;
        },
        setLoading(state,payload){
            state.loading=payload;
        },
        setQueryInfo(state,queryInfo){
            state.queryInfo=queryInfo;
        }
    },
    // actions
    actions:{
        async getData({commit,state},query={}) {
            let page=query.page||state.page;
            let pageSize=query.pageSize||state.pageSize;
            let queryInfo={...state.queryInfo}
            try {
                commit('setLoading',true);
                const {data} = await get{{upperFirst resourceName}}s({ page, pageSize, ...queryInfo });
                commit('setData',data);
            } catch (e) {
                throw e;
            } finally {
                commit('setLoading',false);
            }
        },
        setQueryInfo({commit},queryInfo){
            commit('setQueryInfo',queryInfo)
        }
    }
};
