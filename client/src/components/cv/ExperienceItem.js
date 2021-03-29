import React from 'react'
import PropTypes from 'prop-types'

const ExperienceItem = ({
  experience: { company, title, from, to, description }
}) => (
  <li class="list-group-item">
    <h5 class="card-title">{ company }</h5>
    <p class="card-text">{ title }</p>
    <p class="card-text">{ from }{ to ? ' - '.concat(to) : '' }</p>
    <p class="card-text">{ description }</p>
  </li>
);


ExperienceItem.propTypes = {
  experience: PropTypes.object.isRequired,
}

export default ExperienceItem