<template>
  <div>
    <div class="row">
      Подтвердить выезд предоплатника?
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
import ActionButtons from "@/components/ActionButtons";

export default {
  name: "TempLeaveAction",
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
      this.order.temp_left_at = new Date();
      this.order.status = 4;
      this.$emit('action:commit', {note: this.note});
    }
  }
}
</script>

<style scoped>

</style>