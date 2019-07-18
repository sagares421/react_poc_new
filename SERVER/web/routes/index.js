module.exports = (app) => {

    app.use('/api/user', require('./user.route'));

    app.use('/api/metal', require('./metal.route'));
    
    app.use('/api/tip', require('./tip.route'));
}