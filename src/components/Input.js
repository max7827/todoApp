import React from "react";
import { PlusCircle } from "phosphor-react";
import { useState } from "react";

import { useEffect } from "react";

import styles from "./Input.module.css";
import { v4 as uid } from "uuid";
import ListContent from "./ListContent";
import Swal from "sweetalert2";

function Input() {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/2")
      .then((response) => response.json())
      .then((json) => console.log(json));
    let item = localStorage.getItem("todos");
    if (item) {
      var itemAr = JSON.parse(item);
      setTodo(itemAr);
    }

    console.log("sadda");
  }, []);

  // const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);

  const markTodoAsDone = (i) => {
    let item = JSON.parse(localStorage.getItem("todos"));
    if (item[i].isFinished) {
      item[i].isFinished = false;
    } else {
      item[i].isFinished = true;
    }
    console.log(item[i]);
    localStorage.setItem("todos", JSON.stringify(item));
    setTodo(item);
  };
  const deleteTodo = async (i) => {
    const res = await fireAlert();
    if (res.isConfirmed) Swal.fire("Tasks Deleted", "", "success");
    else {
      Swal.fire(" Cancelled", "", "error");
      return false;
    }
    let item = JSON.parse(localStorage.getItem("todos"));
    item.splice(i, 1);
    console.log(item);
    localStorage.setItem("todos", JSON.stringify(item));
    setTodo(item);
  };
  const editTodo = async (i) => {
    
    const res = await fireAlerInput();
    console.log("sasasasasas444444444444444444", res);
    if (res.isConfirmed){
      if (res.value){
      Swal.fire("Task edited", "", "success");
      }else{
        Swal.fire("Input should not be empty", "", "info");
        return false; 
      }
    } 
    else {
      Swal.fire("Cancelled", "", "error");
      return false;
    }

  
    let item = JSON.parse(localStorage.getItem("todos"));

    let newValue = res.value;
    item[i].name = newValue;
    console.log(item);
    localStorage.setItem("todos", JSON.stringify(item));
    setTodo(item);
 
    
  };

  function saveTask() {
    let inputField = document.querySelector("input");
    let g = inputField.value;
    if (!g) {
      Swal.fire("Input should not be empty", "", "info");
      return false;
    }
    let obj = {};
    obj.name = g;
    obj.isFinished = false;
    obj.id = uid();
    console.log(obj);
    let item = localStorage.getItem("todos");
    if (item) {
      var itemAr = JSON.parse(item);
      itemAr.push(obj);
      localStorage.setItem("todos", JSON.stringify(itemAr));
    } else {
   
      localStorage.setItem("todos", JSON.stringify([obj]));
    }
    // console.log([g]);
    setTodo(itemAr);
    inputField.value = "";

    // console.log(todo);
    //  setState(g);
    // alert(state)
  }

  async function markAllTodoAsDone() {
    let item = localStorage.getItem("todos");
    if (item) {
      const res = await fireAlert();
      if (res.isConfirmed) Swal.fire("All Tasks Marked As Done", "", "success");
      else {
        Swal.fire(" Cancelled", "", "error");
        return false;
      }
      var itemAr = JSON.parse(item);
      itemAr.map((i) => (i.isFinished = true));
      localStorage.setItem("todos", JSON.stringify(itemAr));
      setTodo(itemAr);
    } else {
      
        Swal.fire("No Tasks Available", "", "info");
        return false;
     
    }
  }

  async function deleteAllTodo() {
   
    let item = localStorage.getItem("todos");
    if (item) {
      const res = await fireAlert();
      if (res.isConfirmed) Swal.fire("All Tasks Deleted", "", "success");
      else {
        Swal.fire(" Cancelled", "", "error");
        return false;
      }
      localStorage.clear();
      setTodo([]);
    } else {
      Swal.fire("No Tasks Available", "", "info");
      return false;
    }
  }
  // function SweetAlert2() {
  const fireAlert = async () => {
    return await Swal.fire({
      title: "Are you sure",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    saveTask();
  };

  // function SweetAlert2() {
  const fireAlerInput = async () => {
    return await Swal.fire({
      title: "Edit Task!",
      text: "Write something interesting:",
      input: "text",
      showCancelButton: true,
    });
  };
  // function SweetAlert2() {
  // const alertNoTask = async () => {
  //   return await Swal.fire({
  //     title: "No Tasks Available",
  //     showConfirmButton: true,
  //     // showCancelButton: true,
  //     confirmButtonText: "OK",
  //     // cancelButtonText: "Cancel",
  //     icon: "info",
  //   });
  // };

  return (
    <div className={styles.list}>
      <header className={styles.listHeader}>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Add a new Task"
            type="text"
            required
            className={styles.listInputNewTask}
          />
          <button
            type="button"
            onClick={saveTask}
            className={styles.listButtonNewTask}
          >
            Create <PlusCircle size={25}></PlusCircle>
          </button>
        </form>
        <div className={styles.divClass}>
          <button
            type="button"
            onClick={markAllTodoAsDone}
            style={{ backgroundColor: "green" }}
            className={styles.listButtonNewTask}
          >
            Mark All Tasks As Done
          </button>
          <button
            type="button"
            onClick={deleteAllTodo}
            className={styles.listButtonNewTask}
          >
            Delete All Tasks
          </button>
        </div>
      </header>
      <ListContent
        onDelete={deleteTodo}
        onSelect={markTodoAsDone}
        onEdit={editTodo}
        tasks={todo}
      ></ListContent>
    </div>
  );
}

export default Input;

/* Read more about isConfirmed, isDenied below */
// if (result.isConfirmed) {
//   Swal.fire("Nice to meet you", "", "success"); return true;

// } else
//   Swal.fire(" Cancelled", "", "error");
// throw new Error('kala billa');
// }
//   return (
//     <div >
//         <center>

//             <button className="btn btn-primary"
//                 onClick={fireAlert}>
//                 Click me to see Sweet Alert 2
//              </button>
//         </center>
//     </div>
// )
//   }

// function deleteTask(taskId) {
//   const newTasksArray = tasks.filter((task) => task.id !== taskId);

//   setTasks(newTasksArray);
// }

// function selectTask(todo.uid) {
//   const newTasksArray = tasks.map((task) => {
//     if (task.id === taskId) task.isDone = !task.isDone;
//     return task;
//   });
//   setTasks(sortByIsDone(newTasksArray));
// }

//   return (
//     <>
//       <div>

//         <h1>Enter the task </h1>
//         <input type="text" onChange={(e)=>setInput(e.target.value)} placeholder="Enter task..." />
//         <button onClick={()=>saveTask()}>Save</button>
//       </div>

// <div><button onClick={markAllTodoAsDone}>Mark all as done</button></div>
// <div><button onClick={deletdeleteAllTodoeTodo}>Delete All</button></div>
//       <div>
//         <ul>

//         {todo && todo.map((v,i)=> {
//           if(v.isFinished){
//             return (
//               <li key={i}><s>{v.name}</s><button  onClick={()=>deleteTodo(i)}> delete</button></li>
//               )
//           }else{
//             return (
//               <li key={i}><b>{v.name}</b> <button  onClick={()=>editTodo(i)}> Mark as done</button></li>
//               )
//           }
//           })}

//          {/* {todo.map(home => <li>{home.name}</li>)} */}
//         </ul>
//       </div>

//     </>
//   );
//  const KeyPress = (e) => {
//     if(e.which === 13) {
//       alert('asaasasas');
//       saveTask()
//     }
//   }
