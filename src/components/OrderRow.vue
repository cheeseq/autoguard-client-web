<template>
  <tr
    :class="{
      'red lighten-4': isDebtor(order),
      'grey lighten-3': isLeftPrepayer(order),
    }"
  >
    <td>{{ order.car.model }}</td>
    <td>{{ order.car.gov_id }}</td>
    <td>{{ getFullname(order.customer) }}</td>
    <td>{{ order.customer.phone }}</td>
    <td>{{ order.created_at.toDate().toLocaleString() }}</td>
    <td> {{ order.prepay_expires_at ? order.prepay_expires_at.toDate().toLocaleString() : "-" }} </td>
    <td>
      <span :class="{ 'red-text': isDebtor(order) }">{{ order.status.name }}</span>
    </td>
    <td>
      <div>
        <a href="#" @click="$emit('set-action', {'name': 'order-details-action', 'order': order})">Подробно</a >
      </div>
      <div v-if="isUnpaid(order) || isDebtor(order)">
        <a href="#" @click="$emit('set-action', {'name': 'order-checkout-action', 'order': order})" >Расчет</a >
      </div>
      <div v-if="isPrepayer(order)">
        <a href="#" @click="$emit('set-action', {'name': 'temp-leave-action', 'order': order})">Выезд</a>
      </div>
      <div v-if="isLeftPrepayer(order)">
        <a href="#" @click="$emit('set-action', {'name': 'comeback-action', 'order': order})">Заезд</a>
      </div>
    </td>
  </tr>
</template>

<script>
import {mapState} from 'vuex';

export default {
  props: ["order"],
  methods: {
    isUnpaid(order) {
      return order.status.id === 'unpaid';
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
    getFullname(customer) {
      return `${customer.last_name} ${customer.first_name} ${customer.middle_name}`;
    },
  },
};
</script>