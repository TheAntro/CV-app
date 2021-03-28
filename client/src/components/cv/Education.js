import React from 'react'
import PropTypes from 'prop-types'

const Education = ({
  education: { school, degree, major, minors, from, to }
}) => (
  <div class="card-body">
    <h5 class="card-title">{ school }</h5>
    <p class="card-text">{ degree }</p>
    <p class="card-text">{ from }{ to ? ' - '.concat(to) : '' }</p>
    <p class="card-text">{ major }  </p>
    <p class="card-text">{ minors.join(', ')}</p>
  </div>
);


Education.propTypes = {
  education: PropTypes.object.isRequired,
}

export default Education
