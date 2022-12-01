<template>
  <div
    class="
      px-6
      lg:px-40
      md:px-40
      lg:px-80
      bg-gray-100
      text-gray-800 text-center
      pt-12
      h-screen
    "
  >
    <div
      class="
        block
        rounded-lg
        shadow-lg
        bg-white
        px-6
        py-6
        lg:mx-20
        xl:mx-40
      "
    >
      <h1 class="mb-8 text-xl font-bold">Login to your account</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-6">
          <input
            v-model="formFields.email"
            type="email"
            name="email"
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
              focus:bg-white
              focus:border-blue-600
              focus:outline-none
            "
            placeholder="Email"
            @blur="validate('email')"
            @keyup="validate('email')"
          >
          <p v-show="!!errors.email" class="text-xs text-left text-red-500 mt-1">
            {{ errors.email }}
          </p>
        </div>
        <div class="mb-6">
          <input
            v-model="formFields.password"
            vi-model="password"
            type="password"
            name="password"
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
              focus:bg-white
              focus:border-blue-600
              focus:outline-none
            "
            placeholder="Password"
            @blur="validate('password')"
            @keypress="validate('password')"
          >
          <p v-show="!!errors.password" class="text-xs text-left text-red-500 mt-1">
            {{ errors.password }}
          </p>
        </div>
        <button
          type="submit"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          class="
            inline-block
            px-6
            py-2.5
            mb-6
            w-full
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
          :disabled="loading"
        >
          <span
            v-show="loading"
            class="
              mr-1
              spinner-border
              animate-spin
              inline-block
              w-3
              h-3
              border-3
              rounded-full
              text-white-500
            "
          />
          Login
        </button>
        <div
          v-if="message"
          class="
            bg-red-100
            rounded-lg
            py-3
            px-3
            mb-4
            text-base text-red-700 text-sm
            whitespace-pre-wrap
          "
        >
          {{ message }}!
        </div>
        <div class="text-center">
          <p class="mb-3 text-md">OR</p>
        </div>
      </form>
      <div>
        <google-login :callback="callback" popup-type="TOKEN">
          <button
            class="flex items-center justify-center border-solid border-2 px-6 py-2 bg-gray-100 hover:bg-gray-200"
          >
            <svg viewBox="0 0 48 48">
              <clipPath id="g">
                <path
                  d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                />
              </clipPath>
              <g class="colors" clip-path="url(#g)">
                <path fill="#FBBC05" d="M0 37V11l17 13z" />
                <path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
                <path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
                <path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
              </g>
            </svg>
            <span class="pl-1 pt-2 google-text font-semi-bold">Login with Google</span>
          </button>
        </google-login>
      </div>
    </div>
  </div>
</template>
<script>
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Email is required!"),
  password: yup.string().required("Password is required!")
});

export default {
  name: "Login",
  data() {
    return {
      url: "",
      formFields: {
        email: "",
        password: ""
      },
      errors: {
        email: "",
        password: ""
      },
      successful: false,
      loading: false,
      message: ""
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push({ name: "expectations" });
    }
  },
  methods: {
    callback(response) {
      this.$store.dispatch("auth/googleAuth", response);
    },
    handleLogin() {
      this.loading = true;
      this.$store.dispatch("auth/login", this.formFields).then(
        (response) => {
          if (response.data) {
            response.data["email"] = this.formFields.email;
          }
          this.$store.dispatch("auth/currentUser", response.data).then(() => {
            this.successful = true;
            this.loading = false;
            this.$router.push({ name: "expectations" });
          });
        },
        (error) => {
          this.message = error.response.data.error_description;
          this.successful = false;
          this.loading = false;
        }
      );
    },
    validate(field) {
      schema
        .validateAt(field, this.formFields)
        .then(() => {
          this.errors[field] = "";
        })
        .catch((err) => {
          this.errors[err.path] = err.message;
        });
    }
  }
};
</script>
<style>
svg {
  max-height: 100vh;
  max-width: 100vw;
  height: 30px;
  width: 30px;
}
.google-text {
  font-size: 17px;
}
</style>
