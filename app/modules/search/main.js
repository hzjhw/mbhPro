/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/2/28
 */
App.addModule('SearchIndex', 'modules/search/controllers/SearchIndex.js');
App.addTemplate('template/search_index', function(require, exports, module){
  module.exports = require('modules/search/views/search_index.html');
});