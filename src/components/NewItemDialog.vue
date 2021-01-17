<template>
  <div class="new-item-dialog">
    <md-dialog class="newItemDialogContent" :md-active.sync="dialogInfo.newItemDialog">
      <md-toolbar class="md-primary">
        <h3 class="md-title">New Item</h3>
      </md-toolbar>
      <div class="md-layout-item md-small-size-100 newItemDialog">
        <div class="idField">
          <md-field class="selectionField">
            <label for="itemId">ItemId</label>
            <md-input name="itemId" id="itemId" v-model="form.itemId" />
          </md-field>
        </div>
        <div class="imageField">
          <md-field class="selectionField">
            <label for="image">Image Link</label>
            <md-input name="image" id="image" v-model="form.image" />
          </md-field>
        </div>
        <div class="productInfo">
          <div class="itemClass">
            <md-field class="selectionField">
              <label for="itemClass">ItemClass</label>
              <md-input name="itemClass" id="itemClass" v-model="form.itemClass" />
            </md-field>
          </div>
          <div class="itemName">
            <md-field class="selectionField">
              <label for="itemName">ItemName</label>
              <md-input name="itemName" id="itemName" v-model="form.itemName" />
            </md-field>
          </div>
        </div>
        <div class="product-price">
          <div class="amount">
            <md-field class="selectionField">
              <label for="amount">Amount</label>
              <md-input name="amount" id="amount" v-model="form.amount" />
            </md-field>
          </div>
          <div class="minAmount">
            <md-field class="selectionField">
              <label for="minAmount">minAmount</label>
              <md-input name="minAmount" id="minAmount" v-model="form.minAmount" />
            </md-field>
          </div>
          <div class="price">
            <md-field class="selectionField">
              <label for="price">Price</label>
              <md-input name="price" id="price" v-model="form.price" />
            </md-field>
          </div>
        </div>
      </div>

      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog">Close</md-button>
        <md-button class="md-primary" @click="newItem">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "newItemDialog",
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
        newItemDialog: false
      }
    };
  },
  computed: {
    dialogInfo() {
      return this.$store.getters.showNewItemDialog;
    }
  },
  methods: {
    closeDialog() {
      this.$store.dispatch("resetNewItemDialog");
    },
    newItem() {
      this.$store.dispatch("addItem", this.form);
    }
  }
};
</script>


<style>
.new-item-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
}
.newItemDialog {
  display: flex;
  flex-direction: column;
  padding-inline: 20px;
}
.productInfo,
.product-price {
  display: flex;
  flex-direction: row;
}
.idField {
  width: 50%;
}
.imageField {
  width: 70%;
}
.itemClass {
  width: 50%;
  padding-right: 10px;
}
.itemName {
  width: 50%;
  padding-left: 10px;
}
.price {
  width: 33%;
  padding-left: 10px;
}
.amount {
  width: 33%;
  padding-right: 10px;
}
.minAmount {
  width: 33%;
  padding-inline: 10px;
}
.selectionField {
  margin-left: 10px;
}
</style>