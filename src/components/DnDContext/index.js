// import React, { Component } from 'react';
// import styled from 'styled-components';
// import {DndTest} from './DndTest';
// import './style.css';

// const DndWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   marfin-top: 100px;
// `;

// const Container = styled.div`
// `;

// export default class DragDropContex extends Component {
//   render(){
//     return(
//       <DndWrapper>
//         <Container>
//           <DndTest/>
//         </Container>
//       </DndWrapper>
//     );
//   }
// }


import React from 'react';
import { Drop } from './Droppable'
import { Drag } from './Draggable'
import './style.css'

export function DragDropContext() {
  return(
    <div className='dndCon'>
      <main className='flexbox'>
        <Drop id='drop-1' className='drop'>
          <Drag id='drag-1' className='drag' draggable='true'>
            <p>Drag one</p>
          </Drag>
        </Drop>
        <Drop id='drop-2' className='drop'>
          <Drag id='drag-2' className='drag' draggable='true'>
            <p>Drag two</p>
          </Drag>
        </Drop>
      </main>
    </div>
  )
}