/* feather-ts/todomvc vundefined */
var todomvc = (function (exports) {
	'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var objects = createCommonjsModule(function (module, exports) {
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];
	        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	            t[p] = s[p];
	    }
	    return t;
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.pathCallbacks = new WeakMap();
	exports.getSubset = function (keys, obj) {
	    return keys.reduce(function (a, c) {
	        return (__assign({}, a, (_a = {}, _a[c] = obj[c], _a)));
	        var _a;
	    }, {});
	};
	exports.isObject = function (obj) {
	    return (obj !== null && typeof (obj) === 'object' && Object.prototype.toString.call(obj) === '[object Object]');
	};
	exports.deepValue = function (obj, path) {
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
	exports.merge = function (a, b) {
	    if (a === void 0) { a = {}; }
	    for (var _i = 0, _a = Object.keys(b); _i < _a.length; _i++) {
	        var k = _a[_i];
	        var ak = a[k], bk = b[k];
	        if (Array.isArray(ak)) {
	            ak.push.apply(ak, bk);
	        }
	        else if (exports.isObject(ak)) {
	            exports.merge(ak, bk);
	        }
	        else {
	            a[k] = bk;
	        }
	    }
	    return a;
	};
	exports.ensure = function (map, obj, defaultValue) {
	    var lookup = map.get(obj);
	    if (!lookup) {
	        map.set(obj, lookup = defaultValue);
	    }
	    else if (Array.isArray(lookup) && Array.isArray(defaultValue)) {
	        lookup.push.apply(lookup, defaultValue);
	    }
	    else if (exports.isObject(lookup)) {
	        exports.merge(lookup, defaultValue);
	    }
	    return lookup;
	};
	exports.propertyCallbacks = new WeakMap();
	exports.addPropertyListener = function (obj, property, callback) {
	    var val = obj[property];
	    var observed = exports.propertyCallbacks.has(obj) && exports.propertyCallbacks.get(obj)[property];
	    exports.ensure(exports.propertyCallbacks, obj, (_a = {}, _a[property] = [callback], _a));
	    if (!observed) {
	        Object.defineProperty(obj, property, {
	            get: function () { return val; },
	            set: function (newVal) {
	                val = newVal;
	                for (var _i = 0, _a = exports.propertyCallbacks.get(obj)[property]; _i < _a.length; _i++) {
	                    var c = _a[_i];
	                    c(property);
	                }
	                return val;
	            }
	        });
	    }
	    var _a;
	};
	exports.createObjectPropertyListener = function (obj, pathStr, callback) {
	    var path = pathStr.split('.'), property = path.pop(), root = exports.deepValue(obj, path.join('.')), handler = function () {
	        for (var _i = 0, _a = exports.pathCallbacks.get(obj)[pathStr]; _i < _a.length; _i++) {
	            var cb = _a[_i];
	            cb();
	        }
	    };
	    exports.ensure(exports.pathCallbacks, obj, (_a = {}, _a[pathStr] = [callback], _a));
	    exports.addPropertyListener(root, property, handler);
	    var _a;
	};

	});

	var objects$1 = unwrapExports(objects);
	var objects_1 = objects.pathCallbacks;
	var objects_2 = objects.getSubset;
	var objects_3 = objects.isObject;
	var objects_4 = objects.deepValue;
	var objects_5 = objects.merge;
	var objects_6 = objects.ensure;
	var objects_7 = objects.propertyCallbacks;
	var objects_8 = objects.addPropertyListener;
	var objects_9 = objects.createObjectPropertyListener;

	var objects$2 = /*#__PURE__*/Object.freeze({
		default: objects$1,
		__moduleExports: objects,
		pathCallbacks: objects_1,
		getSubset: objects_2,
		isObject: objects_3,
		deepValue: objects_4,
		merge: objects_5,
		ensure: objects_6,
		propertyCallbacks: objects_7,
		addPropertyListener: objects_8,
		createObjectPropertyListener: objects_9
	});

	var dom = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
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
	exports.allChildNodes = allChildNodes;
	function allTextNodes(node) {
	    var a = [], walk = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
	    var n;
	    while (n = walk.nextNode()) {
	        a.push(n);
	    }
	    return a;
	}
	exports.allTextNodes = allTextNodes;

	});

	var dom$1 = unwrapExports(dom);
	var dom_1 = dom.allChildNodes;
	var dom_2 = dom.allTextNodes;

	var dom$2 = /*#__PURE__*/Object.freeze({
		default: dom$1,
		__moduleExports: dom,
		allChildNodes: dom_1,
		allTextNodes: dom_2
	});

	var objects_1$1 = ( objects$2 && objects$1 ) || objects$2;

	var dom_1$1 = ( dom$2 && dom$1 ) || dom$2;

	var cleanup = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var cleanUpQueue = new WeakMap();
	exports.registerCleanUp = function (node, task) { return objects_1$1.ensure(cleanUpQueue, node, [task]); };
	exports.cleanUp = function (node) { return setTimeout(function () {
	    for (var _i = 0, _a = dom_1$1.allChildNodes(node); _i < _a.length; _i++) {
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

	});

	var cleanup$1 = unwrapExports(cleanup);
	var cleanup_1 = cleanup.registerCleanUp;
	var cleanup_2 = cleanup.cleanUp;

	var cleanup$2 = /*#__PURE__*/Object.freeze({
		default: cleanup$1,
		__moduleExports: cleanup,
		registerCleanUp: cleanup_1,
		cleanUp: cleanup_2
	});

	var strings = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	function format(str, obj) {
	    return str.replace(/{{.*?}}/g, function (m) {
	        return objects_1$1.deepValue(obj, m.substring(2, m.length - 2));
	    });
	}
	exports.format = format;
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
	exports.namedRegexMatch = namedRegexMatch;
	exports.decapitalize = function (str) { return str.charAt(0).toLowerCase() + str.substr(1); };
	exports.camelCaseFromHyphens = function (str) {
	    return str.replace(/\b-([a-z])/g, function (all, char) { return char.toUpperCase(); });
	};

	});

	var strings$1 = unwrapExports(strings);
	var strings_1 = strings.format;
	var strings_2 = strings.namedRegexMatch;
	var strings_3 = strings.decapitalize;
	var strings_4 = strings.camelCaseFromHyphens;

	var strings$2 = /*#__PURE__*/Object.freeze({
		default: strings$1,
		__moduleExports: strings,
		format: strings_1,
		namedRegexMatch: strings_2,
		decapitalize: strings_3,
		camelCaseFromHyphens: strings_4
	});

	var cleanup_1$1 = ( cleanup$2 && cleanup$1 ) || cleanup$2;

	var strings_1$1 = ( strings$2 && strings$1 ) || strings$2;

	var construct = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	exports.ConstructRegistry = {};
	exports.Singletons = {};
	exports.start = function (root) {
	    if (root === void 0) { root = document.documentElement; }
	    var createdWidgets = [];
	    Object.keys(exports.ConstructRegistry).forEach(function (selector) {
	        Array.from(root.querySelectorAll(selector)).forEach(function (node) {
	            var widget = new (Function.prototype.bind.apply(exports.ConstructRegistry[selector]));
	            exports.runConstructorQueue(widget, node);
	            createdWidgets.push(widget);
	        });
	    });
	    return createdWidgets;
	};
	exports.Construct = function (conf) { return function (proto) {
	    exports.ConstructRegistry[conf.selector] = proto;
	    exports.addToConstructorQueue(proto, function (widget, node) {
	        if (conf.singleton === true) {
	            var name_1 = strings_1$1.decapitalize(widget.constructor.name);
	            exports.Singletons[name_1] = widget;
	            cleanup_1$1.registerCleanUp(node, function () {
	                delete exports.Singletons[name_1];
	            });
	        }
	        widget.init(node);
	    });
	}; };
	var queue = new WeakMap();
	exports.addToConstructorQueue = function (constructor, func) {
	    objects_1$1.ensure(queue, constructor, [func]);
	};
	exports.runConstructorQueue = function (widget, node) {
	    var widgetQueue = queue.get(Object.getPrototypeOf(widget).constructor) || [];
	    for (var i = 0, n = widgetQueue.length; i < n; i++) { // for performance
	        widgetQueue[i].call(widget, widget, node);
	    }
	};

	});

	var construct$1 = unwrapExports(construct);
	var construct_1 = construct.ConstructRegistry;
	var construct_2 = construct.Singletons;
	var construct_3 = construct.start;
	var construct_4 = construct.Construct;
	var construct_5 = construct.addToConstructorQueue;
	var construct_6 = construct.runConstructorQueue;

	var construct$2 = /*#__PURE__*/Object.freeze({
		default: construct$1,
		__moduleExports: construct,
		ConstructRegistry: construct_1,
		Singletons: construct_2,
		start: construct_3,
		Construct: construct_4,
		addToConstructorQueue: construct_5,
		runConstructorQueue: construct_6
	});

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

	function __decorate(decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	}

	var functions = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var getType = {}.toString;
	exports.compose = function (fns) { return function (res) {
	    if (fns.length === 1) {
	        return fns[0](res);
	    }
	    return fns.reduce(function (p, c) { return c(p); }, res);
	}; };
	exports.isFunction = function (functionToCheck) {
	    return functionToCheck && getType.call(functionToCheck) === '[object Function]';
	};
	exports.isDef = function (x) { return typeof x !== 'undefined'; };
	exports.isUndef = function (x) { return !exports.isDef(x); };

	});

	var functions$1 = unwrapExports(functions);
	var functions_1 = functions.compose;
	var functions_2 = functions.isFunction;
	var functions_3 = functions.isDef;
	var functions_4 = functions.isUndef;

	var functions$2 = /*#__PURE__*/Object.freeze({
		default: functions$1,
		__moduleExports: functions,
		compose: functions_1,
		isFunction: functions_2,
		isDef: functions_3,
		isUndef: functions_4
	});

	var construct_1$1 = ( construct$2 && construct$1 ) || construct$2;

	var functions_1$1 = ( functions$2 && functions$1 ) || functions$2;

	var inject = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	exports.Inject = function () { return function (proto, property) {
	    construct_1$1.addToConstructorQueue(proto.constructor, function (widget) {
	        var singleton = construct_1$1.Singletons[property];
	        if (functions_1$1.isDef(singleton)) {
	            widget[property] = singleton;
	        }
	    });
	}; };

	});

	var inject$1 = unwrapExports(inject);
	var inject_1 = inject.Inject;

	var inject$2 = /*#__PURE__*/Object.freeze({
		default: inject$1,
		__moduleExports: inject,
		Inject: inject_1
	});

	var template = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	var DEFAULT_TEMPLATE_NAME = '__default__';
	exports.parsedTemplates = new WeakMap();
	exports.SINGLE_CURLIES = /{(.*?)}/;
	exports.CURLIES = /{{(.*?)}}/;
	var ALL_CURLIES = /{{(.+?)}}/g;
	exports.selfClosingTags = /(<([^<>\s]+)(\s+[^<>\s'"=]+(=[\w\d]+|="[^"]*"|='[^']*'|={{?[^}]*?}?})?)*)\s*\/>/gmi;
	exports.openTags = '$1></$2>';
	var TemplateTokenType;
	(function (TemplateTokenType) {
	    TemplateTokenType[TemplateTokenType["CLASS"] = 0] = "CLASS";
	    TemplateTokenType[TemplateTokenType["PROPERTY"] = 1] = "PROPERTY";
	    TemplateTokenType[TemplateTokenType["ATTRIBUTE"] = 2] = "ATTRIBUTE";
	    TemplateTokenType[TemplateTokenType["TEMPLATE"] = 3] = "TEMPLATE";
	    TemplateTokenType[TemplateTokenType["TEXT"] = 4] = "TEXT";
	    TemplateTokenType[TemplateTokenType["TAG"] = 5] = "TAG";
	})(TemplateTokenType = exports.TemplateTokenType || (exports.TemplateTokenType = {}));
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
	        return this.transformers()[0] || 'arrayidentity';
	    };
	    return TemplateTokenInfo;
	}());
	exports.TemplateTokenInfo = TemplateTokenInfo;
	exports.breakApartTextNodes = function (root) {
	    var textNodes = dom_1$1.allTextNodes(root);
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
	exports.getFragment = function (html) {
	    return document.createRange().createContextualFragment(html);
	};
	var ParsedTemplate = /** @class */ (function () {
	    function ParsedTemplate(doc, nodes, infos) {
	        this.doc = doc;
	        this.infos = infos;
	        this.nodes = nodes;
	    }
	    ParsedTemplate.prototype.clone = function () {
	        var doc = this.doc.cloneNode(true);
	        return new ParsedTemplate(doc, dom_1$1.allChildNodes(doc), this.infos);
	    };
	    return ParsedTemplate;
	}());
	exports.ParsedTemplate = ParsedTemplate;
	exports.getTemplate = function (widget, name) {
	    if (name === void 0) { name = DEFAULT_TEMPLATE_NAME; }
	    var proto = Object.getPrototypeOf(widget);
	    var templates = exports.parsedTemplates.get(proto);
	    if (functions_1$1.isUndef(templates) || functions_1$1.isUndef(templates[name])) {
	        throw Error("No template found for name " + name + " in " + widget.constructor.name);
	    }
	    return templates[name].clone();
	};
	exports.parseTemplate = function (templateStr) {
	    var source = templateStr.replace(exports.selfClosingTags, exports.openTags), frag = exports.breakApartTextNodes(exports.getFragment(source)), allNodes = dom_1$1.allChildNodes(frag), hookMap = {}; // we need to remember case sensitive hooks, b/c attributes turn lowercase
	    var m;
	    while (m = ALL_CURLIES.exec(templateStr)) {
	        hookMap[m[1].toLowerCase()] = m[1];
	    }
	    return new ParsedTemplate(frag, allNodes, exports.parseHooks(allNodes, hookMap));
	};
	exports.parseHooks = function (nodes, hookMap) {
	    if (hookMap === void 0) { hookMap = {}; }
	    var hooks = [];
	    var selectors = Object.keys(construct_1$1.ConstructRegistry);
	    var match;
	    var _loop_1 = function (pos, n) {
	        var node = nodes[pos];
	        if (node.nodeType === Node.TEXT_NODE) {
	            var text = node.textContent, match_1 = exports.CURLIES.exec(text);
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
	                        if (match = cls.match(exports.CURLIES)) {
	                            node.classList.remove(match[0]);
	                            var token = new TemplateTokenInfo(pos, TemplateTokenType.CLASS);
	                            token.setCurly(match[1]);
	                            hooks.push(token);
	                        }
	                    }
	                }
	                else if (match = attributeName.match(exports.CURLIES)) {
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
	                        if (match = attribute.value.match(exports.CURLIES)) {
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
	                        if (match = value.match(exports.CURLIES)) {
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
	exports.Template = function (name) {
	    if (name === void 0) { name = DEFAULT_TEMPLATE_NAME; }
	    return function (proto, method) {
	        var templateStr = proto[method].call(proto);
	        var template = exports.parseTemplate(templateStr);
	        objects_1$1.ensure(exports.parsedTemplates, proto, (_a = {}, _a[name] = template, _a));
	        var _a;
	    };
	};

	});

	var template$1 = unwrapExports(template);
	var template_1 = template.parsedTemplates;
	var template_2 = template.SINGLE_CURLIES;
	var template_3 = template.CURLIES;
	var template_4 = template.selfClosingTags;
	var template_5 = template.openTags;
	var template_6 = template.TemplateTokenType;
	var template_7 = template.TemplateTokenInfo;
	var template_8 = template.breakApartTextNodes;
	var template_9 = template.getFragment;
	var template_10 = template.ParsedTemplate;
	var template_11 = template.getTemplate;
	var template_12 = template.parseTemplate;
	var template_13 = template.parseHooks;
	var template_14 = template.Template;

	var template$2 = /*#__PURE__*/Object.freeze({
		default: template$1,
		__moduleExports: template,
		parsedTemplates: template_1,
		SINGLE_CURLIES: template_2,
		CURLIES: template_3,
		selfClosingTags: template_4,
		openTags: template_5,
		TemplateTokenType: template_6,
		TemplateTokenInfo: template_7,
		breakApartTextNodes: template_8,
		getFragment: template_9,
		ParsedTemplate: template_10,
		getTemplate: template_11,
		parseTemplate: template_12,
		parseHooks: template_13,
		Template: template_14
	});

	var transformer = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	exports.TransformerRegistry = {
	    arrayidentity: function () { return function () { return true; }; }
	};
	exports.Transformer = function () { return function (proto, method) {
	    construct_1$1.addToConstructorQueue(proto.constructor, function (widget) {
	        exports.TransformerRegistry[method] = widget[method].bind(widget);
	    });
	}; };

	});

	var transformer$1 = unwrapExports(transformer);
	var transformer_1 = transformer.TransformerRegistry;
	var transformer_2 = transformer.Transformer;

	var transformer$2 = /*#__PURE__*/Object.freeze({
		default: transformer$1,
		__moduleExports: transformer,
		TransformerRegistry: transformer_1,
		Transformer: transformer_2
	});

	var arrays = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

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
	exports.removeFromArray = removeFromArray;
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
	        var indices = exports.range(0, arr.length - 1), args = cmp ? [
	            arr.map(function (e, i) { return i; })
	                .sort(function (a, b) { return cmp(arr[a], arr[b]); })
	                .map(function (e) { return indices[e]; })
	        ] : indices, res = old.call(arr, cmp);
	        notify(arr, 'sort', args);
	        return res;
	    };
	}
	exports.range = function (start, end) {
	    var len = end - start + 1, arr = new Array(len);
	    for (var i = 0, l = arr.length; i < l; i++) {
	        arr[i] = i + start;
	    }
	    return arr;
	};
	// essentially we can reduce array modifying functions to two implementations: sort and splice
	exports.observeArray = function (arr, listener) {
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
	function domArrayListener(arr, el, filter, onItemAdded) {
	    var firstChild = el.firstElementChild; // usually null, lists that share a parent with other nodes are prepended.
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
	            var patch = Array.from(nodeVisible);
	            nodeVisible.splice.apply(nodeVisible, [index, deleteCount].concat(added.map(function () { return false; })));
	            if (deleteCount) {
	                for (var _i = 0, deleted_1 = deleted; _i < deleted_1.length; _i++) {
	                    var del = deleted_1[_i];
	                    var node = elementMap.get(del);
	                    if (node.parentElement === el) {
	                        el.removeChild(node);
	                    }
	                    elementMap.delete(del);
	                    cleanup_1$1.cleanUp(node);
	                }
	            }
	            if (added.length) {
	                for (var _a = 0, added_1 = added; _a < added_1.length; _a++) {
	                    var item = added_1[_a];
	                    if (!elementMap.has(item)) {
	                        elementMap.set(item, onItemAdded(item));
	                    }
	                }
	            }
	            patch.splice.apply(patch, [index, deleteCount].concat(added.map(function () { return true; })));
	            for (var i = 0, n = arr.length; i < n; i++) {
	                patch[i] = filter(arr[i], i);
	                var itemNode = elementMap.get(arr[i]);
	                if (patch[i] && !nodeVisible[i]) {
	                    var nextVisible = nodeVisible.indexOf(true, i), refNode = ~nextVisible ? elementMap.get(arr[nextVisible]) : firstChild;
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
	    cleanup_1$1.registerCleanUp(el, function () { return observers.delete(arr); });
	    return listener;
	}
	exports.domArrayListener = domArrayListener;

	});

	var arrays$1 = unwrapExports(arrays);
	var arrays_1 = arrays.removeFromArray;
	var arrays_2 = arrays.range;
	var arrays_3 = arrays.observeArray;
	var arrays_4 = arrays.domArrayListener;

	var arrays$2 = /*#__PURE__*/Object.freeze({
		default: arrays$1,
		__moduleExports: arrays,
		removeFromArray: arrays_1,
		range: arrays_2,
		observeArray: arrays_3,
		domArrayListener: arrays_4
	});

	var computed = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	var computedProps = new WeakMap();
	exports.createComputedListener = function (widget, info, updateDom) {
	    var proto = Object.getPrototypeOf(widget);
	    if (!computedProps.has(proto) || !computedProps.get(proto)[info.path()]) {
	        throw Error('Bound functions must be decorated with @Computed(...paths: string[])');
	    }
	    computedProps.get(proto)[info.path()].forEach(function (prop) {
	        return objects_1$1.createObjectPropertyListener(widget, prop, function () { return updateDom(); });
	    });
	};
	exports.Computed = function () {
	    var paths = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        paths[_i] = arguments[_i];
	    }
	    return function (proto, method) {
	        objects_1$1.ensure(computedProps, proto, (_a = {}, _a[method] = paths, _a));
	        var _a;
	    };
	};

	});

	var computed$1 = unwrapExports(computed);
	var computed_1 = computed.createComputedListener;
	var computed_2 = computed.Computed;

	var computed$2 = /*#__PURE__*/Object.freeze({
		default: computed$1,
		__moduleExports: computed,
		createComputedListener: computed_1,
		Computed: computed_2
	});

	var templateNode = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	var TemplateNodes = new WeakMap();
	exports.TemplateNode = function (selector) { return function (proto, property) {
	    objects_1$1.ensure(TemplateNodes, proto, [{ selector: selector, property: property }]);
	}; };
	exports.injectTemplateNodes = function (widget, nodes) {
	    var proto = Object.getPrototypeOf(widget);
	    var bindings = TemplateNodes.get(proto);
	    if (functions_1$1.isDef(bindings)) {
	        for (var _i = 0, bindings_1 = bindings; _i < bindings_1.length; _i++) {
	            var b = bindings_1[_i];
	            for (var _a = 0, nodes_1 = nodes; _a < nodes_1.length; _a++) {
	                var n = nodes_1[_a];
	                widget[b.property] = n.querySelector(b.selector);
	                if (widget[b.property] !== null) {
	                    break;
	                }
	            }
	        }
	    }
	};

	});

	var templateNode$1 = unwrapExports(templateNode);
	var templateNode_1 = templateNode.TemplateNode;
	var templateNode_2 = templateNode.injectTemplateNodes;

	var templateNode$2 = /*#__PURE__*/Object.freeze({
		default: templateNode$1,
		__moduleExports: templateNode,
		TemplateNode: templateNode_1,
		injectTemplateNodes: templateNode_2
	});

	var template_1$1 = ( template$2 && template$1 ) || template$2;

	var transformer_1$1 = ( transformer$2 && transformer$1 ) || transformer$2;

	var arrays_1$1 = ( arrays$2 && arrays$1 ) || arrays$2;

	var computed_1$1 = ( computed$2 && computed$1 ) || computed$2;

	var template_node_1 = ( templateNode$2 && templateNode$1 ) || templateNode$2;

	var bind = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });











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
	    if (info.type === template_1$1.TemplateTokenType.TEXT) {
	        node.textContent = functions_1$1.isDef(value) ? value : '';
	    }
	    else if (info.type === template_1$1.TemplateTokenType.CLASS) {
	        !!oldValue && node.classList.remove(("" + oldValue).replace(/\s+/g, '-')) ||
	            !!value && node.classList.add(("" + value).replace(/\s+/g, '-'));
	    }
	    else if (info.type === template_1$1.TemplateTokenType.ATTRIBUTE || info.type === template_1$1.TemplateTokenType.PROPERTY) {
	        var attributeName = info.attribute || info.path();
	        if (/checked|value/i.test(attributeName)) {
	            node[attributeName] = value;
	        }
	        else if (functions_1$1.isUndef(value) || value === false) {
	            node.removeAttribute(attributeName);
	        }
	        else {
	            var attrValue = value === true ? '' : value;
	            node.setAttribute(attributeName, attrValue);
	        }
	    }
	    return value;
	};
	var updateDom = function (widget, template, transformMap, oldValueMap) {
	    var domChanged = false;
	    var valueMap = getCurrentValueMap(widget, template, transformMap);
	    for (var i = 0, n = template.infos.length; i < n; i++) {
	        var info = template.infos[i];
	        if (info.type === template_1$1.TemplateTokenType.TAG) {
	            continue;
	        }
	        var oldValue = oldValueMap[i], value = valueMap[i];
	        if (value === ARRAY_TAG) { // ignore arrays
	            widget[info.path()].splice(0, 0);
	            continue;
	        }
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
	    var subWidget = new (Function.prototype.bind.apply(construct_1$1.ConstructRegistry[rootInfo.selector]));
	    objects_1$1.ensure(subWidgets, widget, [subWidget]);
	    var attributes = Array.prototype.slice.call(node.attributes);
	    var _loop_1 = function (attribute, i, n) {
	        attribute = attributes[i];
	        var match = attribute.value.match(template_1$1.CURLIES);
	        var subProp = strings_1$1.camelCaseFromHyphens(attribute.name);
	        if (match) {
	            var prop_1 = match[1];
	            var value = objects_1$1.deepValue(widget, prop_1);
	            if (functions_1$1.isFunction(value)) {
	                subWidget[subProp] = value.bind(widget);
	            }
	            else {
	                if (~prop_1.indexOf(':')) {
	                    throw Error("Cannot use transformer for " + prop_1);
	                }
	                var updateVal_1 = function () {
	                    subWidget[subProp] = objects_1$1.deepValue(widget, prop_1);
	                    return updateVal_1;
	                };
	                objects_1$1.addPropertyListener(widget, prop_1, updateVal_1());
	            }
	            node.removeAttribute(attribute.name);
	        }
	        else if (match = attribute.value.match(template_1$1.SINGLE_CURLIES)) {
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
	    construct_1$1.runConstructorQueue(subWidget, node);
	};
	var FilteredArray = /** @class */ (function () {
	    function FilteredArray() {
	    }
	    return FilteredArray;
	}()); // flag class for update check
	var ARRAY_TAG = new FilteredArray();
	var getInfoValue = function (widget, info, transformMap) {
	    var path = info.path(), transformer = transformMap[info.curly()];
	    var v = objects_1$1.deepValue(widget, path);
	    if (Array.isArray(v) && functions_1$1.isFunction(transformer(v))) {
	        return ARRAY_TAG;
	    }
	    else {
	        v = functions_1$1.isFunction(v) ? v.call(widget) : v;
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
	var bindArray = function (array, parentNode, widget, info, templateName) {
	    var method = info.arrayTransformer(), transformer = (widget[method] || transformer_1$1.TransformerRegistry[method]).bind(widget);
	    var listener = arrays_1$1.domArrayListener(array, parentNode, transformer(), function (item) {
	        var template = template_1$1.getTemplate(item, templateName()), node = template.nodes[1];
	        construct_1$1.runConstructorQueue(item, node);
	        exports.connectTemplate(item, node, template, parentNode);
	        return node;
	    });
	    arrays_1$1.observeArray(array, listener);
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
	    return template.infos.find(function (i) { return i.position === position && i.type === template_1$1.TemplateTokenType.PROPERTY; });
	};
	var addTemplateAttributeHook = function (widget, node, info, transformMap) {
	    var value = getInfoValue(widget, info, transformMap);
	    if (functions_1$1.isDef(value)) {
	        var updateTemplateNode_1 = function () {
	            var value = getInfoValue(widget, info, transformMap);
	            exports.render(widget, node, value);
	            return updateTemplateNode_1;
	        };
	        objects_1$1.addPropertyListener(widget, info.path(), updateTemplateNode_1());
	    }
	    else {
	        exports.render(widget, node, info.curly());
	    }
	    node.removeAttribute('template');
	};
	var bindTemplateInfos = function (template, widget, updateTemplate, transformMap) {
	    var bound = [];
	    var infos = template.infos;
	    var _loop_2 = function (info, i, n) {
	        info = infos[i];
	        var path = info.path();
	        var value = objects_1$1.deepValue(widget, info.path());
	        var node = template.nodes[info.position];
	        if (info.type === template_1$1.TemplateTokenType.TAG) {
	            bindWidget(widget, info, node);
	        }
	        else if (info.type === template_1$1.TemplateTokenType.PROPERTY) {
	            if (Array.isArray(value)) {
	                // check for dynamic template attribute
	                var templateInfo_1 = findTemplateInfoInNode(template, info.position);
	                var attributeValue_1 = node.getAttribute('template') || undefined;
	                var templateName = void 0;
	                if (functions_1$1.isDef(templateInfo_1) && template_1$1.CURLIES.test(attributeValue_1)) {
	                    templateName = function () { return getInfoValue(widget, templateInfo_1, transformMap); };
	                    objects_1$1.addPropertyListener(widget, templateInfo_1.path(), function () {
	                        value.splice.apply(value, [0, value.length].concat(value));
	                    });
	                }
	                else {
	                    templateName = function () { return attributeValue_1; };
	                }
	                bindArray(value, node, widget, info, templateName);
	                node.removeAttribute('template');
	            }
	        }
	        else if (functions_1$1.isFunction(value)) {
	            computed_1$1.createComputedListener(widget, info, updateTemplate);
	        }
	        else if (info.type === template_1$1.TemplateTokenType.TEMPLATE) {
	            var propInfo = findPropertyInfoInNode(template, info.position);
	            if (functions_1$1.isUndef(propInfo) || !Array.isArray(objects_1$1.deepValue(widget, propInfo.path()))) {
	                addTemplateAttributeHook(widget, node, info, transformMap);
	            }
	        }
	        else if (!bound.includes(path) && !Array.isArray(value)) {
	            bound.push(path);
	            objects_1$1.createObjectPropertyListener(widget, path, function () { return updateTemplate(); });
	        }
	        out_info_1 = info;
	    };
	    var out_info_1;
	    for (var info = void 0, i = 0, n = infos.length; i < n; i++) {
	        _loop_2(info, i, n);
	        info = out_info_1;
	    }
	};
	exports.connectTemplate = function (widget, el, template, parentNode) {
	    if (parentNode === void 0) { parentNode = el.parentNode; }
	    var transformMap = getTransformMap(widget, template);
	    var res = updateDom(widget, template, transformMap, []);
	    var updateTemplate = function () {
	        if (!mutedWidget.has(widget)) {
	            res = updateDom(widget, template, transformMap, res.valueMap);
	            if (res.change) {
	                parentNode.dispatchEvent(Update()); // let's inform parent widgets
	            }
	        }
	    };
	    el.addEventListener(UPDATE_KEY, updateTemplate);
	    bindTemplateInfos(template, widget, updateTemplate, transformMap);
	    template_node_1.injectTemplateNodes(widget, template.nodes);
	};
	var transformFactory = function (widget, transformers) {
	    return functions_1$1.compose(transformers.map(function (m) {
	        var transformer = (widget[m] || transformer_1$1.TransformerRegistry[m]);
	        if (functions_1$1.isUndef(transformer)) {
	            throw Error("No transformer found for " + m + ". Implement function on " + widget.constructor.name + " or annotate a method with @Transformer()");
	        }
	        return transformer.bind(widget);
	    }));
	};
	exports.render = function (widget, el, name) {
	    var children = dom_1$1.allChildNodes(el);
	    for (var node = void 0, i = 0, n = children.length; i < n; i++) {
	        node = children[i];
	        if (node !== el) {
	            cleanup_1$1.cleanUp(node);
	        }
	    }
	    el.innerHTML = '';
	    var template = template_1$1.getTemplate(widget, name);
	    exports.connectTemplate(widget, el, template);
	    el.appendChild(template.doc);
	};
	exports.findWidgets = function (widget, type) {
	    return subWidgets.get(widget).filter(function (t) { return Object.getPrototypeOf(t) === type.prototype; });
	};
	exports.findWidget = function (widget, type) {
	    return exports.findWidgets(widget, type)[0];
	};
	var mutedWidget = new WeakMap();
	exports.Batch = function () { return function (proto, method) {
	    construct_1$1.addToConstructorQueue(proto.constructor, function (widget, el) {
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

	});

	var bind$1 = unwrapExports(bind);
	var bind_1 = bind.connectTemplate;
	var bind_2 = bind.render;
	var bind_3 = bind.findWidgets;
	var bind_4 = bind.findWidget;
	var bind_5 = bind.Batch;

	var bind$2 = /*#__PURE__*/Object.freeze({
		default: bind$1,
		__moduleExports: bind,
		connectTemplate: bind_1,
		render: bind_2,
		findWidgets: bind_3,
		findWidget: bind_4,
		Batch: bind_5
	});

	var event = createCommonjsModule(function (module, exports) {
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];
	        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	            t[p] = s[p];
	    }
	    return t;
	};
	Object.defineProperty(exports, "__esModule", { value: true });



	var Scope;
	(function (Scope) {
	    Scope[Scope["Direct"] = 0] = "Direct";
	    Scope[Scope["Delegate"] = 1] = "Delegate";
	    Scope[Scope["UntilMatch"] = 2] = "UntilMatch";
	})(Scope = exports.Scope || (exports.Scope = {}));
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
	        if (Scope.Direct && functions_1$1.isDef(conf.selector)) {
	            node = node.querySelector(conf.selector);
	        }
	        var handler = createHandler(event, conf, widget, node, conf.scope === Scope.Direct || functions_1$1.isUndef(conf.selector));
	        node.addEventListener(event, handler, conf.options);
	        cleanup_1$1.registerCleanUp(node, function () { return node.removeEventListener(event, handler); });
	    });
	}; };
	exports.On = function (conf) { return function (proto, method) {
	    var finalConf = __assign({}, conf, { method: method, event: conf.event || method, scope: Scope.Delegate });
	    construct_1$1.addToConstructorQueue(proto.constructor, attachEvents(finalConf));
	}; };

	});

	var event$1 = unwrapExports(event);
	var event_1 = event.Scope;
	var event_2 = event.On;

	var event$2 = /*#__PURE__*/Object.freeze({
		default: event$1,
		__moduleExports: event,
		Scope: event_1,
		On: event_2
	});

	var localStorage = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });




	var localStorageProperties = new WeakMap();
	var storableProperties = new WeakMap();
	var widgetId = function (widget) {
	    var id = widget.id || widget.name || widget.title || widget.constructor.name;
	    return functions_1$1.isFunction(id) ? id() : id;
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
	    if (!arr || functions_1$1.isUndef(props)) {
	        return;
	    }
	    return arr.map(function (i) {
	        return props.reduce(function (p, c) {
	            p[c] = i[c];
	            return p;
	        }, new (Function.prototype.bind.apply(proto)));
	    });
	};
	var storeArray = function (key, arr, proto) {
	    var props = storableProperties.get(proto);
	    if (functions_1$1.isUndef(props)) {
	        throw Error('@LocalStorage array items must have at least one @Storable() property');
	    }
	    var value = arr.map(function (i) { return objects_1$1.getSubset(props, i); });
	    setTimeout(function () { return store(key, value); }, 80);
	};
	var storeListener = function (arr, callback) {
	    var listener = {
	        sort: callback,
	        splice: function (i, d, a) {
	            if (a.length) {
	                a.forEach(function (item) {
	                    var proto = Object.getPrototypeOf(item), props = storableProperties.get(proto.constructor);
	                    props.forEach(function (prop) {
	                        objects_1$1.addPropertyListener(item, prop, callback);
	                    });
	                });
	            }
	            if (a.length || d > 0) {
	                callback();
	            }
	        }
	    };
	    arrays_1$1.observeArray(arr, listener);
	    listener.splice(0, 0, arr);
	};
	var handler = function (arrayType) { return function (widget) {
	    var props = localStorageProperties.get(Object.getPrototypeOf(widget));
	    if (props) {
	        props.forEach(function (prop) {
	            var storeKey = widgetId(widget) + '.' + prop;
	            var value = widget[prop];
	            if (Array.isArray(value)) {
	                var type_1 = functions_1$1.isDef(arrayType) ? arrayType() : undefined;
	                if (functions_1$1.isUndef(type_1)) {
	                    throw Error('Stored arrays need an arrayType argument');
	                }
	                try {
	                    var tryValue = loadArray(storeKey, type_1);
	                    if (functions_1$1.isDef(tryValue)) {
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
	                if (functions_1$1.isDef(tryValue)) {
	                    widget[prop] = tryValue;
	                }
	                objects_1$1.addPropertyListener(widget, prop, function () {
	                    store(storeKey, widget[prop]);
	                });
	            }
	        });
	    }
	}; };
	exports.LocalStorage = function (arrayType) { return function (proto, property) {
	    objects_1$1.ensure(localStorageProperties, proto, [property]);
	    construct_1$1.addToConstructorQueue(proto.constructor, handler(arrayType));
	}; };
	exports.Storable = function () { return function (proto, property) {
	    objects_1$1.ensure(storableProperties, proto.constructor, [property]);
	}; };
	// todo: write test somehow

	});

	var localStorage$1 = unwrapExports(localStorage);
	var localStorage_1 = localStorage.LocalStorage;
	var localStorage_2 = localStorage.Storable;

	var localStorage$2 = /*#__PURE__*/Object.freeze({
		default: localStorage$1,
		__moduleExports: localStorage,
		LocalStorage: localStorage_1,
		Storable: localStorage_2
	});

	var router = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });



	exports.routeListeners = {};
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
	        return strings_1$1.namedRegexMatch(input, finalR, names);
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
	    Object.values(exports.routeListeners).forEach(function (handlers) {
	        return handlers.forEach(function (rh) {
	            var matchedParams = namedMatch(rh.route, route);
	            if (matchedParams) {
	                rh.callback(matchedParams);
	            }
	        });
	    });
	};
	exports.navigate = function (path) {
	    if (historyAPI) {
	        history.pushState(null, '', path);
	        notifyListeners(getCurrentRoute());
	    }
	    else {
	        location.hash = path;
	    }
	};
	exports.runRoutes = function () {
	    if (!window['blockRouting']) {
	        notifyListeners(getCurrentRoute());
	    }
	    window.addEventListener(historyAPI ? 'popstate' : 'hashchange', function () { return notifyListeners(getCurrentRoute()); }, false);
	};
	exports.Route = function (route) { return function (proto, method) {
	    construct_1$1.addToConstructorQueue(proto.constructor, function (widget, node) {
	        if (!exports.routeListeners[route]) {
	            exports.routeListeners[route] = [];
	        }
	        var handler = { route: route, callback: widget[method].bind(widget) };
	        exports.routeListeners[route].push(handler);
	        cleanup_1$1.registerCleanUp(node, function () { return exports.routeListeners[route].splice(exports.routeListeners[route].indexOf(handler), 1); });
	    });
	}; };

	});

	var router$1 = unwrapExports(router);
	var router_1 = router.routeListeners;
	var router_2 = router.navigate;
	var router_3 = router.runRoutes;
	var router_4 = router.Route;

	var router$2 = /*#__PURE__*/Object.freeze({
		default: router$1,
		__moduleExports: router,
		routeListeners: router_1,
		navigate: router_2,
		runRoutes: router_3,
		Route: router_4
	});

	var Click = function (selector) { return event_2({ selector: selector, event: 'click', preventDefault: true }); };
	var TodoList = /** @class */ (function () {
	    function TodoList() {
	        var _this = this;
	        this.state = ListState.ALL;
	        this.todos = [];
	        this.init = function (el) { return bind_2(_this, el); };
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
	        arrays_1(this.todos, [todo]);
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
	        arrays_1(this.todos, this.todos.filter(function (t) { return t.completed; }));
	    };
	    TodoList.prototype.toggleAll = function () {
	        var state = !this.allCompleted();
	        this.todos.forEach(function (t) { return t.completed = state; });
	    };
	    TodoList.prototype.toHtml = function () {
	        return "\n        <header class=\"header\"/>\n        <section class=\"main\">\n          <input class=\"toggle-all\" type=\"checkbox\" checked=\"{{todos:allCompleted}}\">\n          <label for=\"toggle-all\" hidden=\"{{todos:isEmpty}}\">Mark all as complete</label>\n          <ul class=\"todo-list\" {{todos:listFilter}}/>\n        </section>\n        <footer class=\"footer\" hidden=\"{{todos:isEmpty}}\">\n          <span class=\"todo-count\"><strong>{{todos:active}}</strong> {{todos:pluralize}} left</span>\n          <ul class=\"filters\">\n            <li><a class=\"{{state:stateAll}}\" href=\"#/\">All</a></li>\n            <li><a class=\"{{state:stateActive}}\" href=\"#/active\">Active</a></li>\n            <li><a class=\"{{state:stateCompleted}}\" href=\"#/completed\">Completed</a></li>\n          </ul>\n          <button class=\"clear-completed\" hidden=\"{{todos:noCompleted}}\">Clear completed</button>\n        </footer>";
	    };
	    __decorate([
	        localStorage_1(function () { return Todo; })
	    ], TodoList.prototype, "todos", void 0);
	    __decorate([
	        router_4('/:path')
	    ], TodoList.prototype, "locationPath", null);
	    __decorate([
	        router_4('/')
	    ], TodoList.prototype, "root", null);
	    __decorate([
	        Click('.clear-completed')
	    ], TodoList.prototype, "clearCompleted", null);
	    __decorate([
	        Click('label[for="toggle-all"]'),
	        bind_5()
	    ], TodoList.prototype, "toggleAll", null);
	    __decorate([
	        template_14()
	    ], TodoList.prototype, "toHtml", null);
	    TodoList = __decorate([
	        construct_4({ selector: '.todoapp', singleton: true })
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
	    Todo.prototype.startEditing = function (ev, label) {
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
	    __decorate([
	        localStorage_2()
	    ], Todo.prototype, "completed", void 0);
	    __decorate([
	        localStorage_2()
	    ], Todo.prototype, "name", void 0);
	    __decorate([
	        inject_1()
	    ], Todo.prototype, "todoList", void 0);
	    __decorate([
	        templateNode_1('.edit')
	    ], Todo.prototype, "edit", void 0);
	    __decorate([
	        event_2({ event: 'click', selector: '.toggle' })
	    ], Todo.prototype, "complete", null);
	    __decorate([
	        Click('.destroy')
	    ], Todo.prototype, "deleteSelf", null);
	    __decorate([
	        event_2({ event: 'dblclick', selector: 'label' })
	    ], Todo.prototype, "startEditing", null);
	    __decorate([
	        event_2({ event: 'keyup', selector: '.edit' })
	    ], Todo.prototype, "endEditing", null);
	    __decorate([
	        event_2({ event: 'keyup', scope: event_1.Direct })
	    ], Todo.prototype, "cancelEditing", null);
	    __decorate([
	        event_2({ event: ['blur', 'focusout'], selector: 'input.edit', scope: event_1.Direct })
	    ], Todo.prototype, "stopEditing", null);
	    __decorate([
	        template_14()
	    ], Todo.prototype, "toHtml", null);
	    return Todo;
	}());

	var Header = /** @class */ (function () {
	    function Header() {
	    }
	    Header.prototype.init = function (element) {
	        bind_2(this, element);
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
	    __decorate([
	        inject_1()
	    ], Header.prototype, "todoList", void 0);
	    __decorate([
	        templateNode_1('input')
	    ], Header.prototype, "edit", void 0);
	    __decorate([
	        event_2({ event: 'keypress', selector: 'input', scope: event_1.Direct })
	    ], Header.prototype, "createTodo", null);
	    __decorate([
	        template_14()
	    ], Header.prototype, "toHtml", null);
	    Header = __decorate([
	        construct_4({ selector: '.header' })
	    ], Header);
	    return Header;
	}());

	var fetch_1 = createCommonjsModule(function (module, exports) {
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var __assign = (commonjsGlobal && commonjsGlobal.__assign) || Object.assign || function(t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];
	        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
	            t[p] = s[p];
	    }
	    return t;
	};
	Object.defineProperty(exports, "__esModule", { value: true });




	var fetchErrors = new WeakMap();
	var defaultProcessor = function (res) { return res.json(); };
	var handleErrors = function (response) {
	    if (!response.ok) {
	        throw new ResponseError(response.statusText, response);
	    }
	    return response;
	};
	var ResponseError = /** @class */ (function (_super) {
	    __extends(ResponseError, _super);
	    function ResponseError(message, response) {
	        var _this = _super.call(this, message) || this;
	        _this.response = response;
	        return _this;
	    }
	    return ResponseError;
	}(Error));
	var execFetch = function (url, conf, processor) {
	    if (processor === void 0) { processor = defaultProcessor; }
	    return fetch(url, conf)
	        .then(handleErrors)
	        .then(processor);
	};
	var Xhr = function (fetchMethod) { return function (conf) { return function (proto, method) {
	    construct_1$1.addToConstructorQueue(proto.constructor, function (widget) {
	        var oldMethod = proto[method];
	        widget[method] = function (body) {
	            var payload = [body]
	                .filter(functions_1$1.isDef)
	                .map(function (body) { return typeof body === 'string' ? body : JSON.stringify(body); });
	            var finalConf = Object
	                .keys(conf)
	                .reduce(function (p, c) {
	                return (p[c] = functions_1$1.isFunction(p[c]) ? p[c].call(widget) : p[c]) && p;
	            }, __assign({}, conf, { url: strings_1$1.format(conf.url, widget), body: payload[0], method: fetchMethod }));
	            return execFetch(finalConf.url, finalConf, finalConf.processor)
	                .then(function (res) {
	                oldMethod.apply(widget, payload.concat([res]));
	                return res;
	            }) // if await should not be used
	                .catch(function (error) {
	                if (fetchErrors.has(proto)) {
	                    var errFunc = fetchErrors.get(proto)["" + error.response.status];
	                    if (errFunc) {
	                        widget[errFunc].call(widget, error);
	                    }
	                }
	            });
	        };
	    });
	}; }; };
	exports.Get = Xhr('GET');
	exports.Post = Xhr('POST');
	exports.Delete = Xhr('DELETE');
	exports.Put = Xhr('PUT');
	exports.FetchError = function (status) { return function (proto, method) {
	    objects_1$1.ensure(fetchErrors, proto, (_a = {}, _a["" + status] = method, _a));
	    var _a;
	}; };

	});

	var fetch$1 = unwrapExports(fetch_1);
	var fetch_2 = fetch_1.Get;
	var fetch_3 = fetch_1.Post;
	var fetch_4 = fetch_1.Delete;
	var fetch_5 = fetch_1.Put;
	var fetch_6 = fetch_1.FetchError;

	var fetch$2 = /*#__PURE__*/Object.freeze({
		default: fetch$1,
		__moduleExports: fetch_1,
		Get: fetch_2,
		Post: fetch_3,
		Delete: fetch_4,
		Put: fetch_5,
		FetchError: fetch_6
	});

	var mediaQuery = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	exports.MediaQuery = function (query) { return function (proto, method) {
	    construct_1$1.addToConstructorQueue(proto.constructor, function (widget, node) {
	        var handler = function (mq) {
	            if (mq.matches) {
	                proto[method].call(widget, node);
	            }
	            return handler;
	        };
	        var mediaQueryList = window.matchMedia(query);
	        mediaQueryList.addListener(handler(mediaQueryList));
	        cleanup_1$1.registerCleanUp(node, function () { return mediaQueryList.removeListener(handler); });
	    });
	}; };
	// todo: write test somehow

	});

	var mediaQuery$1 = unwrapExports(mediaQuery);
	var mediaQuery_1 = mediaQuery.MediaQuery;

	var mediaQuery$2 = /*#__PURE__*/Object.freeze({
		default: mediaQuery$1,
		__moduleExports: mediaQuery,
		MediaQuery: mediaQuery_1
	});

	var require$$6 = ( event$2 && event$1 ) || event$2;

	var require$$7 = ( fetch$2 && fetch$1 ) || fetch$2;

	var require$$8 = ( localStorage$2 && localStorage$1 ) || localStorage$2;

	var require$$9 = ( mediaQuery$2 && mediaQuery$1 ) || mediaQuery$2;

	var require$$10 = ( router$2 && router$1 ) || router$2;

	var require$$13 = ( inject$2 && inject$1 ) || inject$2;

	var require$$15 = ( bind$2 && bind$1 ) || bind$2;

	var feather = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

















	var functions_1 = functions_1$1;
	exports.isDef = functions_1.isDef;
	exports.isUndef = functions_1.isUndef;
	exports.isFunction = functions_1.isFunction;
	exports.compose = functions_1.compose;
	var arrays_1 = arrays_1$1;
	exports.observeArray = arrays_1.observeArray;
	exports.range = arrays_1.range;
	exports.removeFromArray = arrays_1.removeFromArray;
	var objects_1 = objects_1$1;
	exports.ensure = objects_1.ensure;
	exports.addPropertyListener = objects_1.addPropertyListener;
	exports.deepValue = objects_1.deepValue;
	exports.getSubset = objects_1.getSubset;
	exports.isObject = objects_1.isObject;
	exports.merge = objects_1.merge;
	var dom_1 = dom_1$1;
	exports.allChildNodes = dom_1.allChildNodes;
	exports.allTextNodes = dom_1.allTextNodes;
	var computed_1 = computed_1$1;
	exports.Computed = computed_1.Computed;
	var construct_1 = construct_1$1;
	exports.start = construct_1.start;
	exports.addToConstructorQueue = construct_1.addToConstructorQueue;
	exports.Construct = construct_1.Construct;
	var event_1 = require$$6;
	exports.On = event_1.On;
	exports.Scope = event_1.Scope;
	var fetch_1 = require$$7;
	exports.Delete = fetch_1.Delete;
	exports.Get = fetch_1.Get;
	exports.Post = fetch_1.Post;
	exports.Put = fetch_1.Put;
	var local_storage_1 = require$$8;
	exports.Storable = local_storage_1.Storable;
	exports.LocalStorage = local_storage_1.LocalStorage;
	var media_query_1 = require$$9;
	exports.MediaQuery = media_query_1.MediaQuery;
	var router_1 = require$$10;
	exports.navigate = router_1.navigate;
	exports.runRoutes = router_1.runRoutes;
	var transformer_1 = transformer_1$1;
	exports.Transformer = transformer_1.Transformer;
	var inject_1 = require$$13;
	exports.Inject = inject_1.Inject;
	var template_1 = template_1$1;
	exports.Template = template_1.Template;
	var template_node_1$$1 = template_node_1;
	exports.TemplateNode = template_node_1$$1.TemplateNode;
	var bind_1 = require$$15;
	exports.findWidget = bind_1.findWidget;
	exports.findWidgets = bind_1.findWidgets;
	exports.render = bind_1.render;
	exports.Batch = bind_1.Batch;
	var cleanup_1 = cleanup_1$1;
	exports.registerCleanUp = cleanup_1.registerCleanUp;

	});

	unwrapExports(feather);
	var feather_1 = feather.isDef;
	var feather_2 = feather.isUndef;
	var feather_3 = feather.isFunction;
	var feather_4 = feather.compose;
	var feather_5 = feather.observeArray;
	var feather_6 = feather.range;
	var feather_7 = feather.removeFromArray;
	var feather_8 = feather.ensure;
	var feather_9 = feather.addPropertyListener;
	var feather_10 = feather.deepValue;
	var feather_11 = feather.getSubset;
	var feather_12 = feather.isObject;
	var feather_13 = feather.merge;
	var feather_14 = feather.allChildNodes;
	var feather_15 = feather.allTextNodes;
	var feather_16 = feather.Computed;
	var feather_17 = feather.start;
	var feather_18 = feather.addToConstructorQueue;
	var feather_19 = feather.Construct;
	var feather_20 = feather.On;
	var feather_21 = feather.Scope;
	var feather_22 = feather.Delete;
	var feather_23 = feather.Get;
	var feather_24 = feather.Post;
	var feather_25 = feather.Put;
	var feather_26 = feather.Storable;
	var feather_27 = feather.LocalStorage;
	var feather_28 = feather.MediaQuery;
	var feather_29 = feather.navigate;
	var feather_30 = feather.runRoutes;
	var feather_31 = feather.Transformer;
	var feather_32 = feather.Inject;
	var feather_33 = feather.Template;
	var feather_34 = feather.TemplateNode;
	var feather_35 = feather.findWidget;
	var feather_36 = feather.findWidgets;
	var feather_37 = feather.render;
	var feather_38 = feather.Batch;
	var feather_39 = feather.registerCleanUp;

	construct_3();
	feather_30();

	return exports;

}({}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9kb212Yy5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL0BmZWF0aGVyLXRzL2ZlYXRoZXItdHMvZGlzdC91dGlscy9vYmplY3RzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BmZWF0aGVyLXRzL2ZlYXRoZXItdHMvZGlzdC91dGlscy9kb20uanMiLCIuLi9ub2RlX21vZHVsZXMvQGZlYXRoZXItdHMvZmVhdGhlci10cy9kaXN0L2NvcmUvY2xlYW51cC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZmVhdGhlci10cy9mZWF0aGVyLXRzL2Rpc3QvdXRpbHMvc3RyaW5ncy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZmVhdGhlci10cy9mZWF0aGVyLXRzL2Rpc3QvZGVjb3JhdG9ycy9jb25zdHJ1Y3QuanMiLCIuLi9ub2RlX21vZHVsZXMvc3R5bGUtaW5qZWN0L2Rpc3Qvc3R5bGUtaW5qZWN0LmVzLmpzIiwiLi4vc3JjL3R5cGVzY3JpcHQvY29uZmlnLnRzIiwiLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZmVhdGhlci10cy9mZWF0aGVyLXRzL2Rpc3QvdXRpbHMvZnVuY3Rpb25zLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BmZWF0aGVyLXRzL2ZlYXRoZXItdHMvZGlzdC9kZWNvcmF0b3JzL2luamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZmVhdGhlci10cy9mZWF0aGVyLXRzL2Rpc3QvZGVjb3JhdG9ycy90ZW1wbGF0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZmVhdGhlci10cy9mZWF0aGVyLXRzL2Rpc3QvZGVjb3JhdG9ycy90cmFuc2Zvcm1lci5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZmVhdGhlci10cy9mZWF0aGVyLXRzL2Rpc3QvdXRpbHMvYXJyYXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BmZWF0aGVyLXRzL2ZlYXRoZXItdHMvZGlzdC9kZWNvcmF0b3JzL2NvbXB1dGVkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BmZWF0aGVyLXRzL2ZlYXRoZXItdHMvZGlzdC9kZWNvcmF0b3JzL3RlbXBsYXRlLW5vZGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGZlYXRoZXItdHMvZmVhdGhlci10cy9kaXN0L2NvcmUvYmluZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZmVhdGhlci10cy9mZWF0aGVyLXRzL2Rpc3QvZGVjb3JhdG9ycy9ldmVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZmVhdGhlci10cy9mZWF0aGVyLXRzL2Rpc3QvZGVjb3JhdG9ycy9sb2NhbC1zdG9yYWdlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BmZWF0aGVyLXRzL2ZlYXRoZXItdHMvZGlzdC9kZWNvcmF0b3JzL3JvdXRlci5qcyIsIi4uL3NyYy90eXBlc2NyaXB0L3RvZG8tbGlzdC50cyIsIi4uL3NyYy90eXBlc2NyaXB0L3RvZG8udHMiLCIuLi9zcmMvdHlwZXNjcmlwdC9oZWFkZXIudHMiLCIuLi9ub2RlX21vZHVsZXMvQGZlYXRoZXItdHMvZmVhdGhlci10cy9kaXN0L2RlY29yYXRvcnMvZmV0Y2guanMiLCIuLi9ub2RlX21vZHVsZXMvQGZlYXRoZXItdHMvZmVhdGhlci10cy9kaXN0L2RlY29yYXRvcnMvbWVkaWEtcXVlcnkuanMiLCIuLi9ub2RlX21vZHVsZXMvQGZlYXRoZXItdHMvZmVhdGhlci10cy9kaXN0L2ZlYXRoZXIuanMiLCIuLi9zcmMvdHlwZXNjcmlwdC9zdGFydC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnBhdGhDYWxsYmFja3MgPSBuZXcgV2Vha01hcCgpO1xyXG5leHBvcnRzLmdldFN1YnNldCA9IGZ1bmN0aW9uIChrZXlzLCBvYmopIHtcclxuICAgIHJldHVybiBrZXlzLnJlZHVjZShmdW5jdGlvbiAoYSwgYykge1xyXG4gICAgICAgIHJldHVybiAoX19hc3NpZ24oe30sIGEsIChfYSA9IHt9LCBfYVtjXSA9IG9ialtjXSwgX2EpKSk7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgfSwge30pO1xyXG59O1xyXG5leHBvcnRzLmlzT2JqZWN0ID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgcmV0dXJuIChvYmogIT09IG51bGwgJiYgdHlwZW9mIChvYmopID09PSAnb2JqZWN0JyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScpO1xyXG59O1xyXG5leHBvcnRzLmRlZXBWYWx1ZSA9IGZ1bmN0aW9uIChvYmosIHBhdGgpIHtcclxuICAgIGlmICghcGF0aCkge1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICB2YXIgcGF0aHMgPSBwYXRoLnNwbGl0KCcuJyk7XHJcbiAgICB2YXIgY3VycmVudCA9IG9iaiwgaSwgbjtcclxuICAgIGZvciAoaSA9IDAsIG4gPSBwYXRocy5sZW5ndGg7IGkgPCBuOyArK2kpIHtcclxuICAgICAgICBpZiAoY3VycmVudFtwYXRoc1tpXV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbcGF0aHNbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjdXJyZW50O1xyXG59O1xyXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgIGlmIChhID09PSB2b2lkIDApIHsgYSA9IHt9OyB9XHJcbiAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gT2JqZWN0LmtleXMoYik7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgdmFyIGsgPSBfYVtfaV07XHJcbiAgICAgICAgdmFyIGFrID0gYVtrXSwgYmsgPSBiW2tdO1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGFrKSkge1xyXG4gICAgICAgICAgICBhay5wdXNoLmFwcGx5KGFrLCBiayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGV4cG9ydHMuaXNPYmplY3QoYWspKSB7XHJcbiAgICAgICAgICAgIGV4cG9ydHMubWVyZ2UoYWssIGJrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFba10gPSBiaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYTtcclxufTtcclxuZXhwb3J0cy5lbnN1cmUgPSBmdW5jdGlvbiAobWFwLCBvYmosIGRlZmF1bHRWYWx1ZSkge1xyXG4gICAgdmFyIGxvb2t1cCA9IG1hcC5nZXQob2JqKTtcclxuICAgIGlmICghbG9va3VwKSB7XHJcbiAgICAgICAgbWFwLnNldChvYmosIGxvb2t1cCA9IGRlZmF1bHRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KGxvb2t1cCkgJiYgQXJyYXkuaXNBcnJheShkZWZhdWx0VmFsdWUpKSB7XHJcbiAgICAgICAgbG9va3VwLnB1c2guYXBwbHkobG9va3VwLCBkZWZhdWx0VmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZXhwb3J0cy5pc09iamVjdChsb29rdXApKSB7XHJcbiAgICAgICAgZXhwb3J0cy5tZXJnZShsb29rdXAsIGRlZmF1bHRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbG9va3VwO1xyXG59O1xyXG5leHBvcnRzLnByb3BlcnR5Q2FsbGJhY2tzID0gbmV3IFdlYWtNYXAoKTtcclxuZXhwb3J0cy5hZGRQcm9wZXJ0eUxpc3RlbmVyID0gZnVuY3Rpb24gKG9iaiwgcHJvcGVydHksIGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgdmFsID0gb2JqW3Byb3BlcnR5XTtcclxuICAgIHZhciBvYnNlcnZlZCA9IGV4cG9ydHMucHJvcGVydHlDYWxsYmFja3MuaGFzKG9iaikgJiYgZXhwb3J0cy5wcm9wZXJ0eUNhbGxiYWNrcy5nZXQob2JqKVtwcm9wZXJ0eV07XHJcbiAgICBleHBvcnRzLmVuc3VyZShleHBvcnRzLnByb3BlcnR5Q2FsbGJhY2tzLCBvYmosIChfYSA9IHt9LCBfYVtwcm9wZXJ0eV0gPSBbY2FsbGJhY2tdLCBfYSkpO1xyXG4gICAgaWYgKCFvYnNlcnZlZCkge1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3BlcnR5LCB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdmFsOyB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdWYWwpIHtcclxuICAgICAgICAgICAgICAgIHZhbCA9IG5ld1ZhbDtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBleHBvcnRzLnByb3BlcnR5Q2FsbGJhY2tzLmdldChvYmopW3Byb3BlcnR5XTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYyA9IF9hW19pXTtcclxuICAgICAgICAgICAgICAgICAgICBjKHByb3BlcnR5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHZhciBfYTtcclxufTtcclxuZXhwb3J0cy5jcmVhdGVPYmplY3RQcm9wZXJ0eUxpc3RlbmVyID0gZnVuY3Rpb24gKG9iaiwgcGF0aFN0ciwgY2FsbGJhY2spIHtcclxuICAgIHZhciBwYXRoID0gcGF0aFN0ci5zcGxpdCgnLicpLCBwcm9wZXJ0eSA9IHBhdGgucG9wKCksIHJvb3QgPSBleHBvcnRzLmRlZXBWYWx1ZShvYmosIHBhdGguam9pbignLicpKSwgaGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gZXhwb3J0cy5wYXRoQ2FsbGJhY2tzLmdldChvYmopW3BhdGhTdHJdOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICB2YXIgY2IgPSBfYVtfaV07XHJcbiAgICAgICAgICAgIGNiKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGV4cG9ydHMuZW5zdXJlKGV4cG9ydHMucGF0aENhbGxiYWNrcywgb2JqLCAoX2EgPSB7fSwgX2FbcGF0aFN0cl0gPSBbY2FsbGJhY2tdLCBfYSkpO1xyXG4gICAgZXhwb3J0cy5hZGRQcm9wZXJ0eUxpc3RlbmVyKHJvb3QsIHByb3BlcnR5LCBoYW5kbGVyKTtcclxuICAgIHZhciBfYTtcclxufTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JqZWN0cy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5mdW5jdGlvbiBhbGxDaGlsZE5vZGVzKG5vZGUpIHtcclxuICAgIHZhciB3YWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKG5vZGUsIE5vZGVGaWx0ZXIuU0hPV19BTEwsIG51bGwsIGZhbHNlKSwgbm9kZXMgPSBbXTtcclxuICAgIHZhciBjdXJyZW50Tm9kZTtcclxuICAgIGRvIHtcclxuICAgICAgICBjdXJyZW50Tm9kZSA9IHdhbGtlci5jdXJyZW50Tm9kZTtcclxuICAgICAgICBpZiAoY3VycmVudE5vZGUubm9kZVR5cGUgIT09IE5vZGUuVEVYVF9OT0RFIHx8IGN1cnJlbnROb2RlLnRleHRDb250ZW50LnRyaW0oKSkge1xyXG4gICAgICAgICAgICBub2Rlcy5wdXNoKGN1cnJlbnROb2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9IHdoaWxlICh3YWxrZXIubmV4dE5vZGUoKSk7XHJcbiAgICByZXR1cm4gbm9kZXM7XHJcbn1cclxuZXhwb3J0cy5hbGxDaGlsZE5vZGVzID0gYWxsQ2hpbGROb2RlcztcclxuZnVuY3Rpb24gYWxsVGV4dE5vZGVzKG5vZGUpIHtcclxuICAgIHZhciBhID0gW10sIHdhbGsgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKG5vZGUsIE5vZGVGaWx0ZXIuU0hPV19URVhULCBudWxsLCBmYWxzZSk7XHJcbiAgICB2YXIgbjtcclxuICAgIHdoaWxlIChuID0gd2Fsay5uZXh0Tm9kZSgpKSB7XHJcbiAgICAgICAgYS5wdXNoKG4pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGE7XHJcbn1cclxuZXhwb3J0cy5hbGxUZXh0Tm9kZXMgPSBhbGxUZXh0Tm9kZXM7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvbS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgb2JqZWN0c18xID0gcmVxdWlyZShcIi4uL3V0aWxzL29iamVjdHNcIik7XHJcbnZhciBkb21fMSA9IHJlcXVpcmUoXCIuLi91dGlscy9kb21cIik7XHJcbnZhciBjbGVhblVwUXVldWUgPSBuZXcgV2Vha01hcCgpO1xyXG5leHBvcnRzLnJlZ2lzdGVyQ2xlYW5VcCA9IGZ1bmN0aW9uIChub2RlLCB0YXNrKSB7IHJldHVybiBvYmplY3RzXzEuZW5zdXJlKGNsZWFuVXBRdWV1ZSwgbm9kZSwgW3Rhc2tdKTsgfTtcclxuZXhwb3J0cy5jbGVhblVwID0gZnVuY3Rpb24gKG5vZGUpIHsgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IGRvbV8xLmFsbENoaWxkTm9kZXMobm9kZSk7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgdmFyIG4gPSBfYVtfaV07XHJcbiAgICAgICAgaWYgKGNsZWFuVXBRdWV1ZS5oYXMobikpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2IgPSAwLCBfYyA9IGNsZWFuVXBRdWV1ZS5nZXQobik7IF9iIDwgX2MubGVuZ3RoOyBfYisrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGFzayA9IF9jW19iXTtcclxuICAgICAgICAgICAgICAgIHRhc2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjbGVhblVwUXVldWUuZGVsZXRlKG4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSwgODApOyB9O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jbGVhbnVwLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBvYmplY3RzXzEgPSByZXF1aXJlKFwiLi9vYmplY3RzXCIpO1xyXG5mdW5jdGlvbiBmb3JtYXQoc3RyLCBvYmopIHtcclxuICAgIHJldHVybiBzdHIucmVwbGFjZSgve3suKj99fS9nLCBmdW5jdGlvbiAobSkge1xyXG4gICAgICAgIHJldHVybiBvYmplY3RzXzEuZGVlcFZhbHVlKG9iaiwgbS5zdWJzdHJpbmcoMiwgbS5sZW5ndGggLSAyKSk7XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmZvcm1hdCA9IGZvcm1hdDtcclxuZnVuY3Rpb24gbmFtZWRSZWdleE1hdGNoKHRleHQsIHJlZ2V4LCBtYXRjaE5hbWVzKSB7XHJcbiAgICB2YXIgbWF0Y2hlcyA9IHJlZ2V4LmV4ZWModGV4dCk7XHJcbiAgICBpZiAoIW1hdGNoZXMpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWF0Y2hlcy5yZWR1Y2UoZnVuY3Rpb24gKHJlc3VsdCwgbWF0Y2gsIGluZGV4KSB7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICByZXN1bHRbbWF0Y2hOYW1lc1tpbmRleCAtIDFdXSA9IG1hdGNoO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSwge30pO1xyXG59XHJcbmV4cG9ydHMubmFtZWRSZWdleE1hdGNoID0gbmFtZWRSZWdleE1hdGNoO1xyXG5leHBvcnRzLmRlY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uIChzdHIpIHsgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9Mb3dlckNhc2UoKSArIHN0ci5zdWJzdHIoMSk7IH07XHJcbmV4cG9ydHMuY2FtZWxDYXNlRnJvbUh5cGhlbnMgPSBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoL1xcYi0oW2Etel0pL2csIGZ1bmN0aW9uIChhbGwsIGNoYXIpIHsgcmV0dXJuIGNoYXIudG9VcHBlckNhc2UoKTsgfSk7XHJcbn07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0cmluZ3MuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNsZWFudXBfMSA9IHJlcXVpcmUoXCIuLi9jb3JlL2NsZWFudXBcIik7XHJcbnZhciBzdHJpbmdzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvc3RyaW5nc1wiKTtcclxudmFyIG9iamVjdHNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9vYmplY3RzXCIpO1xyXG5leHBvcnRzLkNvbnN0cnVjdFJlZ2lzdHJ5ID0ge307XHJcbmV4cG9ydHMuU2luZ2xldG9ucyA9IHt9O1xyXG5leHBvcnRzLnN0YXJ0ID0gZnVuY3Rpb24gKHJvb3QpIHtcclxuICAgIGlmIChyb290ID09PSB2b2lkIDApIHsgcm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDsgfVxyXG4gICAgdmFyIGNyZWF0ZWRXaWRnZXRzID0gW107XHJcbiAgICBPYmplY3Qua2V5cyhleHBvcnRzLkNvbnN0cnVjdFJlZ2lzdHJ5KS5mb3JFYWNoKGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gICAgICAgIEFycmF5LmZyb20ocm9vdC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSkuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgICAgICB2YXIgd2lkZ2V0ID0gbmV3IChGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseShleHBvcnRzLkNvbnN0cnVjdFJlZ2lzdHJ5W3NlbGVjdG9yXSkpO1xyXG4gICAgICAgICAgICBleHBvcnRzLnJ1bkNvbnN0cnVjdG9yUXVldWUod2lkZ2V0LCBub2RlKTtcclxuICAgICAgICAgICAgY3JlYXRlZFdpZGdldHMucHVzaCh3aWRnZXQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gY3JlYXRlZFdpZGdldHM7XHJcbn07XHJcbmV4cG9ydHMuQ29uc3RydWN0ID0gZnVuY3Rpb24gKGNvbmYpIHsgcmV0dXJuIGZ1bmN0aW9uIChwcm90bykge1xyXG4gICAgZXhwb3J0cy5Db25zdHJ1Y3RSZWdpc3RyeVtjb25mLnNlbGVjdG9yXSA9IHByb3RvO1xyXG4gICAgZXhwb3J0cy5hZGRUb0NvbnN0cnVjdG9yUXVldWUocHJvdG8sIGZ1bmN0aW9uICh3aWRnZXQsIG5vZGUpIHtcclxuICAgICAgICBpZiAoY29uZi5zaW5nbGV0b24gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgdmFyIG5hbWVfMSA9IHN0cmluZ3NfMS5kZWNhcGl0YWxpemUod2lkZ2V0LmNvbnN0cnVjdG9yLm5hbWUpO1xyXG4gICAgICAgICAgICBleHBvcnRzLlNpbmdsZXRvbnNbbmFtZV8xXSA9IHdpZGdldDtcclxuICAgICAgICAgICAgY2xlYW51cF8xLnJlZ2lzdGVyQ2xlYW5VcChub2RlLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgZXhwb3J0cy5TaW5nbGV0b25zW25hbWVfMV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3aWRnZXQuaW5pdChub2RlKTtcclxuICAgIH0pO1xyXG59OyB9O1xyXG52YXIgcXVldWUgPSBuZXcgV2Vha01hcCgpO1xyXG5leHBvcnRzLmFkZFRvQ29uc3RydWN0b3JRdWV1ZSA9IGZ1bmN0aW9uIChjb25zdHJ1Y3RvciwgZnVuYykge1xyXG4gICAgb2JqZWN0c18xLmVuc3VyZShxdWV1ZSwgY29uc3RydWN0b3IsIFtmdW5jXSk7XHJcbn07XHJcbmV4cG9ydHMucnVuQ29uc3RydWN0b3JRdWV1ZSA9IGZ1bmN0aW9uICh3aWRnZXQsIG5vZGUpIHtcclxuICAgIHZhciB3aWRnZXRRdWV1ZSA9IHF1ZXVlLmdldChPYmplY3QuZ2V0UHJvdG90eXBlT2Yod2lkZ2V0KS5jb25zdHJ1Y3RvcikgfHwgW107XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbiA9IHdpZGdldFF1ZXVlLmxlbmd0aDsgaSA8IG47IGkrKykgeyAvLyBmb3IgcGVyZm9ybWFuY2VcclxuICAgICAgICB3aWRnZXRRdWV1ZVtpXS5jYWxsKHdpZGdldCwgd2lkZ2V0LCBub2RlKTtcclxuICAgIH1cclxufTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3RydWN0LmpzLm1hcCIsImZ1bmN0aW9uIHN0eWxlSW5qZWN0KGNzcywgcmVmKSB7XG4gIGlmICggcmVmID09PSB2b2lkIDAgKSByZWYgPSB7fTtcbiAgdmFyIGluc2VydEF0ID0gcmVmLmluc2VydEF0O1xuXG4gIGlmICghY3NzIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuOyB9XG5cbiAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuXG4gIGlmIChpbnNlcnRBdCA9PT0gJ3RvcCcpIHtcbiAgICBpZiAoaGVhZC5maXJzdENoaWxkKSB7XG4gICAgICBoZWFkLmluc2VydEJlZm9yZShzdHlsZSwgaGVhZC5maXJzdENoaWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc3R5bGVJbmplY3Q7XG4iLCJleHBvcnQgZW51bSBMaXN0U3RhdGUgeyBBTEwsIENPTVBMRVRFRCwgQUNUSVZFIH1cbmV4cG9ydCBjb25zdCBFTlRFUiA9IDEzXG5leHBvcnQgY29uc3QgRVNDID0gMjdcbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IudGhyb3codmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IHlbb3BbMF0gJiAyID8gXCJyZXR1cm5cIiA6IG9wWzBdID8gXCJ0aHJvd1wiIDogXCJuZXh0XCJdKSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFswLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyAgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKG9bbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH07IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl07XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKTtcclxufSIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBnZXRUeXBlID0ge30udG9TdHJpbmc7XHJcbmV4cG9ydHMuY29tcG9zZSA9IGZ1bmN0aW9uIChmbnMpIHsgcmV0dXJuIGZ1bmN0aW9uIChyZXMpIHtcclxuICAgIGlmIChmbnMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIGZuc1swXShyZXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZucy5yZWR1Y2UoZnVuY3Rpb24gKHAsIGMpIHsgcmV0dXJuIGMocCk7IH0sIHJlcyk7XHJcbn07IH07XHJcbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGZ1bmN0aW9uIChmdW5jdGlvblRvQ2hlY2spIHtcclxuICAgIHJldHVybiBmdW5jdGlvblRvQ2hlY2sgJiYgZ2V0VHlwZS5jYWxsKGZ1bmN0aW9uVG9DaGVjaykgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XHJcbn07XHJcbmV4cG9ydHMuaXNEZWYgPSBmdW5jdGlvbiAoeCkgeyByZXR1cm4gdHlwZW9mIHggIT09ICd1bmRlZmluZWQnOyB9O1xyXG5leHBvcnRzLmlzVW5kZWYgPSBmdW5jdGlvbiAoeCkgeyByZXR1cm4gIWV4cG9ydHMuaXNEZWYoeCk7IH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZ1bmN0aW9ucy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29uc3RydWN0XzEgPSByZXF1aXJlKFwiLi9jb25zdHJ1Y3RcIik7XHJcbnZhciBmdW5jdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9mdW5jdGlvbnNcIik7XHJcbmV4cG9ydHMuSW5qZWN0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZnVuY3Rpb24gKHByb3RvLCBwcm9wZXJ0eSkge1xyXG4gICAgY29uc3RydWN0XzEuYWRkVG9Db25zdHJ1Y3RvclF1ZXVlKHByb3RvLmNvbnN0cnVjdG9yLCBmdW5jdGlvbiAod2lkZ2V0KSB7XHJcbiAgICAgICAgdmFyIHNpbmdsZXRvbiA9IGNvbnN0cnVjdF8xLlNpbmdsZXRvbnNbcHJvcGVydHldO1xyXG4gICAgICAgIGlmIChmdW5jdGlvbnNfMS5pc0RlZihzaW5nbGV0b24pKSB7XHJcbiAgICAgICAgICAgIHdpZGdldFtwcm9wZXJ0eV0gPSBzaW5nbGV0b247XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07IH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluamVjdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgZG9tXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvZG9tXCIpO1xyXG52YXIgY29uc3RydWN0XzEgPSByZXF1aXJlKFwiLi9jb25zdHJ1Y3RcIik7XHJcbnZhciBvYmplY3RzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvb2JqZWN0c1wiKTtcclxudmFyIGZ1bmN0aW9uc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL2Z1bmN0aW9uc1wiKTtcclxudmFyIERFRkFVTFRfVEVNUExBVEVfTkFNRSA9ICdfX2RlZmF1bHRfXyc7XHJcbmV4cG9ydHMucGFyc2VkVGVtcGxhdGVzID0gbmV3IFdlYWtNYXAoKTtcclxuZXhwb3J0cy5TSU5HTEVfQ1VSTElFUyA9IC97KC4qPyl9LztcclxuZXhwb3J0cy5DVVJMSUVTID0gL3t7KC4qPyl9fS87XHJcbnZhciBBTExfQ1VSTElFUyA9IC97eyguKz8pfX0vZztcclxuZXhwb3J0cy5zZWxmQ2xvc2luZ1RhZ3MgPSAvKDwoW148Plxcc10rKShcXHMrW148PlxccydcIj1dKyg9W1xcd1xcZF0rfD1cIlteXCJdKlwifD0nW14nXSonfD17ez9bXn1dKj99P30pPykqKVxccypcXC8+L2dtaTtcclxuZXhwb3J0cy5vcGVuVGFncyA9ICckMT48LyQyPic7XHJcbnZhciBUZW1wbGF0ZVRva2VuVHlwZTtcclxuKGZ1bmN0aW9uIChUZW1wbGF0ZVRva2VuVHlwZSkge1xyXG4gICAgVGVtcGxhdGVUb2tlblR5cGVbVGVtcGxhdGVUb2tlblR5cGVbXCJDTEFTU1wiXSA9IDBdID0gXCJDTEFTU1wiO1xyXG4gICAgVGVtcGxhdGVUb2tlblR5cGVbVGVtcGxhdGVUb2tlblR5cGVbXCJQUk9QRVJUWVwiXSA9IDFdID0gXCJQUk9QRVJUWVwiO1xyXG4gICAgVGVtcGxhdGVUb2tlblR5cGVbVGVtcGxhdGVUb2tlblR5cGVbXCJBVFRSSUJVVEVcIl0gPSAyXSA9IFwiQVRUUklCVVRFXCI7XHJcbiAgICBUZW1wbGF0ZVRva2VuVHlwZVtUZW1wbGF0ZVRva2VuVHlwZVtcIlRFTVBMQVRFXCJdID0gM10gPSBcIlRFTVBMQVRFXCI7XHJcbiAgICBUZW1wbGF0ZVRva2VuVHlwZVtUZW1wbGF0ZVRva2VuVHlwZVtcIlRFWFRcIl0gPSA0XSA9IFwiVEVYVFwiO1xyXG4gICAgVGVtcGxhdGVUb2tlblR5cGVbVGVtcGxhdGVUb2tlblR5cGVbXCJUQUdcIl0gPSA1XSA9IFwiVEFHXCI7XHJcbn0pKFRlbXBsYXRlVG9rZW5UeXBlID0gZXhwb3J0cy5UZW1wbGF0ZVRva2VuVHlwZSB8fCAoZXhwb3J0cy5UZW1wbGF0ZVRva2VuVHlwZSA9IHt9KSk7XHJcbnZhciBUZW1wbGF0ZVRva2VuSW5mbyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFRlbXBsYXRlVG9rZW5JbmZvKHBvc2l0aW9uLCB0eXBlKSB7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICB9XHJcbiAgICBUZW1wbGF0ZVRva2VuSW5mby5wcm90b3R5cGUuc2V0Q3VybHkgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9jdXJseSA9IHZhbHVlO1xyXG4gICAgICAgIHZhciB0b2tlbnMgPSB2YWx1ZS5zcGxpdCgnOicpO1xyXG4gICAgICAgIHRoaXMuX3BhdGggPSB0b2tlbnMuc2hpZnQoKTtcclxuICAgICAgICB0aGlzLl90cmFuc2Zvcm1lcnMgPSB0b2tlbnM7XHJcbiAgICB9O1xyXG4gICAgVGVtcGxhdGVUb2tlbkluZm8ucHJvdG90eXBlLmN1cmx5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJseTtcclxuICAgIH07XHJcbiAgICBUZW1wbGF0ZVRva2VuSW5mby5wcm90b3R5cGUucGF0aCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGF0aDtcclxuICAgIH07XHJcbiAgICBUZW1wbGF0ZVRva2VuSW5mby5wcm90b3R5cGUudHJhbnNmb3JtZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm1lcnM7XHJcbiAgICB9O1xyXG4gICAgVGVtcGxhdGVUb2tlbkluZm8ucHJvdG90eXBlLmFycmF5VHJhbnNmb3JtZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RyYW5zZm9ybWVycy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdBcnJheSBmaWx0ZXIgdHJhbnNmb3JtZXIgY2FuIGhhdmUgb25seSBvbmUgbWV0aG9kJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybWVycygpWzBdIHx8ICdhcnJheWlkZW50aXR5JztcclxuICAgIH07XHJcbiAgICByZXR1cm4gVGVtcGxhdGVUb2tlbkluZm87XHJcbn0oKSk7XHJcbmV4cG9ydHMuVGVtcGxhdGVUb2tlbkluZm8gPSBUZW1wbGF0ZVRva2VuSW5mbztcclxuZXhwb3J0cy5icmVha0FwYXJ0VGV4dE5vZGVzID0gZnVuY3Rpb24gKHJvb3QpIHtcclxuICAgIHZhciB0ZXh0Tm9kZXMgPSBkb21fMS5hbGxUZXh0Tm9kZXMocm9vdCk7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbiA9IHRleHROb2Rlcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICB2YXIgbm9kZSA9IHRleHROb2Rlc1tpXTtcclxuICAgICAgICB2YXIgc3BsaXQgPSBub2RlLnRleHRDb250ZW50LnNwbGl0KC8oe3suKj99fSkvbWcpO1xyXG4gICAgICAgIGlmIChzcGxpdC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJlbnRfMSA9IG5vZGUucGFyZW50Tm9kZSwgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBzcGxpdF8xID0gc3BsaXQ7IF9pIDwgc3BsaXRfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gc3BsaXRfMVtfaV07XHJcbiAgICAgICAgICAgICAgICBpZiAodGV4dCAhPT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYXJlbnRfMS5yZXBsYWNlQ2hpbGQoZnJhZywgbm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJvb3Q7XHJcbn07XHJcbmV4cG9ydHMuZ2V0RnJhZ21lbnQgPSBmdW5jdGlvbiAoaHRtbCkge1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KGh0bWwpO1xyXG59O1xyXG52YXIgUGFyc2VkVGVtcGxhdGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBQYXJzZWRUZW1wbGF0ZShkb2MsIG5vZGVzLCBpbmZvcykge1xyXG4gICAgICAgIHRoaXMuZG9jID0gZG9jO1xyXG4gICAgICAgIHRoaXMuaW5mb3MgPSBpbmZvcztcclxuICAgICAgICB0aGlzLm5vZGVzID0gbm9kZXM7XHJcbiAgICB9XHJcbiAgICBQYXJzZWRUZW1wbGF0ZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRvYyA9IHRoaXMuZG9jLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICByZXR1cm4gbmV3IFBhcnNlZFRlbXBsYXRlKGRvYywgZG9tXzEuYWxsQ2hpbGROb2Rlcyhkb2MpLCB0aGlzLmluZm9zKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUGFyc2VkVGVtcGxhdGU7XHJcbn0oKSk7XHJcbmV4cG9ydHMuUGFyc2VkVGVtcGxhdGUgPSBQYXJzZWRUZW1wbGF0ZTtcclxuZXhwb3J0cy5nZXRUZW1wbGF0ZSA9IGZ1bmN0aW9uICh3aWRnZXQsIG5hbWUpIHtcclxuICAgIGlmIChuYW1lID09PSB2b2lkIDApIHsgbmFtZSA9IERFRkFVTFRfVEVNUExBVEVfTkFNRTsgfVxyXG4gICAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHdpZGdldCk7XHJcbiAgICB2YXIgdGVtcGxhdGVzID0gZXhwb3J0cy5wYXJzZWRUZW1wbGF0ZXMuZ2V0KHByb3RvKTtcclxuICAgIGlmIChmdW5jdGlvbnNfMS5pc1VuZGVmKHRlbXBsYXRlcykgfHwgZnVuY3Rpb25zXzEuaXNVbmRlZih0ZW1wbGF0ZXNbbmFtZV0pKSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoXCJObyB0ZW1wbGF0ZSBmb3VuZCBmb3IgbmFtZSBcIiArIG5hbWUgKyBcIiBpbiBcIiArIHdpZGdldC5jb25zdHJ1Y3Rvci5uYW1lKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZW1wbGF0ZXNbbmFtZV0uY2xvbmUoKTtcclxufTtcclxuZXhwb3J0cy5wYXJzZVRlbXBsYXRlID0gZnVuY3Rpb24gKHRlbXBsYXRlU3RyKSB7XHJcbiAgICB2YXIgc291cmNlID0gdGVtcGxhdGVTdHIucmVwbGFjZShleHBvcnRzLnNlbGZDbG9zaW5nVGFncywgZXhwb3J0cy5vcGVuVGFncyksIGZyYWcgPSBleHBvcnRzLmJyZWFrQXBhcnRUZXh0Tm9kZXMoZXhwb3J0cy5nZXRGcmFnbWVudChzb3VyY2UpKSwgYWxsTm9kZXMgPSBkb21fMS5hbGxDaGlsZE5vZGVzKGZyYWcpLCBob29rTWFwID0ge307IC8vIHdlIG5lZWQgdG8gcmVtZW1iZXIgY2FzZSBzZW5zaXRpdmUgaG9va3MsIGIvYyBhdHRyaWJ1dGVzIHR1cm4gbG93ZXJjYXNlXHJcbiAgICB2YXIgbTtcclxuICAgIHdoaWxlIChtID0gQUxMX0NVUkxJRVMuZXhlYyh0ZW1wbGF0ZVN0cikpIHtcclxuICAgICAgICBob29rTWFwW21bMV0udG9Mb3dlckNhc2UoKV0gPSBtWzFdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBQYXJzZWRUZW1wbGF0ZShmcmFnLCBhbGxOb2RlcywgZXhwb3J0cy5wYXJzZUhvb2tzKGFsbE5vZGVzLCBob29rTWFwKSk7XHJcbn07XHJcbmV4cG9ydHMucGFyc2VIb29rcyA9IGZ1bmN0aW9uIChub2RlcywgaG9va01hcCkge1xyXG4gICAgaWYgKGhvb2tNYXAgPT09IHZvaWQgMCkgeyBob29rTWFwID0ge307IH1cclxuICAgIHZhciBob29rcyA9IFtdO1xyXG4gICAgdmFyIHNlbGVjdG9ycyA9IE9iamVjdC5rZXlzKGNvbnN0cnVjdF8xLkNvbnN0cnVjdFJlZ2lzdHJ5KTtcclxuICAgIHZhciBtYXRjaDtcclxuICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKHBvcywgbikge1xyXG4gICAgICAgIHZhciBub2RlID0gbm9kZXNbcG9zXTtcclxuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcclxuICAgICAgICAgICAgdmFyIHRleHQgPSBub2RlLnRleHRDb250ZW50LCBtYXRjaF8xID0gZXhwb3J0cy5DVVJMSUVTLmV4ZWModGV4dCk7XHJcbiAgICAgICAgICAgIC8vIDxkaXYgaWQ9XCIyXCI+c29tZSB0ZXh0IHt7bXlQcm9wZXJ0eX19PC9kaXY+XHJcbiAgICAgICAgICAgIGlmIChtYXRjaF8xICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG9rZW4gPSBuZXcgVGVtcGxhdGVUb2tlbkluZm8ocG9zLCBUZW1wbGF0ZVRva2VuVHlwZS5URVhUKTtcclxuICAgICAgICAgICAgICAgIHRva2VuLnNldEN1cmx5KG1hdGNoXzFbMV0pO1xyXG4gICAgICAgICAgICAgICAgaG9va3MucHVzaCh0b2tlbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcclxuICAgICAgICAgICAgdmFyIG1hdGNoaW5nU2VsZWN0b3JzID0gc2VsZWN0b3JzLmZpbHRlcihmdW5jdGlvbiAocykgeyByZXR1cm4gbm9kZS5tYXRjaGVzKHMpOyB9KTtcclxuICAgICAgICAgICAgdmFyIGluU3ViV2lkZ2V0ID0gbWF0Y2hpbmdTZWxlY3RvcnMubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAoaW5TdWJXaWRnZXQpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgbWF0Y2hpbmdTZWxlY3RvcnNfMSA9IG1hdGNoaW5nU2VsZWN0b3JzOyBfaSA8IG1hdGNoaW5nU2VsZWN0b3JzXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlbGVjdG9yID0gbWF0Y2hpbmdTZWxlY3RvcnNfMVtfaV07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VuID0gbmV3IFRlbXBsYXRlVG9rZW5JbmZvKHBvcywgVGVtcGxhdGVUb2tlblR5cGUuVEFHKTtcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbi5zZWxlY3RvciA9IHNlbGVjdG9yO1xyXG4gICAgICAgICAgICAgICAgICAgIGhvb2tzLnB1c2godG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIF9hID0gMCwgX2IgPSBBcnJheS5mcm9tKG5vZGUuYXR0cmlidXRlcyk7IF9hIDwgX2IubGVuZ3RoOyBfYSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXR0cmlidXRlID0gX2JbX2FdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZU5hbWUgPSBhdHRyaWJ1dGUubm9kZU5hbWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlTmFtZSA9PT0gJ2NsYXNzJykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIDxkaXYgaWQ9XCIyXCIgY2xhc3M9XCJyZWQge3tteUNsYXNzfX0gYmx1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjbGFzc2VzID0gQXJyYXkuZnJvbShub2RlLmNsYXNzTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2MgPSAwLCBjbGFzc2VzXzEgPSBjbGFzc2VzOyBfYyA8IGNsYXNzZXNfMS5sZW5ndGg7IF9jKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNscyA9IGNsYXNzZXNfMVtfY107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaCA9IGNscy5tYXRjaChleHBvcnRzLkNVUkxJRVMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUobWF0Y2hbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VuID0gbmV3IFRlbXBsYXRlVG9rZW5JbmZvKHBvcywgVGVtcGxhdGVUb2tlblR5cGUuQ0xBU1MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4uc2V0Q3VybHkobWF0Y2hbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9va3MucHVzaCh0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChtYXRjaCA9IGF0dHJpYnV0ZU5hbWUubWF0Y2goZXhwb3J0cy5DVVJMSUVTKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIDxkaXYgaWQ9XCIyXCIge3tteVByb3BlcnR5fX0+XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUobWF0Y2hbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbiA9IG5ldyBUZW1wbGF0ZVRva2VuSW5mbyhwb3MsIFRlbXBsYXRlVG9rZW5UeXBlLlBST1BFUlRZKTtcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbi5zZXRDdXJseShob29rTWFwW21hdGNoWzFdXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaG9va3MucHVzaCh0b2tlbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICghaW5TdWJXaWRnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXR0cmlidXRlTmFtZSA9PT0gJ3RlbXBsYXRlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW4gPSBuZXcgVGVtcGxhdGVUb2tlbkluZm8ocG9zLCBUZW1wbGF0ZVRva2VuVHlwZS5URU1QTEFURSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuLmF0dHJpYnV0ZSA9IGF0dHJpYnV0ZU5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaCA9IGF0dHJpYnV0ZS52YWx1ZS5tYXRjaChleHBvcnRzLkNVUkxJRVMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi5zZXRDdXJseShtYXRjaFsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi5zZXRDdXJseShhdHRyaWJ1dGUudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvb2tzLnB1c2godG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gPGRpdiBpZD1cIjJcIiBteVByb3BlcnR5PVwie3tteVByb3BlcnR5fX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gYXR0cmlidXRlLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2ggPSB2YWx1ZS5tYXRjaChleHBvcnRzLkNVUkxJRVMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGVOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbiA9IG5ldyBUZW1wbGF0ZVRva2VuSW5mbyhwb3MsIFRlbXBsYXRlVG9rZW5UeXBlLkFUVFJJQlVURSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi5zZXRDdXJseShtYXRjaFsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbi5hdHRyaWJ1dGUgPSBhdHRyaWJ1dGVOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9va3MucHVzaCh0b2tlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZm9yICh2YXIgcG9zID0gMCwgbiA9IG5vZGVzLmxlbmd0aDsgcG9zIDwgbjsgcG9zKyspIHtcclxuICAgICAgICBfbG9vcF8xKHBvcywgbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaG9va3M7XHJcbn07XHJcbmV4cG9ydHMuVGVtcGxhdGUgPSBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgaWYgKG5hbWUgPT09IHZvaWQgMCkgeyBuYW1lID0gREVGQVVMVF9URU1QTEFURV9OQU1FOyB9XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHByb3RvLCBtZXRob2QpIHtcclxuICAgICAgICB2YXIgdGVtcGxhdGVTdHIgPSBwcm90b1ttZXRob2RdLmNhbGwocHJvdG8pO1xyXG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IGV4cG9ydHMucGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZVN0cik7XHJcbiAgICAgICAgb2JqZWN0c18xLmVuc3VyZShleHBvcnRzLnBhcnNlZFRlbXBsYXRlcywgcHJvdG8sIChfYSA9IHt9LCBfYVtuYW1lXSA9IHRlbXBsYXRlLCBfYSkpO1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgIH07XHJcbn07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRlbXBsYXRlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjb25zdHJ1Y3RfMSA9IHJlcXVpcmUoXCIuL2NvbnN0cnVjdFwiKTtcclxuZXhwb3J0cy5UcmFuc2Zvcm1lclJlZ2lzdHJ5ID0ge1xyXG4gICAgYXJyYXlpZGVudGl0eTogZnVuY3Rpb24gKCkgeyByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZTsgfTsgfVxyXG59O1xyXG5leHBvcnRzLlRyYW5zZm9ybWVyID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZnVuY3Rpb24gKHByb3RvLCBtZXRob2QpIHtcclxuICAgIGNvbnN0cnVjdF8xLmFkZFRvQ29uc3RydWN0b3JRdWV1ZShwcm90by5jb25zdHJ1Y3RvciwgZnVuY3Rpb24gKHdpZGdldCkge1xyXG4gICAgICAgIGV4cG9ydHMuVHJhbnNmb3JtZXJSZWdpc3RyeVttZXRob2RdID0gd2lkZ2V0W21ldGhvZF0uYmluZCh3aWRnZXQpO1xyXG4gICAgfSk7XHJcbn07IH07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRyYW5zZm9ybWVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBjbGVhbnVwXzEgPSByZXF1aXJlKFwiLi4vY29yZS9jbGVhbnVwXCIpO1xyXG52YXIgb2JzZXJ2ZXJzID0gbmV3IFdlYWtNYXAoKTtcclxuZnVuY3Rpb24gcmVtb3ZlRnJvbUFycmF5KGFyciwgZWxlbWVudHMpIHtcclxuICAgIGlmICghYXJyIHx8IGFyci5sZW5ndGggPT09IDApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgZGVsZXRlQ291bnQgPSAwLCB0b3RhbCA9IGVsZW1lbnRzLmxlbmd0aDtcclxuICAgIGZvciAodmFyIGkgPSBhcnIubGVuZ3RoOyBpLS07KSB7XHJcbiAgICAgICAgaWYgKH5lbGVtZW50cy5pbmRleE9mKGFycltpXSkpIHtcclxuICAgICAgICAgICAgZGVsZXRlQ291bnQrKzsgLy8gb3B0aW1pemUgcmVtb3ZhbCBvZiBjb25zZWN1dGl2ZSBlbGVtZW50c1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChkZWxldGVDb3VudCkge1xyXG4gICAgICAgICAgICBhcnIuc3BsaWNlKGkgKyAxLCBkZWxldGVDb3VudCk7XHJcbiAgICAgICAgICAgIGlmICgodG90YWwgLT0gZGVsZXRlQ291bnQpID09PSAwKSB7IC8vIGlmIHdlIHJlbW92ZWQgYWxsIGFscmVhZHksIGJyZWFrIGVhcmx5XHJcbiAgICAgICAgICAgICAgICBkZWxldGVDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGRlbGV0ZUNvdW50KSB7XHJcbiAgICAgICAgYXJyLnNwbGljZSgwLCBkZWxldGVDb3VudCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyO1xyXG59XHJcbmV4cG9ydHMucmVtb3ZlRnJvbUFycmF5ID0gcmVtb3ZlRnJvbUFycmF5O1xyXG52YXIgbm90aWZ5ID0gZnVuY3Rpb24gKGFyciwgbWV0aG9kLCBhcmdzKSB7XHJcbiAgICB2YXIgbGlzdGVuZXJzID0gb2JzZXJ2ZXJzLmdldChhcnIpO1xyXG4gICAgZm9yICh2YXIgX2kgPSAwLCBsaXN0ZW5lcnNfMSA9IGxpc3RlbmVyczsgX2kgPCBsaXN0ZW5lcnNfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICB2YXIgbGlzdGVuZXIgPSBsaXN0ZW5lcnNfMVtfaV07XHJcbiAgICAgICAgbGlzdGVuZXJbbWV0aG9kXS5hcHBseShhcnIsIGFyZ3MpO1xyXG4gICAgfVxyXG59O1xyXG5mdW5jdGlvbiBkdWNrUHVuY2hTcGxpY2UoYXJyKSB7XHJcbiAgICB2YXIgb2xkID0gYXJyLnNwbGljZTtcclxuICAgIC8vIGFkZCBkb2NzIHRoYXQgcmVtb3ZpbmcgYW5kIHJlLWFkZGluZyBlbGVtZW50cyB0byB0aGUgc2FtZSBhcnJheSBraWxscyBldmVudCBsaXN0ZW5lcnNcclxuICAgIGFyci5zcGxpY2UgPSBmdW5jdGlvbiAoaW5kZXgsIGRlbGV0ZUNvdW50KSB7XHJcbiAgICAgICAgdmFyIGFkZGVkSXRlbXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMiksIGRlbGV0ZWRJdGVtcyA9IG9sZC5hcHBseShhcnIsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgbm90aWZ5KGFyciwgJ3NwbGljZScsIFtpbmRleCwgZGVsZXRlQ291bnQsIGFkZGVkSXRlbXMsIGRlbGV0ZWRJdGVtc10pO1xyXG4gICAgICAgIHJldHVybiBkZWxldGVkSXRlbXM7XHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGR1Y2tQdW5jaFNvcnQoYXJyKSB7XHJcbiAgICB2YXIgb2xkID0gYXJyLnNvcnQ7XHJcbiAgICBhcnIuc29ydCA9IGZ1bmN0aW9uIChjbXApIHtcclxuICAgICAgICAvLyBzb3J0IGlzIGEgc3BlY2lhbCBjYXNlLCB3ZSBuZWVkIHRvIGluZm9ybSBsaXN0ZW5lcnMgaG93IHNvcnRpbmcgaGFzIGNoYW5nZWQgdGhlIGFycmF5XHJcbiAgICAgICAgdmFyIGluZGljZXMgPSBleHBvcnRzLnJhbmdlKDAsIGFyci5sZW5ndGggLSAxKSwgYXJncyA9IGNtcCA/IFtcclxuICAgICAgICAgICAgYXJyLm1hcChmdW5jdGlvbiAoZSwgaSkgeyByZXR1cm4gaTsgfSlcclxuICAgICAgICAgICAgICAgIC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBjbXAoYXJyW2FdLCBhcnJbYl0pOyB9KVxyXG4gICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoZSkgeyByZXR1cm4gaW5kaWNlc1tlXTsgfSlcclxuICAgICAgICBdIDogaW5kaWNlcywgcmVzID0gb2xkLmNhbGwoYXJyLCBjbXApO1xyXG4gICAgICAgIG5vdGlmeShhcnIsICdzb3J0JywgYXJncyk7XHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH07XHJcbn1cclxuZXhwb3J0cy5yYW5nZSA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XHJcbiAgICB2YXIgbGVuID0gZW5kIC0gc3RhcnQgKyAxLCBhcnIgPSBuZXcgQXJyYXkobGVuKTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXJyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGFycltpXSA9IGkgKyBzdGFydDtcclxuICAgIH1cclxuICAgIHJldHVybiBhcnI7XHJcbn07XHJcbi8vIGVzc2VudGlhbGx5IHdlIGNhbiByZWR1Y2UgYXJyYXkgbW9kaWZ5aW5nIGZ1bmN0aW9ucyB0byB0d28gaW1wbGVtZW50YXRpb25zOiBzb3J0IGFuZCBzcGxpY2VcclxuZXhwb3J0cy5vYnNlcnZlQXJyYXkgPSBmdW5jdGlvbiAoYXJyLCBsaXN0ZW5lcikge1xyXG4gICAgLy8gcmVwbGFjZSB0aGlzIGluIHRoZSBmdXR1cmUgd2l0aCBlczYgcHJveGllc1xyXG4gICAgdmFyIGxpc3RlbmVycyA9IG9ic2VydmVycy5nZXQoYXJyKTtcclxuICAgIGlmICghbGlzdGVuZXJzKSB7XHJcbiAgICAgICAgb2JzZXJ2ZXJzLnNldChhcnIsIFtsaXN0ZW5lcl0pO1xyXG4gICAgICAgIGFyci5wb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnIuc3BsaWNlKGFyci5sZW5ndGggLSAxLCAxKVswXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGFyci5wdXNoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zW19pXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXJyLnNwbGljZS5hcHBseShhcnIsIFthcnIubGVuZ3RoLCAwXS5jb25jYXQoaXRlbXMpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFyci5sZW5ndGg7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBhcnIuZmlsbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ29ic2VydmVkIGFycmF5cyBjYW5ub3QgYmUgZmlsbGVkLiBpdGVtcyBtdXN0IGJlIHVuaXF1ZSwgdXNlIEFycmF5LnNwbGljZSBpbnN0ZWFkIScpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgYXJyLnJldmVyc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByZWYgPSBhcnIuc2xpY2UoKTtcclxuICAgICAgICAgICAgYXJyLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIHJlZi5pbmRleE9mKGIpIC0gcmVmLmluZGV4T2YoYSk7IH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgYXJyLnNoaWZ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYXJyLnNwbGljZSgwLCAxKVswXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGFyci51bnNoaWZ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgaXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zW19pXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXJyLnNwbGljZS5hcHBseShhcnIsIFswLCAwXS5jb25jYXQoaXRlbXMpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGFyci5sZW5ndGg7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBkdWNrUHVuY2hTcGxpY2UoYXJyKTtcclxuICAgICAgICBkdWNrUHVuY2hTb3J0KGFycik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcbiAgICB9XHJcbn07XHJcbmZ1bmN0aW9uIGRvbUFycmF5TGlzdGVuZXIoYXJyLCBlbCwgZmlsdGVyLCBvbkl0ZW1BZGRlZCkge1xyXG4gICAgdmFyIGZpcnN0Q2hpbGQgPSBlbC5maXJzdEVsZW1lbnRDaGlsZDsgLy8gdXN1YWxseSBudWxsLCBsaXN0cyB0aGF0IHNoYXJlIGEgcGFyZW50IHdpdGggb3RoZXIgbm9kZXMgYXJlIHByZXBlbmRlZC5cclxuICAgIHZhciBub2RlVmlzaWJsZSA9IFtdO1xyXG4gICAgdmFyIGVsZW1lbnRNYXAgPSBuZXcgV2Vha01hcCgpO1xyXG4gICAgdmFyIGxpc3RlbmVyID0ge1xyXG4gICAgICAgIHNvcnQ6IGZ1bmN0aW9uIChpbmRpY2VzKSB7XHJcbiAgICAgICAgICAgIHZhciBjb3B5ID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kaWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGVWaXNpYmxlW2luZGljZXNbaV1dKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoZWxlbWVudE1hcC5nZXQoYXJyW2ldKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb3B5W2ldID0gbm9kZVZpc2libGVbaW5kaWNlc1tpXV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZVZpc2libGUgPSBjb3B5O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3BsaWNlOiBmdW5jdGlvbiAoaW5kZXgsIGRlbGV0ZUNvdW50LCBhZGRlZCwgZGVsZXRlZCkge1xyXG4gICAgICAgICAgICBpZiAoZGVsZXRlZCA9PT0gdm9pZCAwKSB7IGRlbGV0ZWQgPSBbXTsgfVxyXG4gICAgICAgICAgICB2YXIgcGF0Y2ggPSBBcnJheS5mcm9tKG5vZGVWaXNpYmxlKTtcclxuICAgICAgICAgICAgbm9kZVZpc2libGUuc3BsaWNlLmFwcGx5KG5vZGVWaXNpYmxlLCBbaW5kZXgsIGRlbGV0ZUNvdW50XS5jb25jYXQoYWRkZWQubWFwKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9KSkpO1xyXG4gICAgICAgICAgICBpZiAoZGVsZXRlQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgZGVsZXRlZF8xID0gZGVsZXRlZDsgX2kgPCBkZWxldGVkXzEubGVuZ3RoOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlbCA9IGRlbGV0ZWRfMVtfaV07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBlbGVtZW50TWFwLmdldChkZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnBhcmVudEVsZW1lbnQgPT09IGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZUNoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50TWFwLmRlbGV0ZShkZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFudXBfMS5jbGVhblVwKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhZGRlZC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIF9hID0gMCwgYWRkZWRfMSA9IGFkZGVkOyBfYSA8IGFkZGVkXzEubGVuZ3RoOyBfYSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBhZGRlZF8xW19hXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWVsZW1lbnRNYXAuaGFzKGl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRNYXAuc2V0KGl0ZW0sIG9uSXRlbUFkZGVkKGl0ZW0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGF0Y2guc3BsaWNlLmFwcGx5KHBhdGNoLCBbaW5kZXgsIGRlbGV0ZUNvdW50XS5jb25jYXQoYWRkZWQubWFwKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRydWU7IH0pKSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gYXJyLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcGF0Y2hbaV0gPSBmaWx0ZXIoYXJyW2ldLCBpKTtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVtTm9kZSA9IGVsZW1lbnRNYXAuZ2V0KGFycltpXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocGF0Y2hbaV0gJiYgIW5vZGVWaXNpYmxlW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRWaXNpYmxlID0gbm9kZVZpc2libGUuaW5kZXhPZih0cnVlLCBpKSwgcmVmTm9kZSA9IH5uZXh0VmlzaWJsZSA/IGVsZW1lbnRNYXAuZ2V0KGFycltuZXh0VmlzaWJsZV0pIDogZmlyc3RDaGlsZDtcclxuICAgICAgICAgICAgICAgICAgICBlbC5pbnNlcnRCZWZvcmUoaXRlbU5vZGUsIHJlZk5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIXBhdGNoW2ldICYmIG5vZGVWaXNpYmxlW2ldICYmIGl0ZW1Ob2RlLnBhcmVudE5vZGUgPT09IGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWwucmVtb3ZlQ2hpbGQoaXRlbU5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGVWaXNpYmxlID0gcGF0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGxpc3RlbmVyLnNwbGljZSgwLCAwLCBhcnIsIFtdKTtcclxuICAgIGNsZWFudXBfMS5yZWdpc3RlckNsZWFuVXAoZWwsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG9ic2VydmVycy5kZWxldGUoYXJyKTsgfSk7XHJcbiAgICByZXR1cm4gbGlzdGVuZXI7XHJcbn1cclxuZXhwb3J0cy5kb21BcnJheUxpc3RlbmVyID0gZG9tQXJyYXlMaXN0ZW5lcjtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXJyYXlzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBvYmplY3RzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvb2JqZWN0c1wiKTtcclxudmFyIGNvbXB1dGVkUHJvcHMgPSBuZXcgV2Vha01hcCgpO1xyXG5leHBvcnRzLmNyZWF0ZUNvbXB1dGVkTGlzdGVuZXIgPSBmdW5jdGlvbiAod2lkZ2V0LCBpbmZvLCB1cGRhdGVEb20pIHtcclxuICAgIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih3aWRnZXQpO1xyXG4gICAgaWYgKCFjb21wdXRlZFByb3BzLmhhcyhwcm90bykgfHwgIWNvbXB1dGVkUHJvcHMuZ2V0KHByb3RvKVtpbmZvLnBhdGgoKV0pIHtcclxuICAgICAgICB0aHJvdyBFcnJvcignQm91bmQgZnVuY3Rpb25zIG11c3QgYmUgZGVjb3JhdGVkIHdpdGggQENvbXB1dGVkKC4uLnBhdGhzOiBzdHJpbmdbXSknKTtcclxuICAgIH1cclxuICAgIGNvbXB1dGVkUHJvcHMuZ2V0KHByb3RvKVtpbmZvLnBhdGgoKV0uZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgIHJldHVybiBvYmplY3RzXzEuY3JlYXRlT2JqZWN0UHJvcGVydHlMaXN0ZW5lcih3aWRnZXQsIHByb3AsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVwZGF0ZURvbSgpOyB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5leHBvcnRzLkNvbXB1dGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHBhdGhzID0gW107XHJcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgIHBhdGhzW19pXSA9IGFyZ3VtZW50c1tfaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHByb3RvLCBtZXRob2QpIHtcclxuICAgICAgICBvYmplY3RzXzEuZW5zdXJlKGNvbXB1dGVkUHJvcHMsIHByb3RvLCAoX2EgPSB7fSwgX2FbbWV0aG9kXSA9IHBhdGhzLCBfYSkpO1xyXG4gICAgICAgIHZhciBfYTtcclxuICAgIH07XHJcbn07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbXB1dGVkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBvYmplY3RzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvb2JqZWN0c1wiKTtcclxudmFyIGZ1bmN0aW9uc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL2Z1bmN0aW9uc1wiKTtcclxudmFyIFRlbXBsYXRlTm9kZXMgPSBuZXcgV2Vha01hcCgpO1xyXG5leHBvcnRzLlRlbXBsYXRlTm9kZSA9IGZ1bmN0aW9uIChzZWxlY3RvcikgeyByZXR1cm4gZnVuY3Rpb24gKHByb3RvLCBwcm9wZXJ0eSkge1xyXG4gICAgb2JqZWN0c18xLmVuc3VyZShUZW1wbGF0ZU5vZGVzLCBwcm90bywgW3sgc2VsZWN0b3I6IHNlbGVjdG9yLCBwcm9wZXJ0eTogcHJvcGVydHkgfV0pO1xyXG59OyB9O1xyXG5leHBvcnRzLmluamVjdFRlbXBsYXRlTm9kZXMgPSBmdW5jdGlvbiAod2lkZ2V0LCBub2Rlcykge1xyXG4gICAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHdpZGdldCk7XHJcbiAgICB2YXIgYmluZGluZ3MgPSBUZW1wbGF0ZU5vZGVzLmdldChwcm90byk7XHJcbiAgICBpZiAoZnVuY3Rpb25zXzEuaXNEZWYoYmluZGluZ3MpKSB7XHJcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBiaW5kaW5nc18xID0gYmluZGluZ3M7IF9pIDwgYmluZGluZ3NfMS5sZW5ndGg7IF9pKyspIHtcclxuICAgICAgICAgICAgdmFyIGIgPSBiaW5kaW5nc18xW19pXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgX2EgPSAwLCBub2Rlc18xID0gbm9kZXM7IF9hIDwgbm9kZXNfMS5sZW5ndGg7IF9hKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBuID0gbm9kZXNfMVtfYV07XHJcbiAgICAgICAgICAgICAgICB3aWRnZXRbYi5wcm9wZXJ0eV0gPSBuLnF1ZXJ5U2VsZWN0b3IoYi5zZWxlY3Rvcik7XHJcbiAgICAgICAgICAgICAgICBpZiAod2lkZ2V0W2IucHJvcGVydHldICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRlbXBsYXRlLW5vZGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHRlbXBsYXRlXzEgPSByZXF1aXJlKFwiLi4vZGVjb3JhdG9ycy90ZW1wbGF0ZVwiKTtcclxudmFyIGZ1bmN0aW9uc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL2Z1bmN0aW9uc1wiKTtcclxudmFyIG9iamVjdHNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9vYmplY3RzXCIpO1xyXG52YXIgY29uc3RydWN0XzEgPSByZXF1aXJlKFwiLi4vZGVjb3JhdG9ycy9jb25zdHJ1Y3RcIik7XHJcbnZhciB0cmFuc2Zvcm1lcl8xID0gcmVxdWlyZShcIi4uL2RlY29yYXRvcnMvdHJhbnNmb3JtZXJcIik7XHJcbnZhciBhcnJheXNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9hcnJheXNcIik7XHJcbnZhciBjb21wdXRlZF8xID0gcmVxdWlyZShcIi4uL2RlY29yYXRvcnMvY29tcHV0ZWRcIik7XHJcbnZhciBjbGVhbnVwXzEgPSByZXF1aXJlKFwiLi9jbGVhbnVwXCIpO1xyXG52YXIgZG9tXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvZG9tXCIpO1xyXG52YXIgdGVtcGxhdGVfbm9kZV8xID0gcmVxdWlyZShcIi4uL2RlY29yYXRvcnMvdGVtcGxhdGUtbm9kZVwiKTtcclxudmFyIHN0cmluZ3NfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9zdHJpbmdzXCIpO1xyXG52YXIgc3ViV2lkZ2V0cyA9IG5ldyBXZWFrTWFwKCk7XHJcbi8qXHJcbiAqIFRoaXMgd2lsbCBmYWlsIGZvciBuZXN0ZWQgYXJyYXlzIHdoZW4gZmlsdGVyZWQgZWxlbWVudHMgYXJlIHRha2VuIG91dCBvZiBET00sXHJcbiAqIGhvd2V2ZXIga2VlcGluZyB0cmFjayBvZiB0aGUgd2lkZ2V0IHRyZWUgd2lsbCBtYWtlIHRoZSBmcmFtZXdvcmsgd2F5IHRvbyBjb21wbGV4LlxyXG4gKiBGb3IgbW9zdCB1c2UgY2FzZXMgdGhpcyB3aWxsIHN1ZmZpY2UgYW5kIHVzdWFsbHkgVUkgdHJpZ2dlcnMgY2hhbmdlcyBmcm9tIGFuZCB0b1xyXG4gKiB2aXNpYmxlIGVsZW1lbnRzLiBEaXNwYXRjaCBjb2RlIGluIGNvbm5lY3RUZW1wbGF0ZSBtZXRob2QuXHJcbiAqL1xyXG52YXIgVVBEQVRFX0tFWSA9ICdfX3VwZGF0ZV9fJztcclxudmFyIFVwZGF0ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBDdXN0b21FdmVudChVUERBVEVfS0VZLCB7IGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IGZhbHNlLCBzY29wZWQ6IGZhbHNlIH0pOyB9O1xyXG52YXIgdXBkYXRlRG9tVmFsdWUgPSBmdW5jdGlvbiAobm9kZSwgaW5mbywgdmFsdWUsIG9sZFZhbHVlKSB7XHJcbiAgICBpZiAoaW5mby50eXBlID09PSB0ZW1wbGF0ZV8xLlRlbXBsYXRlVG9rZW5UeXBlLlRFWFQpIHtcclxuICAgICAgICBub2RlLnRleHRDb250ZW50ID0gZnVuY3Rpb25zXzEuaXNEZWYodmFsdWUpID8gdmFsdWUgOiAnJztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGluZm8udHlwZSA9PT0gdGVtcGxhdGVfMS5UZW1wbGF0ZVRva2VuVHlwZS5DTEFTUykge1xyXG4gICAgICAgICEhb2xkVmFsdWUgJiYgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKChcIlwiICsgb2xkVmFsdWUpLnJlcGxhY2UoL1xccysvZywgJy0nKSkgfHxcclxuICAgICAgICAgICAgISF2YWx1ZSAmJiBub2RlLmNsYXNzTGlzdC5hZGQoKFwiXCIgKyB2YWx1ZSkucmVwbGFjZSgvXFxzKy9nLCAnLScpKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGluZm8udHlwZSA9PT0gdGVtcGxhdGVfMS5UZW1wbGF0ZVRva2VuVHlwZS5BVFRSSUJVVEUgfHwgaW5mby50eXBlID09PSB0ZW1wbGF0ZV8xLlRlbXBsYXRlVG9rZW5UeXBlLlBST1BFUlRZKSB7XHJcbiAgICAgICAgdmFyIGF0dHJpYnV0ZU5hbWUgPSBpbmZvLmF0dHJpYnV0ZSB8fCBpbmZvLnBhdGgoKTtcclxuICAgICAgICBpZiAoL2NoZWNrZWR8dmFsdWUvaS50ZXN0KGF0dHJpYnV0ZU5hbWUpKSB7XHJcbiAgICAgICAgICAgIG5vZGVbYXR0cmlidXRlTmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZnVuY3Rpb25zXzEuaXNVbmRlZih2YWx1ZSkgfHwgdmFsdWUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZU5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGF0dHJWYWx1ZSA9IHZhbHVlID09PSB0cnVlID8gJycgOiB2YWx1ZTtcclxuICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgYXR0clZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn07XHJcbnZhciB1cGRhdGVEb20gPSBmdW5jdGlvbiAod2lkZ2V0LCB0ZW1wbGF0ZSwgdHJhbnNmb3JtTWFwLCBvbGRWYWx1ZU1hcCkge1xyXG4gICAgdmFyIGRvbUNoYW5nZWQgPSBmYWxzZTtcclxuICAgIHZhciB2YWx1ZU1hcCA9IGdldEN1cnJlbnRWYWx1ZU1hcCh3aWRnZXQsIHRlbXBsYXRlLCB0cmFuc2Zvcm1NYXApO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSB0ZW1wbGF0ZS5pbmZvcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICB2YXIgaW5mbyA9IHRlbXBsYXRlLmluZm9zW2ldO1xyXG4gICAgICAgIGlmIChpbmZvLnR5cGUgPT09IHRlbXBsYXRlXzEuVGVtcGxhdGVUb2tlblR5cGUuVEFHKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgb2xkVmFsdWUgPSBvbGRWYWx1ZU1hcFtpXSwgdmFsdWUgPSB2YWx1ZU1hcFtpXTtcclxuICAgICAgICBpZiAodmFsdWUgPT09IEFSUkFZX1RBRykgeyAvLyBpZ25vcmUgYXJyYXlzXHJcbiAgICAgICAgICAgIHdpZGdldFtpbmZvLnBhdGgoKV0uc3BsaWNlKDAsIDApO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9sZFZhbHVlICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICBkb21DaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgb2xkVmFsdWVNYXBbaV0gPSB1cGRhdGVEb21WYWx1ZSh0ZW1wbGF0ZS5ub2Rlc1tpbmZvLnBvc2l0aW9uXSwgaW5mbywgdmFsdWUsIG9sZFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNoYW5nZTogZG9tQ2hhbmdlZCxcclxuICAgICAgICB2YWx1ZU1hcDogb2xkVmFsdWVNYXBcclxuICAgIH07XHJcbn07XHJcbnZhciBiaW5kV2lkZ2V0ID0gZnVuY3Rpb24gKHdpZGdldCwgcm9vdEluZm8sIG5vZGUpIHtcclxuICAgIHZhciBzdWJXaWRnZXQgPSBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KGNvbnN0cnVjdF8xLkNvbnN0cnVjdFJlZ2lzdHJ5W3Jvb3RJbmZvLnNlbGVjdG9yXSkpO1xyXG4gICAgb2JqZWN0c18xLmVuc3VyZShzdWJXaWRnZXRzLCB3aWRnZXQsIFtzdWJXaWRnZXRdKTtcclxuICAgIHZhciBhdHRyaWJ1dGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobm9kZS5hdHRyaWJ1dGVzKTtcclxuICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKGF0dHJpYnV0ZSwgaSwgbikge1xyXG4gICAgICAgIGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbaV07XHJcbiAgICAgICAgdmFyIG1hdGNoID0gYXR0cmlidXRlLnZhbHVlLm1hdGNoKHRlbXBsYXRlXzEuQ1VSTElFUyk7XHJcbiAgICAgICAgdmFyIHN1YlByb3AgPSBzdHJpbmdzXzEuY2FtZWxDYXNlRnJvbUh5cGhlbnMoYXR0cmlidXRlLm5hbWUpO1xyXG4gICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICB2YXIgcHJvcF8xID0gbWF0Y2hbMV07XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IG9iamVjdHNfMS5kZWVwVmFsdWUod2lkZ2V0LCBwcm9wXzEpO1xyXG4gICAgICAgICAgICBpZiAoZnVuY3Rpb25zXzEuaXNGdW5jdGlvbih2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHN1YldpZGdldFtzdWJQcm9wXSA9IHZhbHVlLmJpbmQod2lkZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh+cHJvcF8xLmluZGV4T2YoJzonKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKFwiQ2Fubm90IHVzZSB0cmFuc2Zvcm1lciBmb3IgXCIgKyBwcm9wXzEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHVwZGF0ZVZhbF8xID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YldpZGdldFtzdWJQcm9wXSA9IG9iamVjdHNfMS5kZWVwVmFsdWUod2lkZ2V0LCBwcm9wXzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1cGRhdGVWYWxfMTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBvYmplY3RzXzEuYWRkUHJvcGVydHlMaXN0ZW5lcih3aWRnZXQsIHByb3BfMSwgdXBkYXRlVmFsXzEoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChtYXRjaCA9IGF0dHJpYnV0ZS52YWx1ZS5tYXRjaCh0ZW1wbGF0ZV8xLlNJTkdMRV9DVVJMSUVTKSkge1xyXG4gICAgICAgICAgICBzdWJXaWRnZXRbc3ViUHJvcF0gPSBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gXCIgKyBtYXRjaFsxXSkoKTtcclxuICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlLm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc3ViV2lkZ2V0W3N1YlByb3BdID0gYXR0cmlidXRlLnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvdXRfYXR0cmlidXRlXzEgPSBhdHRyaWJ1dGU7XHJcbiAgICB9O1xyXG4gICAgdmFyIG91dF9hdHRyaWJ1dGVfMTtcclxuICAgIGZvciAodmFyIGF0dHJpYnV0ZSA9IHZvaWQgMCwgaSA9IDAsIG4gPSBhdHRyaWJ1dGVzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIF9sb29wXzEoYXR0cmlidXRlLCBpLCBuKTtcclxuICAgICAgICBhdHRyaWJ1dGUgPSBvdXRfYXR0cmlidXRlXzE7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RfMS5ydW5Db25zdHJ1Y3RvclF1ZXVlKHN1YldpZGdldCwgbm9kZSk7XHJcbn07XHJcbnZhciBGaWx0ZXJlZEFycmF5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gRmlsdGVyZWRBcnJheSgpIHtcclxuICAgIH1cclxuICAgIHJldHVybiBGaWx0ZXJlZEFycmF5O1xyXG59KCkpOyAvLyBmbGFnIGNsYXNzIGZvciB1cGRhdGUgY2hlY2tcclxudmFyIEFSUkFZX1RBRyA9IG5ldyBGaWx0ZXJlZEFycmF5KCk7XHJcbnZhciBnZXRJbmZvVmFsdWUgPSBmdW5jdGlvbiAod2lkZ2V0LCBpbmZvLCB0cmFuc2Zvcm1NYXApIHtcclxuICAgIHZhciBwYXRoID0gaW5mby5wYXRoKCksIHRyYW5zZm9ybWVyID0gdHJhbnNmb3JtTWFwW2luZm8uY3VybHkoKV07XHJcbiAgICB2YXIgdiA9IG9iamVjdHNfMS5kZWVwVmFsdWUod2lkZ2V0LCBwYXRoKTtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KHYpICYmIGZ1bmN0aW9uc18xLmlzRnVuY3Rpb24odHJhbnNmb3JtZXIodikpKSB7XHJcbiAgICAgICAgcmV0dXJuIEFSUkFZX1RBRztcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHYgPSBmdW5jdGlvbnNfMS5pc0Z1bmN0aW9uKHYpID8gdi5jYWxsKHdpZGdldCkgOiB2O1xyXG4gICAgICAgIHYgPSB0cmFuc2Zvcm1lciA/IHRyYW5zZm9ybWVyKHYpIDogdjtcclxuICAgICAgICByZXR1cm4gdjtcclxuICAgIH1cclxufTtcclxudmFyIGdldEN1cnJlbnRWYWx1ZU1hcCA9IGZ1bmN0aW9uICh3aWRnZXQsIHRlbXBsYXRlLCB0cmFuc2Zvcm1NYXApIHtcclxuICAgIHZhciBtYXAgPSBbXTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBuID0gdGVtcGxhdGUuaW5mb3MubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgbWFwW2ldID0gZ2V0SW5mb1ZhbHVlKHdpZGdldCwgdGVtcGxhdGUuaW5mb3NbaV0sIHRyYW5zZm9ybU1hcCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWFwO1xyXG59O1xyXG52YXIgYmluZEFycmF5ID0gZnVuY3Rpb24gKGFycmF5LCBwYXJlbnROb2RlLCB3aWRnZXQsIGluZm8sIHRlbXBsYXRlTmFtZSkge1xyXG4gICAgdmFyIG1ldGhvZCA9IGluZm8uYXJyYXlUcmFuc2Zvcm1lcigpLCB0cmFuc2Zvcm1lciA9ICh3aWRnZXRbbWV0aG9kXSB8fCB0cmFuc2Zvcm1lcl8xLlRyYW5zZm9ybWVyUmVnaXN0cnlbbWV0aG9kXSkuYmluZCh3aWRnZXQpO1xyXG4gICAgdmFyIGxpc3RlbmVyID0gYXJyYXlzXzEuZG9tQXJyYXlMaXN0ZW5lcihhcnJheSwgcGFyZW50Tm9kZSwgdHJhbnNmb3JtZXIoKSwgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB2YXIgdGVtcGxhdGUgPSB0ZW1wbGF0ZV8xLmdldFRlbXBsYXRlKGl0ZW0sIHRlbXBsYXRlTmFtZSgpKSwgbm9kZSA9IHRlbXBsYXRlLm5vZGVzWzFdO1xyXG4gICAgICAgIGNvbnN0cnVjdF8xLnJ1bkNvbnN0cnVjdG9yUXVldWUoaXRlbSwgbm9kZSk7XHJcbiAgICAgICAgZXhwb3J0cy5jb25uZWN0VGVtcGxhdGUoaXRlbSwgbm9kZSwgdGVtcGxhdGUsIHBhcmVudE5vZGUpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfSk7XHJcbiAgICBhcnJheXNfMS5vYnNlcnZlQXJyYXkoYXJyYXksIGxpc3RlbmVyKTtcclxuICAgIHJldHVybiBsaXN0ZW5lcjtcclxufTtcclxudmFyIGdldFRyYW5zZm9ybU1hcCA9IGZ1bmN0aW9uICh3aWRnZXQsIHRlbXBsYXRlKSB7XHJcbiAgICB2YXIgbWFwID0ge307XHJcbiAgICBmb3IgKHZhciBpbmZvID0gdm9pZCAwLCBpID0gMCwgbiA9IHRlbXBsYXRlLmluZm9zLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIGluZm8gPSB0ZW1wbGF0ZS5pbmZvc1tpXTtcclxuICAgICAgICB2YXIgdHJhbnNmb3JtZXJzID0gaW5mby50cmFuc2Zvcm1lcnMoKTtcclxuICAgICAgICBpZiAodHJhbnNmb3JtZXJzKSB7XHJcbiAgICAgICAgICAgIG1hcFtpbmZvLmN1cmx5KCldID0gdHJhbnNmb3JtRmFjdG9yeSh3aWRnZXQsIHRyYW5zZm9ybWVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1hcDtcclxufTtcclxudmFyIGZpbmRUZW1wbGF0ZUluZm9Jbk5vZGUgPSBmdW5jdGlvbiAodGVtcGxhdGUsIHBvc2l0aW9uKSB7XHJcbiAgICByZXR1cm4gdGVtcGxhdGUuaW5mb3MuZmluZChmdW5jdGlvbiAoaSkgeyByZXR1cm4gaS5wb3NpdGlvbiA9PT0gcG9zaXRpb24gJiYgaS5hdHRyaWJ1dGUgPT09ICd0ZW1wbGF0ZSc7IH0pO1xyXG59O1xyXG52YXIgZmluZFByb3BlcnR5SW5mb0luTm9kZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSwgcG9zaXRpb24pIHtcclxuICAgIHJldHVybiB0ZW1wbGF0ZS5pbmZvcy5maW5kKGZ1bmN0aW9uIChpKSB7IHJldHVybiBpLnBvc2l0aW9uID09PSBwb3NpdGlvbiAmJiBpLnR5cGUgPT09IHRlbXBsYXRlXzEuVGVtcGxhdGVUb2tlblR5cGUuUFJPUEVSVFk7IH0pO1xyXG59O1xyXG52YXIgYWRkVGVtcGxhdGVBdHRyaWJ1dGVIb29rID0gZnVuY3Rpb24gKHdpZGdldCwgbm9kZSwgaW5mbywgdHJhbnNmb3JtTWFwKSB7XHJcbiAgICB2YXIgdmFsdWUgPSBnZXRJbmZvVmFsdWUod2lkZ2V0LCBpbmZvLCB0cmFuc2Zvcm1NYXApO1xyXG4gICAgaWYgKGZ1bmN0aW9uc18xLmlzRGVmKHZhbHVlKSkge1xyXG4gICAgICAgIHZhciB1cGRhdGVUZW1wbGF0ZU5vZGVfMSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gZ2V0SW5mb1ZhbHVlKHdpZGdldCwgaW5mbywgdHJhbnNmb3JtTWFwKTtcclxuICAgICAgICAgICAgZXhwb3J0cy5yZW5kZXIod2lkZ2V0LCBub2RlLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB1cGRhdGVUZW1wbGF0ZU5vZGVfMTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9iamVjdHNfMS5hZGRQcm9wZXJ0eUxpc3RlbmVyKHdpZGdldCwgaW5mby5wYXRoKCksIHVwZGF0ZVRlbXBsYXRlTm9kZV8xKCkpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZXhwb3J0cy5yZW5kZXIod2lkZ2V0LCBub2RlLCBpbmZvLmN1cmx5KCkpO1xyXG4gICAgfVxyXG4gICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoJ3RlbXBsYXRlJyk7XHJcbn07XHJcbnZhciBiaW5kVGVtcGxhdGVJbmZvcyA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSwgd2lkZ2V0LCB1cGRhdGVUZW1wbGF0ZSwgdHJhbnNmb3JtTWFwKSB7XHJcbiAgICB2YXIgYm91bmQgPSBbXTtcclxuICAgIHZhciBpbmZvcyA9IHRlbXBsYXRlLmluZm9zO1xyXG4gICAgdmFyIF9sb29wXzIgPSBmdW5jdGlvbiAoaW5mbywgaSwgbikge1xyXG4gICAgICAgIGluZm8gPSBpbmZvc1tpXTtcclxuICAgICAgICB2YXIgcGF0aCA9IGluZm8ucGF0aCgpO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IG9iamVjdHNfMS5kZWVwVmFsdWUod2lkZ2V0LCBpbmZvLnBhdGgoKSk7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0ZW1wbGF0ZS5ub2Rlc1tpbmZvLnBvc2l0aW9uXTtcclxuICAgICAgICBpZiAoaW5mby50eXBlID09PSB0ZW1wbGF0ZV8xLlRlbXBsYXRlVG9rZW5UeXBlLlRBRykge1xyXG4gICAgICAgICAgICBiaW5kV2lkZ2V0KHdpZGdldCwgaW5mbywgbm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGluZm8udHlwZSA9PT0gdGVtcGxhdGVfMS5UZW1wbGF0ZVRva2VuVHlwZS5QUk9QRVJUWSkge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGZvciBkeW5hbWljIHRlbXBsYXRlIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgICAgICAgdmFyIHRlbXBsYXRlSW5mb18xID0gZmluZFRlbXBsYXRlSW5mb0luTm9kZSh0ZW1wbGF0ZSwgaW5mby5wb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXR0cmlidXRlVmFsdWVfMSA9IG5vZGUuZ2V0QXR0cmlidXRlKCd0ZW1wbGF0ZScpIHx8IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIHZhciB0ZW1wbGF0ZU5hbWUgPSB2b2lkIDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoZnVuY3Rpb25zXzEuaXNEZWYodGVtcGxhdGVJbmZvXzEpICYmIHRlbXBsYXRlXzEuQ1VSTElFUy50ZXN0KGF0dHJpYnV0ZVZhbHVlXzEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVOYW1lID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2V0SW5mb1ZhbHVlKHdpZGdldCwgdGVtcGxhdGVJbmZvXzEsIHRyYW5zZm9ybU1hcCk7IH07XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0c18xLmFkZFByb3BlcnR5TGlzdGVuZXIod2lkZ2V0LCB0ZW1wbGF0ZUluZm9fMS5wYXRoKCksIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUuc3BsaWNlLmFwcGx5KHZhbHVlLCBbMCwgdmFsdWUubGVuZ3RoXS5jb25jYXQodmFsdWUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlTmFtZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGF0dHJpYnV0ZVZhbHVlXzE7IH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBiaW5kQXJyYXkodmFsdWUsIG5vZGUsIHdpZGdldCwgaW5mbywgdGVtcGxhdGVOYW1lKTtcclxuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKCd0ZW1wbGF0ZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGZ1bmN0aW9uc18xLmlzRnVuY3Rpb24odmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGNvbXB1dGVkXzEuY3JlYXRlQ29tcHV0ZWRMaXN0ZW5lcih3aWRnZXQsIGluZm8sIHVwZGF0ZVRlbXBsYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaW5mby50eXBlID09PSB0ZW1wbGF0ZV8xLlRlbXBsYXRlVG9rZW5UeXBlLlRFTVBMQVRFKSB7XHJcbiAgICAgICAgICAgIHZhciBwcm9wSW5mbyA9IGZpbmRQcm9wZXJ0eUluZm9Jbk5vZGUodGVtcGxhdGUsIGluZm8ucG9zaXRpb24pO1xyXG4gICAgICAgICAgICBpZiAoZnVuY3Rpb25zXzEuaXNVbmRlZihwcm9wSW5mbykgfHwgIUFycmF5LmlzQXJyYXkob2JqZWN0c18xLmRlZXBWYWx1ZSh3aWRnZXQsIHByb3BJbmZvLnBhdGgoKSkpKSB7XHJcbiAgICAgICAgICAgICAgICBhZGRUZW1wbGF0ZUF0dHJpYnV0ZUhvb2sod2lkZ2V0LCBub2RlLCBpbmZvLCB0cmFuc2Zvcm1NYXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKCFib3VuZC5pbmNsdWRlcyhwYXRoKSAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgYm91bmQucHVzaChwYXRoKTtcclxuICAgICAgICAgICAgb2JqZWN0c18xLmNyZWF0ZU9iamVjdFByb3BlcnR5TGlzdGVuZXIod2lkZ2V0LCBwYXRoLCBmdW5jdGlvbiAoKSB7IHJldHVybiB1cGRhdGVUZW1wbGF0ZSgpOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgb3V0X2luZm9fMSA9IGluZm87XHJcbiAgICB9O1xyXG4gICAgdmFyIG91dF9pbmZvXzE7XHJcbiAgICBmb3IgKHZhciBpbmZvID0gdm9pZCAwLCBpID0gMCwgbiA9IGluZm9zLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIF9sb29wXzIoaW5mbywgaSwgbik7XHJcbiAgICAgICAgaW5mbyA9IG91dF9pbmZvXzE7XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMuY29ubmVjdFRlbXBsYXRlID0gZnVuY3Rpb24gKHdpZGdldCwgZWwsIHRlbXBsYXRlLCBwYXJlbnROb2RlKSB7XHJcbiAgICBpZiAocGFyZW50Tm9kZSA9PT0gdm9pZCAwKSB7IHBhcmVudE5vZGUgPSBlbC5wYXJlbnROb2RlOyB9XHJcbiAgICB2YXIgdHJhbnNmb3JtTWFwID0gZ2V0VHJhbnNmb3JtTWFwKHdpZGdldCwgdGVtcGxhdGUpO1xyXG4gICAgdmFyIHJlcyA9IHVwZGF0ZURvbSh3aWRnZXQsIHRlbXBsYXRlLCB0cmFuc2Zvcm1NYXAsIFtdKTtcclxuICAgIHZhciB1cGRhdGVUZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIW11dGVkV2lkZ2V0Lmhhcyh3aWRnZXQpKSB7XHJcbiAgICAgICAgICAgIHJlcyA9IHVwZGF0ZURvbSh3aWRnZXQsIHRlbXBsYXRlLCB0cmFuc2Zvcm1NYXAsIHJlcy52YWx1ZU1hcCk7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY2hhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQoVXBkYXRlKCkpOyAvLyBsZXQncyBpbmZvcm0gcGFyZW50IHdpZGdldHNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKFVQREFURV9LRVksIHVwZGF0ZVRlbXBsYXRlKTtcclxuICAgIGJpbmRUZW1wbGF0ZUluZm9zKHRlbXBsYXRlLCB3aWRnZXQsIHVwZGF0ZVRlbXBsYXRlLCB0cmFuc2Zvcm1NYXApO1xyXG4gICAgdGVtcGxhdGVfbm9kZV8xLmluamVjdFRlbXBsYXRlTm9kZXMod2lkZ2V0LCB0ZW1wbGF0ZS5ub2Rlcyk7XHJcbn07XHJcbnZhciB0cmFuc2Zvcm1GYWN0b3J5ID0gZnVuY3Rpb24gKHdpZGdldCwgdHJhbnNmb3JtZXJzKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb25zXzEuY29tcG9zZSh0cmFuc2Zvcm1lcnMubWFwKGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgdmFyIHRyYW5zZm9ybWVyID0gKHdpZGdldFttXSB8fCB0cmFuc2Zvcm1lcl8xLlRyYW5zZm9ybWVyUmVnaXN0cnlbbV0pO1xyXG4gICAgICAgIGlmIChmdW5jdGlvbnNfMS5pc1VuZGVmKHRyYW5zZm9ybWVyKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIk5vIHRyYW5zZm9ybWVyIGZvdW5kIGZvciBcIiArIG0gKyBcIi4gSW1wbGVtZW50IGZ1bmN0aW9uIG9uIFwiICsgd2lkZ2V0LmNvbnN0cnVjdG9yLm5hbWUgKyBcIiBvciBhbm5vdGF0ZSBhIG1ldGhvZCB3aXRoIEBUcmFuc2Zvcm1lcigpXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtZXIuYmluZCh3aWRnZXQpO1xyXG4gICAgfSkpO1xyXG59O1xyXG5leHBvcnRzLnJlbmRlciA9IGZ1bmN0aW9uICh3aWRnZXQsIGVsLCBuYW1lKSB7XHJcbiAgICB2YXIgY2hpbGRyZW4gPSBkb21fMS5hbGxDaGlsZE5vZGVzKGVsKTtcclxuICAgIGZvciAodmFyIG5vZGUgPSB2b2lkIDAsIGkgPSAwLCBuID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgbm9kZSA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAgIGlmIChub2RlICE9PSBlbCkge1xyXG4gICAgICAgICAgICBjbGVhbnVwXzEuY2xlYW5VcChub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbC5pbm5lckhUTUwgPSAnJztcclxuICAgIHZhciB0ZW1wbGF0ZSA9IHRlbXBsYXRlXzEuZ2V0VGVtcGxhdGUod2lkZ2V0LCBuYW1lKTtcclxuICAgIGV4cG9ydHMuY29ubmVjdFRlbXBsYXRlKHdpZGdldCwgZWwsIHRlbXBsYXRlKTtcclxuICAgIGVsLmFwcGVuZENoaWxkKHRlbXBsYXRlLmRvYyk7XHJcbn07XHJcbmV4cG9ydHMuZmluZFdpZGdldHMgPSBmdW5jdGlvbiAod2lkZ2V0LCB0eXBlKSB7XHJcbiAgICByZXR1cm4gc3ViV2lkZ2V0cy5nZXQod2lkZ2V0KS5maWx0ZXIoZnVuY3Rpb24gKHQpIHsgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZih0KSA9PT0gdHlwZS5wcm90b3R5cGU7IH0pO1xyXG59O1xyXG5leHBvcnRzLmZpbmRXaWRnZXQgPSBmdW5jdGlvbiAod2lkZ2V0LCB0eXBlKSB7XHJcbiAgICByZXR1cm4gZXhwb3J0cy5maW5kV2lkZ2V0cyh3aWRnZXQsIHR5cGUpWzBdO1xyXG59O1xyXG52YXIgbXV0ZWRXaWRnZXQgPSBuZXcgV2Vha01hcCgpO1xyXG5leHBvcnRzLkJhdGNoID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZnVuY3Rpb24gKHByb3RvLCBtZXRob2QpIHtcclxuICAgIGNvbnN0cnVjdF8xLmFkZFRvQ29uc3RydWN0b3JRdWV1ZShwcm90by5jb25zdHJ1Y3RvciwgZnVuY3Rpb24gKHdpZGdldCwgZWwpIHtcclxuICAgICAgICB2YXIgb2xkID0gd2lkZ2V0W21ldGhvZF07XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpZGdldCwgbWV0aG9kLCB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBtdXRlZFdpZGdldC5zZXQod2lkZ2V0LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIG9sZC5hcHBseSh3aWRnZXQsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICBtdXRlZFdpZGdldC5kZWxldGUod2lkZ2V0KTtcclxuICAgICAgICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQoVXBkYXRlKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTsgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmluZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcclxuICAgICAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29uc3RydWN0XzEgPSByZXF1aXJlKFwiLi9jb25zdHJ1Y3RcIik7XHJcbnZhciBmdW5jdGlvbnNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9mdW5jdGlvbnNcIik7XHJcbnZhciBjbGVhbnVwXzEgPSByZXF1aXJlKFwiLi4vY29yZS9jbGVhbnVwXCIpO1xyXG52YXIgU2NvcGU7XHJcbihmdW5jdGlvbiAoU2NvcGUpIHtcclxuICAgIFNjb3BlW1Njb3BlW1wiRGlyZWN0XCJdID0gMF0gPSBcIkRpcmVjdFwiO1xyXG4gICAgU2NvcGVbU2NvcGVbXCJEZWxlZ2F0ZVwiXSA9IDFdID0gXCJEZWxlZ2F0ZVwiO1xyXG4gICAgU2NvcGVbU2NvcGVbXCJVbnRpbE1hdGNoXCJdID0gMl0gPSBcIlVudGlsTWF0Y2hcIjtcclxufSkoU2NvcGUgPSBleHBvcnRzLlNjb3BlIHx8IChleHBvcnRzLlNjb3BlID0ge30pKTtcclxuZnVuY3Rpb24gcHJldmVudERlZmF1bHQoY29uZiwgZXYpIHtcclxuICAgIGlmIChjb25mLnByZXZlbnREZWZhdWx0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxufVxyXG52YXIgY3JlYXRlSGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCwgY29uZiwgd2lkZ2V0LCBub2RlLCBkaXJlY3QpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZXYpIHtcclxuICAgICAgICBpZiAoZGlyZWN0KSB7XHJcbiAgICAgICAgICAgIHByZXZlbnREZWZhdWx0KGNvbmYsIGV2KTtcclxuICAgICAgICAgICAgd2lkZ2V0W2NvbmYubWV0aG9kXS5jYWxsKHdpZGdldCwgZXYsIG5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGVsID0gZXYudGFyZ2V0O1xyXG4gICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWwubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmIGVsLm1hdGNoZXMoY29uZi5zZWxlY3RvcikpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50RGVmYXVsdChjb25mLCBldik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpZGdldFtjb25mLm1ldGhvZF0uY2FsbCh3aWRnZXQsIGV2LCBlbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZWwgPT09IG5vZGUgJiYgY29uZi5zY29wZSAhPT0gU2NvcGUuVW50aWxNYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IHdoaWxlIChlbCA9IGVsLnBhcmVudEVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcbnZhciBhdHRhY2hFdmVudHMgPSBmdW5jdGlvbiAoY29uZikgeyByZXR1cm4gZnVuY3Rpb24gKHdpZGdldCwgbm9kZSkge1xyXG4gICAgdmFyIGV2ZW50cyA9IEFycmF5LmlzQXJyYXkoY29uZi5ldmVudCkgPyBjb25mLmV2ZW50IDogW2NvbmYuZXZlbnRdO1xyXG4gICAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgaWYgKFNjb3BlLkRpcmVjdCAmJiBmdW5jdGlvbnNfMS5pc0RlZihjb25mLnNlbGVjdG9yKSkge1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5xdWVyeVNlbGVjdG9yKGNvbmYuc2VsZWN0b3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaGFuZGxlciA9IGNyZWF0ZUhhbmRsZXIoZXZlbnQsIGNvbmYsIHdpZGdldCwgbm9kZSwgY29uZi5zY29wZSA9PT0gU2NvcGUuRGlyZWN0IHx8IGZ1bmN0aW9uc18xLmlzVW5kZWYoY29uZi5zZWxlY3RvcikpO1xyXG4gICAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgY29uZi5vcHRpb25zKTtcclxuICAgICAgICBjbGVhbnVwXzEucmVnaXN0ZXJDbGVhblVwKG5vZGUsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcik7IH0pO1xyXG4gICAgfSk7XHJcbn07IH07XHJcbmV4cG9ydHMuT24gPSBmdW5jdGlvbiAoY29uZikgeyByZXR1cm4gZnVuY3Rpb24gKHByb3RvLCBtZXRob2QpIHtcclxuICAgIHZhciBmaW5hbENvbmYgPSBfX2Fzc2lnbih7fSwgY29uZiwgeyBtZXRob2Q6IG1ldGhvZCwgZXZlbnQ6IGNvbmYuZXZlbnQgfHwgbWV0aG9kLCBzY29wZTogU2NvcGUuRGVsZWdhdGUgfSk7XHJcbiAgICBjb25zdHJ1Y3RfMS5hZGRUb0NvbnN0cnVjdG9yUXVldWUocHJvdG8uY29uc3RydWN0b3IsIGF0dGFjaEV2ZW50cyhmaW5hbENvbmYpKTtcclxufTsgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXZlbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGZ1bmN0aW9uc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL2Z1bmN0aW9uc1wiKTtcclxudmFyIGNvbnN0cnVjdF8xID0gcmVxdWlyZShcIi4vY29uc3RydWN0XCIpO1xyXG52YXIgb2JqZWN0c18xID0gcmVxdWlyZShcIi4uL3V0aWxzL29iamVjdHNcIik7XHJcbnZhciBhcnJheXNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9hcnJheXNcIik7XHJcbnZhciBsb2NhbFN0b3JhZ2VQcm9wZXJ0aWVzID0gbmV3IFdlYWtNYXAoKTtcclxudmFyIHN0b3JhYmxlUHJvcGVydGllcyA9IG5ldyBXZWFrTWFwKCk7XHJcbnZhciB3aWRnZXRJZCA9IGZ1bmN0aW9uICh3aWRnZXQpIHtcclxuICAgIHZhciBpZCA9IHdpZGdldC5pZCB8fCB3aWRnZXQubmFtZSB8fCB3aWRnZXQudGl0bGUgfHwgd2lkZ2V0LmNvbnN0cnVjdG9yLm5hbWU7XHJcbiAgICByZXR1cm4gZnVuY3Rpb25zXzEuaXNGdW5jdGlvbihpZCkgPyBpZCgpIDogaWQ7XHJcbn07XHJcbnZhciBzdG9yZSA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeSh7IHZhbHVlOiB2YWx1ZSB9KSk7XHJcbn07XHJcbnZhciBsb2FkID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgdmFyIGpzb24gPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcclxuICAgIGlmIChqc29uKSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoanNvbikudmFsdWU7XHJcbiAgICB9XHJcbn07XHJcbnZhciBsb2FkQXJyYXkgPSBmdW5jdGlvbiAoa2V5LCBwcm90bykge1xyXG4gICAgdmFyIHByb3BzID0gc3RvcmFibGVQcm9wZXJ0aWVzLmdldChwcm90byk7XHJcbiAgICB2YXIgYXJyID0gbG9hZChrZXkpO1xyXG4gICAgaWYgKCFhcnIgfHwgZnVuY3Rpb25zXzEuaXNVbmRlZihwcm9wcykpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyLm1hcChmdW5jdGlvbiAoaSkge1xyXG4gICAgICAgIHJldHVybiBwcm9wcy5yZWR1Y2UoZnVuY3Rpb24gKHAsIGMpIHtcclxuICAgICAgICAgICAgcFtjXSA9IGlbY107XHJcbiAgICAgICAgICAgIHJldHVybiBwO1xyXG4gICAgICAgIH0sIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkocHJvdG8pKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIHN0b3JlQXJyYXkgPSBmdW5jdGlvbiAoa2V5LCBhcnIsIHByb3RvKSB7XHJcbiAgICB2YXIgcHJvcHMgPSBzdG9yYWJsZVByb3BlcnRpZXMuZ2V0KHByb3RvKTtcclxuICAgIGlmIChmdW5jdGlvbnNfMS5pc1VuZGVmKHByb3BzKSkge1xyXG4gICAgICAgIHRocm93IEVycm9yKCdATG9jYWxTdG9yYWdlIGFycmF5IGl0ZW1zIG11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgQFN0b3JhYmxlKCkgcHJvcGVydHknKTtcclxuICAgIH1cclxuICAgIHZhciB2YWx1ZSA9IGFyci5tYXAoZnVuY3Rpb24gKGkpIHsgcmV0dXJuIG9iamVjdHNfMS5nZXRTdWJzZXQocHJvcHMsIGkpOyB9KTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gc3RvcmUoa2V5LCB2YWx1ZSk7IH0sIDgwKTtcclxufTtcclxudmFyIHN0b3JlTGlzdGVuZXIgPSBmdW5jdGlvbiAoYXJyLCBjYWxsYmFjaykge1xyXG4gICAgdmFyIGxpc3RlbmVyID0ge1xyXG4gICAgICAgIHNvcnQ6IGNhbGxiYWNrLFxyXG4gICAgICAgIHNwbGljZTogZnVuY3Rpb24gKGksIGQsIGEpIHtcclxuICAgICAgICAgICAgaWYgKGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBhLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoaXRlbSksIHByb3BzID0gc3RvcmFibGVQcm9wZXJ0aWVzLmdldChwcm90by5jb25zdHJ1Y3Rvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzXzEuYWRkUHJvcGVydHlMaXN0ZW5lcihpdGVtLCBwcm9wLCBjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYS5sZW5ndGggfHwgZCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgYXJyYXlzXzEub2JzZXJ2ZUFycmF5KGFyciwgbGlzdGVuZXIpO1xyXG4gICAgbGlzdGVuZXIuc3BsaWNlKDAsIDAsIGFycik7XHJcbn07XHJcbnZhciBoYW5kbGVyID0gZnVuY3Rpb24gKGFycmF5VHlwZSkgeyByZXR1cm4gZnVuY3Rpb24gKHdpZGdldCkge1xyXG4gICAgdmFyIHByb3BzID0gbG9jYWxTdG9yYWdlUHJvcGVydGllcy5nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKHdpZGdldCkpO1xyXG4gICAgaWYgKHByb3BzKSB7XHJcbiAgICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbiAocHJvcCkge1xyXG4gICAgICAgICAgICB2YXIgc3RvcmVLZXkgPSB3aWRnZXRJZCh3aWRnZXQpICsgJy4nICsgcHJvcDtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gd2lkZ2V0W3Byb3BdO1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0eXBlXzEgPSBmdW5jdGlvbnNfMS5pc0RlZihhcnJheVR5cGUpID8gYXJyYXlUeXBlKCkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoZnVuY3Rpb25zXzEuaXNVbmRlZih0eXBlXzEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1N0b3JlZCBhcnJheXMgbmVlZCBhbiBhcnJheVR5cGUgYXJndW1lbnQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyeVZhbHVlID0gbG9hZEFycmF5KHN0b3JlS2V5LCB0eXBlXzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmdW5jdGlvbnNfMS5pc0RlZih0cnlWYWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB3aWRnZXRbcHJvcF0gPSB0cnlWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignTG9jYWxTdG9yYWdlIGxvYWRpbmcgZmFpbGVkLi4uaWdub3JpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmb3JtYXQgY2hhbmdlZCBvciBzb21ldGhpbmcgZWxzZSBmYWlsZWRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0b3JlTGlzdGVuZXIodmFsdWUsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9yZUFycmF5KHN0b3JlS2V5LCB2YWx1ZSwgdHlwZV8xKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRyeVZhbHVlID0gbG9hZChzdG9yZUtleSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZnVuY3Rpb25zXzEuaXNEZWYodHJ5VmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2V0W3Byb3BdID0gdHJ5VmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvYmplY3RzXzEuYWRkUHJvcGVydHlMaXN0ZW5lcih3aWRnZXQsIHByb3AsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9yZShzdG9yZUtleSwgd2lkZ2V0W3Byb3BdKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07IH07XHJcbmV4cG9ydHMuTG9jYWxTdG9yYWdlID0gZnVuY3Rpb24gKGFycmF5VHlwZSkgeyByZXR1cm4gZnVuY3Rpb24gKHByb3RvLCBwcm9wZXJ0eSkge1xyXG4gICAgb2JqZWN0c18xLmVuc3VyZShsb2NhbFN0b3JhZ2VQcm9wZXJ0aWVzLCBwcm90bywgW3Byb3BlcnR5XSk7XHJcbiAgICBjb25zdHJ1Y3RfMS5hZGRUb0NvbnN0cnVjdG9yUXVldWUocHJvdG8uY29uc3RydWN0b3IsIGhhbmRsZXIoYXJyYXlUeXBlKSk7XHJcbn07IH07XHJcbmV4cG9ydHMuU3RvcmFibGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBmdW5jdGlvbiAocHJvdG8sIHByb3BlcnR5KSB7XHJcbiAgICBvYmplY3RzXzEuZW5zdXJlKHN0b3JhYmxlUHJvcGVydGllcywgcHJvdG8uY29uc3RydWN0b3IsIFtwcm9wZXJ0eV0pO1xyXG59OyB9O1xyXG4vLyB0b2RvOiB3cml0ZSB0ZXN0IHNvbWVob3dcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bG9jYWwtc3RvcmFnZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG52YXIgY29uc3RydWN0XzEgPSByZXF1aXJlKFwiLi9jb25zdHJ1Y3RcIik7XHJcbnZhciBzdHJpbmdzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvc3RyaW5nc1wiKTtcclxudmFyIGNsZWFudXBfMSA9IHJlcXVpcmUoXCIuLi9jb3JlL2NsZWFudXBcIik7XHJcbmV4cG9ydHMucm91dGVMaXN0ZW5lcnMgPSB7fTtcclxudmFyIG5hbWVkUnggPSAvWzoqXVxcdysvZ2k7XHJcbnZhciBoaXN0b3J5QVBJID0gKHdpbmRvdy5oaXN0b3J5ICYmIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSkgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW3JvdXRpbmc9XCJoYXNoXCJdJykgPT09IG51bGw7XHJcbnZhciBydWxlcyA9IFtcclxuICAgIFsvOlxcdysvZ2ksICcoW1xcXFx3XFxcXGQtXSspJ10sXHJcbiAgICBbL1xcKlxcdysvZ2ksICcoLispJ11cclxuXTtcclxuLy8gc3VwcG9ydHMgOnBhcmFtIGFuZCAqcGFyYW0gYW5kIG9wdGlvbmFsIHBhcnRzICgpXHJcbnZhciBuYW1lZE1hdGNoID0gZnVuY3Rpb24gKHBhdHRlcm4sIGlucHV0KSB7XHJcbiAgICB2YXIgbmFtZXMgPSBwYXR0ZXJuLm1hdGNoKG5hbWVkUngpO1xyXG4gICAgaWYgKG5hbWVzICYmIG5hbWVzLmxlbmd0aCkge1xyXG4gICAgICAgIG5hbWVzID0gbmFtZXMubWFwKGZ1bmN0aW9uIChzdHIpIHsgcmV0dXJuIHN0ci5zdWJzdHIoMSk7IH0pO1xyXG4gICAgICAgIHZhciByZXBsID0gcnVsZXMucmVkdWNlKGZ1bmN0aW9uIChwLCBjKSB7IHJldHVybiBwLnJlcGxhY2UoY1swXSwgY1sxXSk7IH0sIHBhdHRlcm4pLCBmaW5hbFIgPSBuZXcgUmVnRXhwKCdeJyArIHJlcGwgKyAnJCcsICdnaScpO1xyXG4gICAgICAgIHJldHVybiBzdHJpbmdzXzEubmFtZWRSZWdleE1hdGNoKGlucHV0LCBmaW5hbFIsIG5hbWVzKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlmIChuZXcgUmVnRXhwKCdeJyArIHBhdHRlcm4gKyAnJCcsICdnaScpLmV4ZWMoaW5wdXQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbnZhciBnZXRDdXJyZW50Um91dGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgcGF0aCA9IGxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgaWYgKCFoaXN0b3J5QVBJKSB7XHJcbiAgICAgICAgaWYgKHBhdGggIT09ICcvJykge1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5yZXBsYWNlKCcvIycgKyBwYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHBhdGggPSAhbG9jYXRpb24uaGFzaCA/ICcvJyA6IGxvY2F0aW9uLmhhc2gucmVwbGFjZSgvXiMvLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBhdGg7XHJcbn07XHJcbnZhciBub3RpZnlMaXN0ZW5lcnMgPSBmdW5jdGlvbiAocm91dGUpIHtcclxuICAgIE9iamVjdC52YWx1ZXMoZXhwb3J0cy5yb3V0ZUxpc3RlbmVycykuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlcnMpIHtcclxuICAgICAgICByZXR1cm4gaGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAocmgpIHtcclxuICAgICAgICAgICAgdmFyIG1hdGNoZWRQYXJhbXMgPSBuYW1lZE1hdGNoKHJoLnJvdXRlLCByb3V0ZSk7XHJcbiAgICAgICAgICAgIGlmIChtYXRjaGVkUGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICByaC5jYWxsYmFjayhtYXRjaGVkUGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcbmV4cG9ydHMubmF2aWdhdGUgPSBmdW5jdGlvbiAocGF0aCkge1xyXG4gICAgaWYgKGhpc3RvcnlBUEkpIHtcclxuICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAnJywgcGF0aCk7XHJcbiAgICAgICAgbm90aWZ5TGlzdGVuZXJzKGdldEN1cnJlbnRSb3V0ZSgpKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGxvY2F0aW9uLmhhc2ggPSBwYXRoO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLnJ1blJvdXRlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghd2luZG93WydibG9ja1JvdXRpbmcnXSkge1xyXG4gICAgICAgIG5vdGlmeUxpc3RlbmVycyhnZXRDdXJyZW50Um91dGUoKSk7XHJcbiAgICB9XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihoaXN0b3J5QVBJID8gJ3BvcHN0YXRlJyA6ICdoYXNoY2hhbmdlJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gbm90aWZ5TGlzdGVuZXJzKGdldEN1cnJlbnRSb3V0ZSgpKTsgfSwgZmFsc2UpO1xyXG59O1xyXG5leHBvcnRzLlJvdXRlID0gZnVuY3Rpb24gKHJvdXRlKSB7IHJldHVybiBmdW5jdGlvbiAocHJvdG8sIG1ldGhvZCkge1xyXG4gICAgY29uc3RydWN0XzEuYWRkVG9Db25zdHJ1Y3RvclF1ZXVlKHByb3RvLmNvbnN0cnVjdG9yLCBmdW5jdGlvbiAod2lkZ2V0LCBub2RlKSB7XHJcbiAgICAgICAgaWYgKCFleHBvcnRzLnJvdXRlTGlzdGVuZXJzW3JvdXRlXSkge1xyXG4gICAgICAgICAgICBleHBvcnRzLnJvdXRlTGlzdGVuZXJzW3JvdXRlXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaGFuZGxlciA9IHsgcm91dGU6IHJvdXRlLCBjYWxsYmFjazogd2lkZ2V0W21ldGhvZF0uYmluZCh3aWRnZXQpIH07XHJcbiAgICAgICAgZXhwb3J0cy5yb3V0ZUxpc3RlbmVyc1tyb3V0ZV0ucHVzaChoYW5kbGVyKTtcclxuICAgICAgICBjbGVhbnVwXzEucmVnaXN0ZXJDbGVhblVwKG5vZGUsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIGV4cG9ydHMucm91dGVMaXN0ZW5lcnNbcm91dGVdLnNwbGljZShleHBvcnRzLnJvdXRlTGlzdGVuZXJzW3JvdXRlXS5pbmRleE9mKGhhbmRsZXIpLCAxKTsgfSk7XHJcbiAgICB9KTtcclxufTsgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cm91dGVyLmpzLm1hcCIsImltcG9ydCB7Q29uc3RydWN0LCBXaWRnZXR9IGZyb20gJ0BmZWF0aGVyLXRzL2ZlYXRoZXItdHMvZGlzdC9kZWNvcmF0b3JzL2NvbnN0cnVjdCdcbmltcG9ydCB7TGlzdFN0YXRlfSBmcm9tICcuL2NvbmZpZydcbmltcG9ydCB7TG9jYWxTdG9yYWdlfSBmcm9tICdAZmVhdGhlci10cy9mZWF0aGVyLXRzL2Rpc3QvZGVjb3JhdG9ycy9sb2NhbC1zdG9yYWdlJ1xuaW1wb3J0IHtUb2RvfSBmcm9tICcuL3RvZG8nXG5pbXBvcnQge3JlbmRlciwgQmF0Y2h9IGZyb20gJ0BmZWF0aGVyLXRzL2ZlYXRoZXItdHMvZGlzdC9jb3JlL2JpbmQnXG5pbXBvcnQge3JlbW92ZUZyb21BcnJheX0gZnJvbSAnQGZlYXRoZXItdHMvZmVhdGhlci10cy9kaXN0L3V0aWxzL2FycmF5cydcbmltcG9ydCB7Um91dGV9IGZyb20gJ0BmZWF0aGVyLXRzL2ZlYXRoZXItdHMvZGlzdC9kZWNvcmF0b3JzL3JvdXRlcidcbmltcG9ydCB7T259IGZyb20gJ0BmZWF0aGVyLXRzL2ZlYXRoZXItdHMvZGlzdC9kZWNvcmF0b3JzL2V2ZW50J1xuaW1wb3J0IHtUZW1wbGF0ZX0gZnJvbSAnQGZlYXRoZXItdHMvZmVhdGhlci10cy9kaXN0L2RlY29yYXRvcnMvdGVtcGxhdGUnXG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGVQYXJhbSB7XG4gICAgcGF0aDogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgQ2xpY2sgPSAoc2VsZWN0b3I6IHN0cmluZyk6IEZ1bmN0aW9uID0+IE9uKHtzZWxlY3Rvcjogc2VsZWN0b3IsIGV2ZW50OiAnY2xpY2snLCBwcmV2ZW50RGVmYXVsdDogdHJ1ZX0pXG5cbkBDb25zdHJ1Y3Qoe3NlbGVjdG9yOiAnLnRvZG9hcHAnLCBzaW5nbGV0b246IHRydWV9KVxuZXhwb3J0IGNsYXNzIFRvZG9MaXN0IGltcGxlbWVudHMgV2lkZ2V0IHtcblxuICAgIHN0YXRlID0gTGlzdFN0YXRlLkFMTFxuXG4gICAgQExvY2FsU3RvcmFnZSgoKSA9PiBUb2RvKVxuICAgIHRvZG9zOiBUb2RvW10gPSBbXVxuXG4gICAgaW5pdCA9IChlbDogSFRNTEVsZW1lbnQpID0+IHJlbmRlcih0aGlzLCBlbClcblxuICAgIG5ld1RvZG8odG9kbzogVG9kbykge1xuICAgICAgICB0aGlzLnRvZG9zLnB1c2godG9kbylcbiAgICB9XG5cbiAgICBkZWxldGVUb2RvKHRvZG86IFRvZG8pIHtcbiAgICAgICAgcmVtb3ZlRnJvbUFycmF5KHRoaXMudG9kb3MsIFt0b2RvXSlcbiAgICB9XG5cbiAgICBsaXN0RmlsdGVyID0gKCkgPT5cbiAgICAgICAgKHRvZG86IFRvZG8pID0+IHRoaXMuc3RhdGUgPT09IExpc3RTdGF0ZS5BTEwgfHxcbiAgICAgICAgKHRoaXMuc3RhdGUgPT09IExpc3RTdGF0ZS5DT01QTEVURUQgJiYgdG9kby5jb21wbGV0ZWQpIHx8XG4gICAgICAgICh0aGlzLnN0YXRlID09PSBMaXN0U3RhdGUuQUNUSVZFICYmICF0b2RvLmNvbXBsZXRlZClcblxuICAgIEBSb3V0ZSgnLzpwYXRoJylcbiAgICBsb2NhdGlvblBhdGgocGFyYW1zOiBSb3V0ZVBhcmFtKSB7XG4gICAgICAgIGlmIChwYXJhbXMucGF0aCA9PT0gJ2FjdGl2ZScpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBMaXN0U3RhdGUuQUNUSVZFXG4gICAgICAgIH0gZWxzZSBpZiAocGFyYW1zLnBhdGggPT09ICdjb21wbGV0ZWQnKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gTGlzdFN0YXRlLkNPTVBMRVRFRFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQFJvdXRlKCcvJylcbiAgICByb290KCkge1xuICAgICAgICB0aGlzLnN0YXRlID0gTGlzdFN0YXRlLkFMTFxuICAgIH1cblxuICAgIEBDbGljaygnLmNsZWFyLWNvbXBsZXRlZCcpXG4gICAgY2xlYXJDb21wbGV0ZWQoKSB7XG4gICAgICAgIHJlbW92ZUZyb21BcnJheSh0aGlzLnRvZG9zLCB0aGlzLnRvZG9zLmZpbHRlcih0ID0+IHQuY29tcGxldGVkKSlcbiAgICB9XG5cbiAgICBAQ2xpY2soJ2xhYmVsW2Zvcj1cInRvZ2dsZS1hbGxcIl0nKVxuICAgIEBCYXRjaCgpXG4gICAgdG9nZ2xlQWxsKCkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9ICF0aGlzLmFsbENvbXBsZXRlZCgpXG4gICAgICAgIHRoaXMudG9kb3MuZm9yRWFjaCh0ID0+IHQuY29tcGxldGVkID0gc3RhdGUpXG4gICAgfVxuXG4gICAgQFRlbXBsYXRlKClcbiAgICB0b0h0bWwoKSB7XG4gICAgICAgIHJldHVybiBgXG4gICAgICAgIDxoZWFkZXIgY2xhc3M9XCJoZWFkZXJcIi8+XG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwibWFpblwiPlxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInRvZ2dsZS1hbGxcIiB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPVwie3t0b2RvczphbGxDb21wbGV0ZWR9fVwiPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0b2dnbGUtYWxsXCIgaGlkZGVuPVwie3t0b2Rvczppc0VtcHR5fX1cIj5NYXJrIGFsbCBhcyBjb21wbGV0ZTwvbGFiZWw+XG4gICAgICAgICAgPHVsIGNsYXNzPVwidG9kby1saXN0XCIge3t0b2RvczpsaXN0RmlsdGVyfX0vPlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgIDxmb290ZXIgY2xhc3M9XCJmb290ZXJcIiBoaWRkZW49XCJ7e3RvZG9zOmlzRW1wdHl9fVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwidG9kby1jb3VudFwiPjxzdHJvbmc+e3t0b2RvczphY3RpdmV9fTwvc3Ryb25nPiB7e3RvZG9zOnBsdXJhbGl6ZX19IGxlZnQ8L3NwYW4+XG4gICAgICAgICAgPHVsIGNsYXNzPVwiZmlsdGVyc1wiPlxuICAgICAgICAgICAgPGxpPjxhIGNsYXNzPVwie3tzdGF0ZTpzdGF0ZUFsbH19XCIgaHJlZj1cIiMvXCI+QWxsPC9hPjwvbGk+XG4gICAgICAgICAgICA8bGk+PGEgY2xhc3M9XCJ7e3N0YXRlOnN0YXRlQWN0aXZlfX1cIiBocmVmPVwiIy9hY3RpdmVcIj5BY3RpdmU8L2E+PC9saT5cbiAgICAgICAgICAgIDxsaT48YSBjbGFzcz1cInt7c3RhdGU6c3RhdGVDb21wbGV0ZWR9fVwiIGhyZWY9XCIjL2NvbXBsZXRlZFwiPkNvbXBsZXRlZDwvYT48L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNsZWFyLWNvbXBsZXRlZFwiIGhpZGRlbj1cInt7dG9kb3M6bm9Db21wbGV0ZWR9fVwiPkNsZWFyIGNvbXBsZXRlZDwvYnV0dG9uPlxuICAgICAgICA8L2Zvb3Rlcj5gXG4gICAgfVxuXG4gICAgc3RhdGVBbGwgPSAoczogTGlzdFN0YXRlKSA9PiB0aGlzLnNlbGVjdGVkU3RhdGUocywgTGlzdFN0YXRlLkFMTClcbiAgICBzdGF0ZUFjdGl2ZSA9IChzOiBMaXN0U3RhdGUpID0+IHRoaXMuc2VsZWN0ZWRTdGF0ZShzLCBMaXN0U3RhdGUuQUNUSVZFKVxuICAgIHN0YXRlQ29tcGxldGVkID0gKHM6IExpc3RTdGF0ZSkgPT4gdGhpcy5zZWxlY3RlZFN0YXRlKHMsIExpc3RTdGF0ZS5DT01QTEVURUQpXG4gICAgaXNFbXB0eSA9ICgpID0+IHRoaXMudG9kb3MubGVuZ3RoID09PSAwXG4gICAgbm9Db21wbGV0ZWQgPSAoKSA9PiB0aGlzLmNvbXBsZXRlZCgpID09PSAwXG4gICAgcGx1cmFsaXplID0gKCkgPT4gdGhpcy5hY3RpdmUoKSA9PT0gMSA/ICdpdGVtJyA6ICdpdGVtcydcbiAgICBhbGxDb21wbGV0ZWQgPSAoKSA9PiB0aGlzLmNvbXBsZXRlZCgpID09PSB0aGlzLnRvZG9zLmxlbmd0aFxuICAgIGFjdGl2ZSA9ICgpID0+IHRoaXMudG9kb3MubGVuZ3RoIC0gdGhpcy5jb21wbGV0ZWQoKVxuICAgIGNvbXBsZXRlZCA9ICgpID0+IHRoaXMudG9kb3MuZmlsdGVyKGMgPT4gYy5jb21wbGV0ZWQpLmxlbmd0aFxuICAgIHNlbGVjdGVkU3RhdGUgPSAocywgc3RhdGUpID0+IHMgPT09IHN0YXRlID8gJ3NlbGVjdGVkJyA6IHVuZGVmaW5lZFxufVxuIiwiaW1wb3J0IHtBcnJheVdpZGdldH0gZnJvbSAnQGZlYXRoZXItdHMvZmVhdGhlci10cy9kaXN0L2RlY29yYXRvcnMvY29uc3RydWN0J1xuaW1wb3J0IHtUZW1wbGF0ZU5vZGV9IGZyb20gJ0BmZWF0aGVyLXRzL2ZlYXRoZXItdHMvZGlzdC9kZWNvcmF0b3JzL3RlbXBsYXRlLW5vZGUnXG5pbXBvcnQge1N0b3JhYmxlfSBmcm9tICdAZmVhdGhlci10cy9mZWF0aGVyLXRzL2Rpc3QvZGVjb3JhdG9ycy9sb2NhbC1zdG9yYWdlJ1xuaW1wb3J0IHtPbiwgU2NvcGV9IGZyb20gJ0BmZWF0aGVyLXRzL2ZlYXRoZXItdHMvZGlzdC9kZWNvcmF0b3JzL2V2ZW50J1xuaW1wb3J0IHtUZW1wbGF0ZX0gZnJvbSAnQGZlYXRoZXItdHMvZmVhdGhlci10cy9kaXN0L2RlY29yYXRvcnMvdGVtcGxhdGUnXG5pbXBvcnQge0luamVjdH0gZnJvbSAnQGZlYXRoZXItdHMvZmVhdGhlci10cy9kaXN0L2RlY29yYXRvcnMvaW5qZWN0J1xuaW1wb3J0IHtDbGljaywgVG9kb0xpc3R9IGZyb20gJy4vdG9kby1saXN0J1xuaW1wb3J0IHtFTlRFUiwgRVNDfSBmcm9tICcuL2NvbmZpZydcblxuZXhwb3J0IGNsYXNzIFRvZG8gaW1wbGVtZW50cyBBcnJheVdpZGdldCB7XG5cbiAgICBAU3RvcmFibGUoKSBjb21wbGV0ZWQ6IGJvb2xlYW5cbiAgICBAU3RvcmFibGUoKSBuYW1lOiBzdHJpbmdcbiAgICBASW5qZWN0KCkgdG9kb0xpc3Q6IFRvZG9MaXN0XG4gICAgQFRlbXBsYXRlTm9kZSgnLmVkaXQnKSBlZGl0OiBIVE1MSW5wdXRFbGVtZW50XG5cbiAgICBlZGl0aW5nID0gZmFsc2VcblxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgY29tcGxldGVkOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBjb21wbGV0ZWRcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZVxuICAgIH1cblxuICAgIEBPbih7ZXZlbnQ6ICdjbGljaycsIHNlbGVjdG9yOiAnLnRvZ2dsZSd9KVxuICAgIGNvbXBsZXRlKGV2KSB7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gZXYudGFyZ2V0LmNoZWNrZWRcbiAgICB9XG5cbiAgICBAQ2xpY2soJy5kZXN0cm95JylcbiAgICBkZWxldGVTZWxmKCkge1xuICAgICAgICB0aGlzLnRvZG9MaXN0LmRlbGV0ZVRvZG8odGhpcylcbiAgICB9XG5cbiAgICBAT24oe2V2ZW50OiAnZGJsY2xpY2snLCBzZWxlY3RvcjogJ2xhYmVsJ30pXG4gICAgc3RhcnRFZGl0aW5nKGV2LCBsYWJlbDogRWxlbWVudCkge1xuICAgICAgICB0aGlzLmVkaXQudmFsdWUgPSB0aGlzLm5hbWVcbiAgICAgICAgdGhpcy5lZGl0aW5nID0gdHJ1ZVxuICAgICAgICB0aGlzLmVkaXQuZm9jdXMoKVxuICAgIH1cblxuICAgIEBPbih7ZXZlbnQ6ICdrZXl1cCcsIHNlbGVjdG9yOiAnLmVkaXQnfSlcbiAgICBlbmRFZGl0aW5nKGV2OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmIChldi5rZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgICAgICAgdGhpcy5uYW1lID0gdGhpcy5lZGl0LnZhbHVlLnRyaW0oKVxuICAgICAgICAgICAgaWYgKCF0aGlzLm5hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvZG9MaXN0LmRlbGV0ZVRvZG8odGhpcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3RvcEVkaXRpbmcoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQE9uKHtldmVudDogJ2tleXVwJywgc2NvcGU6IFNjb3BlLkRpcmVjdH0pXG4gICAgY2FuY2VsRWRpdGluZyhldjogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoZXYua2V5Q29kZSA9PT0gRVNDKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BFZGl0aW5nKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBPbih7ZXZlbnQ6IFsnYmx1cicsJ2ZvY3Vzb3V0J10sIHNlbGVjdG9yOiAnaW5wdXQuZWRpdCcsIHNjb3BlOiBTY29wZS5EaXJlY3R9KVxuICAgIHN0b3BFZGl0aW5nKCkge1xuICAgICAgICB0aGlzLmVkaXRpbmcgPSBmYWxzZVxuICAgIH1cblxuICAgIEBUZW1wbGF0ZSgpXG4gICAgdG9IdG1sKCkge1xuICAgICAgICByZXR1cm4gYFxuICAgICAgICA8bGkgY2xhc3M9XCJ7e2NvbXBsZXRlZDpjb21wbGV0ZWRDbGFzc319IHt7ZWRpdGluZzplZGl0aW5nQ2xhc3N9fVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWV3XCI+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJ0b2dnbGVcIiB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPVwie3tjb21wbGV0ZWR9fVwiPlxuICAgICAgICAgICAgPGxhYmVsPnt7bmFtZX19PC9sYWJlbD5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJkZXN0cm95XCI+PC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiZWRpdFwiIHBsYWNlaG9sZGVyPVwiQ3JlYXRlIGEgVG9kb01WQyB0ZW1wbGF0ZVwiIHZhbHVlPVwie3tuYW1lfX1cIj5cbiAgICAgICAgPC9saT5gXG4gICAgfVxuXG4gICAgY29tcGxldGVkQ2xhc3MgPSAoY29tcGxldGVkOiBib29sZWFuKSA9PiBjb21wbGV0ZWQgPyAnY29tcGxldGVkJyA6IHVuZGVmaW5lZFxuICAgIGVkaXRpbmdDbGFzcyA9IChlZGl0aW5nOiBib29sZWFuKSA9PiBlZGl0aW5nID8gJ2VkaXRpbmcnIDogdW5kZWZpbmVkXG59XG4iLCJpbXBvcnQge0NvbnN0cnVjdCwgV2lkZ2V0fSBmcm9tICdAZmVhdGhlci10cy9mZWF0aGVyLXRzL2Rpc3QvZGVjb3JhdG9ycy9jb25zdHJ1Y3QnXG5pbXBvcnQge0luamVjdH0gZnJvbSAnQGZlYXRoZXItdHMvZmVhdGhlci10cy9kaXN0L2RlY29yYXRvcnMvaW5qZWN0J1xuaW1wb3J0IHtyZW5kZXJ9IGZyb20gJ0BmZWF0aGVyLXRzL2ZlYXRoZXItdHMvZGlzdC9jb3JlL2JpbmQnXG5pbXBvcnQge1RlbXBsYXRlfSBmcm9tICdAZmVhdGhlci10cy9mZWF0aGVyLXRzL2Rpc3QvZGVjb3JhdG9ycy90ZW1wbGF0ZSdcbmltcG9ydCB7T24sIFNjb3BlfSBmcm9tICdAZmVhdGhlci10cy9mZWF0aGVyLXRzL2Rpc3QvZGVjb3JhdG9ycy9ldmVudCdcbmltcG9ydCB7VG9kb0xpc3R9IGZyb20gJy4vdG9kby1saXN0J1xuaW1wb3J0IHtFTlRFUn0gZnJvbSAnLi9jb25maWcnXG5pbXBvcnQge1RvZG99IGZyb20gJy4vdG9kbydcbmltcG9ydCB7VGVtcGxhdGVOb2RlfSBmcm9tICdAZmVhdGhlci10cy9mZWF0aGVyLXRzL2Rpc3QvZGVjb3JhdG9ycy90ZW1wbGF0ZS1ub2RlJ1xuXG5AQ29uc3RydWN0KHtzZWxlY3RvcjogJy5oZWFkZXInfSlcbmNsYXNzIEhlYWRlciBpbXBsZW1lbnRzIFdpZGdldCB7XG5cbiAgICBASW5qZWN0KCkgdG9kb0xpc3Q6IFRvZG9MaXN0XG4gICAgQFRlbXBsYXRlTm9kZSgnaW5wdXQnKSBlZGl0OiBIVE1MSW5wdXRFbGVtZW50XG5cbiAgICBpbml0KGVsZW1lbnQ6IEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgcmVuZGVyKHRoaXMsIGVsZW1lbnQpXG4gICAgfVxuXG4gICAgQE9uKHtldmVudDogJ2tleXByZXNzJywgc2VsZWN0b3I6ICdpbnB1dCcsIHNjb3BlOiBTY29wZS5EaXJlY3R9KVxuICAgIGNyZWF0ZVRvZG8oZXY6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgZSA9IHRoaXMuZWRpdFxuICAgICAgICBpZiAoZXYua2V5Q29kZSA9PT0gRU5URVIgJiYgISFlLnZhbHVlLnRyaW0oKSkge1xuICAgICAgICAgICAgdGhpcy50b2RvTGlzdC5uZXdUb2RvKG5ldyBUb2RvKGUudmFsdWUpKVxuICAgICAgICAgICAgZS52YWx1ZSA9ICcnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAVGVtcGxhdGUoKVxuICAgIHRvSHRtbCgpIHtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxoMT50b2RvczwvaDE+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJuZXctdG9kb1wiIGlkPVwibmV3LXRvZG9cIiBwbGFjZWhvbGRlcj1cIldoYXQgbmVlZHMgdG8gYmUgZG9uZT9cIiBhdXRvZm9jdXM+XG4gICAgICAgIGBcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbnZhciBfX2Fzc2lnbiA9ICh0aGlzICYmIHRoaXMuX19hc3NpZ24pIHx8IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpXHJcbiAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIG9iamVjdHNfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9vYmplY3RzXCIpO1xyXG52YXIgY29uc3RydWN0XzEgPSByZXF1aXJlKFwiLi9jb25zdHJ1Y3RcIik7XHJcbnZhciBzdHJpbmdzXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvc3RyaW5nc1wiKTtcclxudmFyIGZ1bmN0aW9uc18xID0gcmVxdWlyZShcIi4uL3V0aWxzL2Z1bmN0aW9uc1wiKTtcclxudmFyIGZldGNoRXJyb3JzID0gbmV3IFdlYWtNYXAoKTtcclxudmFyIGRlZmF1bHRQcm9jZXNzb3IgPSBmdW5jdGlvbiAocmVzKSB7IHJldHVybiByZXMuanNvbigpOyB9O1xyXG52YXIgaGFuZGxlRXJyb3JzID0gZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFJlc3BvbnNlRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCwgcmVzcG9uc2UpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xyXG59O1xyXG52YXIgUmVzcG9uc2VFcnJvciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcclxuICAgIF9fZXh0ZW5kcyhSZXNwb25zZUVycm9yLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gUmVzcG9uc2VFcnJvcihtZXNzYWdlLCByZXNwb25zZSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG1lc3NhZ2UpIHx8IHRoaXM7XHJcbiAgICAgICAgX3RoaXMucmVzcG9uc2UgPSByZXNwb25zZTtcclxuICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUmVzcG9uc2VFcnJvcjtcclxufShFcnJvcikpO1xyXG52YXIgZXhlY0ZldGNoID0gZnVuY3Rpb24gKHVybCwgY29uZiwgcHJvY2Vzc29yKSB7XHJcbiAgICBpZiAocHJvY2Vzc29yID09PSB2b2lkIDApIHsgcHJvY2Vzc29yID0gZGVmYXVsdFByb2Nlc3NvcjsgfVxyXG4gICAgcmV0dXJuIGZldGNoKHVybCwgY29uZilcclxuICAgICAgICAudGhlbihoYW5kbGVFcnJvcnMpXHJcbiAgICAgICAgLnRoZW4ocHJvY2Vzc29yKTtcclxufTtcclxudmFyIFhociA9IGZ1bmN0aW9uIChmZXRjaE1ldGhvZCkgeyByZXR1cm4gZnVuY3Rpb24gKGNvbmYpIHsgcmV0dXJuIGZ1bmN0aW9uIChwcm90bywgbWV0aG9kKSB7XHJcbiAgICBjb25zdHJ1Y3RfMS5hZGRUb0NvbnN0cnVjdG9yUXVldWUocHJvdG8uY29uc3RydWN0b3IsIGZ1bmN0aW9uICh3aWRnZXQpIHtcclxuICAgICAgICB2YXIgb2xkTWV0aG9kID0gcHJvdG9bbWV0aG9kXTtcclxuICAgICAgICB3aWRnZXRbbWV0aG9kXSA9IGZ1bmN0aW9uIChib2R5KSB7XHJcbiAgICAgICAgICAgIHZhciBwYXlsb2FkID0gW2JvZHldXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uc18xLmlzRGVmKVxyXG4gICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoYm9keSkgeyByZXR1cm4gdHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnID8gYm9keSA6IEpTT04uc3RyaW5naWZ5KGJvZHkpOyB9KTtcclxuICAgICAgICAgICAgdmFyIGZpbmFsQ29uZiA9IE9iamVjdFxyXG4gICAgICAgICAgICAgICAgLmtleXMoY29uZilcclxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoZnVuY3Rpb24gKHAsIGMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAocFtjXSA9IGZ1bmN0aW9uc18xLmlzRnVuY3Rpb24ocFtjXSkgPyBwW2NdLmNhbGwod2lkZ2V0KSA6IHBbY10pICYmIHA7XHJcbiAgICAgICAgICAgIH0sIF9fYXNzaWduKHt9LCBjb25mLCB7IHVybDogc3RyaW5nc18xLmZvcm1hdChjb25mLnVybCwgd2lkZ2V0KSwgYm9keTogcGF5bG9hZFswXSwgbWV0aG9kOiBmZXRjaE1ldGhvZCB9KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBleGVjRmV0Y2goZmluYWxDb25mLnVybCwgZmluYWxDb25mLCBmaW5hbENvbmYucHJvY2Vzc29yKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgb2xkTWV0aG9kLmFwcGx5KHdpZGdldCwgcGF5bG9hZC5jb25jYXQoW3Jlc10pKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgIH0pIC8vIGlmIGF3YWl0IHNob3VsZCBub3QgYmUgdXNlZFxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZldGNoRXJyb3JzLmhhcyhwcm90bykpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXJyRnVuYyA9IGZldGNoRXJyb3JzLmdldChwcm90bylbXCJcIiArIGVycm9yLnJlc3BvbnNlLnN0YXR1c107XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVyckZ1bmMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkZ2V0W2VyckZ1bmNdLmNhbGwod2lkZ2V0LCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbn07IH07IH07XHJcbmV4cG9ydHMuR2V0ID0gWGhyKCdHRVQnKTtcclxuZXhwb3J0cy5Qb3N0ID0gWGhyKCdQT1NUJyk7XHJcbmV4cG9ydHMuRGVsZXRlID0gWGhyKCdERUxFVEUnKTtcclxuZXhwb3J0cy5QdXQgPSBYaHIoJ1BVVCcpO1xyXG5leHBvcnRzLkZldGNoRXJyb3IgPSBmdW5jdGlvbiAoc3RhdHVzKSB7IHJldHVybiBmdW5jdGlvbiAocHJvdG8sIG1ldGhvZCkge1xyXG4gICAgb2JqZWN0c18xLmVuc3VyZShmZXRjaEVycm9ycywgcHJvdG8sIChfYSA9IHt9LCBfYVtcIlwiICsgc3RhdHVzXSA9IG1ldGhvZCwgX2EpKTtcclxuICAgIHZhciBfYTtcclxufTsgfTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmV0Y2guanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGNvbnN0cnVjdF8xID0gcmVxdWlyZShcIi4vY29uc3RydWN0XCIpO1xyXG52YXIgY2xlYW51cF8xID0gcmVxdWlyZShcIi4uL2NvcmUvY2xlYW51cFwiKTtcclxuZXhwb3J0cy5NZWRpYVF1ZXJ5ID0gZnVuY3Rpb24gKHF1ZXJ5KSB7IHJldHVybiBmdW5jdGlvbiAocHJvdG8sIG1ldGhvZCkge1xyXG4gICAgY29uc3RydWN0XzEuYWRkVG9Db25zdHJ1Y3RvclF1ZXVlKHByb3RvLmNvbnN0cnVjdG9yLCBmdW5jdGlvbiAod2lkZ2V0LCBub2RlKSB7XHJcbiAgICAgICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbiAobXEpIHtcclxuICAgICAgICAgICAgaWYgKG1xLm1hdGNoZXMpIHtcclxuICAgICAgICAgICAgICAgIHByb3RvW21ldGhvZF0uY2FsbCh3aWRnZXQsIG5vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVyO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIG1lZGlhUXVlcnlMaXN0ID0gd2luZG93Lm1hdGNoTWVkaWEocXVlcnkpO1xyXG4gICAgICAgIG1lZGlhUXVlcnlMaXN0LmFkZExpc3RlbmVyKGhhbmRsZXIobWVkaWFRdWVyeUxpc3QpKTtcclxuICAgICAgICBjbGVhbnVwXzEucmVnaXN0ZXJDbGVhblVwKG5vZGUsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lZGlhUXVlcnlMaXN0LnJlbW92ZUxpc3RlbmVyKGhhbmRsZXIpOyB9KTtcclxuICAgIH0pO1xyXG59OyB9O1xyXG4vLyB0b2RvOiB3cml0ZSB0ZXN0IHNvbWVob3dcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWVkaWEtcXVlcnkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxucmVxdWlyZShcIi4vdXRpbHMvZnVuY3Rpb25zXCIpO1xyXG5yZXF1aXJlKFwiLi91dGlscy9hcnJheXNcIik7XHJcbnJlcXVpcmUoXCIuL3V0aWxzL29iamVjdHNcIik7XHJcbnJlcXVpcmUoXCIuL3V0aWxzL2RvbVwiKTtcclxucmVxdWlyZShcIi4vZGVjb3JhdG9ycy9jb21wdXRlZFwiKTtcclxucmVxdWlyZShcIi4vZGVjb3JhdG9ycy9jb25zdHJ1Y3RcIik7XHJcbnJlcXVpcmUoXCIuL2RlY29yYXRvcnMvZXZlbnRcIik7XHJcbnJlcXVpcmUoXCIuL2RlY29yYXRvcnMvZmV0Y2hcIik7XHJcbnJlcXVpcmUoXCIuL2RlY29yYXRvcnMvbG9jYWwtc3RvcmFnZVwiKTtcclxucmVxdWlyZShcIi4vZGVjb3JhdG9ycy9tZWRpYS1xdWVyeVwiKTtcclxucmVxdWlyZShcIi4vZGVjb3JhdG9ycy9yb3V0ZXJcIik7XHJcbnJlcXVpcmUoXCIuL2RlY29yYXRvcnMvdGVtcGxhdGVcIik7XHJcbnJlcXVpcmUoXCIuL2RlY29yYXRvcnMvdHJhbnNmb3JtZXJcIik7XHJcbnJlcXVpcmUoXCIuL2RlY29yYXRvcnMvaW5qZWN0XCIpO1xyXG5yZXF1aXJlKFwiLi9kZWNvcmF0b3JzL3RlbXBsYXRlLW5vZGVcIik7XHJcbnJlcXVpcmUoXCIuL2NvcmUvYmluZFwiKTtcclxucmVxdWlyZShcIi4vY29yZS9jbGVhbnVwXCIpO1xyXG52YXIgZnVuY3Rpb25zXzEgPSByZXF1aXJlKFwiLi91dGlscy9mdW5jdGlvbnNcIik7XHJcbmV4cG9ydHMuaXNEZWYgPSBmdW5jdGlvbnNfMS5pc0RlZjtcclxuZXhwb3J0cy5pc1VuZGVmID0gZnVuY3Rpb25zXzEuaXNVbmRlZjtcclxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gZnVuY3Rpb25zXzEuaXNGdW5jdGlvbjtcclxuZXhwb3J0cy5jb21wb3NlID0gZnVuY3Rpb25zXzEuY29tcG9zZTtcclxudmFyIGFycmF5c18xID0gcmVxdWlyZShcIi4vdXRpbHMvYXJyYXlzXCIpO1xyXG5leHBvcnRzLm9ic2VydmVBcnJheSA9IGFycmF5c18xLm9ic2VydmVBcnJheTtcclxuZXhwb3J0cy5yYW5nZSA9IGFycmF5c18xLnJhbmdlO1xyXG5leHBvcnRzLnJlbW92ZUZyb21BcnJheSA9IGFycmF5c18xLnJlbW92ZUZyb21BcnJheTtcclxudmFyIG9iamVjdHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL29iamVjdHNcIik7XHJcbmV4cG9ydHMuZW5zdXJlID0gb2JqZWN0c18xLmVuc3VyZTtcclxuZXhwb3J0cy5hZGRQcm9wZXJ0eUxpc3RlbmVyID0gb2JqZWN0c18xLmFkZFByb3BlcnR5TGlzdGVuZXI7XHJcbmV4cG9ydHMuZGVlcFZhbHVlID0gb2JqZWN0c18xLmRlZXBWYWx1ZTtcclxuZXhwb3J0cy5nZXRTdWJzZXQgPSBvYmplY3RzXzEuZ2V0U3Vic2V0O1xyXG5leHBvcnRzLmlzT2JqZWN0ID0gb2JqZWN0c18xLmlzT2JqZWN0O1xyXG5leHBvcnRzLm1lcmdlID0gb2JqZWN0c18xLm1lcmdlO1xyXG52YXIgZG9tXzEgPSByZXF1aXJlKFwiLi91dGlscy9kb21cIik7XHJcbmV4cG9ydHMuYWxsQ2hpbGROb2RlcyA9IGRvbV8xLmFsbENoaWxkTm9kZXM7XHJcbmV4cG9ydHMuYWxsVGV4dE5vZGVzID0gZG9tXzEuYWxsVGV4dE5vZGVzO1xyXG52YXIgY29tcHV0ZWRfMSA9IHJlcXVpcmUoXCIuL2RlY29yYXRvcnMvY29tcHV0ZWRcIik7XHJcbmV4cG9ydHMuQ29tcHV0ZWQgPSBjb21wdXRlZF8xLkNvbXB1dGVkO1xyXG52YXIgY29uc3RydWN0XzEgPSByZXF1aXJlKFwiLi9kZWNvcmF0b3JzL2NvbnN0cnVjdFwiKTtcclxuZXhwb3J0cy5zdGFydCA9IGNvbnN0cnVjdF8xLnN0YXJ0O1xyXG5leHBvcnRzLmFkZFRvQ29uc3RydWN0b3JRdWV1ZSA9IGNvbnN0cnVjdF8xLmFkZFRvQ29uc3RydWN0b3JRdWV1ZTtcclxuZXhwb3J0cy5Db25zdHJ1Y3QgPSBjb25zdHJ1Y3RfMS5Db25zdHJ1Y3Q7XHJcbnZhciBldmVudF8xID0gcmVxdWlyZShcIi4vZGVjb3JhdG9ycy9ldmVudFwiKTtcclxuZXhwb3J0cy5PbiA9IGV2ZW50XzEuT247XHJcbmV4cG9ydHMuU2NvcGUgPSBldmVudF8xLlNjb3BlO1xyXG52YXIgZmV0Y2hfMSA9IHJlcXVpcmUoXCIuL2RlY29yYXRvcnMvZmV0Y2hcIik7XHJcbmV4cG9ydHMuRGVsZXRlID0gZmV0Y2hfMS5EZWxldGU7XHJcbmV4cG9ydHMuR2V0ID0gZmV0Y2hfMS5HZXQ7XHJcbmV4cG9ydHMuUG9zdCA9IGZldGNoXzEuUG9zdDtcclxuZXhwb3J0cy5QdXQgPSBmZXRjaF8xLlB1dDtcclxudmFyIGxvY2FsX3N0b3JhZ2VfMSA9IHJlcXVpcmUoXCIuL2RlY29yYXRvcnMvbG9jYWwtc3RvcmFnZVwiKTtcclxuZXhwb3J0cy5TdG9yYWJsZSA9IGxvY2FsX3N0b3JhZ2VfMS5TdG9yYWJsZTtcclxuZXhwb3J0cy5Mb2NhbFN0b3JhZ2UgPSBsb2NhbF9zdG9yYWdlXzEuTG9jYWxTdG9yYWdlO1xyXG52YXIgbWVkaWFfcXVlcnlfMSA9IHJlcXVpcmUoXCIuL2RlY29yYXRvcnMvbWVkaWEtcXVlcnlcIik7XHJcbmV4cG9ydHMuTWVkaWFRdWVyeSA9IG1lZGlhX3F1ZXJ5XzEuTWVkaWFRdWVyeTtcclxudmFyIHJvdXRlcl8xID0gcmVxdWlyZShcIi4vZGVjb3JhdG9ycy9yb3V0ZXJcIik7XHJcbmV4cG9ydHMubmF2aWdhdGUgPSByb3V0ZXJfMS5uYXZpZ2F0ZTtcclxuZXhwb3J0cy5ydW5Sb3V0ZXMgPSByb3V0ZXJfMS5ydW5Sb3V0ZXM7XHJcbnZhciB0cmFuc2Zvcm1lcl8xID0gcmVxdWlyZShcIi4vZGVjb3JhdG9ycy90cmFuc2Zvcm1lclwiKTtcclxuZXhwb3J0cy5UcmFuc2Zvcm1lciA9IHRyYW5zZm9ybWVyXzEuVHJhbnNmb3JtZXI7XHJcbnZhciBpbmplY3RfMSA9IHJlcXVpcmUoXCIuL2RlY29yYXRvcnMvaW5qZWN0XCIpO1xyXG5leHBvcnRzLkluamVjdCA9IGluamVjdF8xLkluamVjdDtcclxudmFyIHRlbXBsYXRlXzEgPSByZXF1aXJlKFwiLi9kZWNvcmF0b3JzL3RlbXBsYXRlXCIpO1xyXG5leHBvcnRzLlRlbXBsYXRlID0gdGVtcGxhdGVfMS5UZW1wbGF0ZTtcclxudmFyIHRlbXBsYXRlX25vZGVfMSA9IHJlcXVpcmUoXCIuL2RlY29yYXRvcnMvdGVtcGxhdGUtbm9kZVwiKTtcclxuZXhwb3J0cy5UZW1wbGF0ZU5vZGUgPSB0ZW1wbGF0ZV9ub2RlXzEuVGVtcGxhdGVOb2RlO1xyXG52YXIgYmluZF8xID0gcmVxdWlyZShcIi4vY29yZS9iaW5kXCIpO1xyXG5leHBvcnRzLmZpbmRXaWRnZXQgPSBiaW5kXzEuZmluZFdpZGdldDtcclxuZXhwb3J0cy5maW5kV2lkZ2V0cyA9IGJpbmRfMS5maW5kV2lkZ2V0cztcclxuZXhwb3J0cy5yZW5kZXIgPSBiaW5kXzEucmVuZGVyO1xyXG5leHBvcnRzLkJhdGNoID0gYmluZF8xLkJhdGNoO1xyXG52YXIgY2xlYW51cF8xID0gcmVxdWlyZShcIi4vY29yZS9jbGVhbnVwXCIpO1xyXG5leHBvcnRzLnJlZ2lzdGVyQ2xlYW5VcCA9IGNsZWFudXBfMS5yZWdpc3RlckNsZWFuVXA7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZlYXRoZXIuanMubWFwIiwiaW1wb3J0IHtzdGFydH0gZnJvbSAnQGZlYXRoZXItdHMvZmVhdGhlci10cy9kaXN0L2RlY29yYXRvcnMvY29uc3RydWN0J1xuaW1wb3J0ICcuLi9jc3MvYXBwLmNzcydcblxuaW1wb3J0ICcuL2NvbmZpZydcbmltcG9ydCAnLi9oZWFkZXInXG5pbXBvcnQgJy4vdG9kbydcbmltcG9ydCAnLi90b2RvLWxpc3QnXG5pbXBvcnQge3J1blJvdXRlc30gZnJvbSAnQGZlYXRoZXItdHMvZmVhdGhlci10cyc7XG5cbnN0YXJ0KClcbnJ1blJvdXRlcygpXG4iXSwibmFtZXMiOlsidGhpcyIsIm9iamVjdHNfMSIsImRvbV8xIiwic3RyaW5nc18xIiwiY2xlYW51cF8xIiwiY29uc3RydWN0XzEiLCJmdW5jdGlvbnNfMSIsInRlbXBsYXRlXzEiLCJ0cmFuc2Zvcm1lcl8xIiwiYXJyYXlzXzEiLCJjb21wdXRlZF8xIiwiT24iLCJyZW5kZXIiLCJyZW1vdmVGcm9tQXJyYXkiLCJ0c2xpYl8xLl9fZGVjb3JhdGUiLCJMb2NhbFN0b3JhZ2UiLCJSb3V0ZSIsIkJhdGNoIiwiVGVtcGxhdGUiLCJDb25zdHJ1Y3QiLCJTdG9yYWJsZSIsIkluamVjdCIsIlRlbXBsYXRlTm9kZSIsIlNjb3BlIiwicmVxdWlyZSQkMCIsInJlcXVpcmUkJDEiLCJyZXF1aXJlJCQyIiwicmVxdWlyZSQkMyIsInJlcXVpcmUkJDQiLCJyZXF1aXJlJCQ1IiwicmVxdWlyZSQkMTIiLCJyZXF1aXJlJCQxMSIsInRlbXBsYXRlX25vZGVfMSIsInJl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
