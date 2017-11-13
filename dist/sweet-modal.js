/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "C:\\Users\\Kongen\\GitHub\\sweet-modal-vue\\dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(7)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_SweetModal__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_SweetModalTab__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SweetModal", function() { return __WEBPACK_IMPORTED_MODULE_0__components_SweetModal__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SweetModalTab", function() { return __WEBPACK_IMPORTED_MODULE_1__components_SweetModalTab__["a"]; });





/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_SweetModal_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ca4e01a6_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_SweetModal_vue__ = __webpack_require__(9);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(5)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_SweetModal_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ca4e01a6_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_SweetModal_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\SweetModal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ca4e01a6", Component.options)
  } else {
    hotAPI.reload("data-v-ca4e01a6", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("006f5310", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ca4e01a6\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./SweetModal.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ca4e01a6\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./SweetModal.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
exports.push([module.i, "\n@keyframes animateSuccessTip {\n0% {\n    width: 0;\n    left: 1px;\n    top: 19px;\n}\n54% {\n    width: 0;\n    left: 1px;\n    top: 19px;\n}\n70% {\n    width: 50px;\n    left: -8px;\n    top: 37px;\n}\n84% {\n    width: 17px;\n    left: 21px;\n    top: 48px;\n}\n100% {\n    width: 25px;\n    left: 14px;\n    top: 45px;\n}\n}\n@keyframes animateSuccessLong {\n0% {\n    width: 0;\n    right: 46px;\n    top: 54px;\n}\n65% {\n    width: 0;\n    right: 46px;\n    top: 54px;\n}\n84% {\n    width: 55px;\n    right: 0px;\n    top: 35px;\n}\n100% {\n    width: 47px;\n    right: 8px;\n    top: 38px;\n}\n}\n@keyframes rotatePlaceholder {\n0% {\n    transform: rotate(-45deg);\n}\n5% {\n    transform: rotate(-45deg);\n}\n12% {\n    transform: rotate(-405deg);\n}\n100% {\n    transform: rotate(-405deg);\n}\n}\n.animateSuccessTip {\n  animation: animateSuccessTip 0.75s;\n}\n.animateSuccessLong {\n  animation: animateSuccessLong 0.75s;\n}\n.sweet-modal-icon.sweet-modal-success.animate::after {\n  animation: rotatePlaceholder 4.25s ease-in;\n}\n\n/* Error Icon */\n@keyframes animateErrorIcon {\n0% {\n    transform: rotateX(100deg);\n    opacity: 0;\n}\n100% {\n    transform: rotateX(0deg);\n    opacity: 1;\n}\n}\n.animateErrorIcon {\n  animation: animateErrorIcon 0.5s;\n}\n@keyframes animateXMark {\n0% {\n    transform: scale(0.4);\n    margin-top: 26px;\n    opacity: 0;\n}\n50% {\n    transform: scale(0.4);\n    margin-top: 26px;\n    opacity: 0;\n}\n80% {\n    transform: scale(1.15);\n    margin-top: -6px;\n}\n100% {\n    transform: scale(1);\n    margin-top: 0;\n    opacity: 1;\n}\n}\n.animateXMark {\n  animation: animateXMark 0.5s;\n}\n@keyframes pulseWarning {\n0% {\n    border-color: #F8D486;\n}\n100% {\n    border-color: #F8BB86;\n}\n}\n.pulseWarning {\n  animation: pulseWarning 0.75s infinite alternate;\n}\n@keyframes pulseWarningIns {\n0% {\n    background-color: #F8D486;\n}\n100% {\n    background-color: #F8BB86;\n}\n}\n.pulseWarningIns {\n  animation: pulseWarningIns 0.75s infinite alternate;\n}\n@keyframes rotate-loading {\n0% {\n    transform: rotate(0deg);\n}\n100% {\n    transform: rotate(360deg);\n}\n}\n.sweet-modal-icon {\n  position: relative;\n  width: 80px;\n  height: 80px;\n  border: 4px solid gray;\n  border-radius: 50%;\n  margin: auto;\n  padding: 0;\n  box-sizing: content-box;\n}\n.sweet-modal-icon.sweet-modal-error {\n    border-color: #F44336;\n}\n.sweet-modal-icon.sweet-modal-error .sweet-modal-x-mark {\n      position: relative;\n      display: block;\n}\n.sweet-modal-icon.sweet-modal-error .sweet-modal-line {\n      display: block;\n      position: absolute;\n      top: 37px;\n      height: 5px;\n      width: 47px;\n      background-color: #F44336;\n      border-radius: 2px;\n}\n.sweet-modal-icon.sweet-modal-error .sweet-modal-line.sweet-modal-left {\n        transform: rotate(45deg);\n        left: 17px;\n}\n.sweet-modal-icon.sweet-modal-error .sweet-modal-line.sweet-modal-right {\n        transform: rotate(-45deg);\n        right: 16px;\n}\n.sweet-modal-icon.sweet-modal-warning {\n    border-color: #FF9800;\n}\n.sweet-modal-icon.sweet-modal-warning .sweet-modal-body {\n      position: absolute;\n      width: 5px;\n      height: 47px;\n      left: 50%;\n      top: 10px;\n      margin-left: -2px;\n      border-radius: 2px;\n      background-color: #FF9800;\n}\n.sweet-modal-icon.sweet-modal-warning .sweet-modal-dot {\n      position: absolute;\n      left: 50%;\n      bottom: 10px;\n      width: 7px;\n      height: 7px;\n      margin-left: -3px;\n      border-radius: 50%;\n      background-color: #FF9800;\n}\n.sweet-modal-icon.sweet-modal-info {\n    border-color: #039BE5;\n}\n.sweet-modal-icon.sweet-modal-info::before {\n      content: '';\n      position: absolute;\n      width: 5px;\n      height: 29px;\n      left: 50%;\n      bottom: 17px;\n      margin-left: -2px;\n      border-radius: 2px;\n      background-color: #039BE5;\n}\n.sweet-modal-icon.sweet-modal-info::after {\n      content: '';\n      position: absolute;\n      width: 7px;\n      height: 7px;\n      top: 19px;\n      margin-left: -3px;\n      border-radius: 50%;\n      background-color: #039BE5;\n}\n.sweet-modal-icon.sweet-modal-success {\n    border-color: #4CAF50;\n}\n.sweet-modal-icon.sweet-modal-success::before, .sweet-modal-icon.sweet-modal-success::after {\n      content: '';\n      position: absolute;\n      border-radius: 40px;\n      width: 60px;\n      height: 120px;\n      background: white;\n      transform: rotate(45deg);\n}\n.sweet-modal-icon.sweet-modal-success::before {\n      border-radius: 120px 0 0 120px;\n      top: -7px;\n      left: -33px;\n      transform: rotate(-45deg);\n      -webkit-transform-origin: 60px 60px;\n      transform-origin: 60px 60px;\n}\n.sweet-modal-icon.sweet-modal-success::after {\n      border-radius: 0 120px 120px 0;\n      top: -11px;\n      left: 30px;\n      transform: rotate(-45deg);\n      -webkit-transform-origin: 0px 60px;\n      transform-origin: 0px 60px;\n}\n.sweet-modal-icon.sweet-modal-success .sweet-modal-placeholder {\n      box-sizing: content-box;\n      position: absolute;\n      left: -4px;\n      top: -4px;\n      z-index: 2;\n      width: 80px;\n      height: 80px;\n      border: 4px solid rgba(76, 175, 80, 0.2);\n      border-radius: 50%;\n}\n.sweet-modal-icon.sweet-modal-success .sweet-modal-fix {\n      position: absolute;\n      left: 28px;\n      top: 8px;\n      z-index: 1;\n      width: 7px;\n      height: 90px;\n      background-color: white;\n      transform: rotate(-45deg);\n}\n.sweet-modal-icon.sweet-modal-success .sweet-modal-line {\n      display: block;\n      position: absolute;\n      z-index: 2;\n      height: 5px;\n      background-color: #4CAF50;\n      border-radius: 2px;\n}\n.sweet-modal-icon.sweet-modal-success .sweet-modal-line.sweet-modal-tip {\n        width: 25px;\n        left: 14px;\n        top: 46px;\n        transform: rotate(45deg);\n}\n.sweet-modal-icon.sweet-modal-success .sweet-modal-line.sweet-modal-long {\n        width: 47px;\n        right: 8px;\n        top: 38px;\n        transform: rotate(-45deg);\n}\n.sweet-modal-icon.sweet-modal-custom {\n    border-radius: 0;\n    border: none;\n    background-size: contain;\n    background-position: center center;\n    background-repeat: no-repeat;\n}\n.sweet-modal.theme-dark .sweet-modal-icon.sweet-modal-success::before, .sweet-modal.theme-dark .sweet-modal-icon.sweet-modal-success::after,\n.sweet-modal.theme-dark .sweet-modal-icon.sweet-modal-success .sweet-modal-fix {\n  background-color: #182028;\n}\n.sweet-modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  z-index: 9001;\n  font-size: 14px;\n  -webkit-font-smoothing: antialiased;\n  background: rgba(255, 255, 255, 0.9);\n  opacity: 0;\n  transition: opacity 0.3s;\n  transform: translate3D(0, 0, 0);\n  -webkit-perspective: 500px;\n}\n.sweet-modal-overlay.theme-dark {\n    background: rgba(24, 32, 40, 0.94);\n}\n.sweet-modal-overlay.is-visible {\n    opacity: 1;\n}\n.sweet-modal {\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  background: #fff;\n  box-shadow: 0px 8px 46px rgba(0, 0, 0, 0.08), 0px 2px 6px rgba(0, 0, 0, 0.03);\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 80%;\n  max-width: 640px;\n  max-height: 100vh;\n  overflow-y: auto;\n  border-radius: 2px;\n  transform: scale(0.9) translate(calc(-50% - 32px), -50%);\n  opacity: 0;\n  transition-property: transform, opacity;\n  transition-duration: 0.3s;\n  transition-delay: 0.05s;\n  transition-timing-function: cubic-bezier(0.52, 0.02, 0.19, 1.02);\n}\n.sweet-modal .sweet-box-actions {\n    position: absolute;\n    top: 12px;\n    right: 12px;\n}\n.sweet-modal .sweet-box-actions .sweet-action-close {\n      display: inline-block;\n      cursor: pointer;\n      color: #222C38;\n      text-align: center;\n      width: 42px;\n      height: 42px;\n      line-height: 42px;\n      border-radius: 50%;\n}\n.sweet-modal .sweet-box-actions .sweet-action-close svg {\n        width: 24px;\n        height: 24px;\n        vertical-align: middle;\n        margin-top: -2px;\n}\n.sweet-modal .sweet-box-actions .sweet-action-close svg path,\n        .sweet-modal .sweet-box-actions .sweet-action-close svg polygon,\n        .sweet-modal .sweet-box-actions .sweet-action-close svg rect,\n        .sweet-modal .sweet-box-actions .sweet-action-close svg circle {\n          fill: currentColor;\n}\n.sweet-modal .sweet-box-actions .sweet-action-close svg {\n          fill: currentColor;\n}\n.sweet-modal .sweet-box-actions .sweet-action-close:hover {\n        background: #039BE5;\n        color: #fff;\n}\n.sweet-modal .sweet-title {\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n    height: 64px;\n    line-height: 64px;\n    border-bottom: 1px solid #eaeaea;\n    padding-left: 32px;\n    padding-right: 64px;\n}\n.sweet-modal .sweet-title > h2 {\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      overflow: hidden;\n      margin: 0;\n      padding: 0;\n      font-weight: 500;\n      font-size: 22px;\n}\n.sweet-modal ul.sweet-modal-tabs {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    display: flex;\n    align-items: center;\n    width: calc(100% + 32px);\n    height: 100%;\n    margin-left: -32px;\n    overflow-x: auto;\n}\n.sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab {\n      display: block;\n      height: 100%;\n}\n.sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a {\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        overflow: hidden;\n        display: flex;\n        align-items: center;\n        padding-left: 20px;\n        padding-right: 20px;\n        color: #222C38;\n        text-decoration: none;\n        text-align: center;\n        height: 100%;\n}\n.sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-title {\n          display: block;\n}\n.sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon {\n          display: block;\n          line-height: 1.0;\n}\n.sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon svg, .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon img {\n            width: 16px;\n            height: 16px;\n}\n.sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon svg path,\n            .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon svg polygon,\n            .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon svg rect,\n            .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon svg circle, .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon img path,\n            .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon img polygon,\n            .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon img rect,\n            .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon img circle {\n              fill: currentColor;\n}\n.sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon svg, .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon img {\n              fill: currentColor;\n}\n.sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon + span.sweet-modal-tab-title {\n          line-height: 1.0;\n          margin-top: 8px;\n}\n.sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab:first-child a {\n        padding-left: 32px;\n}\n.sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab.active a {\n        font-weight: 600;\n        color: #039BE5;\n}\n.sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab.disabled a {\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        user-select: none;\n        cursor: default;\n        pointer-events: none;\n        color: #999;\n}\n.sweet-modal.has-tabs:not(.has-title) .sweet-title {\n    height: 84px;\n    line-height: 84px;\n}\n.sweet-modal.has-tabs.has-title ul.sweet-modal-tabs {\n    width: 100%;\n    height: 48px;\n    margin: 0;\n    border-bottom: 1px solid #eaeaea;\n}\n.sweet-modal.has-tabs.has-title ul.sweet-modal-tabs li.sweet-modal-tab a {\n      margin-top: -4px;\n}\n.sweet-modal.has-tabs.has-title ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon {\n        display: inline-block;\n}\n.sweet-modal.has-tabs.has-title ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon svg, .sweet-modal.has-tabs.has-title ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon img {\n          vertical-align: middle;\n          margin-top: -2px;\n          margin-right: 8px;\n}\n.sweet-modal.has-tabs.has-title ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-title {\n        display: inline-block;\n}\n.sweet-modal .sweet-content {\n    display: flex;\n    align-items: center;\n    padding-left: 32px;\n    padding-right: 32px;\n    padding-top: 24px;\n    padding-bottom: 24px;\n    line-height: 1.5;\n}\n.sweet-modal .sweet-content .sweet-content-content {\n      flex-grow: 1;\n}\n.sweet-modal .sweet-content .sweet-modal-tab:not(.active) {\n      display: none;\n}\n.sweet-modal .sweet-content .sweet-modal-icon {\n      margin-bottom: 36px;\n}\n.sweet-modal .sweet-buttons {\n    text-align: right;\n    padding-left: 20px;\n    padding-right: 20px;\n    padding-top: 12px;\n    padding-bottom: 12px;\n}\n.sweet-modal .sweet-content + .sweet-buttons {\n    border-top: 1px solid #eaeaea;\n}\n.sweet-modal.is-alert .sweet-content {\n    display: block;\n    text-align: center;\n    font-size: 16px;\n    padding-top: 64px;\n    padding-bottom: 64px;\n}\n.sweet-modal.has-tabs.has-icon .sweet-content {\n    padding-top: 32px;\n    padding-bottom: 32px;\n}\n.sweet-modal.has-tabs.has-icon .sweet-content .sweet-content-content {\n      padding-left: 32px;\n}\n.sweet-modal.has-tabs.has-icon .sweet-content .sweet-modal-icon {\n      margin-bottom: 0;\n}\n.sweet-modal:not(.has-content) .sweet-modal-icon {\n    margin-bottom: 0;\n}\n.sweet-modal.theme-dark {\n    background: #182028;\n    color: #fff;\n}\n.sweet-modal.theme-dark .sweet-box-actions .sweet-action-close {\n      color: #fff;\n}\n.sweet-modal.theme-dark .sweet-title {\n      border-bottom-color: #090c0f;\n      box-shadow: 0px 1px 0px #273442;\n}\n.sweet-modal.theme-dark ul.sweet-modal-tabs li a {\n      color: #fff;\n}\n.sweet-modal.theme-dark ul.sweet-modal-tabs li.active a {\n      color: #039BE5;\n}\n.sweet-modal.theme-dark ul.sweet-modal-tabs li.disabled a {\n      color: #3e5368;\n}\n.sweet-modal.theme-dark.has-tabs.has-title ul.sweet-modal-tabs {\n      border-bottom-color: #090c0f;\n      box-shadow: 0px 1px 0px #273442;\n}\n.sweet-modal.theme-dark .sweet-content + .sweet-buttons {\n      border-top-color: #273442;\n      box-shadow: 0px -1px 0px #090c0f;\n}\n.sweet-modal .sweet-buttons,\n  .sweet-modal .sweet-content {\n    opacity: 0;\n    transition-property: transform, opacity;\n    transition-duration: 0.3s;\n    transition-delay: 0.09s;\n    transition-timing-function: cubic-bezier(0.52, 0.02, 0.19, 1.02);\n}\n.sweet-modal .sweet-content {\n    transform: translateY(-8px);\n}\n.sweet-modal .sweet-buttons {\n    transform: translateY(16px);\n}\n.sweet-modal.is-visible {\n    transform: translate(-50%, -50%);\n    opacity: 1;\n}\n.sweet-modal.is-visible .sweet-buttons,\n    .sweet-modal.is-visible .sweet-content {\n      transform: none;\n      opacity: 1;\n}\n.sweet-modal.bounce {\n    animation-name: bounce;\n    animation-duration: 0.3s;\n    animation-iteration-count: 2;\n    animation-direction: alternate;\n}\n@media screen and (min-width: 601px) {\n@keyframes bounce {\n0% {\n        transform: scale(1) translate(-50%, -50%);\n}\n50% {\n        transform: scale(1.02) translate(calc(-50% + 8px), -50%);\n}\n100% {\n        transform: scale(1) translate(-50%, -50%);\n}\n}\n}\n@media screen and (max-width: 600px) {\n.sweet-modal.is-mobile-fullscreen {\n      width: 100%;\n      height: 100vh;\n      left: 0;\n      top: 0;\n      transform: scale(0.9);\n}\n.sweet-modal.is-mobile-fullscreen.is-visible {\n        transform: none;\n}\n.sweet-modal.is-mobile-fullscreen .sweet-buttons {\n      -moz-box-sizing: border-box;\n      box-sizing: border-box;\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      width: 100%;\n}\n}\n", "", {"version":3,"sources":["SweetModal.vue"],"names":[],"mappings":"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","file":"SweetModal.vue","sourcesContent":["@keyframes animateSuccessTip {\n  0% {\n    width: 0;\n    left: 1px;\n    top: 19px; }\n  54% {\n    width: 0;\n    left: 1px;\n    top: 19px; }\n  70% {\n    width: 50px;\n    left: -8px;\n    top: 37px; }\n  84% {\n    width: 17px;\n    left: 21px;\n    top: 48px; }\n  100% {\n    width: 25px;\n    left: 14px;\n    top: 45px; } }\n\n@keyframes animateSuccessLong {\n  0% {\n    width: 0;\n    right: 46px;\n    top: 54px; }\n  65% {\n    width: 0;\n    right: 46px;\n    top: 54px; }\n  84% {\n    width: 55px;\n    right: 0px;\n    top: 35px; }\n  100% {\n    width: 47px;\n    right: 8px;\n    top: 38px; } }\n\n@keyframes rotatePlaceholder {\n  0% {\n    transform: rotate(-45deg); }\n  5% {\n    transform: rotate(-45deg); }\n  12% {\n    transform: rotate(-405deg); }\n  100% {\n    transform: rotate(-405deg); } }\n\n.animateSuccessTip {\n  animation: animateSuccessTip 0.75s; }\n\n.animateSuccessLong {\n  animation: animateSuccessLong 0.75s; }\n\n.sweet-modal-icon.sweet-modal-success.animate::after {\n  animation: rotatePlaceholder 4.25s ease-in; }\n\n/* Error Icon */\n@keyframes animateErrorIcon {\n  0% {\n    transform: rotateX(100deg);\n    opacity: 0; }\n  100% {\n    transform: rotateX(0deg);\n    opacity: 1; } }\n\n.animateErrorIcon {\n  animation: animateErrorIcon 0.5s; }\n\n@keyframes animateXMark {\n  0% {\n    transform: scale(0.4);\n    margin-top: 26px;\n    opacity: 0; }\n  50% {\n    transform: scale(0.4);\n    margin-top: 26px;\n    opacity: 0; }\n  80% {\n    transform: scale(1.15);\n    margin-top: -6px; }\n  100% {\n    transform: scale(1);\n    margin-top: 0;\n    opacity: 1; } }\n\n.animateXMark {\n  animation: animateXMark 0.5s; }\n\n@keyframes pulseWarning {\n  0% {\n    border-color: #F8D486; }\n  100% {\n    border-color: #F8BB86; } }\n\n.pulseWarning {\n  animation: pulseWarning 0.75s infinite alternate; }\n\n@keyframes pulseWarningIns {\n  0% {\n    background-color: #F8D486; }\n  100% {\n    background-color: #F8BB86; } }\n\n.pulseWarningIns {\n  animation: pulseWarningIns 0.75s infinite alternate; }\n\n@keyframes rotate-loading {\n  0% {\n    transform: rotate(0deg); }\n  100% {\n    transform: rotate(360deg); } }\n\n.sweet-modal-icon {\n  position: relative;\n  width: 80px;\n  height: 80px;\n  border: 4px solid gray;\n  border-radius: 50%;\n  margin: auto;\n  padding: 0;\n  box-sizing: content-box; }\n  .sweet-modal-icon.sweet-modal-error {\n    border-color: #F44336; }\n    .sweet-modal-icon.sweet-modal-error .sweet-modal-x-mark {\n      position: relative;\n      display: block; }\n    .sweet-modal-icon.sweet-modal-error .sweet-modal-line {\n      display: block;\n      position: absolute;\n      top: 37px;\n      height: 5px;\n      width: 47px;\n      background-color: #F44336;\n      border-radius: 2px; }\n      .sweet-modal-icon.sweet-modal-error .sweet-modal-line.sweet-modal-left {\n        transform: rotate(45deg);\n        left: 17px; }\n      .sweet-modal-icon.sweet-modal-error .sweet-modal-line.sweet-modal-right {\n        transform: rotate(-45deg);\n        right: 16px; }\n  .sweet-modal-icon.sweet-modal-warning {\n    border-color: #FF9800; }\n    .sweet-modal-icon.sweet-modal-warning .sweet-modal-body {\n      position: absolute;\n      width: 5px;\n      height: 47px;\n      left: 50%;\n      top: 10px;\n      margin-left: -2px;\n      border-radius: 2px;\n      background-color: #FF9800; }\n    .sweet-modal-icon.sweet-modal-warning .sweet-modal-dot {\n      position: absolute;\n      left: 50%;\n      bottom: 10px;\n      width: 7px;\n      height: 7px;\n      margin-left: -3px;\n      border-radius: 50%;\n      background-color: #FF9800; }\n  .sweet-modal-icon.sweet-modal-info {\n    border-color: #039BE5; }\n    .sweet-modal-icon.sweet-modal-info::before {\n      content: '';\n      position: absolute;\n      width: 5px;\n      height: 29px;\n      left: 50%;\n      bottom: 17px;\n      margin-left: -2px;\n      border-radius: 2px;\n      background-color: #039BE5; }\n    .sweet-modal-icon.sweet-modal-info::after {\n      content: '';\n      position: absolute;\n      width: 7px;\n      height: 7px;\n      top: 19px;\n      margin-left: -3px;\n      border-radius: 50%;\n      background-color: #039BE5; }\n  .sweet-modal-icon.sweet-modal-success {\n    border-color: #4CAF50; }\n    .sweet-modal-icon.sweet-modal-success::before, .sweet-modal-icon.sweet-modal-success::after {\n      content: '';\n      position: absolute;\n      border-radius: 40px;\n      width: 60px;\n      height: 120px;\n      background: white;\n      transform: rotate(45deg); }\n    .sweet-modal-icon.sweet-modal-success::before {\n      border-radius: 120px 0 0 120px;\n      top: -7px;\n      left: -33px;\n      transform: rotate(-45deg);\n      -webkit-transform-origin: 60px 60px;\n      transform-origin: 60px 60px; }\n    .sweet-modal-icon.sweet-modal-success::after {\n      border-radius: 0 120px 120px 0;\n      top: -11px;\n      left: 30px;\n      transform: rotate(-45deg);\n      -webkit-transform-origin: 0px 60px;\n      transform-origin: 0px 60px; }\n    .sweet-modal-icon.sweet-modal-success .sweet-modal-placeholder {\n      box-sizing: content-box;\n      position: absolute;\n      left: -4px;\n      top: -4px;\n      z-index: 2;\n      width: 80px;\n      height: 80px;\n      border: 4px solid rgba(76, 175, 80, 0.2);\n      border-radius: 50%; }\n    .sweet-modal-icon.sweet-modal-success .sweet-modal-fix {\n      position: absolute;\n      left: 28px;\n      top: 8px;\n      z-index: 1;\n      width: 7px;\n      height: 90px;\n      background-color: white;\n      transform: rotate(-45deg); }\n    .sweet-modal-icon.sweet-modal-success .sweet-modal-line {\n      display: block;\n      position: absolute;\n      z-index: 2;\n      height: 5px;\n      background-color: #4CAF50;\n      border-radius: 2px; }\n      .sweet-modal-icon.sweet-modal-success .sweet-modal-line.sweet-modal-tip {\n        width: 25px;\n        left: 14px;\n        top: 46px;\n        transform: rotate(45deg); }\n      .sweet-modal-icon.sweet-modal-success .sweet-modal-line.sweet-modal-long {\n        width: 47px;\n        right: 8px;\n        top: 38px;\n        transform: rotate(-45deg); }\n  .sweet-modal-icon.sweet-modal-custom {\n    border-radius: 0;\n    border: none;\n    background-size: contain;\n    background-position: center center;\n    background-repeat: no-repeat; }\n\n.sweet-modal.theme-dark .sweet-modal-icon.sweet-modal-success::before, .sweet-modal.theme-dark .sweet-modal-icon.sweet-modal-success::after,\n.sweet-modal.theme-dark .sweet-modal-icon.sweet-modal-success .sweet-modal-fix {\n  background-color: #182028; }\n\n.sweet-modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  z-index: 9001;\n  font-size: 14px;\n  -webkit-font-smoothing: antialiased;\n  background: rgba(255, 255, 255, 0.9);\n  opacity: 0;\n  transition: opacity 0.3s;\n  transform: translate3D(0, 0, 0);\n  -webkit-perspective: 500px; }\n  .sweet-modal-overlay.theme-dark {\n    background: rgba(24, 32, 40, 0.94); }\n  .sweet-modal-overlay.is-visible {\n    opacity: 1; }\n\n.sweet-modal {\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  background: #fff;\n  box-shadow: 0px 8px 46px rgba(0, 0, 0, 0.08), 0px 2px 6px rgba(0, 0, 0, 0.03);\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 80%;\n  max-width: 640px;\n  max-height: 100vh;\n  overflow-y: auto;\n  border-radius: 2px;\n  transform: scale(0.9) translate(calc(-50% - 32px), -50%);\n  opacity: 0;\n  transition-property: transform, opacity;\n  transition-duration: 0.3s;\n  transition-delay: 0.05s;\n  transition-timing-function: cubic-bezier(0.52, 0.02, 0.19, 1.02); }\n  .sweet-modal .sweet-box-actions {\n    position: absolute;\n    top: 12px;\n    right: 12px; }\n    .sweet-modal .sweet-box-actions .sweet-action-close {\n      display: inline-block;\n      cursor: pointer;\n      color: #222C38;\n      text-align: center;\n      width: 42px;\n      height: 42px;\n      line-height: 42px;\n      border-radius: 50%; }\n      .sweet-modal .sweet-box-actions .sweet-action-close svg {\n        width: 24px;\n        height: 24px;\n        vertical-align: middle;\n        margin-top: -2px; }\n        .sweet-modal .sweet-box-actions .sweet-action-close svg path,\n        .sweet-modal .sweet-box-actions .sweet-action-close svg polygon,\n        .sweet-modal .sweet-box-actions .sweet-action-close svg rect,\n        .sweet-modal .sweet-box-actions .sweet-action-close svg circle {\n          fill: currentColor; }\n        .sweet-modal .sweet-box-actions .sweet-action-close svg {\n          fill: currentColor; }\n      .sweet-modal .sweet-box-actions .sweet-action-close:hover {\n        background: #039BE5;\n        color: #fff; }\n  .sweet-modal .sweet-title {\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow: hidden;\n    height: 64px;\n    line-height: 64px;\n    border-bottom: 1px solid #eaeaea;\n    padding-left: 32px;\n    padding-right: 64px; }\n    .sweet-modal .sweet-title > h2 {\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      overflow: hidden;\n      margin: 0;\n      padding: 0;\n      font-weight: 500;\n      font-size: 22px; }\n  .sweet-modal ul.sweet-modal-tabs {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    display: flex;\n    align-items: center;\n    width: calc(100% + 32px);\n    height: 100%;\n    margin-left: -32px;\n    overflow-x: auto; }\n    .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab {\n      display: block;\n      height: 100%; }\n      .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a {\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        overflow: hidden;\n        display: flex;\n        align-items: center;\n        padding-left: 20px;\n        padding-right: 20px;\n        color: #222C38;\n        text-decoration: none;\n        text-align: center;\n        height: 100%; }\n        .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-title {\n          display: block; }\n        .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon {\n          display: block;\n          line-height: 1.0; }\n          .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon svg, .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon img {\n            width: 16px;\n            height: 16px; }\n            .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon svg path,\n            .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon svg polygon,\n            .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon svg rect,\n            .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon svg circle, .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon img path,\n            .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon img polygon,\n            .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon img rect,\n            .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon img circle {\n              fill: currentColor; }\n            .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon svg, .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon img {\n              fill: currentColor; }\n        .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon + span.sweet-modal-tab-title {\n          line-height: 1.0;\n          margin-top: 8px; }\n      .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab:first-child a {\n        padding-left: 32px; }\n      .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab.active a {\n        font-weight: 600;\n        color: #039BE5; }\n      .sweet-modal ul.sweet-modal-tabs li.sweet-modal-tab.disabled a {\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        user-select: none;\n        cursor: default;\n        pointer-events: none;\n        color: #999; }\n  .sweet-modal.has-tabs:not(.has-title) .sweet-title {\n    height: 84px;\n    line-height: 84px; }\n  .sweet-modal.has-tabs.has-title ul.sweet-modal-tabs {\n    width: 100%;\n    height: 48px;\n    margin: 0;\n    border-bottom: 1px solid #eaeaea; }\n    .sweet-modal.has-tabs.has-title ul.sweet-modal-tabs li.sweet-modal-tab a {\n      margin-top: -4px; }\n      .sweet-modal.has-tabs.has-title ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon {\n        display: inline-block; }\n        .sweet-modal.has-tabs.has-title ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon svg, .sweet-modal.has-tabs.has-title ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-icon img {\n          vertical-align: middle;\n          margin-top: -2px;\n          margin-right: 8px; }\n      .sweet-modal.has-tabs.has-title ul.sweet-modal-tabs li.sweet-modal-tab a span.sweet-modal-tab-title {\n        display: inline-block; }\n  .sweet-modal .sweet-content {\n    display: flex;\n    align-items: center;\n    padding-left: 32px;\n    padding-right: 32px;\n    padding-top: 24px;\n    padding-bottom: 24px;\n    line-height: 1.5; }\n    .sweet-modal .sweet-content .sweet-content-content {\n      flex-grow: 1; }\n    .sweet-modal .sweet-content .sweet-modal-tab:not(.active) {\n      display: none; }\n    .sweet-modal .sweet-content .sweet-modal-icon {\n      margin-bottom: 36px; }\n  .sweet-modal .sweet-buttons {\n    text-align: right;\n    padding-left: 20px;\n    padding-right: 20px;\n    padding-top: 12px;\n    padding-bottom: 12px; }\n  .sweet-modal .sweet-content + .sweet-buttons {\n    border-top: 1px solid #eaeaea; }\n  .sweet-modal.is-alert .sweet-content {\n    display: block;\n    text-align: center;\n    font-size: 16px;\n    padding-top: 64px;\n    padding-bottom: 64px; }\n  .sweet-modal.has-tabs.has-icon .sweet-content {\n    padding-top: 32px;\n    padding-bottom: 32px; }\n    .sweet-modal.has-tabs.has-icon .sweet-content .sweet-content-content {\n      padding-left: 32px; }\n    .sweet-modal.has-tabs.has-icon .sweet-content .sweet-modal-icon {\n      margin-bottom: 0; }\n  .sweet-modal:not(.has-content) .sweet-modal-icon {\n    margin-bottom: 0; }\n  .sweet-modal.theme-dark {\n    background: #182028;\n    color: #fff; }\n    .sweet-modal.theme-dark .sweet-box-actions .sweet-action-close {\n      color: #fff; }\n    .sweet-modal.theme-dark .sweet-title {\n      border-bottom-color: #090c0f;\n      box-shadow: 0px 1px 0px #273442; }\n    .sweet-modal.theme-dark ul.sweet-modal-tabs li a {\n      color: #fff; }\n    .sweet-modal.theme-dark ul.sweet-modal-tabs li.active a {\n      color: #039BE5; }\n    .sweet-modal.theme-dark ul.sweet-modal-tabs li.disabled a {\n      color: #3e5368; }\n    .sweet-modal.theme-dark.has-tabs.has-title ul.sweet-modal-tabs {\n      border-bottom-color: #090c0f;\n      box-shadow: 0px 1px 0px #273442; }\n    .sweet-modal.theme-dark .sweet-content + .sweet-buttons {\n      border-top-color: #273442;\n      box-shadow: 0px -1px 0px #090c0f; }\n  .sweet-modal .sweet-buttons,\n  .sweet-modal .sweet-content {\n    opacity: 0;\n    transition-property: transform, opacity;\n    transition-duration: 0.3s;\n    transition-delay: 0.09s;\n    transition-timing-function: cubic-bezier(0.52, 0.02, 0.19, 1.02); }\n  .sweet-modal .sweet-content {\n    transform: translateY(-8px); }\n  .sweet-modal .sweet-buttons {\n    transform: translateY(16px); }\n  .sweet-modal.is-visible {\n    transform: translate(-50%, -50%);\n    opacity: 1; }\n    .sweet-modal.is-visible .sweet-buttons,\n    .sweet-modal.is-visible .sweet-content {\n      transform: none;\n      opacity: 1; }\n  .sweet-modal.bounce {\n    animation-name: bounce;\n    animation-duration: 0.3s;\n    animation-iteration-count: 2;\n    animation-direction: alternate; }\n  @media screen and (min-width: 601px) {\n    @keyframes bounce {\n      0% {\n        transform: scale(1) translate(-50%, -50%); }\n      50% {\n        transform: scale(1.02) translate(calc(-50% + 8px), -50%); }\n      100% {\n        transform: scale(1) translate(-50%, -50%); } } }\n  @media screen and (max-width: 600px) {\n    .sweet-modal.is-mobile-fullscreen {\n      width: 100%;\n      height: 100vh;\n      left: 0;\n      top: 0;\n      transform: scale(0.9); }\n      .sweet-modal.is-mobile-fullscreen.is-visible {\n        transform: none; }\n    .sweet-modal.is-mobile-fullscreen .sweet-buttons {\n      -moz-box-sizing: border-box;\n      box-sizing: border-box;\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      width: 100%; } }\n"]}]);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'SweetModal',

	props: {
		title: {
			type: String,
			required: false,
			default: ''
		},

		overlayTheme: {
			type: String,
			required: false,
			default: 'light'
		},

		modalTheme: {
			type: String,
			required: false,
			default: 'light'
		},

		blocking: {
			type: Boolean,
			required: false,
			default: false
		},

		pulseOnBlock: {
			type: Boolean,
			required: false,
			default: true
		},

		icon: {
			type: String,
			required: false,
			default: ''
		},

		hideCloseButton: {
			type: Boolean,
			required: false,
			default: false
		},

		enableMobileFullscreen: {
			type: Boolean,
			required: false,
			default: true
		},

		width: {
			type: [Number, String],
			required: false,
			default: null
		}
	},

	mounted() {
		this.tabs = this.$children.filter(c => c.cmpName && c.cmpName == 'tab');

		if (this.has_tabs) {
			this.currentTab = this._changeTab(this.tabs[0]);
		}

		document.addEventListener('keyup', this._onDocumentKeyup);
	},

	beforeDestroy() {
		document.removeEventListener('keyup', this._onDocumentKeyup);
	},

	data() {
		return {
			visible: false,
			is_open: false,
			is_bouncing: false,
			tabs: [],

			backups: {
				body: {
					height: null,
					overflow: null
				}
			}
		};
	},

	computed: {
		has_title() {
			return this.title || this.$slots.title;
		},

		has_tabs() {
			return this.tabs.length > 0;
		},

		has_content() {
			return this.$slots.default;
		},

		current_tab() {
			return this.tabs.filter(t => t.active === true)[0];
		},

		overlay_classes() {
			return ['sweet-modal-overlay', 'theme-' + this.overlayTheme, 'sweet-modal-clickable', {
				'is-visible': this.visible,
				blocking: this.blocking
			}];
		},

		modal_classes() {
			return ['sweet-modal', 'theme-' + this.modalTheme, {
				'has-title': this.has_title,
				'has-tabs': this.has_tabs,
				'has-content': this.has_content,
				'has-icon': this.icon,
				'is-mobile-fullscreen': this.enableMobileFullscreen,
				'is-visible': this.visible,
				'is-alert': this.icon && !this.has_tabs || !this.icon && !this.title && !this.$slots.title,
				bounce: this.is_bouncing
			}];
		},

		modal_style() {
			let width = this.width;
			let maxWidth = null;

			if (width !== null) {
				if (Number(width) == width) {
					width = width + 'px';
				}

				maxWidth = 'none';
			}

			return {
				width,
				maxWidth
			};
		}
	},

	methods: {
		/**
   * Open the dialog
   * Emits an event 'open'
   *
   * @param tabId	string	Optional id or index of initial tab element.
   * @param timeout int	Optional timeout to close modal after a given time (milliseconds).
   */
		open(tabId = null, timeout = 0) {
			if (tabId && this.has_tabs) {
				// Find tab with wanted id.
				let openingTabs = this.tabs.filter(tab => {
					return tab.id === tabId;
				});
				if (openingTabs.length > 0) {
					// Set current tab to first match.
					this.currentTab = this._changeTab(openingTabs[0]);
				} else {
					// Try opening index instead of id as an alternative.
					let openingTab = this.tabs[tabId];
					if (openingTab) {
						this.currentTab = this._changeTab(openingTab);
					}
				}
			}

			this.is_open = true;
			this._lockBody();
			this._animateIcon();

			setTimeout(() => this.visible = true, 30);
			this.$emit('open');

			if (timeout && timeout > 0) {
				setTimeout(() => this.close(), timeout);
			}
		},

		/**
   * Close the dialog
   * Emits an event 'close'
   */
		close() {
			this.visible = false;
			this._unlockBody();

			setTimeout(() => this.is_open = false, 300);
			this.$emit('close');
		},

		/**
   * Bounce the modal.
   */
		bounce() {
			this.is_bouncing = true;

			setTimeout(() => this.is_bouncing = false, 330);
		},

		/**********************
      INTERNAL METHODS
   **********************/

		_lockBody() {
			this.backups.body.height = document.body.style.height;
			this.backups.body.overflow = document.body.style.overflow;

			document.body.style.height = '100%';
			document.body.style.overflow = 'hidden';
		},

		_unlockBody() {
			document.body.style.height = this.backups.body.height;
			document.body.style.overflow = this.backups.body.overflow;
		},

		_onOverlayClick(event) {
			if (!event.target.classList || event.target.classList.contains('sweet-modal-clickable')) {
				if (this.blocking) {
					if (this.pulseOnBlock) this.bounce();
				} else {
					this.close();
				}
			}
		},

		_onDocumentKeyup(event) {
			if (event.keyCode == 27) {
				if (this.blocking) {
					if (this.pulseOnBlock) this.bounce();
				} else {
					this.close();
				}
			}
		},

		_changeTab(tab) {
			this.tabs.map(t => t.active = t == tab);
			this.currentTab = tab;
		},

		_getClassesForTab(tab) {
			return ['sweet-modal-tab', {
				active: tab.active,
				disabled: tab.disabled
			}];
		},

		_animateIcon() {
			if (!this.icon) return;

			switch (this.icon) {
				case 'success':
					setTimeout(() => {
						this._applyClasses(this.$refs.icon_success, {
							'': ['animate'],
							'.sweet-modal-tip': ['animateSuccessTip'],
							'.sweet-modal-long': ['animateSuccessLong']
						});
					}, 80);

					break;

				case 'warning':
					this._applyClasses(this.$refs.icon_warning, {
						'': ['pulseWarning'],
						'.sweet-modal-body': ['pulseWarningIns'],
						'.sweet-modal-dot': ['pulseWarningIns']
					});

					break;

				case 'error':
					setTimeout(() => {
						this._applyClasses(this.$refs.icon_error, {
							'': ['animateErrorIcon'],
							'.sweet-modal-x-mark': ['animateXMark']
						});
					}, 80);

					break;
			}
		},

		/**
   * Apply classes from the classMap to $ref or children of $ref, a native
   * DOMElement.
   *
   * ClassMap:
   * {
   *     'selector': [ 'class1', 'class2', ... ]
   * }
   *
   * Empty Selector selects $ref.
   *
   * @param DOMNode $ref     Element to apply classes to or children of that element
   * @param Object  classMap Class Map which elements get which classes (see doc)
   */
		_applyClasses($ref, classMap) {
			for (let cl in classMap) {
				let classes = classMap[cl];
				let $el;

				if (cl == '') {
					$el = $ref;
				} else {
					$el = $ref.querySelector(cl);
				}

				$el.classList.remove(...classes);
				$el.classList.add(...classes);
			}
		}
	}
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.is_open,
          expression: "is_open"
        }
      ],
      class: _vm.overlay_classes,
      on: { click: _vm._onOverlayClick }
    },
    [
      _c("div", { class: _vm.modal_classes, style: _vm.modal_style }, [
        _c(
          "div",
          { staticClass: "sweet-box-actions" },
          [
            _vm._t("box-action"),
            _vm._v(" "),
            !_vm.hideCloseButton
              ? _c(
                  "div",
                  {
                    staticClass: "sweet-action-close",
                    on: { click: _vm.close }
                  },
                  [
                    _c(
                      "svg",
                      {
                        attrs: {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "24",
                          height: "24",
                          viewBox: "0 0 24 24"
                        }
                      },
                      [
                        _c("path", {
                          attrs: {
                            d:
                              "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
                            fill: "#292c34"
                          }
                        })
                      ]
                    )
                  ]
                )
              : _vm._e()
          ],
          2
        ),
        _vm._v(" "),
        _vm.has_title || _vm.has_tabs
          ? _c(
              "div",
              { staticClass: "sweet-title" },
              [
                _vm.has_tabs && !_vm.has_title
                  ? [
                      _c(
                        "ul",
                        { staticClass: "sweet-modal-tabs" },
                        _vm._l(_vm.tabs, function(tab) {
                          return _c(
                            "li",
                            { class: _vm._getClassesForTab(tab) },
                            [
                              _c(
                                "a",
                                {
                                  attrs: { href: "#" },
                                  on: {
                                    click: function($event) {
                                      $event.preventDefault()
                                      _vm._changeTab(tab)
                                    }
                                  }
                                },
                                [
                                  _c(
                                    "div",
                                    { staticClass: "sweet-modal-valign" },
                                    [
                                      tab.icon
                                        ? _c("span", {
                                            staticClass: "sweet-modal-tab-icon",
                                            domProps: {
                                              innerHTML: _vm._s(tab.icon)
                                            }
                                          })
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        {
                                          staticClass: "sweet-modal-tab-title"
                                        },
                                        [_vm._v(_vm._s(tab.title))]
                                      )
                                    ]
                                  )
                                ]
                              )
                            ]
                          )
                        })
                      )
                    ]
                  : _vm._e(),
                _vm._v(" "),
                _vm.has_title
                  ? [
                      _vm.title
                        ? _c("h2", {
                            domProps: { innerHTML: _vm._s(_vm.title) }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _vm._t("title")
                    ]
                  : _vm._e()
              ],
              2
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.has_title && _vm.has_tabs
          ? _c(
              "ul",
              { staticClass: "sweet-modal-tabs" },
              _vm._l(_vm.tabs, function(tab) {
                return _c("li", { class: _vm._getClassesForTab(tab) }, [
                  _c(
                    "a",
                    {
                      attrs: { href: "#" },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          _vm._changeTab(tab)
                        }
                      }
                    },
                    [
                      _c("div", { staticClass: "sweet-modal-valign" }, [
                        tab.icon
                          ? _c("span", {
                              staticClass: "sweet-modal-tab-icon",
                              domProps: { innerHTML: _vm._s(tab.icon) }
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        _c("span", { staticClass: "sweet-modal-tab-title" }, [
                          _vm._v(_vm._s(tab.title))
                        ])
                      ])
                    ]
                  )
                ])
              })
            )
          : _vm._e(),
        _vm._v(" "),
        _c("div", { ref: "content", staticClass: "sweet-content" }, [
          _vm.icon == "error"
            ? _c(
                "div",
                {
                  ref: "icon_error",
                  staticClass: "sweet-modal-icon sweet-modal-error"
                },
                [_vm._m(0)]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.icon == "warning"
            ? _c(
                "div",
                {
                  ref: "icon_warning",
                  staticClass: "sweet-modal-icon sweet-modal-warning"
                },
                [
                  _c("span", { staticClass: "sweet-modal-body" }),
                  _vm._v(" "),
                  _c("span", { staticClass: "sweet-modal-dot" })
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.icon == "info"
            ? _c("div", {
                ref: "icon_info",
                staticClass: "sweet-modal-icon sweet-modal-info"
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.icon == "success"
            ? _c(
                "div",
                {
                  ref: "icon_success",
                  staticClass: "sweet-modal-icon sweet-modal-success"
                },
                [
                  _c("span", {
                    staticClass: "sweet-modal-line sweet-modal-tip"
                  }),
                  _vm._v(" "),
                  _c("span", {
                    staticClass: "sweet-modal-line sweet-modal-long"
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "sweet-modal-placeholder" }),
                  _vm._v(" "),
                  _c("div", { staticClass: "sweet-modal-fix" })
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.$slots.default
            ? _c(
                "div",
                { staticClass: "sweet-content-content" },
                [_vm._t("default")],
                2
              )
            : _vm._e()
        ]),
        _vm._v(" "),
        _vm.$slots.button
          ? _c("div", { staticClass: "sweet-buttons" }, [_vm._t("button")], 2)
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "sweet-modal-x-mark" }, [
      _c("span", { staticClass: "sweet-modal-line sweet-modal-left" }),
      _vm._v(" "),
      _c("span", { staticClass: "sweet-modal-line sweet-modal-right" })
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ca4e01a6", esExports)
  }
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_SweetModalTab_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7f5b26d8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_SweetModalTab_vue__ = __webpack_require__(14);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(11)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_SweetModalTab_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7f5b26d8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_SweetModalTab_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\SweetModalTab.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7f5b26d8", Component.options)
  } else {
    hotAPI.reload("data-v-7f5b26d8", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("9fb30614", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7f5b26d8\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./SweetModalTab.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-7f5b26d8\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./SweetModalTab.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"SweetModalTab.vue"}]);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		title: {
			type: String,
			required: true
		},

		id: {
			type: String,
			required: true
		},

		icon: {
			type: String,
			required: false,
			default: null
		},

		disabled: {
			type: Boolean,
			required: false,
			default: false
		}
	},

	data() {
		return {
			active: false
		};
	},

	computed: {
		cmpName() {
			return 'tab';
		}
	}
});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { class: ["sweet-modal-tab", { active: _vm.active }] },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7f5b26d8", esExports)
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=sweet-modal.js.map