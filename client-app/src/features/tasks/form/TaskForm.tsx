import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import { ChangeEvent } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';


export default observer(function TaskForm(){
    const {taskStore} = useStore();
    const {selectedTask, closeForm, createTask, updateTask, loading} = taskStore;

    const initialState = selectedTask ?? {
        id: '',
        title: '',
        description: '',
        deadline: '',
        status: 1
    }

 const [task, setTask] = useState(initialState);

 function handleSubmit(){
     task.id ? updateTask(task) : createTask(task);
 }


function hanleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const {name, value} = event.target;
    setTask({...task, [name]:value});

}
    return(
        <Segment clearing>
            <Form onSubmit={() => handleSubmit()} >
                <Form.Input placeholder='Title' value={task.title} name='title' onChange={hanleInputChange}/>
                <Form.TextArea placeholder='Description' value={task.description} name='description' onChange={hanleInputChange} />
                <Form.Input placeholder='Category' value='test' name='category' onChange={hanleInputChange} />
                <Form.Input type='date' placeholder='Deadline' value={task.deadline} name='deadline'  onChange={hanleInputChange} />
                <Form.Input placeholder='Executor'  className='icon'  icon='user'  value='executor'  onChange={hanleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Save' />
                <Button onClick={() => closeForm()} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})