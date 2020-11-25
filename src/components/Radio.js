import { RADIO_HOST } from "../../morkerfyr.config";
import ReconnectingEventSource from "reconnecting-eventsource";

export class Radio {
  constructor(mount) {
    this.url = RADIO_HOST + mount;
    this.metadata = this.url + "/metadata";
    this.history = this.metadata + "-history";
  }

  initEventSource() {
    return new ReconnectingEventSource.default(this.metadata);
  }
}
