<template>
    <div class="{{resourceName}}-header-search">
        <Form :label-width="50" label-position="left" @submit.prevent.stop>
            <Row :gutter="15">
                <Col :span="7">
                    <FormItem label="标题" style="margin-bottom:0">
                        <Input v-model.trim="queryInfo.keyword" />
                    </FormItem>
                </Col>
                <Col :span="7">
                    <Button type="primary" @click="handleSearch" style="margin-right:10px">搜索</Button>
                    <Button @click="handleReset">清空</Button>
                </Col>
            </Row>
        </Form>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex';
export default {
    data(){
        return {
            queryInfo:{
                keyword:''
            }
        }
    },
    methods: {
        ...mapActions('{{resourceName}}',['getData','setQueryInfo']),
        handleSearch() {
            this.setQueryInfo(this.queryInfo)
            this.getData({page:1});
        },
        handleReset() {
            this.setQueryInfo({})
            this.getData({page:1,pageSize:10});
        }
    }
};
</script>
