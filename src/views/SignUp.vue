<template>
  <div>
    <ApolloMutation
      :mutation="require('../graphql/signUp.graphql')"
      :variables="{username, email,password}"
      @done="onDone"
    >
      <template v-slot="{mutate}">
        <form v-on:submit.prevent=" mutate()">
          <md-card class="md-inputCard">
            <md-card-header>
              <div class="md-title">SignUp</div>
            </md-card-header>
            <md-field>
              <label>Username</label>
              <md-input v-model="username" type="username" id="username" placeholder="Username"></md-input>
              <span class="md-error" v-if="errorMessage">{{this.errorMessage.message}}</span>
            </md-field>
            <md-field>
              <label>Email</label>
              <md-input v-model="email" placeholder="Email" type="email" id="email"></md-input>
            </md-field>
            <md-field>
              <label>Password</label>
              <md-input v-model="password" type="password" id="password" placeholder="Password"></md-input>
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
      email: "",
      password: "",
      userData: "",
      errorMessage: ""
    };
  },
  methods: {
    onDone(val) {
      // console.log(val.data.signUp.user.username);
      if (val.data.signUp) {
        this.userData = val.data.signUp.user.username;
      } else {
        this.errorMessage = {
          field: val.data.signUp.error.field,
          message: val.data.signUp.error.message
        };
      }
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