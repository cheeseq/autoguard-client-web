<template>
  <div>
    <div class="row">
      Подтвердить заезд предоплатника?
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
  props: {
    car: {
      type: Object,
      required: true
    }
  },
  methods: {
    commitAction() {
      let duration = moment.duration(moment().diff(this.car.temp_left_at));
      this.car.expires_at = moment(this.car.expires_at).add(duration).toDate();
      this.car.prepay_expires_at = moment(this.car.prepay_expires_at).add(duration).toDate();
      this.car.temp_left_at = null;
      this.car.status = 3;
      this.$emit('action:commit');
    }
  }
}
</script>