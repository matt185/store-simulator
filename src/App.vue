<template>
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
          <md-tooltip md-direction="bottom">Menu</md-tooltip>
        </md-button>
        <span class="md-title">My Store</span>
        <div id="nav">
          <md-tabs class="md-primary" md-sync-route>
            <md-tab id="tab-home" md-label="Home" to="/" exact></md-tab>
            <md-tab v-if="auth" id="agenda" md-label="Agenda" to="/messages"></md-tab>
          </md-tabs>
        </div>
        <div class="searchBar">
          <md-autocomplete
            class="search"
            v-model="search"
            :md-options="selectionList"
            md-layout="box"
            @input="setUserSearch()"
          >
            <label>Search...</label>
          </md-autocomplete>
          <md-menu md-size="medium" md-align-trigger>
            <md-button class="md-icon-button" md-menu-trigger>
              <md-icon>sort</md-icon>
              <md-tooltip md-direction="bottom">Filter Options</md-tooltip>
            </md-button>
            <md-menu-content>
              <md-menu-item @click="searchField('all')">All</md-menu-item>
              <md-menu-item @click="searchField('itemClass')">Item Class</md-menu-item>
              <md-menu-item @click="searchField('itemName')">Item Name</md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>

        <div class="md-toolbar-section-end">
          <md-menu md-align-trigger md-size="big">
            <md-button class="md-icon-button" md-menu-trigger>
              <md-icon>favorite</md-icon>
              <md-tooltip md-direction="bottom">Favorite</md-tooltip>
            </md-button>
            <md-menu-content>
              <md-list-item class="md-elevation-1" v-for="item in favorite" :key="item.itemId">
                <md-avatar>
                  <img :src="item.image" />
                </md-avatar>

                <div class="md-list-item-text">
                  <span class="md-title">{{item.itemId}}</span>
                  <span class="md-subheading">{{item.itemName}}</span>
                  <span v-if="item.amount>1" class="md-caption">({{item.amount}} items available)</span>
                  <span v-else class="md-caption">({{item.amount}} item available)</span>
                </div>
                <md-button
                  class="md-icon-button md-list-action"
                  @click="updateFavorite(item.itemId)"
                >
                  <md-icon class="md-primary">clear</md-icon>
                </md-button>
              </md-list-item>
            </md-menu-content>
          </md-menu>

          <md-menu md-align-trigger md-size="big">
            <md-button class="md-icon-button" md-menu-trigger>
              <md-icon>shopping_bag</md-icon>
              <md-tooltip md-direction="bottom">Shopping Bag</md-tooltip>
            </md-button>
            <md-menu-content>
              <md-list-item v-if="bags.length===0">
                <div class="add_button">
                  <md-button to="/">
                    <md-icon>add_circle</md-icon>
                  </md-button>
                </div>
              </md-list-item>
              <md-list-item v-else class="md-elevation-1" v-for="item in bags" :key="item.itemId">
                <md-avatar>
                  <img :src="item.image" />
                </md-avatar>

                <div class="md-list-item-text" to="/shopping_bag">
                  <span class="md-headline">{{item.itemId}}</span>
                  <!-- <span>{{item.itemName}}</span> -->
                  <p v-if="item.quantity >1" class="md-caption">({{item.quantity}} items saved)</p>
                  <p v-else class="md-caption">({{item.quantity}} item saved)</p>
                </div>
                <md-button class="md-icon-button md-list-action" @click="removeFromBag(item)">
                  <md-icon class="md-primary">clear</md-icon>
                </md-button>
              </md-list-item>
            </md-menu-content>
          </md-menu>
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
</template>

<script>
import gql from "graphql-tag";
import { partialAuth } from "./../server/server/constant";
import { mapGetters } from "vuex";

export default {
  name: "LastRowFixed",
  data: () => ({
    me: {},
    menuVisible: false,
    search: "",
    // searchField: "all",
    favoriteList: []
  }),

  beforeCreate() {
    this.$store.dispatch("fetchItemsList");
    this.$store.dispatch("fetchFavoriteList");
    this.$store.dispatch("fetchBagList");
    this.$store.dispatch("fetchOrders");
  },
  async created() {
    // const response = await this.$apollo.query({
    //   query: gql`
    //     query favorites {
    //       favorites {
    //         itemId
    //         amount
    //         itemName
    //       }
    //     }
    //   `
    // });
    // this.favoriteList = this.$store.state.favorite;
    // console.log(this.$store.state.favorite);
  },
  computed: {
    ...mapGetters(["favorite", "bags"]),
    // items() {
    //   if (this.$store.state.userSearchField === "all") {
    //     return this.$store.state.items;
    //   }
    //   return searchByName(
    //     this.$store.state.items,
    //     this.searchField,
    //     this.search
    //   );
    // },
    selectionList() {
      let filter = this.searchField;
      let items = this.$store.state.items;
      let result = [];
      if (filter === "itemName") {
        result = items.map(item => item.itemName);
      } else if (filter === "itemClass") {
        result = items.map(item => item.itemClass);
      }
      if (filter === "all") {
        let a = items.map(item => item.itemName);
        let b = items.map(item => item.itemClass);
        result = [...a, ...b];
      }
      return result;
    },
    auth() {
      if (this.me) {
        if (partialAuth.includes(this.me.role)) {
          return true;
        }
      }
      return false;
    }
  },

  methods: {
    logout() {
      this.$router.push({ name: "Home", query: { redirect: "/" } });
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
    },
    updateFavorite(id) {
      this.$store.dispatch("removeFavorite", id);
    },
    removeFromBag(item) {
      this.$store.dispatch("removeFromBag", item);
    },
    searchField(val) {
      this.$store.dispatch("setUserSearchField", val);
    },
    setUserSearch() {
      this.$store.dispatch("setUserSearch", this.search);
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
.favorite {
  background-color: rgb(127, 127, 131);
}

.add_button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.searchBar {
  display: flex;
  flex-direction: row;
  width: 60%;
  justify-content: center;
}
.md-toolbar-section-end {
  width: 10%;
}
</style>

  