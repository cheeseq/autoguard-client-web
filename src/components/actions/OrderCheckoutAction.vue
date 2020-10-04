<template>
  <div>
    Рассчитать? Итоговая сумма
    <order-details :order="order"></order-details>
    <action-buttons
        @action:commit="commitAction"
        @action:cancel="$emit('action:cancel')"></action-buttons>
  </div>
</template>

<script>
import OrderDetails from "@/components/OrderDetails";
import ActionButtons from "@/components/ActionButtons";
import {mapState} from 'vuex';


export default {
  name: "OrderCheckoutAction",
  components: {
    ActionButtons,
    OrderDetails
  },
  props: {
    order: {
      type: Object,
      required: true
    },
  },
  computed: {
    ...mapState([
      'orders',
    ])
  },
  methods: {
    commitAction() {
      let idx = this.orders.findIndex((order) => order.customer.phone === this.order.customer.phone);
      this.orders.splice(idx, 1);
      this.$emit('action:commit');
    }
  }
}
</script>

<style scoped>

</style>