```javascript
var getForm = require('commonform-get-form')
var assert = require('assert')

getForm(
  'commonform.org',
  'kemitchell',
  'test',
  '1e',
  function (error, form) {
    assert.deepStrictEqual(
      form,
      { content: ['This form is used for testing commonform.org.'] }
    )
  }
)

getForm(
  'commonform.org',
  'kemitchel',
  'nonexistent',
  '1e',
  function (error, form) {
    assert.equal(form, false)
  }
)
```
