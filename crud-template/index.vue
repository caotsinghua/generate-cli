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
    </div>
    <main>
      <Table
        border
        :data="storeState.data"
        :columns="columns"
        :loading="storeState.loading"
        :max-height="540"
        @on-selection-change="handleSelectionChange"
      >
        <template slot="actions" slot-scope="{ row }">
          <div class="row-actions">
            <Button size="small" type="primary" @click="handleShowRow(row)">查看</Button>
            <Button size="small" type="primary" @click="handleEditRow(row)">编辑</Button>
            <Button size="small" type="error" @click="handleDeleteRow(row)">删除</Button>
          </div>
        </template>
      </Table>
      <Row type="flex" justify="end" style="margin-top:15px">
        <Col>
          <Page
            :current="storeState.page"
            :total="storeState.total"
            :page-size="storeState.pageSize"
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
import store from './store';
export default {
  name: '{{resourceName}}-table',
  components: {
    HeaderSearch,
    TableExpandRow,
    EditModal
  },
  data() {
    return {
      storeState: store.state,
      columns: [
        // {
        //     type: 'expand',
        //     width: 50,
        //     render: (h, { row }) =>
        //         h(TableExpandRow, {
        //             props: { row }
        //         })
        // },
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
    initData() {
      store.getData();
    },
    handleEditRow(row) {
      this.$refs['edit-modal'].show(row);
    },
    handleAddRow() {
      this.$refs['edit-modal'].show();
    },
    handleShowRow(row) {
      this.$refs['edit-modal'].show(row, true);
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
    handlePageChange(page) {
      if (page === this.storeState.page) return;
      store.getData({ page });
    },
    handlePageSizeChange(pageSize) {
      store.getData({ page: 1, pageSize });
    }
  }
};
</script>

<style lang="less" scoped>
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
