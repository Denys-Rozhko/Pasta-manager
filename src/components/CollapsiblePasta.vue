<template>
  <li>
    <div
      class="collapsible-header"
      @click="isCollapsibleOpen = !isCollapsibleOpen"
    >
      <span v-if="!isEditing">{{ title }}</span>
      <div v-else @click.stop class="input-field inline">
        <input id="title" v-model="title" type="text" />
        <label for="title">Новое название</label>
      </div>
      <span class="badge right">
        <i @click.stop="del" class="material-icons">delete</i>

        <i v-if="!isEditing" @click.stop="editingStart" class="material-icons"
          >edit</i
        >

        <i v-else @click.stop="save" class="material-icons">save</i>

        <i @click.stop="copy" class="material-icons">content_copy</i></span
      >
    </div>
    <div class="collapsible-body" v-if="!isEditing">{{ text }}</div>
    <div class="collapsible-body" v-else>
      <div class="input-field">
        <textarea class="materialize-textarea" v-model="text"></textarea>
        <label for="textarea1">Новый текст</label>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    pasta: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      id: this.pasta.id,
      text: this.pasta.pastaText,
      title: this.pasta.pastaTitle,
      textBeforeEditing: this.text,
      titleBeforeEditing: this.title,
      isEditing: false,
      isCollapsibleOpen: false
    };
  },
  methods: {
    async copy() {
      try {
        await navigator.clipboard.writeText(this.text);
        window.M.toast({ html: "Текст удачно скопирован в буфер обмена" });
      } catch (e) {
        window.M.toast({ html: "Не удалось скопировать текст в буфер обмена" });
      }
    },
    editingStart() {
      if (!this.isCollapsibleOpen) return;
      this.isEditing = !this.isEditing;
      this.textBeforeEditing = this.text;
      this.titleBeforeEditing = this.title;

      setTimeout(() => {
        window.M.updateTextFields();
      }, 0);
      // isOk = send to the server
      // if !isOk
      //   this.text = textBeforeEditing
    },
    save() {
      // isOk = send to the server
      // if !isOk
      //   this.text = this.textBeforeEditing
      //   this.title = this.titleBeforeEditing
      // Toast({html: "Не удалось сохранить изменения"})
      // else
      this.isEditing = false;
      if (
        this.text != this.textBeforeEditing ||
        this.title != this.titleBeforeEditing
      ) {
        window.M.toast({ html: "Изменения успешно сохранены" });
      }
    },
    del() {
      // delete on servers
      this.$emit("deletePasta", this.id);
    }
  }
};
</script>
