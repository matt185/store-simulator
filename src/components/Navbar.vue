<template>
  <div id="navBar">
    <div id="nav">
      <img id="logo" alt="Vue logo" src="../assets/logo.png" />
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <div>
      <router-link to="/signUp">SignUp</router-link>|
      <router-link to="/signIn">SignIn</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>
#navBar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#logo {
  height: 30px;
  margin-right: 10px;
}

#nav {
  display: flex;
  align-items: center;
}
</style>