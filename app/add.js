
        $(function () {
            var options = {
                float: true
            };
            $('.grid-stack').gridstack(options);

            new function () {
                this.items = [
                    {x: 0, y: 0, width: 2, height: 4},
     
                ];

                this.grid = $('.grid-stack').data('gridstack');

                this.addNewWidget = function () {
                    var node = this.items.pop() || {
                                x: 0,
                                y: 0,
                                width: 2,
                                height: 4
                            };
                    this.grid.addWidget($('<div><div class="grid-stack-item-content" /><div/>'),
                        node.x, node.y, node.width, node.height);
                    return false;
                }.bind(this);

                $('.add-button').click(this.addNewWidget);
            };
        });
    