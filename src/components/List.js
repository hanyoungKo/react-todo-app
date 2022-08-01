import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Lists from './Lists';

const List = React.memo(({todoData,setTodoData,handeClick}) => {

      const handleEnd=(result)=>{
        //console.log(`result` , result);
        
        //목적지가 없으면 (이벤트를 취소) 이 함수를 종료함
        if(!result.destination) return;

        // React 불변성을 지켜주기 위해 새로운 todoData 생성 (원본데이터 건드리지 않게함)
        const newTodoData = todoData;

        // 1. 변경시키는 아이템을 배열에서 지워줌 => return = 지워진 아이템값
        const [reorderedItem] = newTodoData.splice(result.source.index, 1);
        
       // 원하는 자리에 reorderedItem을 insert 해줌
        newTodoData.splice(result.destination.index,0,reorderedItem);
        setTodoData(newTodoData);
        localStorage.setItem("todoData",JSON.stringify(newTodoData));
        
    }
   
  return (
    
    <div>
    <DragDropContext onDragEnd={handleEnd}>
    <Droppable droppableId='todo'>
        {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
            {todoData.map((data,index)=>(
                <Draggable
                    key={data.id}
                    draggableId={data.id.toString()}
                    index={index}
                >
                    {(provided,snapshot)=>(
                   <Lists
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                      handeClick={handeClick}
                   />
                )}
                </Draggable>
            )) }
            {provided.placeholder}
            </div>
        )}      
    </Droppable>
    </DragDropContext>
    </div>
  )
});

export default List