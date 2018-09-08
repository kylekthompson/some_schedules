function rgba(red, green, blue, alpha) {
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function black(alpha = 1) {
  return rgba(0, 0, 0, alpha); // #000000
}

function darkRackleyBlue(alpha = 1) {
  return rgba(0, 61, 93, alpha); // #003D5D
}

function eerieBlack(alpha = 1) {
  return rgba(12, 27, 42, alpha); // #0D1B2A
}

function gainsboroWhite(alpha = 1) {
  return rgba(224, 225, 221, alpha); // #E0E1DD
}

function graniteGray(alpha = 1) {
  return rgba(101, 101, 101, alpha); // #656565
}

function lightRackleyBlue(alpha = 1) {
  return rgba(172, 214, 254, alpha); // #ACD6FE
}

function portlandOrange(alpha = 1) {
  return rgba(244, 96, 54, alpha); // #F46036
}

function rackleyBlue(alpha = 1) {
  return rgba(91, 133, 170, alpha); // #5B85AA
}

function white(alpha = 1) {
  return rgba(255, 255, 255, alpha); // #FFFFFF
}

export default {
  black,
  darkRackleyBlue,
  eerieBlack,
  gainsboroWhite,
  graniteGray,
  lightRackleyBlue,
  portlandOrange,
  rackleyBlue,
  white,
};
