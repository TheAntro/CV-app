import React from 'react'
import PropTypes from 'prop-types'

const Skills = ({
  skills: { mainSkills, otherSkills, description }
}) => {
  return (
    <div class="card mt-2">
      <div class="card-header">
        Taidot
      </div>
      <div class="card-body">
        <p class="card-text">{ description }</p>
        <p class="card-text">Pääteknologiat: { mainSkills.join(', ') }</p>
        <p class="card-text">Muita: { otherSkills.join(', ') }</p>
      </div>
    </div>
  )
}

Skills.propTypes = {
  skills: PropTypes.object.isRequired,
}

export default Skills
