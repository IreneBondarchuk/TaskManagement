import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { ChangeEvent } from 'react';
import { Button, DropdownProps, Form,Segment, Select } from 'semantic-ui-react'
import { Category } from '../../../app/models/category';
import { Executor } from '../../../app/models/executor';
import { useStore } from '../../../app/stores/store';


export default observer(function TaskForm(){
    const {categoryStore, executorStore, taskStore} = useStore();
    const {selectedTask, closeForm, createTask, updateTask, loading} = taskStore;
    const {executorRegistry} = executorStore 
    const {categoryRegistry} = categoryStore


    const initialState = selectedTask ?? {
        id: '',
        title: '',
        description: '',
        deadline: '',
        status: 1,
        executor:{} as Executor,
        category:{} as Category,
        categoryId: '',
        executorId: ''
    }

 const [task, setTask] = useState(initialState);

 function handleSubmit(){
    
     task.id ? updateTask(task) : createTask(task);
 }


function hanleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const {name, value} = event.target;
    setTask({...task, [name]:value});
}

function handleCategoryChange(event:SyntheticEvent<HTMLElement, Event>, data: DropdownProps){
    const category = data.value &&  categoryRegistry.get(data.value as string);
    category && setTask({...task, categoryId :data.value as string, category:category});
}

function handleExecutorChange(event:SyntheticEvent<HTMLElement, Event>, data: DropdownProps){
    const executor = data.value &&  executorRegistry.get(data.value as string);
    executor &&  setTask({...task, executorId:executor.id, executor:executor});
}

    return(
        <Segment clearing>
            <Form onSubmit={() => handleSubmit()} >
                <Form.Input placeholder='Title' value={task.title} name='title' onChange={hanleInputChange}/>
                <Form.TextArea placeholder='Description' value={task.description} name='description' onChange={hanleInputChange} />
                <Form.Select options={categoryStore.options} value ={task.categoryId} placeholder='Category' onChange={handleCategoryChange} />
                <Form.Input type='date' placeholder='Deadline' value={task.deadline} name='deadline'  onChange={hanleInputChange} />
                <Form.Select options={executorStore.options} placeholder='Executor' value={task.executorId}  onChange={handleExecutorChange}  />
                <Button loading={loading} floated='right' positive type='submit' content='Save' />
                <Button onClick={() => closeForm()} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})