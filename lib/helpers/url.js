/**
 * Created by G@mOBEP
 *
 * Company: Realweb
 * Date: 25.12.12
 * Time: 17:17
 *
 * Помощник по работе со ссылками.
 */

var $swiftErrors = require('swift.errors'),
    $swiftUtils = require('swift.utils');

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
    if (!$swiftUtils.type.isObject(routes))
        throw new $swiftErrors.TypeError('UrlHelper: недопустимый тип маршрутов (ожидается: "object", принято: "' + typeof routes + '")');
    //
    // задание маршрутов
    //
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
    //
    // проверка параметров
    //
    if (typeof alias !== 'string')
        throw new $swiftErrors.TypeError('UrlHelper: недопустимый тип псевдонима маршрута (ожидается: "string", принято: "' + typeof alias + '")');
    if (!alias.length)
        throw new $swiftErrors.ValueError('UrlHelper: пустое значение псевдонима маршрута помощника');
    if (!(alias in this._routes))
        throw new $swiftErrors.SystemError('UrlHelper: не найден маршрут с псевдонимом "' + alias + '" в помощнике');

    if (!$swiftUtils.type.isObject(params)) params = {};

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
        throw new $swiftErrors.ValueError('UrlHelper: ссылка "' + path + '" не соответсвует регулярному выражению "' + route.path + '" в маршруте с псевдонимом "' + alias + '"');

    return path;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.UrlHelper = UrlHelper;