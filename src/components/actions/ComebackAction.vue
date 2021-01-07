<template>
  <div>
    <div class="row">
      Подтвердить заезд предоплатника?
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
import moment from "moment";
import ActionButtons from "@/components/ActionButtons";
import { mapActions, mapState } from "vuex";
import { db } from "@/db";
import OrderCalculations from "@/mixins/OrderCalculations";

export default {
  name: "ComebackAction",
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
      if (!this.isLeftPrepayer(this.currentActionOrder) || !this.currentActionOrder.temporary_left_at) {
        console.warn("Cannot commit comeback action: failed preconditions", this.currentActionOrder);
        this.$emit("action:cancel");
        return;
      }

      let duration = moment.duration(moment().diff(this.currentActionOrder.temporary_left_at.toDate()));

      this.currentActionOrder.events.push({
        descriptor: db.collection("settings/enums/order-events").doc("comeback"),
        note: this.note,
        created_at: new Date(),
      });

      await this.updateOrder({
        data: {
          events: this.currentActionOrder.events,
          status: db.collection("settings/enums/order-statuses").doc("prepayer"),
          temporary_left_at: null,
          expires_at: moment(this.currentActionOrder.expires_at.toDate())
            .add(duration)
            .toDate(),
          prepay_expires_at: moment(this.currentActionOrder.prepay_expires_at.toDate())
            .add(duration)
            .toDate(),
        },
      });

      this.$emit("action:commit");
    },
  },
};
</script>
