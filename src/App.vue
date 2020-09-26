<template>
  <div id="app" style="padding-top: 2rem;">
    <div class="row">
      <div class="col s12">
        <button class="btn" @click="setAction('register-car-action')">Добавить авто</button>
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
          <tr v-for="order of orders" :key="order.customer.phone  "
              :class="{'red lighten-4': isDebtor(order), 'grey lighten-3': isLeftPrepayer(order)}">
            <td>{{ order.car.manufacturer }} {{ order.car.model }}</td>
            <td>{{ order.car.gov_id }}</td>
            <td>{{ getFullname(order.customer) }}</td>
            <td>{{ order.customer.phone }}</td>
            <td>{{ new Date(order.created_at).toLocaleString() }}</td>
            <td>{{ order.prepay_expires_at ? new Date(order.prepay_expires_at).toLocaleString() : '-' }}</td>
            <td><span :class="{'red-text': isDebtor(order)}">{{ statuses[order.status] }}</span></td>
            <td>
              <div><a href="#" @click="setAction('order-details-action', order)">Подробно</a></div>
              <div v-if="isUnpaid(order) || isDebtor(order)"><a href="#"
                                                                @click="setAction('order-checkout-action', order)">Расчет</a>
              </div>
              <div v-if="isPrepayer(order)"><a href="#" @click="setAction('temp-leave-action', order)">Выезд</a></div>
              <div v-if="isLeftPrepayer(order)"><a href="#" @click="setAction('comeback-action', order)">Заезд</a></div>
            </td>
          </tr>
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
            :order="selectedOrder"
            :orders="orders"
            :statuses="statuses"
            :daily-rates="[80, 130, 170]"
            @action:cancel="cancelAction"
            @action:commit="commitAction"
        ></component>
      </div>
    </modal>

  </div>
</template>

<script>
import "materialize-css/dist/css/materialize.min.css";
import RegisterCarAction from "@/components/actions/OrderCreateAction";
import OrderDetailsAction from "@/components/actions/OrderDetailsAction";
import OrderCheckoutAction from "@/components/actions/OrderCheckoutAction";
import TempLeaveAction from "@/components/actions/TempLeaveAction";
import ComebackAction from "@/components/actions/ComebackAction";

export default {
  name: 'App',
  components: {RegisterCarAction, OrderDetailsAction, OrderCheckoutAction, TempLeaveAction, ComebackAction},
  data() {
    return {
      currentAction: null,
      selectedOrder: null,
      statuses: {
        1: "Не оплачен",
        2: "Должник",
        3: "Предоплата",
        4: "Предоплата (выехал)",
      },
      orders: [
        {
          "type": 1,
          "status": 1,
          "created_at": new Date(2020, 7, 25, 11, 1),
          "updated_at": new Date(2020, 7, 25, 11, 1),
          "expires_at": new Date(2020, 8, 6, 21, 44),
          "prepay_expires_at": null,
          "daily_rate": 80,
          "car": {
            "manufacturer": "Hyundai",
            "model": "Solaris",
            "gov_id": "АА111А",
          },
          "customer": {
            "last_name": "Иванов",
            "first_name": "Иван",
            "middle_name": "Иванович",
            "phone": "+7 999 999 99 99"
          },
          "events": [
            {
              "description": "Зарегистрирован",
              "created_at": new Date(2020, 7, 25, 11, 1),
              "note": null,
            }
          ]
        },
        {
          "type": 1,
          "status": 3,
          "created_at": new Date(2020, 7, 25, 11, 1),
          "updated_at": new Date(2020, 7, 25, 11, 1),
          "expires_at": new Date(2020, 11, 6, 21, 44),
          "prepay_expires_at": new Date(2020, 10, 6, 21, 44),
          "daily_rate": 130,
          "car": {
            "manufacturer": "Газель",
            "model": "21",
            "gov_id": "ББ111Б",
          },
          "customer": {
            "last_name": "Петров",
            "first_name": "Петр",
            "middle_name": "Петрович",
            "phone": "+7 999 999 99 98"
          },
          "events": [
            {
              "description": "Зарегистрирован",
              "created_at": new Date(2020, 7, 25, 11, 1),
              "note": null,
            }
          ]
        },
      ],
      owner_deadline: 86400 * 30,
    }
  },
  mounted() {
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
    isUnpaid(order) {
      return order.status === 1;
    },
    isDebtor(order) {
      return order.status === 2;
    },
    isPrepayer(order) {
      return order.status === 3;
    },
    isLeftPrepayer(order) {
      return order.status === 4;
    },
    setAction(actionName, order) {
      this.currentAction = actionName;
      this.selectedOrder = order;
      this.openActionModal();
    },
    cancelAction() {
      this.closeActionModal();
    },
    commitAction() {
      this.closeActionModal();
    },
    openActionModal() {
      this.$modal.show('action-modal');
    },
    closeActionModal() {
      this.$modal.hide('action-modal');
    },
    getFullname(customer) {
      return `${customer.last_name} ${customer.first_name} ${customer.middle_name}`
    }
  }
}
</script>
