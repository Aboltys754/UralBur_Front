import serviceHost from "../libs/service.host.js";
import connector from "../libs/connector.js";
import Chapter from './Chapter/Chapter.js';
import Cards from './Cards/Cards.js';
import InfoPath from "./InfoPath/InfoPath.js";


connector.add("ProductCards");
const objectAllChapter = {};

function ProductCards({ sections, positions }) {
    React.useEffect(() => connector.del("ProductCards"));
    const [infoPath, setInfoPath] = React.useState([['0', 'Главная']]); //то что отрисовывается в InfoPath

    return (
        <div>
            <InfoPath infoPath={infoPath} setInfoPath={setInfoPath}/>
            <Chapter sections={sections} infoPath={infoPath} setInfoPath={setInfoPath}/>
            <Cards positions={positions} infoPath={infoPath}/>
        </div>
    )
}

const levelsFetch = fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/level/public`);
const positionsFetch = fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/position/public`);

Promise.all([levelsFetch, positionsFetch])
    .then(responses => Promise.all(responses.map(async res => await res.json())))
    .then(responses => {
    const root = ReactDOM.createRoot(document.getElementById("productCards"));
    root.render(
        <ProductCards sections={responses[0]} positions={responses[1]}/>               
                );
    });
