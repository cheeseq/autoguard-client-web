<template>
  <div class="row">
    <div class="col s4">
      <div class="input-field">
        <autocomplete
          :search="suggestManufacturer"
          :get-result-value="getResultValue"
          :debounceTime="500"
          placeholder="Марка"
          :class="{ invalid: v.manufacturer.$error }"
          @submit="onSuggestionSelected"
        >
          <template
            #default="{
              rootProps,
              inputProps,
              inputListeners,
              resultListProps,
              resultListListeners,
              results,
              resultProps
            }"
          >
            <div v-bind="rootProps">
              <input
                v-bind="inputProps"
                v-on="inputListeners"
                type="text"
                id="car_manufacturer"
                :class="{ invalid: v.manufacturer.$error }"
                placeholder="Марка"
              />
              <ul v-bind="resultListProps" v-on="resultListListeners">
                <li v-for="(result, index) in results" :key="resultProps[index].id" v-bind="resultProps[index]">
                  {{ getResultValue(result) }}
                </li>
              </ul>
              <span v-if="!v.manufacturer.required" class="helper-text" data-error="Обязательно для заполнения"></span>
            </div>
          </template>
        </autocomplete>
      </div>
    </div>
    <div class="col s4">
      <div class="input-field">
        <input
          type="text"
          v-model="v.model.$model"
          id="car_model"
          :class="{ invalid: v.model.$error }"
          placeholder="Модель"
        />
        <span v-if="!v.model.required" class="helper-text" data-error="Обязательно для заполнения"></span>
      </div>
    </div>
    <div class="col s4">
      <div class="input-field">
        <input
          type="text"
          id="car_gov_id"
          v-model="v.gov_id.$model"
          :class="{ invalid: v.gov_id.$error }"
          placeholder="Гос.номер"
        />
        <span v-if="!v.gov_id.required" class="helper-text" data-error="Обязательно для заполнения"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import Autocomplete from "@trevoreyre/autocomplete-vue";
import "@trevoreyre/autocomplete-vue/dist/style.css";

export default {
  components: { Autocomplete },
  props: {
    order: {
      type: Object,
      required: true,
    },
    v: {
      type: Object,
      required: true,
    },
  },
  methods: {
    suggestManufacturer(input) {
      const url = `https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/car_brand`;
      this.v.manufacturer.$model = input;

      return new Promise((resolve) => {
        if (input.length < 2) {
          return resolve([]);
        }

        fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${process.env.VUE_APP_DADATA_API_TOKEN}`,
          },
          body: JSON.stringify({ query: input }),
        })
          .then((response) => response.json())
          .then((data) => {
            resolve(data.suggestions);
          });
      });
    },
    getResultValue(result) {
      return result.value;
    },
    onSuggestionSelected(result) {
      this.v.manufacturer.$model = result.value;
    },
  },
};
</script>
