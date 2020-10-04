<template>
  <div>
    <order-details :order="order"></order-details>
    <order-events :order="order"></order-events>
    <action-buttons
        @action:commit="$emit('action:commit')"
        @action:cancel="$emit('action:cancel')"></action-buttons>
  </div>
</template>

<script>
import OrderDetails from "@/components/OrderDetails";
import ActionButtons from "@/components/ActionButtons";
import OrderEvents from "@/components/OrderEvents";

export default {
  name: "OrderDetailsAction",
  components: {OrderEvents, ActionButtons, OrderDetails},
  props: {
    order: {
      type: Object,
      required: true
    },
  },
}
</script>