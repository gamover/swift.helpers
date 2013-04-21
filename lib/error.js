/**
 * Created by G@mOBEP
 *
 * Date: 21.04.13
 * Time: 11:37
 */

var $util = require('util');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function HelpersError (message, details)
{
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);

    this.name = 'swift.helpers:HelpersError';
    this.message = 'swift.helpers: ' + message;
    this.details = details;
}
$util.inherits(HelpersError, Error);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.HelpersError       = HelpersError;
exports.HelperManagerError = require('./errors/helperManagerError').HelperManagerError;
exports.UrlHelperError     = require('./errors/urlHelperError').UrlHelperError;