import React, { SyntheticEvent, useState } from 'react'
import { Checkbox, DropdownProps, Header, Input, Segment, Select } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'

export default function TaskFilters(){
    const {taskStore: {predicate, setPredicate}, categoryStore, executorStore,} = useStore()
    const[target, setTarget] = useState('')


    function handleClick(field: string) {
        setPredicate(field, target);
      }

      function handleCategoryChange(event:SyntheticEvent<HTMLElement, Event>, data: DropdownProps){
       data.value && setPredicate('categoryId', data.value as string);
    }
    function handleExecutorChange(event:SyntheticEvent<HTMLElement, Event>, data: DropdownProps){
        data.value && setPredicate('executorId', data.value as string);
     }

    return(
        <Segment clearing>
              <Header icon='filter' color='teal' content='Filters' />
            <Checkbox style={{margin:'1em'}}
                    toggle 
                    label='All Tasks' 
                    checked={predicate.has('all')}
                    onChange={(e, data) => { data.checked && setPredicate('all', data.checked.valueOf.toString()) }} />

            <Input  style={{margin:'1em'}} fluid
                    icon={{ 
                        name: 'search', 
                        circular: true, 
                        link: true,
                        onClick:()=>handleClick('title'),
                        placeholder:'Search...'  }}
                    onChange={(e) => {e.target.value && setTarget(e.target.value)}}
                    value={target}
                    placeholder='Title'
                />
            <Select  style={{margin:'1em'}} options={categoryStore.options} placeholder='Category' 
            onChange={handleCategoryChange} />
            <Select style={{margin:'1em'}} options={executorStore.options} placeholder='Executor' 
            onChange={handleExecutorChange} />
        </Segment>
        
    )

}