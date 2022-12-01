<template>
  <div class="text-center text-gray-800 py-20 px-6 lg:px-20">
    <div class="p-6 shadow-lg rounded-lg bg-indigo-100 text-gray-700">
      <h2 class="font-semibold text-3xl mb-5">Project overview</h2>
      <hr class="border-gray-300">
      <p class="whitespace-normal py-6">
        This is a simple signup and sign in project that allows authenticated users to manage team expectations.
        Authenticated users can track expectation of each team member. They can access information such as what to
        expect, when to be done, when the expectation was created and the author of the expectation.
      </p>
      <router-link
        :to="{ name: 'register' }"
        class="
          inline-block
          px-6
          py-2.5
          my-5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg
          transition
          duration-150
          ease-in-out
        "
        data-mdb-ripple="true"
        data-mdb-ripple-color="light"
      >
        Get started
      </router-link>
    </div>
  </div>
  <div class="mb-auto mt-20 pb-5">
    <div class="text-white flex items-center justify-center">
      <span class="text-xl text-black">API Status :</span>&nbsp;
      <div
        id="status"
        class="
          rounded-full
          h-10
          w-10
          inline-block
          font-mono
          flex
          items-center
          justify-center
        "
        :class="computedBackground"
      >
        {{ statusCode }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Ping",
  data() {
    return { alive: undefined, fetchInterval: null, statusCode: "---" };
  },
  computed: {
    computedBackground() {
      return this.alive === undefined ? "bg-gray-500" : this.alive ? "bg-green-500" : "bg-red-500";
    }
  },
  mounted() {
    this.fetchInterval = setTimeout(this.checkIsAlive, 1000);
  },
  unmounted() {
    this.fetchInterval && clearInterval(this.fetchInterval);
  },
  methods: {
    async checkIsAlive() {
      const response = await fetch("/api/hello/ping/");
      this.statusCode = response.status;
      if (response.status !== 200) {
        this.alive = false;
      } else {
        const data = await response.json();
        this.alive = data.status;
      }
    }
  }
};
</script>
