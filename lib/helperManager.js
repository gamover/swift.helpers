/**
 * Created by G@mOBEP
 *
 * Date: 28.01.13
 * Time: 12:17
 *
 * Менеджер помощников Swift.
 */

var $swiftErrors = require('swift.errors'),
    $swiftUtils = require('swift.utils'),

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
    //
    // проверка параметров
    //
    if (typeof helperName !== 'string')
        throw new $swiftErrors.TypeError('не удалось добавить помощника в менеджер помощников. Недопустимый тип имени помощника (ожидается: "string", принято: "' + typeof helperName + '")');
    if (!helperName.length)
        throw new $swiftErrors.ValueError('не удалось добавить помощника в менеджер помощников. Пустое значение имени помощника');
    if (helperName in this._helpers)
        throw new $swiftErrors.ValueError('не удалось добавить помощника в менеджер помощников. Помощник с именем "' + helperName + '" уже существует');
    if (!$swiftUtils.type.isObject(helper))
        throw new $swiftErrors.TypeError('не удалось добавить помощника в менеджер помощников. Недопустимый тип помощника (ожидается: "object", принято: "' + typeof helper + '")');
    //
    // добавление помощника
    //
    this._helpers[helperName] = helper;

    return this;
};

/**
 * Получение помощника
 *
 * @param {String} helperName имя помощника
 *
 * @returns {Object|null}
 */
HelperManager.prototype.getHelper = function getHelper (helperName)
{
    return (this._helpers[helperName] || null);
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
    //
    // проверка параметров
    //
    if (typeof helperName !== 'string')
        throw new $swiftErrors.TypeError('не удалось удалить помощника из менеджера помощников. Недопустимый тип имени помощника (ожидается: "string", принято: "' + typeof helperName + '")');
    if (!helperName.length)
        throw new $swiftErrors.ValueError('не удалось удалить помощника из менеджера помощников. Пустое значение имени помощника');
    //
    // удаление помощника
    //
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