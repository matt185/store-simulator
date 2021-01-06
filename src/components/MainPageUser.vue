<template>
  <div id="itemTable">
    <md-card v-for="(item,i) in this.itemsList" :key="i" md-with-hover>
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
        <md-button @click="updateFavorite(item.itemId)">
          <md-icon v-if="item.favorite">favorite</md-icon>
          <md-icon v-else>favorite_border</md-icon>
        </md-button>
        <md-button>Add</md-button>
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
      itemsList: []
    };
  },
  async created() {
    const response = await this.$apollo.query({
      query: gql`
        query items {
          items {
            itemId
            itemClass
            itemName
            amount
            minAmount
            price
            favorite
          }
        }
      `
    });

    this.items = response.data.items;
    this.itemsList = this.items;
  },
  methods: {
    updateFavorite(id) {
      this.$apollo.mutate({
        mutation: gql`
          mutation updateFavorite($itemId: String!) {
            updateFavorite(itemId: $itemId)
          }
        `,
        variables: {
          itemId: id
        }
      });
      for (let i = 0; i < this.itemsList.length; i++) {
        if (this.itemsList[i].itemId === id) {
          this.itemsList[i].favorite = !this.itemsList[i].favorite;
        }
      }
    }
  },
  apollo: {
    items: gql`
      query {
        items {
          itemId
          itemClass
          itemName
          amount
          minAmount
          price
          favorite
        }
      }
    `,
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
