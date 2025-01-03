import serviceHost from "../libs/service.host.js";
import connector from "../libs/connector.js";

connector.add("HeadBanner");

function HeadBanner({ template }) {
  React.useEffect(() => connector.del("HeadBanner"));

  // return <div className="slider-item" style={{"backgroundImage": `url('${serviceHost("mcontent")}/api/mcontent/static/images/slider/${e.image.fileName}')`}}>
  return <div className="slider-item" style={{"backgroundImage": `url(images/industrial_hero_3.jpg)`}}>
    <div className="container">
      <div className="row slider-text align-items-center justify-content-center">
        <div className="col-md-8 text-center col-sm-12 element-animate pt-5">
          <h1 className="pt-5"><span>{template.title}</span></h1>
          <p className="mb-5 w-75">{template.description}</p>
        </div>
      </div>
    </div>

  </div>
}

const alias = window.location.pathname.split("/").pop().slice(0, -5) || 'index';

fetch(`${serviceHost("mcontent")}/api/mcontent/template/public/${alias}`)
  .then(async response => {
    const res = await response.json();
    return res;
  })
  .then(res => {
    const root = ReactDOM.createRoot(document.getElementById("headBanner"));
    root.render(<HeadBanner template={res} />);
  })
