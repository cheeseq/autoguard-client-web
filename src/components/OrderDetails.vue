<template>
  <div>
    <div class="row">
      <div class="col s4">
        <strong>Марка:</strong> {{ order.car.manufacturer }}
      </div>
      <div class="col s4">
        <strong>Модель:</strong> {{ order.car.model }}
      </div>
      <div class="col s4">
        <strong>Гос.номер:</strong> {{ order.car.gov_id }}
      </div>
    </div>
    <div class="row">
      <div class="col s4">
        <strong>Ф.И.О. владельца:</strong> {{ getFullname(order.customer) }}
      </div>
      <div class="col s4">
        <strong>Телефон:</strong> {{ order.customer.phone }}
      </div>
      <div class="col s4">
        <strong>Статус:</strong> {{ statuses[order.status] }}
      </div>
    </div>
    <div class="row">
      <div class="col s4">
        <div><strong>Заезд:</strong></div>
        {{ new Date(order.created_at).toLocaleString() }}
      </div>
      <div class="col s4">
        <div><strong>Предоплата истекает:</strong></div>
        {{ order.prepay_expires_at ? new Date(order.prepay_expires_at).toLocaleString() : '-' }}
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

export default {
  name: "OrderDetails",
  props: {
    order: {
      type: Object,
      required: true
    },
    statuses: {
      type: Object,
      required: true
    }
  },
  methods: {
    hoursSpent(order) {
      moment.locale('ru');
      let regTime = moment(order.created_at);
      let curTime = moment();
      let duration = moment.duration(curTime.diff(regTime));
      return Math.round(duration.asHours());
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