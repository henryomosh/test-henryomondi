import { mount } from "@vue/test-utils";
import { globals } from "@/components/__tests__/helpers/helper";
import Login from "@/components/Login";
import GoogleLogin from "vue3-google-login";

describe("Login user", function () {
  it("Show success after submit", async () => {
    const wrapper = mount(Login, {
      global: {
        mocks: globals,
        components: {
          "google-login": GoogleLogin
        }
      }
    });
    wrapper.setData({ formaFields: { email: "" }, response: { data: {

    } } });

    await wrapper.find("input[type=email]").setValue("testuser@email.com");
    await wrapper.find("input[type=password]").setValue("pas$word");
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.vm.successful).toBe(true);
  });
});