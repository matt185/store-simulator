import Vue from 'vue'
import Vuex from 'vuex'
import graphqlClient from '../apollo';
Vue.use(Vuex)
import gql from 'graphql-tag'
import GET_ITEMS from "../graphql/items.graphql"
import GET_FAVORITE from "../graphql/favorite.graphql"
import GET_BAG from "../graphql/bags.graphql"
import ADD_TO_BAG from "../graphql/addToBags.graphql"
import REMOVE_FROM_BAG from "../graphql/removeFromBag.graphql"
import GET_ORDERS from "../graphql/orders.graphql"
import NEW_ORDER from "../graphql/newOrder.graphql"
import DELETE_ORDER from "../graphql/deleteOrder.graphql"
import NEW_ITEM from "../graphql/addItem.graphql"
import UPDATE_ITEM from "../graphql/updateItem.graphql"

export default new Vuex.Store({
  state: {
    items: [],
    favorite: [],
    user: {},
    bags: [],
    orders: [],
    userSearchValue: "",
    userSearchField: "itemName",
    itemOrdered: [],
    showItemDialogData: {
      quantity: 0,
      itemData: {
        itemId: ""
      }
    },
    showNewItemDialog: {},
    updateItemDialog: {},
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
    setItemsFavorite(state, id) {
      let itemToUpdate = state.items.filter(item => item.itemId === id)
      itemToUpdate[0].favorite = !itemToUpdate[0].favorite
    },
    setItemOrdered(state, item) {
      state.itemOrdered = item
    },
    setOrders(state, item) {
      state.orders = item
    },
    addOrder(state, item) {
      state.orders = [...state.orders, item]
    },
    deleteOrder(state, id) {
      let index = state.orders.map(item => item.orderId).indexOf(id)
      state.orders.splice(index, 1)
    },
    removeFavorite(state, updated) {
      let index = state.favorite.map(item => item.itemId).indexOf(updated)
      state.favorite.splice(index, 1)
    },
    setBagsList(state, bagList) {
      state.bags = bagList
    },
    addToBag(state, {
      item,
      quantity
    }) {
      let newItem = {
        itemId: item.itemId,
        quantity,
        TotalPrice: item.price * quantity
      }
      state.bags = [...state.bags, newItem]
    },
    removeFromBag(state, item) {
      let index = state.bags.map(item => item.itemId).indexOf(item)
      state.bags.splice(index, 1)
    },
    removeAllFromBag(state) {
      state.bags = []
    },
    setShowItemData(state, item) {
      state.showItemDialogData = item
    },
    resetShowItemData(state) {
      state.showItemDialogData = {
        showItemDialog: false
      }
    },
    setDialogFavorite(state) {
      state.showItemDialogData.itemData.favorite = !state.showItemDialogData.itemData.favorite
    },
    updateItemAdd(state, item) {
      for (let ele of state.items) {
        if (ele.itemId === item.itemId) {
          ele.amount += item.quantity
        }
      }
    },
    updateItemRemove(state, {
      item,
      quantity
    }) {
      for (let ele of state.items) {
        if (ele.itemId === item.itemId) {
          ele.amount -= quantity
        }
      }
    },
    addItem(state, item) {
      state.items = [...state.items, item]
    },
    removeItem(state, id) {
      let index = state.items.map(item => item.itemId).indexOf(id)
      state.items.splice(index, 1)
    },
    setNewItemDialog(state, item) {
      state.showNewItemDialog = item
    },
    openNewItemDialog(state) {
      state.showNewItemDialog = {
        newItemDialog: false
      }
    },
    resetNewItemDialog(state) {
      state.showNewItemDialog = {
        newItemDialog: false
      }
    },
    setUserSearchField(state, value) {
      state.userSearchField = value
    },
    setUserSearch(state, value) {
      state.userSearchValue = value
    },
    setUpdateItemDialog(state, item) {
      state.updateItemDialog = item
    },
    resetUpdateItemDialog(state) {
      state.updateItemDialog = {}
      state.updateItemDialog.updateItemDialog = false
    },
    updateItem(state, item) {
      let index = state.items.map(item => item.itemId).indexOf(item.itemId)
      state.items[index].itemId = item.itemId
      state.items[index].image = item.image
      state.items[index].itemName = item.itemName
      state.items[index].itemClass = item.itemClass
      state.items[index].amount = item.amount
      state.items[index].minAmount = item.minAmount
      state.items[index].price = item.price
      state.items[index].updateItemDialog = false
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
    async fetchBagList({
      commit
    }) {
      try {
        const response = await graphqlClient.query({
          query: GET_BAG
        })
        commit('setBagsList', response.data.bags)
      } catch (e) {
        console.log(e)
      }
    },
    async fetchOrders({
      commit
    }) {
      try {
        const response = await graphqlClient.query({
          query: GET_ORDERS
        })
        commit('setOrders', response.data.orders)
      } catch (e) {
        console.log(e)
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
    async addToBag({
      commit
    }, {
      item,
      quantity
    }) {
      await graphqlClient.mutate({
        mutation: ADD_TO_BAG,
        variables: {
          itemId: item.itemId,
          quantity: quantity
        }
      })
      commit("addToBag", {
        item,
        quantity
      })
      commit("updateItemRemove", {
        item,
        quantity
      })
    },
    async removeFromBag({
      commit
    }, item) {

      try {
        await graphqlClient.mutate({
          mutation: REMOVE_FROM_BAG,
          variables: {
            itemId: item.itemId
          }
        })
        commit("removeFromBag", item.itemId)
        commit("updateItemAdd", item)
      } catch (e) {
        console.log(e)
      }
    },
    setShowItemData({
      commit
    }, item) {
      // * add graphqlClient for search data if need
      commit("setShowItemData", item)
    },
    resetShowItemData({
      commit
    }, item) {
      // * add graphqlClient for search data if need
      commit("resetShowItemData", item)
    },
    setFavoriteFromDialog({
      commit
    }) {
      commit("setDialogFavorite")
    },
    async newOrder({
      commit
    }) {
      let response = await graphqlClient.mutate({
        mutation: NEW_ORDER
      })
      commit('addOrder', response.data.newOrder)
      commit('removeAllFromBag')
    },
    async deleteOrder({
      commit
    }, orderId) {
      await graphqlClient.mutate({
        mutation: DELETE_ORDER,
        variables: {
          orderId
        }
      })
      commit('deleteOrder', orderId)
    },
    async addItem({
      commit
    }, item) {
      await graphqlClient.mutate({
        mutation: NEW_ITEM,
        variables: {
          itemId: item.itemId,
          itemName: item.itemName,
          itemClass: item.itemClass,
          image: item.image,
          amount: Number(item.amount),
          minAmount: Number(item.minAmount),
          price: Number(item.price)
        }
      })
      commit("addItem", item)
      commit("resetNewItemDialog")
    },
    removeItem({
      commit
    }, id) {
      commit("removeItem", id)
    },
    setNewItemDialog({
      commit
    }, item) {
      commit("setNewItemDialog", item)
    },
    openNewItemDialog({
      commit
    }) {
      commit('openNewItemDialog')
    },
    resetNewItemDialog({
      commit
    }) {
      commit("resetNewItemDialog")
    },
    setUserSearchField({
      commit
    }, value) {
      commit("setUserSearchField", value)
    },
    setUserSearch({
      commit
    }, value) {
      commit("setUserSearch", value)
    },
    setItemsFavorite({
      commit
    }, id) {
      commit("setItemsFavorite", id)
    },
    setUpdateItemDialog({
      commit
    }, item) {
      commit('setUpdateItemDialog', item)
    },
    resetUpdateItemDialog({
      commit
    }) {
      commit('resetUpdateItemDialog')
    },
    async updateItem({
      commit
    }, item) {
      await graphqlClient.mutate({
        mutation: UPDATE_ITEM,
        variables: {
          id: item.id,
          newItemId: item.itemId,
          image: item.image,
          itemName: item.itemName,
          itemClass: item.itemClass,
          amount: Number(item.amount),
          minAmount: Number(item.minAmount),
          price: Number(item.price)
        }
      })

      commit("updateItem", item)
    }


  },


  getters: {
    items: state => state.items,
    favorite: state => state.favorite,
    bags: state => state.bags,
    orders: state => state.orders,
    itemOrdered: state => state.itemOrdered,
    showItemDialogData: state => state.showItemDialogData,
    showNewItemDialog: state => state.showNewItemDialog,
    userSearchValue: state => state.userSearchValue,
    userSearchField: state => state.userSearchField,
    updateItemDialog: state => state.updateItemDialog
  },
  modules: {}
})