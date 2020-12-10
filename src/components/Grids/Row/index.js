import React from 'react'
import PropTypes from 'prop-types'

import './index.css'


const Row = ({
  children,
  className = '',
  noGutters = false,
  verticalPadding,
  topPadding,
  bottomPadding,
  bddmark = 'строка',
  ...other
}) => {
  const style = {
    paddingTop: `${verticalPadding || topPadding}px`,
    paddingBottom: `${verticalPadding || bottomPadding}px`,
  }

  return (
    <div
      {...other}
      style={style}
      className={`aa-Row ${noGutters ? 'aa-Row_noGutters' : ''} ${className}`}
      bddmark={bddmark}
    >
      {children}
    </div>
  )
}

Row.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.array]).isRequired,
  className: PropTypes.string,
  noGutters: PropTypes.bool,
  verticalPadding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  topPadding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bottomPadding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bddmark: PropTypes.string,
}

export default Row