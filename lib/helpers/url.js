/**
 * Created by G@mOBEP
 *
 * Company: Realweb
 * Date: 25.12.12
 * Time: 17:17
 *
 * Помощник по работе со ссылками.
 */

var $swiftUtils = require('swift.utils'),
    typeUtil = $swiftUtils.type,

    error = require('../error');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function UrlHelper ()
{
    /**
     * Маршруты (объект вида:
     *     {
     *         'routeAlias1': {
     *             'path': '',
     *             '_path': '',
     *             'module': 'moduleName',
     *             'controller': 'controllerName',
     *             'action': 'actionName'
     *         },
     *         ...
     *         'routeAliasN': {
     *             ...
     *         }
     *     }
     * )
     *
     * @type {Object}
     * @private
     */
    this._routes = {};
}

/**
 * Задание объетка маршрутов
 *
 * @param {Object} routes
 *
 * @returns {UrlHelper}
 */
UrlHelper.prototype.setRoutes = function setRoutes (routes)
{
    if (!typeUtil.isObject(routes))
        throw new error.UrlHelperError('не удалось задать маршруты в UrlHelper.' +
            ' Мрашруты не переданы или представлены в недопустимом формате');

    this._routes = routes;

    return this;
};

/**
 * Получение маршрута по псевдониму
 *
 * @param {String} alias псевдоним маршрута
 *
 * @returns {Object|undefined}
 */
UrlHelper.prototype.getRoute = function getRoute (alias)
{
    if (typeof alias !== 'string' || !alias.length)
        throw new error.UrlHelperError('не удалось получить маршрут из UrlHelper.' +
            ' Псевдоним не передан или представлен в недопустимом формате');

    return this._routes[alias];
};

/**
 * Получение всех маршрутов
 *
 * @returns {Object}
 */
UrlHelper.prototype.getAllRoutes = function getAllRoutes ()
{
    return this._routes;
};

/**
 * Разрешение url
 *
 * @param {String} alias псевдоним маршрута
 * @param {Object} params параметры для подстановки
 *
 * @return {String}
 */
UrlHelper.prototype.resolve = function resolve (alias, params)
{
    if (typeof alias !== 'string' || !alias.length)
        throw new error.UrlHelperError('не удалось разрешить ссылку в UrlHelper.' +
            ' Псевдоним не передан или представлен в недопустимом формате');
    if (!(alias in this._routes))
        throw new error.UrlHelperError('не удалось разрешить ссылку по псевдониму "' + alias + '" в UrlHelper.' +
            ' Не найден маршрут по псевдониму');

    if (!typeUtil.isObject(params)) params = {};

    var route = this._routes[alias],
        isRegexp,
        path;

    isRegexp = !!route._path;
    path = (route._path || route.path).replace('?', '');

    for (var key in params)
    {
        if (!params.hasOwnProperty(key)) continue;

        path = path.replace(':' + key, params[key]);
    }

    if (isRegexp && !path.match(new RegExp(route.path)))
        throw new error.UrlHelperError('не удалось разрешить ссылку по псевдониму "' + alias + '" в UrlHelper.' +
            ' Ссылка "' + path + '" не соответсвует регулярному выражению "' + route.path + '"');

    return path;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.UrlHelper = UrlHelper;