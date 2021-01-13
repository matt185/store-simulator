<template>
  <div>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Shopping Bag</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by article..." v-model="search" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state md-label="No items found">
        <md-button class="md-primary md-raised" to="/">Add</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="itemId">{{ item.itemId }}</md-table-cell>
        <md-table-cell md-label="quantity">{{ item.quantity }}</md-table-cell>
        <md-table-cell md-label="price">{{ item.TotalPrice/item.quantity}}</md-table-cell>
        <md-table-cell md-label="Total">{{ item.TotalPrice }}</md-table-cell>
        <md-table-cell class="tableCell">
          <md-button @click="setDialog(item.itemId,'search')">
            <md-icon>search</md-icon>
          </md-button>
          <md-button class="md-accent" @click="removeFromBag(item)">
            <md-icon class="tableCell">delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <div class="buttonContainer md-toolbar-section-end">
      <md-button class="md-dense md-primary md-raised" @click="newOrder()">order</md-button>
    </div>
    <ItemDialog />
  </div>
</template>

<script>
import ItemDialog from "./ItemDialog";
const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, field, term) => {
  if (term) {
    return items.filter(item => toLower(item[field]).includes(toLower(term)));
  }
  return items;
};
export default {
  name: "BagTab",
  components: { ItemDialog },
  data() {
    return { search: null, searchField: "itemId" };
  },
  computed: {
    searched() {
      if (!this.search) {
        return this.$store.state.bags;
      }
      return searchByName(
        this.$store.state.bags,
        this.searchField,
        this.search
      );
    }
  },
  methods: {
    newUser() {
      window.alert("Noop");
    },
    removeFromBag(item) {
      this.$store.dispatch("removeFromBag", item);
    },
    setDialog(id, add_search, quantity = 0) {
      let itemData = this.$store.state.items.filter(item => item.itemId === id);

      let item = {
        add_search,
        quantity,
        itemData: itemData[0]
      };
      item.showItemDialog = true;
      this.$store.dispatch("setShowItemData", item);
    },
    newOrder() {
      this.$store.dispatch("newOrder");
    }
  }
};
</script>

<style  scoped>
.md-table table {
  width: 82%;
  border-spacing: 0;
  border-collapse: collapse;
  overflow: hidden;
  margin-left: 74px;
}
.buttonContainer {
  width: 100%;
  justify-content: flex-end;
}
</style>
