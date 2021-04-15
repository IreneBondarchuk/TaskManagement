import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react'
import { ChangeEvent } from 'react';
import { Button, DropdownProps, Form,Segment } from 'semantic-ui-react'
import { Category } from '../../../app/models/category';
import { Executor } from '../../../app/models/executor';
import { useStore } from '../../../app/stores/store';


export default observer(function TaskForm(){
    const {categoryStore, executorStore, taskStore} = useStore();
    const {selectedTask, closeForm, createTask, updateTask, loading} = taskStore;
    const {executorRegistry} = executorStore 
    const {categoryRegistry} = categoryStore
    
    const validationError = {
        title: '',
        description: '',
        deadline: '',
        category: ''
    } 
    const [validErrors, setValidError] = useState(validationError);

    function validateForm(){
        let error = {
            title: '',
            description: '',
            deadline: '',
            category: ''
        }
        let formIsValid = true
        if (!(task.title.length > 0)) {
            formIsValid = false
            error.title = '*Title is required!'
          }
          if (task.description.length < 15) {
            formIsValid = false
            error.description = '*Description should contain at least 15 characters!'
          }
          if (!task.category.id) {
            formIsValid = false
            error.category = '*Category is required!'
          }
          var validDate = new Date();
          validDate.setDate(validDate.getDate());
          if (new Date(task.deadline) < validDate) {
            formIsValid = false
            error.deadline = '*Deadline can\'t be earlier than tommorow!'
          }
        setValidError(error)
        return formIsValid
    }

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
    if(validateForm()) task.id ? updateTask(task) : createTask(task); 
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
            <Form 
                onSubmit={() => handleSubmit()} >
                <Form.Input placeholder='Title' value={task.title} name='title' onChange={hanleInputChange}/>
                    <div className='errorMsg'>{validErrors.title}</div>
                <Form.TextArea placeholder='Description' value={task.description} name='description' onChange={hanleInputChange} />
                    <div className='errorMsg'>{validErrors.description}</div>
                <Form.Select options={categoryStore.options} value ={task.categoryId} placeholder='Category' onChange={handleCategoryChange} />
                <div className='errorMsg'>{validErrors.category}</div>
                <Form.Input type='date' placeholder='Deadline' value={task.deadline} name='deadline'  onChange={hanleInputChange} />
                    <div className='errorMsg'>{validErrors.deadline}</div>
                <Form.Select options={executorStore.options} placeholder='Executor' value={task.executorId}  onChange={handleExecutorChange}  />
                <Button loading={loading} floated='right' positive type='submit' content='Save' />
                <Button onClick={() => closeForm()} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})