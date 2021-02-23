const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add name'],
    },
    address: {
      street: {
        type: String,
        required: [true, 'Please add street address'],
      },
      zipcode: {
        type: String,
        required: [true, 'Please add zipcode'],
      },
      city: {
        type: String,
        required: [true, 'Please add city'],
      },
    },
    email: {
      type: String,
      match: [
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        'Please add a valid email',
      ],
      unique: [true, 'Profile with the email already exists'],
      required: [true, 'Please add an email']
    },
    phone: {
      type: String,
      maxlength: [16, 'Max length for phone number is 16 characters'],
    },
    social: {
      linkedin: String,
      github: String,
      scholar: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Cascade delete associated content when a profile is removed
ProfileSchema.pre('remove', async function (next) {
  console.log(`Content being removed from ${this._id}`);
  await this.model('Education').deleteMany({ profile: this._id });
  await this.model('Experience').deleteMany({ profile: this._id });
  await this.model('Reference').deleteMany({ profile: this._id });
  await this.model('Skill').deleteMany({ profile: this._id });
  next();
});

// Populate virtuals
ProfileSchema.virtual('education', {
  ref: 'education',
  localField: '_id',
  foreignField: 'profile',
  justOne: false,
});

ProfileSchema.virtual('experience', {
  ref: 'experience',
  localField: '_id',
  foreignField: 'profile',
  justOne: false,
});

ProfileSchema.virtual('reference', {
  ref: 'reference',
  localField: '_id',
  foreignField: 'profile',
  justOne: false,
});

ProfileSchema.virtual('skill', {
  ref: 'skill',
  localField: '_id',
  foreignField: 'profile',
  justOne: false,
});

module.exports = mongoose.model('profile', ProfileSchema);
