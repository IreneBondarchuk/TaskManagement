import React, { useState } from 'react'
import { Checkbox, Header, Input, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'

export default function ExecutorFilters(){
    const {executorStore: {predicate, setPredicate}} = useStore()
    const[target, setTarget] = useState('')


    function handleClick() {
        console.log(target);
        setPredicate('surname', target)
      }

    return(
        <Segment clearing>
              <Header icon='filter' color='teal' content='Filters' />
            <Checkbox style={{margin:'1em'}}
                    toggle 
                    label='All Executors' 
                    checked={predicate.has('all')}
                    onChange={(e, data) => { data.checked && setPredicate('all', data.checked.valueOf.toString()) }} />
             <Checkbox  style={{margin:'1em'}}
                    toggle 
                    label='Has Active Tasks' 
                    checked={predicate.has('hasActiveTasks')}
                    onChange={(e, data) => {data.checked && setPredicate('hasActiveTasks', data.checked.valueOf.toString())
                    }}
                    />

            <Input  style={{margin:'1em'}}
                    icon={{ 
                        name: 'search', 
                        circular: true, 
                        link: true,
                        onClick:handleClick,
                        placeholder:'Search...'  }}
                    onChange={(e) => {setTarget(e.target.value)}}
                    value={target}
                    placeholder='Display Name'
                />
   
        </Segment>
        
    )

}