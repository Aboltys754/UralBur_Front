import serviceHost from "../libs/service.host.js";
import connector from "../libs/connector.js";



connector.add("Card");
const alias = window.location.pathname.split("/").pop().slice(0, -5) || 'index';

function Card({ info_cards }) {
    React.useEffect(() => connector.del("Card"));
    console.log(alias)
    console.log(info_cards)
    const card = info_cards.find(info_card => info_card.alias === alias)
    return (
        <div>
            <div>
              <p>{card.title}</p>
              <p>{card.description}</p>
            </div>
            <div>
              <img src={`${serviceHost("mcontent")}/api/mcontent/static/images/catalog/${card.image.fileName}`} alt={`${card.title}`} />
            </div>
        </div>
    )
  }




fetch(`${serviceHost("mcontent")}/api/mcontent/catalog/position/public`)
  .then(async response => {
    const res = await response.json();
    return res;
  })
  .then(res => {
    const root = ReactDOM.createRoot(document.getElementById("card"));
    root.render(<Card info_cards={res} />);
  })