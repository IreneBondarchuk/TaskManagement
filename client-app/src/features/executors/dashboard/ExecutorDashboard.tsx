import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import {  Button, Grid, Icon, Pagination, PaginationProps } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import ExecutorDetails from '../details/ExecutorDetails';
import ExecutorForm from '../form/ExecutorForm';
import ExecutorFilters from './ExecutorFilters';
import ExecutorList from './ExecutorList'


export default observer(function ExecutorDashboard(){
    const {executorStore} = useStore();
    const {loadExecutors, selectedExecutor, editMode,loadingInitial, executorRegistry, openForm, cancelSelectExecutor, filtering} = executorStore;
    const [loadingNext, setLoadingNext] = useState(false);
    const [activePage, setActivePage] = useState(1);

    useEffect(() => {
        if(executorRegistry.size <= 1) loadExecutors();
    }, [executorRegistry.size, loadExecutors])
    
    if(loadingInitial && !loadingNext && filtering) return <LoadingComponent content='Loading...' />


    function handleGetNext(event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps){
        setActivePage(data.activePage as number)
        setLoadingNext(true);
        executorStore.setPagingParams(new PagingParams(data.activePage as number));
        loadExecutors().then(() => setLoadingNext(false));
        cancelSelectExecutor();
        
    }


    return(
         
             <Grid>
            <Grid.Column width='10'>
            <Button onClick={() => openForm()} style={{ marginBottom:'1em',  marginRight:'5em'}}><Icon name='add user' /> Add Executor</Button>
            <Pagination
                    defaultActivePage={activePage}
                    firstItem={null}
                    lastItem={null}
                    pointing
                    secondary
                    totalPages={5}
                    onPageChange={(e, data) => handleGetNext(e, data)}
                />

            <ExecutorList />
            </Grid.Column>
            <Grid.Column width='4'>
            <ExecutorFilters />
                    {(selectedExecutor && !editMode) && <ExecutorDetails  />} 
                    {editMode && <ExecutorForm  />}
            </Grid.Column>
        </Grid>
        
    )
})