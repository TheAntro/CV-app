import React from 'react'
import PropTypes from 'prop-types'

const Reference = ({
  reference: { name, title, phone, email, company }
}) => (
  <div>
    <p>{ name }. { title }, { company }. { email }, { phone }.</p>
  </div>
);


Reference.propTypes = {
  reference: PropTypes.object.isRequired,
}

export default Reference
