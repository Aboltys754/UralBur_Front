import serviceHost from "../libs/service.host.js";
import connector from "../libs/connector.js";
import config from "../config.js";

connector.add("Header");

function getTemplateAlias() {
  if (config.node == 'dev') {
    return window.location.pathname.split("/").pop().slice(0, -5) || 'index';
  }
  let f = URL.parse(window.location).pathname.split('/');
  if (f[1].indexOf('.html') !== -1) {
    return f[1].slice(0, -5);
  }
  return f[1] || 'index';
}

// если шаблон не найден, пытается получить данные основной страницы
await Promise.resolve()
  .then(_ => {
    if (document.title) throw 1;
  })
  .then(_ => fetch(`${serviceHost("mcontent")}/api/mcontent/template/public/${getTemplateAlias()}`))
  .then(async response => {
    if (response.ok) {
      const res = await response.json();
      return res;
    }
    return fetch(`${serviceHost("mcontent")}/api/mcontent/template/public/index`)
  })
  .then(async response => {
    if(!(response instanceof Response)) { // это не fetch
      return response;
    }

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
  .catch(error => {
    if (error instanceof Error) console.log(error.message);
  })
  .finally(_ => connector.del("Header"));