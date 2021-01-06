<template>
  <div class="home">
    <MainPageManager v-if="auth" />
    <MainPageUser v-else />
  </div>
</template>

<script>
import MainPageUser from "@/components/MainPageUser.vue";
import MainPageManager from "@/components/MainPageManager.vue";
import gql from "graphql-tag";
import { partialAuth } from "./../../server/server/constant";
export default {
  name: "Home",
  components: {
    MainPageManager,
    MainPageUser
  },
  data: () => {
    return {};
  },
  computed: {
    auth() {
      if (this.me) {
        if (partialAuth.includes(this.me.role)) {
          return true;
        }
      }
      return false;
    }
  },
  apollo: {
    me: {
      query: gql`
        query me {
          me {
            username
            role
          }
        }
      `
    }
  }
};
</script>

<style scoped>
.home {
  margin-top: 20px;
}
</style>>


