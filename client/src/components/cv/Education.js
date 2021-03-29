import React from 'react'
import PropTypes from 'prop-types'
import EducationItem from './EducationItem'

const Education = ({ educations }) => (
  <div class="card mt-2">
    <div class="card-header">
      Koulutus
    </div>
    <ul class="list-group list-group-flush">
      {educations.map(education => (
        <EducationItem key={education._id} education={education} />
      ))}
    </ul>
  </div>
)

Education.propTypes = {
  educations: PropTypes.array.isRequired,
}

export default Education
