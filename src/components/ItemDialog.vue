<template>
  <md-dialog
    :md-active.sync="showItemDialogData.showItemDialog"
    class="showItemDialogData.showItemDialog"
  >
    <div class="title" md-dynamic-height>
      <md-dialog-title>{{showItemDialogData.itemData.itemId}}</md-dialog-title>
    </div>
    <div class="dialogBody">
      <div>
        <img class="itemImg" :src="showItemDialogData.itemData.image" />
      </div>
      <div class="itemDescription">
        <span class="md-headline">{{showItemDialogData.itemData.itemName}}</span>
        <span class="md-subheading">{{showItemDialogData.itemData.price}}$</span>
        <span class="md-caption">({{showItemDialogData.itemData.amount}} item available)</span>
        <br />
        <div>
          <md-field class="md-layout-item md-size-25">
            <label>amount</label>
            <md-input
              v-model="quantity"
              type="number"
              min="0"
              :max="showItemDialogData.itemData.amount"
            ></md-input>
          </md-field>
        </div>
        <span class="md-caption">Total</span>
        <span class="md-subheading">{{showItemDialogData.itemData.price * this.quantity}}$</span>
      </div>
    </div>

    <md-dialog-actions>
      <md-button class="md-primary" @click="showItemDialogData.showItemDialog = false">Close</md-button>
      <md-button class="md-primary" @click="setFavorite(showItemDialogData.itemData)">
        <md-icon v-if="showItemDialogData.itemData.favorite">favorite</md-icon>
        <md-icon v-else>favorite_border</md-icon>
      </md-button>
      <md-button v-if="showItemDialogData.itemData.amount===0 || quantity===0" disabled>Add</md-button>
      <md-button
        v-else
        class="md-primary"
        @click.prevent="addToBag(showItemDialogData.itemData,Number(quantity))"
      >Add</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
export default {
  name: "ItemDialog",
  data() {
    return {
      quantity: 0
    };
  },
  computed: {
    showItemDialogData() {
      return this.$store.state.showItemDialogData;
    }
  },
  methods: {
    setFavorite(item) {
      if (!item.favorite) {
        this.$store.dispatch("setFavoriteFromDialog");
        this.$store.dispatch("addFavorite", item);
      } else {
        this.$store.dispatch("setFavoriteFromDialog");
        this.$store.dispatch("removeFavorite", item.itemId);
      }
    },
    addToBag(item, quantity) {
      if (quantity > this.$store.state.showItemDialogData.itemData.amount) {
        quantity = this.$store.state.showItemDialogData.itemData.amount;
      }
      this.$store.dispatch("addToBag", { item, quantity });
    }
  }
};
</script>

<style>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
}
.itemImg {
  width: 200px;
  margin-left: 10px;
  margin-right: 10px;
}
.itemDialog {
  width: 400px;
  height: 700px;
}
.dialogBody {
  display: flex;
  flex-direction: row;
}
.itemDescription {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}
.amountField {
  width: 30px;
}
</style>