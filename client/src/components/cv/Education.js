import React from 'react'
import PropTypes from 'prop-types'

const Education = ({
  education: { school, degree, major, minors, from, to }
}) => (
  <div>
    <h3>{ school }</h3>
    <p>{ degree }</p>
    <p>{ from }{ to ? ' - '.concat(to) : '' }</p>
    <p>{ major }  </p>
    <p>{ minors.join(', ')}</p>
  </div>
);


Education.propTypes = {
  education: PropTypes.object.isRequired,
}

export default Education
