<template>
  <div>
    <div class="row">
      <div class="col s4">
        <div><strong>Марка:</strong></div>
        {{ order.car.manufacturer }}
      </div>
      <div class="col s4">
        <div><strong>Модель:</strong></div>
        {{ order.car.model }}
      </div>
      <div class="col s4">
        <div><strong>Гос.номер:</strong></div>
        {{ order.car.gov_id }}
      </div>
    </div>
    <div class="row">
      <div class="col s4">
        <div><strong>Ф.И.О. владельца:</strong></div>
        {{ getFullname(order.customer) }}
      </div>
      <div class="col s4">
        <div><strong>Телефон:</strong></div>
        {{ order.customer.phone }}
      </div>
      <div class="col s4">
        <div><strong>Статус:</strong></div>
        {{ order.status.name }}
      </div>
    </div>
    <div class="row">
      <div class="col s4">
        <div><strong>Заезд:</strong></div>
        {{ order.created_at.toDate().toLocaleString() }}
      </div>
      <div class="col s4">
        <div><strong>Предоплата истекает:</strong></div>
        {{ order.prepay_expires_at ? order.prepay_expires_at.toDate().toLocaleString() : '-' }}
      </div>
      <div class="col s4">
        <div><strong>На стоянке уже:</strong></div>
        {{ daysSpent(order) }} дней
      </div>
    </div>
    <div class="row">
      <div class="col s12">
        <div><strong>К оплате:</strong></div>
        {{ hoursSpent(order) * (order.daily_rate / 24) }} рублей
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import {mapState} from "vuex";

export default {
  name: "OrderDetails",
  props: {
    order: {
      type: Object,
      required: true
    },
  },
  methods: {
    hoursSpent(order) {
      moment.locale('ru');
      let regTime = moment(order.created_at.toDate());
      let duration = moment().diff(regTime, 'hours', true);
      return Math.round(duration);
    },
    daysSpent(order) {
      return this.hoursSpent(order) / 24;
    },
    getFullname(customer) {
      return `${customer.last_name} ${customer.first_name} ${customer.middle_name}`
    }
  }
}
</script>