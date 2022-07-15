import { GetOrder, GetOrders, AddOrder } from './operations';
import { DB_Table } from './database';
import Express, { json, urlencoded } from 'express';
import cors from 'cors';

//Create Express Server
const app = Express();
//Create express Router
const router = Express.Router();

app.use(json()); //Equal to app.use(body-parse.json()) Express @4.16.0 <=
app.use(urlencoded({ extended:true })); //Equal to app.use(body-parse.urlencoded({ extended: true })) Express @4.16.0 <=
app.use(cors());
app.use('/api', router);

//All routes starting with /api -> will run the log showing an attempted request has been made,
//This is known as middleware
router.use((request, response, next) => 
{
	console.log('Request made:');
	console.log('Time:', Date.now());
	next();
});

router.route('/orders').get((response) => 
{
	GetOrders().then((data) => 
	{
		response.json(data[0]);
	});
});

router.route('/orders').post((request, response) =>
{
	const order = { ...request.body };

	console.log(`Request`);
	console.log(request.body);

	AddOrder(order).then(data => 
	{
		response.status(201).json(data);
	});
});

router.route('/orders/:id').get((request, response) => 
{
	GetOrder(request.params.id).then((data) => 
	{
		response.json(data[0]);
	});
});

const port = 2112;
app.listen(port);
console.dir(`REST API is running at ${port}`);