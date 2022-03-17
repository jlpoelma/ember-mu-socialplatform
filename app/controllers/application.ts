import Store from '@ember-data/store';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service
  store!: Store;

  @service
  websockets!: any;
  @service
  flashMessages!: any;

  constructor() {
    super(...arguments);

    const socket = this.websockets.socketFor('ws://localhost:3002');
    socket.on('message', this.newPostHandler, this);
  }

  async newPostHandler(event: any) {
    let response = JSON.parse(event.data);

    let post = await this.store.findRecord('post', response.uuid);
    this.flashMessages.add({
      message: 'hello',
      type: 'foo',
      componentName: 'notification',
      content: {
        post: post,
      },
    });
  }
}
