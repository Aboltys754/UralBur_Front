import serviceHost from "../libs/service.host.js";
import connector from "../libs/connector.js";


connector.add("ProductCards");

function ProductCards({ levels }) {
    React.useEffect(() => connector.del("ProductCards"));
    return (
        <div>
            "Привет мир"
        </div>
    )
  }


  
fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/level/public`)
    .then(async response => {
        const res = await response.json();
        return res;
    })
    .then(res => {
        const root = ReactDOM.createRoot(document.getElementById("productCards"));
        root.render(<ProductCards levels={res} />);
    })