import serviceHost from "../libs/service.host.js";
import connector from "../libs/connector.js";


connector.add("ProductCards");

function ProductCards({ levels, positions }) {
    React.useEffect(() => connector.del("ProductCards"));
    levels.map((level) => console.log(level))
    positions.map((position) => console.log(position))
    return (
        <div>
            {levels.map((level) => <div key={level.id}>
                <img src={`${serviceHost("mcontent")}/api/mcontent/static/images/catalog/${level.image.fileName}`}></img>
                <p>{level.title}</p>
            </div>)
            }
        </div>
    )
  }

  
const levelsFetch = fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/level/public`);
const positionsFetch = fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/position/public`);

Promise.all([levelsFetch, positionsFetch])
    .then(responses => Promise.all(responses.map(async res => await res.json())))
    .then(responses => {
    const root = ReactDOM.createRoot(document.getElementById("productCards"));
    root.render(<ProductCards levels={responses[0]} positions={responses[1]}/>);
    });