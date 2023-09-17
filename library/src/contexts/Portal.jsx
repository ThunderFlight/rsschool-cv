import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export const Portal = ({children, htmlLink='nav'}) =>{
    const [container] = useState(()=>document.createElement('div'))
    useEffect(()=>{    
        document.body.querySelector(htmlLink).appendChild(container)

        return ()=>{
          document.body.querySelector(htmlLink).removeChild(container)
       }
    },[])

    return createPortal(children, container)
}