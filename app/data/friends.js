// ===============================================================================
// DATA
// Below data will hold all of the friends.
// Initially we just set it equal to a "dummy" friend.
// But you could have it be an empty array as well.
// ===============================================================================
var friendArray = [
  {
    name:"Dennis",
    photo:"https://dcyttw.github.io/Basic-Portfolio/assets/images/photo-200-320.jpg",
    scores:[
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ]
  }
];
// Note how we export the array. This makes it accessible to other files using require.
module.exports = friendArray;