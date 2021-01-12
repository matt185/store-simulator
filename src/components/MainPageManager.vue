<template>
  <div>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card class="itemTable">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Item</h1>
        </div>

        <div class="md-toolbar-section-end">
          <md-field md-clearable>
            <md-input placeholder="search" v-model="search" @input="searchOnTable" />
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
          <md-dialog :md-active.sync="newItemDialog">
            <md-dialog-title>Preferences</md-dialog-title>
            <div class="md-layout-item md-small-size-100 newItemDialog">
              <md-field class="selectionField">
                <label for="itemId">ItemId</label>
                <md-input name="itemId" id="itemId" v-model="form.itemId" />
              </md-field>
              <md-field class="selectionField">
                <label for="image">Image Link</label>
                <!-- <md-file name="image" id="image" v-model="form.image" " /> -->
                <md-input name="image" id="image" v-model="form.image" />
              </md-field>
              <md-field class="selectionField">
                <label for="itemClass">ItemClass</label>
                <md-input name="itemClass" id="itemClass" v-model="form.itemClass" />
              </md-field>
              <md-field class="selectionField">
                <label for="itemName">ItemName</label>
                <md-input name="itemName" id="itemName" v-model="form.itemName" />
              </md-field>
              <md-field class="selectionField">
                <label for="amount">Amount</label>
                <md-input name="amount" id="amount" v-model="form.amount" />
              </md-field>
              <md-field class="selectionField">
                <label for="minAmount">minAmount</label>
                <md-input name="minAmount" id="minAmount" v-model="form.minAmount" />
              </md-field>
              <md-field class="selectionField">
                <label for="price">Price</label>
                <md-input name="price" id="price" v-model="form.price" />
              </md-field>
            </div>

            <md-dialog-actions>
              <md-button class="md-primary" @click="newItemDialog = false">Close</md-button>
              <md-button class="md-primary" @click="newItem">Save</md-button>
            </md-dialog-actions>
          </md-dialog>
          <md-button class="md-fab md-mini md-primary" @click="newItemDialog=true">
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
            <md-dialog-confirm
              :md-active.sync="deleteDialog"
              md-title="Delete"
              md-confirm-text="delete"
              md-cancel-text="cancel"
              @md-cancel="onCancel"
              @md-confirm="deleteItem()"
            />
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import gql from "graphql-tag";
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
  data: () => ({
    searchField: "itemName",
    search: null,
    deleteDialog: false,
    searched: [],
    items: [],
    newItemDialog: false,
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
  async created() {
    this.items = this.$store.state.items;
    this.searched = this.items;
    // console.log("searched", this.searched);
  },
  methods: {
    newItem() {
      console.log(this.form.image);
      this.$apollo.mutate({
        mutation: gql`
          mutation addItem(
            $itemId: String!
            $itemClass: String!
            $itemName: String!
            $image: String!
            $amount: Int!
            $minAmount: Int!
            $price: Float!
          ) {
            addItem(
              itemId: $itemId
              itemClass: $itemClass
              itemName: $itemName
              image: $image
              amount: $amount
              minAmount: $minAmount
              price: $price
            ) {
              itemId
              itemName
              itemClass
              image
              amount
              minAmount
              price
              createdAt
              updatedAt
            }
          }
        `,
        variables: {
          itemId: this.form.itemId,
          itemName: this.form.itemName,
          image: this.form.image,
          itemClass: this.form.itemClass,
          amount: Number(this.form.amount),
          minAmount: Number(this.form.minAmount),
          price: Number(this.form.price)
        }
      });
      this.searched.push(this.form);
      this.$store.dispatch("addItem", this.form);
      this.newItemDialog = false;
    },
    searchOnTable() {
      this.searched = searchByName(this.items, this.searchField, this.search);
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
      for (let i = 0; i < this.searched.length; i++) {
        if (this.searched[i].itemId === this.itemToDelete) {
          this.searched.splice(i, 1);
        }
      }
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
