(function ($) {
    // register namespace
    $.extend(true, window, {
        "Slick": {
            "Supra": Supra
        }
    });

    function Supra(options) {
        var _grid;
        var _ranges = [];
        var _self = this;
        var _handler = new Slick.EventHandler();
        var _inHandler;
        var _options;
        var _defaults = {
            selectActiveRow: true
        };

        function init(grid) {
            _options = $.extend(true, {}, _defaults, options);
            _grid = grid;
            _handler.subscribe(_grid.onSort,
                wrapHandler(handleGridSort));
        }

        function destroy() {
            _handler.unsubscribeAll();
        }

        function wrapHandler(handler) {
            return function () {
                if (!_inHandler) {
                    _inHandler = true;
                    handler.apply(this, arguments);
                    _inHandler = false;
                }
            };
        }

        function comparer(a, b) {
            var x = a[sortcol], y = b[sortcol];
            return (x == y ? 0 : (x > y ? 1 : -1));
        }

        function handleGridSort(e, args) {

                sortcol = args.sortCol.field;  // Maybe args.sortcol.field ???
                dataView.sort(comparer, args.sortAsc);

        }


        // Public API
        $.extend(this, {
            "init": init,
            "destroy": destroy
        });
    }
})(jQuery);