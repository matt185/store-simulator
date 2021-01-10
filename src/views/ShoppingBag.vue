<template>
  <div>
    <md-tabs class="md-primary md-elevation-1" md-alignment="centered">
      <md-tab md-label="favorite">
        <Favorite />
      </md-tab>
      <md-tab md-label="shopping bag">Shopping Bag</md-tab>
      <md-tab md-label="order">Order</md-tab>
    </md-tabs>
  </div>
</template>

<script>
import Favorite from "../components/Favorite";
export default {
  name: "ShoppingBag",
  components: { Favorite }
};
</script>

<style lang="scss" scoped>
</style>