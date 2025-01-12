import serviceHost from "../../libs/service.host.js"

export default function Card({mapPositions}) {
    console.log(mapPositions)
    if (mapPositions.length > 0) {        
        return (
            <div id="idProductsCardsButton">
                <p>{mapPositions[0].level.title}</p>
                <hr />
                {mapPositions.map((position) =>  
                    <button key={position.id} onClick={() => console.log(position)} className="productsCardsButton">
                        <div className="productsCardsButtonDivInfo">
                            <p>{`${position.title}`}</p>
                            <p>{`${position.description}`}</p>
                        </div>
                        <div className="productsCardsButtonDivImg">
                            <img src={`${serviceHost("mcontent")}/api/mcontent/static/images/catalog/${position.image.fileName}`} alt={`${position.title}`} />
                        </div>
                    </button>)
                }
            </div>)
    } else {
        return (
            <div>Пока пусто</div>)
    }
    
}