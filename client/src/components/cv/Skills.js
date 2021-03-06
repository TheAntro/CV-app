import React from 'react'
import PropTypes from 'prop-types'

const Skills = ({
  skills: { mainSkills, otherSkills, description }
}) => {
  return (
    <div>
      <p>{ description }</p>
      <p>{ mainSkills.join(', ') }</p>
      <p>{ otherSkills.join(', ') }</p>
    </div>
  )
}

Skills.propTypes = {
  skills: PropTypes.object.isRequired,
}

export default Skills
