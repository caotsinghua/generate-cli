<template>
    <div class="{{resourceName}}-header-search">
        <Form :label-width="100" label-position="left">
            <Row :gutter="15">
                <Col :span="7">
                    <FormItem label="关键词" style="margin-bottom:0">
                        <Input v-model.trim="storeState.keyword" />
                    </FormItem>
                </Col>
                <Col :span="7">
                    <Button type="primary" @click="handleSearch" style="margin-right:10px">查询</Button>
                    <Button @click="handleReset">清空</Button>
                </Col>
            </Row>
        </Form>
    </div>
</template>

<script>
import store from '../store';
export default {
    data() {
        return {
            storeState: store.state
        };
    },
    methods: {
        handleSearch() {
            store.getData({page:1});
        },
        handleReset() {
            store.setQueryInfo({})
            this.handleSearch()
        }
    }
};
</script>
