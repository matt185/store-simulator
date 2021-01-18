<template>
  <div>
    <md-dialog :md-active.sync="orderedData.showOrderDialog">
      <md-dialog-title>Preferences</md-dialog-title>
      <md-table v-model="orderList" md-card>
        <md-table-toolbar>
          <h1 class="md-title">Users</h1>
        </md-table-toolbar>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Art.Id">{{ item.itemId }}</md-table-cell>
          <md-table-cell md-label="amount">{{ item.quantity }}</md-table-cell>
          <md-table-cell md-label="SinglePiece ($)">{{ item.TotalPrice/item.quantity}}</md-table-cell>
          <md-table-cell md-label="Total ($)">{{ item.TotalPrice }}</md-table-cell>
        </md-table-row>
      </md-table>
      <md-dialog-actions>
        <md-button class="md-primary" @click="resetDialog">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "OrderDialog",

  computed: {
    orderedData() {
      return this.$store.state.orderDialogData;
    },
    orderList() {
      let order = this.$store.state.orderDialogData;
      console.log(order.itemList);
      return order.itemList;
    }
  },
  methods: {
    resetDialog() {
      this.$store.dispatch("resetOrderDialogData");
    }
  }
};
</script>

<style>
.md-dialog /deep/.md-dialog-container {
  max-width: 768px;
}
</style>