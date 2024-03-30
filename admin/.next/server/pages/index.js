/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./node_modules/next/dist/shared/lib/dynamic.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/shared/lib/dynamic.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nexports.noSSR = noSSR;\nexports[\"default\"] = dynamic;\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"react\"));\nvar _loadable = _interopRequireDefault(__webpack_require__(/*! ./loadable */ \"./loadable\"));\nfunction _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n        default: obj\n    };\n}\nconst isServerSide = \"undefined\" === 'undefined';\nfunction noSSR(LoadableInitializer, loadableOptions) {\n    // Removing webpack and modules means react-loadable won't try preloading\n    delete loadableOptions.webpack;\n    delete loadableOptions.modules;\n    // This check is necessary to prevent react-loadable from initializing on the server\n    if (!isServerSide) {\n        return LoadableInitializer(loadableOptions);\n    }\n    const Loading = loadableOptions.loading;\n    // This will only be rendered on the server side\n    return ()=>/*#__PURE__*/ _react.default.createElement(Loading, {\n            error: null,\n            isLoading: true,\n            pastDelay: false,\n            timedOut: false\n        })\n    ;\n}\nfunction dynamic(dynamicOptions, options) {\n    let loadableFn = _loadable.default;\n    let loadableOptions = {\n        // A loading component is not required, so we default it\n        loading: ({ error , isLoading , pastDelay  })=>{\n            if (!pastDelay) return null;\n            if (true) {\n                if (isLoading) {\n                    return null;\n                }\n                if (error) {\n                    return(/*#__PURE__*/ _react.default.createElement(\"p\", null, error.message, /*#__PURE__*/ _react.default.createElement(\"br\", null), error.stack));\n                }\n            }\n            return null;\n        }\n    };\n    // Support for direct import(), eg: dynamic(import('../hello-world'))\n    // Note that this is only kept for the edge case where someone is passing in a promise as first argument\n    // The react-loadable babel plugin will turn dynamic(import('../hello-world')) into dynamic(() => import('../hello-world'))\n    // To make sure we don't execute the import without rendering first\n    if (dynamicOptions instanceof Promise) {\n        loadableOptions.loader = ()=>dynamicOptions\n        ;\n    // Support for having import as a function, eg: dynamic(() => import('../hello-world'))\n    } else if (typeof dynamicOptions === 'function') {\n        loadableOptions.loader = dynamicOptions;\n    // Support for having first argument being options, eg: dynamic({loader: import('../hello-world')})\n    } else if (typeof dynamicOptions === 'object') {\n        loadableOptions = {\n            ...loadableOptions,\n            ...dynamicOptions\n        };\n    }\n    // Support for passing options, eg: dynamic(import('../hello-world'), {loading: () => <p>Loading something</p>})\n    loadableOptions = {\n        ...loadableOptions,\n        ...options\n    };\n    const suspenseOptions = loadableOptions;\n    if (true) {\n        // Error if react root is not enabled and `suspense` option is set to true\n        if ( true && suspenseOptions.suspense) {\n            // TODO: add error doc when this feature is stable\n            throw new Error(`Invalid suspense option usage in next/dynamic. Read more: https://nextjs.org/docs/messages/invalid-dynamic-suspense`);\n        }\n    }\n    if (suspenseOptions.suspense) {\n        return loadableFn(suspenseOptions);\n    }\n    // coming from build/babel/plugins/react-loadable-plugin.js\n    if (loadableOptions.loadableGenerated) {\n        loadableOptions = {\n            ...loadableOptions,\n            ...loadableOptions.loadableGenerated\n        };\n        delete loadableOptions.loadableGenerated;\n    }\n    // support for disabling server side rendering, eg: dynamic(import('../hello-world'), {ssr: false})\n    if (typeof loadableOptions.ssr === 'boolean') {\n        if (!loadableOptions.ssr) {\n            delete loadableOptions.ssr;\n            return noSSR(loadableFn, loadableOptions);\n        }\n        delete loadableOptions.ssr;\n    }\n    return loadableFn(loadableOptions);\n} //# sourceMappingURL=dynamic.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L3NoYXJlZC9saWIvZHluYW1pYy5qcy5qcyIsIm1hcHBpbmdzIjoiQUFBWTtBQUNaQSw4Q0FBNkMsQ0FBQztJQUMxQ0csS0FBSyxFQUFFLElBQUk7QUFDZixDQUFDLEVBQUM7QUFDRkQsYUFBYSxHQUFHRSxLQUFLO0FBQ3JCRixrQkFBZSxHQUFHSSxPQUFPO0FBQ3pCLEdBQUcsQ0FBQ0MsTUFBTSxHQUFHQyxzQkFBc0IsQ0FBQ0MsbUJBQU8sQ0FBQyxvQkFBTztBQUNuRCxHQUFHLENBQUNDLFNBQVMsR0FBR0Ysc0JBQXNCLENBQUNDLG1CQUFPLENBQUMsOEJBQVk7U0FDbERELHNCQUFzQixDQUFDRyxHQUFHLEVBQUUsQ0FBQztJQUNsQyxNQUFNLENBQUNBLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxVQUFVLEdBQUdELEdBQUcsR0FBRyxDQUFDO1FBQ2xDTixPQUFPLEVBQUVNLEdBQUc7SUFDaEIsQ0FBQztBQUNMLENBQUM7QUFDRCxLQUFLLENBQUNFLFlBQVksR0FBRyxDQUFhLGVBQUssQ0FBVztTQUN6Q1QsS0FBSyxDQUFDVSxtQkFBbUIsRUFBRUMsZUFBZSxFQUFFLENBQUM7SUFDbEQsRUFBeUU7SUFDekUsTUFBTSxDQUFDQSxlQUFlLENBQUNDLE9BQU87SUFDOUIsTUFBTSxDQUFDRCxlQUFlLENBQUNFLE9BQU87SUFDOUIsRUFBb0Y7SUFDcEYsRUFBRSxHQUFHSixZQUFZLEVBQUUsQ0FBQztRQUNoQixNQUFNLENBQUNDLG1CQUFtQixDQUFDQyxlQUFlO0lBQzlDLENBQUM7SUFDRCxLQUFLLENBQUNHLE9BQU8sR0FBR0gsZUFBZSxDQUFDSSxPQUFPO0lBQ3ZDLEVBQWdEO0lBQ2hELE1BQU0sS0FBSyxFQUFhLFlBQUNaLE1BQU0sQ0FBQ0YsT0FBTyxDQUFDZSxhQUFhLENBQUNGLE9BQU8sRUFBRSxDQUFDO1lBQ3hERyxLQUFLLEVBQUUsSUFBSTtZQUNYQyxTQUFTLEVBQUUsSUFBSTtZQUNmQyxTQUFTLEVBQUUsS0FBSztZ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LENBQUNBLGVBQWUsQ0FBQ3lCLEdBQUc7SUFDOUIsQ0FBQztJQUNELE1BQU0sQ0FBQ2IsVUFBVSxDQUFDWixlQUFlO0FBQ3JDLENBQUMsQ0FFa0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGRtZW51LWRhc2hib2FyZC8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3Qvc2hhcmVkL2xpYi9keW5hbWljLmpzP2UyNWQiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLm5vU1NSID0gbm9TU1I7XG5leHBvcnRzLmRlZmF1bHQgPSBkeW5hbWljO1xudmFyIF9yZWFjdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInJlYWN0XCIpKTtcbnZhciBfbG9hZGFibGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xvYWRhYmxlXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgICAgZGVmYXVsdDogb2JqXG4gICAgfTtcbn1cbmNvbnN0IGlzU2VydmVyU2lkZSA9IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnO1xuZnVuY3Rpb24gbm9TU1IoTG9hZGFibGVJbml0aWFsaXplciwgbG9hZGFibGVPcHRpb25zKSB7XG4gICAgLy8gUmVtb3Zpbmcgd2VicGFjayBhbmQgbW9kdWxlcyBtZWFucyByZWFjdC1sb2FkYWJsZSB3b24ndCB0cnkgcHJlbG9hZGluZ1xuICAgIGRlbGV0ZSBsb2FkYWJsZU9wdGlvbnMud2VicGFjaztcbiAgICBkZWxldGUgbG9hZGFibGVPcHRpb25zLm1vZHVsZXM7XG4gICAgLy8gVGhpcyBjaGVjayBpcyBuZWNlc3NhcnkgdG8gcHJldmVudCByZWFjdC1sb2FkYWJsZSBmcm9tIGluaXRpYWxpemluZyBvbiB0aGUgc2VydmVyXG4gICAgaWYgKCFpc1NlcnZlclNpZGUpIHtcbiAgICAgICAgcmV0dXJuIExvYWRhYmxlSW5pdGlhbGl6ZXIobG9hZGFibGVPcHRpb25zKTtcbiAgICB9XG4gICAgY29uc3QgTG9hZGluZyA9IGxvYWRhYmxlT3B0aW9ucy5sb2FkaW5nO1xuICAgIC8vIFRoaXMgd2lsbCBvbmx5IGJlIHJlbmRlcmVkIG9uIHRoZSBzZXJ2ZXIgc2lkZVxuICAgIHJldHVybiAoKT0+LyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KExvYWRpbmcsIHtcbiAgICAgICAgICAgIGVycm9yOiBudWxsLFxuICAgICAgICAgICAgaXNMb2FkaW5nOiB0cnVlLFxuICAgICAgICAgICAgcGFzdERlbGF5OiBmYWxzZSxcbiAgICAgICAgICAgIHRpbWVkT3V0OiBmYWxzZVxuICAgICAgICB9KVxuICAgIDtcbn1cbmZ1bmN0aW9uIGR5bmFtaWMoZHluYW1pY09wdGlvbnMsIG9wdGlvbnMpIHtcbiAgICBsZXQgbG9hZGFibGVGbiA9IF9sb2FkYWJsZS5kZWZhdWx0O1xuICAgIGxldCBsb2FkYWJsZU9wdGlvbnMgPSB7XG4gICAgICAgIC8vIEEgbG9hZGluZyBjb21wb25lbnQgaXMgbm90IHJlcXVpcmVkLCBzbyB3ZSBkZWZhdWx0IGl0XG4gICAgICAgIGxvYWRpbmc6ICh7IGVycm9yICwgaXNMb2FkaW5nICwgcGFzdERlbGF5ICB9KT0+e1xuICAgICAgICAgICAgaWYgKCFwYXN0RGVsYXkpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzTG9hZGluZykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJwXCIsIG51bGwsIGVycm9yLm1lc3NhZ2UsIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImJyXCIsIG51bGwpLCBlcnJvci5zdGFjaykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyBTdXBwb3J0IGZvciBkaXJlY3QgaW1wb3J0KCksIGVnOiBkeW5hbWljKGltcG9ydCgnLi4vaGVsbG8td29ybGQnKSlcbiAgICAvLyBOb3RlIHRoYXQgdGhpcyBpcyBvbmx5IGtlcHQgZm9yIHRoZSBlZGdlIGNhc2Ugd2hlcmUgc29tZW9uZSBpcyBwYXNzaW5nIGluIGEgcHJvbWlzZSBhcyBmaXJzdCBhcmd1bWVudFxuICAgIC8vIFRoZSByZWFjdC1sb2FkYWJsZSBiYWJlbCBwbHVnaW4gd2lsbCB0dXJuIGR5bmFtaWMoaW1wb3J0KCcuLi9oZWxsby13b3JsZCcpKSBpbnRvIGR5bmFtaWMoKCkgPT4gaW1wb3J0KCcuLi9oZWxsby13b3JsZCcpKVxuICAgIC8vIFRvIG1ha2Ugc3VyZSB3ZSBkb24ndCBleGVjdXRlIHRoZSBpbXBvcnQgd2l0aG91dCByZW5kZXJpbmcgZmlyc3RcbiAgICBpZiAoZHluYW1pY09wdGlvbnMgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgIGxvYWRhYmxlT3B0aW9ucy5sb2FkZXIgPSAoKT0+ZHluYW1pY09wdGlvbnNcbiAgICAgICAgO1xuICAgIC8vIFN1cHBvcnQgZm9yIGhhdmluZyBpbXBvcnQgYXMgYSBmdW5jdGlvbiwgZWc6IGR5bmFtaWMoKCkgPT4gaW1wb3J0KCcuLi9oZWxsby13b3JsZCcpKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGR5bmFtaWNPcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGxvYWRhYmxlT3B0aW9ucy5sb2FkZXIgPSBkeW5hbWljT3B0aW9ucztcbiAgICAvLyBTdXBwb3J0IGZvciBoYXZpbmcgZmlyc3QgYXJndW1lbnQgYmVpbmcgb3B0aW9ucywgZWc6IGR5bmFtaWMoe2xvYWRlcjogaW1wb3J0KCcuLi9oZWxsby13b3JsZCcpfSlcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkeW5hbWljT3B0aW9ucyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbG9hZGFibGVPcHRpb25zID0ge1xuICAgICAgICAgICAgLi4ubG9hZGFibGVPcHRpb25zLFxuICAgICAgICAgICAgLi4uZHluYW1pY09wdGlvbnNcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gU3VwcG9ydCBmb3IgcGFzc2luZyBvcHRpb25zLCBlZzogZHluYW1pYyhpbXBvcnQoJy4uL2hlbGxvLXdvcmxkJyksIHtsb2FkaW5nOiAoKSA9PiA8cD5Mb2FkaW5nIHNvbWV0aGluZzwvcD59KVxuICAgIGxvYWRhYmxlT3B0aW9ucyA9IHtcbiAgICAgICAgLi4ubG9hZGFibGVPcHRpb25zLFxuICAgICAgICAuLi5vcHRpb25zXG4gICAgfTtcbiAgICBjb25zdCBzdXNwZW5zZU9wdGlvbnMgPSBsb2FkYWJsZU9wdGlvbnM7XG4gICAgaWYgKCFwcm9jZXNzLmVudi5fX05FWFRfQ09OQ1VSUkVOVF9GRUFUVVJFUykge1xuICAgICAgICAvLyBFcnJvciBpZiByZWFjdCByb290IGlzIG5vdCBlbmFibGVkIGFuZCBgc3VzcGVuc2VgIG9wdGlvbiBpcyBzZXQgdG8gdHJ1ZVxuICAgICAgICBpZiAoIXByb2Nlc3MuZW52Ll9fTkVYVF9SRUFDVF9ST09UICYmIHN1c3BlbnNlT3B0aW9ucy5zdXNwZW5zZSkge1xuICAgICAgICAgICAgLy8gVE9ETzogYWRkIGVycm9yIGRvYyB3aGVuIHRoaXMgZmVhdHVyZSBpcyBzdGFibGVcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBzdXNwZW5zZSBvcHRpb24gdXNhZ2UgaW4gbmV4dC9keW5hbWljLiBSZWFkIG1vcmU6IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL2ludmFsaWQtZHluYW1pYy1zdXNwZW5zZWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChzdXNwZW5zZU9wdGlvbnMuc3VzcGVuc2UpIHtcbiAgICAgICAgcmV0dXJuIGxvYWRhYmxlRm4oc3VzcGVuc2VPcHRpb25zKTtcbiAgICB9XG4gICAgLy8gY29taW5nIGZyb20gYnVpbGQvYmFiZWwvcGx1Z2lucy9yZWFjdC1sb2FkYWJsZS1wbHVnaW4uanNcbiAgICBpZiAobG9hZGFibGVPcHRpb25zLmxvYWRhYmxlR2VuZXJhdGVkKSB7XG4gICAgICAgIGxvYWRhYmxlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIC4uLmxvYWRhYmxlT3B0aW9ucyxcbiAgICAgICAgICAgIC4uLmxvYWRhYmxlT3B0aW9ucy5sb2FkYWJsZUdlbmVyYXRlZFxuICAgICAgICB9O1xuICAgICAgICBkZWxldGUgbG9hZGFibGVPcHRpb25zLmxvYWRhYmxlR2VuZXJhdGVkO1xuICAgIH1cbiAgICAvLyBzdXBwb3J0IGZvciBkaXNhYmxpbmcgc2VydmVyIHNpZGUgcmVuZGVyaW5nLCBlZzogZHluYW1pYyhpbXBvcnQoJy4uL2hlbGxvLXdvcmxkJyksIHtzc3I6IGZhbHNlfSlcbiAgICBpZiAodHlwZW9mIGxvYWRhYmxlT3B0aW9ucy5zc3IgPT09ICdib29sZWFuJykge1xuICAgICAgICBpZiAoIWxvYWRhYmxlT3B0aW9ucy5zc3IpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBsb2FkYWJsZU9wdGlvbnMuc3NyO1xuICAgICAgICAgICAgcmV0dXJuIG5vU1NSKGxvYWRhYmxlRm4sIGxvYWRhYmxlT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgZGVsZXRlIGxvYWRhYmxlT3B0aW9ucy5zc3I7XG4gICAgfVxuICAgIHJldHVybiBsb2FkYWJsZUZuKGxvYWRhYmxlT3B0aW9ucyk7XG59XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWR5bmFtaWMuanMubWFwIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwibm9TU1IiLCJkZWZhdWx0IiwiZHluYW1pYyIsIl9yZWFjdCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX2xvYWRhYmxlIiwib2JqIiwiX19lc01vZHVsZSIsImlzU2VydmVyU2lkZSIsIkxvYWRhYmxlSW5pdGlhbGl6ZXIiLCJsb2FkYWJsZU9wdGlvbnMiLCJ3ZWJwYWNrIiwibW9kdWxlcyIsIkxvYWRpbmciLCJsb2FkaW5nIiwiY3JlYXRlRWxlbWVudCIsImVycm9yIiwiaXNMb2FkaW5nIiwicGFzdERlbGF5IiwidGltZWRPdXQiLCJkeW5hbWljT3B0aW9ucyIsIm9wdGlvbnMiLCJsb2FkYWJsZUZuIiwibWVzc2FnZSIsInN0YWNrIiwiUHJvbWlzZSIsImxvYWRlciIsInN1c3BlbnNlT3B0aW9ucyIsInByb2Nlc3MiLCJlbnYiLCJfX05FWFRfQ09OQ1VSUkVOVF9GRUFUVVJFUyIsIl9fTkVYVF9SRUFDVF9ST09UIiwic3VzcGVuc2UiLCJFcnJvciIsImxvYWRhYmxlR2VuZXJhdGVkIiwic3NyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/next/dist/shared/lib/dynamic.js\n");

/***/ }),

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dynamic */ \"./node_modules/next/dynamic.js\");\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var src_views_main_OrderFilters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/views/main/OrderFilters */ \"./src/views/main/OrderFilters.js\");\n/* harmony import */ var src_views_main_use_date_range_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/views/main/use-date-range-filter */ \"./src/views/main/use-date-range-filter.jsx\");\n\n\n\n\n// ! To avoid 'Window is not defined' error\nconst OrdersBoard = next_dynamic__WEBPACK_IMPORTED_MODULE_1___default()(()=>__webpack_require__.e(/*! import() */ \"src_views_main_OrdersBoard_js\").then(__webpack_require__.bind(__webpack_require__, /*! src/views/main/OrdersBoard */ \"./src/views/main/OrdersBoard.js\"))\n, {\n    loadableGenerated: {\n        webpack: ()=>[\n                /*require.resolve*/(/*! src/views/main/OrdersBoard */ \"./src/views/main/OrdersBoard.js\")\n            ]\n        ,\n        modules: [\n            \"index.js -> \" + \"src/views/main/OrdersBoard\"\n        ]\n    },\n    ssr: false\n});\nconst MainPage = ()=>{\n    const { range , handleRangeChange  } = (0,src_views_main_use_date_range_filter__WEBPACK_IMPORTED_MODULE_3__.useDateRangeFilter)();\n    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(src_views_main_OrderFilters__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                range: range,\n                handleRangeChange: handleRangeChange,\n                __source: {\n                    fileName: \"/Users/ruslan/Projects/oddmenu-dashboard/src/pages/index.js\",\n                    lineNumber: 17,\n                    columnNumber: 7\n                },\n                __self: undefined\n            }),\n            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(OrdersBoard, {\n                dateRange: range,\n                __source: {\n                    fileName: \"/Users/ruslan/Projects/oddmenu-dashboard/src/pages/index.js\",\n                    lineNumber: 18,\n                    columnNumber: 7\n                },\n                __self: undefined\n            })\n        ]\n    }));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MainPage);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBa0M7QUFPb0I7QUFFbUI7QUFQekUsRUFBMkM7QUFDM0MsS0FBSyxDQUFDRyxXQUFXLEdBQUdILG1EQUFPLEtBQU9JLCtMQUFtQzs7Ozs7Ozs7Ozs7SUFDbkVDLEdBQUcsRUFBRSxLQUFLOztBQU9aLEtBQUssQ0FBQ0MsUUFBUSxPQUFTLENBQUM7SUFDdEIsS0FBSyxDQUFDLENBQUMsQ0FBQ0MsS0FBSyxHQUFFQyxpQkFBaUIsRUFBQyxDQUFDLEdBQUdOLHdGQUFrQjtJQUV2RCxNQUFNOztpRkFFREQsbUVBQVk7Z0JBQUNNLEtBQUssRUFBRUEsS0FBSztnQkFBRUMsaUJBQWlCLEVBQUVBLGlCQUFpQjs7Ozs7Ozs7aUZBQy9ETCxXQUFXO2dCQUFDTSxTQUFTLEVBQUVGLEtBQUs7Ozs7Ozs7Ozs7QUFHbkMsQ0FBQztBQUVELGlFQUFlRCxRQUFRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2RkbWVudS1kYXNoYm9hcmQvLi9zcmMvcGFnZXMvaW5kZXguanM/NDA4MCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZHluYW1pYyBmcm9tICduZXh0L2R5bmFtaWMnXG5cbi8vICEgVG8gYXZvaWQgJ1dpbmRvdyBpcyBub3QgZGVmaW5lZCcgZXJyb3JcbmNvbnN0IE9yZGVyc0JvYXJkID0gZHluYW1pYygoKSA9PiBpbXBvcnQoJ3NyYy92aWV3cy9tYWluL09yZGVyc0JvYXJkJyksIHtcbiAgc3NyOiBmYWxzZVxufSlcblxuaW1wb3J0IE9yZGVyRmlsdGVycyBmcm9tICdzcmMvdmlld3MvbWFpbi9PcmRlckZpbHRlcnMnXG5cbmltcG9ydCB7IHVzZURhdGVSYW5nZUZpbHRlciB9IGZyb20gJ3NyYy92aWV3cy9tYWluL3VzZS1kYXRlLXJhbmdlLWZpbHRlcidcblxuY29uc3QgTWFpblBhZ2UgPSAoKSA9PiB7XG4gIGNvbnN0IHsgcmFuZ2UsIGhhbmRsZVJhbmdlQ2hhbmdlIH0gPSB1c2VEYXRlUmFuZ2VGaWx0ZXIoKVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxPcmRlckZpbHRlcnMgcmFuZ2U9e3JhbmdlfSBoYW5kbGVSYW5nZUNoYW5nZT17aGFuZGxlUmFuZ2VDaGFuZ2V9IC8+XG4gICAgICA8T3JkZXJzQm9hcmQgZGF0ZVJhbmdlPXtyYW5nZX0gLz5cbiAgICA8Lz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBNYWluUGFnZVxuIl0sIm5hbWVzIjpbImR5bmFtaWMiLCJPcmRlckZpbHRlcnMiLCJ1c2VEYXRlUmFuZ2VGaWx0ZXIiLCJPcmRlcnNCb2FyZCIsImltcG9ydCIsInNzciIsIk1haW5QYWdlIiwicmFuZ2UiLCJoYW5kbGVSYW5nZUNoYW5nZSIsImRhdGVSYW5nZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/index.js\n");

/***/ }),

/***/ "./src/utils/url-queries.js":
/*!**********************************!*\
  !*** ./src/utils/url-queries.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"updateURLqueries\": () => (/* binding */ updateURLqueries),\n/* harmony export */   \"filterQueries\": () => (/* binding */ filterQueries)\n/* harmony export */ });\nconst updateURLqueries = (router, queries, replace = false)=>{\n    const newQueries = replace ? queries : {\n        ...router.query,\n        ...queries\n    };\n    router.replace({\n        query: filterQueries(newQueries)\n    }, null, {\n        shallow: true\n    });\n};\nconst filterQueries = (queries)=>{\n    const result = {\n    };\n    for(const query in queries){\n        let value = queries[query];\n        if (typeof value === \"string\") {\n            value = value.trim();\n        }\n        if (value) {\n            result[query] = value;\n        }\n    }\n    return result;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdXRpbHMvdXJsLXF1ZXJpZXMuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBTyxLQUFLLENBQUNBLGdCQUFnQixJQUFJQyxNQUFNLEVBQUVDLE9BQU8sRUFBRUMsT0FBTyxHQUFHLEtBQUssR0FBSyxDQUFDO0lBQ3JFLEtBQUssQ0FBQ0MsVUFBVSxHQUFHRCxPQUFPLEdBQUdELE9BQU8sR0FBRyxDQUFDO1dBQUlELE1BQU0sQ0FBQ0ksS0FBSztXQUFLSCxPQUFPO0lBQUMsQ0FBQztJQUV0RUQsTUFBTSxDQUFDRSxPQUFPLENBQ1osQ0FBQztRQUNDRSxLQUFLLEVBQUVDLGFBQWEsQ0FBQ0YsVUFBVTtJQUNqQyxDQUFDLEVBQ0QsSUFBSSxFQUNKLENBQUM7UUFBQ0csT0FBTyxFQUFFLElBQUk7SUFBQyxDQUFDO0FBRXJCLENBQUM7QUFFTSxLQUFLLENBQUNELGFBQWEsSUFBSUosT0FBTyxHQUFLLENBQUM7SUFDekMsS0FBSyxDQUFDTSxNQUFNLEdBQUcsQ0FBQztJQUFBLENBQUM7SUFFakIsR0FBRyxDQUFFLEtBQUssQ0FBQ0gsS0FBSyxJQUFJSCxPQUFPLENBQUUsQ0FBQztRQUM1QixHQUFHLENBQUNPLEtBQUssR0FBR1AsT0FBTyxDQUFDRyxLQUFLO1FBRXpCLEVBQUUsRUFBRSxNQUFNLENBQUNJLEtBQUssS0FBSyxDQUFRLFNBQUUsQ0FBQztZQUM5QkEsS0FBSyxHQUFHQSxLQUFLLENBQUNDLElBQUk7UUFDcEIsQ0FBQztRQUVELEVBQUUsRUFBRUQsS0FBSyxFQUFFLENBQUM7WUFDVkQsTUFBTSxDQUFDSCxLQUFLLElBQUlJLEtBQUs7UUFDdkIsQ0FBQztJQUNILENBQUM7SUFFRCxNQUFNLENBQUNELE1BQU07QUFDZixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2RkbWVudS1kYXNoYm9hcmQvLi9zcmMvdXRpbHMvdXJsLXF1ZXJpZXMuanM/ZWUyZCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgdXBkYXRlVVJMcXVlcmllcyA9IChyb3V0ZXIsIHF1ZXJpZXMsIHJlcGxhY2UgPSBmYWxzZSkgPT4ge1xuICBjb25zdCBuZXdRdWVyaWVzID0gcmVwbGFjZSA/IHF1ZXJpZXMgOiB7IC4uLnJvdXRlci5xdWVyeSwgLi4ucXVlcmllcyB9O1xuXG4gIHJvdXRlci5yZXBsYWNlKFxuICAgIHtcbiAgICAgIHF1ZXJ5OiBmaWx0ZXJRdWVyaWVzKG5ld1F1ZXJpZXMpLFxuICAgIH0sXG4gICAgbnVsbCxcbiAgICB7IHNoYWxsb3c6IHRydWUgfVxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IGZpbHRlclF1ZXJpZXMgPSAocXVlcmllcykgPT4ge1xuICBjb25zdCByZXN1bHQgPSB7fTtcblxuICBmb3IgKGNvbnN0IHF1ZXJ5IGluIHF1ZXJpZXMpIHtcbiAgICBsZXQgdmFsdWUgPSBxdWVyaWVzW3F1ZXJ5XTtcblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUudHJpbSgpO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgcmVzdWx0W3F1ZXJ5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuIl0sIm5hbWVzIjpbInVwZGF0ZVVSTHF1ZXJpZXMiLCJyb3V0ZXIiLCJxdWVyaWVzIiwicmVwbGFjZSIsIm5ld1F1ZXJpZXMiLCJxdWVyeSIsImZpbHRlclF1ZXJpZXMiLCJzaGFsbG93IiwicmVzdWx0IiwidmFsdWUiLCJ0cmltIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/utils/url-queries.js\n");

/***/ }),

/***/ "./src/views/main/OrderFilters.js":
/*!****************************************!*\
  !*** ./src/views/main/OrderFilters.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dynamic */ \"./node_modules/next/dynamic.js\");\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material/Box */ \"@mui/material/Box\");\n/* harmony import */ var _mui_material_Box__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Box__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _mui_material_Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/material/Grid */ \"@mui/material/Grid\");\n/* harmony import */ var _mui_material_Grid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Grid__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/material/Card */ \"@mui/material/Card\");\n/* harmony import */ var _mui_material_Card__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Card__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mui/material/CardHeader */ \"@mui/material/CardHeader\");\n/* harmony import */ var _mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardHeader__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mui/material/CardContent */ \"@mui/material/CardContent\");\n/* harmony import */ var _mui_material_CardContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_CardContent__WEBPACK_IMPORTED_MODULE_6__);\n\n\n// ** MUI Imports\n\n\n\n\n\n// ** Components Imports\nconst AppDateRangePicker = next_dynamic__WEBPACK_IMPORTED_MODULE_1___default()(()=>__webpack_require__.e(/*! import() */ \"src_core_components_react-date-range_app-date-range-picker_jsx\").then(__webpack_require__.bind(__webpack_require__, /*! src/@core/components/react-date-range/app-date-range-picker */ \"./src/@core/components/react-date-range/app-date-range-picker.jsx\"))\n, {\n    loadableGenerated: {\n        webpack: ()=>[\n                /*require.resolve*/(/*! src/@core/components/react-date-range/app-date-range-picker */ \"./src/@core/components/react-date-range/app-date-range-picker.jsx\")\n            ]\n        ,\n        modules: [\n            \"../views/main/OrderFilters.js -> \" + \"src/@core/components/react-date-range/app-date-range-picker\"\n        ]\n    },\n    ssr: false\n});\nconst OrderFilters = ({ range , handleRangeChange  })=>{\n    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((_mui_material_Grid__WEBPACK_IMPORTED_MODULE_3___default()), {\n        container: true,\n        __source: {\n            fileName: \"/Users/ruslan/Projects/oddmenu-dashboard/src/views/main/OrderFilters.js\",\n            lineNumber: 17,\n            columnNumber: 5\n        },\n        __self: undefined,\n        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((_mui_material_Grid__WEBPACK_IMPORTED_MODULE_3___default()), {\n            item: true,\n            xs: 12,\n            sm: 6,\n            md: 5,\n            lg: 4,\n            __source: {\n                fileName: \"/Users/ruslan/Projects/oddmenu-dashboard/src/views/main/OrderFilters.js\",\n                lineNumber: 18,\n                columnNumber: 7\n            },\n            __self: undefined,\n            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_2___default()), {\n                sx: {\n                    mb: 4\n                },\n                __source: {\n                    fileName: \"/Users/ruslan/Projects/oddmenu-dashboard/src/views/main/OrderFilters.js\",\n                    lineNumber: 19,\n                    columnNumber: 9\n                },\n                __self: undefined,\n                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((_mui_material_Box__WEBPACK_IMPORTED_MODULE_2___default()), {\n                    sx: {\n                        backgroundColor: 'common.white'\n                    },\n                    __source: {\n                        fileName: \"/Users/ruslan/Projects/oddmenu-dashboard/src/views/main/OrderFilters.js\",\n                        lineNumber: 20,\n                        columnNumber: 11\n                    },\n                    __self: undefined,\n                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(AppDateRangePicker, {\n                        value: range,\n                        onChange: handleRangeChange,\n                        __source: {\n                            fileName: \"/Users/ruslan/Projects/oddmenu-dashboard/src/views/main/OrderFilters.js\",\n                            lineNumber: 21,\n                            columnNumber: 13\n                        },\n                        __self: undefined\n                    })\n                })\n            })\n        })\n    }));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OrderFilters);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdmlld3MvbWFpbi9PcmRlckZpbHRlcnMuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFrQztBQUVsQyxFQUFpQjtBQUNrQjtBQUNFO0FBQ0E7QUFDWTtBQUNFO0FBRW5ELEVBQXdCO0FBQ3hCLEtBQUssQ0FBQ00sa0JBQWtCLEdBQUdOLG1EQUFPLEtBQU9PLG1TQUFvRTs7Ozs7Ozs7Ozs7SUFDM0dDLEdBQUcsRUFBRSxLQUFLOztBQUdaLEtBQUssQ0FBQ0MsWUFBWSxJQUFJLENBQUMsQ0FBQ0MsS0FBSyxHQUFFQyxpQkFBaUIsRUFBQyxDQUFDLEdBQUssQ0FBQztJQUN0RCxNQUFNLHNFQUNIVCwyREFBSTtRQUFDVSxTQUFTOzs7Ozs7O3VGQUNaViwyREFBSTtZQUFDVyxJQUFJO1lBQUNDLEVBQUUsRUFBRSxFQUFFO1lBQUVDLEVBQUUsRUFBRSxDQUFDO1lBQUVDLEVBQUUsRUFBRSxDQUFDO1lBQUVDLEVBQUUsRUFBRSxDQUFDOzs7Ozs7OzJGQUNuQ2hCLDBEQUFHO2dCQUFDaUIsRUFBRSxFQUFFLENBQUM7b0JBQUNDLEVBQUUsRUFBRSxDQUFDO2dCQUFDLENBQUM7Ozs7Ozs7K0ZBQ2ZsQiwwREFBRztvQkFBQ2lCLEVBQUUsRUFBRSxDQUFDO3dCQUFDRSxlQUFlLEVBQUUsQ0FBYztvQkFBQyxDQUFDOzs7Ozs7O21HQUN6Q2Qsa0JBQWtCO3dCQUFDZSxLQUFLLEVBQUVYLEtBQUs7d0JBQUVZLFFBQVEsRUFBRVgsaUJBQWlCOzs7Ozs7Ozs7Ozs7QUFNekUsQ0FBQztBQUVELGlFQUFlRixZQUFZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2RkbWVudS1kYXNoYm9hcmQvLi9zcmMvdmlld3MvbWFpbi9PcmRlckZpbHRlcnMuanM/ZDcwNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZHluYW1pYyBmcm9tICduZXh0L2R5bmFtaWMnXG5cbi8vICoqIE1VSSBJbXBvcnRzXG5pbXBvcnQgQm94IGZyb20gJ0BtdWkvbWF0ZXJpYWwvQm94J1xuaW1wb3J0IEdyaWQgZnJvbSAnQG11aS9tYXRlcmlhbC9HcmlkJ1xuaW1wb3J0IENhcmQgZnJvbSAnQG11aS9tYXRlcmlhbC9DYXJkJ1xuaW1wb3J0IENhcmRIZWFkZXIgZnJvbSAnQG11aS9tYXRlcmlhbC9DYXJkSGVhZGVyJ1xuaW1wb3J0IENhcmRDb250ZW50IGZyb20gJ0BtdWkvbWF0ZXJpYWwvQ2FyZENvbnRlbnQnXG5cbi8vICoqIENvbXBvbmVudHMgSW1wb3J0c1xuY29uc3QgQXBwRGF0ZVJhbmdlUGlja2VyID0gZHluYW1pYygoKSA9PiBpbXBvcnQoJ3NyYy9AY29yZS9jb21wb25lbnRzL3JlYWN0LWRhdGUtcmFuZ2UvYXBwLWRhdGUtcmFuZ2UtcGlja2VyJyksIHtcbiAgc3NyOiBmYWxzZVxufSlcblxuY29uc3QgT3JkZXJGaWx0ZXJzID0gKHsgcmFuZ2UsIGhhbmRsZVJhbmdlQ2hhbmdlIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8R3JpZCBjb250YWluZXI+XG4gICAgICA8R3JpZCBpdGVtIHhzPXsxMn0gc209ezZ9IG1kPXs1fSBsZz17NH0+XG4gICAgICAgIDxCb3ggc3g9e3sgbWI6IDQgfX0+XG4gICAgICAgICAgPEJveCBzeD17eyBiYWNrZ3JvdW5kQ29sb3I6ICdjb21tb24ud2hpdGUnIH19PlxuICAgICAgICAgICAgPEFwcERhdGVSYW5nZVBpY2tlciB2YWx1ZT17cmFuZ2V9IG9uQ2hhbmdlPXtoYW5kbGVSYW5nZUNoYW5nZX0gLz5cbiAgICAgICAgICA8L0JveD5cbiAgICAgICAgPC9Cb3g+XG4gICAgICA8L0dyaWQ+XG4gICAgPC9HcmlkPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IE9yZGVyRmlsdGVyc1xuIl0sIm5hbWVzIjpbImR5bmFtaWMiLCJCb3giLCJHcmlkIiwiQ2FyZCIsIkNhcmRIZWFkZXIiLCJDYXJkQ29udGVudCIsIkFwcERhdGVSYW5nZVBpY2tlciIsImltcG9ydCIsInNzciIsIk9yZGVyRmlsdGVycyIsInJhbmdlIiwiaGFuZGxlUmFuZ2VDaGFuZ2UiLCJjb250YWluZXIiLCJpdGVtIiwieHMiLCJzbSIsIm1kIiwibGciLCJzeCIsIm1iIiwiYmFja2dyb3VuZENvbG9yIiwidmFsdWUiLCJvbkNoYW5nZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/views/main/OrderFilters.js\n");

/***/ }),

/***/ "./src/views/main/use-date-range-filter.jsx":
/*!**************************************************!*\
  !*** ./src/views/main/use-date-range-filter.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getValueFromUrl\": () => (/* binding */ getValueFromUrl),\n/* harmony export */   \"useDateRangeFilter\": () => (/* binding */ useDateRangeFilter)\n/* harmony export */ });\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var src_utils_url_queries__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/utils/url-queries */ \"./src/utils/url-queries.js\");\n/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! date-fns */ \"date-fns\");\n/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_3__);\n// ** Next Imports\n\n// ** React Imports\n\n// ** Utils Imports\n\n\nconst getValueFromUrl = (queryObject)=>{\n    const { startDate , endDate  } = queryObject;\n    const start = startDate ? new Date(startDate) : (0,date_fns__WEBPACK_IMPORTED_MODULE_3__.startOfToday)();\n    const end = endDate ? new Date(endDate) : (0,date_fns__WEBPACK_IMPORTED_MODULE_3__.endOfToday)();\n    return {\n        startDate: start,\n        endDate: end\n    };\n};\nconst useDateRangeFilter = ()=>{\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_0__.useRouter)();\n    const { 0: range , 1: setRange  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(getValueFromUrl(router.query));\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (router.isReady) {\n            setRange(getValueFromUrl(router.query));\n        }\n    }, [\n        router.isReady,\n        router.query\n    ]);\n    const handleRangeChange = (newValue)=>{\n        setRange(newValue);\n        (0,src_utils_url_queries__WEBPACK_IMPORTED_MODULE_2__.updateURLqueries)(router, {\n            startDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_3__.format)(newValue.startDate, \"yyyy-MM-dd'T'HH:mm:ss\"),\n            endDate: (0,date_fns__WEBPACK_IMPORTED_MODULE_3__.format)(newValue.endDate, \"yyyy-MM-dd'T'HH:mm:ss\")\n        });\n    };\n    return {\n        range,\n        handleRangeChange\n    };\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdmlld3MvbWFpbi91c2UtZGF0ZS1yYW5nZS1maWx0ZXIuanN4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLEVBQWtCO0FBQ3FCO0FBRXZDLEVBQW1CO0FBQ3dCO0FBRTNDLEVBQW1CO0FBQ3FDO0FBRUc7QUFFcEQsS0FBSyxDQUFDTyxlQUFlLElBQUdDLFdBQVcsR0FBSSxDQUFDO0lBQzdDLEtBQUssQ0FBQyxDQUFDLENBQUNDLFNBQVMsR0FBRUMsT0FBTyxFQUFDLENBQUMsR0FBR0YsV0FBVztJQUUxQyxLQUFLLENBQUNHLEtBQUssR0FBR0YsU0FBUyxHQUFHLEdBQUcsQ0FBQ0csSUFBSSxDQUFDSCxTQUFTLElBQUlKLHNEQUFZO0lBQzVELEtBQUssQ0FBQ1EsR0FBRyxHQUFHSCxPQUFPLEdBQUcsR0FBRyxDQUFDRSxJQUFJLENBQUNGLE9BQU8sSUFBSUosb0RBQVU7SUFFcEQsTUFBTSxDQUFDLENBQUM7UUFDTkcsU0FBUyxFQUFFRSxLQUFLO1FBQ2hCRCxPQUFPLEVBQUVHLEdBQUc7SUFDZCxDQUFDO0FBQ0gsQ0FBQztBQUVNLEtBQUssQ0FBQ0Msa0JBQWtCLE9BQVMsQ0FBQztJQUN2QyxLQUFLLENBQUNDLE1BQU0sR0FBR2Ysc0RBQVM7SUFFeEIsS0FBSyxNQUFFZ0IsS0FBSyxNQUFFQyxRQUFRLE1BQUloQiwrQ0FBUSxDQUFDTSxlQUFlLENBQUNRLE1BQU0sQ0FBQ0csS0FBSztJQUUvRGhCLGdEQUFTLEtBQU8sQ0FBQztRQUNmLEVBQUUsRUFBRWEsTUFBTSxDQUFDSSxPQUFPLEVBQUUsQ0FBQztZQUNuQkYsUUFBUSxDQUFDVixlQUFlLENBQUNRLE1BQU0sQ0FBQ0csS0FBSztRQUN2QyxDQUFDO0lBQ0gsQ0FBQyxFQUFFLENBQUNIO1FBQUFBLE1BQU0sQ0FBQ0ksT0FBTztRQUFFSixNQUFNLENBQUNHLEtBQUs7SUFBQSxDQUFDO0lBRWpDLEtBQUssQ0FBQ0UsaUJBQWlCLElBQUdDLFFBQVEsR0FBSSxDQUFDO1FBQ3JDSixRQUFRLENBQUNJLFFBQVE7UUFFakJsQix1RUFBZ0IsQ0FBQ1ksTUFBTSxFQUFFLENBQUM7WUFDeEJOLFNBQVMsRUFBRUwsZ0RBQU0sQ0FBQ2lCLFFBQVEsQ0FBQ1osU0FBUyxFQUFFLENBQXVCO1lBQzdEQyxPQUFPLEVBQUVOLGdEQUFNLENBQUNpQixRQUFRLENBQUNYLE9BQU8sRUFBRSxDQUF1QjtRQUMzRCxDQUFDO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxDQUFDO1FBQUNNLEtBQUs7UUFBRUksaUJBQWlCO0lBQUMsQ0FBQztBQUNyQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2RkbWVudS1kYXNoYm9hcmQvLi9zcmMvdmlld3MvbWFpbi91c2UtZGF0ZS1yYW5nZS1maWx0ZXIuanN4PzYyYzkiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gKiogTmV4dCBJbXBvcnRzXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcidcblxuLy8gKiogUmVhY3QgSW1wb3J0c1xuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xuXG4vLyAqKiBVdGlscyBJbXBvcnRzXG5pbXBvcnQgeyB1cGRhdGVVUkxxdWVyaWVzIH0gZnJvbSAnc3JjL3V0aWxzL3VybC1xdWVyaWVzJ1xuXG5pbXBvcnQgeyBmb3JtYXQsIHN0YXJ0T2ZUb2RheSwgZW5kT2ZUb2RheSB9IGZyb20gJ2RhdGUtZm5zJ1xuXG5leHBvcnQgY29uc3QgZ2V0VmFsdWVGcm9tVXJsID0gcXVlcnlPYmplY3QgPT4ge1xuICBjb25zdCB7IHN0YXJ0RGF0ZSwgZW5kRGF0ZSB9ID0gcXVlcnlPYmplY3RcblxuICBjb25zdCBzdGFydCA9IHN0YXJ0RGF0ZSA/IG5ldyBEYXRlKHN0YXJ0RGF0ZSkgOiBzdGFydE9mVG9kYXkoKVxuICBjb25zdCBlbmQgPSBlbmREYXRlID8gbmV3IERhdGUoZW5kRGF0ZSkgOiBlbmRPZlRvZGF5KClcblxuICByZXR1cm4ge1xuICAgIHN0YXJ0RGF0ZTogc3RhcnQsXG4gICAgZW5kRGF0ZTogZW5kXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZURhdGVSYW5nZUZpbHRlciA9ICgpID0+IHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKClcblxuICBjb25zdCBbcmFuZ2UsIHNldFJhbmdlXSA9IHVzZVN0YXRlKGdldFZhbHVlRnJvbVVybChyb3V0ZXIucXVlcnkpKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHJvdXRlci5pc1JlYWR5KSB7XG4gICAgICBzZXRSYW5nZShnZXRWYWx1ZUZyb21Vcmwocm91dGVyLnF1ZXJ5KSlcbiAgICB9XG4gIH0sIFtyb3V0ZXIuaXNSZWFkeSwgcm91dGVyLnF1ZXJ5XSlcblxuICBjb25zdCBoYW5kbGVSYW5nZUNoYW5nZSA9IG5ld1ZhbHVlID0+IHtcbiAgICBzZXRSYW5nZShuZXdWYWx1ZSlcblxuICAgIHVwZGF0ZVVSTHF1ZXJpZXMocm91dGVyLCB7XG4gICAgICBzdGFydERhdGU6IGZvcm1hdChuZXdWYWx1ZS5zdGFydERhdGUsIFwieXl5eS1NTS1kZCdUJ0hIOm1tOnNzXCIpLFxuICAgICAgZW5kRGF0ZTogZm9ybWF0KG5ld1ZhbHVlLmVuZERhdGUsIFwieXl5eS1NTS1kZCdUJ0hIOm1tOnNzXCIpXG4gICAgfSlcbiAgfVxuXG4gIHJldHVybiB7IHJhbmdlLCBoYW5kbGVSYW5nZUNoYW5nZSB9XG59XG4iXSwibmFtZXMiOlsidXNlUm91dGVyIiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1cGRhdGVVUkxxdWVyaWVzIiwiZm9ybWF0Iiwic3RhcnRPZlRvZGF5IiwiZW5kT2ZUb2RheSIsImdldFZhbHVlRnJvbVVybCIsInF1ZXJ5T2JqZWN0Iiwic3RhcnREYXRlIiwiZW5kRGF0ZSIsInN0YXJ0IiwiRGF0ZSIsImVuZCIsInVzZURhdGVSYW5nZUZpbHRlciIsInJvdXRlciIsInJhbmdlIiwic2V0UmFuZ2UiLCJxdWVyeSIsImlzUmVhZHkiLCJoYW5kbGVSYW5nZUNoYW5nZSIsIm5ld1ZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/views/main/use-date-range-filter.jsx\n");

/***/ }),

/***/ "./node_modules/next/dynamic.js":
/*!**************************************!*\
  !*** ./node_modules/next/dynamic.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__(/*! ./dist/shared/lib/dynamic */ \"./node_modules/next/dist/shared/lib/dynamic.js\")\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvbmV4dC9keW5hbWljLmpzLmpzIiwibWFwcGluZ3MiOiJBQUFBLHVIQUFxRCIsInNvdXJjZXMiOlsid2VicGFjazovL29kZG1lbnUtZGFzaGJvYXJkLy4vbm9kZV9tb2R1bGVzL25leHQvZHluYW1pYy5qcz83M2Q0Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kaXN0L3NoYXJlZC9saWIvZHluYW1pYycpXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/next/dynamic.js\n");

/***/ }),

/***/ "@emotion/react":
/*!*********************************!*\
  !*** external "@emotion/react" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@emotion/react");

/***/ }),

/***/ "@mui/lab/LoadingButton":
/*!*****************************************!*\
  !*** external "@mui/lab/LoadingButton" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/lab/LoadingButton");

/***/ }),

/***/ "@mui/material":
/*!********************************!*\
  !*** external "@mui/material" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material");

/***/ }),

/***/ "@mui/material/Box":
/*!************************************!*\
  !*** external "@mui/material/Box" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Box");

/***/ }),

/***/ "@mui/material/Button":
/*!***************************************!*\
  !*** external "@mui/material/Button" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Button");

/***/ }),

/***/ "@mui/material/Card":
/*!*************************************!*\
  !*** external "@mui/material/Card" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Card");

/***/ }),

/***/ "@mui/material/CardContent":
/*!********************************************!*\
  !*** external "@mui/material/CardContent" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/CardContent");

/***/ }),

/***/ "@mui/material/CardHeader":
/*!*******************************************!*\
  !*** external "@mui/material/CardHeader" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/CardHeader");

/***/ }),

/***/ "@mui/material/Dialog":
/*!***************************************!*\
  !*** external "@mui/material/Dialog" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Dialog");

/***/ }),

/***/ "@mui/material/DialogActions":
/*!**********************************************!*\
  !*** external "@mui/material/DialogActions" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/DialogActions");

/***/ }),

/***/ "@mui/material/DialogContent":
/*!**********************************************!*\
  !*** external "@mui/material/DialogContent" ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/DialogContent");

/***/ }),

/***/ "@mui/material/DialogTitle":
/*!********************************************!*\
  !*** external "@mui/material/DialogTitle" ***!
  \********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/DialogTitle");

/***/ }),

/***/ "@mui/material/Divider":
/*!****************************************!*\
  !*** external "@mui/material/Divider" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Divider");

/***/ }),

/***/ "@mui/material/Grid":
/*!*************************************!*\
  !*** external "@mui/material/Grid" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Grid");

/***/ }),

/***/ "@mui/material/IconButton":
/*!*******************************************!*\
  !*** external "@mui/material/IconButton" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/IconButton");

/***/ }),

/***/ "@mui/material/LinearProgress":
/*!***********************************************!*\
  !*** external "@mui/material/LinearProgress" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/LinearProgress");

/***/ }),

/***/ "@mui/material/Popover":
/*!****************************************!*\
  !*** external "@mui/material/Popover" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Popover");

/***/ }),

/***/ "@mui/material/Skeleton":
/*!*****************************************!*\
  !*** external "@mui/material/Skeleton" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Skeleton");

/***/ }),

/***/ "@mui/material/Typography":
/*!*******************************************!*\
  !*** external "@mui/material/Typography" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/Typography");

/***/ }),

/***/ "@mui/material/styles":
/*!***************************************!*\
  !*** external "@mui/material/styles" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/material/styles");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("axios");

/***/ }),

/***/ "date-fns":
/*!***************************!*\
  !*** external "date-fns" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("date-fns");

/***/ }),

/***/ "mdi-material-ui/CalendarMonth":
/*!************************************************!*\
  !*** external "mdi-material-ui/CalendarMonth" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("mdi-material-ui/CalendarMonth");

/***/ }),

/***/ "mdi-material-ui/ChevronRight":
/*!***********************************************!*\
  !*** external "mdi-material-ui/ChevronRight" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("mdi-material-ui/ChevronRight");

/***/ }),

/***/ "mdi-material-ui/Close":
/*!****************************************!*\
  !*** external "mdi-material-ui/Close" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("mdi-material-ui/Close");

/***/ }),

/***/ "./loadable":
/*!***************************************************!*\
  !*** external "next/dist/shared/lib/loadable.js" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/loadable.js");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-date-range":
/*!***********************************!*\
  !*** external "react-date-range" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-date-range");

/***/ }),

/***/ "react-query":
/*!******************************!*\
  !*** external "react-query" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-query");

/***/ }),

/***/ "react-sortablejs":
/*!***********************************!*\
  !*** external "react-sortablejs" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-sortablejs");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/index.js"));
module.exports = __webpack_exports__;

})();