import React, { useState, useRef } from 'react';
import taskManager from '../../model/TaskManager';

function ChosenTask({ type, chosenTask }) {
    const [comments, setComments] = useState(chosenTask.comments);
    const [taskTitle, setTaskTitle] = useState(chosenTask.title);
    const [description, setDescription] = useState(chosenTask.description);
    const [taskDate, setTaskDate] = useState(chosenTask.term);

    const currentDate = new Date().toISOString().split('T')[0];

    const debounceDescriptionRef = useRef(null);
    const debounceRef = useRef(null);
    const debounceDateRef = useRef(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const comment = e.target.elements.comment.value;
        const currentDate = new Date().toLocaleString(undefined, {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
        const updatedComments = [
            ...comments,
            { id: Date.now(), text: comment, date: currentDate },
        ];
        setComments(updatedComments);
        taskManager.addCommentToTask(chosenTask.id, comment);
        e.target.reset(); // Reset the form
    };


    const handleDeleteComment = (commentId) => {
        taskManager.deleteCommentFromTask(chosenTask.id, commentId);
        const updatedComments = comments.filter((comment) => comment.id !== commentId);
        setComments(updatedComments);
    };

    const handleDescriptionChange = (e) => {
        const newDescription = e.target.value;
        setDescription(newDescription);

        // Cancel any pending debounced function calls
        if (debounceDescriptionRef.current) {
            clearTimeout(debounceDescriptionRef.current);
        }

        // Invoke the function immediately and debounce subsequent calls
        debounceDescriptionRef.current = setTimeout(() => {
            taskManager.editTaskDescription(chosenTask.id, newDescription);
        }, 500); // Set the desired time frame for debouncing
    };

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTaskTitle(newTitle);

        // Cancel any pending debounced function calls
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        // Invoke the function immediately and debounce subsequent calls
        debounceRef.current = setTimeout(() => {
            taskManager.editTaskTitle(chosenTask.id, newTitle);
        }, 500); // Set the desired time frame for debouncing
    };

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setTaskDate(newDate);

        // Cancel any pending debounced function calls
        if (debounceDateRef.current) {
            clearTimeout(debounceDateRef.current);
        }

        // Invoke the function immediately and debounce subsequent calls
        debounceDateRef.current = setTimeout(() => {
            taskManager.editTaskDate(chosenTask.id, newDate);
        }, 500); // Set the desired time frame for debouncing
    };

    const isDisabled = type === 'History';
    return (
        <>
            <div className="container">
                <h2 className="task-title">Your Task</h2>
                <div className="input-container">
                    <span className="input-label">Title:</span>
                    <input
                        className="task-input"
                        onChange={handleTitleChange}
                        value={taskTitle}
                        disabled={isDisabled}
                    />
                </div>

                <div className="input-container">
                    <span className="input-label">Description:</span>
                    <input
                        className="task-input"
                        onChange={handleDescriptionChange}
                        value={description}
                        disabled={isDisabled}
                    />
                </div>

                <div className="input-container">
                    <span className="input-label">Created on:</span>
                    <span className="date">{chosenTask.currentDate}</span>
                </div>

                <div className="input-container">
                    <span className="input-label">Till:</span>
                    <input
                        className="task-date-input"
                        value={taskDate}
                        min={currentDate}
                        type="date"
                        onChange={handleDateChange}
                        disabled={isDisabled}
                    />
                </div>
            </div>

            <div className="comment-container">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment" >
                        <div>
                            <span className='time'>{comment.date}</span>
                            <span>  {comment.text}</span>
                        </div>
                        <button className='delete-btn button-comment' onClick={() => handleDeleteComment(comment.id)}  >
                            <div className="outer-coment">
                                <div className="inner">
                                    <label className='btn-label-coment'>Delete</label>
                                </div>
                            </div>
                        </button>
                    </div>
                ))}
            </div>

            <form onSubmit={handleFormSubmit} disabled={isDisabled}>
                <textarea placeholder='Type your comment' name="comment" disabled={isDisabled} />
                <input className="submit-button" type="submit" disabled={isDisabled} />
            </form>
        </>
    );
}

export default ChosenTask;
