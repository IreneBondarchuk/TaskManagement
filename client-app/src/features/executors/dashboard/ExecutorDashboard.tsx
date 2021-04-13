import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Button, Grid, Sticky } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import ExecutorDetails from '../details/ExecutorDetails';
import ExecutorForm from '../form/ExecutorForm';
import ExecutorList from './ExecutorList'


export default observer(function ExecutorDashboard(){
    const {executorStore} = useStore();
    const {loadExecutors, selectedExecutor, editMode, setPagingParams, pagination, loadingInitial, executorRegistry} = executorStore;
    const [loadingNext, setLoadingNext] = useState(false);

    useEffect(() => {
        if(executorRegistry.size <= 1) loadExecutors();
    }, [executorRegistry.size, loadExecutors])
    
    if(loadingInitial && !loadingNext) return <LoadingComponent content='Loading...' />


    function handleGetNext(){
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadExecutors().then(() => setLoadingNext(false));
    }

    return(
        <Grid>
            <Grid.Column width='10'>
                <ExecutorList />
                <Button 
                floated='right'
                content='more...'
                positive
                onClick={handleGetNext}
                loading={loadingNext}
                disabled={pagination?.totalPages === pagination?.currentPage}
                />
            </Grid.Column>
            <Grid.Column width='4'>
                <Sticky>
                    {(selectedExecutor && !editMode) && <ExecutorDetails  />} 
                    {editMode && <ExecutorForm  />}

                </Sticky>   
            </Grid.Column>
        </Grid>
    )
})