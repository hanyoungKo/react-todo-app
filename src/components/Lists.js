import React, { useState } from 'react'

const Lists = React.memo(({ id, title, completed, todoData, setTodoData, provided, snapshot, handeClick }) => {

    // state
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

    // function
    
    const handeChangeCheckbox= (id)=>{
        let newTodo = todoData.map(data=>{
          if(data.id === id)
              data.completed = !data.completed;
          return data;
      })
        setTodoData(newTodo);
        localStorage.setItem("todoData",JSON.stringify(newTodo));
      }

    const changeTitle = (e)=>{
        setEditedTitle(e.target.value);
    }

    const handleSumbit = (e)=>{
        e.preventDefault();
        let newTodoData = [];
        if(window.confirm("정말 수정하시겠습니까?")){
            newTodoData = todoData.map(data => {
                if(data.id === id){
                    data.title = editedTitle;
                }
                return data;
            })
           
        }else{
            newTodoData = todoData.map(data => {
                if(data.id === id){
                    setEditedTitle(data.title);
                }
                 return data;
            });
        
            
        }
        setTodoData(newTodoData);
        localStorage.setItem("todoData",JSON.stringify(newTodoData));
        setIsEditing(false);
       
    }

    if(isEditing){
        return(
        <div 
                className={`bg-gray-100 flex items-center justify-between w-full px-4 py-1 my-2 text-gray-500 border rounded`}
        >  
            <form onSubmit={handleSumbit}>
            <div className='items-center'>
                <input 
                    type="text" value={editedTitle} 
                    className="w-full px-3 py-2 mr-4 text-gray-500 rounded"    
                    onChange={changeTitle}
                />
            </div>
            </form>
            <div className='items-center'>
                <button className='px-4 py-2 float-right' onClick={() => setIsEditing(false)}>취소</button>
                <button type='submit' className='px-4 py-2 float-right' onClick={handleSumbit}>저장하기</button>
            </div>
        </div>
        )
    }else{
        return (
            <div className={`${snapshot.isDragging ? "bg-gray-400" : 'bg-gray-100'} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-500 border rounded`}
                key={id}
                {...provided.draggableProps}
                ref={provided.innerRef}
                {...provided.dragHandleProps}>
    
                <label className='items-center'>
                    <input type="checkbox" defaultChecked={completed} onChange={() => handeChangeCheckbox(id)} />
                    <div className={`${completed ? "line-through" : undefined} inline-block ml-2`}>{title}</div>
                </label>
                <div className='items-center'>
                    <button className='px-4 py-2 float-right' onClick={() => handeClick(id)}>🗑</button>
                    <button className='px-4 py-2 float-right' onClick={() => setIsEditing(true)}>수정하기</button>
                </div>
            </div>
        )
    }

})

export default Lists