module.exports = {
    "env": {
        "browser": true,
        "commonjs": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 6
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        'no-console': 'off',
        'no-undef': 'off',
        'indent' : 'off',
        "linebreak-style": 'off', // windows and linux are different
        'no-unused-vars': 'off',
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};