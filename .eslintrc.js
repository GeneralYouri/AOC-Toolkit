module.exports = {
    root: true,
    extends: 'airbnb-base',
    plugins: ['jest'],
    env: {
        es2021: true,
        jest: true,
        node: true,
    },
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    rules: {
        // Allow debugger and console during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',


        // Simple function bodies can sometimes still be complex enough to benefit of the extra readability provided by a simple newline
        'arrow-body-style': 'off',

        // Unnecessary brackets are only a nuisance for the reader; single-argument parens are more elegant without them
        'arrow-parens': ['error', 'as-needed', {
            requireForBlockBody: true,
        }],

        // I use 4-space indents; `switch` `case`s without indent look really weird
        indent: ['error', 4, {
            SwitchCase: 1,
        }],

        // Allows single-line class property definitions to be grouped
        'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],

        // Sometimes it makes sense to group subclasses or specialty classes together with their base class or user class respectively
        'max-classes-per-file': 'off',

        // Line length limits are unproductive
        'max-len': 'off',

        // As ESLint themselves already note, there are plenty of cases where iterations are not independent, in which case `await` should be allowed
        'no-await-in-loop': 'off',

        // Even AirBnB themselves allow this, just use with caution
        'no-bitwise': 'off',

        // There are plenty of cases where break conditions can't be neatly fit inside the loop condition itself, and must be added within the loop body instead
        'no-constant-condition': 'off',

        // Another rule not specified by AirBnB themselves; continues are useful to prevent excessive tabbing and separate logic
        'no-continue': 'off',

        // In some cases it can be more logical to use an else return, allow both styles
        'no-else-return': 'off',

        // For multi-level if/else statements, sometimes it makes more sense keeping the nest levels separate like that
        'no-lonely-if': 'off',

        // This seems like a stupid rule to enable; it disables simple anonymous functions and arrow functions, even when only used as callback
        'no-loop-func': 'off',

        // Operator precedence is a thing for a reason; unnecessary brackets are only a nuisance for the reader
        'no-mixed-operators': 'off',

        // Empty lines can at times be used to better separate different parts of code
        'no-multiple-empty-lines': ['error', {
            max: 2,
            maxBOF: 0,
            maxEOF: 0,
        }],

        // This rule sounds good in theory, but there are too many exceptions where reassignment is wanted/needed, and the whitelist doesn't suffice
        'no-param-reassign': 'off',

        // While return assignments can be confusing, they can also sometimes help simplify syntax, and parens help show this intent
        'no-return-assign': ['error', 'except-parens'],

        // When using Babel to leverage the latest ES features, for .. of is no exception
        'no-restricted-syntax': 'off',

        // There are too many cases that should be allowed (such as "protected" class properties), which the options don't properly cover
        'no-underscore-dangle': 'off',

        // Allow all unused function arguments; at times these can help clarity when other means are lacking
        'no-unused-vars': ['error', {
            vars: 'all',
            args: 'none',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
        }],

        // Increase the number of properties allowed in a single line object definition
        'object-curly-newline': ['error', {
            minProperties: 6,
            multiline: true,
            consistent: true,
        }],

        // This just leads to inconsistencies about where the index/property is selected
        'prefer-destructuring': 'off',

        // In some cases, regular string concatenation still looks and feels superior, too bad there are no options to fine-tune this rule
        'prefer-template': 'off',


        // Toolkit files can have varying amounts of features (even 1), in which case we don't want a default export at all
        'import/prefer-default-export': 'off',

        /** @see https://github.com/airbnb/javascript#modules--no-webpack-loader-syntax */
        'import/no-webpack-loader-syntax': 'error',
    },
};
