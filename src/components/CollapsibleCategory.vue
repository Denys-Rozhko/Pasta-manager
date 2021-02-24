<template>
  <li>
    <div class="collapsible-header">
      <i class="material-icons">menu</i>
      <span v-if="!isEditing">{{ category.title }}</span>
      <div v-else @click.stop class="input-field inline">
        <input id="title" v-model="category.title" type="text" />
        <label for="title">Новое название</label>
      </div>
      <span class="badge right">
        <i class="material-icons" v-if="!isEditing" @click.stop="editStart"
          >edit</i
        >

        <i class="material-icons" v-else @click.stop="editEnd">save</i>

        <i @click.stop="del" class="material-icons">delete</i>
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
  </li>
</template>

<script>
import CollapsibleCopyPasta from "@/components/CollapsibleCopyPasta";

export default {
  props: {
    categoryProp: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      category: this.categoryProp,
      isEditing: false,
      titleBeforeEditing: ""
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
            categoryTitle: this.category.title
          })
          window.M.toast({ html: "Название успешно изменено" });
        } catch (e) {
          window.M.toast({ html: "Не удалось связаться с сервером" });
        }
      } else {
        this.isEditing = !this.isEditing;
      }
    },
    async del() {
      try {
        await this.$store.dispatch("deleteCategory", this.category.categoryId);
        window.M.toast({ html: "Категория успешно удалена" });
      } catch (e) {
        window.M.toast({ html: "Не удалось связаться с сервером" });
      }
    }
  },
  components: {
    CollapsibleCopyPasta
  }
};
</script>
