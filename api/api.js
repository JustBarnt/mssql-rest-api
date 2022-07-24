import { QueryByColumn, QueryAll, AddToTable } from './operations';
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

/**
* Express Server middleware, always logs to the terminal when A request is made with the time.
*/
router.use((request, response, next) => 
{
	const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numberic'};
	const LocalDate = new Date().toLocaleDateString(undefined, options);
	const LocalTime = new Date().toLocaleTimeString('en-US');

	console.log('Request made:');
	console.log('Date:', LocalDate);
	console.log('Time:', LocalTime);
	next();
});

/**
* Express REST Api route: Retrieves entire table based off URI Query.
*/
router.route('/query/:table').get((request, response) => 
{
	QueryAll(request.params.table).then((data) => 
	{
		response.json(data[0]);
	});
});

/**
*  Express REST Api route: Adds JSON object to the table, given all data is passed correctly.
*/
router.route('/query').post((request, response) =>
{
	const order = { ...request.body };

	console.log(`Request`);
	console.log(request.body);

	AddToTable(order).then(data => 
	{
		response.status(201).json(data);
	});
});

/**
*  Express REST Api route: Queries a single item based on the 
*/
router.route('/orders/:column').get((request, response) => 
{
	QueryByColumn(request.params.queryParam).then((data) => 
	{
		response.json(data[0]);
	});
});

const port = 2112;
app.listen(port);
console.dir(`REST API is running at ${port}`);