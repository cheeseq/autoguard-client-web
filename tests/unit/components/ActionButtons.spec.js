import { shallowMount } from "@vue/test-utils";
import ActionButtons from "@/components/ActionButtons.vue";

describe("ActionButtons.vue", () => {
  it("shows both buttons default props is used", () => {
    const wrapper = shallowMount(ActionButtons);
    expect(wrapper.isEmpty()).toBeFalsy();
    expect(wrapper.contains("#cancel_action")).toBeTruthy();
    expect(wrapper.contains("#commit_action")).toBeTruthy();
  });

  it("shows both buttons captions correctly default props is used", () => {
    const wrapper = shallowMount(ActionButtons);
    expect(wrapper.isEmpty()).toBeFalsy();
    expect(wrapper.find("#cancel_action").text()).toBe("Отмена");
    expect(wrapper.find("#commit_action").text()).toBe("Сохранить");
  });

  it("doesn't shows cancel button when showCancelButton is false", () => {
    const wrapper = shallowMount(ActionButtons, {
      propsData: {
        showCancelButton: false,
        showCommitButton: true,
      },
    });
    expect(wrapper.find("#cancel_action").isVisible()).toBeFalsy();
    expect(wrapper.find("#commit_action").isVisible()).toBeTruthy();
  });

  it("doesn't shows commit button when showCancelButton is false", () => {
    const wrapper = shallowMount(ActionButtons, {
      propsData: {
        showCancelButton: true,
        showCommitButton: false,
      },
    });
    expect(wrapper.find("#cancel_action").isVisible()).toBeTruthy();
    expect(wrapper.find("#commit_action").isVisible()).toBeFalsy();
  });

  it("shows passed commit button text", () => {
    const wrapper = shallowMount(ActionButtons, {
      propsData: {
        commitButtonText: "Save",
      },
    });
    expect(wrapper.find("#commit_action").text()).toBe("Save");
  });

  it("shows passed cancel button text", () => {
    const wrapper = shallowMount(ActionButtons, {
      propsData: {
        cancelButtonText: "Cancel",
      },
    });
    expect(wrapper.find("#cancel_action").text()).toBe("Cancel");
  });

  it("emits commit event on commit button click", async () => {
    const wrapper = shallowMount(ActionButtons);
    await wrapper.find("#commit_action").trigger("click");
    expect(wrapper.emitted()["action:commit"]).toBeTruthy();
    expect(wrapper.emitted()["action:commit"].length).toBe(1);
  });

  it("emits cancel event on cancel button click", async () => {
    const wrapper = shallowMount(ActionButtons);
    await wrapper.find("#cancel_action").trigger("click");
    expect(wrapper.emitted()["action:cancel"]).toBeTruthy();
    expect(wrapper.emitted()["action:cancel"].length).toBe(1);
  });
});
