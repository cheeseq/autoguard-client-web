import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations, firestoreAction } from 'vuexfire';
import { db } from './db';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentAction: null,
    currentActionOrder: null,
    actionEvents: {
      'temp-leave': 'Временный выезд предоплатника',
      'order-checkout': 'Расчет',
      'comeback': 'Возврат предоплатника из временного отъезда',
      'order-create': 'Машина зарегистрирована'
    },
    orders: [],
    dailyRates: [80, 130, 170]
  },
  mutations: {
    ...vuexfireMutations,
    setCurrentAction(state, actionName) {
      state.currentAction = actionName;
    },
    setCurrentActionOrder(state, order) {
      state.currentActionOrder = order;
    }
  },
  actions: {
    bindOrders: firestoreAction(({bindFirestoreRef}) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('orders', db.collection('orders').where('status', 'not-in', [db.collection('settings/enums/order-statuses').doc('done')]))
    }),
    storeOrder: firestoreAction(({context}, order) => {
      return db.collection('orders').add(Object.assign({}, order));
    }),
    storeOrderEvent: firestoreAction(({state}, payload) => {
      let order = payload.order;
      if(!order) {
        order = state.currentActionOrder;
      }
      order.events.push(payload.event);
      return db
        .collection('orders')
        .doc(order.id)
        .update({events: order.events});
    }),
    updateOrderStatus: firestoreAction(({state}, payload) => {
      let order = payload.order;
      if(!order) {
        order = state.currentActionOrder;
      }
      return db
        .collection('orders')
        .doc(order.id)
        .update({status: payload.status});
    })
  }
})