import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './tasks.css'
import TaskForm from '../tasksFrom/TaskForm';
import ChosenTask from './ChosenTask';
import taskManager from '../../model/TaskManager'
import TaskHistoryPDF from '../Printer/TaskHistory';
import TaskNowPDF from '../Printer/TaskNow';

import { PDFDownloadLink } from "@react-pdf/renderer";


function StyleActionsExample({type}) {
    
    const userId = JSON.parse(localStorage.getItem("isThereUser")).username;
    
    const [items, setItems] = useState(() => {
        const { tasks } =taskManager.getTasksByUserId(userId)
        console.log(tasks)
        return tasks || [];
      });
      const [taskHistory, setTaskHistory] = useState(() => {
        const { tasksHistory } =taskManager.getTasksByUserId(userId)
        console.log(tasksHistory)
        return tasksHistory || [];
      });

      
    const [inputValue, setInputValue] = useState('');
    const [inputTitle, setInputTitle] = useState('');
    const [inputPriority, setInputPriority] = useState('');
    const [inputWhen,setInputWhen] = useState('');
    const [bahur, setBahur] = useState(false);
    const [openTask, setOpenTask]=useState(false)
    const [chosenTask, setChosenTask]= useState("")
    const [date, setDate] = useState('');

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const addComment =(taskId,comment)=>{
    taskManager.addCommentToTask(taskId,comment )
   
  }

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('index', index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

  
     

    const handleDrop = (e, index) => {
        const dragIndex = parseInt(e.dataTransfer.getData('index'));
        const dragItem = items[dragIndex];

        const newItems = items.filter((item, index) => index !== dragIndex);

        newItems.splice(index, 0, dragItem);

        setItems(newItems);
        localStorage.setItem('tasks', JSON.stringify(newItems));
        

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (inputValue.trim() === '') {
            return;
        }

       
        const newItem=taskManager.addTask(inputTitle, inputValue, inputPriority,date,userId)
        setInputValue('');
        setInputTitle('');
        setInputPriority('')
        setItems([...items, newItem]);
        setInputValue('');
        setBahur(false)
        
        
    };
    const handleChange = (e) => {
        setInputPriority(e.target.value);
        console.log(e.target.value)
    };
    
    console.log(items)
    const isToday = (date) => {
        const today = new Date();
        const compareDate = new Date(date);
        return (
          today.getDate() === compareDate.getDate() &&
          today.getMonth() === compareDate.getMonth() &&
          today.getFullYear() === compareDate.getFullYear()
        );
      };
      const filteredItems = items.filter((item) => {
        if (type === 'Today') {
          return isToday(item.term);
        } else {
          return true; // For other types, return true for all items
        }
      });
      

    return (
        <>
         <div className='list-container'>
            <div  className='task-list-container'>
            <ListGroup>
  {type === 'History' ? (
    taskHistory.length === 0 ? (
      <><p className='nothing-here'>There is no history</p></>
    ) : (
      taskHistory.map((item, index) => (
        <ListGroup.Item
          className='list'
          onClick={() => {
            setOpenTask(true);
            setChosenTask(item);
            console.log(item);
          }}
          key={item.id}
          action
          variant={item.completed ? 'success' : 'danger'}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
        >
          <div>
            <span>Title:</span>
            <span>{item.title}</span>
          </div>
          <div>
            <span>Description:</span>
            <span
              style={{
                display: 'inline-block',
                width: '100px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.description}
            </span>
          </div>
          <div>
            <span>Created on:</span>
            <span>{item.currentDate}</span>
          </div>
          <div>
            <span>Status:</span>
            <span>{item.completed ? 'Completed' : 'Canceled'}</span>
          </div>
          <div
            className='delete-btn button-comment'
            onClick={(e) => {
              e.stopPropagation();
              taskManager.deleteHistoryTask(item.id);
              const { tasksHistory } = taskManager.getTasksByUserId(userId);
              setTaskHistory(tasksHistory);
            }}
          >
            <div className='outer-coment'>
              <div className='inner'>
                <label className='btn-label-coment'>Delete</label>
              </div>
            </div>
          </div>
        </ListGroup.Item>
      ))
    )
  ) : (
    filteredItems.length === 0 ? (
        <><p className='nothing-here'>There are no tasks yet.</p></>
    ) : (
      filteredItems.map((item, index) => (
        <ListGroup.Item
          className='list'
          onClick={() => {
            setOpenTask(true);
            setChosenTask(item);
            console.log(item);
          }}
          key={item.id}
          action
          variant={item.variant}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
        >
          <div className='buttons-com'>
            <button
              className='complied showhim'
              onClick={(e) => {
                e.stopPropagation();
                taskManager.completeTask(item.id);
                const { tasks } = taskManager.getTasksByUserId(userId);
                setItems(tasks);
                const { tasksHistory } = taskManager.getTasksByUserId(userId);
                setTaskHistory(tasksHistory);
              }}
            >
              <div className='showme'>Complied the task!</div>
            </button>
            <button
              className='cancel showhit'
              onClick={(e) => {
                e.stopPropagation();
                taskManager.cancelTask(item.id);
                const { tasks } = taskManager.getTasksByUserId(userId);
                setItems(tasks);
                const { tasksHistory } = taskManager.getTasksByUserId(userId);
                setTaskHistory(tasksHistory);
              }}
            >
              <div className='showit'>Cancel the task!</div>
            </button>
          </div>
          <div>
            <span>Title:</span>
            <span>{item.title}</span>
          </div>
          <div>
            <span>Description:</span>
            <span>{item.description}</span>
          </div>
          <div>
            <span>Created on:</span>
            <span>{item.currentDate}</span>
          </div>
          <div>
            <span>Till:</span>
            <span>{item.term}</span>
          </div>
          <div
            className='delete-btn button-comment'
            onClick={(e) => {
              e.stopPropagation();
              taskManager.deleteTask(item.id);
              const { tasks } = taskManager.getTasksByUserId(userId);
              setItems(tasks);
            }}
          >
            <div className='outer-coment'>
              <div className='inner'>
                <label className='btn-label-coment'>Delete</label>
              </div>
            </div>
          </div>
        </ListGroup.Item>
      ))
    )
  )}
</ListGroup>

            </div>
             
            {type!=='History'&& <button  className='button addtask' onClick={() => { setBahur(true) }}>Add task</button>}
                 {type==="History"? <PDFDownloadLink
                            document={<TaskHistoryPDF taskHistory={taskHistory} />}
                            fileName="TaskHistory.pdf"
                        >
                          
                                {taskHistory.length ? <button  className='button'>Download</button>:null}
                            
                        </PDFDownloadLink> :

                        <PDFDownloadLink
                        document={<TaskNowPDF filteredItems={filteredItems} />}
                        fileName="TaskHistory.pdf"
                    >
                        
                          {filteredItems.length? <button  className='button'>Download</button>:null}
                        
                    </PDFDownloadLink>
                    }   

         </div>
            {bahur && <div className='form-overlay'>
               
                   
                <TaskForm  date={date} handleDateChange={handleDateChange} setInputWhen={setInputWhen} inputPriority={inputPriority} inputValue={inputValue} inputTitle={inputTitle} setInputTitle={setInputTitle} setInputValue={setInputValue} setBahur={setBahur} handleSubmit={handleSubmit} handleChange={handleChange}/>

                        </div>}
            {openTask &&
                <div className='form-overlay'>
                    <div  className='task-form'>
                     <button className='closeModal button' onClick={() => { setOpenTask(false) }} >
                        <div className="outer">
                            <div  className="inner">
                                <label className='btn-label'>Back</label>
                            </div>
                        </div>
                    </button>
                    <ChosenTask type={type} addComment={addComment} setChosenTask={setChosenTask} chosenTask={chosenTask}/>

                   
                    </div>

                </div>
            }
        </>
    );
}

export default StyleActionsExample;
