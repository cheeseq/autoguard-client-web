<template>
  <div class="row">
    <div class="col s5 offset-s7">
      <div class="row">
        <div class="col s5">
          <button
            v-show="showCancelButton"
            type="button"
            class="btn red lighten-2"
            @click="$emit('action:cancel')"
            id="cancel_action"
          >
            {{ cancelButtonText }}
          </button>
        </div>
        <div class="col s7">
          <button
            v-show="showCommitButton"
            type="button"
            class="btn green lighten-2"
            @click="$emit('action:commit')"
            id="commit_action"
          >
            {{ commitButtonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActionButtons",
  props: {
    showCancelButton: {
      type: Boolean,
      default: true,
    },
    showCommitButton: {
      type: Boolean,
      default: true,
    },
    cancelButtonText: {
      type: String,
      default: "Отмена",
    },
    commitButtonText: {
      type: String,
      default: "Сохранить",
    },
  },
};
</script>
