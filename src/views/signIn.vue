<template>
  <div>
    <ApolloMutation
      :mutation="require('../graphql/signIn.graphql')"
      :variables="{username,password}"
      @done="onDone"
    >
      <template v-slot="{mutate}">
        <form v-on:submit.prevent=" mutate()">
          <md-card class="md-inputCard">
            <md-card-header>
              <div class="md-title">SignIn</div>
            </md-card-header>
            <md-field :class="usernameClass">
              <label>Username</label>
              <md-input v-model="username" type="textarea" id="username" required></md-input>
              <span class="md-error">Username not inserted or wrong</span>
            </md-field>
            <md-field :class="passwordClass">
              <label>Password</label>
              <md-input
                v-model="password"
                type="password"
                id="password"
                required
                @keyup.enter="mutate()"
              ></md-input>
              <span class="md-error">Wrong password</span>
            </md-field>
            <md-button class="md-dense md-raised md-primary" @click="mutate()">Submit</md-button>
          </md-card>
        </form>
      </template>
    </ApolloMutation>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      userData: "",
      errorComment: "",
      hasMessagesUsername: false,
      hasMessagesPassword: false,
      errorMessage: { field: "", message: "" }
    };
  },
  methods: {
    onDone(val) {
      this.$store.dispatch("login", val.data.signIn.user);
      this.$store.dispatch("fetchItemsList");
      this.$store.dispatch("fetchFavoriteList");
      this.$store.dispatch("fetchBagList");
      this.$store.dispatch("fetchOrders");
      if (val.data.signIn.user) {
        this.userData = val.data.signIn.user.username;
        this.$router.replace("/");
      } else if (val.data.signIn.error.field === "username") {
        this.errorComment = val.data.signIn.error.message;
        this.hasMessagesUsername = "show";
      } else if (val.data.signIn.error.field === "password") {
        this.hasMessagesUsername = "false";
        this.errorComment = val.data.signIn.error.message;
        this.hasMessagesPassword = "show";
      }
    }
  },
  computed: {
    usernameClass() {
      return {
        "md-invalid": this.hasMessagesUsername
      };
    },
    passwordClass() {
      return {
        "md-invalid": this.hasMessagesPassword
      };
    }
  }
};
</script>

<style  scoped>
.md-inputCard {
  min-width: 300px;
  width: 600px;
  margin-top: 30px;
  padding: 5px;
}
.inputField {
  display: flex;
  flex-direction: column;
  width: 800px;
}
</style>