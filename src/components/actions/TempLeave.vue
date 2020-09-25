<template>
  <div style="padding: 2rem;">
    <div class="row">
      Подтвердить выезд предоплатника?
    </div>

    <div class="row">
      <div class="col s5 offset-s7">
        <div class="row">
          <div class="col s5">
            <button type="button" class="btn red lighten-2" @click="$emit('action:cancel')">Отмена</button>
          </div>
          <div class="col s7">
            <button type="button" class="btn green lighten-2" @click="commitAction">Сохранить</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "TempLeave",
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