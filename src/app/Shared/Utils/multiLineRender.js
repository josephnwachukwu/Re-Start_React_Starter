import React from 'react'

export default function MultiLineRender (text = '') {
  return (
    <div>
      {
        text.split('\n').map((line, index) => {
          return <div key={index} className={`line_${index}`}>{line}</div>
        })
      }
    </div>
  )
}
