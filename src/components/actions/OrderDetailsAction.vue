<template>
  <div>
    <order-details :car="car" :statuses="statuses"></order-details>
    <action-buttons
        @action:commit="$emit('action:commit')"
        @action:cancel="$emit('action:cancel')"></action-buttons>
  </div>
</template>

<script>
import OrderDetails from "@/components/OrderDetails";
import ActionButtons from "@/components/ActionButtons";

export default {
  name: "OrderDetailsAction",
  components: {ActionButtons, OrderDetails},
  props: {
    car: {
      type: Object,
      required: true
    },
    statuses: {
      type: Object,
      required: true
    }
  },
}
</script>