<template>
  <div>
    <div class="row">
      Подтвердить выезд предоплатника?
    </div>

    <action-buttons
        @action:commit="commitAction"
        @action:cancel="$emit('action:cancel')"></action-buttons>
  </div>
</template>

<script>
import ActionButtons from "@/components/ActionButtons";

export default {
  name: "TempLeaveAction",
  components: {ActionButtons},
  props: {
    car: {
      type: Object,
      required: true
    }
  },
  methods: {
    commitAction() {
      this.car.temp_left_at = new Date();
      this.car.status = 4;
      this.$emit('action:commit');
    }
  }
}
</script>

<style scoped>

</style>