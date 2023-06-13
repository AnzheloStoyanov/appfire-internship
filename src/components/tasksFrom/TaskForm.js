import './task-form.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

export default function TaskForm({ date, handleDateChange, setBahur, handleSubmit, handleChange, inputValue, setInputValue, inputTitle, setInputTitle, inputPriority }) {

    const currentDate = new Date().toISOString().split('T')[0];


    return (
        <form className='task-form' onSubmit={handleSubmit} style={{ width: '50%' }}>

            <button className='closeModal button' onClick={() => { setBahur(false) }} >
                <div className="outer">
                    <div className="inner">
                        <label className='btn-label'>Back</label>
                    </div>
                </div>
            </button>


            <div className=" form__group">
                <textarea
                    className=" container form__input" id="title" placeholder="Your task's title" required=""
                    value={inputTitle} onChange={(e) => setInputTitle(e.target.value)}></textarea>

                <label htmlFor="title" id='title-label' className="form__label">Title</label>
            </div>


            <div className="form__group">
                <textarea
                    className="container form__input" id="name" placeholder="Write your task" required=""
                    value={inputValue} onChange={(e) => setInputValue(e.target.value)}></textarea>

                <label htmlFor="name" className="form__label">Write your task</label>
            </div>

            <div className='radio-btns'>
                <div className='radio-btn-container'>
                    <input type="radio" id="danger" name="danger" value="danger"
                        checked={inputPriority === 'danger'}
                        onChange={handleChange} />
                    <label htmlFor="danger">Higher  </label><FontAwesomeIcon style={{ color: '#f1aeb5' }} icon={faFlag} />
                </div>

                <div>
                    <input type="radio" id="warning" name="warning" value="warning"
                        checked={inputPriority === 'warning'}
                        onChange={handleChange} />

                    <label htmlFor="warning">Intermediate </label> <FontAwesomeIcon style={{ color: '#FFE69C' }} icon={faFlag} />
                </div>

                <div>
                    <input type="radio" id="success" name="success" value="success"
                        checked={inputPriority === 'success'}
                        onChange={handleChange} />
                    <label htmlFor="success">Lower </label><FontAwesomeIcon style={{ color: '#A3CFBB' }} icon={faFlag} />
                </div>
                <div>
                    <input type="radio" id="light" name="light" value="light"
                        checked={inputPriority === 'light'}
                        onChange={handleChange} />
                    <label htmlFor="light">Lowest</label> <FontAwesomeIcon style={{ color: '#E9ECEF' }} icon={faFlag} />
                </div>

            </div>
            <div className="calendar-input">

                <input
                    type="date"
                    value={date}
                    min={currentDate}
                    onChange={handleDateChange}
                    className="task-date-input"
                    style={{ margin: '20px 0' }}
                    required={true}

                />
            </div>
            <input id='submit-task-btn' className='button' type="submit" value="Add" />
        </form>
    )
}

