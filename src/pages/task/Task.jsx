import React, { useState } from "react";
import { todoData } from "../../atom";
import { useRecoilState } from "recoil";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";

function Task() {
  const [updateInput, setUpdateInput] = useState("");
  const [input, setInput] = useState("");
  const [toDoList, setToDoList] = useRecoilState(todoData);
  const [isVisibleInput, setIsVisibleInput] = useState(false)
  // const [count,setCount] = useState(0)

  const handleAddTodo = () => {
    // setCount(count+1)
    let ID = Math.floor(Math.random() * 1000000);
    // const todos = [
    //   {
    //     id: ID,
    //     todo: input,
    //     completed: false,
    //   },
    // ];
    if (input === "") {
      alert("Please Enter Task Name");
    } else {
      setToDoList([
        ...toDoList,
        {
          id: ID,
          text: input,
          isVisible: false,
          completed: false,
          deleted: false,
        },
      ]);
      setInput("");
      console.log(ID);
      console.log(toDoList);
    }
  };

  const handelUpdateTodo = () => {};

  const handleDeleteTodo = (Id) => {
    const filteredTodo = toDoList.filter((item) => item.id !== Id);
    setToDoList(filteredTodo);
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
  console.log(letest)
  }

  return (
    <div>
      <h1>Task</h1>
      <div>
        <h2>ToDo</h2>
        <div>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={handleAddTodo}>Add Task</button>
          <hr />
          <h1>Lists</h1>
        </div>
        {toDoList.map((item, index) => (
          <div key={index}>
            <p>{item.text}</p>
            
              {/* <div style={item.isVisible ? {}: {display:"none"}}> */}
              <div style={item.isVisible ? {}: {display:"none"}}>
                <input
                  type="text"
                  value={updateInput}
                  onChange={(e) => setUpdateInput(e.target.value)}
                />
                <button onClick={handelUpdateTodo}> Updated</button>
              </div>
            <button onClick={()=>handleShowInput(index)}>
           
              <BiEdit />{" "}
            </button>
            
            <button onClick={() => handleDeleteTodo(item.id)}>
              <RiDeleteBin6Fill />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Task;
