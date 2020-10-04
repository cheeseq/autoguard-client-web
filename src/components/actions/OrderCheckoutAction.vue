<template>
  <div>
    Рассчитать? Итоговая сумма
    <order-details :order="order"></order-details>
    <div class="row">
      <div class="col s12">
        <div class="input-field">
          <textarea id="note" class="materialize-textarea" v-model="note" placeholder="Комментарий"></textarea>
        </div>
      </div>
    </div>
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
  data() {
    return {
      note: null
    }
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
      this.$emit('action:commit', {order: this.order, note: this.note});
      this.orders.splice(idx, 1);
    }
  }
}
</script>

<style scoped>

</style>