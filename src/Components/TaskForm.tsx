import React, { ReactElement } from 'react'
import styles from './TaskForm.module.css'
import { ITask } from './Task'


interface Props{
  btnText:string
  taskList: ITask[]
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>
  task?: ITask | null;
  handleUpdate?(id:number, title:string, difficulty:number):void
}


const TaskForm = ({btnText, taskList, setTaskList, task, handleUpdate }:Props):ReactElement  => {

  const [id, setId] = React.useState<number>(0);
  const [title, setTitle] = React.useState<string>('');
  const [difficulty, setDifficulty] = React.useState(0)

React.useEffect(() =>{
if(task){
  setId(task.id)
  setTitle(task.title)
  setDifficulty(task.difficulty)
}
},[task])

const addTaskHandler = (e:React.FormEvent<HTMLFormElement>) =>{
  e.preventDefault();
if(handleUpdate){
handleUpdate(id, title, difficulty)
}
  else{
  const id = Math.floor(Math.random() * 1000)

  const newTask : ITask = {id, title, difficulty}
  setTaskList!([...taskList, newTask]) //! shows that taskList is not undefined
  setTitle('')
  setDifficulty(0)
}

}

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
if(e.target.name==='title'){
  setTitle(e.target.value)
}
else{
  setDifficulty(parseInt(e.target.value))
}
}



  return (
   <form onSubmit={addTaskHandler} className={styles.form}>
    <div className={styles.input_container}> 
      <label htmlFor='title'>Título</label>
      <input type='text' name='title' placeholder='Título da tarefa' onChange={handleChange} value={title}/>
    </div>
    <div className={styles.input_container}>
      <label htmlFor='difficult'>Dificudade</label>
      <input type='text' name='difficult' placeholder='Dificuldade da tarefa' onChange={handleChange} value={difficulty}/>
    </div>
    <input type='submit' value={btnText}/>


   </form>
  )
}

export default TaskForm