import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [
      {
        categoryTitle: "Category 1",
        categoryId: 1,
        copypastas: [
          {
            copypastaId: 1,
            copypastaTitle: "CopyCopy 1.1",
            copypastaText: "CopyCopy text 1.1"
          },
          {
            copypastaId: 2,
            copypastaTitle: "CopyCopy 1.2",
            copypastaText: "CopyCopy text 1.2"
          },
          {
            copypastaId: 3,
            copypastaTitle: "CopyCopy 1.3",
            copypastaText: "CopyCopy text 1.3"
          }
        ]
      },
      {
        categoryTitle: "Category 2",
        categoryId: 2,
        copypastas: [
          {
            copypastaId: 4,
            copypastaTitle: "Copy 2.1",
            copypastaText: "Copy text 2.1"
          },
          {
            copypastaId: 5,
            copypastaTitle: "Copy 2.2",
            copypastaText: "Copy text 2.2"
          },
          {
            copypastaId: 6,
            copypastaTitle: "Copy 2.3",
            copypastaText: "Copy text 2.3"
          }
        ]
      },
      {
        categoryTitle: "Category 3",
        categoryId: 3,
        copypastas: [
          {
            copypastaId: 7,
            copypastaTitle: "Copy 3.1",
            copypastaText: "Copy text 3.1"
          },
          {
            copypastaId: 8,
            copypastaTitle: "Copy 3.2",
            copypastaText: "Copy text 3.2"
          },
          {
            copypastaId: 9,
            copypastaTitle: "Copy 3.3",
            copypastaText: "Copy text 3.3"
          }
        ]
      }
    ]
  },
  mutations: {
    updateCategory(state, { categoryId, categoryTitle }) {
      for (let category of state.categories) {
        if (category.categoryId == categoryId) {
          Vue.set(category, "categoryTitle", categoryTitle);
          return;
        }
      }
    },
    updateCopyPasta(state, { copypastaId, copypastaTitle, copypastaText }) {
      for (let category of state.categories) {
        for (let copypasta of category.copypastas) {
          if ((copypasta.copypastaId = copypastaId)) {
            Vue.set(copypasta, "copypastaText", copypastaText);
            Vue.set(copypasta, "copypastaTitle", copypastaTitle);
          }
        }
      }
    },
    deleteCategory(state, categoryId) {
      state.categories = state.categories.filter(
        category => category.categoryId != categoryId
      );
    },
    deleteCopyPasta(state, copypastaId) {
      for (let category of state.categories) {
        category.copypastas = category.copypastas.filter(copypasta => {
          return copypasta.copypastaId != copypastaId;
        });
      }
    },
    addCopyPasta(
      state,
      { categoryid, copypastaId, copypastaTitle, copypastaText }
    ) {
      for (let category of state.categories) {
        if (category.categoryId == categoryid) {
          category.copypastas.push({
            copypastaId,
            copypastaTitle,
            copypastaText
          });
          break;
        }
      }
    },
    addCategory(state, { categoryId, categoryTitle }) {
      state.categories.push({
        categoryId,
        categoryTitle
      });
    }
  },
  actions: {
    async updateCategory(state, { categoryId, categoryTitle }) {
      //TODO connection with the server
      state.commit("updateCategory", { categoryId, categoryTitle });
    },
    async updateCopyPasta(
      state,
      { copypastaId, copypastaTitle, copypastaText }
    ) {
      //TODO connection with the server
      state.commit("updateCopyPasta", {
        copypastaId,
        copypastaTitle,
        copypastaText
      });
    },
    async deleteCategory(state, categoryId) {
      //TODO connection with the server
      state.commit("deleteCategory", categoryId);
    },
    async deleteCopyPasta(state, copypastaId) {
      //TODO connection with the server
      state.commit("deleteCopyPasta", copypastaId);
    },
    async addCategory(state, categoryTitle) {
      //TODO connection with the server
      state.commit("addCategory", {
        categoryId: /*have to be got from server*/ 10,
        categoryTitle
      });
    },
    async addCopyPasta(state, { categoryId, copypastaTitle, copypastaText }) {
      //TODO connection with the server
      state.commit("addCopyPasta", {
        copypastaId: /*have to be got from server*/ 10,
        copypastaTitle,
        copypastaText,
        categoryId
      });
    }
  },
  getters: {
    categories: state => state.categories
  }
});
