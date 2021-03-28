import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Personal from './Personal';
import Skills from './Skills';
import Education from './Education';
import Experience from './Experience';
import Reference from './Reference';
import Spinner from '../Spinner';

const Profile = ({ getProfileById, profile: { profile }, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id])
  return (
    <div class="container mt-5 mb-5">
      {profile === null ? <Spinner /> : <div class="card">
        <Personal profile={ profile } />
        <hr/>
        <Skills skills={ profile.skill[0] } />
        <hr/>
        {profile.education.map(education => (
          <Fragment>
            <Education key={education._id} education={education} />
            <hr/>
          </Fragment>
        ))}
        {profile.experience.map(experience => (
          <Fragment>
            <Experience key={experience._id} experience={experience} />
            <hr/>
          </Fragment>
        ))}
        {profile.reference.map(reference => (
          <Reference key={reference._id} reference={reference} />
        ))}
      </div>}
    </div>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfileById })(Profile);
