import serviceHost from "../libs/service.host.js";
import connector from "../libs/connector.js";

connector.add("Notes");

function Notes({ notes }) {
  React.useEffect(() => connector.del("Notes"))

  return notes.map((e, i) => <div key={e.id} className="half d-lg-flex d-block">
    <div className={`image element-animate`+(i % 2  ? " order-2" : "")}
      data-animate-effect="fadeIn"
      style={{ "backgroundImage": `url('${serviceHost("mcontent")}/api/mcontent/static/images/note/${e.image.fileName}')` }}></div>
    <div className="text text-center element-animate">
      <h3 className="mb-4">{e.title}</h3>
      <p className="mb-5">{e.message}</p>
      {/* <p><a href="#" className="btn btn-primary btn-sm px-3 py-2">Learn More</a></p> */}
    </div>
  </div>)
}

fetch(`${serviceHost("mcontent")}/api/mcontent/note/public/?isPublic=1&limit=2`)
  .then(async response => {
    const res = await response.json();
    return res;
  })
  .then(res => {
    const root = ReactDOM.createRoot(document.getElementById("notes"));
    root.render(<Notes notes={res} />);
  })
