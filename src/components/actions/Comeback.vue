<template>
  <div style="padding: 2rem;">
    <div class="row">
      Подтвердить заезд предоплатника?
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
import moment from 'moment';

export default {
  name: "Comeback",
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