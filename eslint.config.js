import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";
import customEslintRules from 'eslint-plugins-customEslintRules-plugin/index.js';

export default [
    {
        languageOptions: { globals: globals.browser },
        plugins: {
            customEslintRules: customEslintRules,
          },
          rules: {
            'customEslintRules/spyOnAndMockRule': 'error',
          },
    },
   // pluginJs.configs.recommended,
   // ...fixupConfigRules(pluginReactConfig)

];