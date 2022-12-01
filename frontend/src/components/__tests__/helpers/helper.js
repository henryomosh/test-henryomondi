export const globals = {
  $store: {
    state: {
      auth: {
        status: {
          loggedIn: false
        }
      }
    },
    dispatch: () => Promise.resolve({ message: "" })
  },
  $router: {
    push: () => {}
  },
};