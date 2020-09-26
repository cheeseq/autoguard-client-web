<template>
  <div>
    Рассчитать? Итоговая сумма
    <order-details :car="car" :statuses="statuses"></order-details>
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
    car: {
      type: Object,
      required: true
    },
    cars: {
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
      let idx = this.cars.findIndex((c) => c.owner_fullname === this.car.owner_fullname);
      this.cars.splice(idx, 1);
      this.$emit('action:commit');
    }
  }
}
</script>

<style scoped>

</style>