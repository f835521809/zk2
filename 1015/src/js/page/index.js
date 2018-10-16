require(['jquery', 'handlebars', 'render'], function($, handlebars, render) {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(res) {
            console.log(res);
            if (res.code === 1) {
                render('#list', res.data, '.li');
            }
        }
    })
})