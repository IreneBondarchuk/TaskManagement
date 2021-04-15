import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import { ChangeEvent } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';


export default observer(function ExecutorForm(){
    const {executorStore} = useStore();
    const {selectedExecutor, closeForm, createExecutor, updateExecutor, loading} = executorStore;

    const initialState = selectedExecutor ?? {
        id: '',
        firstName: '',
        surname: '',
        hiringDate: '',
        email: '',
        phoneNumber: '',
        job: '',
        tasks:[]
    }

 const [executor, setExecutor] = useState(initialState);

 function handleSubmit(){
    if(validateForm()) executor.id ? updateExecutor(executor) : createExecutor(executor);
 }


function hanleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const {name, value} = event.target;
    setExecutor({...executor, [name]:value});

}

const validationError = {
    firstName: '',
    surname: '',
    hiringDate: '',
    phoneNumber: '',
    email: '',
    job: ''
} 
const [validErrors, setValidError] = useState(validationError);

function validateForm(){
    let error = {
        surname: '',
        hiringDate: '',
        phoneNumber: '',
        email: '',
        job: '',
        firstName: ''
    }
    let formIsValid = true
    if (!(executor.firstName.length > 0)) {
        formIsValid = false
        error.firstName = '*FirstName is required!'
      }
      if (!(executor.surname.length > 0)) {
        formIsValid = false
        error.surname = '*Surname is required!'
      }
      if (!(executor.job.length > 0)) {
        formIsValid = false
        error.job = '*Job is required!'
      }
      if (executor.email) {
        let pattern = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
        if (!pattern.test(executor.email)){
          formIsValid = false
          error.email = '*Email is not valid!'
        }

      }
      if (executor.phoneNumber) {
        let pattern = new RegExp(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
        if (!pattern.test(executor.phoneNumber)){
          formIsValid = false
          error.phoneNumber = '*Phone is not valid!'
        }
       
      }
      if (!(executor.hiringDate.length > 0))  {
        formIsValid = false
        error.hiringDate = '*Hiring Date is required!'
      }
    setValidError(error)
    return formIsValid
}





    return(
        <Segment clearing>
            <Form onSubmit={() => handleSubmit()} >
                <Form.Input placeholder='First Name' value={executor.firstName} name='firstName' onChange={hanleInputChange}/> 
                <div className='errorMsg'>{validErrors.firstName}</div>
                <Form.Input placeholder='Surname' value={executor.surname} name='surname' onChange={hanleInputChange}/>
                <div className='errorMsg'>{validErrors.surname}</div>
                <Form.TextArea placeholder='Job' value={executor.job} name='job' onChange={hanleInputChange} />
                <div className='errorMsg'>{validErrors.job}</div>
                <Form.Input type='date' placeholder='Hiring Date' value={executor.hiringDate} name='hiringDate'  onChange={hanleInputChange} />
                <div className='errorMsg'>{validErrors.hiringDate}</div>
                <Form.Input placeholder='Email'  value={executor.email} name='email'  onChange={hanleInputChange} />
                <div className='errorMsg'>{validErrors.email}</div>
                <Form.Input type='tel' placeholder='Phone'  value={executor.phoneNumber} name='phoneNumber'  onChange={hanleInputChange} />
                <div className='errorMsg'>{validErrors.phoneNumber}</div>
                <Button loading={loading} floated='right' positive type='submit' content='Save' />
                <Button onClick={() => closeForm()} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})