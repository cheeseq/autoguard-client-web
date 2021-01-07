export default {
  methods: {
    getFullname(customer) {
      return `${customer.last_name} ${customer.first_name} ${customer.middle_name ?? ""}`;
    },
  },
};
