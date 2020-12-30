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
            <md-field>
              <label>Username</label>
              <md-input v-model="username" type="username" id="username" placeholder="Username"></md-input>
              <span class="md-error" v-if="errorMessage">{{this.errorMessage.message}}</span>
            </md-field>
            <!-- <md-field>
              <label>Email</label>
              <md-input v-model="email" placeholder="Email" type="email" id="email"></md-input>
            </md-field>-->
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
      password: "",
      userData: "",
      errorMessage: ""
    };
  },
  methods: {
    onDone(val) {
      console.log(val);

      console.log(val.data.signIn.user.username);
      if (val.data.signIn) {
        this.userData = val.data.signIn.user.username;
      } else {
        this.errorMessage = {
          field: val.data.signIn.error.field,
          message: val.data.signIn.error.message
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