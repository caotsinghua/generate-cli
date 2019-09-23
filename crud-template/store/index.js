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
    state: {
        data: [],
        page: 1,
        pageSize: 10,
        total: 0,
        loading: false,
        // queryInfo
        queryInfo:{
            keyword:''
        }
    },
    // actions
    async getData(query={}) {
        const page=query.page||this.state.page;
        const pageSize=query.pageSize||this.state.pageSize;
        this.state.page=page;
        this.state.pageSize=pageSize;
        try {
            this.state.loading = true;
            // TODO:change
            const { data } = await get{{upperFirst resourceName}}s(query);
            this.state.data = data.data.list;
            this.state.total = data.data.totalCount;
        } catch (e) {
            throw e;
        } finally {
            this.state.loading = false;
        }
    },
    setQueryInfo(query){
        this.state.queryInfo=query;
    },
    clear(){
        Object.assign(this.state,{
            data: [],
            page: 1,
            pageSize: 10,
            total: 0,
            loading: false,
            // queryInfo
            queryInfo:{}
        })
    }
};
