import moment from 'moment';

export default {
  methods: {
    getHoursSpent(order) {
      moment.locale('ru');
      let regTime = moment(order.created_at.toDate());
      let currentTime = moment();
      let hoursSpent = currentTime.diff(regTime, 'hours', true);
      if (hoursSpent < 24) {
        return 24;
      }
      return Math.round(hoursSpent);
    },
    getFullDaysSpent(order) {
      return Math.floor(this.getHoursSpent(order) / 24);
    },
    getSpentAsString(order) {
      let days = this.getFullDaysSpent(order);
      let hoursLeft = this.getHoursSpent(order) - (days * 24);
      return days + " дней, " + hoursLeft + " часов";
    },
    getTotalPrice(order) {
      return Math.round(this.getHoursSpent(order) * (order.daily_rate / 24));
    },
    isUnpaid(order) {
      return order.status.id === 'unpaid';
    },
    isDebtor(order) {
      return order.status.id === 'debtor';
    },
    isPrepayer(order) {
      return order.status.id === 'prepayer';
    },
    isLeftPrepayer(order) {
      return order.status.id === 'temporary-left';
    },
  }
}