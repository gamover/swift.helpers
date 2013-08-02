/**
 * Created by G@mOBEP
 *
 * Company: Realweb
 * Date: 25.12.12
 * Time: 17:17
 *
 * Помощник по работе со ссылками.
 */

var $swiftUtils = require('swift.utils');

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
    this._routes = routes;

    return this;
};

/**
 * Получение маршрута по псевдониму
 *
 * @param {String} alias псевдоним маршрута
 *
 * @returns {Object|null}
 */
UrlHelper.prototype.getRoute = function getRoute (alias)
{
    return (this._routes[alias] || null);
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
    var route = this._routes[alias],
        isRegexp,
        path;

    if (params == null)
    {
        params = {};
    }

    isRegexp = !!route._path;
    path = (route._path || route.path).replace('?', '');

    for (var key in params)
    {
        if (!params.hasOwnProperty(key)) continue;

        path = path.replace(':' + key, params[key]);
    }

    if (isRegexp && !path.match(new RegExp(route.path)))
    {
        path = '';
    }

    return path;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.UrlHelper = UrlHelper;