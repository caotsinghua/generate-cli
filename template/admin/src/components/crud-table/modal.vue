<template>
    <Modal v-model="visible" :title="`${this.editRow ? '更新' : '创建'}表单`" width="50%">
        <EditForm ref="edit-form" :loading="submiting" @close-modal="closeModal" />
        <template slot="footer">
            <Button type="primary" :loading="submiting" @click="handleSubmit">{{
                this.editRow ? '更新' : '提交'
            }}</Button>
            <Button @click="closeModal">取消</Button>
        </template>
    </Modal>
</template>

<script>
import EditForm from './form';
export default {
    components: {
        EditForm
    },
    data() {
        return {
            visible: false,
            submiting: false,
            editRow: null
        };
    },
    methods: {
        openModal(row) {
            this.editRow = row;
            this.$refs['edit-form'].initForm(row);
            this.visible = true;
        },
        closeModal() {
            this.$refs['edit-form'].clearForm();
            this.visible = false;
        },
        async handleSubmit() {
            try {
                this.submiting = true;
                // 调用表单更新
                await this.$refs['edit-form'].submit();
            } catch (e) {
                throw e;
            } finally {
                this.submiting = false;
            }
        }
    }
};
</script>
