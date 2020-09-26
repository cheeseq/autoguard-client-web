<template>
  <div>
    Рассчитать? Итоговая сумма
    <order-details :order="order" :statuses="statuses"></order-details>
    <action-buttons
        @action:commit="commitAction"
        @action:cancel="$emit('action:cancel')"></action-buttons>
  </div>
</template>

<script>
import OrderDetails from "@/components/OrderDetails";
import ActionButtons from "@/components/ActionButtons";

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
    orders: {
      type: Array,
      required: true
    },
    statuses: {
      type: Object,
      required: true
    }
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