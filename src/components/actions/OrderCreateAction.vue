<template>
  <div>
    <div class="row valign-wrapper">
      <div class="col s3">
        <label>
          <input type="checkbox" v-model="is_prepay" />
          <span>Предоплата</span>
        </label>
      </div>
      <div class="col s9">
        <order-create-form-prepay v-if="is_prepay" :order="order"></order-create-form-prepay>
      </div>
    </div>

    <div class="row">
      <div class="col s4">
        <div class="input-field">
          <input
            type="text"
            id="car_manufacturer"
            v-model="$v.order.car.manufacturer.$model"
            :class="{ invalid: $v.order.car.manufacturer.$error }"
            placeholder="Марка"
          />
          <span
            v-if="!$v.order.car.manufacturer.required"
            class="helper-text"
            data-error="Обязательно для заполнения"
          ></span>
        </div>
      </div>
      <div class="col s4">
        <div class="input-field">
          <input
            type="text"
            v-model="$v.order.car.model.$model"
            id="car_model"
            :class="{ invalid: $v.order.car.model.$error }"
            placeholder="Модель"
          />
          <span v-if="!$v.order.car.model.required" class="helper-text" data-error="Обязательно для заполнения"></span>
        </div>
      </div>
      <div class="col s4">
        <div class="input-field">
          <input
            type="text"
            id="car_gov_id"
            v-model="$v.order.car.gov_id.$model"
            :class="{ invalid: $v.order.car.gov_id.$error }"
            placeholder="Гос.номер"
          />
          <span v-if="!$v.order.car.gov_id.required" class="helper-text" data-error="Обязательно для заполнения"></span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col s3">
        <div class="input-field">
          <input
            type="text"
            id="car_owner_firstname"
            v-model="$v.order.customer.first_name.$model"
            :class="{ invalid: $v.order.customer.first_name.$error }"
            placeholder="Имя владельца"
          />
          <span
            v-if="!$v.order.customer.first_name.required"
            class="helper-text"
            data-error="Обязательно для заполнения"
          ></span>
        </div>
      </div>
      <div class="col s3">
        <div class="input-field">
          <input
            type="text"
            id="car_owner_lastname"
            v-model="$v.order.customer.last_name.$model"
            :class="{ invalid: $v.order.customer.last_name.$error }"
            placeholder="Фамилия владельца"
          />
          <span
            v-if="!$v.order.customer.last_name.required"
            class="helper-text"
            data-error="Обязательно для заполнения"
          ></span>
        </div>
      </div>
      <div class="col s3">
        <div class="input-field">
          <input
            type="text"
            id="car_owner_middlename"
            v-model="$v.order.customer.middle_name.$model"
            :class="{ invalid: $v.order.customer.middle_name.$error }"
            placeholder="Отчество владельца"
          />
          <span
            v-if="!$v.order.customer.middle_name.required"
            class="helper-text"
            data-error="Обязательно для заполнения"
          ></span>
        </div>
      </div>
      <div class="col s3">
        <div class="input-field">
          <input
            type="text"
            id="phone"
            v-model="order.customer.phone"
            placeholder="Телефон"
            v-mask="'+7 ### ### ## ##'"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col s12">
        <label for="daily_rate">Тариф (рублей в сутки)</label>
        <div class="input-field">
          <input
            type="number"
            id="daily_rate"
            v-model="$v.order.daily_rate.$model"
            :class="{ invalid: $v.order.daily_rate.$error }"
            placeholder="Тариф (рублей в сутки)"
          />
          <span
            v-if="!$v.order.daily_rate.required"
            class="helper-text"
            data-error="Обязательно для заполнения"
          ></span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col s12">
        <div class="input-field">
          <textarea id="note" class="materialize-textarea" v-model="note" placeholder="Комментарий"></textarea>
        </div>
      </div>
    </div>

    <action-buttons @action:commit="addOrder" @action:cancel="$emit('action:cancel')"></action-buttons>
  </div>
</template>

<script>
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/ru";
import { required, requiredIf } from "vuelidate/lib/validators";
import ActionButtons from "@/components/ActionButtons";
import OrderCreateFormPrepay from "@/components/order/create/OrderCreateFormPrepay";
import { mapActions, mapState, mapGetters } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/db";
import moment from "moment";

export default {
  name: "OrderCreateAction",
  components: {
    ActionButtons,
    OrderCreateFormPrepay,
  },
  computed: {
    ...mapState(["settings"])
  },
  data() {
    return {
      is_prepay: false,
      note: null,
      order: {
        prepay_expires_at: null,
        prepay_sum: null,
        daily_rate: 80,
        car: {
          manufacturer: null,
          model: null,
          gov_id: null,
        },
        customer: {
          last_name: null,
          first_name: null,
          middle_name: null,
          phone: null,
        },
        events: [],
      },
    };
  },
  validations: {
    order: {
      daily_rate: {
        required
      },
      car: {
        manufacturer: {
          required,
        },
        model: {
          required,
        },
        gov_id: {
          required,
        },
      },
      customer: {
        last_name: {
          required,
        },
        first_name: {
          required,
        },
        middle_name: { },
      },
    },
  },
  methods: {
    ...mapActions(["storeOrder"]),

    addOrder() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      this.order.created_at = moment().toDate();
      this.order.expires_at = moment()
        .add(this.settings['expiring-time-days'], "days")
        .toDate();
      this.order.type = db.collection("settings/enums/order-types").doc("car-parking");
      this.order.status = this.is_prepay
        ? db.collection("settings/enums/order-statuses").doc("prepayer")
        : db.collection("settings/enums/order-statuses").doc("unpaid");

      this.storeOrder(this.order);
      this.$emit("action:commit");
    },

  },
};
</script>
