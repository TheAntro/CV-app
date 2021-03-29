import React from 'react'
import PropTypes from 'prop-types'

const ReferenceItem = ({
  reference: { name, title, phone, email, company }
}) => (
  <li class="list-group-item">
    <p class="card-text">{ name }. { title }, { company }. { email }, { phone }.</p>
  </li>
);


ReferenceItem.propTypes = {
  reference: PropTypes.object.isRequired,
}

export default ReferenceItem