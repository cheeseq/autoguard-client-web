import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "./db";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentAction: null,
    currentActionOrder: null,
    orders: [],
    settings: {},
  },
  mutations: {
    ...vuexfireMutations,
    setCurrentAction(state, actionName) {
      state.currentAction = actionName;
    },
    setCurrentActionOrder(state, order) {
      state.currentActionOrder = order;
    },
  },
  actions: {
    bindOrders: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef(
        "orders",
        db.collection("orders").where("status", "not-in", [db.collection("settings/enums/order-statuses").doc("done")])
      );
    }),
    bindSettings: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef( "settings", db.collection("settings").doc('main') );
    }),
    storeOrder: firestoreAction(({ context }, order) => {
      return db.collection("orders").add(Object.assign({}, order));
    }),
    updateOrder: firestoreAction(({context}, payload) => {
      let order = resolveOrder(payload);
      return updateOrder(order.id, payload.data);
    }),
    storeOrderEvent: firestoreAction(({ state }, payload) => {
      let order = resolveOrder(payload);
      order.events.push(payload.event);
      return updateOrder(order.id, { events: order.events });
    }),
    updateOrderStatus: firestoreAction(({ state }, payload) => {
      let order = resolveOrder(payload);
      order.events.push({
        descriptor: db.collection('settings/enums/order-events').doc('status-change'),
        oldStatus: db.collection("settings/enums/order-statuses").doc(order.status.id),
        newStatus: payload.status,
        created_at: new Date()
      });
      return updateOrder(order.id, { status: payload.status, events: order.events });
    }),
    updateOrderStatusSilently: firestoreAction(({ state }, payload) => {
      let order = resolveOrder(payload);
      return updateOrder(order.id, { status: payload.status });
    })
  },
});

function resolveOrder(payload) {
  if(payload.order) {
    return payload.order;
  }
  if(store.state.currentActionOrder) {
    return store.state.currentActionOrder;
  }
  throw new Error("Cannot resolve order from payload");
}

function updateOrder(orderId, data) {
  return db
    .collection("orders")
    .doc(orderId)
    .update(data);
}

export default store;
