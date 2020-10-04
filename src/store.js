import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    statuses: {
      1: "Не оплачен",
      2: "Должник",
      3: "Предоплата",
      4: "Предоплата (выехал)",
    },
    actionEvents: {
      'temp-leave-action': 'Временный выезд предоплатника',
      'order-checkout-action': 'Расчет',
      'comeback-action': 'Возврат предоплатника из временного отъезда',
      'register-car-action': 'Машина зарегистрирована'
    },
    orders: [
      {
        "type": 1,
        "status": 1,
        "created_at": new Date(2020, 7, 25, 11, 1),
        "updated_at": new Date(2020, 7, 25, 11, 1),
        "expires_at": new Date(2020, 8, 6, 21, 44),
        "prepay_expires_at": null,
        "daily_rate": 80,
        "car": {
          "manufacturer": "Hyundai",
          "model": "Solaris",
          "gov_id": "АА111А",
        },
        "customer": {
          "last_name": "Иванов",
          "first_name": "Иван",
          "middle_name": "Иванович",
          "phone": "+7 999 999 99 99"
        },
        "events": [
          {
            "description": "Зарегистрирован",
            "created_at": new Date(2020, 7, 25, 11, 1),
            "note": null,
          }
        ]
      },
      {
        "type": 1,
        "status": 3,
        "created_at": new Date(2020, 7, 25, 11, 1),
        "updated_at": new Date(2020, 7, 25, 11, 1),
        "expires_at": new Date(2020, 11, 6, 21, 44),
        "prepay_expires_at": new Date(2020, 10, 6, 21, 44),
        "daily_rate": 130,
        "car": {
          "manufacturer": "Газель",
          "model": "21",
          "gov_id": "ББ111Б",
        },
        "customer": {
          "last_name": "Петров",
          "first_name": "Петр",
          "middle_name": "Петрович",
          "phone": "+7 999 999 99 98"
        },
        "events": [
          {
            "description": "Зарегистрирован",
            "created_at": new Date(2020, 7, 25, 11, 1),
            "note": null,
          }
        ]
      },
    ],
    dailyRates: [80, 130, 170]
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})