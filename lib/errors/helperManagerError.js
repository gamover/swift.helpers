/**
 * Created by G@mOBEP
 *
 * Date: 21.04.13
 * Time: 11:58
 */

var $util = require('util'),

    HelpersError = require('../error').HelpersError;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function HelperManagerError (message, details)
{
    HelpersError.call(this, message, details);
    Error.captureStackTrace(this, arguments.callee);

    this.name = 'swift.helpers:HelperManagerError';
}
$util.inherits(HelperManagerError, HelpersError);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.HelperManagerError = HelperManagerError;