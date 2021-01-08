import Vue from 'vue'
import Vuex from 'vuex'
import graphqlClient from '../apollo';
Vue.use(Vuex)
import gql from 'graphql-tag'
import GET_ITEMS from "../graphql/items.graphql"
import GET_FAVORITE from "../graphql/favorite.graphql"
export default new Vuex.Store({
  state: {
    items: [],
    favorite: [],
    user: {},
    favoriteId: ""
  },
  mutations: {
    setItemsList(state, itemList) {
      state.items = itemList
    },
    setFavoriteList(state, favoriteList) {
      state.favorite = favoriteList
    },
    updateFavorite(state, updated) {
      state.favorite = [...state.favorite, updated]
    },
    removeFavorite(state, updated) {

      let index = state.favorite.indexOf((item) => item.itemId == updated)

      state.favorite.splice(index, 1)
    }

  },
  actions: {
    async fetchItemsList({
      commit
    }) {
      try {
        const response = await graphqlClient.query({
          query: GET_ITEMS
        });
        const items = response.data.items

        commit('setItemsList', items);
      } catch (err) {
        console.log(err)
      }
    },
    async fetchFavoriteList({
      commit
    }) {
      try {
        const response = await graphqlClient.query({
          query: GET_FAVORITE
        })
        const favorites = response.data.favorites
        commit(`setFavoriteList`, favorites)
      } catch (error) {
        console.log(error)
      }
    },

    async addFavorite({
        commit
      },
      item) {
      await graphqlClient.mutate({
        mutation: gql `
          mutation updateFavorite($itemId: String!) {
            updateFavorite(itemId: $itemId){
              itemId
            }
          }`,
        variables: {
          itemId: item.itemId
        }
      })

      commit('updateFavorite', item)
    },
    async removeFavorite({
        commit
      },
      id) {
      try {
        const response = await graphqlClient.mutate({
          mutation: gql `
          mutation updateFavorite($itemId: String!) {
            updateFavorite(itemId: $itemId){
              itemId
              amount 
              itemName
              favorite
            }
          }`,
          variables: {
            itemId: id
          }
        })
        const updated = response.data.updateFavorite.itemId

        commit('removeFavorite', updated)

      } catch (e) {
        console.log(e)
      }
    },
  },


  getters: {
    items: state => state.items,
    favorite: state => state.favorite
  },
  modules: {}
})