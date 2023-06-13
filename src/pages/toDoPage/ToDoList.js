import Dashboard from "../../leftSideDashBoard/LeftSide"
import { useState } from 'react'
import React from "react"
import "./to-do-list.css"
import StyleActionsExample from "../../components/tasks/Tasks"
export default function ToDoPage(){

    const [type, setType] =useState('Upcoming')
    

    return(
        <div className="todo">
            <Dashboard setType={setType}/>
           <StyleActionsExample type={type}/>
        </div>
    )
}