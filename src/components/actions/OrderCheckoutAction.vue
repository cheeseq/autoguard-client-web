<template>
  <div>
    <h3>Рассчитать? Итоговая сумма</h3>
    <!-- <order-details :order="order"></order-details> -->
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
import {mapActions, mapState} from 'vuex';
import { db } from '@/db';

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
  computed: {
    ...mapState([
      'orders',
      'currentActionOrder'
    ])
  },
  methods: {
    ...mapActions([
       'storeOrderEvent',
       'updateOrderStatus'
    ]),
    async commitAction() {
      let idx = this.orders.findIndex((order) => order.id === this.currentActionOrder.id);
      await this.storeOrderEvent({event: {
        descriptor: db.collection('settings/enums/order-events').doc('checkout'),
        note: this.note,
        created_at: new Date()
      }});
      await this.updateOrderStatus({status: db.collection('settings/enums/order-statuses').doc('done')})
      this.orders.splice(idx, 1);
      this.$emit('action:commit');
    }
  }
}
</script>

<style scoped>

</style>