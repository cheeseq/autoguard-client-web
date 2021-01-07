<template>
  <div>
    <h4>Рассчитать? Итоговая сумма: {{ getTotalPrice(currentActionOrder) }} рублей</h4>
    <order-details :order="currentActionOrder"></order-details>
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
import OrderCalculations from '@/mixins/OrderCalculations';
import {mapActions, mapState} from 'vuex';
import { db } from '@/db';

export default {
  name: "OrderCheckoutAction",
  mixins: [OrderCalculations],
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
      'currentActionOrder'
    ])
  },
  methods: {
    ...mapActions([
       'updateOrder'
    ]),
    async commitAction() {
      if(this.isPrepayer(this.currentActionOrder) || this.isLeftPrepayer(this.currentActionOrder)) {
        console.warn("Cannot commit checkout action: failed preconditions", this.currentActionOrder);
        this.$emit("action:cancel");
        return;
      }

      this.currentActionOrder.events.push({
        descriptor: db.collection("settings/enums/order-events").doc("checkout"),
        note: this.note,
        created_at: new Date(),
      });

      await this.updateOrder({
        data: {
          events: this.currentActionOrder.events,
          status: db.collection("settings/enums/order-statuses").doc("done")
        },
      });

      this.$emit('action:commit');
    }
  }
}
</script>

<style scoped>

</style>