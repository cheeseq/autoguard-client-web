<template>
  <div>
    <div class="row">
      <h4>Подтвердить выезд предоплатника?</h4>
    </div>

    <div class="row">
      <div class="col s12">
        <div class="input-field">
          <textarea id="note" class="materialize-textarea" v-model="note" placeholder="Комментарий"></textarea>
        </div>
      </div>
    </div>

    <action-buttons @action:commit="commitAction" @action:cancel="$emit('action:cancel')"></action-buttons>
  </div>
</template>

<script>
import ActionButtons from "@/components/ActionButtons";
import { mapActions, mapState } from "vuex";
import { db } from "@/db";
import OrderCalculations from "@/mixins/OrderCalculations";

export default {
  name: "TempLeaveAction",
  components: { ActionButtons },
  mixins: [OrderCalculations],
  data() {
    return {
      note: null,
    };
  },
  computed: {
    ...mapState(["currentActionOrder"]),
  },
  methods: {
    ...mapActions(["updateOrder"]),
    async commitAction() {
      if (!this.isPrepayer(this.currentActionOrder) || this.currentActionOrder.temporary_left_at !== null) {
        console.warn("Cannot commit temporary leaving action: failed preconditions", this.currentActionOrder);
        this.$emit("action:cancel");
        return;
      }

      this.currentActionOrder.events.push({
        descriptor: db.collection("settings/enums/order-events").doc("temporary-leaving"),
        note: this.note,
        created_at: new Date(),
      });

      await this.updateOrder({
        data: {
          events: this.currentActionOrder.events,
          status: db.collection("settings/enums/order-statuses").doc("temporary-left"),
          temporary_left_at: new Date(),
        },
      });

      this.$emit("action:commit");
    },
  },
};
</script>
