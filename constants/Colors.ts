import useColorScheme from '../hooks/useColorScheme';

const textColorBlack = 'hsl(140, 15%, 12%)';
const textColorGray = 'hsl(140, 4%, 52%)';

const backgroundColor = 'hsl(0, 0%, 97%)';

const accentColorBasic = 'hsl(137, 37%, 26%)';
const accentColorLight = 'hsl(139, 15%, 42%)';

const waringColor = 'hsl(10, 37%, 38%)';

export interface Colors {
  textBlack: string;
  textGray: string;
  background: string;
  accentBasic: string;
  accentLight: string;
  warning: string;
}

export const colorPallettes: { light: Colors; dark: Colors } = {
  light: {
    textBlack: textColorBlack,
    textGray: textColorGray,
    background: backgroundColor,
    accentBasic: accentColorBasic,
    accentLight: accentColorLight,
    warning: waringColor,
  },
  dark: {
    textBlack: textColorBlack,
    textGray: textColorGray,
    background: backgroundColor,
    accentBasic: accentColorBasic,
    accentLight: accentColorLight,
    warning: waringColor,
  },
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const colors = colorPallettes[useColorScheme()];
