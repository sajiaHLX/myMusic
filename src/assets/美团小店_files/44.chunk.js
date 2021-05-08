(this["webpackJsonpfe.lite-mstore-boss"] = this["webpackJsonpfe.lite-mstore-boss"] || []).push([[44],{

/***/ "./node_modules/@mtfe/sjst-ui/es/Slides/index.css":
/*!********************************************************!*\
  !*** ./node_modules/@mtfe/sjst-ui/es/Slides/index.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../css-loader/dist/cjs.js??ref--5-oneOf-4-1!../../../../postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/@mtfe/sjst-ui/es/Slides/index.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);


if (true) {
  if (!content.locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = content.locals;

    module.hot.accept(
      /*! !../../../../css-loader/dist/cjs.js??ref--5-oneOf-4-1!../../../../postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/@mtfe/sjst-ui/es/Slides/index.css",
      function () {
        content = __webpack_require__(/*! !../../../../css-loader/dist/cjs.js??ref--5-oneOf-4-1!../../../../postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/@mtfe/sjst-ui/es/Slides/index.css");

              content = content.__esModule ? content.default : content;

              if (typeof content === 'string') {
                content = [[module.i, content, '']];
              }

              if (!isEqualLocals(oldLocals, content.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = content.locals;

              update(content);
      }
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

module.exports = content.locals || {};

/***/ }),

/***/ "./node_modules/@mtfe/sjst-ui/es/Slides/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/@mtfe/sjst-ui/es/Slides/index.js ***!
  \*******************************************************/
/*! exports provided: Slides, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Slides", function() { return Slides; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/@mtfe/sjst-ui/node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.css */ "./node_modules/@mtfe/sjst-ui/es/Slides/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_3__);





/**
 * **幻灯片**-轮播。
 */

var Slides =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(Slides, _super);

  function Slides() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.touchEnd = 0;
    _this.state = {
      active: 0,
      left: 0
    };

    _this.onWrapMount = function ($wrap) {
      if ($wrap) {
        _this.$wrap = $wrap;
        _this.state.width = $wrap.clientWidth;

        _this.forceUpdate();
      }
    };

    _this.onTouchStart = function (event) {
      var $contents = _this.$contents;

      if (!$contents) {
        return;
      }

      $contents.style.transition = '';
      var changedTouches = event.changedTouches;
      var clientX = changedTouches[0].clientX;
      _this.touchEnd = clientX;
    };

    _this.onTouchMove = function (event) {
      var changedTouches = event.changedTouches;
      var clientX = changedTouches[0].clientX;
      _this.state.left += clientX - _this.touchEnd;
      _this.touchEnd = clientX;

      _this.forceUpdate();
    };

    _this.onTouchEnd = function (event) {
      if (!_this.$wrap) {
        return;
      }

      var changedTouches = event.changedTouches;
      var clientX = changedTouches[0].clientX;
      _this.state.left += clientX - _this.touchEnd;
      var index = Math.round(_this.state.left / _this.$wrap.clientWidth);

      _this.go(-index);
    }; // 滑动到第 index 个


    _this.go = function (index, animate) {
      if (animate === void 0) {
        animate = true;
      }

      var contents = _this.props.contents;
      var width = _this.state.width;

      if (width) {
        if (index < 0) {
          index = 0;
        }

        var max = contents.length - 1;

        if (index >= max) {
          index = max;
        }

        var $contents = _this.$contents;

        if (!$contents) {
          return;
        }

        if (animate) {
          $contents.style.transition = 'left 0.5s';
        }

        _this.setState({
          active: index,
          left: -index * width
        });
      }
    };

    return _this;
  }

  Slides.prototype.componentDidMount = function () {
    var _this = this;

    var _a = this.props,
        interval = _a.interval,
        contents = _a.contents,
        active = _a.active; // 去默认的

    if (active != null) {
      this.go(active, false);
    } // 自动轮播逻辑


    if (interval) {
      var now_1 = 0;
      this.intervalTimer = setInterval(function () {
        now_1++;

        _this.go(now_1 % contents.length);
      }, interval);
    }
  };

  Slides.prototype.componentWillReceiveProps = function (nextProps) {
    var active = nextProps.active;

    if (active !== this.props.active && active != null) {
      this.go(active);
    }
  };

  Slides.prototype.componentWillUnmount = function () {
    var $wrap = this.$wrap;

    if (!$wrap) {
      return;
    }

    clearInterval(this.intervalTimer);
  };

  Slides.prototype.render = function () {
    var _this = this;

    var _a = this.props,
        className = _a.className,
        style = _a.style,
        contents = _a.contents,
        onClick = _a.onClick;
    var _b = this.state,
        active = _b.active,
        width = _b.width,
        left = _b.left;
    return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
      className: classnames__WEBPACK_IMPORTED_MODULE_2___default()(className, 'mc-slides'),
      style: style,
      onClick: onClick,
      onTouchStart: this.onTouchStart,
      onTouchMove: this.onTouchMove,
      onTouchEnd: this.onTouchEnd,
      ref: this.onWrapMount
    }, react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
      className: "mc-slides-contents",
      style: {
        width: width ? width * contents.length : undefined,
        left: left + "px"
      },
      ref: function ($contents) {
        if ($contents) {
          _this.$contents = $contents;
        }
      }
    }, contents.map(function (content, index) {
      return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
        key: index,
        className: "mc-slides-content",
        style: {
          width: width
        }
      }, content);
    })), react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", {
      className: "mc-slides-indicators"
    }, contents.map(function (_, index) {
      return react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("span", {
        key: index,
        className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('mc-slides-indicator', {
          'mc-slides-indicator_active': active === index
        }),
        onClick: function (event) {
          event.stopPropagation();

          _this.go(index);
        }
      });
    })));
  };

  return Slides;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);


/* harmony default export */ __webpack_exports__["default"] = (Slides);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/@mtfe/sjst-ui/es/Slides/index.css":
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-oneOf-4-1!./node_modules/postcss-loader/src??postcss!./node_modules/@mtfe/sjst-ui/es/Slides/index.css ***!
  \***********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "/* 全局变量 */\n.mc-slides {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  overflow: hidden;\n}\n.mc-slides-contents {\n    height: 100%;\n    position: absolute;\n  }\n.mc-slides-content {\n    display: inline-block;\n    height: 100%;\n    text-align: center;\n    vertical-align: top;\n    position: relative;\n  }\n.mc-slides-content img {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      max-width: 100%;\n      max-height: 100%;\n    }\n.mc-slides-indicators {\n    position: absolute;\n    left: 50%;\n    bottom: 10px;\n    transform: translate(-50%);\n  }\n.mc-slides-indicator {\n    display: inline-block;\n    border-radius: 50%;\n    background-color: rgba(229, 229, 229, 0.4);\n    height: 8px;\n    width: 8px;\n    margin: 3px;\n    cursor: pointer;\n  }\n.mc-slides-indicator_active {\n      background-color: #e5e5e5;\n    }\n", "",{"version":3,"sources":["webpack://node_modules/@mtfe/sjst-ui/es/Slides/index.css"],"names":[],"mappings":"AAAA,SAAS;AACT;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;AAClB;AACA;IACI,YAAY;IACZ,kBAAkB;EACpB;AACF;IACI,qBAAqB;IACrB,YAAY;IACZ,kBAAkB;IAClB,mBAAmB;IACnB,kBAAkB;EACpB;AACF;MACM,kBAAkB;MAClB,QAAQ;MACR,SAAS;MAED,gCAAgC;MACxC,eAAe;MACf,gBAAgB;IAClB;AACJ;IACI,kBAAkB;IAClB,SAAS;IACT,YAAY;IAEJ,0BAA0B;EACpC;AACF;IACI,qBAAqB;IACrB,kBAAkB;IAClB,0CAA0C;IAC1C,WAAW;IACX,UAAU;IACV,WAAW;IACX,eAAe;EACjB;AACF;MACM,yBAAyB;IAC3B","sourcesContent":["/* 全局变量 */\n.mc-slides {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  overflow: hidden;\n}\n.mc-slides-contents {\n    height: 100%;\n    position: absolute;\n  }\n.mc-slides-content {\n    display: inline-block;\n    height: 100%;\n    text-align: center;\n    vertical-align: top;\n    position: relative;\n  }\n.mc-slides-content img {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      -webkit-transform: translate(-50%, -50%);\n              transform: translate(-50%, -50%);\n      max-width: 100%;\n      max-height: 100%;\n    }\n.mc-slides-indicators {\n    position: absolute;\n    left: 50%;\n    bottom: 10px;\n    -webkit-transform: translate(-50%);\n            transform: translate(-50%);\n  }\n.mc-slides-indicator {\n    display: inline-block;\n    border-radius: 50%;\n    background-color: rgba(229, 229, 229, 0.4);\n    height: 8px;\n    width: 8px;\n    margin: 3px;\n    cursor: pointer;\n  }\n.mc-slides-indicator_active {\n      background-color: #e5e5e5;\n    }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/pages/qrSetting/components/buildQrCode/index.scss":
/*!*******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-oneOf-6-1!./node_modules/postcss-loader/src??postcss!./node_modules/resolve-url-loader??ref--5-oneOf-6-3!./node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-6-4!./src/pages/qrSetting/components/buildQrCode/index.scss ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".my-canvas {\n  height: 100%; }\n  .my-canvas .success-slides-qrCode {\n    overflow: hidden; }\n", "",{"version":3,"sources":["webpack://src/pages/qrSetting/components/buildQrCode/index.scss"],"names":[],"mappings":"AAAA;EACE,YAAY,EAAA;EADd;IAII,gBAAgB,EAAA","sourcesContent":[".my-canvas {\n  height: 100%;\n\n  .success-slides-qrCode {\n    overflow: hidden;\n  }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/pages/qrSetting/subpage/GenerateSuccess/index.scss":
/*!********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-oneOf-6-1!./node_modules/postcss-loader/src??postcss!./node_modules/resolve-url-loader??ref--5-oneOf-6-3!./node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-6-4!./src/pages/qrSetting/subpage/GenerateSuccess/index.scss ***!
  \********************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".subpage-qrSetting-GenerateSuccess .success-img {\n  display: block;\n  margin: 0 auto;\n  width: .96rem;\n  height: .96rem; }\n\n.subpage-qrSetting-GenerateSuccess .success-msg {\n  font-weight: 600;\n  font-size: .18rem;\n  color: #333333;\n  text-align: center;\n  margin-top: .04rem; }\n\n.subpage-qrSetting-GenerateSuccess .success-desc {\n  font-weight: 400;\n  font-size: .14rem;\n  color: #999999;\n  text-align: center;\n  margin-top: .06rem;\n  margin-bottom: .17rem; }\n\n.subpage-qrSetting-GenerateSuccess .success-slides {\n  overflow: hidden;\n  width: 1.97rem;\n  margin: 0 auto;\n  height: 2.74rem;\n  margin-bottom: .45rem; }\n  .subpage-qrSetting-GenerateSuccess .success-slides img {\n    width: 100%;\n    height: 100%; }\n", "",{"version":3,"sources":["webpack://src/pages/qrSetting/subpage/GenerateSuccess/index.scss"],"names":[],"mappings":"AAAA;EACE,cAAc;EACd,cAAc;EACd,aAAa;EACb,cAAc,EAAA;;AAGhB;EACE,gBAAgB;EAChB,iBAAiB;EACjB,cAAc;EACd,kBAAkB;EAClB,kBAAkB,EAAA;;AAGpB;EACE,gBAAgB;EAChB,iBAAiB;EACjB,cAAc;EACd,kBAAkB;EAClB,kBAAkB;EAClB,qBAAqB,EAAA;;AAGvB;EACE,gBAAgB;EAChB,cAAc;EACd,cAAc;EACd,eAAe;EACf,qBAAqB,EAAA;EALvB;IAQI,WAAW;IACX,YAAY,EAAA","sourcesContent":[".success-img {\n  display: block;\n  margin: 0 auto;\n  width: .96rem;\n  height: .96rem;\n}\n\n.success-msg {\n  font-weight: 600;\n  font-size: .18rem;\n  color: #333333;\n  text-align: center;\n  margin-top: .04rem;\n}\n\n.success-desc {\n  font-weight: 400;\n  font-size: .14rem;\n  color: #999999;\n  text-align: center;\n  margin-top: .06rem;\n  margin-bottom: .17rem;\n}\n\n.success-slides {\n  overflow: hidden;\n  width: 1.97rem;\n  margin: 0 auto;\n  height: 2.74rem;\n  margin-bottom: .45rem;\n\n  img {\n    width: 100%;\n    height: 100%;\n  }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/assets/common/坑位-二维码@2x.png":
/*!*****************************************!*\
  !*** ./src/assets/common/坑位-二维码@2x.png ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAA00lEQVRYR+1XQQ6AMAjb/uIP9Rn6Qx/jaYmZIR0M2TT1ZjC1K6xAPve0Jodn2dJxh/HCzV5AJNib5TAF6x9JxOvSQAStuI8atAKFE5QuTyFiVVCLKyqoBWpVUItLguWSSaWB4lQQKYTi37UZ1FmsNqPF5bCAFENxKogUQvGMPhgdJ8HeDMyv4OilCQ0Rw22GBOtppLy3lo5awbeXplbi5aDh45YbQe1y07s0SX45zchPgr9JsbY3h9egG0EEZF2atO4wjQ9KHSVsWEAtjQR7beazCl7lZINO+YgvqQAAAABJRU5ErkJggg==");

/***/ }),

/***/ "./src/assets/common/编组@2x.png":
/*!*************************************!*\
  !*** ./src/assets/common/编组@2x.png ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "static/media/编组@2x.b104b1a5.png");

/***/ }),

/***/ "./src/assets/white-poster/桌贴生成模板@2x.png":
/*!***********************************************!*\
  !*** ./src/assets/white-poster/桌贴生成模板@2x.png ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "static/media/桌贴生成模板@2x.2cc499c2.png");

/***/ }),

/***/ "./src/assets/white-poster/桌贴生成模板@3x.png":
/*!***********************************************!*\
  !*** ./src/assets/white-poster/桌贴生成模板@3x.png ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "static/media/桌贴生成模板@3x.3c993a7c.png");

/***/ }),

/***/ "./src/assets/white-poster/海报生成模板@2x.png":
/*!***********************************************!*\
  !*** ./src/assets/white-poster/海报生成模板@2x.png ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "static/media/海报生成模板@2x.d0218094.png");

/***/ }),

/***/ "./src/assets/white-poster/海报生成模板@3x.png":
/*!***********************************************!*\
  !*** ./src/assets/white-poster/海报生成模板@3x.png ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (__webpack_require__.p + "static/media/海报生成模板@3x.dcc2289e.png");

/***/ }),

/***/ "./src/pages/qrSetting/components/buildQrCode/index.scss":
/*!***************************************************************!*\
  !*** ./src/pages/qrSetting/components/buildQrCode/index.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--5-oneOf-6-1!../../../../../node_modules/postcss-loader/src??postcss!../../../../../node_modules/resolve-url-loader??ref--5-oneOf-6-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-6-4!./index.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/pages/qrSetting/components/buildQrCode/index.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);


if (true) {
  if (!content.locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = content.locals;

    module.hot.accept(
      /*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--5-oneOf-6-1!../../../../../node_modules/postcss-loader/src??postcss!../../../../../node_modules/resolve-url-loader??ref--5-oneOf-6-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-6-4!./index.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/pages/qrSetting/components/buildQrCode/index.scss",
      function () {
        content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--5-oneOf-6-1!../../../../../node_modules/postcss-loader/src??postcss!../../../../../node_modules/resolve-url-loader??ref--5-oneOf-6-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-6-4!./index.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/pages/qrSetting/components/buildQrCode/index.scss");

              content = content.__esModule ? content.default : content;

              if (typeof content === 'string') {
                content = [[module.i, content, '']];
              }

              if (!isEqualLocals(oldLocals, content.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = content.locals;

              update(content);
      }
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

module.exports = content.locals || {};

/***/ }),

/***/ "./src/pages/qrSetting/components/buildQrCode/index.tsx":
/*!**************************************************************!*\
  !*** ./src/pages/qrSetting/components/buildQrCode/index.tsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mtfe_sjst_ui_es_Slides__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mtfe/sjst-ui/es/Slides */ "./node_modules/@mtfe/sjst-ui/es/Slides/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.scss */ "./src/pages/qrSetting/components/buildQrCode/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/helinxiao/work/fe.lite-mstore-boss/src/pages/qrSetting/components/buildQrCode/index.tsx",
    _s = __webpack_require__.$Refresh$.signature();

// 组件



 // 样式




const BuildQrCode = props => {
  _s();

  const {
    whitePoster,
    posterQrCode,
    saveSrc,
    type,
    deskStickerQrCode
  } = props;
  let urlList = [];
  let downloadSrcList = [];
  const [canvasList, setCanvasList] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);

  const getPixelRatio = function (context) {
    let backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
  };

  const renderCanvas = () => {
    let myCanvas = document.getElementById('my-canvas');

    if (type === 'poster' && posterQrCode) {
      let canvas = document.createElement('canvas');
      myCanvas === null || myCanvas === void 0 ? void 0 : myCanvas.appendChild(canvas);
      let img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = whitePoster;

      img.onload = () => {
        if (!myCanvas) return;
        let ctx = canvas.getContext('2d');
        let ratio = getPixelRatio(ctx); //根据设计图中的canvas画布的占比进行设置

        let canvasWidth = myCanvas.offsetWidth;
        let canvasHeight = myCanvas.offsetHeight;
        let qrWidthAHeight = 67 / 195 * canvasWidth;
        let left = 64 / 195 * canvasWidth;
        let top = 88 / 274 * canvasHeight;
        canvas.style.width = canvasWidth + "px";
        canvas.style.height = canvasHeight + "px";
        canvas.width = canvasWidth * ratio;
        canvas.height = canvasHeight * ratio;
        if (!ctx) return;
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.imageSmoothingEnabled = false;
        ctx.globalCompositeOperation = 'source-over';
        ctx.scale(ratio, ratio);
        console.log(ratio, canvas.style.width, canvas.style.height, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
        let img2 = new Image();
        img2.crossOrigin = 'anonymous';
        img2.src = posterQrCode;

        img2.onload = () => {
          if (!ctx) return;
          ctx.drawImage(img2, left, top, qrWidthAHeight, qrWidthAHeight);
          saveSrc(canvas.toDataURL("image/png", 1));
        };
      };
    } else if (type === 'deskSticker' && deskStickerQrCode) {
      let group = [];

      for (let i = 0, len = deskStickerQrCode.length; i < len; i += 6) {
        group.push(deskStickerQrCode.slice(i, i + 6));
      }

      console.log(group);
      group.map(item => {
        let canvas = document.createElement('canvas');
        myCanvas === null || myCanvas === void 0 ? void 0 : myCanvas.appendChild(canvas);
        let img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = whitePoster;

        img.onload = () => {
          item.map((i, index) => {
            if (!myCanvas) return;
            let ctx = canvas.getContext('2d');
            let ratio = getPixelRatio(ctx); //根据设计图中的canvas画布的占比进行设置

            let canvasWidth = myCanvas.offsetWidth;
            let canvasHeight = myCanvas.offsetHeight;
            let qrWidthAHeight = 20 / 195 * canvasWidth;
            let left = 34 / 194 * canvasWidth;
            let top = 47 / 274 * canvasHeight;
            canvas.width = canvasWidth * ratio;
            canvas.height = canvasHeight * ratio;
            canvas.style.width = canvasWidth + "px";
            canvas.style.height = canvasHeight + "px";

            if (index < 3) {
              top = (index * 72 + 46 + index) / 274 * canvasHeight;
            } else {
              left = 122 / 194 * canvasWidth;
              top = (index % 3 * 72 + 46 + index % 3) / 274 * canvasHeight;
            }

            if (!ctx) return;
            ctx.scale(ratio, ratio);
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.imageSmoothingEnabled = false;
            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
            let img2 = new Image();
            img2.crossOrigin = 'anonymous';
            img2.src = i.img;

            img2.onload = () => {
              if (!ctx) return;
              ctx.drawImage(img2, left, top, qrWidthAHeight, qrWidthAHeight);
              ctx.save();
              ctx.translate(left + canvasWidth * 28 / 194, top + canvasHeight * 10 / 274); //设置画布上的(0,0)位置，也就是旋转的中心点

              ctx.rotate(270 * Math.PI / 180);
              ctx.font = "5px '微软雅黑' ";
              ctx.textAlign = "center";
              ctx.fillStyle = 'black';
              ctx.fillText(i.desc, 0, 0);
              ctx.restore();

              if (index === item.length - 1) {
                downloadSrcList.push(canvas.toDataURL("image/png", 1));
                canvas.toBlob(blob => {
                  let src = URL.createObjectURL(blob);
                  let a = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["cloneDeep"])(src);
                  urlList.push(a);
                  setCanvasList([...urlList]);
                });
              }
            };
          });
        };
      });
      saveSrc(downloadSrcList);
    }
  };
  /**
   * state
   */

  /**
   * method
   */

  /**
   * effect
   */


  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    renderCanvas();
  }, []);
  /**
   * componentsConfig
   */

  /**
   * render
   */

  const renderImgList = canvasList => {
    return canvasList.map(item => {
      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])("img", {
        src: item
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 186,
        columnNumber: 14
      }, undefined);
    });
  };

  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])("div", {
    className: "my-canvas",
    id: "my-canvas",
    children: type === 'deskSticker' ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__["jsxDEV"])(_mtfe_sjst_ui_es_Slides__WEBPACK_IMPORTED_MODULE_1__["default"], {
      className: "success-slides-qrCode",
      contents: renderImgList(canvasList)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 192,
      columnNumber: 9
    }, undefined) : null
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 190,
    columnNumber: 5
  }, undefined);
};

_s(BuildQrCode, "Di+CkSIz2FOFOye6s/G2g+TLNvI=");

_c = BuildQrCode;
/* harmony default export */ __webpack_exports__["default"] = (BuildQrCode);

var _c;

__webpack_require__.$Refresh$.register(_c, "BuildQrCode");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ }),

/***/ "./src/pages/qrSetting/subpage/GenerateSuccess/index.scss":
/*!****************************************************************!*\
  !*** ./src/pages/qrSetting/subpage/GenerateSuccess/index.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--5-oneOf-6-1!../../../../../node_modules/postcss-loader/src??postcss!../../../../../node_modules/resolve-url-loader??ref--5-oneOf-6-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-6-4!./index.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/pages/qrSetting/subpage/GenerateSuccess/index.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);


if (true) {
  if (!content.locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }

  var p;

  for (p in a) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (a[p] !== b[p]) {
      return false;
    }
  }

  for (p in b) {
    if (isNamedExport && p === 'default') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (!a[p]) {
      return false;
    }
  }

  return true;
};
    var oldLocals = content.locals;

    module.hot.accept(
      /*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--5-oneOf-6-1!../../../../../node_modules/postcss-loader/src??postcss!../../../../../node_modules/resolve-url-loader??ref--5-oneOf-6-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-6-4!./index.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/pages/qrSetting/subpage/GenerateSuccess/index.scss",
      function () {
        content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js??ref--5-oneOf-6-1!../../../../../node_modules/postcss-loader/src??postcss!../../../../../node_modules/resolve-url-loader??ref--5-oneOf-6-3!../../../../../node_modules/sass-loader/dist/cjs.js??ref--5-oneOf-6-4!./index.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./src/pages/qrSetting/subpage/GenerateSuccess/index.scss");

              content = content.__esModule ? content.default : content;

              if (typeof content === 'string') {
                content = [[module.i, content, '']];
              }

              if (!isEqualLocals(oldLocals, content.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = content.locals;

              update(content);
      }
    )
  }

  module.hot.dispose(function() {
    update();
  });
}

module.exports = content.locals || {};

/***/ }),

/***/ "./src/pages/qrSetting/subpage/GenerateSuccess/index.tsx":
/*!***************************************************************!*\
  !*** ./src/pages/qrSetting/subpage/GenerateSuccess/index.tsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _mtfe_sjst_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @mtfe/sjst-ui */ "./node_modules/@mtfe/sjst-ui/lib/index.js");
/* harmony import */ var _mtfe_sjst_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mtfe_sjst_ui__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _pages_qrSetting_components_buildQrCode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pages/qrSetting/components/buildQrCode */ "./src/pages/qrSetting/components/buildQrCode/index.tsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _mtfe_design_qrcode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mtfe/design-qrcode */ "./node_modules/@mtfe/design-qrcode/dist/browser.js");
/* harmony import */ var _mtfe_design_qrcode__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mtfe_design_qrcode__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_common_2x_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @assets/common/编组@2x.png */ "./src/assets/common/编组@2x.png");
/* harmony import */ var _assets_white_poster_2x_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @assets/white-poster/海报生成模板@2x.png */ "./src/assets/white-poster/海报生成模板@2x.png");
/* harmony import */ var _assets_white_poster_3x_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @assets/white-poster/海报生成模板@3x.png */ "./src/assets/white-poster/海报生成模板@3x.png");
/* harmony import */ var _assets_common_2x_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @assets/common/坑位-二维码@2x.png */ "./src/assets/common/坑位-二维码@2x.png");
/* harmony import */ var _assets_white_poster_2x_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @assets/white-poster/桌贴生成模板@2x.png */ "./src/assets/white-poster/桌贴生成模板@2x.png");
/* harmony import */ var _assets_white_poster_3x_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @assets/white-poster/桌贴生成模板@3x.png */ "./src/assets/white-poster/桌贴生成模板@3x.png");
/* harmony import */ var _services_storage_useStorage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @services/storage/useStorage */ "./src/services/storage/useStorage.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../constant */ "./src/pages/qrSetting/constant/index.ts");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./index.scss */ "./src/pages/qrSetting/subpage/GenerateSuccess/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_14__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/Users/helinxiao/work/fe.lite-mstore-boss/src/pages/qrSetting/subpage/GenerateSuccess/index.tsx",
    _s = __webpack_require__.$Refresh$.signature();

// 组件




 // 数据








 // 样式



var PageType;

(function (PageType) {
  PageType[PageType["desk"] = 0] = "desk";
  PageType[PageType["poster"] = 1] = "poster";
})(PageType || (PageType = {}));

const GenerateSuccess = props => {
  _s();

  const [downloadSrcList, setDownloadSrcList] = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(['']);
  const {} = props;
  const {
    type
  } = Object(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["useParams"])();
  const [list, setList] = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]);
  const storeDB = Object(_services_storage_useStorage__WEBPACK_IMPORTED_MODULE_11__["default"])(_constant__WEBPACK_IMPORTED_MODULE_12__["IndexDBConfig"], 'qrSetting');
  const [urlList, setUrlList] = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])([]);
  let ratio = window.devicePixelRatio;

  const getRrCodeList = async () => {
    // console.log(_list)
    const _list = await (storeDB === null || storeDB === void 0 ? void 0 : storeDB.get('generateList')); // console.log(_list)


    setList(_list); // QrCode

    let qrCode = Object(_mtfe_design_qrcode__WEBPACK_IMPORTED_MODULE_4__["toDataURL"])({
      content: 'https://www.baidu.com',
      width: 67,
      type: "image/png"
    }).then(url => {
      let obj = {
        img: url,
        desc: 'test1'
      };
      setUrlList([...urlList, obj]);
    });
  };

  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(() => {
    storeDB && getRrCodeList();
  }, [storeDB]);
  /**
   * method
   */

  const downloadFile = (title, downloadSrc) => {
    if (typeof downloadSrc === 'string') {
      let dlLink = document.createElement('a');
      dlLink.download = title;
      dlLink.href = downloadSrc;
      document.body.appendChild(dlLink);
      dlLink.click();
      document.body.removeChild(dlLink);
    } else {
      downloadSrc.map(i => {
        let dlLink = document.createElement('a');
        dlLink.download = title;
        dlLink.href = i;
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink); // window.KNB.ready(() => {
        //   // window.KNB.downloadImage({
        //   //   imageUrl: i,//需要下载的图片资源URL
        //   //   success: function (data: { result: any; }) {
        //   //     alert(data.result);
        //   //   },
        //   //   fail: (err: number) => {
        //   //     console.log(err, '12313');
        //   //   }
        //   // });
        //   window.KNB.use("downloadImage", {
        //     imageUrl: i,//需要下载的图片资源URL
        //     success: function (data: { result: any; }) {
        //       alert(data.result);
        //       console.log(data.result, '12313');
        //     },
        //     fail: (err: number) => {
        //       console.log(err, '12313');
        //     }
        //   })
        // });
      });
    }
  };

  const saveSrc = src => {
    setDownloadSrcList(src);
  };
  /**
   * componentsConfig
   */


  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_14__["jsxDEV"])("div", {
    className: "subpage-qrSetting-GenerateSuccess",
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_14__["jsxDEV"])("img", {
      className: "success-img",
      src: _assets_common_2x_png__WEBPACK_IMPORTED_MODULE_5__["default"],
      alt: "\u6210\u529F\u751F\u6210"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 115,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_14__["jsxDEV"])("div", {
      className: "success-msg",
      children: "\u684C\u8D34\u5DF2\u6210\u529F\u751F\u6210"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_14__["jsxDEV"])("div", {
      className: "success-desc",
      children: "\u8BF7\u5C06\u4E0B\u65B9\u751F\u6210\u7684\u684C\u8D34\u5F20\u8D34\u5728\u684C\u53F0\u660E\u663E\u7684\u4F4D\u7F6E\u4E0A"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 117,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_14__["jsxDEV"])("div", {
      className: "success-slides",
      children: type === String(PageType.desk) ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_14__["jsxDEV"])(_pages_qrSetting_components_buildQrCode__WEBPACK_IMPORTED_MODULE_2__["default"], {
        whitePoster: ratio <= 2 ? _assets_white_poster_2x_png__WEBPACK_IMPORTED_MODULE_6__["default"] : _assets_white_poster_3x_png__WEBPACK_IMPORTED_MODULE_7__["default"],
        posterQrCode: _assets_common_2x_png__WEBPACK_IMPORTED_MODULE_8__["default"],
        saveSrc: saveSrc,
        type: 'poster'
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 120,
        columnNumber: 11
      }, undefined) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_14__["jsxDEV"])(_pages_qrSetting_components_buildQrCode__WEBPACK_IMPORTED_MODULE_2__["default"], {
        whitePoster: ratio > 2 ? _assets_white_poster_3x_png__WEBPACK_IMPORTED_MODULE_10__["default"] : _assets_white_poster_2x_png__WEBPACK_IMPORTED_MODULE_9__["default"],
        deskStickerQrCode: urlList,
        saveSrc: saveSrc,
        type: 'deskSticker'
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 126,
        columnNumber: 11
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 118,
      columnNumber: 7
    }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_14__["jsxDEV"])(_mtfe_sjst_ui__WEBPACK_IMPORTED_MODULE_0__["Button"], {
      className: "footer-btn footer-btn-active",
      size: "s",
      onClick: () => {
        downloadFile(`${type === String(PageType.desk) ? '桌贴.png' : '海报.png'}`, downloadSrcList);
      },
      children: "\u4FDD\u5B58\u5230\u76F8\u518C"
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 134,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 114,
    columnNumber: 5
  }, undefined);
};

_s(GenerateSuccess, "HNFU3pI8QoyVtEBGnOj2UuoqnTw=", false, function () {
  return [react_router_dom__WEBPACK_IMPORTED_MODULE_3__["useParams"], _services_storage_useStorage__WEBPACK_IMPORTED_MODULE_11__["default"]];
});

_c = GenerateSuccess;
/* harmony default export */ __webpack_exports__["default"] = (GenerateSuccess);

var _c;

__webpack_require__.$Refresh$.register(_c, "GenerateSuccess");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ })

}]);
//# sourceMappingURL=44.chunk.js.map