<template>
  <div>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card class="itemTable">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Item</h1>
        </div>

        <div class="md-toolbar-section-end">
          <md-field md-clearable>
            <md-input placeholder="search..." v-model="search" />
            <md-menu md-size="medium" md-align-trigger>
              <md-button md-menu-trigger>
                <md-icon class="tableCell">sort</md-icon>
              </md-button>

              <md-menu-content>
                <md-menu-item @click="searchField='itemId'">Item Id</md-menu-item>
                <md-menu-item @click="searchField='itemClass'">Item Class</md-menu-item>
                <md-menu-item @click="searchField='itemName'">Item Name</md-menu-item>
                <!-- <md-menu-item @click="searchField(4)">Price</md-menu-item> -->
              </md-menu-content>
            </md-menu>
          </md-field>
          <md-button class="md-fab md-mini md-primary" @click="openNewItemDialog()">
            <md-icon>add</md-icon>
            <md-tooltip md-direction="bottom">New Item</md-tooltip>
          </md-button>
        </div>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No users found"
        :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`"
      >
        <md-button class="md-primary md-raised" @click="newItem">Create New User</md-button>
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="itemId" md-sort-by="itemId">{{ item.itemId }}</md-table-cell>
        <md-table-cell md-label="Image">
          <img class="itemImg" :src="item.image" />
        </md-table-cell>
        <md-table-cell md-label="itemClass" md-sort-by="itemClass">{{ item. itemClass }}</md-table-cell>
        <md-table-cell md-label="itemName" md-sort-by="itemName">{{ item.itemName }}</md-table-cell>
        <md-table-cell md-label="amount" md-sort-by="amount">{{ item.amount }}</md-table-cell>
        <md-table-cell md-label="min_Amount" md-sort-by="min_Amount">{{ item.minAmount }}</md-table-cell>
        <md-table-cell md-label="price" md-sort-by="price">{{ item.price }}</md-table-cell>
        <md-table-cell class="tableCell">
          <md-button class="md-accent" @click="setItemToDelete(item.itemId)">
            <md-icon class="tableCell">delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <md-dialog-confirm
      :md-active.sync="deleteDialog"
      md-title="Delete"
      md-confirm-text="delete"
      md-cancel-text="cancel"
      @md-cancel="onCancel"
      @md-confirm="deleteItem()"
    />
    <newItemDialog />
  </div>
</template>

<script>
import gql from "graphql-tag";
import newItemDialog from "./NewItemDialog";
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
  name: "MainPageManager",
  components: { newItemDialog },
  data: () => ({
    searchField: "itemId",
    search: null,
    deleteDialog: false,
    itemToDelete: "",
    form: {
      itemId: "",
      itemClass: "",
      image: "",
      itemName: "",
      amount: "",
      minAmount: "",
      price: ""
    }
  }),
  computed: {
    searched() {
      if (!this.search) {
        return this.$store.state.items;
      }
      return searchByName(
        this.$store.state.items,
        this.searchField,
        this.search
      );
    }
  },
  methods: {
    newItem() {
      this.$store.dispatch("openNewItemDialog");
    },
    openNewItemDialog() {
      this.$store.dispatch("setNewItemDialog", { newItemDialog: true });
    },
    deleteItem() {
      this.$apollo.mutate({
        mutation: gql`
          mutation deleteItem($itemId: String!) {
            deleteItem(itemId: $itemId)
          }
        `,
        variables: {
          itemId: this.itemToDelete
        }
      });
      this.$store.dispatch("removeItem", this.itemToDelete);
      this.itemToDelete = "";
    },
    onCancel() {
      this.deleteDialog = false;
    },
    setItemToDelete(name) {
      this.itemToDelete = name;
      this.deleteDialog = true;
    }
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
.itemTable {
  width: 900px;
}
.itemImg {
  width: 40px;
}
.newItemDialog {
  display: flex;
  flex-direction: row;
}
.selectionField {
  margin-inline: 10px;
}
</style>
