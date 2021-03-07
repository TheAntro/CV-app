import React from 'react'
import PropTypes from 'prop-types'

const Personal = ({ profile: {
  name,
  address,
  email,
  phone,
  social,
}}) => {
  return (
    <div>
      <p>{ name }</p>
      <p>{ address.street }, { address.zipcode } { address.city }</p>
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
