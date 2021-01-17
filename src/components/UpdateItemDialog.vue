<template>
  <md-dialog class="newItemDialog" :md-active.sync="dialogInfo.updateItemDialog">
    <md-toolbar class="md-primary">
      <h3 class="md-title item-dialog-toolbar">Update {{dialogInfo.id}}</h3>
    </md-toolbar>
    <div class="md-layout-item md-small-size-100 newItemDialog">
      <div class="idField">
        <md-field class="selectionField">
          <label for="itemId">ItemId</label>
          <md-input name="itemId" id="itemId" v-model="dialogInfo.itemId" />
        </md-field>
      </div>
      <div class="imageField">
        <md-field class="selectionField">
          <label for="image">Image Link</label>
          <md-input name="image" id="image" v-model="dialogInfo.image" />
        </md-field>
      </div>
      <div class="productInfo">
        <div class="itemClass">
          <md-field class="selectionField">
            <label for="itemClass">ItemClass</label>
            <md-input name="itemClass" id="itemClass" v-model="dialogInfo.itemClass" />
          </md-field>
        </div>
        <div class="itemName">
          <md-field class="selectionField">
            <label for="itemName">ItemName</label>
            <md-input name="itemName" id="itemName" v-model="dialogInfo.itemName" />
          </md-field>
        </div>
      </div>
      <div class="product-price">
        <div class="amount">
          <md-field class="selectionField">
            <label for="amount">Amount</label>
            <md-input name="amount" id="amount" v-model="dialogInfo.amount" />
          </md-field>
        </div>
        <div class="minAmount">
          <md-field class="selectionField">
            <label for="minAmount">minAmount</label>
            <md-input name="minAmount" id="minAmount" v-model="dialogInfo.minAmount" />
          </md-field>
        </div>
        <div class="price">
          <md-field class="selectionField">
            <label for="price">Price</label>
            <md-input name="price" id="price" v-model="dialogInfo.price" />
          </md-field>
        </div>
      </div>
    </div>

    <md-dialog-actions>
      <md-button class="md-primary" @click="closeDialog">Close</md-button>
      <md-button class="md-primary" @click.prevent="updateItem(dialogInfo)">Save</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
export default {
  name: "updateItemDialog",
  data: () => {
    return {
      form: {
        itemId: "",
        itemClass: "",
        image: "",
        itemName: "",
        amount: "",
        minAmount: "",
        price: "",
        updateItemDialog: false
      }
    };
  },
  computed: {
    dialogInfo() {
      return this.$store.state.updateItemDialog;
    }
  },
  methods: {
    closeDialog() {
      this.$store.dispatch("resetUpdateItemDialog");
    },
    updateItem(item) {
      this.$store.dispatch("updateItem", item);
    }
  }
};
</script>

<style>
.item-dialog-toolbar {
  width: 100%;
}
.newItemDialog {
  height: fit-content;
}
.selectionField {
  margin-left: 10px;
}
</style>