<template>
  <div>
    <md-table v-model="orders" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Order List</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by Order..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>
      <md-table-empty-state md-label="No order found">
        <md-button class="md-primary md-raised" to="/">Add</md-button>
      </md-table-empty-state>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="OrderId">{{ item.orderId }}</md-table-cell>
        <md-table-cell md-label="quantity">{{ item.itemAmount }}</md-table-cell>
        <md-table-cell md-label="Total">{{ item.price }}</md-table-cell>
        <md-table-cell md-label="Status">{{ item.status }}</md-table-cell>
        <md-table-cell class="tableCell">
          <div class="tab_button">
            <md-button @click="setOrderDialogData(item)">
              <md-icon>search</md-icon>
            </md-button>
            <md-button class="md-accent" @click="removeOrder(item.orderId)">
              <md-icon class="tableCell">delete</md-icon>
            </md-button>
          </div>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <div class="md-toolbar-section-end"></div>
    <OrderDialog />
  </div>
</template>

<script>
import OrderDialog from "./OrderDialog";
const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.itemId).includes(toLower(term)));
  }

  return items;
};
export default {
  name: "Order",
  components: { OrderDialog },
  data() {
    return { search: null, searched: [] };
  },

  created() {},
  computed: {
    orders() {
      return this.$store.state.orders;
    }
  },
  methods: {
    searchOnTable() {
      this.searched = searchByName(this.orders, this.search);
    },
    removeOrder(id) {
      this.$store.dispatch("deleteOrder", id);
    },
    setOrderDialogData(item) {
      item.showOrderDialog = true;
      this.$store.dispatch("setOrderDialogData", item);
    }
  }
};
</script>

<style  scoped>
.tab_button {
  display: flex;
  flex-direction: row;
}
.md-table table {
  width: 82%;
  border-spacing: 0;
  border-collapse: collapse;
  overflow: hidden;
  margin-left: 74px;
}
</style>