<template>
  <div ref="modalRoot" class="modal">
    <form @submit.prevent="validate">
      <div class="modal-content">
        <h5>Введите название новой категории:</h5>

        <div class="input-field">
          <label for="title">Название</label>
          <input
            v-model="copypastaTitle"
            id="title"
            :class="{ invalid: titleInvalid }"
            type="text"
            minlength="1"
          />
          <span class="helper-text red-text">{{ titleErrorText }}</span>
        </div>

        <label for="select">Категория копипасты</label>
        <select
          id="select"
          ref="select"
          :class="{ invalid: categoryInvalid }"
          v-model="selectedCategoryId"
        >
          <option :value="0" disabled>Выберите категорию</option>
          <option
            v-for="category of categories"
            :key="category.categoryId"
            :value="category.categoryId"
          >
            {{ category.categoryTitle }}
          </option>
        </select>
        <span class="helper-text red-text">{{ categoryErrorText }}</span>

        <div class="input-field">
          <label for="text">Текст копипасты</label>
          <textarea
            id="text"
            class="materialize-textarea"
            :class="{ invalid: textInvalid }"
            v-model="copypastaText"
          ></textarea>
          <span class="helper-text red-text">{{ textErrorText }}</span>
        </div>
      </div>
      <div class="modal-footer">
        <a class="waves-effect waves-teal btn-flat modal-close">Отмена</a>

        <button type="submit" class="waves-effect waves-light btn">
          Добавить
        </button>
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
  props: ["defaultCategoryId"],
  emits: ["closed"],
  data() {
    return {
      modalInstance: null,

      copypastaTitle: "",
      selectedCategoryId: this.defaultCategoryId,
      copypastaText: "",

      titleErrorText: "",
      titleInvalid: false,

      categoryErrorText: "",
      categoryInvalid: false,

      textErrorText: "",
      textInvalid: false,
    };
  },
  mounted() {
    this.modalInstance = window.M.Modal.init(this.$refs.modalRoot, {
      onCloseEnd: () => this.$emit("closed"),
    }).open();

    window.M.updateTextFields();
    window.M.FormSelect.init(this.$refs.select);
  },
  methods: {
    validate() {
      let isValid = true;

      if (this.copypastaTitle.trim() === "") {
        this.titleErrorText = "Название копипасты не может быть пустым";
        this.titleInvalid = true;
        isValid = false;
      }

      if (this.selectedCategoryId === 0) {
        this.categoryErrorText =
          "Выберите категорию к которой относится копипаста";
        this.categoryInvalid = true;
        isValid = false;
      }

      if (this.copypastaText.trim() === "") {
        this.textErrorText = "Тект копипасты не может быть пустым";
        this.textInvalid = true;
        isValid = false;
      }

      if (isValid) {
        this.add();
      }
    },
    async add() {
      try {
        await this.$store.dispatch("addCopyPasta", {
          categoryId: this.selectedCategoryId,
          copypastaTitle: this.copypastaTitle,
          copypastaText: this.copypastaText,
        });

        window.M.toast({ html: "Копипаста успешно добавлена" });
        this.modalInstance.close();
      } catch (e) {
        window.M.toast({ html: "Не удалось связаться с сервером" });
      }
    },
  },
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
  },
};
</script>
