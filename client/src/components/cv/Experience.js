import React from 'react'
import PropTypes from 'prop-types'

const Experience = ({
  experience: { company, title, from, to, description }
}) => (
  <div>
    <h3>{ company }</h3>
    <p>{ title }</p>
    <p>{ from }{ to ? ' - '.concat(to) : '' }</p>
    <p>{ description }</p>
  </div>
);


Experience.propTypes = {
  experience: PropTypes.object.isRequired,
}

export default Experience
