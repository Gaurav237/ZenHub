// custom middlewares

module.exports.setFlash = function(req, res, next) {
    res.locals.flash = {
        success: req.flash('success'),  // getting values from req.flash()
        error: req.flash('error')
    }

    next();
}