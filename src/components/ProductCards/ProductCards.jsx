import serviceHost from "../libs/service.host.js";
import connector from "../libs/connector.js";
import Chapter from './Chapter/Chapter.js';


connector.add("ProductCards");
const objectAllChapter = {};

function ProductCards({ sections, positions }) {
    React.useEffect(() => connector.del("ProductCards"));
    const [lev, setLev] = React.useState('0');
    const [levValue, setLevValue] = React.useState(undefined);    
    
    sections.map((sec, index) => _parseLevels(sec, '0' + index));
    const mapChapter = _createArreyListChapter(lev, objectAllChapter)

    const mapPositions = _createArreyListPositions(levValue, positions)

    return (
        <>  
        {/* <button onClick={() => setLev(lev + '0')}>+</button>
        <button>-</button> */}
        <div>
            <Chapter  mapChapter={mapChapter} lev={lev} setLev={setLev} setLevValue={setLevValue}/>
        </div>
            
        </>
    )};


function _parseLevels(firstValue, firstKey) {
    if ((firstValue.childs).length === 0) {
        objectAllChapter[firstKey] = firstValue;
    } else {
        objectAllChapter[firstKey] = firstValue;
        (firstValue.childs).map((nextValue, nextKey) => _parseLevels(nextValue, firstKey.toString() + nextKey.toString()))}
    };

function _createArreyListChapter(lev, maps) {
    const temp_maps = []
    for (let key in maps) {
        if (key.slice(0, -1) === lev) {
            temp_maps.push(maps[key]);
        }};
    return temp_maps
}

function _createArreyListPositions(levValue, positions) {
    const temp_maps = []
    for (let key in positions) {
        if (positions[key].level.id === levValue) {
            temp_maps.push(positions[key]);
        }
    };
    return temp_maps
}
 
const levelsFetch = fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/level/public`);
const positionsFetch = fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/position/public`);

Promise.all([levelsFetch, positionsFetch])
    .then(responses => Promise.all(responses.map(async res => await res.json())))
    .then(responses => {
    const root = ReactDOM.createRoot(document.getElementById("productCards"));
    root.render(<ProductCards sections={responses[0]} positions={responses[1]}/>);
    });

