/*
 
This file is part of MarvinV2.

MarvinV2 is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

MarvinV2 is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with MarvinV2.  If not, see <http://www.gnu.org/licenses/>.

*/

var interpret = require('./interpret');
var database = require('./database');
var forEachAsync = require('forEachAsync').forEachAsync;

exports.respond = function(text,callback) {
  var results = interpret.getNumbers(text);
  var text = '';
  forEachAsync(results,(item) => {
    database.exists(item,() => {
      text += '**[SCP-' + item + '](' + database.url_base + item + ')**\n&nbsp;';
    });
  }).then(function() {
    callback((text !== ''),text);
  });
};
