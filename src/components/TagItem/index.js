import './index.css'

const TagItem = props => {
  const {tagDetails, filterTag, isActive} = props
  const {optionId, displayText} = tagDetails

  const onClickTag = () => {
    filterTag(optionId)
  }

  const tagButtonClass = isActive ? 'active-btn tag-btn' : 'tag-btn'

  return (
    <li className="tag-item-container">
      <button type="button" onClick={onClickTag} className={tagButtonClass}>
        {displayText}
      </button>
    </li>
  )
}

export default TagItem
