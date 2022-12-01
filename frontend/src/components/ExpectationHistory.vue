<template>
  <div class="py-10 md:mx-20 mx-6">
    <div class="flex items-center flex-col md:flex-row">
      <div class="md:mx-12 mb-6 md:px-10">
        <div
          class="
            bg-white
            rounded-lg
            border border-gray-200
            w-full
            text-gray-900
          "
        >
          <li
            class="
              block
              px-20
              pt-6
              bg-gray-200
              border-b border-gray-200
              w-full
              cursor-pointer
            "
          >
            <h2 class="text-xl font-normal ml-2 mb-3 px-12">
              <span class="px-12">Done history list</span>
            </h2>
          </li>
          <li
            v-for="(expectation, index) in expectations"
            :key="index"
            aria-current="true"
            class="
              block
              px-6
              py-2
              border-b border-gray-200
              w-full
              cursor-pointer
            "
            :class="
              index === currentIndex
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-100 hover:text-gray-500 focus:outline-non focus:bg-gray200 focus:text-gray-600 transition duration-500'
            "
            @click="setActiveExpectation(index)"
          >
            <span> {{ index + 1 }}. </span> {{ expectation.expect }}
          </li>
          <div v-if="expectations.length === 0" class="flex items-center justify-center px-5 py-5 bg-yellow-500">
            <h3 class="text-base">No done expectation</h3>
          </div>
        </div>
      </div>
      <div v-if="expectations.length > 0" class="shadow-lg bg-indigo-100 p-6 md:float-right">
        <h2 class="text-xl font-normal mb-3">Details</h2>
        <div v-for="(expectation, index) in expectations" :key="index">
          <div v-if="index === currentIndex">
            <div class="pb-1.5">
              <label><strong>Owner: </strong></label>
              {{ expectation.author.username }}
            </div>
            <div class="mb-1.5">
              <label><strong>Expect:</strong></label>
              {{ expectation.expect }}
            </div>
            <div class="mb-1.5">
              <label><strong>Done at:</strong></label>
              {{ new Date(expectation.done_at).toLocaleString() }}
            </div>
            <div class="mb-1.5">
              <label><strong>Status: </strong></label>
              <span
                class="
                  text-xs
                  font-semibold
                  mr-2
                  px-2.5
                  py-0.5
                  rounded
                  bg-green-200
                  text-green-900
                "
              >
                Done
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAll } from "@/services/expectationDataService";
export default {
  name: "ExpectationHistory",
  data() {
    return {
      expectations: [],
      currentIndex: -1
    };
  },
  mounted() {
    this.retrieveExpectations();
    this.currentIndex = 0;
  },
  methods: {
    retrieveExpectations() {
      getAll().then((response) => {
        this.expectations = response.data.filter((element) => {
          return element.done === true;
        });
      });
    },
    setActiveExpectation(index) {
      this.currentIndex = index;
    }
  }
};
</script>
