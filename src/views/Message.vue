<template>
  <md-tabs class="md-primary md-elevation-1" md-alignment="centered">
    <md-tab id="tab-home" md-label="ToDo" @click="form.type='todo'">
      <md-table v-model="cachedMessages" md-card>
        <md-table-toolbar>
          <h1 class="md-title title">ToDo</h1>

          <div class="md-toolbar-section-end">
            <md-button class="md-fab md-mini md-primary" @click="showMemoDialog">
              <md-icon>add</md-icon>
              <md-tooltip md-direction="bottom">add Message</md-tooltip>
            </md-button>
          </div>
        </md-table-toolbar>
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="status" md-sort-by="status">
            <md-checkbox v-model="item.status" @change="updateStatus(item.id)" />
          </md-table-cell>
          <md-table-cell md-label="Name" md-sort-by="name" @keyup.enter="newMemo">{{ item.title }}</md-table-cell>
          <md-table-cell>
            <md-button
              v-if="item.status"
              class="md-fab md-mini md-primary"
              @click="deleteMessage(item.id)"
            >
              <md-icon>delete</md-icon>
              <md-tooltip md-direction="bottom">Delete</md-tooltip>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </md-tab>
    <md-tab id="tab-pages" md-label="Memo" @click="form.type='memo'">{{form.type}}</md-tab>
    <md-tab id="tab-posts" md-label="Agenda" @click="form.type='agenda'">c</md-tab>
    <md-dialog :md-active.sync="this.addMemoDialog">
      <md-dialog-title>New ToDo</md-dialog-title>
      <md-field class="textfield">
        <label>Todo</label>
        <md-textarea v-model="form.title" md-autogrow></md-textarea>
      </md-field>
      <md-dialog-actions>
        <md-button class="md-primary" @click="addMemoDialog=false">Close</md-button>
        <md-button class="md-primary" @click="newMemo">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </md-tabs>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Message",
  data: () => {
    return {
      messages: [],
      cachedMessages: [],
      memos: [],
      agenda: [],
      todos: [],
      form: {
        id: 0,
        type: "todo",
        title: "",
        text: "",
        status: false
      },
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
    // this.todos = this.cachedMessages.filter(todo => todo.type === "todo");
    // this.agenda = this.cachedMessages.filter(memo => memo.type === "agenda");
    // this.memo = this.cachedMessages.filter(memo => memo.type === "memo");
  },
  methods: {
    onSelect(items) {
      this.selected = items;
    },
    onCancel() {
      this.addMemoDialog = false;
    },
    async newMemo() {
      if (this.form.type === "todo") {
        this.form.text = "todo";
      }
      await this.$apollo.mutate({
        mutation: gql`
          mutation newMessage($type: String!, $title: String!, $text: String!) {
            newMessage(type: $type, title: $title, text: $text) {
              title
              text
            }
          }
        `,
        variables: {
          type: this.form.type,
          title: this.form.title,
          text: this.form.text
        }
      });
      this.form.id = this.cachedMessages[this.cachedMessages.length - 1].id + 1;

      this.cachedMessages.push(this.form);
      console.log(this.cachedMessages);
      this.addMemoDialog = false;
    },
    async updateStatus(id) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation updateStatus($id: Int!) {
            updateStatus(id: $id)
          }
        `,
        variables: {
          id: id
        }
      });

      for (let ele of this.cachedMessages) {
        if ((ele.id = id)) {
          ele.status != ele.status;
        }
      }
    },
    setMessageToDelete(id) {
      this.messageToDelete = id;
      this.deleteDialog = true;
    },
    async deleteMessage(id) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation deleteMessage($id: Int) {
            deleteMessage(id: $id)
          }
        `,
        variables: {
          id: id
        }
      });
      //   for (let i = 0; i < this.todos.length; i++) {
      //     if (this.todos[i].id === id) {
      //       this.todos.splice(i, 1);
      //     }
      //   }
      for (let i = 0; i < this.cachedMessages.length; i++) {
        if (this.cachedMessages[i].id === id) {
          this.cachedMessages.splice(i, 1);
        }
      }
    },
    showMemoDialog() {
      this.addMemoDialog = true;
    }
  }
};
</script>

<style scoped>
.md-checkbox {
  display: flex;
  justify-content: center;
}
.dialog {
  min-width: 600px;
}
.textfield {
  width: 400px;
  margin-left: 10px;
  margin-right: 10px;
}
.title {
  width: 100px;
}
.md-tabs {
  height: fit-content;
}
span.md-dialog-title.md-title {
  width: fit-content;
}
</style>