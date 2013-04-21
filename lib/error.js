/**
 * Created by G@mOBEP
 *
 * Date: 21.04.13
 * Time: 11:37
 */

var $util = require('util'),

    $swiftUtils = require('swift.utils'),
    typeUtil = $swiftUtils.type;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SwiftHelpersError (msg, details)
{
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);

    var msgArr = ['возникли ошибки в модуле "swift.helpers"'];

    if (typeof details === 'undefined') details = [];
    else if (!typeUtil.isArray(details)) details = [details];
    if (typeof msg === 'string' && msg.length) details.unshift(msg);

    msgArr = msgArr.concat(details);

    this.name = 'SwiftHelpersError';
    this.message = msgArr.join('\r\n') + '\r\n';
}
$util.inherits(SwiftHelpersError, Error);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.SwiftHelpersError  = SwiftHelpersError;
exports.HelperManagerError = require('./errors/helperManagerError').HelperManagerError;
exports.UrlHelperError     = require('./errors/urlHelperError').UrlHelperError;