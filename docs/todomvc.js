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
//# sourceMappingURL=todomvc.js.map
