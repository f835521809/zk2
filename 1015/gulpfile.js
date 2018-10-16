var gulp = require('gulp');
var server = require('gulp-webserver');
var url = require('url');
var path = require('path');
var fs = require('fs');
var list = require('./mock/list.json');
var querystring = require('querystring');

//起服务
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            prot: 8888,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end();
                    return false;
                }
                if (pathname === '/api/add') {
                    var arr = [];
                    req.on('data', function(chunk) {
                        arr.push(chunk);
                    })
                    req.on('end', function() {
                        var datatext = querystring.parse(Buffer.concat(arr).toString());
                        var biao = datatext.biao;
                        var text = datatext.text;
                        var obj = {};
                        obj.title = biao;
                        obj.tit = text;
                        list.unshift(obj)
                        fs.writeFileSync('./mock/list.json', JSON.stringify(list))
                        res.end(JSON.stringify({ code: 0, data: list }))
                    })
                } else if (pathname === '/api/list') {
                    res.end(JSON.stringify({ code: 1, data: list }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
})