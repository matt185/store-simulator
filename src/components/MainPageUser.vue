<template>
  <div id="itemTable">
    <md-card v-for="(item,i) in items" :key="i" md-with-hover>
      <md-card-header>
        <md-card-media md-big>
          <img class="itemImg" src="https://i.ibb.co/vxxMqbd/IMG-1019.jpg" alt="People" />
        </md-card-media>
        <md-card-header-text>
          <div class="md-subhead">{{item.itemId}}</div>
          <div class="md-title">{{item.itemName}}</div>
          <div class="md-subhead">{{item.itemClass}}</div>
        </md-card-header-text>
      </md-card-header>

      <md-card-actions>
        <md-button>
          <md-icon>search</md-icon>
        </md-button>
        <md-button @click="updateFavorite(item)">
          <md-icon v-if="item.favorite">favorite</md-icon>
          <md-icon v-else>favorite_border</md-icon>
        </md-button>
        <md-button @click="addToBag(item,1)">
          <md-icon>shopping_bag</md-icon>
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "MainPageUser",
  data: () => {
    return {
      items: [],
      itemsList: [],
      singleViewDialog: false
    };
  },

  async created() {
    this.items = this.$store.state.items;
    this.itemsList = this.items;
  },
  methods: {
    updateFavorite(item) {
      if (!item.favorite) {
        for (let i = 0; i < this.itemsList.length; i++) {
          if (this.itemsList[i].itemId === item.itemId) {
            this.itemsList[i].favorite = !this.itemsList[i].favorite;
          }
        }
        this.$store.dispatch("addFavorite", item);
      } else {
        for (let i = 0; i < this.itemsList.length; i++) {
          if (this.itemsList[i].itemId === item.itemId) {
            this.itemsList[i].favorite = !this.itemsList[i].favorite;
          }
        }
        this.$store.dispatch("removeFavorite", item.itemId);
      }
    },
    addToBag(item, quantity) {
      this.$store.dispatch("addToBag", { item, quantity });
    }
  },
  apollo: {
    me: gql`
      query {
        me {
          userId
          username
          role
        }
      }
    `
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#itemTable {
  display: flex;

  align-items: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.md-card {
  width: 300px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
.itemImg {
  width: 120px;
}
</style>
