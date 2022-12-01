<template>
  <div class="h-screen w-full relative flex items-center justify-center">
    <div class="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-gray-900 opacity-75">
      <div>
        <p class="text-white text-3xl leading-0 font-bold">
          LOADING
          <span
            class="
              mr-2
              bg-current
              spinner-grow
              inline-block
              w-4
              h-4
              rounded-full
              opacity-0
              text-white-200
            "
            role="status"
          />
          <span
            class="
              mr-2
              bg-current
              spinner-grow
              inline-block
              w-4
              h-4
              rounded-full
              opacity-0
              text-white-200
            "
            role="status"
          />
          <span
            class="
              bg-current
              spinner-grow
              inline-block
              w-4
              h-4
              rounded-full
              opacity-0
              text-white-200
            "
            role="status"
          />
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoadingOverlay"
};
</script>
