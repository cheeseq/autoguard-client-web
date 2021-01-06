<template>
  <div id="app" style="padding-top: 2rem;">
    <div class="row">
      <div class="col s12">
        <button class="btn" @click="setAction('order-create-action')">Добавить авто</button>
      </div>
    </div>

    <div class="row">
      <div class="col s12">
        <h3>Зарегистрированные авто</h3>
        <table class="centered highlight">
          <thead>
            <tr>
              <th>Автомобиль</th>
              <th>Гос.номер</th>
              <th>Ф.И.О</th>
              <th>Телефон</th>
              <th>Заезд</th>
              <th>Предоплата истекает</th>
              <th>Статус</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <order-row v-for="order of orders" :key="order.id" :order="order" @set-action="setActionFromEvent" />
          </tbody>
        </table>
      </div>
    </div>

    <modal
      name="action-modal"
      :min-width="200"
      :min-height="200"
      :scrollable="true"
      :reset="true"
      width="60%"
      height="auto"
    >
      <div style="padding: 2rem;">
        <component
          :is="currentAction"
          :order="currentActionOrder"
          @action:cancel="cancelAction"
          @action:commit="commitAction"
        ></component>
      </div>
    </modal>
  </div>
</template>

<script>
import "materialize-css/dist/css/materialize.min.css";
import OrderCreateAction from "@/components/actions/OrderCreateAction";
import OrderDetailsAction from "@/components/actions/OrderDetailsAction";
import OrderCheckoutAction from "@/components/actions/OrderCheckoutAction";
import TempLeaveAction from "@/components/actions/TempLeaveAction";
import ComebackAction from "@/components/actions/ComebackAction";
import OrderRow from "@/components/OrderRow";
import OrderCalculations from "@/mixins/OrderCalculations";
import { mapActions, mapMutations, mapState } from "vuex";
import { db } from "@/db";

export default {
  name: "App",
  components: { OrderRow, OrderCreateAction, OrderDetailsAction, OrderCheckoutAction, TempLeaveAction, ComebackAction },
  mixins: [OrderCalculations],

  computed: {
    ...mapState(["orders", "currentAction", "currentActionOrder"]),
    ...mapMutations(["setCurrentAction"]),
  },
  async mounted() {
    await this.bindOrders();
    await this.bindSettings();
    //@todo fetch cars from api
    //@todo fetch owner deadline
    setInterval(async () => {
      let currentDate = new Date();
      for (let order of this.orders) {
        if (this.isUnpaid(order) && order.expires_at.toDate() < currentDate) {
          console.log("order expired - switching status to debtor");
          await this.updateOrderStatus({
            order: order,
            status: db.collection("settings/enums/order-statuses").doc("debtor"),
          });
        } else if (this.isPrepayer(order) && order.prepay_expires_at.toDate() < currentDate) {
          console.log("order prepay expired - switching status to unpaid");
          await this.updateOrderStatus({
            order: order,
            status: db.collection("settings/enums/order-statuses").doc("unpaid"),
          });
        }
      }
    }, 60000);
  },
  methods: {
    ...mapActions(["bindOrders", "bindSettings", "updateOrderStatus"]),
    setAction(actionName, order) {
      this.$store.commit("setCurrentActionOrder", order);
      this.$store.commit("setCurrentAction", actionName);
      this.openActionModal();
    },
    setActionFromEvent($e) {
      this.setAction($e.name, $e.order);
    },
    commitAction() {
      this.$store.commit("setCurrentAction", null);
      this.$store.commit("setCurrentActionOrder", null);
      this.closeActionModal();
    },
    cancelAction() {
      this.$store.commit("setCurrentAction", null);
      this.$store.commit("setCurrentActionOrder", null);
      this.closeActionModal();
    },
    openActionModal() {
      this.$modal.show("action-modal");
    },
    closeActionModal() {
      this.$modal.hide("action-modal");
    },
  },
};
</script>
