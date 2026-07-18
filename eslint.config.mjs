import withNuxt from './.nuxt/eslint.config.mjs';
import { nuxt } from '@qstanay/eslint-config/nuxt';

export default withNuxt(
  ...nuxt({
    stylistic: {
      semi: true,
      quotes: 'single',
      indent: 2,
      maxLen: 100,
    },
  }),
);
