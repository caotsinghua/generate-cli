<template>
    <div class="{{resourceName}}-header-search">
        <Form :label-width="50" label-position="left">
            <Row :gutter="15">
                <Col :span="7">
                    <FormItem label="标题" style="margin-bottom:0">
                        <Input :value="{{resourceName}}State.queryName" @on-change="handleNameChange" />
                    </FormItem>
                </Col>
                <Col :span="7">
                    <FormItem label="类型" style="margin-bottom:0">
                        <Input :value="{{resourceName}}State.queryType" @on-change="handleTypeChange" />
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
import {{resourceName}}Store from '../store';
export default {
    data() {
        return {
            {{resourceName}}State: {{resourceName}}Store.state
        };
    },
    methods: {
        handleNameChange(e) {
            {{resourceName}}Store.setQueryName(e.target.value);
        },
        handleTypeChange(e) {
            {{resourceName}}Store.setQueryType(e.target.value);
        },
        handleSearch() {
            {{resourceName}}Store.getData({});
        },
        handleReset() {
            this.{{resourceName}}State.queryName = '';
            this.{{resourceName}}State.queryType = '';
            {{resourceName}}Store.getData({});
        }
    }
};
</script>
