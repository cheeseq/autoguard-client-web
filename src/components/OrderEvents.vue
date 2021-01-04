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
      <tr v-for="(event, idx) of order.events" :key="idx">
        <td>{{ event.descriptor.name }}</td>
        <td>{{ event.created_at.toDate().toLocaleString() }}</td>
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
}
</script>

<style scoped>

</style>