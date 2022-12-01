<template>
  <div class="px-10 py-10 my-2 lg:ml-5">
    <div
      class="
        flex
        flex-col
        md:flex-row
        md:justify-between
        md:items-center
        pb-4
        pt-8
        px-8
        bg-gray-900
        w-full
      "
    >
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative left-0 mb-4">
        <div
          class="
            flex
            absolute
            inset-y-0
            left-0
            items-center
            pl-3
            pointer-events-none
          "
        >
          <button type="button" @click="handleSearch">
            <svg
              class="w-5 h-5 white:text-gray-500 text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <input
          id="table-search-users"
          v-model="searchText"
          type="text"
          class="
            block
            p-2
            pl-10
            w-80
            text-sm
            white:text-gray-900 white:bg-gray-50
            rounded-lg
            border
            white:border-gray-300
            white:focus:ring-blue-500
            white:focus:border-blue-500
            bg-gray-700
            border-gray-600
            placeholder-gray-400
            text-white
            focus:ring-blue-500 focus:border-blue-500
          "
          placeholder="Search by author's name"
          @keyup.enter="handleSearch"
        >
      </div>
      <div class="relative flex">
        <router-link :to="{ name: 'add-expectation' }">
          <button
            type="button"
            class="
              focus:outline-none
              text-white
              focus:ring-4
              font-medium
              rounded-lg
              text-sm
              mr-6
              px-1.5
              py-1.5
              mb-2
              bg-green-600
              hover:bg-green-700
              focus:ring-green-900
            "
          >
            Add expectation
          </button>
        </router-link>
        <router-link :to="{ name: 'expectations-history' }">
          <button
            type="button"
            class="
              focus:outline-none
              text-white
              focus:ring-4
              font-medium
              rounded-lg
              text-sm
              px-1.5
              py-1.5
              mb-2
              bg-blue-600
              hover:bg-blue-700
              focus:ring-blue-900
            "
          >
            Done history
          </button>
        </router-link>
      </div>
    </div>
    <div class="overflow-x-auto relative shadow-md">
      <table class="w-full text-sm text-left white:text-gray-50 text-gray-400">
        <thead
          class="
            text-xs
            white:text-gray-700
            uppercase
            white:g-gray-200
            bg-gray-900
            text-gray-400
          "
        >
          <tr>
            <th scope="col" class="py-3 px-6">Author</th>
            <th scope="col" class="py-3 px-6">Expects</th>
            <th scope="col" class="py-3 px-6">Done at</th>
            <th scope="col" class="py-3 px-6">Status</th>
            <th scope="col" class="py-3 px-6">Actions</th>
            <th scope="col" class="px-2">Mark done</th>
          </tr>
        </thead>
        <tbody v-if="!loading">
          <tr
            v-for="(expectation, index) in expectations"
            :key="index"
            class="
              white:bg-white
              border-b
              bg-gray-800
              border-gray-700
              white:hover:bg-gray-200
              hover:bg-gray-600
            "
          >
            <th
              scope="row"
              class="
                flex
                items-center
                py-4
                px-6
                white:text-gray-900
                whitespace-nowrap
                text-white
              "
            >
              <img class="w-10 h-10 rounded-full" src="@/assets/user.png" alt="user img">
              <div class="pl-3">
                <div class="text-base font-semibold">
                  {{ expectation.author.username }}
                </div>
                <div class="font-normal text-gray-500">
                  {{ expectation.author.email }}
                </div>
              </div>
            </th>
            <td class="py-4 px-6">{{ expectation.expect }}</td>
            <td class="py-4 px-6">
              <div class="flex items-center">
                {{ new Date(expectation.done_at).toLocaleTimeString() }}
              </div>
            </td>
            <td class="py-4 px-6">
              <div class="flex items-center">
                <span
                  v-if="expectation.done"
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
                >Done
                </span>
                <span
                  v-else
                  class="
                    text-xs
                    font-semibold
                    mr-2
                    px-2.5
                    py-0.5
                    rounded
                    bg-yellow-200
                    text-yellow-900
                  "
                >Pending
                </span>
              </div>
            </td>
            <td class="py-4 px-6">
              <div v-if="currentUser.email === expectation.author.email">
                <span>
                  <router-link
                    :to="{name: 'expectation-id', params: {id: expectation.id}}"
                    class="
                      font-medium
                      light:green-600
                      text-blue-400
                      hover:underline
                      mr-6
                    "
                  >
                    Edit
                  </router-link>
                </span>
                <button
                  class="
                    focus:outline-none
                    text-white
                    focus:ring-1
                    font-medium
                    rounded-sm
                    text-sm
                    px-1
                    py-1
                    mb-2
                    bg-red-600
                    hover:bg-red-700
                    focus:ring-red-900
                  "
                  @click.prevent="deleteCurrentExpectation(expectation)"
                >
                  Delete
                </button>
              </div>
            </td>
            <td class="p-4">
              <div v-if="currentUser.email === expectation.author.email" class="flex items-center">
                <input
                  v-model="expectation.done"
                  type="checkbox"
                  class="
                    w-4
                    h-4
                    text-blue-600
                    white:bg-gray-100
                    rounded
                    white:border-gray-300 white:focus:ring-blue-500
                    focus:ring-blue-600
                    ring-offset-gray-800
                    focus:ring-2
                    bg-gray-700
                    border-gray-600
                  "
                  :checked="expectation.done"
                  @input="handleCheckbox(expectation)"
                >
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="!loading && expectations.length === 0" class="bg-yellow-500 flex py-5 items-center justify-center">
      <h2>No active expectations...</h2>
    </div>
    <div v-if="loading" class="flex items-center justify-center mt-5">
      <span
        class="
          spinner-border
          animate-spin
          inline-block
          w-10
          h-10
          border-2
          rounded-full
          text-blue-500
        "
      />
    </div>
  </div>
</template>
<script>
import eventBus from "@/common/EventBus";
import { getUserBoard } from "@/services/user.service";
import { getAll, deleteExpectation, markDone, searchExpectation } from "@/services/expectationDataService";

export default {
  name: "Expectations",
  data() {
    return {
      expectations: [],
      loading: true,
      searchText: ""
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user.user;
    }
  },
  watch: {
    searchText(value, oldValue) {
      searchExpectation(value).then((response) => {
        this.expectations = response.data;
      });
      return oldValue;
    }
  },
  mounted() {
    this.retrieveExpectations();
    getUserBoard().then(
      (response) => {
        return response;
      },
      (error) => {
        if (error.message) {
          eventBus.dispatch("logout");
        }
      }
    );
  },
  methods: {
    retrieveExpectations() {
      getAll()
        .then((response) => {
          this.expectations = response.data.filter((element) => {
            return element.current === true;
          });
        })
        .then(
          setTimeout(() => {
            this.loading = false;
          }, 700)
        );
    },
    deleteCurrentExpectation(expectation) {
      deleteExpectation(expectation.id).then(() => {
        this.expectations = this.expectations.filter((element) => {
          return element.id !== expectation.id;
        });
      });
    },
    handleCheckbox(expectation) {
      expectation["done"] = !expectation.done;
      markDone(expectation.id, expectation);
    },
    handleSearch() {
      searchExpectation(this.searchText).then((response) => {
        this.expectations = response.data;
      });
    }
  }
};
</script>
