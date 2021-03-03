<template>
  <div ref="modalRoot" class="modal">
    <div class="modal-content">
      <h5>Введите название новой категории:</h5>
      <label for="title">Название</label>
      <input
        v-model="categoryTitle"
        id="title"
        :class="{ invalid: invalid }"
        type="text"
        minlength="1"
      />
      <span class="helper-text red-text">{{ errorText }}</span>
    </div>
    <div class="modal-footer">
      <a class="waves-effect waves-teal btn-flat modal-close">Отмена</a>

      <a type="submit" class="waves-effect waves-light btn" @click="add">
        Добавить
      </a>
    </div>
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
  data: () => ({
    modalInstance: null,
    categoryTitle: "",
    errorText: "",
    invalid: false,
  }),
  mounted() {
    this.modalInstance = window.M.Modal.init(this.$refs.modalRoot, {
      onCloseEnd: () => this.$emit("closed"),
    }).open();
    window.M.updateTextFields();
  },
  methods: {
    async add() {
      if (this.categoryTitle.length == 0) {
        this.errorText = "Название категории не может быть пустым";
        this.invalid = true;
        return;
      }
      try {
        await this.$store.dispatch("addCategory", this.categoryTitle);
        window.M.toast({ html: "Категория успешно добавлена" });
      } catch (e) {
        window.M.toast({ html: "Не удалось связаться с сервером" });
        console.log(e);
      }
      this.modalInstance.close();
    },
  },
};
</script>
