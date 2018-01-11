const rgba = (red, green, blue, alpha) => `rgba(${red}, ${green}, ${blue}, ${alpha})`;

export default {
  // greys
  black: (alpha = 1) => rgba(0, 0, 0, alpha),                     // #000000
  darkGrey: (alpha = 1) => rgba(51, 51, 51, alpha),               // #333333
  lightGrey: (alpha = 1) => rgba(224, 224, 224, alpha),           // #E0E0E0
  catskillWhite: (alpha = 1) => rgba(241, 245, 249, alpha),       // #F1F5F9
  white: (alpha = 1) => rgba(255, 255, 255, alpha),               // #FFFFFF

  // colors
  bahamaBlue: (alpha = 1) => rgba(4, 110, 143, alpha),            // #046E8F
  shakespeareBlue: (alpha = 1) => rgba(56, 174, 204, alpha),      // #38AECC
};
