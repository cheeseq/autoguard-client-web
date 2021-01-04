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
            <th>Марка</th>
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
            <order-row v-for="order of orders" :key="order.id" :order="order" @set-action="setActionFromEvent"/>
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
        height="auto">
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
import {mapActions, mapMutations, mapState} from 'vuex';

export default {
  name: 'App',
  components: {OrderRow, OrderCreateAction, OrderDetailsAction, OrderCheckoutAction, TempLeaveAction, ComebackAction},
  data() {
    return {
      owner_deadline: 86400 * 30,
    }
  },
  computed: {
    ...mapState([
      'orders',
      'currentAction',
      'currentActionOrder',
      'dailyRates',
      'actionEvents'
    ]),
    ...mapMutations([
      'setCurrentAction'
    ])
  },
  async mounted() {
    await this.bindOrders();
    //@todo fetch cars from api
    //@todo fetch owner deadline
    setInterval(() => {
      let currentDate = new Date();
      for (let order of this.orders) {
        console.log(currentDate.getMinutes(), currentDate.getSeconds());
        if (order.status === 1 && order.expires_at < currentDate) {
          order.status = 2;
        } else if (order.status === 3 && (order.prepay_expires_at < currentDate)) {
          order.status = 1;
        }
      }
    }, 60000);
  },
  methods: {
    ...mapActions([
      'bindOrders',
      'bindStatuses',
    ]),
    setAction(actionName, order) {
      this.$store.commit('setCurrentActionOrder', order);
      this.$store.commit('setCurrentAction', actionName);
      this.openActionModal();
    },
    setActionFromEvent($e) {
      this.setAction($e.name, $e.order);
    },
    cancelAction() {
      this.$store.commit('setCurrentAction', null);
      this.$store.commit('setCurrentActionOrder', null);
      this.closeActionModal();
    },
    commitAction() {
      this.$store.commit('setCurrentAction', null);
      this.$store.commit('setCurrentActionOrder', null);
      this.closeActionModal();
    },
    openActionModal() {
      this.$modal.show('action-modal');
    },
    closeActionModal() {
      this.$modal.hide('action-modal');
    },
  }
}
</script>
