exports.logout = (req, res) => {
    req.logout();
    res.redirect('/login');
};
exports.loginPage = (req, res) => {
    res.render('login', { title: 'Login' });
};
exports.resource = (req, res) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        res.send('resource');
    } else {
        res.redirect('login');
    }
};
