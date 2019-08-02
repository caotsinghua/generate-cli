<template>
    <Form ref="form" :model="formData" :label-width="70" :rules="rules" label-position="right">
        <Row class-name="form-row" :gutter="10" v-for="(row, idx) in columns" :key="idx">
            <Col :xs="xs" :sm="xs" :md="md" v-for="col in row" :key="col.label">
                <FormItem :label="col.label" :prop="col.prop">
                    <Input
                        v-if="col.type !== 'date' && col.type !== 'datetime' && col.type !== 'select'"
                        :type="col.type"
                        v-model="formData[col.prop]"
                        :placeholder="`请输入${col.label}...`"
                        :disabled="loading"
                    />
                    <Select v-if="col.type === 'select'" v-model="formData[col.prop]" clearable :disabled="loading">
                        <Option v-for="item in col.dicts" :value="item.value" :key="item.value">{{
                            item.label
                        }}</Option>
                    </Select>
                    <DatePicker
                        v-if="col.type === 'date' || col.type === 'datetime'"
                        v-model="formData[col.prop]"
                        :type="col.type"
                        :format="col.format"
                        :placeholder="`请选择${col.label}`"
                        :disabled="loading"
                    ></DatePicker>
                </FormItem>
            </Col>
        </Row>
    </Form>
</template>

<script>
/**
 * formColumns:array:[
 * {
 *  label:string,
 *  prop:string,
 *  type:string,// input支持的type | select | date|datetime,
 *  format:string//见iview的datepicker的format参数
 *  dicts:[
 *    {
 *      label:string,
 *      value:string
 *    }
 *  ]
 * }
 * ]
 */
export default {
    inject: ['formData', 'onCreateForm', 'onUpdateForm', 'rules', 'formColumns'],
    props: ['loading'],
    data() {
        return {
            colNum: 2, // 每行几个formitem
            md: 12, // 大于md尺寸时每列宽度
            xs: 24, // 小尺寸时每列宽度
            columns: [],
            isEdit: false
        };
    },
    created() {
        this.initConfig();
    },
    methods: {
        initConfig() {
            const columns = [];
            let cur = -1;
            for (let i = 0; i < this.formColumns.length; i++) {
                if (i % this.colNum === 0) {
                    columns[++cur] = [];
                }
                const temp = this.formColumns[i];
                columns[cur].push({
                    label: temp.label,
                    prop: temp.prop,
                    type: temp.type,
                    dicts: temp.dicts || [],
                    format: temp.format
                });
            }
            this.columns = columns;
        },
        initForm(row) {
            this.isEdit = !!row;
            if (row) {
                // 直接用列表初始化表单
                Object.assign(this.formData, row);
            }
        },
        async submit() {
            const valid = await this.$refs['form'].validate();
            if (valid) {
                try {
                    if (this.isEdit) {
                        // 更新
                        await this.onUpdateForm(this.formData);
                    } else {
                        // 创建
                        await this.onCreateForm(this.formData);
                    }
                    this.$emit('close-modal');
                } catch (e) {
                    throw e;
                }
            }
        },
        clearForm() {
            this.$refs['form'].resetFields();
        }
    }
};
</script>

<style lang="less" scoped>
.form-row {
}
</style>
