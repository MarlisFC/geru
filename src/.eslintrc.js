module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "mocha": true,
        "jest": true
    },    
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "plugins": [
        "react"
    ],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
          "arrowFunctions": true,
          "blockBindings": true,
          "classes": true,
          "defaultParams": true,
          "destructuring": true,
          "forOf": true,
          "generators": false,
          "modules": true,
          "objectLiteralComputedProperties": true,
          "objectLiteralDuplicateProperties": false,
          "objectLiteralShorthandMethods": true,
          "objectLiteralShorthandProperties": true,
          "spread": true,
          "superInFunctions": true,
          "templateStrings": true,
          "restParams": true,
          "jsx": true
        }
    },
    "rules": {
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/prop-types": 0,
        "react/no-string-refs": 0,
        "react/no-render-return-value": 0
    }
}
