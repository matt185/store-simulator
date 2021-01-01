<template>
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
          <md-tooltip md-direction="bottom">Menu</md-tooltip>
        </md-button>
        <span class="md-title">My Title</span>
        <div id="nav">
          <md-tabs class="md-primary" md-sync-route>
            <md-tab id="tab-home" md-label="Home" to="/" exact></md-tab>
            <md-tab id="tab-about" md-label="About" to="/about"></md-tab>
            <md-tab v-if="!me" id="tab-signUp" md-label="SignUp" to="/signUp"></md-tab>
            <md-tab v-if="!me" id="tab-signIn" md-label="SignIn" to="/signIn"></md-tab>
          </md-tabs>
        </div>
        <md-autocomplete
          class="search"
          v-model="selected"
          :md-options="selectionList"
          md-layout="box"
        >
          <label>Search...</label>
        </md-autocomplete>
        <md-menu md-size="medium" md-align-trigger>
          <md-button class="md-icon-button" md-menu-trigger>
            <md-icon>filter_list</md-icon>
            <md-tooltip md-direction="bottom">Filter Options</md-tooltip>
          </md-button>
          <md-menu-content>
            <md-menu-item>My Item 1</md-menu-item>
            <md-menu-item>My Item 2</md-menu-item>
            <md-menu-item>My Item 3</md-menu-item>
          </md-menu-content>
        </md-menu>

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button">
            <md-icon>favorite</md-icon>
            <md-tooltip md-direction="bottom">Favorite</md-tooltip>
          </md-button>
          <md-button class="md-icon-button">
            <md-icon>shopping_bag</md-icon>
            <md-tooltip md-direction="bottom">Shopping Bag</md-tooltip>
          </md-button>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="2">Menu</md-toolbar>
        <div v-if="me">
          <md-list>
            <md-list-item @click="setMenuVisible" to="/user">
              <md-icon id="icon-signUp">person</md-icon>
              <span class="md-list-item-text">{{me.username}}</span>
            </md-list-item>

            <md-list-item @click="setMenuVisible" to="/shopping_bag">
              <md-icon>shopping_bag</md-icon>
              <span class="md-list-item-text">Shopping Bag</span>
            </md-list-item>

            <md-list-item @click="setMenuVisible" to="/favorite">
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
    menuVisible: false,
    selected: "",
    selectionList: [
      "Jim Halpert",
      "Dwight Schrute",
      "Michael Scott",
      "Pam Beesly",
      "Angela Martin",
      "Kelly Kapoor",
      "Ryan Howard",
      "Kevin Malone",
      "Creed Bratton",
      "Oscar Nunez",
      "Toby Flenderson",
      "Stanley Hudson",
      "Meredith Palmer",
      "Phyllis Lapin-Vance"
    ]
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
  color: #696c70;
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
.md-title {
  width: 100px;
}
.search {
  max-width: 300px;
}
</style>

  // <md-app class="appBody" md-waterfall md-mode="fixed-last">
  //     <md-app-toolbar class="md-large md-dense md-primary">
  //       <div class="md-toolbar-row">
  //         <div class="md-toolbar-section-start">
  //           <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
  //             <md-icon>menu</md-icon>
  //           </md-button>

  //           <span class="md-title">Portua</span>
  //         </div>

  //         <div class="md-toolbar-section-end">
  //           <md-button class="md-icon-button">
  //             <md-icon>more_vert</md-icon>
  //           </md-button>
  //         </div>
  //       </div>

  //       <div id="nav" class="md-toolbar-row">
  //         <md-tabs class="md-primary">
  //           <md-tab id="tab-home" md-label="Home" to="/"></md-tab>
  //           <md-tab id="tab-about" md-label="About" to="/about"></md-tab>
  //           <md-tab id="tab-posts" md-label="SignUp" to="/signUp"></md-tab>
  //           <md-tab id="tab-favorites" md-label="SignIn" to="/signIn"></md-tab>
  //         </md-tabs>
  //       </div>
  //     </md-app-toolbar>

  //     <md-app-drawer :md-active.sync="menuVisible">
  //       <md-toolbar class="md-transparent" md-elevation="6">Menu</md-toolbar>
  //       <div v-if="me">
  //         <md-list>
  //           <md-list-item @click="setMenuVisible">
  //             <md-icon id="icon-signUp" to="/signUp">person</md-icon>
  //             <span class="md-list-item-text">{{me.username}}</span>
  //           </md-list-item>

  //           <md-list-item @click="setMenuVisible">
  //             <md-icon>shopping_bag</md-icon>
  //             <span class="md-list-item-text">Shopping Bag</span>
  //           </md-list-item>

  //           <md-list-item @click="setMenuVisible">
  //             <md-icon>favorite</md-icon>
  //             <span class="md-list-item-text">Favorites</span>
  //           </md-list-item>

  //           <md-list-item @click="setMenuVisible">
  //             <md-icon>error</md-icon>
  //             <span class="md-list-item-text" @click="logout">logout</span>
  //           </md-list-item>
  //         </md-list>
  //       </div>
  //       <div v-else>
  //         <md-list-item to="/signIn" @click="setMenuVisible">
  //           <md-icon id="icon-signUp">move_to_inbox</md-icon>
  //           <span class="md-list-item-text">Login</span>
  //         </md-list-item>
  //       </div>
  //     </md-app-drawer>

  //     <md-app-content class="contents">
  //       <router-view />
  //     </md-app-content>
  //   </md-app>