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
        <div class="col s4">
          <div class="input-field" v-show="car.is_prepay">
            <input type="text" @input="onPrepaySumChange" :value="car.prepay_sum" :class="{'invalid': $v.car.prepay_sum.$error}" placeholder="Сумма" required>
            <span v-if="!$v.car.prepay_sum.required" class="helper-text" data-error="Обязательно для заполнения"></span>
          </div>
        </div>
        <div class="col s5">
          <div class="input-field" v-show="car.is_prepay">
            <date-picker
                type="datetime"
                format="DD MMM YYYY HH:mm"
                @input="onPrepayExpiresAtChange"
                :value="car.prepay_expires_at"
                :input-class="{'invalid': $v.car.prepay_expires_at.$error}"
                :time-title-format="'DD MMM YYYY'"
                placeholder="Дата истечения"
                :disabled-date="disabledBeforeToday"
                :disabled-time="disabledBeforeNow"
                :editable="false"
                :time-picker-options="{
                  start: '00:00',
                  end: '23:00',
                  step: '01:00',
                  format: 'HH:mm'
                }"></date-picker>
            <span v-if="!$v.car.prepay_expires_at.required" class="helper-text" data-error="Обязательно для заполнения"></span>
          </div>
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
import {required, requiredIf} from "vuelidate/lib/validators";

const _MS_PER_HOUR = 1000 * 60 * 60;
const RATE = 3.33;

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
        prepay_expires_at: null,
        manufacturer: null,
        model: null,
        gov_id: null,
        owner_fullname: null,
        owner_phone: null,
        note: null
      }
    }
  },
  mounted() {
    this.onPrepayExpiresAtChange(new Date(new Date().getTime() + (24 * _MS_PER_HOUR)));
  },
  validations: {
    car: {
      prepay_sum: {
        required: requiredIf('is_prepay')
      },
      prepay_expires_at: {
        required: requiredIf('is_prepay')
      },
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
    },
    dateDiffInHours(a, b) {
      // Discard the time and time-zone information.
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes(), b.getSeconds(), b.getMilliseconds());

      return Math.ceil((utc2 - utc1) / _MS_PER_HOUR);
    },
    onPrepaySumChange(newValue) {
      newValue = newValue.target.value;
      let addHours = (newValue / RATE) * _MS_PER_HOUR;
      let millis = Date.now() + addHours;
      this.car.prepay_expires_at = new Date(millis);
      this.car.prepay_sum = Math.round(newValue);
      this.$v.car.prepay_sum.$touch();
      this.$v.car.prepay_expires_at.$touch();
    },
    onPrepayExpiresAtChange(newValue) {
      console.log(newValue);
      let currDate = new Date();
      let diff = this.dateDiffInHours(currDate, newValue);
      this.car.prepay_sum = Math.round(diff * RATE);
      this.car.prepay_expires_at = newValue;
      this.$v.car.prepay_expires_at.$touch();
      this.$v.car.prepay_sum.$touch();
    },
    disabledBeforeToday(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return date < today;
    },
    disabledBeforeNow(date) {
      const today = new Date();

      return date < today;
    },
  }
}
</script>

<style>
.mx-datepicker {
  width: 100%;
}
</style>