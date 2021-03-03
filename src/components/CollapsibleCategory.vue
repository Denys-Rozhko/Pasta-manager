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

        <i @click.stop="confirmingModalOpen = true" class="material-icons"
          >delete</i
        >

        <i @click.stop="addCopyPastaModalOpened = true" class="material-icons"
          >add</i
        >
      </span>
    </div>
    <div class="collapsible-body">
      <ul class="collapsible expandable">
        <template v-if="category.copypastas && category.copypastas.length > 0">
          <CollapsibleCopyPasta
            v-for="copypasta of category.copypastas"
            :copypasta="copypasta"
            :key="copypasta.copypastaId"
          />
        </template>

        <li v-else class="collapsible-header">
          Увы, у Вас еще нет копипаст. Вы можете добавить их нажав на '+' справа
          выше
        </li>
      </ul>
    </div>

    <AddCopyPastaModal
      v-if="addCopyPastaModalOpened"
      @closed="addCopyPastaModalOpened = false"
      :defaultCategoryId="category.categoryId"
    />

    <ConfirmDeleteingCategoryModal
      :category="category"
      v-if="confirmingModalOpen"
      @closed="confirmingModalOpen = false"
    />
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
import AddCopyPastaModal from "@/components/modals/AddCopyPastaModal";
import ConfirmDeleteingCategoryModal from "@/components/modals/ConfirmDeleteingCategoryModal";

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
      confirmingModalOpen: false,
      addCopyPastaModalOpened: false,
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
    AddCopyPastaModal,
    ConfirmDeleteingCategoryModal,
  },
};
</script>
