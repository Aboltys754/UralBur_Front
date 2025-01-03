import serviceHost from "../libs/service.host.js";
import connector from "../libs/connector.js";

connector.add("Solution");

function Solution({ solutions }) {
  React.useEffect(() => connector.del("Solution"));

  return <div className="container">
    <div className="row mb-5">
      <div className="col-12 text-center">
        <h2>Мы можем решить любую проблему</h2>
      </div>
    </div>

    <div className="row align-items-stretch">

      {/* центральная картинка */}
      <div className="col-lg-4 order-lg-2">
        <div className="scaling-image h-100">
          <div className="frame h-100">
            <div className="feature-img-bg h-100" style={{"backgroundImage": "url('images/industrial_feature_1.jpg')"}}></div>
          </div>
        </div>
      </div>

      {/* левый блок из 2-х элементов */}
      <div className="col-md-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-1">
        <Items items={solutions.slice(0, 2)} />
      </div>
      {/* парвый блок из 2-х элементов */}
      <div className="col-md-6 col-lg-4 feature-1-wrap d-md-flex flex-md-column order-lg-3">
        <Items items={solutions.slice(2)} />
      </div>
    </div>
  </div>
}

function Items({ items }) {
  return items.map((e) => <div key={e.id} className="feature-1 d-md-flex">
    <div className="align-self-center">
      <span className={`ion ${e.cssClass} display-4 text-primary`}></span>
      <h3>{e.title}</h3>
      <p>{e.message}</p>
    </div>
  </div>)
}

fetch(`${serviceHost("mcontent")}/api/mcontent/solution/public/?isPublic=1&limit=4`)
  .then(async response => {
    const res = await response.json();
    return res;
  })
  .then(res => {
    const root = ReactDOM.createRoot(document.getElementById("solution"));
    root.render(<Solution solutions={res} />);
  })
