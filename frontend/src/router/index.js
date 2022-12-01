import { createWebHistory, createRouter } from "vue-router";
import Expectations from "@/components/Expectations";
import Ping from "@/components/Ping";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Profile from "@/components/Profile";
import AddExpectation from "@/components/AddExpectation";
import EditExpectation from "@/components/EditExpectation";
import ExpectationHistory from "@/components/ExpectationHistory";
import LoadingOverlay from "@/components/LoadingOverlay";
import PageNotFound from "@/components/PageNotFound";

const routes = [
  {
    path: "/",
    name: "ping",
    component: Ping
  },
  {
    path: "/expectations",
    name: "expectations",
    component: Expectations,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/add",
    name: "add-expectation",
    component: AddExpectation,
  },
  {
    path: "/:id(\\d+)",
    name: "expectation-id",
    component: EditExpectation,
  },
  {
    path: "/history",
    name: "expectations-history",
    component: ExpectationHistory,
  },
  {
    path: "/loading",
    name: "loading",
    component: LoadingOverlay,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404Page",
    component: PageNotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/", "/login", "/register", "/loading"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
