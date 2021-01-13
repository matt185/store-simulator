<template>
  <div class="favorite_table">
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Favorite</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by article..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-rounded
        md-icon="access_time"
        md-label="Nothing in Snoozed"
        md-description="Anything you snooze will go here until it's time for it to return to the inbox."
      ></md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell class="tableCell" md-label="ItemId">{{ item.itemId }}</md-table-cell>
        <md-table-cell class="tableCell" md-label="ItemName">{{ item.itemName }}</md-table-cell>
        <md-table-cell class="tableCell" md-label="Item Available">{{ item.amount }}</md-table-cell>
        <md-table-cell class="tableCell" md-label="price">{{ item.price }}</md-table-cell>
        <md-table-cell class="tableCell">
          <md-button class="md-accent" @click="updateFavorite(item.itemId)">
            <md-icon class="tableCell">delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
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
  name: "Favorite",
  data() {
    return { search: null, searchField: "itemName" };
  },
  computed: {
    searched() {
      if (!this.search) {
        return this.$store.state.favorite;
      }
      return searchByName(
        this.$store.state.favorite,
        this.searchField,
        this.search
      );
    }
  },
  methods: {
    updateFavorite(id) {
      this.$store.dispatch("removeFavorite", id);
    }
  }
};
</script>

<style  scoped>
.md-table table {
  width: 82%;
  border-spacing: 0;
  border-collapse: collapse;
  margin-left: 74px;
}
</style>
