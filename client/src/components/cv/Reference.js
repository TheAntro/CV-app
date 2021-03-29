import React from 'react'
import PropTypes from 'prop-types'
import ReferenceItem from './ReferenceItem'

const Reference = ({ references }) => (
  <div class="card mt-2">
    <div class="card-header">
      Suosittelijat
    </div>
    <ul class="list-group list-group-flush">
      {references.map(reference => (
          <ReferenceItem key={reference._id} reference={reference} />
      ))}
    </ul>
  </div>
  
);


Reference.propTypes = {
  references: PropTypes.array.isRequired,
}

export default Reference
