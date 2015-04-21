/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
App.addModule('Ice5Ctrl', 'modules/other/controllers/Ice5Ctrl.js');
App.addModule('Ice6Ctrl', 'modules/other/controllers/Ice6Ctrl.js');
App.addModule('Ice8Ctrl', 'modules/other/controllers/Ice8Ctrl.js');
App.addModule('Ice0Ctrl', 'modules/other/controllers/Ice0Ctrl.js');
App.addModule('IceOtherCtrl', 'modules/other/controllers/IceOtherCtrl.js');
App.addModule('IceIndexCtrl', 'modules/other/controllers/IceIndexCtrl.js');
App.addModule('CommentIndexCtrl', 'modules/other/controllers/CommentIndexCtrl.js');
App.addModule('IncludeCommentCtrl', 'modules/other/controllers/IncludeCommentCtrl.js');
App.addModule('IncludeCmtlist', 'modules/other/controllers/IncludeCmtlist.js');
App.addModule('ActionIndex', 'modules/other/controllers/ActionIndex.js');
App.addTemplate('template/action_index', function (require, exports, module) {
  module.exports = require('modules/other/views/action_index.html');
});
App.addTemplate('template/include_cmtlist', function (require, exports, module) {
  module.exports = require('modules/other/views/include_cmtlist.html');
});
App.addTemplate('template/include_comment', function (require, exports, module) {
  module.exports = require('modules/other/views/include_comment.html');
});
App.addTemplate('template/comment_index', function (require, exports, module) {
  module.exports = require('modules/other/views/comment_index.html');
});
App.addTemplate('template/ice_index', function (require, exports, module) {
  module.exports = require('modules/other/views/ice_index.html');
});
App.addTemplate('template/ice_other', function (require, exports, module) {
  module.exports = require('modules/other/views/ice_other.html');
});
App.addTemplate('template/ice0', function (require, exports, module) {
  module.exports = require('modules/other/views/ice0.html');
});
App.addTemplate('template/ice8', function (require, exports, module) {
  module.exports = require('modules/other/views/ice8.html');
});
App.addTemplate('template/ice6', function (require, exports, module) {
  module.exports = require('modules/other/views/ice6.html');
});
App.addTemplate('template/ice5', function (require, exports, module) {
  module.exports = require('modules/other/views/ice5.html');
});