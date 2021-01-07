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
        <div><strong>Тариф:</strong></div>
        {{ order.daily_rate }} рублей в сутки
      </div>
    </div>
    <div class="row">
      <div class="col s4">
        <div><strong>На стоянке уже:</strong></div>
        {{ getSpentAsString(order) }}
      </div>
      <div class="col s14">
        <div><strong>К оплате:</strong></div>
        {{ getTotalPrice(order) }} рублей
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import OrderCalculations from '@/mixins/OrderCalculations';
import Customer from "@/mixins/Customer";

export default {
  name: "OrderDetails",
  mixins: [OrderCalculations, Customer],
  props: {
    order: {
      type: Object,
      required: true
    },
  }
}
</script>