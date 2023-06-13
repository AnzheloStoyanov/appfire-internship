import React from 'react';
import './LeftSide.css'; // CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
;




const Dashboard = ({setType}) => {
    return (
        <div className="dashboard-container">
           
            <div className="dashboard-menu">
                <ul>
                    <li onClick={()=>{setType('Today')}}>
                        <FontAwesomeIcon className='fav-icon today-icon' icon={faCalendarWeek} />
                        Today
                    </li>
                    <li onClick={()=>{setType('Upcoming')}}>
                        <FontAwesomeIcon  className='fav-icon upcoming-icon' icon={faCalendarDays} />
                        Upcoming
                    </li>
                    <li onClick={()=>{setType('History')}}>
                        <FontAwesomeIcon  className='fav-icon filters-icon' icon={faCircleDot} />
                        History
                    </li>
                </ul>
                

            </div>
            
        </div>
    );
};

export default Dashboard;