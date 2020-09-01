<template>
  <div id="app">
    <div style="padding-top: 2rem;">
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
              <td>{{ car.registered_at|date }}</td>
              <td>{{ car.expires_at || '-' }}</td>
              <td>{{ car.status }}</td>
              <td>
                <a href="#" class="btn dropdown-trigger" data-target="ex1">Действия</a>
                <ul id='ex1' class='dropdown-content'>
                  <li><a class="modal-trigger" href="#details-modal">Подробно</a></li>
                  <li><a href="#!" class="green-text lighten-2-text">Расчет</a></li>
                </ul>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <modal name="add-car-modal" :min-width="200"
           :min-height="200"
           :scrollable="true"
           :reset="true"
           width="60%"
           height="auto">
      <add-car v-on:car-created="pushCar"></add-car>
    </modal>
  </div>
</template>

<script>
import "materialize-css/dist/css/materialize.min.css";
import AddCar from "@/components/AddCar";

export default {
  name: 'App',
  components: {AddCar},
  data() {
    return {
      cars: [
        {
          "manufacturer": "Hyundai",
          "model": "Solaris",
          "gov_id": "АА111А",
          "owner_fullname": "Иванов Иван Иванович",
          "owner_phone": "+7 999 999 99 99",
          "registered_at": new Date(2020, 8, 25, 11, 1).toLocaleString(),
          "expires_at": null,
          "status": "Не оплачен"
        }
      ]
    }
  },
  methods: {
    pushCar(car) {
      //@todo send to api
      this.cars.push(car);
    }
  }
}
</script>
