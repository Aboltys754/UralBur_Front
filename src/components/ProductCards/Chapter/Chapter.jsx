import serviceHost from "../../libs/service.host.js"

export default function Chapter({sections, infoPath, setInfoPath}) {
    const mapChapter = _mapChapter(sections, infoPath)
    if (mapChapter !== undefined && mapChapter.length > 0) {
        return (
            <div id="idProductsChapterButton">
                {mapChapter.map((chapter, index) => 
                    <button 
                        key={chapter.id} 
                        className="productsChapterButton" 
                        onClick={() =>  _clickButton(chapter.id, chapter.title, infoPath, setInfoPath)}>
                        <p className="productsChapterButtonP">{chapter.title}</p>
                        <img className="producstChapterButtonImg" src={`${serviceHost("mcontent")}/api/mcontent/static/images/catalog/${chapter.image.fileName}`}></img>                    
                    </button>
                )}
            </div>)
    } else {
        return <div hidden id="idProductsChapterButton"> </div>
    }
    
}


function _mapChapter(sections, infoPath) {
    if (infoPath.at(-1)[0] === '0') {
        return sections
    } else {
        return _searchId(sections, infoPath)
    }
}

function _searchId(sections, infoPath) {
    for (let i = 0; i < sections.length; i++) {
        if (sections[i]['id'] === infoPath.at(-1)[0]) {
            return sections[i]['childs']
        } else if (sections[i]['childs'] !== undefined || sections[i]['childs'].length !== 0) {
            _searchId(sections[i]['childs'], infoPath)
        }
    }
}

function _clickButton(id, title, infoPath, setInfoPath) {
    const tempArr = infoPath.slice()
    tempArr.push([id, title])
    setInfoPath(tempArr)
}