<template>
  <div id="itemTable">
    <md-card v-for="(item,i) in items" :key="i" md-with-hover>
      <md-card-header>
        <md-card-media md-big>
          <img class="itemImg" :src="item.image" alt="People" />
        </md-card-media>
        <md-card-header-text>
          <div class="md-subhead">{{item.itemId}}</div>
          <div class="md-title">{{item.itemName}}</div>
          <div class="md-subhead">{{item.itemClass}}</div>
          <div class="md-subheading">{{item.price}}$</div>
          <div class="md-caption">({{item.amount}} item available)</div>
        </md-card-header-text>
      </md-card-header>

      <md-card-actions>
        <md-button @click="setDialog(item,'search')">
          <md-icon>search</md-icon>
        </md-button>
        <md-button @click="updateFavorite(item)">
          <md-icon v-if="item.favorite">favorite</md-icon>
          <md-icon v-else>favorite_border</md-icon>
        </md-button>
        <md-button @click="setDialog(item,'add')">
          <md-icon>shopping_bag</md-icon>
        </md-button>
      </md-card-actions>
    </md-card>
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
  name: "MainPageUser",
  components: { ItemDialog },
  data: () => {
    return {
      singleViewDialog: false
    };
  },
  computed: {
    showItemDialogData() {
      return this.$store.state.showItemDialogData;
    },
    items() {
      if (!this.$store.state.userSearchValue) {
        return this.$store.getters.items;
      }
      return searchByName(
        this.$store.state.items,
        this.$store.state.userSearchField,
        this.$store.state.userSearchValue
      );
    }
  },
  methods: {
    updateFavorite(item) {
      if (!item.favorite) {
        this.$store.dispatch("addFavorite", item);
        this.$store.dispatch("setItemsFavorite", item.itemId);
      } else {
        this.$store.dispatch("removeFavorite", item.itemId);
        this.$store.dispatch("setItemsFavorite", item.itemId);
      }
    },
    addToBag(item, quantity) {
      this.$store.dispatch("addToBag", { item, quantity });
    },
    setDialog(itemData, add_search, quantity = 0) {
      let item = {
        add_search,
        quantity,
        itemData: itemData
      };
      item.showItemDialog = true;
      this.$store.dispatch("setShowItemData", item);
    }
  }
};
</script>

<style scoped>
#itemTable {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 102%;
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
.showItemDialog {
  overflow: auto;
}
</style>
