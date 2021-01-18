<template>
  <md-tabs class="md-primary md-elevation-1" md-alignment="centered">
    <md-tab id="tab-home" md-label="ToDo" @click="form.type='todo'">
      <div>
        <md-table v-model="cachedTodos" md-sort="name" md-drawer md-card>
          <md-table-toolbar>
            <h1 class="md-title title">ToDo</h1>

            <div class="md-toolbar-section-end">
              <md-field md-clearable>
                <md-input placeholder="Search by area..." v-model="search" @input="searchOnTable" />
              </md-field>
              <md-button class="md-fab md-mini md-primary" @click="showMemoDialog">
                <md-icon>add</md-icon>
                <md-tooltip md-direction="bottom">add Message</md-tooltip>
              </md-button>
            </div>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="status" md-sort-by="status">
              <md-checkbox v-model="item.status" @change="updateTodoStatus(item.todoId)" />
            </md-table-cell>
            <md-table-cell
              md-label="Area"
              md-sort-by="title"
              @keyup.enter="newMemo"
            >{{ item.title }}</md-table-cell>
            <md-table-cell
              :class="{completed: item.status}"
              md-label="Todo"
              @keyup.enter="newMemo"
            >{{ item.text }}</md-table-cell>
            <md-table-cell>
              <md-button
                v-if="item.status"
                class="md-fab md-mini md-primary"
                @click="deleteTodo(item.todoId)"
              >
                <md-icon>clear</md-icon>
                <md-tooltip md-direction="bottom">Delete</md-tooltip>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
        <div v-if="areCompleted" class="md-toolbar-section-end">
          <md-button class="md-fab md-mini md-primary" @click="deleteCompleteTodos">
            <md-icon>delete</md-icon>
            <md-tooltip md-direction="bottom">delete complete</md-tooltip>
          </md-button>
        </div>
      </div>
      <div v-if="areCompleted" class="deleteOption"></div>
    </md-tab>
    <md-tab id="tab-pages" md-label="Memo" @click="form.type='memo'">{{form.type}}</md-tab>
    <md-tab id="tab-posts" md-label="Agenda" @click="form.type='agenda'"></md-tab>
    <md-dialog :md-active.sync="this.addMemoDialog">
      <md-dialog-title>New ToDo</md-dialog-title>
      <md-field class="textfield">
        <label>Area</label>
        <md-textarea v-model="form.title" md-autogrow></md-textarea>
      </md-field>
      <md-field class="textfield" @keyup.enter="newTodo">
        <label>Todo</label>
        <md-textarea v-model="form.text" md-autogrow></md-textarea>
      </md-field>
      <md-dialog-actions>
        <md-button class="md-primary" @click="addMemoDialog=false">Close</md-button>
        <md-button class="md-primary" @click="newTodo">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
  </md-tabs>
</template>

<script>
import gql from "graphql-tag";
import { v4 as uuidv4 } from "uuid";
const toLower = text => {
  return text.toString().toLowerCase();
};

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.title).includes(toLower(term)));
  }

  return items;
};
export default {
  name: "Message",
  data: () => {
    return {
      todoArea: [],
      cachedTodos: [],
      memos: [],
      agenda: [],
      todos: [],
      search: "",
      form: {
        id: "",
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
  computed: {
    areCompleted() {
      for (let ele of this.cachedTodos) {
        if (ele.status) {
          return true;
        }
      }
      return false;
    }
  },
  async created() {
    const response = await this.$apollo.query({
      query: gql`
        query todos {
          todos {
            id
            todoId
            title
            text
            type
            status
          }
        }
      `
    });
    this.todos = response.data.todos;
    this.cachedTodos = this.todos;
  },
  async mounted() {
    const response = await this.$apollo.query({
      query: gql`
        query todos {
          todos {
            id
            todoId
            title
            text
            type
            status
          }
        }
      `
    });
    this.todos = response.data.todos;
    this.cachedTodos = this.todos;
    const todoAreaList = this.cachedTodos.map(todo => todo.title);
    this.todoArea = todoAreaList.filter(function(item, pos) {
      return todoAreaList.indexOf(item) == pos;
    });
  },
  methods: {
    onSelect(items) {
      this.selected = items;
    },
    onCancel() {
      this.addMemoDialog = false;
    },
    async newTodo() {
      this.form.id = uuidv4();
      await this.$apollo.mutate({
        mutation: gql`
          mutation newTodo(
            $type: String!
            $title: String!
            $text: String!
            $todoId: String!
          ) {
            newTodo(type: $type, title: $title, text: $text, todoId: $todoId) {
              title
              text
            }
          }
        `,
        variables: {
          todoId: this.form.id,
          type: this.form.type,
          title: this.form.title,
          text: this.form.text
        }
      });

      location.reload();

      // this.cachedTodos.push(this.form);
      this.form.id = "";
      this.addMemoDialog = false;
    },
    async updateTodoStatus(id) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation updateTodoStatus($todoId: String!) {
            updateTodoStatus(todoId: $todoId)
          }
        `,
        variables: {
          todoId: id
        }
      });

      for (let ele of this.cachedTodos) {
        if (ele.todoId === id) {
          ele.status != ele.status;
        }
      }
    },
    setMessageToDelete(id) {
      this.messageToDelete = id;
      this.deleteDialog = true;
    },
    async deleteTodo(id) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation deleteTodo($todoId: String!) {
            deleteTodo(todoId: $todoId)
          }
        `,
        variables: {
          todoId: id
        }
      });
      //   for (let i = 0; i < this.todos.length; i++) {
      //     if (this.todos[i].id === id) {
      //       this.todos.splice(i, 1);
      //     }
      //   }
      for (let i = 0; i < this.cachedTodos.length; i++) {
        if (this.cachedTodos[i].todoId === id) {
          this.cachedTodos.splice(i, 1);
        }
      }
    },
    showMemoDialog() {
      this.addMemoDialog = true;
    },
    searchOnTable() {
      this.cachedTodos = searchByName(this.todos, this.search);
    },
    async deleteCompleteTodos() {
      await this.$apollo.mutate({
        mutation: gql`
          mutation deleteCompleteTodos {
            deleteCompleteTodos
          }
        `
      });
      for (let i = 0; i < this.cachedTodos.length; i++) {
        if (this.cachedTodos[i].status === true) {
          this.cachedTodos.splice(i, 1);
        }
      }
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
.completed {
  text-decoration: line-through;
  color: grey;
}
</style>