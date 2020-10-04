<template>
  <div>
    <table class="centered highlight">
      <thead>
      <tr>
        <th>Описание</th>
        <th>Дата</th>
        <th>Примечание</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="event of order.events" :key="event.created_at">
        <td>{{ event.description }}</td>
        <td>{{ event.created_at | dateFormat('DD.MM.YYYY HH:mm:ss') }}</td>
        <td>{{ event.note }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "OrderEvents",
  props: {
    order: {
      type: Object,
      required: true
    },
  },
  computed: {
    ...mapState([
      'statuses'
    ])
  },
}
</script>

<style scoped>

</style>