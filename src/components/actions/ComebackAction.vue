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

    <action-buttons
        @action:commit="commitAction"
        @action:cancel="$emit('action:cancel')"></action-buttons>
  </div>
</template>

<script>
import moment from 'moment';
import ActionButtons from "@/components/ActionButtons";

export default {
  name: "ComebackAction",
  components: {ActionButtons},
  data() {
    return {
      note: null
    }
  },
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  methods: {
    commitAction() {
      let duration = moment.duration(moment().diff(this.order.temp_left_at));
      this.order.expires_at = moment(this.order.expires_at).add(duration).toDate();
      this.order.prepay_expires_at = moment(this.order.prepay_expires_at).add(duration).toDate();
      this.order.temp_left_at = null;
      this.order.status = 3;
      this.$emit('action:commit', {note: this.note});
    }
  }
}
</script>