import express from 'express';
import categories from '../api/categories';
const router = express.Router();

router.use((req, res, next) => {
	if (req.method !== 'GET') {
		return res.send(`Not allowed ${req.method} request`);
	}
	if (req.query.token) {
		return res.send('Need auth token');
	}
	next();
});

router.use('/categories', categories);

module.exports = router;
