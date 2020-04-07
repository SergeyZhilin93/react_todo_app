import React from 'react'
import { useDrag } from 'react-dnd';


export const ItemTypes = {
  KNIGHT: 'knight',
}


export function Drag({position: {x, y}}) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.KNIGHT, x: 50, y: 100 },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  
  return(
    <div 
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
        position: 'absolute',
        left: x,
        top: y,
        zIndex: 1
      }}
      >TesrDrag</div>
  )
}