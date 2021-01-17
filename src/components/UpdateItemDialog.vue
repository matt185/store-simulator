<template>
  <md-dialog class="newItemDialog" :md-active.sync="dialogInfo.updateItemDialog">
    <md-dialog-title>New Item</md-dialog-title>
    <div class="md-layout-item md-small-size-100 newItemDialog">
      <md-field class="selectionField">
        <label for="itemId">ItemId</label>
        <md-input name="itemId" id="itemId" v-model="dialogInfo.itemId" />
      </md-field>
      <md-field class="selectionField">
        <label for="image">Image Link</label>
        <!-- <md-file name="image" id="image" v-model="form.image" " /> -->
        <md-input name="image" id="image" v-model="dialogInfo.image" />
      </md-field>
      <md-field class="selectionField">
        <label for="itemClass">ItemClass</label>
        <md-input name="itemClass" id="itemClass" v-model="dialogInfo.itemClass" />
      </md-field>
      <md-field class="selectionField">
        <label for="itemName">ItemName</label>
        <md-input name="itemName" id="itemName" v-model="dialogInfo.itemName" />
      </md-field>
      <md-field class="selectionField">
        <label for="amount">Amount</label>
        <md-input name="amount" id="amount" v-model="dialogInfo.amount" />
      </md-field>
      <md-field class="selectionField">
        <label for="minAmount">minAmount</label>
        <md-input name="minAmount" id="minAmount" v-model="dialogInfo.minAmount" />
      </md-field>
      <md-field class="selectionField">
        <label for="price">Price</label>
        <md-input name="price" id="price" v-model="dialogInfo.price" />
      </md-field>
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
.newItemDialog {
  height: fit-content;
}
.selectionField {
  margin-left: 10px;
}
</style>