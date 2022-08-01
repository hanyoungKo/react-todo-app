import React,{useState,useCallback} from "react";
import List from "./components/List";
import Form from "./components/Form";
import "./App.css";

export default function App(){
  const initialTodata = localStorage.getItem("todoData") 
      ? JSON.parse(localStorage.getItem("todoData"))
      : [];
  const [todoData,setTodoData] = useState(initialTodata);
  const [value,setValue]=useState("");

  const handeSumbit=(e)=>{
    e.preventDefault();
    let newTodo={
      id: Date.now(),
      title:value,
      completed: false,
    }
    setTodoData ([...todoData, newTodo]);
    localStorage.setItem("todoData",JSON.stringify([...todoData,newTodo]));
  }

  const handeClick = useCallback((id) => {
    let newTodoData = todoData.filter(data => (data.id !== id))
    setTodoData(newTodoData);
    localStorage.setItem("todoData",JSON.stringify(newTodoData));
},[todoData]);

  const handleRemoveClick = ()=>{
    setTodoData([]);
    localStorage.setItem("todoData",JSON.stringify(todoData));
    
  }
  

    return (
      <div className="flex items-center justify-center w-screen h-screen bg-blue-200">
        <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg ">
          <div className="flex justify-between mb-3">
            <h1>할일목록</h1> 
            <button onClick={handleRemoveClick}>Delete All 🗑</button>
            </div>
       <List handeClick={handeClick} todoData={todoData} setTodoData= {setTodoData}></List>
       <Form  handeSumbit={handeSumbit} value ={value} setValue ={setValue}/>
        </div>

      </div>
      
    )
  
  }
