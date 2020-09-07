<template>
  <div>
    <div class="row">
      <div class="col s4">
        <strong>Марка:</strong> {{ car.manufacturer }}
      </div>
      <div class="col s4">
        <strong>Модель:</strong> {{ car.model }}
      </div>
      <div class="col s4">
        <strong>Гос.номер:</strong> {{ car.gov_id }}
      </div>
    </div>
    <div class="row">
      <div class="col s4">
        <strong>Ф.И.О. владельца:</strong> {{ car.owner_fullname }}
      </div>
      <div class="col s4">
        <strong>Телефон:</strong> {{ car.owner_phone }}
      </div>
      <div class="col s4">
        <strong>Статус:</strong> {{ statuses[car.status] }}
      </div>
    </div>
    <div class="row">
      <div class="col s4">
        <div><strong>Заезд:</strong></div>
        {{new Date(car.registered_at).toLocaleString()}}
      </div>
      <div class="col s4">
        <div><strong>Предоплата истекает:</strong></div>
        {{ car.prepay_expires_at ? new Date(car.prepay_expires_at).toLocaleString() : '-' }}
      </div>
      <div class="col s4">
        <div><strong>На стоянке уже:</strong></div>
        {{ registeredTime(car) }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: "OrderDetails",
  props: {
    car: {
      type: Object,
      required: true
    },
    statuses: {
      type: Object,
      required: true
    }
  },
  methods: {
    registeredTime(car) {
      moment.locale('ru');
      let regTime = moment(car.registered_at);
      let curTime = moment();
      let duration = moment.duration(curTime.diff(regTime));
      return Math.round(duration.asDays()) + " дней";
    }
  }
}
</script>

<style scoped>

</style>