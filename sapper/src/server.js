import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import { json } from 'body-parser';
import session from 'express-session';
import sessionFileStore from 'session-file-store';

const { PORT, NODE_ENV, SECRET_KEY } = process.env;
const dev = NODE_ENV === 'development';

const FileStore = new sessionFileStore(session);

polka() // You can also use Express
	.use(
		json(),
		session({
			secret: SECRET_KEY,
			resave: true,
			saveUninitialized: true,
			cookie: {
				maxAge: 31536000
			},
			store: new FileStore({
				path: process.env.NOW ? `/tmp/sessions` : `.sessions`
			})
		}),
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware({
			session: (req, res) => {
				return ({
					token: req.session.token,
					user: req.session.user
				})
			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
