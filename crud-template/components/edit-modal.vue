<template>
  <Modal v-model="visible" :title="`${this.row ? '更新' : '创建'}表单`" width="700" @on-cancel="hide">
    <Form ref="form" :model="form" :label-width="100" :rules="rules">
      <Row class-name="form-row" :gutter="15">
        <Col :xs="24" :sm="24" :md="12">
          <FormItem label="title" prop="title">
            <Input v-model="form.title" placeholder="请输入..." :readonly="readOnly" />
          </FormItem>
        </Col>
        <Col :xs="24" :sm="24" :md="12">
          <FormItem label="author" prop="author">
            <Input v-model="form.author" placeholder="请输入..." :readonly="readOnly" />
          </FormItem>
        </Col>
      </Row>
    </Form>
    <template slot="footer">
      <Button type="primary" :loading="submiting" v-if="!readOnly" @click="handleSubmit">\{{ this.row ? '更新' : '提交' }}</Button>
      <Button @click="hide">取消</Button>
    </template>
  </Modal>
</template>

<script>
function update{{upperFirst resourceName}}() {
    return {
        data: {
            success: true
        }
    };
}
const create{{upperFirst resourceName}} = update{{upperFirst resourceName}};
export default {
    data() {
        return {
            visible: false,
            row:null,
            submiting:false,
            readOnly:false,
            form: {
                title: '',
                author: '',
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
            },
        };
    },
    methods: {
        show(row,readOnly) {
            this.row=row;
            this.readOnly=!!readOnly;
            this.visible = true;
        },
        hide() {
            this.$refs['form'].resetFields();
            this.visible = false;
        },
        async handleSubmit() {
            const valid = await this.$refs['form'].validate();
            if (valid) {
                let success=false;
                try {
                    this.submiting=true;
                    if (this.isEdit) {
                        const res = await update{{upperFirst resourceName}}(this.form);
                        success = res.data.success;
                    } else {
                        const res = await create{{upperFirst resourceName}}(this.form);
                        success = res.data.success;
                    }
                } catch (e) {
                    this.$Message.error('操作失败');
                }
                this.submiting=false;
                if (success) {
                    this.$Message.success('操作成功');
                    this.hide();
                } else {
                    this.$Message.error('参数错误');
                }
            }
        }
    }
};
</script>
