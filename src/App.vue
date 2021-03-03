<template>
  <div>
    <div id="app">
      <nav class="light-blue darken-3">
        <div class="nav-wrapper">
          <a href="#!" class="brand-logo center">CopyCopy manager</a>
        </div>
      </nav>
    </div>
    <main class="container">
      <div v-if="categories == null" class="s12">
        <Loader />
      </div>
      <div v-else-if="categories.length == 0">
        <h4 class="center">Увы, у Вас пока что нет еще нет копипаст</h4>
      </div>
      <ul class="collapsible popout">
        <CollapsibleCategory
          v-for="category of categories"
          :key="category.categoryId"
          :categoryProp="category"
        />
      </ul>
      <div
        class="add amber-text text-darken-4"
        @click="addCategoryModalOpened = true"
      >
        <i class="material-icons">add</i> Добавить новую категорию
      </div>
      <AddCategoryModal
        v-if="addCategoryModalOpened"
        @closed="addCategoryModalOpened = false"
      />
    </main>
  </div>
</template>

<style lang="less" scoped>
main {
  margin-top: 4vh;
}

.add {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  line-height: 1em;
  text-align: center;
  cursor: pointer;

  i {
    font-size: 1.4em;
  }
}
</style>

<script>
import CollapsibleCategory from "@/components/CollapsibleCategory";
import AddCategoryModal from "@/components/modals/AddCategoryModal";

export default {
  data: () => ({
    collapsibles: [],
    addCategoryModalOpened: false,
  }),
  name: "App",
  computed: {
    categories() {
      return this.$store.getters.categories;
    },
  },
  methods: {
    updateCollapsibles() {
      this.$nextTick(() => {
        const elems = document.querySelectorAll(".collapsible");
        this.collapsibles = window.M.Collapsible.init(elems, {});

        const elemsExp = document.querySelectorAll(".collapsible.expandable");
        this.collapsibles.push(
          ...window.M.Collapsible.init(elemsExp, {
            accordion: false,
          })
        );
      });
    },
  },
  mounted() {
    this.updateCollapsibles();
  },
  updated() {
    this.updateCollapsibles();
  },
  beforeUnmounted() {
    this.collapsibles.forEach((instance) => instance.destroy());
  },
  components: {
    CollapsibleCategory,
    AddCategoryModal,
  },
};
</script>
