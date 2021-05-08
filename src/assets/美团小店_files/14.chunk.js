(this["webpackJsonpfe.lite-mstore-boss"] = this["webpackJsonpfe.lite-mstore-boss"] || []).push([[14],{

/***/ "./src/pages/qrSetting/constant/index.ts":
/*!***********************************************!*\
  !*** ./src/pages/qrSetting/constant/index.ts ***!
  \***********************************************/
/*! exports provided: IndexDBConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexDBConfig", function() { return IndexDBConfig; });
/* harmony import */ var _services_storage_DBconfig__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @services/storage/DBconfig */ "./src/services/storage/DBconfig.ts");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);


const IndexDBConfig = { ..._services_storage_DBconfig__WEBPACK_IMPORTED_MODULE_0__["default"],
  stores: {
    qrSetting: {}
  }
};

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

/***/ "./src/services/storage/DBconfig.ts":
/*!******************************************!*\
  !*** ./src/services/storage/DBconfig.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

const defaultDBConfig = {
  name: 'mstoreBoss',
  version: 1,
  stores: {}
};
/* harmony default export */ __webpack_exports__["default"] = (defaultDBConfig);

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

/***/ "./src/services/storage/index.ts":
/*!***************************************!*\
  !*** ./src/services/storage/index.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return makeStorageService; });
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

/** 创建数据库服务 */
async function makeStorageService(dbConfigs) {
  function getResult(request) {
    return new Promise((resolve, reject) => {
      request.onerror = reject;

      request.onsuccess = () => resolve(request.result);
    });
  }

  function onUpgradeNeeded(_db) {
    return new Promise((resolve, reject) => {
      _db.onerror = reject;
      Object.entries(dbConfigs.stores).forEach(([name, config]) => {
        const store = _db.createObjectStore(name, config.params);

        const {
          indexes
        } = config;

        if (indexes) {
          Object.entries(indexes).forEach(([index, indexConfig]) => {
            store.createIndex(index, indexConfig.key, indexConfig.params);
          });
        }
      });
      resolve();
    });
  }

  const db = await new Promise((resolve, reject) => {
    const request = indexedDB.open(dbConfigs.name, dbConfigs.version);

    request.onsuccess = () => resolve(request.result);

    request.onerror = reject;

    request.onupgradeneeded = async () => {
      try {
        await onUpgradeNeeded(request.result);
      } catch (e) {
        reject(e);
      }
    };
  });
  /** 关闭数据库 */

  function close() {
    return new Promise((resolve, reject) => {
      db.onclose = resolve;
      db.onerror = reject;
      db.close();
    });
  }

  function getStore(name) {
    async function withTranscation(callback, mode) {
      const transaction = db.transaction(name, mode);
      const req = callback(transaction);

      if (Array.isArray(req)) {
        return Promise.all(req.map(getResult));
      } else {
        return getResult(req);
      }
    }
    /** 添加单条数据, 如果 Key 存在则覆盖 */


    function put(value, key) {
      return withTranscation(transcation => {
        const store = transcation.objectStore(name);
        return store.put(value, key);
      }, 'readwrite');
    }
    /** 批量添加，不设置Key */


    function batchPut(value) {
      return withTranscation(transcation => {
        const store = transcation.objectStore(name);
        return value.map(v => store.put(v));
      }, 'readwrite');
    }
    /** 批量添加，并且设置 key */


    function batchPutWithKey(values) {
      return withTranscation(transcation => {
        const store = transcation.objectStore(name);
        return Object.entries(values).map(([key, value]) => store.put(value, key));
      }, 'readwrite');
    }
    /** 通过 key 获取某个值 */


    function get(key) {
      return withTranscation(transcation => {
        const store = transcation.objectStore(name);
        return store.get(key);
      }, 'readonly');
    }
    /** 获取所有数据 */


    function getAll() {
      return withTranscation(transcation => {
        const store = transcation.objectStore(name);
        return store.getAll();
      }, 'readonly');
    }
    /** 获取所有的key */


    function getAllKeys() {
      return withTranscation(transcation => {
        const store = transcation.objectStore(name);
        return store.getAllKeys();
      }, 'readonly');
    }
    /** 获取某个 key */


    function getKey(key) {
      return withTranscation(transcation => {
        const store = transcation.objectStore(name);
        return store.getKey(key);
      }, 'readonly');
    }
    /** 清除所有数据 */


    function clear() {
      return withTranscation(transcation => {
        const store = transcation.objectStore(name);
        return store.clear();
      }, 'readwrite');
    }
    /** 删除某个条目 */


    function remove(key) {
      return withTranscation(transcation => {
        const store = transcation.objectStore(name);
        return store.delete(key);
      }, 'readwrite');
    }
    /** 遍历数据 */


    async function cursor(query, onData, direction) {
      const transcation = db.transaction(name, 'readonly');
      const store = transcation.objectStore(name);
      const request = store.openCursor(query, direction);
      const values = [];
      return new Promise((resolve, reject) => {
        request.onerror = reject;

        request.onsuccess = () => {
          const _cursor = request.result;
          if (!_cursor) return resolve(values);
          onData && onData([_cursor.key, _cursor.value]);
          values.push(_cursor.value);

          _cursor.continue();
        };
      });
    }

    return {
      put,
      batchPut,
      batchPutWithKey,
      get,
      getAll,
      getAllKeys,
      getKey,
      clear,
      remove,
      cursor
    };
  }

  return {
    getStore,
    close
  };
}

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

/***/ "./src/services/storage/useStorage.ts":
/*!********************************************!*\
  !*** ./src/services/storage/useStorage.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return useStorage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/services/storage/index.ts");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _s = __webpack_require__.$Refresh$.signature();




/** 不同数据库配置的缓存 */
const storageCache = new Map();
/** 创建数据库缓存 */

function makeCache(configMap, storeName) {
  const cache = {
    refs: 0,
    store: null,
    service: null,
    closed: false,
    onCreateCallbacks: [],
    increaseRef: () => {
      if (!cache) return;
      cache.refs++;
    },
    decreaseRef: () => {
      if (!cache) return;
      cache.refs--;

      if (cache.refs === 0 && !(cache === null || cache === void 0 ? void 0 : cache.closed)) {
        var _cache$service;

        if (!cache) return;
        (_cache$service = cache.service) === null || _cache$service === void 0 ? void 0 : _cache$service.close();
        cache.closed = true;
        configMap.delete(storeName);
      }
    }
  };
  configMap.set(storeName, cache);
  return cache;
}

function init(config, storeName, cache) {
  Object(_index__WEBPACK_IMPORTED_MODULE_1__["default"])(config).then(service => {
    if (!cache) return;
    cache.service = service; // 如果缓存已销毁，则直接关闭服务
    // 会在数据库连接建立之前，DOM 就已经销毁的情况下出现

    if (cache.closed) {
      return service.close();
    }

    const store = service.getStore(storeName);
    cache.store = store;
    cache.onCreateCallbacks.forEach(cb => cb(store));
    cache.onCreateCallbacks = [];
  });
}
/** 创建数据库连接 */


function create(config, storeName, setStorage) {
  const configMap = storageCache.get(config) || new Map();
  let cache = configMap === null || configMap === void 0 ? void 0 : configMap.get(storeName);

  if (!cache) {
    // 没有缓存，则新建一个缓存，并初始化连接
    cache = makeCache(configMap, storeName);
    cache.onCreateCallbacks.push(setStorage);
    storageCache.set(config, configMap);
    init(config, storeName, cache);
  } else if (!cache.store) {
    // 有缓存，但是数据库没有创建完成，则加入到成功回调中
    cache.onCreateCallbacks.push(setStorage);
  } else {
    // 有缓存，且有数据库实例，则直接设置
    setStorage(cache.store);
  } // 增加对于缓存的持有


  cache.increaseRef();
  return () => {
    requestAnimationFrame(() => {
      var _cache;

      // 减少对于缓存的持有
      (_cache = cache) === null || _cache === void 0 ? void 0 : _cache.decreaseRef();
    });
  };
}
/**
 * useStorage 返回用户需要使用的数据库表实例
 * 为避免重复建立数据库连接，useStorage 参数一致的情况下会返回同一个 Store 实例
 * @param config 数据库配置
 * @param storeName 需要获取的表名
 */


function useStorage(config, storeName) {
  _s();

  const [storage, setStorage] = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState(null);
  const cache = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(() => {
    var _storageCache$get;

    const c = (_storageCache$get = storageCache.get(config)) === null || _storageCache$get === void 0 ? void 0 : _storageCache$get.get(storeName);
    if (c) return c;
  }, [config, storeName]);
  react__WEBPACK_IMPORTED_MODULE_0___default.a.useEffect(() => create(config, storeName, s => {
    setStorage(s);
  }), [config, storeName]);
  return (cache === null || cache === void 0 ? void 0 : cache.store) || storage;
}

_s(useStorage, "Dyrv5gTLLu8KCgb2Fap+DZXA8C0=");

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
//# sourceMappingURL=14.chunk.js.map