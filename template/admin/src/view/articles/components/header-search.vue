<template>
    <div class="article-header-search">
        <Form :label-width="50" label-position="left">
            <Row :gutter="15">
                <Col :span="7">
                    <FormItem label="标题" style="margin-bottom:0">
                        <Input :value="articlesState.queryName" @on-change="handleNameChange" />
                    </FormItem>
                </Col>
                <Col :span="7">
                    <FormItem label="类型" style="margin-bottom:0">
                        <Input :value="articlesState.queryType" @on-change="handleTypeChange" />
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
import articleStore from '../store';
export default {
    data() {
        return {
            articlesState: articleStore.state
        };
    },
    methods: {
        handleNameChange(e) {
            articleStore.setQueryName(e.target.value);
        },
        handleTypeChange(e) {
            articleStore.setQueryType(e.target.value);
        },
        handleSearch() {
            articleStore.getData({});
        },
        handleReset() {
            this.articlesState.queryName = '';
            this.articlesState.queryType = '';
            articleStore.getData({});
        }
    }
};
</script>
