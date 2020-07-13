<template>
  <li>
    <div class="collapsible-header"><i class="material-icons">menu</i>{{category.title}}
      <span 
        class="badge right"
        @click.stop="del"
      >
        <i class="material-icons">delete</i>
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
import CollapsiblePasta from "@/components/CollapsiblePasta"

export default {
  props: {
    categoryProp: Object
  },
  data() {
    return {
      category: this.categoryProp
    }
  }, 
  methods: {
    deletePastaById(id) {
      this.category.pastas = this.category.pastas.filter(pasta => pasta.id !== id);
    },
    del() {
      this.$emit("deleteCategory", this.category.categoryId);
    }
  },
  components: {
    CollapsiblePasta
  }
}
</script>