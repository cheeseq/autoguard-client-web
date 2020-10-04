import axios from 'axios';

export default {
  _buffer: [],
  _intervalId: null,
  _errors: [],
  client: axios,
  //baseUrl: 'http://localhost:8080', //@todo resolve from env
  baseUrl: 'http://yandex.ru', //@todo resolve from env

  sendAction(actionName, payload) {
    this._buffer.push({
      'action': actionName,
      'payload': payload
    });
    this.tryPost();
  },

  tryPost() {
    if (this._intervalId !== null) {
      return;
    }
    this._intervalId = setInterval(() => {
      this.client
        .post(this.baseUrl + "/actions")
        .then((response) => {
          let body = JSON.parse(response.data);
          if (this._buffer.length !== body.length) {
            //then what?
          }
          for (let idx in this._buffer) {
            let req = this._buffer[idx];
            if (req.action === 'order-create-action') {
              req.payload.id = body[idx].id;
            }
          }
          clearInterval(this._intervalId);
          this._intervalId = null;
          this._buffer = [];
          this._errors = [];
        })
        .catch((error) => {
          this._errors.push(error);
          console.log(error);
        })
    }, 10000);
  }
}