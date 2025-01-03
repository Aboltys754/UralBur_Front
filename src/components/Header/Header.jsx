import serviceHost from "../libs/service.host.js";
import connector from "../libs/connector.js";

connector.add("Header");

const alias = window.location.pathname.split("/").pop().slice(0, -5) || 'index';

fetch(`${serviceHost("mcontent")}/api/mcontent/template/public/${alias}`)
  .then(async response => {
    if (response.ok) {
      const res = await response.json();
      return res;
    }
    throw new Error('bad alias page')
  })
  .then(res => {
    document.title = res.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', res.meta.description);
  })
  .catch(error => console.log(error.message))
  .finally(_ => connector.del("Header"))