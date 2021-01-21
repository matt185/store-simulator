<template>
  <div class="home">
    <div v-if="auth" class="switch-View">
      <md-switch v-model="changeView"></md-switch>
    </div>
    <div v-if="auth">
      <MainPageManager v-if="!changeView" />
      <MainPageUser v-else />
    </div>
    <div v-else>
      <MainPageUser />
    </div>
  </div>
</template>

<script>
import MainPageUser from "@/components/MainPageUser.vue";
import MainPageManager from "@/components/MainPageManager.vue";

export default {
  name: "Home",
  components: {
    MainPageManager,
    MainPageUser
  },
  data: () => {
    return {
      me: {},
      changeView: false
    };
  },

  computed: {
    auth() {
      return this.$store.state.auth;
    }
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
}
.switch-View {
  display: flex;
  justify-content: flex-end;
}
</style>>


