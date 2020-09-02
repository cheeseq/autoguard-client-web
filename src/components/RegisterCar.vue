<template>
  <div>
    <form style="padding: 2rem;" v-on:submit.prevent="addCar">
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
          <div class="input-field">
            <input type="text" id="car_manufacturer" v-model="$v.car.manufacturer.$model" :class="{'invalid': $v.car.manufacturer.$error}" placeholder="Марка">
            <span v-if="!$v.car.manufacturer.required" class="helper-text" data-error="Обязательно для заполнения"></span>
          </div>
        </div>
        <div class="col s4">
          <div class="input-field">
            <input type="text" v-model="$v.car.model.$model" id="car_model" :class="{'invalid': $v.car.model.$error}" placeholder="Модель">
            <span v-if="!$v.car.model.required" class="helper-text" data-error="Обязательно для заполнения"></span>
          </div>
        </div>
        <div class="col s4">
          <div class="input-field">
            <input type="text" id="car_gov_id" v-model="$v.car.gov_id.$model" :class="{'invalid': $v.car.gov_id.$error}" placeholder="Гос.номер">
            <span v-if="!$v.car.gov_id.required" class="helper-text" data-error="Обязательно для заполнения"></span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col s8">
          <div class="input-field">
            <input type="text" id="car_owner_fullname" v-model="$v.car.owner_fullname.$model" :class="{'invalid': $v.car.owner_fullname.$error}" placeholder="Ф.И.О. владельца">
            <span v-if="!$v.car.owner_fullname.required" class="helper-text" data-error="Обязательно для заполнения"></span>
          </div>
        </div>
        <div class="col s4">
          <div class="input-field">
            <input type="text" id="phone" v-model="car.owner_phone" placeholder="Телефон">
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <div class="input-field">
              <textarea id="note" class="materialize-textarea" v-model="car.note" placeholder="Комментарий"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col s5 offset-s7">
          <div class="row">
            <div class="col s5">
              <button class="btn red lighten-2" v-on:click="$modal.hide('add-car-modal')">Отмена</button>
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
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru'
import {required} from "vuelidate/lib/validators";

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
  validations: {
    car: {
      manufacturer: {
        required
      },
      model: {
        required
      },
      gov_id: {
        required
      },
      owner_fullname: {
        required
      },
    }
  },
  methods: {
    addCar() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("car-created", this.car);
        this.$modal.hide("add-car-modal");
      }
    }
  }

}
</script>

<style>
.mx-datepicker {
  width: 100%;
}
</style>