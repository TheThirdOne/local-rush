var port = 8000,app;

function start(callback){
  if (!!app)
    app.server.destroy();
  if (http.Server) {
    app = new Rush();
    app.listen(port);
    //Data can pass straight through (to log)
    app.use(function(req,next){
      console.log(req);
      next(req);
    });
    /*Or they can not continue unless they fail
     *This is useful because we want files to have higher 
     *prefence but still let functions afterwards work.
     */
    app.use(function(req,next){
      var url = req.baseURL;
      if (url == '/')
        url = '/index.html';
      req.serveURL(url,function(){next(req)});
    });
    //catches any url that has 2 parts excluding params
    app.get('/:first/:second',function(req,next){
      req.writeText(req.params.second + ' vs. ' + req.params.first);
      next(req);
    });
    //catches any url that starts with /hello/
    app.get('/hello/*',function(req,next){
      req.writeText('hello world');
      next(req);
    });
    //matchs any single peice
    app.get('/:hello',function(req,next){
      req.writeText(req.params.hello);
      next(req);
    });
  }
}
start();