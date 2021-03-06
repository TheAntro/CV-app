import React from 'react'
import PropTypes from 'prop-types'

const Personal = ({ profile: {
  name,
  email,
  phone,
  social,
}}) => {
  return (
    <div>
      <p>{ name }</p>
      <p>{ email }</p>
      <p>{ phone }</p>
      <p> { social.linkedin } </p>
      <p> { social.github } </p>
      <p> { social.scholar } </p>
    </div>
  )
}

Personal.propTypes = {
  profile: PropTypes.object.isRequired
}

export default Personal
