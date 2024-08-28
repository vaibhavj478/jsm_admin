import React, { useEffect, useState } from 'react'



const useIncDec = ( initVal ) => {
    const [value, setValue] = useState(initVal );
    const incByOne = () => setValue((prve) => Number(prve) + 1);
    const decByOne = () => setValue((prve) => Number(prve) - 1);
    const setDirVal = (val) => setValue(val);
    return [value, incByOne, decByOne, setDirVal]
}

export default useIncDec