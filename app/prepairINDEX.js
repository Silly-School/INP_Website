const fs = require('fs');

//  Read products.csv
const productData = fs.readFileSync('./public/csv/products.csv', 'UTF8');

//  prepaire csv data
const products = productData.split('\n');

//  Shift one line
products.shift();

/*      prepairIndex function
    This function will split the csv data to finally use it in our index.html
*/
const prepairINDEX = function() {

    const splitEachProduct = record => {
        const fields = record.split(";");

        //  reads the productExample.html - a template for a product view on a website
        let productSnippet = `
            <div>
                <img width="100%" src="${fields[4]}">
                <h3>${fields[0]}</h3>
                <p>${fields[1]}</p>
                <hr>
                <a href="{redirect}"><button>View Game!</button></a>
            </div>
        `;

        fields.forEach((field, index) => {
            // the backslash is very important, otherwise it would count the ${fields[]} an js object.
            productSnippet = productSnippet.replaceAll(`\${fields[${index}]}`, field);
        });

        productSnippet = productSnippet.replaceAll('{redirect}', fields[0].toLowerCase().replace(/ /g, "-"));
        //  returns the html
        return productSnippet;
    };

    const pages = products
        .filter(row => row !== "")
        .map(splitEachProduct);

    const html = fs.readFileSync('./views/index.html', 'utf-8');
    let data = ``;

    pages.forEach(site => {
        data = data + site;
    });

    return (html.replace('${insertGames}', data));
};

module.exports = prepairINDEX;