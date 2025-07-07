import Converter from "../../libs/converter.js";
import serviceHost from "../../libs/service.host.js";
import connector from "../../libs/connector.js";
import config from "../../config.js";

import PositionImage from "../Image/PositionImage.js";

import ViewPDF from "./ViewPDF.js";

connector.add("Position");

const converter = new Converter();

function Position({ position }) {
  React.useEffect(() => connector.del("Position"));

  return <div className="container element-animate">

    <div className="row justify-content-center" style={{ marginTop: -50 }}>
      <div className="col-md-8 mb-5">
        <h2 style={{ textAlign: "center" }}>&ldquo;{position.title}&rdquo;</h2>
      </div>
    </div>

    <div className="row">
      <div className="col-12 row justify-content-center" style={{ marginTop: 0 }}>
        <p><PositionImage fileName={position.files.image.fileName} title={position.title} /></p>
      </div>
    </div>

    <div className="row justify-content-center">
      {position.description ? <div className="col-md-8"
        dangerouslySetInnerHTML={{ __html: converter.markdownToHTML(position.description) }}
      ></div> : <></>}
    </div>

  <div id="pdfPreview"
    data-filename={position.files.pdf.fileName}
    data-title={position.title}
  >
    <ViewPDF fileName={position.files.pdf.fileName} title={position.title} />
  </div>
  </div>
}

function getAlias() {
  if (config.node == 'dev') {
    return URL.parse(window.location).searchParams.get('alias');
  }
  let f = URL.parse(window.location).pathname.split('/');
  return f[f.length - 1].slice(0, -5);
}

// Puppeteer не может рендерить pdf, у него возникают проблемы с путями к воркеру (pdf.worker)
// это не является проблемой для кода, который он рендерит для поисковиков, 
// но чтобы в браузере клиента pdf правильно рендерился его надо перерисовать. 
// Для этого компонента ViewPDF обёрнута в div, который получает данные в dataSet,
// при отрисовке в браузере клиента эти данные подхватываются от туда и передаются
// в качестве пропсов для ViewPDF
// в режиме разработки первый .then просто не выполнится, поэтому код работает одинаково везде
Promise.resolve()
  .then(_ => {
    if (document.getElementById("position").innerHTML) {
      const divPDF = document.getElementById('pdfPreview');
      divPDF.innerHTML = '';

      const root = ReactDOM.createRoot(document.getElementById("pdfPreview"));
      root.render(<ViewPDF fileName={divPDF.dataset.filename} title={divPDF.dataset.title} />);
      connector.del("Position");
      throw 1;
    }
  })
  .then(_ => fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/position/public/?alias=${getAlias()}`))
  .then(async response => {
    if (response.status == 404) {
      window.location.href = '404.html';
      return;
    }
    const res = await response.json();
    return res;
  })
  .then(res => {
    document.title = `${res.level.title} ${res.title}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', `${res.level.title} ${res.title} от компании УралБурПроект`);
    return res;
  })
  .then(res => {
    const root = ReactDOM.createRoot(document.getElementById("position"));
    root.render(<Position position={res} />);
  })
  .catch(error => {
    if (error instanceof Error) console.log(error.message);
  });