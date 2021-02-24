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
    </main>
  </div>
</template>

<style scoped>
  main {
    margin-top: 4vh;
  }
</style>

<script>
import CollapsibleCategory from "@/components/CollapsibleCategory";

export default {
  data: () => ({
    collapsibles: []
  }),
  name: "App",
  computed: {
    categories() {
      return this.$store.getters.categories;
    }
  },
  mounted() {
    setTimeout(() => {
      const elems = document.querySelectorAll(".collapsible");
      this.collapsibles = window.M.Collapsible.init(elems, {});

      const elemsExp = document.querySelectorAll(".collapsible.expandable");
      this.collapsibles.push(
        ...window.M.Collapsible.init(elemsExp, {
          accordion: false
        })
      );
    }, 0);
  },
  destroyed() {
    this.collapsibles.forEach(instance => instance.destroy());
  },
  components: {
    CollapsibleCategory
  },

};
</script>
