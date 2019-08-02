## mine-crud
涉及组件：table，page，button，Modal，Form

功能：
- 表格
  - [x] 根据columns渲染列表，获取data
  - [x] 分页（与iview-page一致）
  - [x] 定义详情显示字段（通过expand）
  - [x] 多选，批量删除或其他批量操作
    - :hasBatchDelBtn 只控制多选按钮和删除按钮的显示，具体逻辑自行实现
    - 自己写@on-selection-change逻辑，
    - 批量删除按钮需要传入:onBatchDelete,无参数，自己处理多选的数据集
  - [ ] 导出csv

- 表单
  - [x] 修改数据，删除数据，添加数据（弹出框）
  - [o] 自定义弹出框内容（自定义行操作按钮，覆盖原操作）
  - [ ] 表单上传图片
  - [ ] 表单分组（template形式难搞，需jsx模式）
    ```
    [
      {
        group:'基本信息',
        children:[
          {
            label,prop...
          }
        ]
      }
    ]
    ```

### 示例
```
<template>
    <div>
        <h1>crud</h1>
        <MineCrud
            :dataSource="dataSource"
            :columns="columns"
            :formColumns="formColumns"
            :formData="formData"
            :rules="rules"
            :onUpdateForm="handleUpdateForm"
            :onCreateForm="handleCreateForm"
            :onDeleteRow="handleDeleteRow"
            :pageConfig="pageConfig"
            @on-change="handlePageChange"
            :hasBatchDelBtn="false"
        >
            <!-- <template slot="custom-row-actions" slot-scope="{ row }">
                <p>{{ row.name }}</p>
            </template> -->
            <template slot="left-actions">
                <button>left</button>
            </template>
            <template slot="right-actions">
                <button>right</button>
            </template>
        </MineCrud>
    </div>
</template>

<script>
import MineCrud from '../../components/crud-table';
export default {
    name: 'crud-table',
    components: {
        MineCrud
    },
    data() {
        const testValidator = (rule, value, callback) => {
            console.log('testValidator', { name: this.formData.name });
            if (value === '') {
                callback(new Error('Please enter something'));
            } else {
                callback();
            }
        };
        return {
            dataSource: [
                {
                    id: 123,
                    name: '张三',
                    age: 12,
                    type: '学生'
                },
                {
                    id: 1234,
                    name: '李四',
                    age: 22,
                    type: '老师'
                }
            ],
            columns: [
                {
                    type: 'expand', // 无需设置render函数，会自动注入 | 设置render函数则按照render函数来渲染
                    width:60,
                    // expandedColumns: ['name', 'age', 'type'], // 展开的key，和名称,不填名称默认和表格的title一致
                    expandedColumns: [
                        'name',
                        { label: '年龄2', key: 'age' },
                        { label: '类型', key: 'type', value: key => 'hello' }
                    ],
                    colNum: 3 // 每列几个字段
                },
                {
                    title: 'id',
                    key: 'id'
                },
                {
                    title: '名字',
                    key: 'name'
                },
                {
                    title: '年龄',
                    key: 'age'
                },
                {
                    title: '类型',
                    key: 'type'
                }
            ],
            formData: {
                name: '',
                age: '',
                type: '学生'
            },
            formColumns: [
                {
                    label: '名字',
                    prop: 'name'
                },
                {
                    label: '年龄',
                    prop: 'age'
                    // type: 'date',
                    // format: 'yyyy年MM月dd日'
                },
                {
                    label: '类型',
                    prop: 'type',
                    type: 'select',
                    dicts: [
                        {
                            label: '学生',
                            value: '学生'
                        },
                        {
                            label: '老师',
                            value: '老师'
                        }
                    ]
                }
            ],
            rules: {
                name: [{ required: true, message: '必须填写' }],
                age: [
                    {
                        validator: testValidator,
                        trgger: 'change'
                    }
                ]
            },
            pageConfig: {
                total: 10,
                current: 2,
                'page-size': 5,
                'show-total': true
            }
        };
    },
    methods: {
        async handleUpdateForm(form) {
            console.log(form);
            console.log(this.formData.name);
        },
        async handleCreateForm(form) {
            console.log(this.formData);
        },
        async handleDeleteRow(row) {
            console.log(row);
        },
        handlePageChange(page) {
            console.log(page);
        }
    }
};
</script>

<style>
</style>

```
