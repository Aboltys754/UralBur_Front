import serviceHost from "../../libs/service.host.js"

export default function Cards({mapPositions}) {
    console.log(mapPositions)
    if (mapPositions.length > 0) {        
        return (
            <div id="idProductsCardsButton">
                <p>{mapPositions[0].level.title}</p>
                <hr />
                {mapPositions.map((position) =>  
                    // <a key={position.id} href={`position/${position.alias}`} className="productsCardsButton">
                    <a key={position.id} href={`best_test.html`} className="productsCardsButton">
                        <div className="productsCardsButtonDivInfo">
                            <p>{`${position.title}`}</p>
                            <p>{`${position.description}`}</p>
                        </div>
                        <div className="productsCardsButtonDivImg">
                            <img src={`${serviceHost("mcontent")}/api/mcontent/static/images/catalog/${position.image.fileName}`} alt={`${position.title}`} />
                        </div>
                    </a>)
                }
            </div>)
    } else {
        return (
            <div>Пока пусто</div>)
    }
    
}