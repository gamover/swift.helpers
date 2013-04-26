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

    UrlHelperError = require('../errors/urlHelperError').UrlHelperError;

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
    if (!$swiftUtils.type.isObject(routes)) throw new UrlHelperError()
        .setMessage('Не удалось задать маршруты. Мрашруты не переданы или представлены в недопустимом формате')
        .setCode(UrlHelperError.codes.BAD_ROUTES);

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
    if (typeof alias !== 'string' || !alias.length) throw new UrlHelperError()
        .setMessage('Не удалось получить маршрут. Псевдоним не передан или представлен в недопустимом формате')
        .setCode(UrlHelperError.codes.BAD_ALIAS);

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
    if (typeof alias !== 'string' || !alias.length) throw new UrlHelperError()
        .setMessage('Не удалось разрешить ссылку. Псевдоним не передан или представлен в недопустимом формате')
        .setCode(UrlHelperError.codes.BAD_ALIAS);
    if (!(alias in this._routes)) throw new UrlHelperError()
        .setMessage('Не удалось разрешить ссылку по псевдониму "' + alias + '". Не найден маршрут по псевдониму')
        .setCode(UrlHelperError.codes.ROUTE_NOT_FOUND);

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

    if (isRegexp && !path.match(new RegExp(route.path))) throw new UrlHelperError()
        .setMessage('Не удалось разрешить ссылку по псевдониму "' + alias + '". Ссылка "' + path + '" не соответсвует регулярному выражению "' + route.path + '"')
        .setCode(UrlHelperError.codes.REGEXP_CHECK_FAILURE);

    return path;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.UrlHelper = UrlHelper;