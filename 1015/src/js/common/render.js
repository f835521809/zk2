define(['jquery', 'handlebars'], function($, handlebars) {
    function render(tpl, data, target) {
        var source = $(tpl).html();
        var template = handlebars.compile(source);
        var html = template(data);
        $(target).html(html);
    }
    return render;
});