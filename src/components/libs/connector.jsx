import { loader, shower } from "./common.js";

class Connector {
  components = new Map();

  add(name) {
    this.components.set(name, 1);
  }

  del(name){
    this.components.delete(name);

    if(!this.components.size) {
      this.start();
    }
  }

  start() {
    loader(jQuery);
    shower(jQuery);
  }
}

const connector = new Connector();
export default connector;