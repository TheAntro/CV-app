const httpMocks = require('node-mocks-http');
const Profile = require('../../models/Profile');
const ProfilesController = require('../../controllers/profiles');
const ProfilesService = require('../../services/profiles');
const newProfile = require('../mock-data/new-profile.json');

const profileId = '60156119b6c1c64310a61a0a';
const nonValidId = '60156119b6c1c64310a61a0';
const nonAuthEmail = 'nonauth@gmail.com';

// Mock model
jest.mock('../../models/Profile', () => jest.fn());
const populate = jest.fn();
const save = jest.fn();
Profile.findById = jest.fn();
Profile.find = jest.fn();
Profile.findByIdAndUpdate = jest.fn();
Profile.mockImplementation(() => ({ populate }));
Profile.mockImplementation(() => ({ save }));

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

  test('should return profiles in an array in res.body.data', async () => {
    Profile.find.mockReturnValue([newProfile]);
    await ProfilesController.getProfiles(req, res);
    res.body = res._getJSONData();
    expect(Array.isArray(res.body.data)).toBeTruthy();
    expect(res.body.data[0].name).toBe(newProfile.name);
  })
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

  test('should return 404 when the profile is not found', async () => {
    ProfilesService.getProfileByIdAndPopulate.mockReturnValue(null);
    await ProfilesController.getProfile(req, res);
    expect(res.statusCode).toBe(404);
  });
});

describe('ProfilesController.createProfile', () => {
  beforeEach(() => {
    req.body = newProfile;
  });

  test('should have a createProfile function', () => {
    expect(typeof ProfilesController.createProfile).toBe('function');
  });

  test('should call save and return 201 when user without a profile creates a profile', async () => {
    req.user = {};
    req.user.email = newProfile.email;
    Profile.findById.mockReturnValue(null);
    await ProfilesController.createProfile(req, res);
    expect(save).toHaveBeenCalled();
    expect(res.statusCode).toBe(201);
  });

  test('should call findByIdAndUpdate and return 200 when called by a user with a profile', async () => {
    req.user = {};
    req.user.email = newProfile.email;
    Profile.findById.mockReturnValue(newProfile);
    await ProfilesController.createProfile(req, res);
    expect(Profile.findByIdAndUpdate).toHaveBeenCalled();
    expect(res.statusCode).toBe(200);
  });

  test('should return 403 when called by non-authorized user', async () => {
    req.user = {};
    req.user.email = nonAuthEmail;
    await ProfilesController.createProfile(req, res);
    expect(res.statusCode).toBe(403);
    expect(res._isEndCalled()).toBeTruthy();
  });

  test('should call save and return 201 when admin creates a new profile', async () => {
    req.user = {};
    req.user.role = 'admin';
    Profile.findById.mockReturnValue(null);
    await ProfilesController.createProfile(req, res);
    expect(save).toHaveBeenCalled();
    expect(res.statusCode).toBe(201);
  });
});

describe('ProfilesController.deleteProfile', () => {
  test('should have a deleteProfile function', () => {
    expect(typeof ProfilesController.deleteProfile).toBe('function');
  });
});
