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
    executor.id ? updateExecutor(executor) : createExecutor(executor);
 }


function hanleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const {name, value} = event.target;
    setExecutor({...executor, [name]:value});

}
    return(
        <Segment clearing>
            <Form onSubmit={() => handleSubmit()} >
                <Form.Input placeholder='First Name' value={executor.firstName} name='firstName' onChange={hanleInputChange}/>
                <Form.Input placeholder='Surname' value={executor.surname} name='surname' onChange={hanleInputChange}/>
                <Form.TextArea placeholder='Job' value={executor.job} name='job' onChange={hanleInputChange} />
                <Form.Input type='date' placeholder='Hiring Date' value={executor.hiringDate} name='hiringDate'  onChange={hanleInputChange} />
                <Form.Input type='email' placeholder='Email'  value={executor.email} name='email'  onChange={hanleInputChange} />
                <Form.Input type='tel' placeholder='Phone'  value={executor.phoneNumber} name='phoneNumber'  onChange={hanleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Save' />
                <Button onClick={() => closeForm()} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})