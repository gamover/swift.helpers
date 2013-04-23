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

function HelpersError (message, details)
{
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);

    this.name = 'swift.helpers:HelpersError';
    this.message = 'swift.helpers: ' + message;
    this.details = details;

    if (this.details)
    {
        this.trace = [];
        trace(this.details);
    }

    function trace (error)
    {
        if (!error) return;

        if (typeUtil.isArray(error))
        {
            error.forEach(function (error) { trace(error); });
            return;
        }

        if (error instanceof DbError)
        {
            self.trace.push(error.message);
            trace(error.details);
        }
        else if (typeUtil.isError(error)) self.trace.push(error.toString());
        else self.trace.push(JSON.stringify(error))
    }
}
$util.inherits(HelpersError, Error);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.HelpersError       = HelpersError;
exports.HelperManagerError = require('./errors/helperManagerError').HelperManagerError;
exports.UrlHelperError     = require('./errors/urlHelperError').UrlHelperError;