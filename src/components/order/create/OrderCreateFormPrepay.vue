<template>
  <div>
    <div class="col s6">
      <label for="prepay_sum">Сумма предоплаты</label>
      <div class="input-field">
        <input
          type="text"
          id="prepay_sum"
          @input="onPrepaySumChange"
          :value="order.prepay_sum"
          :class="{ invalid: $v.order.prepay_sum.$error }"
          placeholder="Сумма"
          required
        />
        <span v-if="!$v.order.prepay_sum.required" class="helper-text" data-error="Обязательно для заполнения"></span>
      </div>
    </div>
    <div class="col s6">
      <label for="prepay_expires_at">Дата истечения предоплаты</label>
      <div class="input-field">
        <date-picker
          type="datetime"
          id="prepay_expires_at"
          format="DD MMM YYYY HH:mm"
          @input="onPrepayExpiresAtChange"
          :value="order.prepay_expires_at"
          :input-class="{ invalid: $v.order.prepay_expires_at.$error }"
          :time-title-format="'DD MMM YYYY'"
          placeholder="Дата истечения"
          :disabled-date="disabledBeforeToday"
          :disabled-time="disabledBeforeNow"
          :editable="false"
          :time-picker-options="{
            start: '00:00',
            end: '23:00',
            step: '01:00',
            format: 'HH:mm',
          }"
        ></date-picker>
        <span
          v-if="!$v.order.prepay_expires_at.required"
          class="helper-text"
          data-error="Обязательно для заполнения"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import moment from "moment";
import { required, requiredIf } from "vuelidate/lib/validators";

export default {
  components: {
    DatePicker,
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  computed: {
    hourlyRate() {
      return this.order.daily_rate / 24;
    },
  },
  watch: {
    "order.daily_rate": function() {
      this.onPrepayExpiresAtChange(this.order.prepay_expires_at);
    },
  },
  validations: {
    order: {
      prepay_sum: {
        required: required,
      },
      prepay_expires_at: {
        required: required,
      },
    },
  },
  mounted() {
    this.onPrepayExpiresAtChange(
      moment()
        .add(1, "days")
        .toDate()
    );
  },
  methods: {
    onPrepaySumChange(newValue) {
      newValue = newValue.target.value;
      let addHours = newValue / this.hourlyRate;
      this.order.prepay_expires_at = moment()
        .add(addHours, "hours")
        .toDate();
      this.order.prepay_sum = Math.round(newValue);

      this.$v.order.prepay_sum.$touch();
      this.$v.order.prepay_expires_at.$touch();
    },
    onPrepayExpiresAtChange(newValue) {
      let diffHours = Math.round(moment(newValue).diff(moment(), "hours", true));
      this.order.prepay_sum = Math.round(diffHours * this.hourlyRate);
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
  },
};
</script>

<style>
.mx-datepicker {
  width: 100%;
}
</style>
