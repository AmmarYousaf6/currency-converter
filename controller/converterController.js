const http = require('http');
const https = require('https');
const request = require('request-promise');
const axios = require('axios');
require('dotenv').config();

const getExchangeRates = async (req,res) => {
    return new Promise((resolve, reject) => {
        const getExchangeRatesApi = process.env.EXCHANGE_URL;
        http.get(getExchangeRatesApi,res=>{
            let responseData = [];
            res.on('data', fragments =>{
                responseData.push(fragments);
            });
            res.on('end', () =>{
                let data = Buffer.concat(responseData);
                resolve(JSON.parse(data))
            });
            res.on('error', error =>{
                reject(error);
            });
        });
    });
}

const getTransactions = async (req,res) => {
    //Get Exchange rates
    let getRates = await getExchangeRates();
    //Call Transactions api
    let transactionApi = Array(100).fill(process.env.GET_TRANSACTIONS);

        const urls = transactionApi;
    const promises = urls.map(url => request(url));
    let result = await Promise.all(promises).then((response)=>{
        return response.map(res=>JSON.parse(res))
    }).then((transactions) => {
        let convertedTransations = [];
        transactions.forEach(transaction => {
            let amount = transaction.amount;
            let exchangedCurrencyRate = getRates.rates[transaction.currency];
            let exchangedAmount = parseFloat((amount/exchangedCurrencyRate).toFixed(4));
            console.log(amount,transaction.currency,exchangedCurrencyRate, exchangedAmount);
            convertedTransations.push({
                createdAt : transaction.createdAt,
                currency : transaction.currency,
                amount : transaction.amount,
                convertedAmount : exchangedAmount,
                checksum : transaction.checksum,
            });
        });
        return convertedTransations;
    });
    return result;
}

const transformTransactions = async (req,res) => {
    let getTransaction = await getTransactions();
    let postTransaction = await postTransactions(getTransaction);
    res.status(200).json({
        status: 1,
        message: 'success',
        'transaction' : getTransaction,
        data : postTransaction
    });
}
const postTransactions = (transactions) => {

    return new Promise((resolve, reject) => {
        const processTransactionApi = process.env.POST_TRANSACTIONS;
        const data = {
            "transactions" : transactions
        };
        console.log(data)
        axios.post(processTransactionApi, data)
            .then(res => {
                resolve(res.data);
            });
    });
}

module.exports = {
    getExchangeRates,
    getTransactions,
    transformTransactions,
}