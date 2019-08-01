<template>
    <div>
        <Row class="expand-row">
            <Col span="8">
                <span class="expand-key">id:</span>
                <span class="expand-value">{{ row.id }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">标题:</span>
                <span class="expand-value">{{ row.title }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">作者:</span>
                <span class="expand-value">{{ row.author }}</span>
            </Col>
        </Row>
        <Row class="expand-row">
            <Col span="8">
                <span class="expand-key">阅读量:</span>
                <span class="expand-value">{{ row.readed }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">发布时间:</span>
                <span class="expand-value">{{ row.publishTime }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">更新时间:</span>
                <span class="expand-value">{{ row.updateTime }}</span>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    props: {
        row: Object
    }
};
</script>

<style lang="less" scoped>
.expand-row {
    margin-bottom: 16px;

    .expand-key {
        display: inline-block;
        margin-right: 10px;
        color: #17233d;
        font-weight: bold;
    }
    .expand-value {
        color: #515a6e;
        font-size: 13px;
    }
}
</style>
