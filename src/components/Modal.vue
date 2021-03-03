<template>
  <transition @enter="animationEnter" @leave="animationLeave" appear>
    <div ref="modalRoot" class="modal">
      <div class="modal-content">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal {
  max-width: 600px;
}
</style>

<script>
export default {
  data: () => ({
    modalInstance: null,
    doneFunction: {
      f: null,
    },
  }),
  emits: ["closed"],
  // mounted() {
  //   this.modalInstance = window.M.Modal.init(this.$refs.modalRoot, {
  //     dismissible: false,
  //     onCloseEnd: () => this.$emit("closed")
  //   }).open();
  // },
  methods: {
    animationEnter(el, done) {
      this.modalInstance = window.M.Modal.init(this.$refs.modalRoot, {
        dismissible: false,
        onOpenEnd: () => {
          console.log("animation started");
          done();
        },
        onCloseEnd: function () {
          this.f();
        }.bind(this.doneFunction),
      }).open();
    },
    animationLeave(el, done) {
      this.doneFunction.f = () => done();
      this.modalInstance.close();
    },
  },
  beforeUnmount() {
    this.modalInstance.destroy();
  },
};
</script>
