/**
 * Created by G@mOBEP
 *
 * Date: 21.04.13
 * Time: 11:59
 */

var $util = require('util'),

    SwiftHelpersError = require('./swiftHelpersError').SwiftHelpersError;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function UrlHelperError (message, details)
{
    SwiftHelpersError.call(this, 'UrlHelper: ' + message, details);
    Error.captureStackTrace(this, arguments.callee);

    this.name = 'swift.helpers:UrlHelperError';
}
$util.inherits(UrlHelperError, SwiftHelpersError);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// static
//

UrlHelperError.codes = {
    BAD_ROUTES:           'BAD_ROUTES',
    BAD_ALIAS:            'BAD_ALIAS',
    ROUTE_NOT_FOUND:      'ROUTE_NOT_FOUND',
    REGEXP_CHECK_FAILURE: 'ROUTE_NOT_FOUND',
    SYSTEM_ERROR:         'SYSTEM_ERROR'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.UrlHelperError = UrlHelperError;