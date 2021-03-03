<template>
  <div ref="modalRoot" class="modal">
    <form @submit.prevent="validate">
      <div class="modal-content">
        <h5>
          Вы уверены, что хотите удалить всю категорию "{{
            category.categoryTitle
          }}"
        </h5>
      </div>

      <div class="modal-footer">
        <a class="waves-effect waves-teal btn-flat modal-close">Отмена</a>

        <a @click="del" type="submit" class="waves-effect waves-light btn">
          Удалить
        </a>
      </div>
    </form>
  </div>
</template>

<style scoped>
.modal {
  max-width: 500px;
}
</style>

<script>
export default {
  emits: ["closed"],
  props: ["category"],
  data: () => ({
    modalInstance: null,
  }),
  mounted() {
    this.modalInstance = window.M.Modal.init(this.$refs.modalRoot, {
      onCloseEnd: () => this.$emit("closed"),
    }).open();
  },
  methods: {
    async del() {
      try {
        await this.$store.dispatch("deleteCategory", this.category.categoryId);
        window.M.toast({ html: "Категория успешно удалена" });
      } catch (e) {
        window.M.toast({ html: "Не удалось связаться с сервером" });
      }

      this.modalInstance.close();
    },
  },
};
</script>
