


export default function InfoPath({infoPath, setInfoPath}) {

    // console.log(lev)

    return (
        <div>
            {
                infoPath.map((value, index) => 
                    <button key={index} onClick={() => _clickBack(index, infoPath, setInfoPath)}>{value[1]}</button>
                )
            }
        </div>
    )
}


function _clickBack(index, infoPath, setInfoPath) {

    const tempArr = infoPath.slice(0, index + 1)
    setInfoPath(tempArr)
}
