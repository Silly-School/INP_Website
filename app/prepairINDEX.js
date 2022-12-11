"use strict";

// get all needed dependencies
const fs = require('fs');

//  Read products.csv, split at \n and shift one line.
const productData = fs.readFileSync('./public/csv/products.csv', 'UTF8');
const products = productData.split('\n');
products.shift();

/*
    prepairIndex function
    This function will split the csv data to finally use it in our index.html
*/
const prepairINDEX = function() {

    const splitEachProduct = record => {
        const fields = record.split(";");

        //  prepaires code to insert into the index.js
        let productSnippet = `
            <div>
                <img width="100%" src="${fields[4]}">
                <h3>${fields[0]}</h3>
                <section class="categoryTags">
                    <p>${fields[6]}</p>
                    <p>${fields[7]}</p>
                    <p>${fields[8]}</p>
                </section>
                <hr>
                <a href="{redirect}"><button>View Game!</button></a>
            </div>
        `;

        fields.forEach((field, index) => {
            // the backslash is very important, otherwise it would count the ${fields[]} an js object.
            productSnippet = productSnippet.replaceAll(`\${fields[${index}]}`, field);
        });

        //  relaces the {redirect} the lowercase and space = ' ' variant for routing
        //  eg. Anno 1800 turns into anno-1800
        productSnippet = productSnippet.replaceAll('{redirect}', fields[0].toLowerCase().replace(/ /g, "-"));

        //  returns the html
        return productSnippet;
    };

    const pages = products
        .filter(row => row !== "")
        .map(splitEachProduct);

    //  reads the index.js and replaces ${insertGames} with the prepaired data above
    const html = fs.readFileSync('./views/index.html', 'utf-8');
    let data = ``;

    pages.forEach(site => {
        data = data + site;
    });

    return (html.replace('${insertGames}', data));
};

module.exports = prepairINDEX;