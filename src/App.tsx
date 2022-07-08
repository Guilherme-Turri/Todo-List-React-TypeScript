import React from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header';
import styles from './App.module.css'
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';


import { ITask } from './Components/Task';
import Modal from './Components/Modal';


function App() {

  const [taskList, setTaskList] = React.useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = React.useState<ITask | null>(null)

  const deleteTask = (id:number) =>{
    setTaskList(taskList.filter((task) =>{
      return task.id !==id;
    }))
  }
  
 function hideOrShowModal (display:boolean) {
    const modal = document.querySelector('#modal')
    if(display){
        modal!.classList.remove('hide')
    }else{
      modal!.classList.add('hide')
    }
  }

  const editTask= (task: ITask):void =>{
    hideOrShowModal(true);
    setTaskToUpdate(task)

  }

const updateTask = (id:number, title:string, difficulty:number) =>{
  const updateTask:ITask = {id, title, difficulty}

  const updateItens = taskList.map((task) =>{
    return task.id === updateTask.id ? updateTask : task;
  })

  setTaskList(updateItens)
  hideOrShowModal(false)
}


  return (
    <div>
      <Modal children={
      <TaskForm
       btnText='Editar Tarefa' taskList={taskList} task={taskToUpdate}  handleUpdate={updateTask}/>}
       />
        <Header />
        <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm btnText = 'Criar Tarefa' taskList={taskList} setTaskList={setTaskList} />
        </div>
        <div>
          <h2>Suas Tarefas</h2>
          <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}/>
        </div>
              
        
          </main>
        <Footer />
    </div>
  );
}

export default App;
