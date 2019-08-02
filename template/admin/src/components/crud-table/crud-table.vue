<template>
    <div class="crud">
        <Row type="flex" justify="space-between" align="middle" class-name="header-actions">
            <Col :xs="24" :sm="24" :md="12">
                <Button v-if="hasAddBtn" type="primary" icon="md-add" @click="handleAdd" style="margin-right:10px;"
                    >添加</Button
                >
                <Button v-if="hasBatchDelBtn" type="error" icon="md-trash" @click="handleBatchDelete">批量删除</Button>
                <slot name="left-actions"></slot>
            </Col>
            <Col>
                <slot name="right-actions"></slot>
            </Col>
        </Row>
        <Table :data="dataSource" :columns="columns" :loading="loading" v-bind="this.$attrs">
            <template slot="row-actions" slot-scope="{ row }">
                <slot name="custom-row-actions" v-bind:row="row">
                    <div class="default-actions">
                        <Button v-if="hasRowEditBtn" type="primary" size="small" @click="handleEdit(row)">编辑</Button>
                        <Button v-if="hasRowDelBtn" type="error" size="small" @click="handleDelete(row)">删除</Button>
                    </div>
                </slot>
            </template>
        </Table>
        <Row type="flex" justify="end" style="margin:15px 0;" v-if="pageConfig">
            <Page v-bind="pageConfig" v-on="pageListeners" />
        </Row>
        <EditModal ref="edit-modal" />
    </div>
</template>

<script>
import CrudExpandRow from './table-expand-row';
import EditModal from './modal';
import { assignWithOutKeys, assignWithKeys } from './utils';

export default {
    name: 'mine-crud',
    inheritAttrs: false, // 不继承属性
    components: {
        CrudExpandRow,
        EditModal
    },
    props: {
        // ===============table props
        dataSource: {
            type: Array,
            default: () => []
        },
        columns: {
            // 支持iview-table columns的所有参数
            type: Array,
            default: () => []
        },
        loading: {
            type: Boolean,
            default: false
        },
        // ==============table props end
        // 列会传入表单中，需要传入以下属性
        /**
         * {
         * label:string,
         * prop:string,// 对应的字段
         * type:text|datetime|select,
         * dicts:[] //type===select?
         * }
         * 如果type为select
         * 则需要传入对应的select字典
         * dicts:[
         * {
         *  label:string,
         *  value:string
         * }
         * ]
         */
        formColumns: {
            type: Array,
            default: () => []
        },
        formData: {
            // 当前正在添加或编辑的表单数据
            type: Object,
            default: () => ({})
        },
        rules: {
            type: Object,
            default: () => ({})
        },
        hasRowDelBtn: {
            // 是否具有行内删除按钮
            type: Boolean,
            default: true
        },
        hasRowEditBtn: {
            // 是否具有行内编辑按钮
            type: Boolean,
            default: true
        },
        hasBatchDelBtn: {
            type: Boolean,
            default: true
        },
        hasAddBtn: {
            // 是否具有添加按钮
            type: Boolean,
            default: true
        },
        // 分页
        // 是否分页，有则必须配置pageConfig
        pageConfig: {
            // 配置分页信息
            type: Object,
            default: () => ({})
        },
        // 增加/编辑/删除,当提交请求时的处理函数，edit/delete传入当前row信息
        onCreateForm: Function,
        onUpdateForm: Function,
        onDeleteRow: Function
    },
    data() {
        return {
            parsedColumns: [],
            pageListeners: assignWithKeys(this.$listeners, ['on-change', 'on-page-size-change']),
            tableListeners: assignWithOutKeys(this.$listeners, ['on-change', 'on-page-size-change'])
        };
    },
    provide() {
        return {
            onCreateForm: this.onCreateForm,
            onUpdateForm: this.onUpdateForm,
            formData: this.formData,
            rules: this.rules,
            formColumns: this.formColumns,
            dataSource: this.dataSource,
            columns: this.columns
        };
    },
    created() {
        this.init();
        console.log(this.$attrs);
        console.log(this.$listeners);
    },
    methods: {
        init() {
            this.pushRowActionsToRow();
        },
        pushRowActionsToRow() {
            let columns = this.columns;
            if (!columns.find(item => item.slot === 'row-actions')) {
                columns.push({
                    title: '操作',
                    slot: 'row-actions'
                });
            }
            if (this.hasBatchDelBtn && !columns.find(item => item.type === 'selection')) {
                columns.unshift({
                    type: 'selection',
                    width: 50
                });
            }
            const expandColumnIdx = columns.findIndex(item => item.type === 'expand');
            if (expandColumnIdx > -1 && !columns[expandColumnIdx].render) {
                Object.assign(columns[expandColumnIdx], {
                    render: (h, { row }) =>
                        h(CrudExpandRow, {
                            props: {
                                row,
                                expandedColumns: columns[expandColumnIdx].expandedColumns,
                                colNum: columns[expandColumnIdx].colNum
                            }
                        })
                });
            }
            this.parsedColumns = columns;
        },
        handleEdit(row) {
            this.$refs['edit-modal'].openModal(row);
        },
        handleAdd() {
            this.$refs['edit-modal'].openModal();
        },
        handleDelete(row) {
            this.$Modal.confirm({
                title: '警告',
                content: '确定删除该行数据吗？',
                onOk: () => {
                    this.onDeleteRow(row);
                }
            });
        },
        handleBatchDelete() {
            this.$Modal.confirm({
                title: '警告',
                content: '确定删除zhexie数据吗？',
                onOk: () => {
                    this.onBatchDelete();
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.crud {
    .default-actions {
        text-align: center;
        button {
            margin-right: 10px;
        }
    }
    .header-actions {
        margin: 15px 0;
    }
}
</style>
