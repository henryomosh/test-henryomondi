<template>
  <div class="flex items-center justify-center py-20 my-12 px-12 mr-0">
    <div class="block p-6 rounded-lg shadow-lg bg-white w-full max-w-lg mb-20">
      <div class="flex items-center justify-center mb-6">
        <p class="text-lg text-gray-900">Edit Expectation</p>
      </div>
      <form>
        <div class="form-group mb-6">
          <label for="expect" class="form-label inline-block mb-2 text-gray-700 text-sm">Expectation</label>
          <input
            id="expect"
            v-model="currentExpectation.expect"
            type="text"
            class="
              form-control
              block
              w-full
              px-3
              py-1.5
              text-sm
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700
              focus-bg-white
              focus:border-blue
              focus:outline-none
            "
            placeholder="Enter Expectation"
          >
          <p v-show="!!fieldErrors.expect" class="text-xs text-left text-red-500 mt-1">
            {{ fieldErrors.expect }}
          </p>
        </div>
        <label for="datepicker" class="form-label inline-block mb-2 text-gray-700 text-sm">Done at</label>
        <DatePicker id="datepicker" v-model="currentExpectation.done_at" />
        <p v-show="!!fieldErrors.done_at" class="text-xs text-left text-red-500 mt-1">
          {{ fieldErrors.done_at }}
        </p>
        <div class="form-group mb-6" />
        <button
          type="submit"
          class="
            w-full
            px-6
            py-2.5
            bg-blue-600
            text-white
            font-medium
            text-xs
            leading-tight
            uppercase
            rounded
            shadow-md
            hover:bg-blue-700 hover:shadow-lg
            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus-ring-0
            active:background-800 active-shadow-lg
            transition
            duration-150
            ease-in-out
          "
          :disabled="submitting"
          @click.prevent="updateCurrentExpectation"
        >
          <span
            v-show="submitting"
            class="
              spinner-border
              animate-spin
              inline-block
              mr-1
              w-3
              h-3
              border-3
              rounded-full
              text-white-500
            "
          />
          Edit
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { updateExpectation, getExpectation } from "@/services/expectationDataService";

export default {
  name: "EditExpectation",
  components: {
    DatePicker
  },
  data() {
    return {
      submitted: false,
      currentExpectation: {},
      message: "",
      fieldErrors: {
        expect: "",
        done_at: "",
      }
    };
  },
  mounted() {
    this.message = "";
    this.getCurrentExpectation(this.$route.params.id);
  },
  methods: {
    getCurrentExpectation(id) {
      getExpectation(id).then((response) => {
        this.currentExpectation = response.data;
        const isoDate = response.data.done_at;
        const [yyyy, mm, dd, hh, mi] = isoDate.split(/[/:\-T]/);
        this.currentExpectation.done_at = `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
      });
    },
    updateCurrentExpectation() {
      this.submitted = true;
      this.fieldErrors.done_at = "";
      this.fieldErrors.expect = "";
      updateExpectation(this.currentExpectation.id, this.currentExpectation).then(() => {
        this.message = "The expectation was updated successfully!";
        this.$router.push({ name: "expectations" });
      },
      (error) => {
        if (error.response.data.expect) {
          this.fieldErrors.expect = error.response.data.expect[0];
        }
        if (error.response.data.done_at) {
          if (this.currentExpectation.done_at === "") {
            this.fieldErrors.done_at = "This field may not be blank";
          } else {
            this.fieldErrors.done_at = error.response.data.done_at[0];
          }
        }
        this.submitted = false;
      }
      );
    }
  }
};
</script>
<style>
.dp__input {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
}
</style>
