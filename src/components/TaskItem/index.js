import './index.css'

const TaskItem = props => {
  const {taskDetails} = props
  const {id, taskName, tagName} = taskDetails
  return (
    <li className="task-item-container">
      <p>{taskName}</p>
      <p>{tagName}</p>
    </li>
  )
}

export default TaskItem
