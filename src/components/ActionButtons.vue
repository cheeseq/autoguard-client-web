<template>
  <div class="row">
    <div class="col s5 offset-s7">
      <div class="row">
        <div class="col s5">
          <button type="button" class="btn red lighten-2" @click="$emit('action:cancel')">Отмена</button>
        </div>
        <div class="col s7">
          <button type="button" class="btn green lighten-2" @click="$emit('action:commit')">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActionButtons"
}
</script>

<style scoped>

</style>