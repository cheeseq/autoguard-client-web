<template>
  <div>
    <div class="row valign-wrapper">
      <div class="col s3">
        <label>
          <input type="checkbox" v-model="is_prepay">
          <span>Предоплата</span>
        </label>
      </div>
      <div class="col s4">
        <div class="input-field" v-show="is_prepay">
          <input type="text" @input="onPrepaySumChange" :value="order.prepay_sum"
                 :class="{'invalid': $v.order.prepay_sum.$error}" placeholder="Сумма" required>
          <span v-if="!$v.order.prepay_sum.required" class="helper-text" data-error="Обязательно для заполнения"></span>
        </div>
      </div>
      <div class="col s5">
        <div class="input-field" v-show="is_prepay">
          <date-picker
              type="datetime"
              format="DD MMM YYYY HH:mm"
              @input="onPrepayExpiresAtChange"
              :value="order.prepay_expires_at"
              :input-class="{'invalid': $v.order.prepay_expires_at.$error}"
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
          <span v-if="!$v.order.prepay_expires_at.required" class="helper-text"
                data-error="Обязательно для заполнения"></span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s4">
        <div class="input-field">
          <input type="text" id="car_manufacturer" v-model="$v.order.car.manufacturer.$model"
                 :class="{'invalid': $v.order.car.manufacturer.$error}" placeholder="Марка">
          <span v-if="!$v.order.car.manufacturer.required" class="helper-text"
                data-error="Обязательно для заполнения"></span>
        </div>
      </div>
      <div class="col s4">
        <div class="input-field">
          <input type="text" v-model="$v.order.car.model.$model" id="car_model"
                 :class="{'invalid': $v.order.car.model.$error}"
                 placeholder="Модель">
          <span v-if="!$v.order.car.model.required" class="helper-text" data-error="Обязательно для заполнения"></span>
        </div>
      </div>
      <div class="col s4">
        <div class="input-field">
          <input type="text" id="car_gov_id" v-model="$v.order.car.gov_id.$model"
                 :class="{'invalid': $v.order.car.gov_id.$error}"
                 placeholder="Гос.номер">
          <span v-if="!$v.order.car.gov_id.required" class="helper-text" data-error="Обязательно для заполнения"></span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s3">
        <div class="input-field">
          <input type="text" id="car_owner_firstname" v-model="$v.order.customer.first_name.$model"
                 :class="{'invalid': $v.order.customer.first_name.$error}" placeholder="Имя владельца">
          <span v-if="!$v.order.customer.first_name.required" class="helper-text"
                data-error="Обязательно для заполнения"></span>
        </div>
      </div>
      <div class="col s3">
        <div class="input-field">
          <input type="text" id="car_owner_lastname" v-model="$v.order.customer.last_name.$model"
                 :class="{'invalid': $v.order.customer.last_name.$error}" placeholder="Фамилия владельца">
          <span v-if="!$v.order.customer.last_name.required" class="helper-text"
                data-error="Обязательно для заполнения"></span>
        </div>
      </div>
      <div class="col s3">
        <div class="input-field">
          <input type="text" id="car_owner_middlename" v-model="$v.order.customer.middle_name.$model"
                 :class="{'invalid': $v.order.customer.middle_name.$error}" placeholder="Отчество владельца">
          <span v-if="!$v.order.customer.middle_name.required" class="helper-text"
                data-error="Обязательно для заполнения"></span>
        </div>
      </div>
      <div class="col s3">
        <div class="input-field">
          <input type="text" id="phone" v-model="order.customer.phone" placeholder="Телефон"
                 v-mask="'+7 ### ### ## ##'">
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col s12">
        <select class="browser-default" v-model="order.daily_rate">
          <option v-for="dailyRate of dailyRates" :value="dailyRate" :key="dailyRate">Тариф: {{ dailyRate }}
            рублей/сутки
          </option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="col s12">
        <div class="input-field">
          <textarea id="note" class="materialize-textarea" v-model="order.note" placeholder="Комментарий"></textarea>
        </div>
      </div>
    </div>

    <action-buttons
        @action:commit="addOrder"
        @action:cancel="$emit('action:cancel')"></action-buttons>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru'
import {required, requiredIf} from "vuelidate/lib/validators";
import ActionButtons from "@/components/ActionButtons";

const _MS_PER_HOUR = 1000 * 60 * 60;

export default {
  name: "OrderCreateAction",
  components: {
    ActionButtons,
    DatePicker
  },
  props: {
    orders: {
      type: Array,
      required: true
    },
    dailyRates: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      is_prepay: false,
      order: {
        "prepay_expires_at": null,
        "prepay_sum": null,
        "daily_rate": this.dailyRates[0],
        "car": {
          "manufacturer": null,
          "model": null,
          "gov_id": null,
        },
        "customer": {
          "last_name": null,
          "first_name": null,
          "middle_name": null,
          "phone": null,
        },
      },
    }
  },
  watch: {
    'order.daily_rate': function () {
      this.onPrepayExpiresAtChange(this.order.prepay_expires_at);
    }
  },
  computed: {
    hourlyRate() {
      return this.order.daily_rate / 24;
    }
  },
  mounted() {
    this.onPrepayExpiresAtChange(new Date(new Date().getTime() + (24 * _MS_PER_HOUR)));
  },
  validations: {
    is_prepay: {},
    order: {
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
      },
      customer: {
        last_name: {
          required
        },
        first_name: {
          required
        },
        middle_name: {
          required
        },
      },
      prepay_sum: {
        required: requiredIf('is_prepay')
      },
      prepay_expires_at: {
        required: requiredIf('is_prepay')
      },
    }
  },
  methods: {
    addOrder() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.order.created_at = new Date();
        this.order.expires_at = new Date().setMonth(new Date().getMonth() + 1);
        this.order.type = 1;
        this.order.status = 1;
        //@todo add to local queue
        //@todo send to api
        this.orders.push(this.order);

        this.$emit("action:commit");
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
      let addHours = (newValue / this.hourlyRate) * _MS_PER_HOUR;
      let millis = Date.now() + addHours;
      this.order.prepay_expires_at = new Date(millis);
      this.order.prepay_sum = Math.round(newValue);
      this.$v.order.prepay_sum.$touch();
      this.$v.order.prepay_expires_at.$touch();
    },
    onPrepayExpiresAtChange(newValue) {
      console.log(newValue);
      let currDate = new Date();
      let diff = this.dateDiffInHours(currDate, newValue);
      this.order.prepay_sum = Math.round(diff * this.hourlyRate);
      this.order.prepay_expires_at = newValue;
      this.$v.order.prepay_expires_at.$touch();
      this.$v.order.prepay_sum.$touch();
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