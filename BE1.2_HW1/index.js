const { initializeDatabase } = require('./db/db.connect');
const fs = require('fs');
const Profile = require('./models/profile.models');
initializeDatabase();

const jsonData = fs.readFileSync('./profiles.json', 'utf-8');
const profileData = JSON.parse(jsonData);

// console.log(profileData.length);
function seedData() {
  try {
    for (const profileDetails of profileData) {
      const newProfile = new Profile({
        fullName: profileDetails.fullName,
        username: profileDetails.username,
        bio: profileDetails.bio,
        profilePicUrl: profileDetails.profilePicUrl,
        followingCount: profileDetails.followingCount,
        followerCount: profileDetails.followerCount,
        companyName: profileDetails.companyName,
        location: profileDetails.location,
        portfolioUrl: profileDetails.portfolioUrl,
      });
      // console.log(newProfile.fullName);
      newProfile.save();
    }
  } catch (error) {
    console.log('Error seeding the data', error);
  }
}

seedData();
