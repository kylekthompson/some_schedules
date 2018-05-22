function rgba(red, green, blue, alpha) {
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function bahamaBlue(alpha = 1) {
  return rgba(4, 110, 143, alpha); // #046E8F
}

function black(alpha = 1) {
  return rgba(0, 0, 0, alpha); // #000000
}

function catskillWhite(alpha = 1) {
  return rgba(241, 245, 249, alpha); // #F1F5F9
}

function darkGrey(alpha = 1) {
  return rgba(51, 51, 51, alpha); // #333333
}

function lightGrey(alpha = 1) {
  return rgba(224, 224, 224, alpha); // #E0E0E0
}

function shakespeareBlue(alpha = 1) {
  return rgba(56, 174, 204, alpha); // #38AECC
}

function stilettoRed(alpha = 1) {
  return rgba(156, 51, 54, alpha); // #9C3336
}

function white(alpha = 1) {
  return rgba(255, 255, 255, alpha); // #FFFFFF
}

export default {
  bahamaBlue,
  black,
  catskillWhite,
  darkGrey,
  lightGrey,
  shakespeareBlue,
  stilettoRed,
  white,
};
