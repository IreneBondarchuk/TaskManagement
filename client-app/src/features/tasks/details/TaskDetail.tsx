import React from 'react'
import { Button, Card } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';



export default function TaskDetails(){
    const {taskStore} = useStore();
    const {selectedTask: task, openForm,cancelSelectTask} = taskStore;

    if(!task) return <LoadingComponent />;

    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{task.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{task.deadline}</span>
                </Card.Meta>
                <Card.Description>{task.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths= '2'>
                    <Button onClick={() => openForm(task.id)} basic color='blue' content='Edit' />
                    <Button onClick={() => cancelSelectTask()} content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )

}