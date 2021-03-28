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
    <div class="card-body">
      <h5 class="card-title">{ name }</h5>
      <p class="card-subtitle mb-2 text-muted">{ email }</p>
      <p class="card-subtitle mb-2 text-muted">{ phone }</p>
      <p class="card-subtitle mb-2 text-muted">{ address.city }</p>
      <p class="card-text"><a href="#" class="fa fa-linkedin"></a> { social.linkedin } </p>
      <p class="card-text"><a href="#" class="fa fa-github"></a> { social.github } </p>
      <p class="card-text"><a href="#" class="fa fa-google"></a> { social.scholar } </p>
    </div>
  )
}

Personal.propTypes = {
  profile: PropTypes.object.isRequired
}

export default Personal
