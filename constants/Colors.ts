const tintColorLight = 'hsl(138, 37%, 38%)';
const waringColor = 'hsl(10, 37%, 38%)';
const tintColorDark = '#fff';

const textColor = 'hsl(138, 15%, 12%)';
const textColorLight = 'hsl(138, 15%, 42%)';

const backgroundColor = 'hsl(0, 0%, 97%)';

export default {
  light: {
    text: textColor,
    textLight: textColorLight,
    background: backgroundColor,
    tint: tintColorLight,
    tabIconSelected: tintColorLight,
    warning: waringColor,
  },
  dark: {
    text: '#fff',
    textLight: textColorLight,
    background: '#000',
    tint: tintColorDark,
    tabIconSelected: tintColorDark,
    warning: waringColor,
  },
};
