import { config } from '../config';
import sql from 'mssql';

//TODO - Follow standard import procedure and move main functionality into a Helpfully Named file EX: SQLOperations- and import that into this index.js file.
//TODO - Create Class for all operations

/**
* @description Asynchronous function for getting the entire recordset.
* 
* @param {String} A string value representing the table to search.
*/

async function QueryAll()
{
	try
	{
		const pool = await sql.connect(config);
		const query = await pool.request().query(`select * from MeatInventory`);
		return query.recordsets;
	}
	catch(error)
	{
		console.log(error);
	}
}

/**
* Asynchronous function for getting a single recordset.
* 
* @param {String} table Table name to search through
* @param {String} columnName name of column to preform search on.
* @param {Number} queryParam Query parameter.
* @return {Object} recordsets from the table
*/

async function QueryByColumn(columnName)
{
	try 
	{

		const pool = await sql.connect(config);
		const query = await pool.request()
			.query(`select ${columnName} from MeatInventory`);
		return query.recordsets;
	} 
	catch(error) 
	{
		console.log(error);
	}
}

/**
* Asynchronous function for adding an data to the database.
* 
* @param {Object} tableQuery Object containing matching keys to the column names in the table.
* @param {String} storedProcedure String value containing the name of the stored procedure to execute.
* @return {Object} Returns the record set from the table.
*/

//TODO - Refactor after tutorial to match dynamic schema.
async function AddToTable(tableQuery)
{
	try
	{
		const columns = [];
		const values = [];

		for(const key in tableQuery) 
			columns.push(key);

		for (const key in tableQuery)
			values.push(tableQuery[key]);

		
		const pool = await sql.connect(config);
		const query = await pool.request()
			.input(columns[0], sql.Int, values[0])
			.input(columns[1], sql.NVarChar, values[1])
			.input(columns[2], sql.Int, values[2])
			.input(columns[3], sql.NVarChar, values[3])
			.query(`insert into MeatInventory values (${columns[0], columns[1], columns[2], columns[3]})`);

		return query.recordsets;
	}
	catch(error)
	{ 
		console.log(error);
	}
}

export { AddToTable, QueryByColumn, QueryAll };