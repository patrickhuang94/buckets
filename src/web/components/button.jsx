import React from 'react'
import classNames from 'classnames'

const Button = ({ onClick, title, className, style, fill = 'white', color, isSelected }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(`button--transparent`, {
        [`button--${fill}`]: fill,
        'button--selected': isSelected,
      })}
      style={style}
    >
      <span style={{ color: color }}>{title}</span>
    </button>
  )
}

export default Button
