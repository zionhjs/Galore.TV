(function (exports) {
    exports.isReady = function(handle) {
        return handle.ready();
    };
}(typeof exports === 'undefined' ? this.utils = {} : exports));
