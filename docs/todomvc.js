/* feather-ts/todomvc vundefined */
var todomvc = (function (exports) {
    'use strict';

    /* feather-ts v2.0.87 */
    var getType = {}.toString;
    var compose = function (fns) { return function (res) {
        if (fns.length === 1) {
            return fns[0](res);
        }
        return fns.reduce(function (p, c) { return c(p); }, res);
    }; };
    var isFunction = function (functionToCheck) {
        return functionToCheck && getType.call(functionToCheck) === '[object Function]';
    };
    var isDef = function (x) { return typeof x !== 'undefined'; };
    var isUndef = function (x) { return !isDef(x); };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    var pathCallbacks = new WeakMap();
    var getSubset = function (keys, obj) {
        return keys.reduce(function (a, c) {
            return (__assign({}, a, (_a = {}, _a[c] = obj[c], _a)));
            var _a;
        }, {});
    };
    var isObject = function (obj) {
        return (obj !== null && typeof (obj) === 'object' && Object.prototype.toString.call(obj) === '[object Object]');
    };
    var deepValue = function (obj, path) {
        if (!path) {
            return obj;
        }
        var paths = path.split('.');
        var current = obj, i, n;
        for (i = 0, n = paths.length; i < n; ++i) {
            if (current[paths[i]] === undefined) {
                return undefined;
            }
            else {
                current = current[paths[i]];
            }
        }
        return current;
    };
    var merge = function (a, b) {
        if (a === void 0) { a = {}; }
        for (var _i = 0, _a = Object.keys(b); _i < _a.length; _i++) {
            var k = _a[_i];
            var ak = a[k], bk = b[k];
            if (Array.isArray(ak)) {
                ak.push.apply(ak, bk);
            }
            else if (isObject(ak)) {
                merge(ak, bk);
            }
            else {
                a[k] = bk;
            }
        }
        return a;
    };
    var ensure = function (map, obj, defaultValue) {
        var lookup = map.get(obj);
        if (!lookup) {
            map.set(obj, lookup = defaultValue);
        }
        else if (Array.isArray(lookup) && Array.isArray(defaultValue)) {
            lookup.push.apply(lookup, defaultValue);
        }
        else if (isObject(lookup)) {
            merge(lookup, defaultValue);
        }
        return lookup;
    };
    var propertyCallbacks = new WeakMap();
    var addPropertyListener = function (obj, property, callback) {
        var val = obj[property];
        var observed = propertyCallbacks.has(obj) && propertyCallbacks.get(obj)[property];
        ensure(propertyCallbacks, obj, (_a = {}, _a[property] = [callback], _a));
        if (!observed) {
            Object.defineProperty(obj, property, {
                get: function () { return val; },
                set: function (newVal) {
                    val = newVal;
                    for (var _i = 0, _a = propertyCallbacks.get(obj)[property]; _i < _a.length; _i++) {
                        var c = _a[_i];
                        c(property);
                    }
                    return val;
                }
            });
        }
        var _a;
    };
    var createObjectPropertyListener = function (obj, pathStr, callback) {
        var path = pathStr.split('.'), property = path.pop(), root = deepValue(obj, path.join('.')), handler = function () {
            for (var _i = 0, _a = pathCallbacks.get(obj)[pathStr]; _i < _a.length; _i++) {
                var cb = _a[_i];
                cb();
            }
        };
        ensure(pathCallbacks, obj, (_a = {}, _a[pathStr] = [callback], _a));
        addPropertyListener(root, property, handler);
        var _a;
    };

    function allChildNodes(node) {
        var walker = document.createTreeWalker(node, NodeFilter.SHOW_ALL, null, false), nodes = [];
        var currentNode;
        do {
            currentNode = walker.currentNode;
            if (currentNode.nodeType !== Node.TEXT_NODE || currentNode.textContent.trim()) {
                nodes.push(currentNode);
            }
        } while (walker.nextNode());
        return nodes;
    }
    function allTextNodes(node) {
        var a = [], walk = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
        var n;
        while (n = walk.nextNode()) {
            a.push(n);
        }
        return a;
    }

    var cleanUpQueue = new WeakMap();
    var registerCleanUp = function (node, task) { return ensure(cleanUpQueue, node, [task]); };
    var cleanUp = function (node) { return setTimeout(function () {
        for (var _i = 0, _a = allChildNodes(node); _i < _a.length; _i++) {
            var n = _a[_i];
            if (cleanUpQueue.has(n)) {
                for (var _b = 0, _c = cleanUpQueue.get(n); _b < _c.length; _b++) {
                    var task = _c[_b];
                    task();
                }
                cleanUpQueue.delete(n);
            }
        }
    }, 80); };

    var observers = new WeakMap();
    function removeFromArray(arr, elements) {
        if (!arr || arr.length === 0) {
            return;
        }
        var deleteCount = 0, total = elements.length;
        for (var i = arr.length; i--;) {
            if (~elements.indexOf(arr[i])) {
                deleteCount++; // optimize removal of consecutive elements
            }
            else if (deleteCount) {
                arr.splice(i + 1, deleteCount);
                if ((total -= deleteCount) === 0) { // if we removed all already, break early
                    deleteCount = 0;
                    break;
                }
                deleteCount = 0;
            }
        }
        if (deleteCount) {
            arr.splice(0, deleteCount);
        }
        return arr;
    }
    var notify = function (arr, method, args) {
        var listeners = observers.get(arr);
        for (var _i = 0, listeners_1 = listeners; _i < listeners_1.length; _i++) {
            var listener = listeners_1[_i];
            listener[method].apply(arr, args);
        }
    };
    function duckPunchSplice(arr) {
        var old = arr.splice;
        // add docs that removing and re-adding elements to the same array kills event listeners
        arr.splice = function (index, deleteCount) {
            var addedItems = [].slice.call(arguments, 2), deletedItems = old.apply(arr, arguments);
            notify(arr, 'splice', [index, deleteCount, addedItems, deletedItems]);
            return deletedItems;
        };
    }
    function duckPunchSort(arr) {
        var old = arr.sort;
        arr.sort = function (cmp) {
            // sort is a special case, we need to inform listeners how sorting has changed the array
            var indices = range(0, arr.length - 1), args = cmp ? [
                arr.map(function (e, i) { return i; })
                    .sort(function (a, b) { return cmp(arr[a], arr[b]); })
                    .map(function (e) { return indices[e]; })
            ] : indices, res = old.call(arr, cmp);
            notify(arr, 'sort', args);
            return res;
        };
    }
    var range = function (start, end) {
        var len = end - start + 1, arr = new Array(len);
        for (var i = 0, l = arr.length; i < l; i++) {
            arr[i] = i + start;
        }
        return arr;
    };
    // essentially we can reduce array modifying functions to two implementations: sort and splice
    var observeArray = function (arr, listener) {
        // replace this in the future with es6 proxies
        var listeners = observers.get(arr);
        if (!listeners) {
            observers.set(arr, [listener]);
            arr.pop = function () {
                return arr.splice(arr.length - 1, 1)[0];
            };
            arr.push = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i] = arguments[_i];
                }
                arr.splice.apply(arr, [arr.length, 0].concat(items));
                return arr.length;
            };
            arr.fill = function () {
                throw Error('observed arrays cannot be filled. items must be unique, use Array.splice instead!');
            };
            arr.reverse = function () {
                var ref = arr.slice();
                arr.sort(function (a, b) { return ref.indexOf(b) - ref.indexOf(a); });
                return arr;
            };
            arr.shift = function () {
                return arr.splice(0, 1)[0];
            };
            arr.unshift = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i] = arguments[_i];
                }
                arr.splice.apply(arr, [0, 0].concat(items));
                return arr.length;
            };
            duckPunchSplice(arr);
            duckPunchSort(arr);
        }
        else {
            listeners.push(listener);
        }
    };
    function domArrayListener(arr, el, update, onItemAdded, filter) {
        var nodeVisible = [];
        var elementMap = new WeakMap();
        var listener = {
            sort: function (indices) {
                var copy = [];
                for (var i = 0; i < indices.length; i++) {
                    if (nodeVisible[indices[i]]) {
                        el.appendChild(elementMap.get(arr[i]));
                    }
                    copy[i] = nodeVisible[indices[i]];
                }
                nodeVisible = copy;
            },
            splice: function (index, deleteCount, added, deleted) {
                if (deleted === void 0) { deleted = []; }
                var patch = Array.from(nodeVisible), patchHelper = [index, deleteCount].concat(added.map(function () { return false; }));
                nodeVisible.splice.apply(nodeVisible, patchHelper);
                if (deleteCount) {
                    for (var del = void 0, d = 0; d < deleteCount; d++) {
                        del = deleted[d];
                        var node = elementMap.get(del);
                        if (node && node.parentElement === el) {
                            el.removeChild(node);
                        }
                        if (isDef(node)) {
                            cleanUp(node);
                        }
                        elementMap.delete(del);
                    }
                }
                if (added.length) {
                    for (var item = void 0, a = 0, n = added.length; a < n; a++) {
                        item = added[a];
                        elementMap.set(item, onItemAdded(item));
                    }
                }
                if (deleteCount || added.length) {
                    update(true);
                }
                patch.splice.apply(patch, patchHelper);
                for (var i = 0, n = arr.length; i < n; i++) {
                    patch[i] = isUndef(filter) || filter(arr[i], i);
                    var itemNode = elementMap.get(arr[i]);
                    if (patch[i] && !nodeVisible[i]) {
                        var nextVisible = nodeVisible.indexOf(true, i), refNode = ~nextVisible ? elementMap.get(arr[nextVisible]) : undefined;
                        el.insertBefore(itemNode, refNode);
                    }
                    else if (!patch[i] && nodeVisible[i] && itemNode.parentNode === el) {
                        el.removeChild(itemNode);
                    }
                }
                nodeVisible = patch;
            }
        };
        listener.splice(0, 0, arr, []);
        registerCleanUp(el, function () { return observers.delete(arr); });
        return listener;
    }

    var computedProps = new WeakMap();
    var createComputedListener = function (widget, info, updateDom) {
        var proto = Object.getPrototypeOf(widget);
        if (!computedProps.has(proto) || !computedProps.get(proto)[info.path()]) {
            throw Error('Bound functions must be decorated with @Computed(...paths: string[])');
        }
        computedProps.get(proto)[info.path()].forEach(function (prop) {
            return createObjectPropertyListener(widget, prop, function () { return updateDom(); });
        });
    };
    function namedRegexMatch(text, regex, matchNames) {
        var matches = regex.exec(text);
        if (!matches) {
            return;
        }
        return matches.reduce(function (result, match, index) {
            if (index > 0) {
                result[matchNames[index - 1]] = match;
            }
            return result;
        }, {});
    }
    var decapitalize = function (str) { return str.charAt(0).toLowerCase() + str.substr(1); };
    var camelCaseFromHyphens = function (str) {
        return str.replace(/\b-([a-z])/g, function (all, char) { return char.toUpperCase(); });
    };

    var ConstructRegistry = {};
    var Singletons = {};
    var start = function (root) {
        if (root === void 0) { root = document.documentElement; }
        var createdWidgets = [];
        Object.keys(ConstructRegistry).forEach(function (selector) {
            Array.from(root.querySelectorAll(selector)).forEach(function (node) {
                var widget = new (Function.prototype.bind.apply(ConstructRegistry[selector]));
                runConstructorQueue(widget, node);
                createdWidgets.push(widget);
            });
        });
        return createdWidgets;
    };
    var Construct = function (conf) { return function (proto) {
        ConstructRegistry[conf.selector] = proto;
        addToConstructorQueue(proto, function (widget, node) {
            if (conf.singleton === true) {
                var name_1 = decapitalize(widget.constructor.name);
                Singletons[name_1] = widget;
                registerCleanUp(node, function () {
                    delete Singletons[name_1];
                });
            }
            widget.init(node);
        });
    }; };
    var queue = new WeakMap();
    var renderQueue = new WeakMap();
    var addToConstructorQueue = function (constructor, func) {
        ensure(queue, constructor, [func]);
    };
    var addToRenderQueue = function (constructor, func) {
        ensure(renderQueue, constructor, [func]);
    };
    var runConstructorQueue = function (widget, node) {
        var widgetQueue = queue.get(Object.getPrototypeOf(widget).constructor) || [];
        for (var i = 0, n = widgetQueue.length; i < n; i++) { // for performance
            widgetQueue[i].call(widget, widget, node);
        }
    };
    var runAfterRenderQueue = function (widget, node) {
        var widgetQueue = renderQueue.get(Object.getPrototypeOf(widget).constructor) || [];
        for (var i = 0, n = widgetQueue.length; i < n; i++) { // for performance use for-loops
            widgetQueue[i].call(widget, widget, node);
        }
    };

    var Scope;
    (function (Scope) {
        Scope[Scope["Direct"] = 0] = "Direct";
        Scope[Scope["Delegate"] = 1] = "Delegate";
        Scope[Scope["UntilMatch"] = 2] = "UntilMatch";
    })(Scope || (Scope = {}));
    function preventDefault(conf, ev) {
        if (conf.preventDefault === true) {
            ev.preventDefault();
        }
    }
    var createHandler = function (event, conf, widget, node, direct) {
        return function (ev) {
            if (direct) {
                preventDefault(conf, ev);
                widget[conf.method].call(widget, ev, node);
            }
            else {
                var el = ev.target;
                do {
                    if (el.nodeType === Node.ELEMENT_NODE && el.matches(conf.selector)) {
                        preventDefault(conf, ev);
                        return widget[conf.method].call(widget, ev, el);
                    }
                    if (el === node && conf.scope !== Scope.UntilMatch) {
                        break;
                    }
                } while (el = el.parentElement);
            }
        };
    };
    var attachEvents = function (conf) { return function (widget, node) {
        var events = Array.isArray(conf.event) ? conf.event : [conf.event];
        events.forEach(function (event) {
            if (conf.scope === Scope.Direct && isDef(conf.selector)) {
                node = node.querySelector(conf.selector);
            }
            var handler = createHandler(event, conf, widget, node, conf.scope === Scope.Direct || isUndef(conf.selector));
            node.addEventListener(event, handler, conf.options);
            registerCleanUp(node, function () { return node.removeEventListener(event, handler); });
        });
    }; };
    var On = function (conf) { return function (proto, method) {
        var finalConf = __assign({}, conf, { method: method, event: conf.event || method, scope: Scope.Delegate });
        addToConstructorQueue(proto.constructor, attachEvents(finalConf));
    }; };
    var ResponseError = /** @class */ (function (_super) {
        __extends(ResponseError, _super);
        function ResponseError(message, response) {
            var _this = _super.call(this, message) || this;
            _this.response = response;
            return _this;
        }
        return ResponseError;
    }(Error));

    var storableProperties = new WeakMap();
    var widgetId = function (widget) {
        var id = widget.id || widget.name || widget.title || widget.constructor.name;
        return isFunction(id) ? id() : id;
    };
    var store = function (key, value) {
        window.localStorage.setItem(key, JSON.stringify({ value: value }));
    };
    var load = function (key) {
        var json = window.localStorage.getItem(key);
        if (json) {
            return JSON.parse(json).value;
        }
    };
    var loadArray = function (key, proto) {
        var props = storableProperties.get(proto);
        var arr = load(key);
        if (!arr || isUndef(props)) {
            return;
        }
        return arr.map(function (i) {
            return props.reduce(function (p, c) {
                p[c] = i[c];
                return p;
            }, new (Function.prototype.bind.apply(proto)));
        });
    };
    var storeQueue = new WeakMap();
    var storeArray = function (key, arr, proto) {
        if (storeQueue.has(arr)) {
            clearTimeout(storeQueue.get(arr));
        }
        storeQueue.set(arr, setTimeout(function () {
            var props = storableProperties.get(proto);
            if (isUndef(props)) {
                throw Error('@LocalStorage array items must have at least one @Storable() property');
            }
            var value = arr.map(function (i) { return getSubset(props, i); });
            store(key, value);
        }, 80));
    };
    var storeListener = function (arr, callback) {
        var listener = {
            sort: callback,
            splice: function (i, d, a) {
                if (a.length) {
                    a.forEach(function (item) {
                        var proto = Object.getPrototypeOf(item), props = storableProperties.get(proto.constructor);
                        props.forEach(function (prop) {
                            addPropertyListener(item, prop, callback);
                        });
                    });
                }
                if (a.length || d > 0) {
                    callback();
                }
            }
        };
        observeArray(arr, listener);
        listener.splice(0, 0, arr);
    };
    var handler = function (prop, arrayType) { return function (widget) {
        var storeKey = widgetId(widget) + '.' + prop;
        var value = widget[prop];
        if (Array.isArray(value)) {
            var type_1 = isDef(arrayType) ? arrayType() : undefined;
            if (isUndef(type_1)) {
                throw Error("Stored array '" + prop + "' needs an arrayType factory argument");
            }
            try {
                var tryValue = loadArray(storeKey, type_1);
                if (isDef(tryValue)) {
                    value = widget[prop] = tryValue;
                }
            }
            catch (e) {
                console.warn('LocalStorage loading failed...ignoring');
                // format changed or something else failed
            }
            storeListener(value, function () {
                storeArray(storeKey, value, type_1);
            });
        }
        else {
            var tryValue = load(storeKey);
            if (isDef(tryValue)) {
                widget[prop] = tryValue;
            }
            addPropertyListener(widget, prop, function () {
                store(storeKey, widget[prop]);
            });
        }
    }; };
    var LocalStorage = function (arrayType) { return function (proto, property) {
        addToConstructorQueue(proto.constructor, handler(property, arrayType));
    }; };
    var Storable = function () { return function (proto, property) {
        ensure(storableProperties, proto.constructor, [property]);
    }; };

    var routeListeners = {};
    var namedRx = /[:*]\w+/gi;
    var historyAPI = (window.history && window.history.pushState) && document.querySelector('[routing="hash"]') === null;
    var rules = [
        [/:\w+/gi, '([\\w\\d-]+)'],
        [/\*\w+/gi, '(.+)']
    ];
    // supports :param and *param and optional parts ()
    var namedMatch = function (pattern, input) {
        var names = pattern.match(namedRx);
        if (names && names.length) {
            names = names.map(function (str) { return str.substr(1); });
            var repl = rules.reduce(function (p, c) { return p.replace(c[0], c[1]); }, pattern), finalR = new RegExp('^' + repl + '$', 'gi');
            return namedRegexMatch(input, finalR, names);
        }
        else {
            if (new RegExp('^' + pattern + '$', 'gi').exec(input)) {
                return {};
            }
        }
    };
    var getCurrentRoute = function () {
        var path = location.pathname;
        if (!historyAPI) {
            if (path !== '/') {
                location.replace('/#' + path);
            }
            else {
                path = !location.hash ? '/' : location.hash.replace(/^#/, '');
            }
        }
        return path;
    };
    var notifyListeners = function (route) {
        Object.values(routeListeners).forEach(function (handlers) {
            return handlers.forEach(function (rh) {
                var matchedParams = namedMatch(rh.route, route);
                if (matchedParams) {
                    rh.callback(matchedParams);
                }
            });
        });
    };
    var runRoutes = function () {
        if (!window['blockRouting']) {
            notifyListeners(getCurrentRoute());
        }
        window.addEventListener(historyAPI ? 'popstate' : 'hashchange', function () { return notifyListeners(getCurrentRoute()); }, false);
    };
    var Route = function (route) { return function (proto, method) {
        addToConstructorQueue(proto.constructor, function (widget, node) {
            if (!routeListeners[route]) {
                routeListeners[route] = [];
            }
            var handler = { route: route, callback: widget[method].bind(widget) };
            routeListeners[route].push(handler);
            registerCleanUp(node, function () { return routeListeners[route].splice(routeListeners[route].indexOf(handler), 1); });
        });
    }; };

    var DEFAULT_TEMPLATE_NAME = '__default__';
    var parsedTemplates = new WeakMap();
    var SINGLE_CURLIES = /{(.*?)}/;
    var CURLIES = /{{(.*?)}}/;
    var ALL_CURLIES = /{{(.+?)}}/g;
    var selfClosingTags = /(<([^<>\s]+)(\s+[^<>\s'"=]+(=[\w\d]+|="[^"]*"|='[^']*'|={{?[^}]*?}?})?)*)\s*\/>/gmi;
    var openTags = '$1></$2>';
    var TemplateTokenType;
    (function (TemplateTokenType) {
        TemplateTokenType[TemplateTokenType["CLASS"] = 0] = "CLASS";
        TemplateTokenType[TemplateTokenType["PROPERTY"] = 1] = "PROPERTY";
        TemplateTokenType[TemplateTokenType["ATTRIBUTE"] = 2] = "ATTRIBUTE";
        TemplateTokenType[TemplateTokenType["TEMPLATE"] = 3] = "TEMPLATE";
        TemplateTokenType[TemplateTokenType["TEXT"] = 4] = "TEXT";
        TemplateTokenType[TemplateTokenType["TAG"] = 5] = "TAG";
    })(TemplateTokenType || (TemplateTokenType = {}));
    var TemplateTokenInfo = /** @class */ (function () {
        function TemplateTokenInfo(position, type) {
            this.position = position;
            this.type = type;
        }
        TemplateTokenInfo.prototype.setCurly = function (value) {
            this._curly = value;
            var tokens = value.split(':');
            this._path = tokens.shift();
            this._transformers = tokens;
        };
        TemplateTokenInfo.prototype.curly = function () {
            return this._curly;
        };
        TemplateTokenInfo.prototype.path = function () {
            return this._path;
        };
        TemplateTokenInfo.prototype.transformers = function () {
            return this._transformers;
        };
        TemplateTokenInfo.prototype.arrayTransformer = function () {
            if (this._transformers.length > 1) {
                throw Error('Array filter transformer can have only one method');
            }
            return this.transformers()[0];
        };
        return TemplateTokenInfo;
    }());
    var breakApartTextNodes = function (root) {
        var textNodes = allTextNodes(root);
        for (var i = 0, n = textNodes.length; i < n; i++) {
            var node = textNodes[i];
            var split = node.textContent.split(/({{.*?}})/mg);
            if (split.length > 1) {
                var parent_1 = node.parentNode, frag = document.createDocumentFragment();
                for (var _i = 0, split_1 = split; _i < split_1.length; _i++) {
                    var text = split_1[_i];
                    if (text !== '') {
                        frag.appendChild(document.createTextNode(text));
                    }
                }
                parent_1.replaceChild(frag, node);
            }
        }
        return root;
    };
    var templateTag = document.createElement('template');
    var getFragment = function (html) {
        templateTag.innerHTML = html;
        return document.importNode(templateTag.content, true);
    };
    var ParsedTemplate = /** @class */ (function () {
        function ParsedTemplate(doc, nodes, infos) {
            this.doc = doc;
            this.infos = infos;
            this.nodes = nodes;
        }
        ParsedTemplate.prototype.clone = function () {
            var doc = this.doc.cloneNode(true);
            return new ParsedTemplate(doc, allChildNodes(doc), this.infos);
        };
        return ParsedTemplate;
    }());
    var getTemplate = function (widget, name) {
        if (name === void 0) { name = DEFAULT_TEMPLATE_NAME; }
        var proto = Object.getPrototypeOf(widget);
        var templates = parsedTemplates.get(proto);
        if (isUndef(templates) || isUndef(templates[name])) {
            throw Error("No template found for name " + name + " in " + widget.constructor.name);
        }
        return templates[name].clone();
    };
    var parseTemplate = function (templateStr) {
        var source = templateStr.replace(selfClosingTags, openTags), frag = breakApartTextNodes(getFragment(source)), allNodes = allChildNodes(frag), hookMap = {}; // we need to remember case sensitive hooks, b/c attributes turn lowercase
        var m;
        while (m = ALL_CURLIES.exec(templateStr)) {
            hookMap[m[1].toLowerCase()] = m[1];
        }
        return new ParsedTemplate(frag, allNodes, parseHooks(allNodes, hookMap));
    };
    var parseHooks = function (nodes, hookMap) {
        if (hookMap === void 0) { hookMap = {}; }
        var hooks = [];
        var selectors = Object.keys(ConstructRegistry);
        var match;
        var _loop_1 = function (pos, n) {
            var node = nodes[pos];
            if (node.nodeType === Node.TEXT_NODE) {
                var text = node.textContent, match_1 = CURLIES.exec(text);
                // <div id="2">some text {{myProperty}}</div>
                if (match_1 !== null) {
                    var token = new TemplateTokenInfo(pos, TemplateTokenType.TEXT);
                    token.setCurly(match_1[1]);
                    hooks.push(token);
                }
            }
            else if (node.nodeType === Node.ELEMENT_NODE) {
                var matchingSelectors = selectors.filter(function (s) { return node.matches(s); });
                var inSubWidget = matchingSelectors.length;
                if (inSubWidget) {
                    for (var _i = 0, matchingSelectors_1 = matchingSelectors; _i < matchingSelectors_1.length; _i++) {
                        var selector = matchingSelectors_1[_i];
                        var token = new TemplateTokenInfo(pos, TemplateTokenType.TAG);
                        token.selector = selector;
                        hooks.push(token);
                    }
                }
                for (var _a = 0, _b = Array.from(node.attributes); _a < _b.length; _a++) {
                    var attribute = _b[_a];
                    var attributeName = attribute.nodeName;
                    if (attributeName === 'class') {
                        // <div id="2" class="red {{myClass}} blue">
                        var classes = Array.from(node.classList);
                        for (var _c = 0, classes_1 = classes; _c < classes_1.length; _c++) {
                            var cls = classes_1[_c];
                            if (match = cls.match(CURLIES)) {
                                node.classList.remove(match[0]);
                                var token = new TemplateTokenInfo(pos, TemplateTokenType.CLASS);
                                token.setCurly(match[1]);
                                hooks.push(token);
                            }
                        }
                    }
                    else if (match = attributeName.match(CURLIES)) {
                        // <div id="2" {{myProperty}}>
                        node.removeAttribute(match[0]);
                        var token = new TemplateTokenInfo(pos, TemplateTokenType.PROPERTY);
                        token.setCurly(hookMap[match[1]]);
                        hooks.push(token);
                    }
                    else if (!inSubWidget) {
                        if (attributeName === 'template') {
                            var token = new TemplateTokenInfo(pos, TemplateTokenType.TEMPLATE);
                            token.attribute = attributeName;
                            if (match = attribute.value.match(CURLIES)) {
                                token.setCurly(match[1]);
                            }
                            else {
                                token.setCurly(attribute.value);
                            }
                            hooks.push(token);
                        }
                        else {
                            // <div id="2" myProperty="{{myProperty}}">
                            var value = attribute.value;
                            if (match = value.match(CURLIES)) {
                                node.removeAttribute(attributeName);
                                var token = new TemplateTokenInfo(pos, TemplateTokenType.ATTRIBUTE);
                                token.setCurly(match[1]);
                                token.attribute = attributeName;
                                hooks.push(token);
                            }
                        }
                    }
                }
            }
        };
        for (var pos = 0, n = nodes.length; pos < n; pos++) {
            _loop_1(pos, n);
        }
        return hooks;
    };
    var Template = function (name) {
        if (name === void 0) { name = DEFAULT_TEMPLATE_NAME; }
        return function (proto, method) {
            var templateStr = proto[method].call(proto);
            var template = parseTemplate(templateStr);
            ensure(parsedTemplates, proto, (_a = {}, _a[name] = template, _a));
            var _a;
        };
    };

    var TransformerRegistry = {};

    var Inject = function () { return function (proto, property) {
        addToConstructorQueue(proto.constructor, function (widget) {
            var singleton = Singletons[property];
            if (isDef(singleton)) {
                widget[property] = singleton;
            }
        });
    }; };

    var TemplateNode = function (selector) { return function (proto, property) {
        addToRenderQueue(proto.constructor, function (widget, node) {
            if (isUndef(widget[property])) {
                widget[property] = node.querySelector(selector);
            }
        });
    }; };

    var inArray = new WeakMap();
    var injectArray = function (widget, array) {
        var proto = Object.getPrototypeOf(widget);
        if (inArray.has(proto)) {
            widget[inArray.get(proto)] = array;
        }
    };

    var subWidgets = new WeakMap();
    /*
     * This will fail for nested arrays when filtered elements are taken out of DOM,
     * however keeping track of the widget tree will make the framework way too complex.
     * For most use cases this will suffice and usually UI triggers changes from and to
     * visible elements. Dispatch code in connectTemplate method.
     */
    var UPDATE_KEY = '__update__';
    var Update = function () { return new CustomEvent(UPDATE_KEY, { bubbles: true, cancelable: false, scoped: false }); };
    var updateDomValue = function (node, info, value, oldValue) {
        if (info.type === TemplateTokenType.TEXT) {
            node.textContent = isDef(value) ? value : '';
        }
        else if (info.type === TemplateTokenType.CLASS) {
            !!oldValue && node.classList.remove(("" + oldValue).replace(/\s+/g, '-'));
            !!value && node.classList.add(("" + value).replace(/\s+/g, '-'));
        }
        else if (info.type === TemplateTokenType.ATTRIBUTE || info.type === TemplateTokenType.PROPERTY) {
            var attributeName = info.attribute || info.path();
            if (/checked|value|selectedIndex/i.test(attributeName)) {
                node[attributeName] = value;
            }
            else if (isUndef(value) || value === false) {
                node.removeAttribute(attributeName);
            }
            else {
                var attrValue = value === true ? '' : value;
                node.setAttribute(attributeName, attrValue);
            }
        }
        return value;
    };
    var updateDom = function (widget, template, transformMap, oldValueMap, noArray) {
        if (noArray === void 0) { noArray = false; }
        var domChanged = false;
        var valueMap = getCurrentValueMap(widget, template, transformMap);
        for (var info = void 0, i = 0, n = template.infos.length; i < n; i++) {
            info = template.infos[i];
            if (info.type === TemplateTokenType.TAG) {
                continue;
            }
            var value = valueMap[i];
            if (value === ARRAY_TAG) { // ignore array bindings
                continue;
            }
            if (value === FILTERED_ARRAY_TAG) { // filter other arrays
                if (!noArray) {
                    widget[info.path()].splice(0, 0);
                }
                continue;
            }
            var oldValue = oldValueMap[i];
            if (oldValue !== value) {
                domChanged = true;
                oldValueMap[i] = updateDomValue(template.nodes[info.position], info, value, oldValue);
            }
        }
        return {
            change: domChanged,
            valueMap: oldValueMap
        };
    };
    var bindWidget = function (widget, rootInfo, node) {
        var subWidget = new (Function.prototype.bind.apply(ConstructRegistry[rootInfo.selector]));
        ensure(subWidgets, widget, [subWidget]);
        var attributes = Array.prototype.slice.call(node.attributes);
        var _loop_1 = function (attribute, i, n) {
            attribute = attributes[i];
            var match = attribute.value.match(CURLIES);
            var subProp = camelCaseFromHyphens(attribute.name);
            if (match) {
                var prop_1 = match[1];
                var value = deepValue(widget, prop_1);
                if (isFunction(value)) {
                    subWidget[subProp] = value.bind(widget);
                }
                else {
                    if (~prop_1.indexOf(':')) {
                        throw Error("Cannot use transformer for " + prop_1);
                    }
                    var updateVal_1 = function () {
                        subWidget[subProp] = deepValue(widget, prop_1);
                        return updateVal_1;
                    };
                    addPropertyListener(widget, prop_1, updateVal_1());
                }
                node.removeAttribute(attribute.name);
            }
            else if (match = attribute.value.match(SINGLE_CURLIES)) {
                subWidget[subProp] = new Function("return " + match[1])();
                node.removeAttribute(attribute.name);
            }
            else {
                subWidget[subProp] = attribute.value;
            }
            out_attribute_1 = attribute;
        };
        var out_attribute_1;
        for (var attribute = void 0, i = 0, n = attributes.length; i < n; i++) {
            _loop_1(attribute, i, n);
            attribute = out_attribute_1;
        }
        runConstructorQueue(subWidget, node);
    };
    var ARRAY_TAG = Symbol('array_tag');
    var FILTERED_ARRAY_TAG = Symbol('filtered_array_tag');
    var getInfoValue = function (widget, info, transformMap) {
        var path = info.path(), transformer = transformMap[info.curly()];
        var v = deepValue(widget, path);
        if (info.type === TemplateTokenType.PROPERTY && Array.isArray(v)) {
            return isFunction(transformer(v)) ? FILTERED_ARRAY_TAG : ARRAY_TAG;
        }
        else {
            v = isFunction(v) ? v.call(widget) : v;
            v = transformer ? transformer(v) : v;
            return v;
        }
    };
    var getCurrentValueMap = function (widget, template, transformMap) {
        var map = [];
        for (var i = 0, n = template.infos.length; i < n; i++) {
            map[i] = getInfoValue(widget, template.infos[i], transformMap);
        }
        return map;
    };
    var bindArray = function (array, parentNode, widget, info, templateName, update) {
        var transformer = info.arrayTransformer() ? transformFactory(widget, info.transformers())() : undefined;
        var listener = domArrayListener(array, parentNode, update, function (item) {
            injectArray(item, array);
            var template = getTemplate(item, templateName()), node = template.nodes[1];
            runConstructorQueue(item, node);
            connectTemplate(item, node, template, parentNode);
            return node;
        }, transformer);
        observeArray(array, listener);
        return listener;
    };
    var getTransformMap = function (widget, template) {
        var map = {};
        for (var info = void 0, i = 0, n = template.infos.length; i < n; i++) {
            info = template.infos[i];
            var transformers = info.transformers();
            if (transformers) {
                map[info.curly()] = transformFactory(widget, transformers);
            }
        }
        return map;
    };
    var findTemplateInfoInNode = function (template, position) {
        return template.infos.find(function (i) { return i.position === position && i.attribute === 'template'; });
    };
    var findPropertyInfoInNode = function (template, position) {
        return template.infos.find(function (i) { return i.position === position && i.type === TemplateTokenType.PROPERTY; });
    };
    var addTemplateAttributeHook = function (widget, node, info, transformMap) {
        var value = getInfoValue(widget, info, transformMap);
        if (isDef(value)) {
            var updateTemplateNode_1 = function () {
                var value = getInfoValue(widget, info, transformMap);
                render(widget, node, value);
                return updateTemplateNode_1;
            };
            addPropertyListener(widget, info.path(), updateTemplateNode_1());
        }
        else {
            render(widget, node, info.curly());
        }
        node.removeAttribute('template');
    };
    var bindTemplateInfos = function (template, widget, updateTemplate, transformMap) {
        var bound = [];
        var infos = template.infos;
        var _loop_2 = function (info, i, n) {
            info = infos[i];
            var path = info.path();
            var value = deepValue(widget, info.path());
            var node = template.nodes[info.position];
            if (info.type === TemplateTokenType.TAG) {
                bindWidget(widget, info, node);
            }
            else if (info.type === TemplateTokenType.PROPERTY) {
                if (Array.isArray(value)) {
                    // check for dynamic template attribute
                    var templateInfo_1 = findTemplateInfoInNode(template, info.position);
                    var attributeValue_1 = node.getAttribute('template') || undefined;
                    var templateName = void 0;
                    if (isDef(templateInfo_1) && CURLIES.test(attributeValue_1)) {
                        templateName = function () { return getInfoValue(widget, templateInfo_1, transformMap); };
                        addPropertyListener(widget, templateInfo_1.path(), function () {
                            // this is expensive, should only run for particular listeners
                            value.splice.apply(value, [0, value.length].concat(value));
                        });
                    }
                    else {
                        templateName = function () { return attributeValue_1; };
                    }
                    bindArray(value, node, widget, info, templateName, updateTemplate);
                    node.removeAttribute('template');
                }
            }
            else if (isFunction(value)) {
                createComputedListener(widget, info, updateTemplate);
            }
            else if (info.type === TemplateTokenType.TEMPLATE) {
                var propInfo = findPropertyInfoInNode(template, info.position);
                if (isUndef(propInfo) || !Array.isArray(deepValue(widget, propInfo.path()))) {
                    addTemplateAttributeHook(widget, node, info, transformMap);
                }
            }
            else if (!bound.includes(path) && !Array.isArray(value)) {
                bound.push(path);
                createObjectPropertyListener(widget, path, function () { return updateTemplate(); });
            }
            out_info_1 = info;
        };
        var out_info_1;
        for (var info = void 0, i = 0, n = infos.length; i < n; i++) {
            _loop_2(info, i, n);
            info = out_info_1;
        }
    };
    var connectTemplate = function (widget, el, template, parentNode) {
        if (parentNode === void 0) { parentNode = el.parentNode; }
        var transformMap = getTransformMap(widget, template);
        var res = updateDom(widget, template, transformMap, []);
        var updateTemplate = function (noArray) {
            if (noArray === void 0) { noArray = false; }
            if (!mutedWidget.has(widget)) {
                res = updateDom(widget, template, transformMap, res.valueMap, noArray);
                if (res.change) {
                    parentNode.dispatchEvent(Update()); // let's inform parent widgets
                }
            }
        };
        el.addEventListener(UPDATE_KEY, function () { return updateTemplate(); }, { passive: true, capture: false });
        bindTemplateInfos(template, widget, updateTemplate, transformMap);
    };
    var transformFactory = function (widget, transformers) {
        return compose(transformers.map(function (m) {
            var transformer = (widget[m] || TransformerRegistry[m]);
            if (isUndef(transformer)) {
                throw Error("No transformer found for " + m + ". Implement function on " + widget.constructor.name + " or annotate a method with @Transformer()");
            }
            return transformer.bind(widget);
        }));
    };
    var render = function (widget, el, name) {
        var children = allChildNodes(el);
        for (var node = void 0, i = 1, n = children.length; i < n; i++) { // first element is 'el' itself
            node = children[i];
            if (node.parentNode === el) {
                el.removeChild(node);
            }
            cleanUp(node);
        }
        var template = getTemplate(widget, name);
        connectTemplate(widget, el, template);
        el.appendChild(template.doc);
        runAfterRenderQueue(widget, el);
    };
    var mutedWidget = new WeakMap();
    var Batch = function () { return function (proto, method) {
        addToConstructorQueue(proto.constructor, function (widget, el) {
            var old = widget[method];
            Object.defineProperty(widget, method, {
                value: function () {
                    mutedWidget.set(widget, true);
                    old.apply(widget, arguments);
                    mutedWidget.delete(widget);
                    el.dispatchEvent(Update());
                }
            });
        });
    }; };

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css = "[hidden] {\n    display: none !important;\n}\n";
    styleInject(css);

    var ListState;
    (function (ListState) {
        ListState[ListState["ALL"] = 0] = "ALL";
        ListState[ListState["COMPLETED"] = 1] = "COMPLETED";
        ListState[ListState["ACTIVE"] = 2] = "ACTIVE";
    })(ListState || (ListState = {}));
    var ENTER = 13;
    var ESC = 27;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __decorate$1(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    var Click = function (selector) { return On({ selector: selector, event: 'click', preventDefault: true }); };
    var TodoList = /** @class */ (function () {
        function TodoList() {
            var _this = this;
            this.state = ListState.ALL;
            this.todos = [];
            this.init = function (el) {
                render(_this, el);
            };
            this.listFilter = function () {
                return function (todo) { return _this.state === ListState.ALL ||
                    (_this.state === ListState.COMPLETED && todo.completed) ||
                    (_this.state === ListState.ACTIVE && !todo.completed); };
            };
            this.stateAll = function (s) { return _this.selectedState(s, ListState.ALL); };
            this.stateActive = function (s) { return _this.selectedState(s, ListState.ACTIVE); };
            this.stateCompleted = function (s) { return _this.selectedState(s, ListState.COMPLETED); };
            this.isEmpty = function () { return _this.todos.length === 0; };
            this.noCompleted = function () { return _this.completed() === 0; };
            this.pluralize = function () { return _this.active() === 1 ? 'item' : 'items'; };
            this.allCompleted = function () { return _this.completed() === _this.todos.length; };
            this.active = function () { return _this.todos.length - _this.completed(); };
            this.completed = function () { return _this.todos.filter(function (c) { return c.completed; }).length; };
            this.selectedState = function (s, state) { return s === state ? 'selected' : undefined; };
        }
        TodoList.prototype.newTodo = function (todo) {
            this.todos.push(todo);
        };
        TodoList.prototype.deleteTodo = function (todo) {
            removeFromArray(this.todos, [todo]);
        };
        TodoList.prototype.locationPath = function (params) {
            if (params.path === 'active') {
                this.state = ListState.ACTIVE;
            }
            else if (params.path === 'completed') {
                this.state = ListState.COMPLETED;
            }
        };
        TodoList.prototype.root = function () {
            this.state = ListState.ALL;
        };
        TodoList.prototype.clearCompleted = function () {
            removeFromArray(this.todos, this.todos.filter(function (t) { return t.completed; }));
        };
        TodoList.prototype.toggleAll = function () {
            var state = !this.allCompleted();
            this.todos.forEach(function (t) { return t.completed = state; });
        };
        TodoList.prototype.toHtml = function () {
            return "\n        <header class=\"header\"/>\n        <section class=\"main\">\n          <input class=\"toggle-all\" type=\"checkbox\" checked=\"{{todos:allCompleted}}\">\n          <label for=\"toggle-all\" hidden=\"{{todos:isEmpty}}\">Mark all as complete</label>\n          <ul class=\"todo-list\" {{todos:listFilter}}/>\n        </section>\n        <footer class=\"footer\" hidden=\"{{todos:isEmpty}}\">\n          <span class=\"todo-count\"><strong>{{todos:active}}</strong> {{todos:pluralize}} left</span>\n          <ul class=\"filters\">\n            <li><a class=\"{{state:stateAll}}\" href=\"#/\">All</a></li>\n            <li><a class=\"{{state:stateActive}}\" href=\"#/active\">Active</a></li>\n            <li><a class=\"{{state:stateCompleted}}\" href=\"#/completed\">Completed</a></li>\n          </ul>\n          <button class=\"clear-completed\" hidden=\"{{todos:noCompleted}}\">Clear completed</button>\n        </footer>";
        };
        __decorate$1([
            LocalStorage(function () { return Todo; })
        ], TodoList.prototype, "todos", void 0);
        __decorate$1([
            Route('/:path')
        ], TodoList.prototype, "locationPath", null);
        __decorate$1([
            Route('/')
        ], TodoList.prototype, "root", null);
        __decorate$1([
            Click('.clear-completed')
        ], TodoList.prototype, "clearCompleted", null);
        __decorate$1([
            Click('label[for="toggle-all"]'),
            Batch()
        ], TodoList.prototype, "toggleAll", null);
        __decorate$1([
            Template()
        ], TodoList.prototype, "toHtml", null);
        TodoList = __decorate$1([
            Construct({ selector: '.todoapp', singleton: true })
        ], TodoList);
        return TodoList;
    }());

    var Todo = /** @class */ (function () {
        function Todo(name, completed) {
            if (completed === void 0) { completed = false; }
            this.editing = false;
            this.completedClass = function (completed) { return completed ? 'completed' : undefined; };
            this.editingClass = function (editing) { return editing ? 'editing' : undefined; };
            this.completed = completed;
            this.name = name;
        }
        Todo.prototype.complete = function (ev) {
            this.completed = ev.target.checked;
        };
        Todo.prototype.deleteSelf = function () {
            this.todoList.deleteTodo(this);
        };
        Todo.prototype.startEditing = function () {
            this.edit.value = this.name;
            this.editing = true;
            this.edit.focus();
        };
        Todo.prototype.endEditing = function (ev) {
            if (ev.keyCode === ENTER) {
                this.name = this.edit.value.trim();
                if (!this.name) {
                    this.todoList.deleteTodo(this);
                }
                this.stopEditing();
            }
        };
        Todo.prototype.cancelEditing = function (ev) {
            if (ev.keyCode === ESC) {
                this.stopEditing();
            }
        };
        Todo.prototype.stopEditing = function () {
            this.editing = false;
        };
        Todo.prototype.toHtml = function () {
            return "\n        <li class=\"{{completed:completedClass}} {{editing:editingClass}}\">\n          <div class=\"view\">\n            <input class=\"toggle\" type=\"checkbox\" checked=\"{{completed}}\">\n            <label>{{name}}</label>\n            <button class=\"destroy\"></button>\n          </div>\n          <input class=\"edit\" placeholder=\"Create a TodoMVC template\" value=\"{{name}}\">\n        </li>";
        };
        __decorate$1([
            Storable()
        ], Todo.prototype, "completed", void 0);
        __decorate$1([
            Storable()
        ], Todo.prototype, "name", void 0);
        __decorate$1([
            Inject()
        ], Todo.prototype, "todoList", void 0);
        __decorate$1([
            TemplateNode('.edit')
        ], Todo.prototype, "edit", void 0);
        __decorate$1([
            On({ event: 'click', selector: '.toggle' })
        ], Todo.prototype, "complete", null);
        __decorate$1([
            Click('.destroy')
        ], Todo.prototype, "deleteSelf", null);
        __decorate$1([
            On({ event: 'dblclick', selector: 'label' })
        ], Todo.prototype, "startEditing", null);
        __decorate$1([
            On({ event: 'keyup', selector: '.edit' })
        ], Todo.prototype, "endEditing", null);
        __decorate$1([
            On({ event: 'keyup', scope: Scope.Direct })
        ], Todo.prototype, "cancelEditing", null);
        __decorate$1([
            On({ event: ['blur', 'focusout'], selector: 'input.edit', scope: Scope.Direct })
        ], Todo.prototype, "stopEditing", null);
        __decorate$1([
            Template()
        ], Todo.prototype, "toHtml", null);
        return Todo;
    }());

    var Header = /** @class */ (function () {
        function Header() {
        }
        Header.prototype.init = function (element) {
            render(this, element);
        };
        Header.prototype.createTodo = function (ev) {
            var e = this.edit;
            if (ev.keyCode === ENTER && !!e.value.trim()) {
                this.todoList.newTodo(new Todo(e.value));
                e.value = '';
            }
        };
        Header.prototype.toHtml = function () {
            return "\n            <h1>todos</h1>\n            <input class=\"new-todo\" id=\"new-todo\" placeholder=\"What needs to be done?\" autofocus>\n        ";
        };
        __decorate$1([
            Inject()
        ], Header.prototype, "todoList", void 0);
        __decorate$1([
            TemplateNode('.new-todo')
        ], Header.prototype, "edit", void 0);
        __decorate$1([
            On({ event: 'keypress', selector: 'input', scope: Scope.Direct })
        ], Header.prototype, "createTodo", null);
        __decorate$1([
            Template()
        ], Header.prototype, "toHtml", null);
        Header = __decorate$1([
            Construct({ selector: '.header' })
        ], Header);
        return Header;
    }());

    start();
    runRoutes();

    return exports;

}({}));
//# sourceMappingURL=todomvc.js.map
