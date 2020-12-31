<template>
  <div class="page-container">
    <md-app class="appBody" md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>

            <span class="md-title">Portua</span>
          </div>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button">
              <md-icon>more_vert</md-icon>
            </md-button>
          </div>
        </div>

        <div id="nav" class="md-toolbar-row">
          <md-tabs class="md-primary">
            <md-tab id="tab-home" md-label="Home" to="/"></md-tab>
            <md-tab id="tab-about" md-label="About" to="/about"></md-tab>
            <md-tab id="tab-posts" md-label="SignUp" to="/signUp"></md-tab>
            <md-tab id="tab-favorites" md-label="SignIn" to="/signIn"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="6">Menu</md-toolbar>
        <div v-if="me">
          <md-list>
            <md-list-item @click="setMenuVisible">
              <md-icon id="icon-signUp" to="/signUp">person</md-icon>
              <span class="md-list-item-text">{{me.username}}</span>
            </md-list-item>

            <md-list-item @click="setMenuVisible">
              <md-icon>shopping_bag</md-icon>
              <span class="md-list-item-text">Shopping Bag</span>
            </md-list-item>

            <md-list-item @click="setMenuVisible">
              <md-icon>favorite</md-icon>
              <span class="md-list-item-text">Favorites</span>
            </md-list-item>

            <md-list-item @click="setMenuVisible">
              <md-icon>error</md-icon>
              <span class="md-list-item-text" @click="logout">logout</span>
            </md-list-item>
          </md-list>
        </div>
        <div v-else>
          <md-list-item to="/signIn" @click="setMenuVisible">
            <md-icon id="icon-signUp">move_to_inbox</md-icon>
            <span class="md-list-item-text">Login</span>
          </md-list-item>
        </div>
      </md-app-drawer>

      <md-app-content class="contents">
        <router-view />
      </md-app-content>
    </md-app>
  </div>
  <!-- <Navbar /> -->
</template>

<script>
// import Navbar from "./components/Navbar.vue";
import gql from "graphql-tag";
export default {
  name: "LastRowFixed",
  data: () => ({
    menuVisible: false
  }),
  methods: {
    logout() {
      this.$apollo.mutate({
        mutation: gql`
          mutation {
            logout
          }
        `
      });
      location.reload();
    },
    setMenuVisible() {
      this.menuVisible = false;
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
      // fetchPolicy: "cache-and-network"
    }
  }
};
</script>

<style>
.md-app {
  min-height: 1000px;
  border: 1px solid rgba(#000, 0.12);
}
.md-app-content {
  display: flex;
  justify-content: center;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.md-app {
  height: 400px;
  border: 1px solid rgba(#000, 0.12);
}
.md-list-item-text {
  color: #2c3e50;
}
</style>

