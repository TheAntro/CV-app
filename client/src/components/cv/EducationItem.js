import React from 'react'
import PropTypes from 'prop-types'

const EducationItem = ({
  education: { school, degree, major, minors, from, to }
}) => (
  <li class="list-group-item">
    <h5 class="card-title">{ school }</h5>
    <p class="card-text">{ degree }</p>
    <p class="card-text">{ from }{ to ? ' - '.concat(to) : '' }</p>
    <p class="card-text">{ major }  </p>
    <p class="card-text">{ minors.join(', ')}</p>
  </li>
)

EducationItem.propTypes = {
  education: PropTypes.object.isRequired,
}

export default EducationItem
