var CustomError, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CustomError = (function(_super) {
  __extends(CustomError, _super);

  function CustomError() {
    _ref = CustomError.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  CustomError.prototype.construct = function(message, filename, lineNumber) {
    var error;
    CustomError.__super__.construct.call(this);
    error = new Error();
    if (error.stack) {
      if (typeof Components !== 'undefined') {
        this.stack = error.stack.substring(error.stack.indexOf('\n') + 1);
      } else if (typeof chrome !== 'undefined' || typeof process !== 'undefined') {
        this.stack = error.stack.replace(/\n[^\n]*/, '');
      } else {
        this.stack = error.stack;
      }
    }
    this.message = (typeof message === "function" ? message(error.message) : void 0) ? void 0 : message;
    this.fileName = (typeof fileName === "function" ? fileName(error.fileName) : void 0) ? void 0 : fileName;
    return this.lineNumber = (typeof lineNumber === "function" ? lineNumber(error.lineNumber) : void 0) ? void 0 : lineNumber;
  };

  return CustomError;

})(Error);

/*
//@ sourceMappingURL=error.js.map
*/
