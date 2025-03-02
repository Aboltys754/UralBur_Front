import serviceHost from "../../libs/service.host.js"
import pdfFree from "../../../pdf/free.pdf"

export default function Cards({positions, infoPath}) {
    const mapCards = _mapCards(positions, infoPath)

    if (mapCards !== undefined && mapCards.length > 0) {
        return (
            <div id="idProductsCardsButton">
                <p>{mapCards[0].level.title}</p>
                <hr />
                {mapCards.map((position) =>  
                    <button key={position.id} className="productsCardsButton" >
                        <div className="productsCardsButtonDivInfo">
                            <p>{`${position.title}`}</p>
                            <p>{`${position.description}`}</p>
                        </div>
                        <div className="productsCardsButtonDivImg">
                            <img src={`${serviceHost("mcontent")}/api/mcontent/static/images/catalog/${position.image.fileName}`} alt={`${position.title}`} />
                        </div>
                    </button>)
                }
            </div>
        )
    }
    
}

function _mapCards(positions, infoPath) {
    const tempArr = []
    for (let i = 0; i < positions.length; i++) {
        if (infoPath.at(-1)[0] === positions[i]['level']['id']) {
            tempArr.push(positions[i])
        }
    }
    return tempArr
}