/**
 * Created by G@mOBEP
 *
 * Date: 21.04.13
 * Time: 11:59
 */

var $util = require('util'),

    HelpersError = require('../error').HelpersError;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function UrlHelperError (message, details)
{
    HelpersError.call(this, 'UrlHelper: ' + message, details);
    Error.captureStackTrace(this, arguments.callee);

    this.name = 'swift.helpers:UrlHelperError';
}
$util.inherits(UrlHelperError, HelpersError);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.UrlHelperError = UrlHelperError;