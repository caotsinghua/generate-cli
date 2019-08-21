<template>
  <div class="container {{resourceName}}-table">
    <div class="header-search-wrap">
      <HeaderSearch></HeaderSearch>
    </div>
    <div class="header-actions">
      <Button type="primary" icon="md-add" @click="handleAddRow">新增</Button>
      <Button type="error" icon="md-trash" @click="handleBatchDelete" :disabled="selected.length === 0"
        >批量删除</Button
      >
      <Button type="primary" icon="md-out" @click="handleExportExcel">导出excel</Button>
    </div>
    <main>
      <Table
        border
        :data="data"
        :columns="columns"
        :loading="loading"
        :max-height="540"
        @on-selection-change="handleSelectionChange"
      >
        <template slot="actions" slot-scope="{ row }">
          <div class="row-actions">
            <Button type="primary" @click="handleEditRow(row)">编辑</Button>
            <Button type="error" @click="handleDeleteRow(row)">删除</Button>
          </div>
        </template>
      </Table>
      <Row type="flex" justify="end" style="margin-top:15px">
        <Col>
          <Page
            :current="page"
            :total="total"
            :page-size="pageSize"
            show-sizer
            show-total
            @on-change="handlePageChange"
            @on-page-size-change="handlePageSizeChange"
        /></Col>
      </Row>
    </main>
    <EditModal ref="edit-modal" />
  </div>
</template>

<script>
import HeaderSearch from './components/header-search';
import TableExpandRow from './components/table-expand-row';
import EditModal from './components/edit-modal';
import {mapState,mapActions} from 'vuex';
export default {
    name: '{{resourceName}}-table',
    components: {
        HeaderSearch,
        TableExpandRow,
        EditModal
    },
    computed: {
        ...mapState('{{resourceName}}',['data','page','pageSize','total','loading'])
    },
    data() {
        return {
            columns: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, { row }) =>
                        h(TableExpandRow, {
                            props: { row }
                        })
                },
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '#',
                    type: 'index',
                    align: 'center',
                    width: 70
                },
                {
                    title: 'id',
                    key: 'id',
                    align: 'center',
                    width: 70
                },
                {
                    title: '标题',
                    key: 'title',
                    align: 'center',
                    maxWidth: 500,
                    minWidth: 200
                },
                {
                    title: '作者',
                    key: 'author',
                    align: 'center'
                },
                {
                    title: '阅读量',
                    key: 'readed',
                    align: 'center'
                },
                {
                    title: '发布时间',
                    key: 'publishTime',
                    align: 'center',
                    ellipsis: true,
                    tooltip: true
                },
                {
                    title: '更新时间',
                    key: 'updateTime',
                    align: 'center',
                    ellipsis: true,
                    tooltip: true
                },
                {
                    title: '操作',
                    slot: 'actions',
                    align: 'center',
                    minWidth: 80
                }
            ],
            selected: ''
        };
    },
    mounted() {
        this.initData();
    },
    methods: {
        ...mapActions('{{resourceName}}',['getData','setQueryName','setQueryType']),
        initData() {
            this.getData();
        },
        handleEditRow(row) {
            this.$refs['edit-modal'].openModal(row.id);
        },
        handleAddRow() {
            this.$refs['edit-modal'].openModal();
        },
        handleDeleteRow(row) {
            this.$Modal.confirm({
                title: '警告',
                content: '确实要删除此行吗？',
                onOk: () => {
                    this.$Message.success('删除成功');
                }
            });
        },
        handleSelectionChange(selection) {
            if (selection.length === 0) {
                this.selected = '';
                return;
            }
            this.selected = selection.map(item => item.id).join(',');
        },
        handleBatchDelete() {
            this.$Modal.confirm({
                title: '警告',
                content: '确实要删除此行吗？',
                onOk: () => {
                    this.$Message.success('删除成功');
                }
            });
        },
        handleExportExcel() {},
        handlePageChange(page) {
            this.getData({page});
        },
        handlePageSizeChange(pageSize) {
            this.getData({pageSize})
        }
    }
};

</script>

<style lang="less" scoped>
.{{resourceName}}-table {
}
.header-search-wrap {
    margin: 10px 0 20px;
}
.header-actions {
    margin: 15px 0;
    button {
        margin-right: 10px;
    }
}
.row-actions {
    button {
        margin-right: 10px;
    }
}
</style>
