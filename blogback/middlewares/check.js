module.exports = { // 这里的权限控制是在Node端写页面才能用的，前后端分离的情况下需要在前端控制页面
  checkLogin: function checkLogin (req, res, next) {
    if (!req.session.user) {
      req.flash('error', '未登录')
      return res.redirect('/users/login')
    }
    next()
  },

  checkNotLogin: function checkNotLogin (req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录')
      return res.redirect('back')// 返回之前的页面
    }
    next()
  }
}