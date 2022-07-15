import { Buffer } from 'node:buffer';
import { config } from '../config';
import sql from 'mssql';

//TODO - Follow standard import procedure and move main functionality into a Helpfully Named file EX: SQLOperations- and import that into this index.js file.
//TODO - Create Class for all operations

/**
* @description Asynchronous function for getting the entire recordset.
* @author Brent Williams
* @function GetOrders
* 
*/

async function GetOrders()
{
	try
	{
		const pool = await sql.connect(config);
		const products = await pool.request().query('select * from Orders');
		return products.recordsets;
	}
	catch(error)
	{
		console.log(error);
	}
}

/**
* @description Asynchronous function for getting a single recordset.
* @author Brent Williams
* @function GetOrder
* 
* @param {Number} productId Integer matching the Id you wish to query.
* 
*/

async function GetOrder(productId)
{
	try 
	{
		const pool = await sql.connect(config);
		const product = await pool.request()
			.input('input_parameter', sql.Int, parseInt(productId))
			.query('select * from Orders where Id = @input_parameter');
		return product.recordsets;
	} 
	catch(error) 
	{
		console.log(error);
	}
}

/**
* @description Asynchronous function for adding an data to the database.
* @author Brent Williams
* @function AddOrder
* 
* @param {Object} order Object containing matching keys to the column names in the table.
* 
*/

//TODO - Refactor after tutorial to match dynamic schema.
async function AddOrder(order)
{
	try
	{
		const pool = await sql.connect(config);
		const insertProduct = await pool.request()
			.input('Id', sql.Int, order.Id)
			.input('Title', sql.NVarChar, order.Title)
			.input('Quantity', sql.Int, order.Quantity)
			.input('Message', sql.NVarChar, order.Message)
			.input('City', sql.NVarChar, order.City)
			.execute('InsertOrders');
			
		return insertProduct.recordsets;
	}
	catch(error)
	{ 
		console.log(error);
	}
}

export { AddOrder, GetOrder, GetOrders };