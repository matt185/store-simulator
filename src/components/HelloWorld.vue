<template>
  <div id="itemTable">
    <table border="1px" id="table">
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
    </table>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "HelloWorld",
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
    `
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#itemTable {
  display: flex;
  flex-direction: column;
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
</style>
