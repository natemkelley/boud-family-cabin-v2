<template>
  <div class="alert-container">
    <transition name="page">
      <vs-alert
        v-if="alert"
        gradient
        danger
        class="swag"
        closable
        v-model="alertActive"
      >
        <template #title>
          Alert
        </template>
        <div class="alert-container-text">{{ alert }}</div>
      </vs-alert>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["alert"],
  data() {
    return {
      alertActive: false,
    };
  },
  methods: {
    openNotification() {
      this.$vs.notification({
        position: "top-right",
        color: "danger",
        title: "Solitude Alert",
        duration: 5000,
        text: `The resort currently has an alert. Click to see it`,
        onClick: () => {
          this.alertActive = true;
        },
      });
    },
  },
  watch: {
    alert() {
      this.openNotification();
    },
  },
};
</script>

<style lang="scss">
.swag {
  .vs-icon-close {
    &:before,
    &:after {
      background: white !important;
    }
  }
}
</style>

<style scoped lang="scss">
.alert-container {
  padding: 10px 25px;
  position: relative;
  z-index: 0;
  &-text {
    white-space: pre-line;
  }
}

.swag {
  max-height: 250px;
  overflow: auto;
  .vs-icon-close {
    &:before {
      background: white !important;
    }
  }
}
</style>
