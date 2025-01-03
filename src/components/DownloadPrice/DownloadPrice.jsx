import serviceHost from "../libs/service.host.js";
import connector from "../libs/connector.js";

connector.add("DownloadPrice");

function DownloadPrice({ price }) {
  React.useEffect(() => connector.del("DownloadPrice"));
  
  return <div className="container">
    <div className="row align-items-center" >
      <div className="col-lg-8">
        <h2 className="text-white mb-0">Хотите работать с нами?</h2>
        <p className="text-white lead">Скачайте каталог для ознакомления со всеми товарами</p>
      </div>
      <div className="col-lg-4 text-lg-right">
        <a href={`${serviceHost("mcontent")}/api/mcontent/static/price/${price.fileName}`} className="btn btn-outline-white px-4 py-3">Скачать каталог</a>
      </div>
    </div>
  </div>
}

fetch(`${serviceHost("mcontent")}/api/mcontent/price/public`)
  .then(async response => {
    const res = await response.json();
    return res;
  })
  .then(res => {
    const root = ReactDOM.createRoot(document.getElementById("downloadPrice"));
    root.render(<DownloadPrice price={res} />);
  })
