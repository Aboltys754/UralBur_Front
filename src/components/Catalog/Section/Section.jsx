import Converter from "../../libs/converter.js";
import serviceHost from "../../libs/service.host.js";
import connector from "../../libs/connector.js";
import config from "../../config.js";

import PositionImage from "../Image/PositionImage.js";
import LevelImage from "../Image/LevelImage.js";
import InfoPath from "../InfoPath/InfoPath.js";

connector.add("Section");

const converter = new Converter();

function Section({ levels, levelsAll, positions, alias }) {

  React.useEffect(() => connector.del("Section"));

  return <div className="container">

    <InfoPath alias={alias} levelsAll={levelsAll} />

    <div className="container-fluid mb-5">
      <div className="row no-gutters">
        {levels.childs.map((e) => <div key={e.id} className="col-md-4 element-animate">
          <a href={getUrlSection(e.alias)} className="link-thumbnail">
            <h3>{e.title}</h3>
            <span className="ion-plus icon"></span>
            <LevelImage fileName={e.image.fileName} title={e.title} />
          </a>
        </div>)}
      </div>
    </div>

    <div className="row">
      <div className="col-md-10">
        {positions.map((e) => <div key={e.id} className="media mb-4 d-md-flex d-block element-animate">
          <a href={getUrlProduct(e.level.alias, e.alias)} className="mr-5"><PositionImage fileName={e.files.image.fileName} title={e.title} /></a>
          <div className="media-body">

            <h3 className="mt-2 text-black"><a href={getUrlProduct(e.level.alias, e.alias)}>{e.title}</a></h3>

            {e.description ? <div className="col-md-8"
              dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(_cut(e.description, 250)) }}
            ></div> : <></>}
            <p><a href={getUrlProduct(e.level.alias, e.alias)} className="readmore">Подробнее <span className="ion-android-arrow-dropright-circle"></span></a></p>
          </div>
        </div>)}
      </div>
    </div>

  </div>
}

function _cut(text, limit) {
  return (limit && text.length > limit) ? text.substring(0, text.indexOf(".", limit) + 1) : text;
}

function getUrlSection(alias) {
  if (config.node == 'dev') {
    return `section.html?levelAlias=${alias}`
  }
  return `section/${getLevelAlias()}/${alias}.html`
}

function getUrlProduct(levelAlias, alias) {
  if (config.node == 'dev') {
    return `product-single.html?levelAlias=${levelAlias}&alias=${alias}`
  }
  return `product-single/${levelAlias}/${alias}.html`
}

function getLevelAlias() {
  if (config.node == 'dev') {
    return URL.parse(window.location).searchParams.get('levelAlias');
  }
  let f = URL.parse(window.location).pathname.split('/');
  return f[f.length - 1].slice(0, -5);
}

const alias = getLevelAlias();
const levelsFetchAll = _ => fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/level/public`);
const levelsFetch = _ => fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/level/public/${getLevelAlias()}`);
const positionsFetch = _ => fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/position/public/?levelAlias=${getLevelAlias()}`);


Promise.resolve()
  .then(_ => {
    if (document.getElementById("sectionPosition").innerHTML) {
      connector.del("Section");
      throw 1;
    }
  })
  .then(async _ => await Promise.all([levelsFetch(), levelsFetchAll(), positionsFetch()]))
  .then(res => Promise.all(res.map(r => r.json())))
  .then(([levelsFetch, levelsFetchAll, positionsFetch]) => {
    if (!positionsFetch?.length && !levelsFetch?.childs?.length) {
      window.location.href = '404.html';
      throw 1;
    }

    return [levelsFetch, levelsFetchAll, positionsFetch];
  })
  .then(responses => {
    const root = ReactDOM.createRoot(document.getElementById("sectionPosition"));
    root.render(<Section levels={responses[0]} levelsAll={responses[1]} positions={responses[2]} alias={alias} />);
  })
  .catch(error => {
    if (error instanceof Error) console.log(error.message);
  });

// fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/position/public/?levelAlias=${getLevelAlias()}`)
//   .then(async response => {
//     const res = await response.json();

//     // в случае если создан раздел, но в нём нет позиций, сервер вернёт код 200 и пустой массив
//     // эта ситуация обрабатывается как ошибка 404
//     if(!res.length) {
//       window.location.href = '404.html';
//       return;
//     }

//     return res;
//   })
//   .then(res => {
//     const root = ReactDOM.createRoot(document.getElementById("sectionPosition"));
//     root.render(<Section positions={res} />);
//   })