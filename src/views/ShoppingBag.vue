<template>
  <div class="container">
    <md-tabs class="md-primary md-elevation-1" md-alignment="centered">
      <md-tab md-label="favorite">
        <Favorite />
      </md-tab>
      <md-tab md-label="shopping bag">
        <BagTab />
      </md-tab>
      <md-tab md-label="order">
        <Order />
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
import Favorite from "../components/Favorite";
import BagTab from "../components/BagTab";
import Order from "../components/OrderView";
export default {
  name: "ShoppingBag",
  components: { Favorite, BagTab, Order }
};
</script>

<style scoped>
.container {
  max-width: 880px;
}
</style>