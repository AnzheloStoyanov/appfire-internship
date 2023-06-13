import Dashboard from "../../components/leftSideDashBoard/LeftSide"
import { useState } from 'react'
import React from "react"
import "./to-do-list.css"
import Tasks from "../../components/tasks/Tasks"

export default function ToDoPage() {

    const [type, setType] = useState('Upcoming')

    return (
        <div className="todo">
            <Dashboard setType={setType} />
            <Tasks type={type} />
        </div>
    )
}