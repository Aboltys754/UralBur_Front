import serviceHost from "../../libs/service.host.js"

export default function Chapter({mapChapter, lev, setLev, setLevValue}) {
    return (
    <div id="idProductsChapterButton">
        {mapChapter.map((chapter, index) => 
            <button 
                key={chapter.id} 
                className="productsChapterButton" 
                onClick={() =>  _clickButton(chapter.id, index, lev, setLev, setLevValue)}>
                <p className="productsChapterButtonP">{chapter.title}</p>
                <img className="producstChapterButtonImg" src={`${serviceHost("mcontent")}/api/mcontent/static/images/catalog/${chapter.image.fileName}`}></img>                    
            </button>
        )}
    </div>)
}

function _clickButton(id, index, lev, setLev, setLevValue) {
    setLevValue(id)
    setLev(lev.toString() + index.toString())
}