<template>
    <Form ref="article-form" :model="form" :label-width="100" :rules="rules">
        <Row class-name="form-row" :gutter="15">
            <Col :xs="24" :sm="24" :md="12">
                <FormItem label="title" prop="title">
                    <Input v-model="form.title" placeholder="please input here" />
                </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="12">
                <FormItem label="author" prop="author">
                    <Input v-model="form.author" placeholder="please input here" />
                </FormItem>
            </Col>
        </Row>
        <Row class-name="form-row" :gutter="15">
            <Col :xs="24" :sm="24" :md="12">
                <FormItem label="readed" prop="readed">
                    <Input v-model="form.readed" placeholder="please input here" />
                </FormItem>
            </Col>
            <Col :xs="24" :sm="24" :md="12">
                <FormItem label="publishTime" prop="publishTime">
                    <DatePicker v-model="form.publishTime" placeholder="please input here" type="datetime" />
                </FormItem>
            </Col>
        </Row>
        <Row class-name="form-row" :gutter="15">
            <Col :xs="24" :sm="24" :md="12">
                <FormItem label="updateTime" prop="updateTime">
                    <DatePicker v-model="form.updateTime" placeholder="please input here" type="datetime" />
                </FormItem>
            </Col>
        </Row>
    </Form>
</template>

<script>
import { updateArticle, createArticle, getArticle } from '../../../api/data';
export default {
    data() {
        return {
            form: {
                title: '',
                author: '',
                readed: 0,
                publishTime: '',
                updateTime: ''
            },
            rules: {
                title: [
                    {
                        required: true,
                        message: '该字段不能为空'
                    }
                ],
                author: [
                    {
                        required: true,
                        message: '该字段不能为空'
                    }
                ],
                readed: [
                    {
                        required: true,
                        message: '该字段不能为空'
                    }
                ],
                publishTime: [
                    {
                        required: true,
                        message: '该字段不能为空'
                    }
                ],
                updateTime: [
                    {
                        required: true,
                        message: '该字段不能为空'
                    }
                ]
            },
            isEdit: false
        };
    },
    methods: {
        async initData(id) {
            this.id = id; // number|string|undefined
            this.isEdit = !!id; // boolean
            if (this.id) {
                const data = await getArticle(id);
                Object.assign(this.form, data);
            }
        },
        async submit() {
            const valid = await this.$refs['article-form'].validate();
            let success;
            if (valid) {
                try {
                    if (this.isEdit) {
                        const res = await updateArticle(this.form);
                        success = res.data.success;
                    } else {
                        const res = await createArticle(this.form);
                        success = res.data.success;
                    }
                } catch (e) {
                    this.$Message.error('操作失败');
                }
                if (success) {
                    this.$Message.success('操作成功');
                    this.clearForm();
                } else {
                    this.$Message.error('参数错误');
                }
                return success;
            } else {
                return false;
            }
        },
        clearForm() {
            this.$refs['article-form'].resetFields();
        }
    }
};
</script>

<style lang="less" scoped>
.form-row {
}
</style>
