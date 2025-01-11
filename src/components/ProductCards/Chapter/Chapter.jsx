import serviceHost from "../../libs/service.host.js"

export default function Chapter({mapChapter, lev, setLev, setLevValue}) {
    return (
    <div>
        {mapChapter.map((chapter, index) => 
            <button key={chapter.id} className="producstCardsButton" onClick={() => _clickButton(chapter.id, index, lev, setLev, setLevValue)}>
                <p className="producstCardsButtonP">{chapter.title}</p>
                <img className="producstCardsButtonImg" src={`${serviceHost("mcontent")}/api/mcontent/static/images/catalog/${chapter.image.fileName}`}></img>                    
            </button>
        )}
    </div>)
}

function _clickButton(id, index, lev, setLev, setLevValue) {
    setLevValue(id)
    setLev(lev.toString() + index.toString())
}