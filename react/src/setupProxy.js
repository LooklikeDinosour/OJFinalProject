const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {


  app.use(
    '/api', // 이 경로로 들어오는 요청을 프록시할 것입니다.
    createProxyMiddleware({
      target: 'http://43.201.243.223:8888', // 프록시할 대상 서버 주소를 여기에 지정합니다.
      changeOrigin: true
    })
  );




};

