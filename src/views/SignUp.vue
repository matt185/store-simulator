<template>
  <div>
    <div v-if="!me">
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
              <md-field :class="usernameClass">
                <label>Username</label>
                <md-input v-model="username" type="textarea" id="username" required></md-input>
                <span class="md-error">Username not inserted or wrong</span>
              </md-field>
              <md-field :class="emailClass">
                <label>Email</label>
                <md-input v-model="email" type="email" id="email" required></md-input>
                <span class="md-error">Email not inserted or wrong</span>
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
    <div v-else>{{me.username}}</div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      userData: "",
      errorComment: "",
      hasMessagesUsername: false,
      hasMessagesPassword: false,
      hasMessagesEmail: false,
      errorMessage: { field: "", message: "" }
    };
  },
  computed: {
    usernameClass() {
      return {
        "md-invalid": this.hasMessagesUsername
      };
    },
    emailClass() {
      return {
        "md-invalid": this.hasMessagesEmail
      };
    },
    passwordClass() {
      return {
        "md-invalid": this.hasMessagesPassword
      };
    }
  },
  methods: {
    onDone(val) {
      console.log(val.data.signUp);
      if (val.data.signUp.user) {
        this.userData = val.data.signUp.user.username;
        this.$router.replace("/");
      } else if (val.data.signUp.error.field === "username") {
        this.errorComment = val.data.signUp.error.message;
        this.hasMessagesUsername = "show";
      } else if (val.data.signUp.error.field === "email") {
        this.errorComment = val.data.signUp.error.message;
        this.hasMessagesEmail = "show";
      } else if (val.data.signUp.error.field === "password") {
        this.hasMessagesUsername = "false";
        this.errorComment = val.data.signUp.error.message;
        this.hasMessagesPassword = "show";
      }
    }
  },
  apollo: {
    me: {
      query: gql`
        query me {
          me {
            username
            role
          }
        }
      `
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