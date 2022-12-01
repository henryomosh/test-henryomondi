import { mount } from "@vue/test-utils";
import Ping from "@/components/Ping";

describe("Ping is alive", function () {
  it("returns status 200 ", () => {
    const wrapper = mount(Ping);
    setTimeout(() => {
      expect(wrapper.find("#status").text()).toBe(200);
    }, 1000);
  });
});
