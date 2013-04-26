/**
 * Created by G@mOBEP
 *
 * Date: 21.04.13
 * Time: 11:58
 */

var $util = require('util'),

    SwiftHelpersError = require('./swiftHelpersError').SwiftHelpersError;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function HelperManagerError (message, details)
{
    SwiftHelpersError.call(this, 'HelperManager: ' + message, details);
    Error.captureStackTrace(this, arguments.callee);

    this.name = 'swift.helpers:HelperManagerError';
}
$util.inherits(HelperManagerError, SwiftHelpersError);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// static
//

HelperManagerError.codes = {
    BAD_HELPER_NAME:       'BAD_HELPER_NAME',
    BAD_HELPER:            'BAD_HELPER',
    HELPER_ALREADY_EXISTS: 'HELPER_ALREADY_EXISTS',
    SYSTEM_ERROR:          'SYSTEM_ERROR'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.HelperManagerError = HelperManagerError;