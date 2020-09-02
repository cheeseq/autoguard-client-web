<template>
  <div>
    <form style="padding: 2rem;">
      <div class="row valign-wrapper">
        <div class="col s3">
          <label>
            <input type="checkbox" v-model="car.is_prepay">
            <span>Предоплата</span>
          </label>
        </div>
        <div class="col s3">
          <label id="prepay_sum" v-show="car.is_prepay">
            Сумма
            <input type="text" v-model="car.prepay_sum">
          </label>
        </div>
        <div class="col s3">
          <label id="prepay_deadline" v-show="car.is_prepay">
            Дата истечения
            <date-picker v-model="car.prepay_expires_at"></date-picker>
          </label>
        </div>
        <div class="col s3">
          <label v-show="car.is_prepay">
            Время истечения
            <date-picker type="time" format="hh:mm" v-model="car.prepay_expires_at_time"></date-picker>
          </label>
        </div>
      </div>
      <div class="row">
        <div class="col s4">
          <label for="auto">Марка</label>
          <input type="text" id="auto" v-model="car.manufacturer">
        </div>
        <div class="col s4">
          <label for="auto">Модель</label>
          <input type="text" v-model="car.model">
        </div>
        <div class="col s4">
          <label for="nomer">Гос.номер</label>
          <input type="text" id="nomer" v-model="car.gov_id">
        </div>
      </div>
      <div class="row">
        <div class="col s8">
          <label for="fio">Ф.И.О. владельца</label>
          <input type="text" id="fio" v-model="car.owner_fullname">
        </div>
        <div class="col s4">
          <label for="phone">Телефон</label>
          <input type="text" id="phone" v-model="car.owner_phone">
        </div>
        <div class="row">
          <div class="col s12">
            <label for="note">Комментарий</label>
            <textarea id="note" class="materialize-textarea" v-model="car.note"></textarea>
          </div>
        </div>
      </div>
    </form>
    <div class="row">
      <div class="col s5 offset-s7">
        <div class="row">
          <div class="col s5">
            <button class="btn red lighten-2" v-on:click="$modal.hide('add-car-modal')">Отмена</button>
          </div>
          <div class="col s7">
            <button class="btn green lighten-2" v-on:click="addCar">Сохранить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru'

export default {
  name: "RegisterCar",
  components: {
    DatePicker
  },
  data() {
    return {
      is_prepay: false,
      car: {
        is_prepay: false,
        prepay_sum: null,
        prepay_expires_at: new Date(),
        manufacturer: null,
        model: null,
        gov_id: null,
        owner_fullname: null,
        owner_phone: null,
        note: null
      }
    }
  },
  methods: {
    addCar() {
      this.$emit("car-created", this.car);
      this.$modal.hide("add-car-modal");
    }
  }

}
</script>

<style>
.mx-datepicker {
  width: 100%;
}
</style>