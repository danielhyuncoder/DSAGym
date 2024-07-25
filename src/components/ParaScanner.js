import React from 'react'

const ParaScanner = ({color, txt, bold, indentation}) => {
    const c = txt.split('\n');
  return (
    <>
       {c.map(x=>{
          if (bold){
            return (
                <b style={{color: color, margin:0}}>{x}</b>
              )
          } else {
            return (
                <p style={{color: color,  margin:0}}>{x}</p>
              )
          }
       })}
    </>
  )
}

export default ParaScanner