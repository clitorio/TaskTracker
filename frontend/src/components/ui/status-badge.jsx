import React from 'react'
import { Badge } from './badge';

export default function StatusBadge({status}) {

    return (
        <TaskStatus status={status} />         
    )
}

const TaskStatus = ({status}) => {
    switch(status){
        case 'in_progress':
            return <Badge className={'bg-blue-600 text-white'} >In Progress</Badge>;
        case 'completed':
            return <Badge className={'bg-green-600 text-white'}>Completed</Badge>;
        default:
            return <Badge className={'bg-sky-200 text-sky-700'}>Pending</Badge>;
    }
}