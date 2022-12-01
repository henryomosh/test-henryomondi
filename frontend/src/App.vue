<template>
  <div class="bg-gray-100 min-h-screen">
    <section>
      <nav
        class="
          navbar navbar-expand-lg
          shadow-md
          py-2
          bg-white
          relative
          flex
          items-center
          w-full
          justify-between
        "
      >
        <div class="px-6 w-full flex flex-wrap items-center justify-between">
          <div class="flex items-center pr-10">
            <button
              type="button"
              class="
                navbar-toggler
                border-0
                py-3
                lg:hidden
                leading-none
                text-xl
                bg-transparent
                text-gray-600
                hover:text-gray-700
                transition-shadow
                duration-150
                ease-in-out
                mr-2
              "
              data-bs-toggle="collapse"
              data-bs-target="#navbar-supported-content"
              aria-controls="navbar-supported-content"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                class="w-5"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                />
              </svg>
            </button>
            <router-link
              :to="loggedIn ? { name: 'expectations' } : { name: 'ping' }"
              class="navbar-brand text-blue-600"
            >
              <img src="@/assets/logo-dark.png" class="h-10">
            </router-link>
          </div>
          <div id="navbar-supported-content" class="navbar-collapse collapse grow items-center">
            <ul class="navbar-nav mr-auto lg:flex lg:flex-row">
              <li class="nav-item">
                <router-link
                  v-if="loggedIn"
                  :to="{ name: 'profile' }"
                  class="
                    nav-link
                    block
                    pr-2
                    lg:px-2
                    py-2
                    text-gray-600
                    hover:text-gray-900
                    focus:text-gray-900
                    transition
                    duration-150
                    ease-in-out
                  "
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                >
                  Profile
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{ name: 'expectations' }"
                  class="
                    nav-link
                    block
                    pr-2
                    lg:px-2
                    py-2
                    text-gray-600
                    hover:text-gray-900
                    focus:text-gray-900
                    transition
                    duration-150
                    ease-in-out
                  "
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                >
                  Expectations
                </router-link>
              </li>
            </ul>
          </div>
          <div class="flex items-center lg:ml-auto xs:mt-4">
            <router-link
              v-if="loggedIn && currentUser"
              :to="{ name: 'profile' }"
              class="
                inline-block
                mr-12
                py-2.5
                mr-2
                bg-transparent
                text-gray-600
                hover:text-gray-800
                focus:text-gray-700
                transition
                duration-150
                ease-in-out
              "
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
            >
              Logged in as: <strong>{{ currentUser.username }}</strong>
            </router-link>
            <router-link
              v-if="!loggedIn"
              :to="{ name: 'login' }"
              class="
                inline-block
                px-6
                py-2.5
                mr-2
                bg-transparent
                text-blue-600
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                hover:text-blue-700
                bg-gray-100
                hover:bg-gray-300
                focus:bg-gray-100 focus:outline-none focus:ring-0
                active:bg-gray-200
                transition
                duration-150
                ease-in-out
              "
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
            >
              Login
            </router-link>
            <router-link
              v-if="!loggedIn"
              id="signup-link"
              :to="{ name: 'register' }"
              class="
                inline-block
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
                focus:bg-blue-700
                focus:shadow-lg
                focus:outline-none
                focus:ring-0
                active:bg-blue-800 active:shadow-lg
                transition
                duration-150
                ease-in-out
              "
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
            >
              Sign up
            </router-link>
            <router-link
              v-if="loggedIn"
              id="login"
              :to="{ name: 'login' }"
              class="
                inline-block
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
                focus:bg-blue-700
                focus:shadow-lg
                focus:outline-none
                focus:ring-0
                active:bg-blue-800 active:shadow-lg
                transition
                duration-150
                ease-in-out
              "
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
              @click="logout"
            >
              Logout
            </router-link>
          </div>
        </div>
      </nav>
      <router-view />
    </section>
  </div>
</template>
<script>
import eventBus from "@/common/EventBus";

export default {
  name: "App",
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user.user;
    }
  },
  mounted() {
    eventBus.on("logout", () => {
      this.logout();
    });
  },
  beforeUnmount() {
    eventBus.remove("logout");
  },
  methods: {
    logout() {
      this.$router.push({ name: "login" }).then( () => {
        this.$store.dispatch("auth/logout");
      });
    }
  }
};
</script>
