// SPDX-License-Identifier: MIT

// 1️⃣ Save UserProfile to the mapping in the setProfile() function
// HINT: don't forget to set the _displayName and _bio

pragma solidity ^0.8.0;

contract Profile {
    struct UserProfile {
        string displayName;
        string bio;
    }

    mapping(address => UserProfile) public profiles;

  

    function setProfile(string memory name, string memory bio) public {
        UserProfile memory newUser = UserProfile({displayName: name, bio: bio});

        profiles[msg.sender] = newUser;
    }

      function getProfile(address _user)
        public
        view
        returns (UserProfile memory)
    {
        return profiles[_user];
    }
}
