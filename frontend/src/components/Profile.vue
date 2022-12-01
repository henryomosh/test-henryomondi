<template>
  <div class="py-10">
    <div
      v-if="currentUser"
      class="
        border border-gray-200
        bg-cyan-200
        text-dark
        shadow-lg
        md:mx-20
        mx-6
        mt-15
        md:px-12
        px-4
        py-6
        bg-gray-200
      "
    >
      <div class="flex items-center py-4 px-text-gray-900 whitespace-nowrap">
        <img src="@/assets/auser.jpg" class="h-20 w-15">
        <div class="pl-3">
          <div class="text-base font-semibold">
            {{ currentUser.username }}
          </div>
          <div class="font-normal text-gray-500">
            {{ currentUser.email }}
          </div>
        </div>
      </div>
      <hr class="border-gray-300">
      <p class="text-gray-500 py-2 text-sm"><strong>Expectations: </strong> {{ expectations.length }}</p>
      <p class="text-gray-500 text-sm"><strong>Done expectations: </strong> {{ doneExpectations.length }}</p>
    </div>
  </div>
</template>
<script>
import { getUserBoard, getCurrentUserExpectations } from "@/services/user.service";
import eventBus from "@/common/EventBus";

export default {
  name: "Profile",
  data() {
    return {
      currentUser: {},
      expectations: [],
      doneExpectations: []
    };
  },
  mounted() {
    getUserBoard().then(
      (response) => {
        this.currentUser = response.data;
        return response;
      },
      (error) => {
        if (error.message) {
          eventBus.dispatch("logout");
        }
      }
    );
    getCurrentUserExpectations().then((response) => {
      this.expectations = response.data;
      this.doneExpectations = response.data.filter((element) => {
        return element.done === true;
      });
    });
  }
};
</script>
