/**
 * Created by G@mOBEP
 *
 * Date: 21.04.13
 * Time: 11:37
 */

var $util = require('util');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SwiftHelpersError (message, details)
{
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);

    this.name    = 'SwiftHelpersError';
    this.message = 'swift.helpers ' + message;
    this.details = details || null;
    this.code    = null;
}
$util.inherits(SwiftHelpersError, Error);

/**
 * Задание сообщения об ошибке
 *
 * @param {String} message сообщение об ошибке
 *
 * @returns {SwiftHelpersError}
 */
SwiftHelpersError.prototype.setMessage = function setMessage (message)
{
    this.message = message;
    return this;
};

/**
 * Задание деталей
 *
 * @param {*} details детали
 *
 * @returns {SwiftHelpersError}
 */
SwiftHelpersError.prototype.setDetails = function setMessage (details)
{
    this.details = details;
    return this;
};

/**
 * Задание кода ошибки
 *
 * @param {String} code код ошибки
 *
 * @returns {SwiftHelpersError}
 */
SwiftHelpersError.prototype.setCode = function setCode (code)
{
    this.code = code;
    return this;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.SwiftHelpersError  = SwiftHelpersError;
exports.HelperManagerError = require('./helperManagerError').HelperManagerError;
exports.UrlHelperError     = require('./urlHelperError').UrlHelperError;