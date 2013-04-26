/**
 * Created by G@mOBEP
 *
 * Date: 28.01.13
 * Time: 12:17
 *
 * Менеджер помощников Swift.
 */

var $swiftUtils = require('swift.utils'),

    HelperManagerError = require('./errors/helperManagerError').HelperManagerError,
    UrlHelper = require('./helpers/url').UrlHelper;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function HelperManager ()
{
    /**
     * Список помощников
     *
     * @type {Object}
     * @private
     */
    this._helpers = {};

    //
    ////
    //

    this.addHelper('url', new UrlHelper());
}

/**
 * Добавление помощника
 *
 * @param {String} helperName имя помощника
 * @param {Object} helper помощник
 *
 * @returns {HelperManager}
 */
HelperManager.prototype.addHelper = function addHelper (helperName, helper)
{
    if (typeof helperName !== 'string' || !helperName.length) throw new HelperManagerError()
        .setMessage('Не удалось добавить помощника. Имя помощника не передано или представлено в недопустимом формате')
        .setCode(HelperManagerError.codes.BAD_HELPER_NAME);
    if (helperName in this._helpers) throw new HelperManagerError()
        .setMessage('Не удалось добавить помощника. Помощник с именем "' + helperName + '" уже существует')
        .setCode(HelperManagerError.codes.HELPER_ALREADY_EXISTS);
    if (!$swiftUtils.type.isObject(helper)) throw new HelperManagerError()
        .setMessage('Не удалось добавить помощника "' + helperName + '". Помощник не передан или представлен в недопустимом формате')
        .setCode(HelperManagerError.codes.BAD_HELPER);

    this._helpers[helperName] = helper;

    return this;
};

/**
 * Получение помощника
 *
 * @param {String} helperName имя помощника
 *
 * @returns {Object|undefined}
 */
HelperManager.prototype.getHelper = function getHelper (helperName)
{
    if (typeof helperName !== 'string' || !helperName.length)throw new HelperManagerError()
        .setMessage('Не удалось получить помощника. Имя помощника не передано или представлено в недопустимом формате')
        .setCode(HelperManagerError.codes.BAD_HELPER_NAME);

    return this._helpers[helperName];
};

/**
 * Получение всех помощников
 *
 * @returns {Object}
 */
HelperManager.prototype.getAllHelpers = function getAllHelpers ()
{
    return this._helpers;
};

/**
 * Удаление помощника по имени
 *
 * @param {String} helperName имя помощника
 *
 * @returns {HelperManager}
 */
HelperManager.prototype.removeHelper = function removeHelper (helperName)
{
    if (typeof helperName !== 'string' || !helperName.length) throw new HelperManagerError()
        .setMessage('Не удалось удалить помощника. Имя помощника не передано или представлено в недопустимом формате')
        .setCode(HelperManagerError.codes.BAD_HELPER_NAME);

    delete this._helpers[helperName];

    return this;
};

/**
 * Удаление всех помощников
 *
 * @returns {HelperManager}
 */
HelperManager.prototype.removeAllHelpers = function removeAllHelpers ()
{
    this._helpers = {};

    return this;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.HelperManager = HelperManager;