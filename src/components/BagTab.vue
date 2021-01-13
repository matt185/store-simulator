<template>
  <div>
    <md-table v-model="bags" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Shopping Bag</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by article..." v-model="search" @input="searchOnTable" />
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

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.itemId).includes(toLower(term)));
  }

  return items;
};
export default {
  name: "BagTab",
  components: { ItemDialog },
  data() {
    return { search: null, searched: [] };
  },

  created() {
    // this.searched = this.bags;
    // console.log(this.searched);
  },
  computed: {
    bags() {
      return this.$store.getters.bags;
    }
  },
  methods: {
    newUser() {
      window.alert("Noop");
    },
    searchOnTable() {
      this.searched = searchByName(this.bags, this.search);
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
