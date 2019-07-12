export default {
  install(Vue) {
    Vue.prototype.$scanner = function (options) {
      var _this = this;
      if (_this._callback) {
        return;
      }
      var opt = Object.assign({
        delay: 200,
        endChar: 'Enter',
        callback: null
      }, options)
      var fn = {
        cancel: function () {
          if (_this._callback)
            document.documentElement.removeEventListener('keypress', _this._callback);
          delete _this._callback;
        }
      };
      _this._callback = function (e) {
        var result = _this._result || '';
        var _start = _this._start || new Date();
        var now = new Date();
        if ((now.getTime() - _start.getTime()) > opt.delay) {
          _start = now;
          result = '';
        }
        var keyVal = `${String.fromCharCode(e.which)}`;
        if (e.key == opt.endChar) {
          _this._result = '';
          opt.callback && opt.callback(result);
          return;
        }
        result += keyVal;
        _this._result = result;
        _this._start = _start;
      };
      document.documentElement.addEventListener('keypress', _this._callback);
      return fn;
    };
  }
};
