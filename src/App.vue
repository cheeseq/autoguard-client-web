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
            <th>Предоплата истекает</th>
            <th>Статус</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="car of cars" v-bind:key="car.owner_phone" :class="{'red lighten-4': isDebtor(car), 'grey lighten-3': isLeftPrepayer(car)}">
            <td>{{ car.manufacturer }} {{ car.model }}</td>
            <td>{{ car.gov_id }}</td>
            <td>{{ car.owner_fullname }}</td>
            <td>{{ car.owner_phone }}</td>
            <td>{{ new Date(car.registered_at).toLocaleString() }}</td>
            <td>{{ car.prepay_expires_at ? new Date(car.prepay_expires_at).toLocaleString() : '-' }}</td>
            <td><span :class="{'red-text': isDebtor(car)}">{{ statuses[car.status] }}</span></td>
            <td>
              <div><a href="#">Подробно</a></div>
              <div v-if="isPrepayer(car)">
                <a href="#" @click="openActionModal('temp-leave-car-modal', car)"
                >Выезд</a>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <modal name="temp-leave-car-modal" :min-width="200"
           :min-height="200"
           :scrollable="true"
           :reset="true"
           width="60%"
           height="auto">
      <temp-leave
          :car="selectedCar"
          @action:cancel:temp-leave="$modal.hide('temp-leave-car-modal')"
          @action:commit:temp-leave="$modal.hide('temp-leave-car-modal')"
      ></temp-leave>
    </modal>

    <modal name="add-car-modal" :min-width="200"
           :min-height="200"
           :scrollable="true"
           :reset="true"
           width="60%"
           height="auto">
      <register-car @car-created="pushCar" :daily-rates="[80, 130, 170]"></register-car>
    </modal>

    <!--<modal name="car-details">
      <car-details :car="selectedCarForDetails"></car-details>
    </modal>-->

  </div>
</template>

<script>
import "materialize-css/dist/css/materialize.min.css";
import RegisterCar from "@/components/RegisterCar";
import TempLeave from "@/components/actions/TempLeave";

export default {
  name: 'App',
  components: {TempLeave, RegisterCar},
  data() {
    return {
      selectedCar: null,
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
          "registered_at": new Date(2020, 7, 25, 11, 1),
          "expires_at": new Date(2020, 8, 6, 21, 44),
          "prepay_expires_at": null,
          "status": 1,
          "note": null
        },
        {
          "manufacturer": "Hyundai",
          "model": "Solaris",
          "gov_id": "АА111А",
          "owner_fullname": "Предпоплатник",
          "owner_phone": "+7 999 999 99 99",
          "registered_at": new Date(2020, 7, 6, 21, 25),
          "expires_at": new Date(2020, 9, 6, 11, 1),
          "prepay_expires_at": new Date(2020, 8, 6, 21, 26),
          "temp_left_at": null, //когда отъехал предоплатник
          "status": 3,
          "note": null
        }
      ],
      owner_deadline: 86400 * 30
    }
  },
  mounted() {
    //@todo fetch cars from api
    setInterval(() => {
      let currentDate = new Date();
      for (let car of this.cars) {
        console.log(currentDate.getMinutes(), currentDate.getSeconds());
        if (car.status === 1 && car.expires_at < currentDate) {
          car.status = 2;
        } else if (car.status === 3 && (car.prepay_expires_at < currentDate)) {
          car.status = 1;
        }
      }
    }, 10000);
  },
  methods: {
    pushCar(car) {
      car.registered_at = new Date();
      car.expires_at = new Date().setMonth(new Date().getMonth() + 1);
      car.status = 1;
      //@todo add to local queue
      //@todo send to api
      this.cars.push(car);
    },
    isDebtor(car) {
      return car.status === 2;
    },
    isPrepayer(car) {
      return car.status === 3;
    },
    isLeftPrepayer(car) {
      return car.status === 4;
    },
    openActionModal(modalName, car) {
      this.selectedCar = car;
      this.$modal.show(modalName);
    }
  }
}
</script>
