module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "prettier",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
            "impliedStrict": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "babel",
        "react",
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": ["error", "unix"],
        "no-console": [
        "warn",
        {
            "allow": ["error"]
        }
        ],
        "quotes": [
        "warn",
        "single",
        {
            "avoidEscape": true
        }
        ],
        "semi": ["error", "always"],
        "no-unused-vars": "warn",
        "no-undef": "warn",
        "prefer-template": "error",
        "global-require": "warn",
        "react/jsx-first-prop-new-line": ["error", "multiline"]
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
};