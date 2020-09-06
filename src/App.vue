<template>
  <div id="app" style="padding-top: 2rem;">
    <div class="row">
      <div class="col s12">
        <button class="btn" v-on:click="$modal.show('add-car-modal')">Добавить авто</button>
      </div>
    </div>

    <div class="row">
      <div class="col s12">
        <h3>Зарегистрированные авто</h3>
        <table class="centered highlight">
          <thead>
          <tr>
            <th>Марка</th>
            <th>Гос.номер</th>
            <th>Ф.И.О</th>
            <th>Телефон</th>
            <th>Заезд</th>
            <th>Истекает</th>
            <th>Статус</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="car of cars" v-bind:key="car.owner_phone">
            <td>{{ car.manufacturer }} {{ car.model }}</td>
            <td>{{ car.gov_id }}</td>
            <td>{{ car.owner_fullname }}</td>
            <td>{{ car.owner_phone }}</td>
            <td>{{ new Date(car.registered_at).toLocaleString() }}</td>
            <td>{{ car.prepay_expires_at ? new Date(car.prepay_expires_at).toLocaleString() : '-' }}</td>
            <td>{{ statuses[car.status] }}</td>
            <td>
              <div><a href="#">Подробно</a></div>
              <div><a href="#">Выезд</a></div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <modal name="add-car-modal" :min-width="200"
           :min-height="200"
           :scrollable="true"
           :reset="true"
           width="60%"
           height="auto">
      <register-car @car-created="pushCar" :daily-rates="[80, 130, 170]"></register-car>
    </modal>

    <modal name="car-details">
      <car-details :car="selectedCarForDetails"></car-details>
    </modal>

  </div>
</template>

<script>
import "materialize-css/dist/css/materialize.min.css";
import RegisterCar from "@/components/RegisterCar";

export default {
  name: 'App',
  components: {RegisterCar},
  data() {
    return {
      statuses: {
        1: "Не оплачен",
        2: "Должник",
        3: "Предоплата",
        4: "Предоплата (выехал)",
      },
      cars: [
        {
          "manufacturer": "Hyundai",
          "model": "Solaris",
          "gov_id": "АА111А",
          "owner_fullname": "Иванов Иван Иванович",
          "owner_phone": "+7 999 999 99 99",
          "registered_at": new Date(2020, 8, 25, 11, 1),
          "prepay_expires_at": null,
          "status": 1,
          "note": null
        }
      ]
    }
  },
  mounted() {
    //@todo fetch cars from api
    //@todo автопереход в должники
  },
  methods: {
    pushCar(car) {
      car.registered_at = new Date();
      car.status = 1;
      //@todo add to local queue
      //@todo send to api
      this.cars.push(car);
    }
  }
}
</script>
