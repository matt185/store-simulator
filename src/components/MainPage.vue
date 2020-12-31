<template>
  <div id="itemTable">
    <md-card v-for="(item,i) in items" :key="i">
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
        <md-button></md-button>
        <md-button>Action</md-button>
      </md-card-actions>
    </md-card>
    <!-- <table border="1px" id="table">
      <tr>
        <td class="head"></td>
        <td class="head">id</td>
        <td class="head">itemClass</td>
        <td class="head">itemName</td>
        <td class="head">amount</td>
        <td class="head">price</td>
      </tr>
      <tr v-for="(item,i) in items" :key="i">
        <td class="head">{{i+1}}</td>
        <td>{{item.itemId}}</td>
        <td>{{item.itemClass}}</td>
        <td>{{item.itemName}}</td>
        <td>{{item.amount}}</td>
        <td>{{item.price}}</td>
      </tr>
    </table>-->
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "MainPage",
  data: () => {
    return {
      items: []
    };
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
