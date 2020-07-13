<template>
  <div>
    <div id="app">
      <nav class="orange darken-2">
        <div class="nav-wrapper">
          <a href="#!" class="brand-logo center">Pasta manager</a>
        </div>
      </nav>
    </div>
    <main class="container">
      <div v-if="categories.length == 0">
        <h4 class="center">Увы, у Вас пока что нет еще нет паст</h4>
      </div>
      <ul class="collapsible popout">
        <CollapsibleCategory
          v-for="category of categories"
          :key="category.categoryId"
          :categoryProp="category"
          @deleteCategory="deleteCategoryById"
        />
      </ul>
    </main>
  </div>
</template>

<script>
import CollapsibleCategory from "@/components/CollapsibleCategory";

export default {
  data: () => ({
    collapsibles: [],
    categories: []
  }),
  name: "App",
  methods: {
    deleteCategoryById(categoryId) {
      this.categories = this.categories.filter(
        category => category.categoryId !== categoryId
      );
    }
  },
  mounted() {
    //TODO fetch data from the server
    this.categories = [
      {
        title: "Category 1",
        categoryId: 1,
        pastas: [
          {
            id: 1,
            pastaTitle: "Pasta 1.1",
            pastaText: "Pasta text 1.1"
          },
          {
            id: 2,
            pastaTitle: "Pasta 1.2",
            pastaText: "Pasta text 1.2"
          },
          {
            id: 3,
            pastaTitle: "Pasta 1.3",
            pastaText: "Pasta text 1.3"
          }
        ]
      },
      {
        title: "Category 2",
        categoryId: 2,
        pastas: [
          {
            id: 1,
            pastaTitle: "Pasta 2.1",
            pastaText: "Pasta text 2.1"
          },
          {
            id: 2,
            pastaTitle: "Pasta 2.2",
            pastaText: "Pasta text 2.2"
          },
          {
            id: 3,
            pastaTitle: "Pasta 2.3",
            pastaText: "Pasta text 2.3"
          }
        ]
      },
      {
        title: "Category 3",
        categoryId: 3,
        pastas: [
          {
            id: 1,
            pastaTitle: "Pasta 3.1",
            pastaText: "Pasta text 3.1"
          },
          {
            id: 2,
            pastaTitle: "Pasta 3.2",
            pastaText: "Pasta text 3.2"
          },
          {
            id: 3,
            pastaTitle: "Pasta 3.3",
            pastaText: "Pasta text 3.3"
          }
        ]
      }
    ];
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
  }
};
</script>
