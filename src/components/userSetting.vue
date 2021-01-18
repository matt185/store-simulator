<template>
  <div>
    <div>
      <md-card>
        <md-card-header>
          <div class="md-title title">User Setting</div>
        </md-card-header>

        <md-card-content>
          <div class="md-subheading">Delete Account</div>
          <md-checkbox v-model="checked" class="md-primary">Delete account</md-checkbox>
          <md-button v-if="!checked" class="md-raised" disabled>delete</md-button>
          <md-button v-else class="md-raised md-primary" @click="deleteDialog = true">delete</md-button>
          <md-dialog-confirm
            :md-active.sync="deleteDialog"
            md-title="Delete"
            md-confirm-text="delete"
            md-cancel-text="cancel"
            @md-cancel="onCancel"
            @md-confirm="onConfirm"
          />
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
export default {
  name: "UserSetting",
  data: () => {
    return { me: {}, deleteDialog: false, checked: false };
  },
  methods: {
    onConfirm() {
      this.$apollo.mutate({
        mutation: gql`
          mutation($username: String!) {
            deleteUser(username: $username)
          }
        `,
        variables: {
          username: this.me.username
        }
      });
      location.reload();
      this.$router.push({ name: "Home", query: { redirect: "/" } });
    },
    onCancel() {
      this.deleteDialog = false;
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

<style>
.title {
  width: fit-content;
}
</style>