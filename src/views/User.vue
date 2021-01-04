<template>
  <div>
    <p style="color: orange">TODO</p>
    <li>set role</li>
    <li>set update</li>
    <li>set more option for normal user</li>
    <li>split in more component the file</li>
    <div v-if="auth">
      <md-table v-model="searched" md-sort="username" md-sort-order="asc" md-card>
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Users</h1>
          </div>
          <div class="md-toolbar-section-end">
            <md-field md-clearable>
              <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
            </md-field>
            <md-dialog :md-active.sync="addUserDialog">
              <md-dialog-title>Preferences</md-dialog-title>
              <div class="md-layout-item md-small-size-100 newUserDialog">
                <md-field class="selectionField">
                  <label for="username">Username</label>
                  <md-input name="username" id="username" v-model="form.username" />
                </md-field>
                <md-field class="selectionField">
                  <label for="email">Email</label>
                  <md-input name="email" id="email" v-model="form.email" />
                </md-field>
              </div>

              <md-dialog-actions>
                <md-button class="md-primary" @click="addUserDialog = false">Close</md-button>
                <md-button class="md-primary" @click="newUser">Save</md-button>
              </md-dialog-actions>
            </md-dialog>
            <md-button class="md-fab md-mini md-primary" @click="addUserDialog=true">
              <md-icon>add</md-icon>
              <md-tooltip md-direction="bottom">add User</md-tooltip>
            </md-button>
          </div>
        </md-table-toolbar>

        <md-table-empty-state
          md-label="No users found"
          :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`"
        >
          <md-button class="md-primary md-raised" @click="addUserDialog= true">Create New User</md-button>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Name" md-sort-by="username" class="tableCell">{{ item.username }}</md-table-cell>
          <md-table-cell md-label="Email" md-sort-by="email" class="tableCell">{{ item.email }}</md-table-cell>
          <md-table-cell md-label="Role" md-sort-by="role" class="tableCell">{{ item.role }}</md-table-cell>
          <md-table-cell class="tableCell">
            <md-button class="md-accent" @click="setUserToDelete(item.username)">
              <md-icon class="tableCell">delete</md-icon>
              <md-dialog-confirm
                :md-active.sync="deleteDialog"
                md-title="Delete"
                md-confirm-text="delete"
                md-cancel-text="cancel"
                @md-cancel="onCancel"
                @md-confirm="deleteUser(userToDelete)"
              />
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <div v-else>
      <div>
        <md-card>
          <md-card-header>
            <div class="md-title">User</div>
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

            <!-- <md-dialog :md-active.sync="deleteDialog">
            <md-dialog-title>Delete</md-dialog-title>

            <md-dialog-actions>
              <md-button class="md-primary" @click="deleteDialog = false">cancel</md-button>
              <md-button class="md-primary" @click="onConfirm">delete</md-button>
            </md-dialog-actions>
            </md-dialog>-->
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { partialAuth } from "./../../server/server/constant";
const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.username).includes(toLower(term)));
  }

  return items;
};
export default {
  name: "User",
  data: () => {
    return {
      me: {},
      // role: "",
      form: {
        username: "",
        email: ""
      },
      users: [],
      searched: [],
      search: "",
      checked: false,
      deleteDialog: false,
      addUserDialog: false,
      userToDelete: ""
    };
  },
  computed: {
    auth() {
      if (this.me) {
        if (partialAuth.includes(this.me.role)) {
          return true;
        }
      }
      return false;
    }
  },
  async created() {
    const response = await this.$apollo.query({
      query: gql`
        query users {
          users {
            username
            email
            role
          }
        }
      `
    });
    this.users = response.data.users;
    this.searched = this.users;
    // console.log("searched", this.searched);
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
    },
    newUser() {
      this.$apollo.mutate({
        mutation: gql`
          mutation signUp(
            $username: String!
            $email: String!
            $password: String!
          ) {
            signUp(username: $username, email: $email, password: $password) {
              user {
                username
              }
            }
          }
        `,
        variables: {
          username: this.form.username,
          email: this.form.email,
          password: "1234"
        }
      });
      this.searched.push({
        username: this.form.username,
        email: this.form.email,
        role: "user"
      });
      this.addUserDialog = false;
    },
    searchOnTable() {
      this.searched = searchByName(this.users, this.search);
    },
    deleteUser(name) {
      this.$apollo.mutate({
        mutation: gql`
          mutation($username: String!) {
            deleteUser(username: $username)
          }
        `,
        variables: {
          username: name
        }
      });
      for (let i = 0; i < this.searched.length; i++) {
        if (this.searched[i].username === name) {
          this.searched.splice(i, 1);
        }
      }

      this.userToDelete = "";
    },
    setUserToDelete(name) {
      this.userToDelete = name;
      this.deleteDialog = true;
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
      // fetchPolicy: "cache-and-network"
    }
    // users: {
    //   query: gql`
    //     query users {
    //       users {
    //         username
    //         email
    //         role
    //       }
    //     }
    //   `
    // }
  }
};
</script>

<style >
.md-checkbox {
  display: flex;
}

.newUserDialog {
  display: flex;
  flex-direction: row;
}

.selectionField {
  margin-inline: 10px;
}
</style>