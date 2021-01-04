<template>
  <md-card>
    <md-tabs class="md-primary" md-alignment="centered">
      <md-tab id="tab-home" md-label="ToDo">
        <md-table v-model="cachedMessages" md-card md-fixed-header>
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <h1 class="md-title">ToDo</h1>
            </div>
            <div class="md-toolbar-section-end">
              <md-button
                v-if="!selected"
                class="md-fab md-mini md-primary"
                @click="DeleteMessageDialog=true"
              >
                <md-icon>delete</md-icon>
                <md-tooltip md-direction="bottom">Delete</md-tooltip>
              </md-button>
              <md-button v-else class="md-fab md-mini md-primary" @click="addMessageDialog=true">
                <md-icon>add</md-icon>
                <md-tooltip md-direction="bottom">add Message</md-tooltip>
              </md-button>
            </div>
          </md-table-toolbar>
        </md-table>
      </md-tab>
      <md-tab id="tab-pages" md-label="Message">b</md-tab>
      <md-tab id="tab-posts" md-label="Agenda">c</md-tab>
    </md-tabs>
  </md-card>
</template>

<script>
import gql from "graphql-tag";

const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, field, term) => {
  if (term) {
    return items.filter(item => toLower(item[field]).includes(toLower(term)));
  }

  return items;
};

export default {
  name: "Message",
  data: () => {
    return {
      messages: [],
      cachedMessages: [],
      searchField: "type",
      addMemoDialog: false,
      selected: [],
      messageToDelete: ""
    };
  },
  async created() {
    const response = await this.$apollo.query({
      query: gql`
        query messages {
          messages {
            id
            title
            text
            type
            status
          }
        }
      `
    });
    this.messages = response.data.messages;
    this.cachedMessages = this.messages;
  },
  methods: {
    searchOnTable() {
      this.cachedMessages = searchByName(
        this.messages,
        this.searchField,
        this.search
      );
    }
  },
  onCancel() {
    this.addMemoDialog = false;
  },
  addMessage() {
    alert("aadgfal");
  },
  setMessageToDelete(id) {
    this.messageToDelete = id;
    this.deleteDialog = true;
  },
  deleteMessage() {
    this.$apollo.mutate({
      mutation: gql`
        mutation deleteMessage($id: Int) {
          deleteMessage(id: $id)
        }
      `,
      variables: {
        id: this.messageToDelete
      }
    });
    for (let i = 0; i < this.cachedMessages.length; i++) {
      if (this.cachedMessages[i].id === this.messageToDelete) {
        this.cachedMessages.splice(i, 1);
      }
    }
    this.deleteDialog = false;
  }
};
</script>

<style scoped>
.md-checkbox {
  display: flex;
  justify-content: center;
}
</style>>
