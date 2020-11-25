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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: C:\\lavori\\BoolBnB\\resources\\js\\app.js: Unexpected token (158:0)\n\n\u001b[0m \u001b[90m 156 | \u001b[39m\u001b[36mvar\u001b[39m letter \u001b[33m=\u001b[39m \u001b[35m/^[a-zA-Z ]+$/\u001b[39m\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 157 | \u001b[39m\u001b[36mvar\u001b[39m number \u001b[33m=\u001b[39m \u001b[35m/^[0-9 ]+$/\u001b[39m\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 158 | \u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<\u001b[39m \u001b[33mHEAD\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m     | \u001b[39m\u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 159 | \u001b[39m\u001b[36mvar\u001b[39m allChar \u001b[33m=\u001b[39m \u001b[35m/^[a-zA-Z0-9!@#\\$%\\^\\&*\\)\\( +=._-]+$/\u001b[39m\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 160 | \u001b[39m\u001b[33m===\u001b[39m\u001b[33m===\u001b[39m\u001b[33m=\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 161 | \u001b[39m\u001b[36mvar\u001b[39m allChar \u001b[33m=\u001b[39m \u001b[35m/^[a-zA-Z0-9!@#\\$%\\^\\&*\\)\\( +=.,_-]+$/\u001b[39m\u001b[33m;\u001b[39m\u001b[0m\n    at Parser._raise (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:790:17)\n    at Parser.raiseWithData (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:783:17)\n    at Parser.raise (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:777:17)\n    at Parser.unexpected (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:9095:16)\n    at Parser.parseExprAtom (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:10529:20)\n    at Parser.parseExprSubscripts (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:10094:23)\n    at Parser.parseUpdate (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:10074:21)\n    at Parser.parseMaybeUnary (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:10063:17)\n    at Parser.parseExprOps (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:9933:23)\n    at Parser.parseMaybeConditional (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:9907:23)\n    at Parser.parseMaybeAssign (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:9870:21)\n    at Parser.parseExpressionBase (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:9815:23)\n    at C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:9809:39\n    at Parser.allowInAnd (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:11504:16)\n    at Parser.parseExpression (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:9809:17)\n    at Parser.parseStatementContent (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:11770:23)\n    at Parser.parseStatement (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:11639:17)\n    at Parser.parseBlockOrModuleBlockBody (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:12221:25)\n    at Parser.parseBlockBody (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:12207:10)\n    at Parser.parseTopLevel (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:11570:10)\n    at Parser.parse (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:13381:10)\n    at parse (C:\\lavori\\BoolBnB\\node_modules\\@babel\\parser\\lib\\index.js:13434:38)\n    at parser (C:\\lavori\\BoolBnB\\node_modules\\@babel\\core\\lib\\parser\\index.js:54:34)\n    at parser.next (<anonymous>)\n    at normalizeFile (C:\\lavori\\BoolBnB\\node_modules\\@babel\\core\\lib\\transformation\\normalize-file.js:99:38)\n    at normalizeFile.next (<anonymous>)\n    at run (C:\\lavori\\BoolBnB\\node_modules\\@babel\\core\\lib\\transformation\\index.js:31:50)\n    at run.next (<anonymous>)\n    at Function.transform (C:\\lavori\\BoolBnB\\node_modules\\@babel\\core\\lib\\transform.js:27:41)\n    at transform.next (<anonymous>)\n    at step (C:\\lavori\\BoolBnB\\node_modules\\gensync\\index.js:261:32)\n    at C:\\lavori\\BoolBnB\\node_modules\\gensync\\index.js:273:13\n    at async.call.result.err.err (C:\\lavori\\BoolBnB\\node_modules\\gensync\\index.js:223:11)\n    at C:\\lavori\\BoolBnB\\node_modules\\gensync\\index.js:189:28\n    at C:\\lavori\\BoolBnB\\node_modules\\@babel\\core\\lib\\gensync-utils\\async.js:72:7\n    at C:\\lavori\\BoolBnB\\node_modules\\gensync\\index.js:113:33");

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\lavori\BoolBnB\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! C:\lavori\BoolBnB\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });