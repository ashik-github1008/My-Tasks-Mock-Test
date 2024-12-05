import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

import TagItem from '../TagItem/index'
import TaskItem from '../TaskItem/index'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    taskInputValue: '',
    tagValue: tagsList[0].optionId,
    taskList: [],
    activeTagId: '',
  }

  onChangeTask = event => {
    this.setState({taskInputValue: event.target.value})
  }

  changeTag = event => {
    this.setState({tagValue: event.target.value})
  }

  filterTag = optionId => {
    const {activeTagId} = this.state
    if (optionId === activeTagId) {
      this.setState({activeTagId: ''})
    } else {
      this.setState({
        activeTagId: optionId,
      })
    }
  }

  submitForm = event => {
    const {taskInputValue, tagValue} = this.state

    event.preventDefault()
    this.setState(prevState => ({
      taskList: [
        ...prevState.taskList,
        {id: uuidv4(), taskName: taskInputValue, tagName: tagValue},
      ],
      taskInputValue: '',
      tagValue: tagsList[0].optionId,
    }))
  }

  render() {
    const {taskInputValue, tagValue, activeTagId, taskList} = this.state
    const filteredTasks =
      activeTagId === ''
        ? taskList
        : taskList.filter(eachTask => eachTask.tagName === activeTagId)

    return (
      <div className="app-container">
        <div className="first-container">
          <h1>Create a task!</h1>
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="input-container">
              <label htmlFor="task">Task</label>
              <input
                onChange={this.onChangeTask}
                value={taskInputValue}
                type="text"
                id="task"
                placeholder="Enter the task here"
              />
            </div>
            <div className="input-container">
              <label htmlFor="tag">Tags</label>
              <select value={tagValue} onChange={this.changeTag} id="tag">
                {tagsList.map(eachTag => (
                  <option key={eachTag.optionId} value={eachTag.optionId}>
                    {eachTag.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit">Add Task</button>
          </form>
        </div>
        <div className="second-container">
          <h1>Tags</h1>
          <ul className="tag-list-container">
            {tagsList.map(eachTag => (
              <TagItem
                key={eachTag.optionId}
                tagDetails={eachTag}
                filterTag={this.filterTag}
                isActive={eachTag.optionId === activeTagId}
              />
            ))}
          </ul>
          <h1>Tasks</h1>
          {filteredTasks.length > 0 ? (
            <ul className="task-list-container">
              {filteredTasks.map(eachTask => (
                <TaskItem key={eachTask.id} taskDetails={eachTask} />
              ))}
            </ul>
          ) : (
            <p>No Tasks Added Yet</p>
          )}
        </div>
      </div>
    )
  }
}

export default MyTasks
