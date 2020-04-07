import React, { Fragment } from 'react'
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../Drag'

export function Drop({ onDrag, children }) {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.KNIGHT,
    drop: (_, monitor,) => onDrag(monitor.getClientOffset()),
    collect: mon => ({
      isOver: !!mon.isOver(),
    }),
  })

  return(
    <div
      ref={drop}
      style={{
        position: 'relative',
        width: '500px',
        height: '500px',
        backgroundColor: isOver ? 'green' : 'yellow' 
      }}
    >
    {
      isOver && (
        <Fragment>
          <p>брось</p>
        </Fragment>
        )
      }
      { children }
      </div>
  )
}