```javascript
var getForm = require('commonform-get-form')
var assert = require('assert')

var testForm = (
  '543cd5e172cfc6b3c20a0d91855fea44' +
  'b5bf2fd1da7bf6b7c69f95d6e2705c37'
)

getForm('api.commonform.org', testForm, function (error, form) {
  assert.deepStrictEqual(
    form, {content: ['This is a test form.']}
  )
})

var nonexistent = (
  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
)

getForm('api.commonform.org', nonexistent, function (error, form) {
  assert.equal(form, false)
})
```
