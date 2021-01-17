import { shallowMount } from '@vue/test-utils'
import OrderEvents from "@/components/OrderEvents.vue";
import {Timestamp} from '@/db';

const factory = (values = {}) => {
  return shallowMount(OrderEvents, {
    data() {
      return {
        ...values,
      };
    },
  });
};

describe('OrderEvents.vue', () => {
  it('displays nothing when no events passed', () => {
    const wrapper = shallowMount(OrderEvents, {
      propsData: { events: [] }
    });
    expect(wrapper.isEmpty()).toBeTruthy();
  });

  it("displays exactly same count of rows as events", () => {
    const wrapper = shallowMount(OrderEvents, {
      propsData: {
        events: [
          {
            descriptor: { name: "event" },
            created_at: Timestamp.fromDate(new Date()),
            note: "test",
          },
          {
            descriptor: { name: "event" },
            created_at: Timestamp.fromDate(new Date()),
            note: "test",
          },
          {
            descriptor: { name: "event" },
            created_at: Timestamp.fromDate(new Date()),
            note: "test",
          },
          {
            descriptor: { name: "event" },
            created_at: Timestamp.fromDate(new Date()),
            note: "test",
          },
        ],
      },
    });
    expect(wrapper.isEmpty()).toBeFalsy();
    expect(wrapper.find('tbody').findAll('tr').length).toBe(4);
  });

  it("displays name of the event", () => {
    const wrapper = shallowMount(OrderEvents, {
      propsData: {
        events: [
          {
            descriptor: { name: "event1" },
            created_at: Timestamp.fromDate(new Date()),
            note: "test",
          },
          {
            descriptor: { name: "newEvent" },
            created_at: Timestamp.fromDate(new Date()),
            note: "test",
          },
        ],
      },
    });
    let eventTRs = wrapper.find("tbody").findAll('tr');
    expect(eventTRs.at(0).text()).toContain('event1');
    expect(eventTRs.at(1).text()).toContain('newEvent');
  });

  it("displays date of the event", () => {
    let eventDate1 = new Date('2020-12-12T05:31:02');
    let eventDate2 = new Date('2019-11-10T11:25:14');
    const wrapper = shallowMount(OrderEvents, {
      propsData: {
        events: [
          {
            descriptor: { name: "event1" },
            created_at: Timestamp.fromDate(eventDate1),
            note: "test",
          },
          {
            descriptor: { name: "newEvent" },
            created_at: Timestamp.fromDate(eventDate2),
            note: "test",
          },
        ],
      },
    });
    let eventTRs = wrapper.find("tbody").findAll("tr");
    expect(eventTRs.at(0).text()).toContain(eventDate1.toLocaleString());
    expect(eventTRs.at(1).text()).toContain(eventDate2.toLocaleString());
  });

  it("displays note of the event", () => {
    const wrapper = shallowMount(OrderEvents, {
      propsData: {
        events: [
          {
            descriptor: { name: "event1" },
            created_at: Timestamp.fromDate(new Date()),
            note: "note1",
          },
          {
            descriptor: { name: "newEvent" },
            created_at: Timestamp.fromDate(new Date()),
            note: "zametka",
          },
        ],
      },
    });
    let eventTRs = wrapper.find("tbody").findAll("tr");
    expect(eventTRs.at(0).text()).toContain("note1");
    expect(eventTRs.at(1).text()).toContain("zametka");
  });

  it("resolves status change event note", () => {
    const wrapper = shallowMount(OrderEvents, {
      propsData: {
        events: [
          {
            descriptor: { name: "event1" },
            created_at: Timestamp.fromDate(new Date()),
            note: "note1",
          },
          {
            descriptor: { name: "newEvent" },
            created_at: Timestamp.fromDate(new Date()),
            oldStatus: {name: "Выехал"},
            newStatus: {name: "Заехал"},
            note: "zametka",
          },
        ],
      },
    });
    let eventTRs = wrapper.find("tbody").findAll("tr");
    expect(eventTRs.at(0).text()).toContain("note1");
    expect(eventTRs.at(1).text()).not.toContain("zametka");
    expect(eventTRs.at(1).text()).toContain("Выехал");
    expect(eventTRs.at(1).text()).toContain("Заехал");
  });
})
