// Typography

import { TextStyle } from 'react-native';

/*
 * 100 - Thin
 * 200 - Extra Light (Ultra Light)
 * 300 - Light
 * 400 - Normal
 * 500 - Medium
 * 600 - Semi Bold (Demi Bold)
 * 700 - Bold
 * 800 - Extra Bold (Ultra Bold)
 * 900 - Black (Heavy)
 */
type TypographyStyles =
  | 'title_1'
  | 'title_2'
  | 'title_3'
  | 'subtitle_1'
  | 'subtitle_2'
  | 'body_1'
  | 'body_2'
  | 'caption_1'
  | 'caption_2';

export const Typography: { [Key in TypographyStyles]: TextStyle } = {
  title_1: {
    fontSize: 28.8,
    fontWeight: '700',
    lineHeight: 1.44 * 28.8,
  },
  title_2: {
    fontSize: 25.63,
    fontWeight: '600',
    lineHeight: 1.2 * 25.63,
  },
  title_3: {
    fontSize: 22.78,
    fontWeight: '500',
    lineHeight: 1.16 * 22.78,
  },

  body_1: {
    fontSize: 16.0,
    fontWeight: '400',
    lineHeight: 1 * 16.0,
  },
  body_2: {
    fontSize: 14.2,
    fontWeight: '400',
    lineHeight: 1 * 14.2,
  },

  subtitle_1: {
    fontSize: 20.26,
    fontWeight: '500',
    lineHeight: 1.2 * 20.26,
  },
  subtitle_2: {
    fontSize: 18.0,
    fontWeight: '500',
    lineHeight: 1.12 * 18.0,
  },

  caption_1: {
    fontSize: 12.6,
    fontWeight: '400',
    lineHeight: 1 * 12.6,
  },
  caption_2: {
    fontSize: 11.2,
    fontWeight: '400',
    lineHeight: 1 * 11.2,
  },
};
