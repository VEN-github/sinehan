// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 5
          },
          multiline: 3
        }
      ],
      'vue/html-button-has-type': [
        'error',
        {
          button: true,
          submit: true,
          reset: true
        }
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'any',
            normal: 'any',
            component: 'any'
          },
          svg: 'always',
          math: 'always'
        }
      ],
      'vue/singleline-html-element-content-newline': 'off'
    }
  }
)
  .override('nuxt/stylistic', {
    rules: {
      '@stylistic/comma-dangle': 'off',
      '@stylistic/brace-style': 'off'
    }
  })
  .override('nuxt/typescript/rules', {
    ignores: ['tailwind.config.ts']
  })
