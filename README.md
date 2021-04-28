
## Currency Converter

Currency Converter will allow users convert transactions to different currencies. To create a working converter:
 1. Get original transactions from the Transactions service endpoint (example request and response below)
 2. Use Exchange rates api or similar API to get exchange rates
 3. Convert transactions. The conversion result should have no more than 4 decimal points, also check that the type is a float.
 4. Post your converted transactions as array of objects to Process transactions endpoint

----------

# Getting started

## Installation

Please check the official Node installation guide for server requirements before you start. [Official Documentation](https://nodejs.org/en/docs/)

Clone the repository

    git clone https://github.com/AmmarYousaf6/currency-converter

Switch to the repo folder

    cd currency-converter

Install all the dependencies using composer and install NPM packages

    npm install

Make the required configuration changes in the .env file

    nano .env


Start the local development server

    npm start

You can now access the server at http://localhost:3000

**TL;DR command list**

    git clone git clone https://github.com/AmmarYousaf6/currency-converter
    cd currency-converter
    npm install
    nano .env

**Make sure you set the correct server connection information before running the server** [Environment variables](#environment-variables)

    npm start
    
The api can now be accessed at

    http://localhost:3000/converter/send-transactions

----------

## Environment variables

- `.env` - Environment variables can be set in this file


----------

# Test Case

Run the node development server

    npm start

Run the test

    npm test  

----------

# Testing API

Run the laravel development server

    npm start


Request headers

| **Required** 	| **Key**              	| **Value**            	|
|----------	|------------------	|------------------	|
| Yes      	| Content-Type     	| application/json 	|   	|


----------
