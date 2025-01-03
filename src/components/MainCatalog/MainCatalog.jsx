import serviceHost from "../libs/service.host.js";
import connector from "../libs/connector.js";

connector.add("MainCatalog");

function MainCatalog({ positions }) {
  React.useEffect(() => connector.del("MainCatalog"));

  return <>
    <div className="container">
      <div className="row justify-content-center mb-5 element-animate">
        <div className="col-md-8 text-center">
          <h2 className=" heading mb-4">Продукция</h2>
          <p className="mb-5 lead">Мы поставляем качественную и востребованную всеми компаниями продукцию</p>
        </div>
      </div>
    </div>

    <div className="container-fluid">
      <div className="row no-gutters">

        {positions.map((e) => <div key={e.id} className="col-md-4 element-animate">
          <a href="#" className="link-thumbnail">
            <h3>{e.title}</h3>
            <span className="ion-plus icon"></span>
            <img src={`${serviceHost("mcontent")}/api/mcontent/static/images/catalog/${e.image.fileName}`} alt="Free template by Free-Template.co" className="img-fluid" />
          </a>
        </div>)}

      </div>
    </div>
  </>
}

fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/position/public/?isPublic=1&limit=6`)
  .then(async response => {
    const res = await response.json();
    return res;
  })
  .then(res => {
    const root = ReactDOM.createRoot(document.getElementById("mainCatalog"));
    root.render(<MainCatalog positions={res} />);
  })