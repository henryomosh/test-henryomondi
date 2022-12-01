import { mount } from "@vue/test-utils";
import { globals } from "@/components/__tests__/helpers/helper";
import Register from "@/components/Register";
import GoogleLogin from "vue3-google-login";

describe("Submit register form", function () {
  it("Shows a success message after submit", async () => {
    const wrapper = mount(Register, {
      global: {
        mocks: globals,
        components: {
          "google-login": GoogleLogin
        }
      }
    });

    await wrapper.find("input[type=text]").setValue("testuser");
    await wrapper.find("input[type=email]").setValue("testuser@email.com");
    await wrapper.find("input[type=password]").setValue("pas$word");
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.find("#message").text()).toBe("Created account successfully");
  });
});