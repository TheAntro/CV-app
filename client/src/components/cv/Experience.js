import React from 'react'
import PropTypes from 'prop-types'

const Experience = ({
  experience: { company, title, from, to, description }
}) => (
  <div class="card-body">
    <h5 class="card-title">{ company }</h5>
    <p class="card-text">{ title }</p>
    <p class="card-text">{ from }{ to ? ' - '.concat(to) : '' }</p>
    <p class="card-text">{ description }</p>
  </div>
);


Experience.propTypes = {
  experience: PropTypes.object.isRequired,
}

export default Experience
