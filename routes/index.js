const index = require('../controllers/index');
const router = require('express').Router();
const _ = require('lodash');

let isAuthenticated = (req, res, next) => {
    if (!req.session.user){
        res.redirect('/login')
    } else {
        return next()
    }
}

router.get('/', isAuthenticated, index.indexPage);
router.get('/login', index.loginPage)
router.get('/logout', isAuthenticated, index.logout);
router.post('/login', index.login);
// router.post('/token/get', isAuthenticated, index.tokenGet);
router.post('/place/addPlace', isAuthenticated, index.addPlace);
router.get('/place/add', isAuthenticated, index.addPlacePage);
router.post('/place/qr/add', isAuthenticated, index.addQR);
router.post('/place/qr/delete', isAuthenticated, index.deleteQR)
router.get('/place/list', isAuthenticated, index.listPlace);
router.post('/place/getAll', isAuthenticated, index.getAllPlace);
router.get('/place/list/detail/:placeid', isAuthenticated, index.placeDetailPage);
router.post('/place/getPlaceDetails', isAuthenticated, index.getPlaceDetails);
router.get('/place/list/liveLogs/:placeid', isAuthenticated, index.livePage);
router.post('/live/getAll', isAuthenticated, index.getAllLiveLogs);
router.get('/place/list/history/:placeid', isAuthenticated, index.historyPage);
router.post('/place/getHistory', isAuthenticated, index.history);

module.exports = router;