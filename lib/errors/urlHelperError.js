/**
 * Created by G@mOBEP
 *
 * Date: 21.04.13
 * Time: 11:59
 */

var $util = require('util'),

    $swiftUtils = require('swift.utils'),
    typeUtil = $swiftUtils.type,

    SwiftHelpersError = require('../error').SwiftHelpersError;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function UrlHelperError (msg, details)
{
    if (typeof details === 'undefined') details = [];
    else if (!typeUtil.isArray(details)) details = [details];
    if (typeof msg === 'string' && msg.length) details.unshift(msg);

    SwiftHelpersError.call(this, 'возникли ошибки в помощнике UrlHelper', details);
    Error.captureStackTrace(this, arguments.callee);

    this.name = 'UrlHelperError';
}
$util.inherits(UrlHelperError, SwiftHelpersError);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.UrlHelperError = UrlHelperError;