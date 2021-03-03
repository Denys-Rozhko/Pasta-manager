<template>
  <li>
    <div class="collapsible-header">
      <i class="material-icons">menu</i>
      <span v-if="!isEditing">{{ category.categoryTitle }}</span>
      <div v-else @click.stop class="input-field inline">
        <input id="title" v-model="category.categoryTitle" type="text" />
        <label for="title">Новое название</label>
      </div>
      <span class="badge right">
        <i class="material-icons" v-if="!isEditing" @click.stop="editStart"
          >edit</i
        >

        <i class="material-icons" v-else @click.stop="editEnd">save</i>

        <i @click.stop="modalOpened = true" class="material-icons">delete</i>
      </span>
    </div>
    <div class="collapsible-body">
      <ul class="collapsible expandable">
        <CollapsibleCopyPasta
          v-for="copypasta of category.copypastas"
          :copypasta="copypasta"
          :key="copypasta.copypastaId"
        />
      </ul>
    </div>

    <Modal v-if="modalOpened">
      <template v-slot:default>
        <h5>
          Вы уверены, что хотите удалить категорию "{{
            category.categoryTitle
          }}"?
        </h5>
      </template>

      <template v-slot:footer>
        <a class="waves-effect waves-teal btn-flat modal-close">Нет</a>

        <a class="waves-effect waves-light btn modal-close" @click="del">Да</a>
      </template>
    </Modal>
  </li>
</template>

<style scoped>
.waves-effect.waves-amber {
  background: rgba(255, 213, 79, 0.65);
}

.btn,
.btn-flat {
  font-size: 1.25em;
}
</style>

<script>
import CollapsibleCopyPasta from "@/components/CollapsibleCopyPasta";

export default {
  props: {
    categoryProp: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      category: this.categoryProp,
      isEditing: false,
      titleBeforeEditing: "",
      modalOpened: false,
    };
  },
  methods: {
    editStart() {
      this.titleBeforeEditing = this.category.title;
      this.isEditing = !this.isEditing;

      setTimeout(() => {
        window.M.updateTextFields();
      }, 0);
    },
    async editEnd() {
      if (this.category.title != this.titleBeforeEditing) {
        try {
          this.isEditing = !this.isEditing;
          await this.$store.dispatch("updateCategory", {
            categoryId: this.category.categoryId,
            categoryTitle: this.category.title,
          });
          window.M.toast({ html: "Название успешно изменено" });
        } catch (e) {
          window.M.toast({ html: "Не удалось связаться с сервером" });
        }
      } else {
        this.isEditing = !this.isEditing;
      }
    },
    async del() {
      this.modalOpened = false;
      try {
        await this.$store.dispatch("deleteCategory", this.category.categoryId);
        window.M.toast({ html: "Категория успешно удалена" });
      } catch (e) {
        window.M.toast({ html: "Не удалось связаться с сервером" });
      }
    },
  },
  components: {
    CollapsibleCopyPasta,
  },
};
</script>
