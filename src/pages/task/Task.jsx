import React, { useState } from "react";
import { todoData } from "../../atom";
import { useRecoilState } from "recoil";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import style from './Task.module.css'

function Task() {
  const [updateInput, setUpdateInput] = useState("");
  const [input, setInput] = useState("");
  const [toDoList, setToDoList] = useRecoilState(todoData);
  // const [isVisibleInput, setIsVisibleInput] = useState(false)

  const handleAddTodo = () => {
    let ID = Math.floor(Math.random() * 1000000);
    if (input === "") {
      alert("Please Enter Task Name");
    } else {
      setToDoList([
        ...toDoList,
        {
          id: ID,
          text: input,
          isVisible: false,
          // completed: false,
          // deleted: false,
        },
      ]);
      setInput("");
      localStorage.setItem("todos",JSON.stringify(toDoList))
    }
  };

  
  const handleDeleteTodo = (Id) => {
    const filteredTodo = toDoList.filter((item) => item.id !== Id);
    setToDoList(filteredTodo);
    localStorage.setItem("todos",JSON.stringify(filteredTodo))
  };
  
  const handleShowInput=(Index) =>{
    const update = [...toDoList]
    const letest = toDoList.map((ele,index)=> {
      if(index===Index){
        let newObj = {...ele}
       return {...newObj, isVisible:!newObj.isVisible}
      }
      return ele
    } )
    setToDoList(letest)
    setUpdateInput("")
    localStorage.setItem("todos",JSON.stringify(letest))
    console.log(letest)
  }
  
  const handelUpdateTodo = (ID) => {
    // const updeted= [...toDoList]
    if(updateInput.length===0){
      alert("Please Enter Update Task Name");
    }else{
    const letestUpdate = toDoList.map((ele,index)=>{
      if(ID=== ele.id){
        let newEle= {...ele}
        return {...newEle, text:newEle.text = updateInput, isVisible:newEle.isVisible=false}
      }
      return ele
    }
    )
    setToDoList(letestUpdate)
    setUpdateInput("")
    localStorage.setItem("todos",JSON.stringify(letestUpdate))
  }

  };

  return (
    <div className={style.MainContainer}>
      <h1>Task</h1>
      <div>
       
        <div className={style.taskDiv}>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <button  onClick={handleAddTodo}>Add Task</button>
          <h3>Lists</h3>
        </div>
        {toDoList.map((item, index) => (
          <div className={style.MainList} key={index}>
            <p>{item.text}</p>
            
              <div style={item.isVisible ? {}: {display:"none"}}>
                <input
                  type="text"
                  value={updateInput}
                  onChange={(e) => setUpdateInput(e.target.value)}
                />
                <button onClick={()=>handelUpdateTodo(item.id)}> Updated</button>
              </div>
              <div>

            <button onClick={()=>handleShowInput(index)}>
           
              <BiEdit color="blue" />{" "}
            </button>
            
            <button onClick={() => handleDeleteTodo(item.id)}>
              <RiDeleteBin6Fill color="red" />
            </button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Task;
