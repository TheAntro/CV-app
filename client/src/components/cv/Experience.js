import React from 'react'
import PropTypes from 'prop-types'
import ExperienceItem from './ExperienceItem'

const Experience = ({ experiences }) => (
  <div class="card mt-2">
    <div class="card-header">
      Työkokemus
    </div>
    <ul class="list-group list-group-flush">
      {experiences.map(experience => (
        <ExperienceItem key={experience._id} experience={experience} />
      ))}
    </ul>
  </div>
);


Experience.propTypes = {
  experiences: PropTypes.array.isRequired,
}

export default Experience
