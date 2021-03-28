import React from 'react'
import PropTypes from 'prop-types'

const Skills = ({
  skills: { mainSkills, otherSkills, description }
}) => {
  return (
    <div class="card-body">
      <p class="card-text">{ description }</p>
      <p class="card-text">{ mainSkills.join(', ') }</p>
      <p class="card-text">{ otherSkills.join(', ') }</p>
    </div>
  )
}

Skills.propTypes = {
  skills: PropTypes.object.isRequired,
}

export default Skills
