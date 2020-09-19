<template>
  <div>
    <form style="padding: 2rem;" v-on:submit.prevent="commitAction">
      <div class="row">
        Подтвердить выезд предоплатника?
      </div>

      <div class="row">
        <div class="col s5 offset-s7">
          <div class="row">
            <div class="col s5">
              <button class="btn red lighten-2" @click="$emit('action:cancel:temp-leave')">Отмена</button>
            </div>
            <div class="col s7">
              <button type="submit" class="btn green lighten-2">Сохранить</button>
            </div>
          </div>
        </div>
      </div>
    </form>

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
      this.$emit('action:commit:temp-leave');
    }
  }
}
</script>

<style scoped>

</style>