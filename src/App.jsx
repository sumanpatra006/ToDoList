import { useEffect, useState } from 'react'
import './App.css'
import { IoMdAdd } from "react-icons/io";
import { MdDelete, MdOutlineDone } from "react-icons/md";

function App() {

  const [Todo, setTodo] = useState([])
  const [Heading, setHeading] = useState("")
  const [Description, setDescription] = useState("")
  const [complete , setComplete] = useState("")

  
  
  const addTask = () => {    
    let newTodo = {
      head: Heading,
      detail: Description
    }
    if(Heading == "" && Description == ""){
      alert("Enter your task")
    }else{
      let copyTodos = [...Todo];
    copyTodos.push(newTodo);
    setTodo(copyTodos);

    localStorage.setItem('list',JSON.stringify(copyTodos))
    }    
  };

  useEffect(()=>{
    let stored = JSON.parse(localStorage.getItem('list'))
    if(stored){
      setTodo(stored)
    }
  },[])

  const deleteTodo = (index)=>{
    let prev = [...Todo] ;
    prev.splice(index , 1);
    localStorage.setItem('list', JSON.stringify(prev));
    setTodo(prev);
  }

  // const completed= (index)=>{
  //   // console.log(...Todo[index])
  //   document.getElementById(index).classList.toggle('completed');
  //   document.getElementById(index+1).classList.add('alternate');
  //   // setComplete(completed)
  //   setTimeout((index)=>{
  //     let prev = [...Todo] ;
  //     prev.splice(index , 1);
  //     localStorage.setItem('list', JSON.stringify(prev));
  //     setTodo(prev);
  //   },1000);


  // }

  return (
    <div className="main">
      <div className="input_container">
        <h1>List your work </h1>
        <input type="text" name="heading" id="todo_heading" value={Heading} onChange={(e) => setHeading(e.target.value)} placeholder='Type your ToDo heading here' className='input_field' />
        <input type="text" name="description" id="description" value={Description} onChange={(e) => setDescription(e.target.value)} placeholder='Type your ToDo description here' className='input_field' />
        <button type="button" onClick={addTask} className='input_field input_button'><IoMdAdd /> Add task</button>
      </div>
      <div className="section">
        {Todo.map((item, index) => {
          return (
            <div className="task" id={index} key={index}>
              <div>
                <h2>{item.head}</h2>
                <p>{item.detail}</p>
              </div>
              <div>
                <MdDelete onClick={()=>deleteTodo(index)} className='icon' />
                {/* <MdOutlineDone className= {`${complete} icon`} onClick={()=> completed(index)} /> */}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
