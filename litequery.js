var LiteQuery = (function () {
    function LiteQuery(nodes) {
        this._nodes = nodes;
    }
    LiteQuery.query = function (selector, context) {
        if (context === void 0) { context = document; }
        if (typeof selector == 'string')
            return new LiteQuery(context.querySelectorAll(selector));
        return new LiteQuery(selector instanceof Node ? [selector] : selector);
    };
    LiteQuery.prototype.each = function (action) {
        var length = this._nodes.length;
        for (var i = 0; i < length; i++)
            action.apply(this._nodes[i]);
        return this;
    };
    LiteQuery.prototype.map = function (transform) {
        var array = [];
        var length = this._nodes.length;
        for (var i = 0; i < length; i++)
            array.push(transform.apply(this._nodes[i]));
        return array;
    };
    LiteQuery.prototype.filter = function (predicate) {
        var filtered = [];
        var length = this._nodes.length;
        for (var i = 0; i < length; i++) {
            var node = this._nodes[i];
            if (predicate.apply(node))
                filtered.push(node);
        }
        return new LiteQuery(filtered);
    };
    LiteQuery.prototype.addClass = function (classNames) {
        var classes = Array.isArray(classNames) ? classNames : classNames.split(' ');
        return this.each(function () {
            if ('classList' in this)
                this.classList.add.apply(this.classList, classes);
        });
    };
    LiteQuery.prototype.removeClass = function (classNames) {
        var classes = Array.isArray(classNames) ? classNames : classNames.split(' ');
        return this.each(function () {
            if ('classList' in this)
                this.classList.remove.apply(this.classList, classes);
        });
    };
    return LiteQuery;
}());
var Q = LiteQuery.query;
//# sourceMappingURL=litequery.js.map