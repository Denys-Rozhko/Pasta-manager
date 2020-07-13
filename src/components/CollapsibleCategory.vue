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
        <CollapsiblePasta
          v-for="pasta of category.pastas"
          :pasta="pasta"
          :key="pasta.id"
          @deletePasta="deletePastaById"
        />
      </ul>
    </div>
  </li>
</template>

<script>
import CollapsiblePasta from "@/components/CollapsiblePasta";

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
    editEnd() {
      if (this.category.title != this.titleBeforeEditing) {
        // send to the server
        window.M.toast({ html: "Название успешно изменено" });
      }

      this.isEditing = !this.isEditing;
    },
    deletePastaById(id) {
      this.category.pastas = this.category.pastas.filter(
        pasta => pasta.id !== id
      );
    },
    del() {
      this.$emit("deleteCategory", this.category.categoryId);
    }
  },
  components: {
    CollapsiblePasta
  }
};
</script>
