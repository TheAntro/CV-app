const httpMocks = require('node-mocks-http');
const Profile = require('../../models/Profile');
const ProfilesController = require('../../controllers/profiles');
const ProfilesService = require('../../services/profiles');
const newProfile = require('../mock-data/new-profile.json');

const profileId = '60156119b6c1c64310a61a0a';
const nonValidId = '60156119b6c1c64310a61a0';
const nonAuthEmail = 'nonauth@gmail.com';

// Mock model
jest.mock('../../models/Profile');

// Mock populate virtual for object
newProfile.populate = jest.fn();

// Mock services
ProfilesService.getProfileByIdAndPopulate = jest.fn();

// Global http mock variables
let req, res, next;
// Reset http mock variables before each test
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('ProfilesController.getProfiles', () => {
  test('should have a getProfiles function', () => {
    expect(typeof ProfilesController.getProfiles).toBe('function');
  });

  test('should call Profile.find()', async () => {
    await ProfilesController.getProfiles(req, res);
    expect(Profile.find).toHaveBeenCalledWith();
  });
});

describe('ProfilesController.getProfile', () => {
  test('should have a getProfile function', () => {
    expect(typeof ProfilesController.getProfile).toBe('function');
  });

  test('should call ProfileService.getProfileIdAndPopulate with id', async () => {
    req.params.id = profileId;
    Profile.findById.mockReturnValue(newProfile);
    await ProfilesController.getProfile(req, res);
    expect(ProfilesService.getProfileByIdAndPopulate).toHaveBeenCalledWith(
      profileId
    );
  });
});

describe('ProfilesController.createProfile', () => {
  beforeEach(() => {
    req.body = newProfile;
  });

  test('should have a createProfile function', () => {
    expect(typeof ProfilesController.createProfile).toBe('function');
  });

  test('should return 403 when called by non-authorized user', async () => {
    req.user = {};
    req.user.email = nonAuthEmail;
    await ProfilesController.createProfile(req, res);
    expect(res.statusCode).toBe(403);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe('ProfilesController.deleteProfile', () => {
  test('should have a deleteProfile function', () => {
    expect(typeof ProfilesController.deleteProfile).toBe('function');
  });
});
