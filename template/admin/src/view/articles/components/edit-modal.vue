<template>
    <Modal v-model="visible" :title="`${this.id ? '更新' : '创建'}表单`" width="50%">
        <EditForm ref="modal-edit-form" />
        <template slot="footer">
            <Button type="primary" :loading="loading" @click="handleSubmit">{{ this.id ? '更新' : '提交' }}</Button>
            <Button @click="closeModal">取消</Button>
        </template>
    </Modal>
</template>

<script>
import EditForm from './edit-form';
export default {
    components: {
        EditForm
    },
    data() {
        return {
            visible: false,
            loading: false,
            id: ''
        };
    },
    methods: {
        openModal(id) {
            this.id = id;
            this.$refs['modal-edit-form'].initData(id);
            this.visible = true;
        },
        closeModal() {
            this.$refs['modal-edit-form'].clearForm();
            this.visible = false;
        },
        async handleSubmit() {
            this.loading = true;
            let success = false;
            try {
                success = await this.$refs['modal-edit-form'].submit();
            } catch (e) {
                this.$Message.error(e.message || '出错了');
            }
            if (success) {
                this.closeModal();
            }
            this.loading = false;
        }
    }
};
</script>
