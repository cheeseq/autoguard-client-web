<template>
  <div>
    Рассчитать? Итоговая сумма
    <order-details :car="car" :statuses="statuses"></order-details>
    <div class="row">
      <div class="col s5 offset-s7">
        <div class="row">
          <div class="col s5">
            <button class="btn red lighten-2">Отмена</button>
          </div>
          <div class="col s7">
            <button type="submit" class="btn green lighten-2" @click="emitCheckout">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderDetails from "@/components/OrderDetails";

export default {
  name: "OrderCheckout",
  components: {
    OrderDetails
  },
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
  methods: {
    emitCheckout() {
      this.$emit('orderCheckout', this.car);
    }
  }
}
</script>

<style scoped>

</style>