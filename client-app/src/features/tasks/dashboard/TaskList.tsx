import { observer } from 'mobx-react-lite';
import { Item, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import TaskListItem from './TaskListItem';

interface Props{
    status: number;
}

export default observer(function TaskList({status}: Props){
    const {taskStore} = useStore();
    return (
        <Segment>
            <Item.Group divided>
                {taskStore.tasksByDate.filter(t => t.status === status).map(task => (
                    <TaskListItem key={task.id} task={task} status={status} />
                ))}
            </Item.Group>
        </Segment>

    )
})