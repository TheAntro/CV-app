import React from 'react'
import PropTypes from 'prop-types'

const Reference = ({
  reference: { name, title, phone, email, company }
}) => (
  <div class="card-body">
    <p class="card-text">{ name }. { title }, { company }. { email }, { phone }.</p>
  </div>
);


Reference.propTypes = {
  reference: PropTypes.object.isRequired,
}

export default Reference
