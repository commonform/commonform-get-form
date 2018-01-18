/* Copyright 2016 Kyle E. Mitchell
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you
 * may not use this file except in compliance with the License. You may
 * obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var concat = require('simple-concat')
var https = require('https')
var once = require('once')
var parse = require('json-parse-errback')

module.exports = function (repository, digest, callback) {
  callback = once(callback)
  https.request({
    host: repository,
    path: '/forms/' + digest
  })
    .once('error', callback)
    .once('timeout', callback)
    .once('response', function (response) {
      var statusCode = response.statusCode
      if (statusCode === 404) return callback(null, false)
      if (statusCode !== 200) {
        var error = new Error()
        error.statusCode = statusCode
        return callback(error)
      }
      concat(response, function (error, buffer) {
        if (error) return callback(error)
        parse(buffer, callback)
      })
    })
    .end()
}
