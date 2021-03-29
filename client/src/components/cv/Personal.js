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
    <div class="card">
      <div class="card-header">
        Yhteystiedot
      </div>
      <div class="card-body">
      <h5 class="card-title">{ name }</h5>
      <p class="card-subtitle mb-2 text-muted">{ email }</p>
      <p class="card-subtitle mb-2 text-muted">{ phone }</p>
      <p class="card-subtitle mb-2 text-muted">{ address.city }</p>
      <p class="card-text">
        <a href={ social.linkedin } target="_blank" rel="noreferrer" class="fa fa-linkedin text-decoration-none"> </a> &nbsp;
        <a href={ social.github } target="_blank" rel="noreferrer" class="fa fa-github text-decoration-none"> </a> &nbsp;
        <a href={ social.scholar } target="_blank" rel="noreferrer" class="fa fa-google text-decoration-none"> </a> </p>
      </div>
    </div>
  )
}

Personal.propTypes = {
  profile: PropTypes.object.isRequired
}

export default Personal
