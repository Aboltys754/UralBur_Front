import serviceHost from "../libs/service.host.js";
import connector from "../libs/connector.js";
import Chapter from './Chapter/Chapter.js';


connector.add("ProductCards");
const objectAllChapter = {};

function ProductCards({ levels }) {
    React.useEffect(() => connector.del("ProductCards"));
    const [lev, setLev] = React.useState('0');
    const [levValue, setLevValue] = React.useState([]);    
    
    levels.map((lev, index) => _parseLevels(lev, '0' + index));
    const mapppp = _createArreyList(lev, objectAllChapter)
    return (
        <>  
        {/* <button onClick={() => setLev(lev + '0')}>+</button>
        <button>-</button> */}
            {mapppp.map((level) =>                 
                <button key={level.id} className="producstCardsButton">
                    <p className="producstCardsButtonP">{level.title}</p>
                    <img className="producstCardsButtonImg" src={`${serviceHost("mcontent")}/api/mcontent/static/images/catalog/${level.image.fileName}`}></img>                    
                </button>)}
        </>
    )};


function _parseLevels(firstValue, firstKey) {
    if ((firstValue.childs).length === 0) {
        objectAllChapter[firstKey] = firstValue;
    } else {
        objectAllChapter[firstKey] = firstValue;
        (firstValue.childs).map((nextValue, nextKey) => _parseLevels(nextValue, firstKey.toString() + nextKey.toString()))}
    };
function _createArreyList(lev, maps) {
    const temp_maps = []
    for (let key in maps) {
        if (key.slice(0, -1) === lev) {
            temp_maps.push(maps[key]);
        }};
    return temp_maps
}
 
const levelsFetch = fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/level/public`);
const positionsFetch = fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/position/public`);

Promise.all([levelsFetch, positionsFetch])
    .then(responses => Promise.all(responses.map(async res => await res.json())))
    .then(responses => {
    const root = ReactDOM.createRoot(document.getElementById("productCards"));
    root.render(<ProductCards levels={responses[0]} />);
    });

