const fs = require('fs');

//  Read products.csv
const productData = fs.readFileSync('./public/csv/products.csv', 'UTF8');

//  prepaire csv data
const products = productData.split('\n');

//  Shift one line
products.shift();

/*      prepairHTML function
    This function will split the csv data to finally use it in our html
*/
const prepairHTML = function(product) {
    const splitEachProduct = record => {
        const fields = record.split(";");

        //  reads the productExample.html - a template for a product view on a website
        let html = fs.readFileSync('./views/productExample.html', 'utf-8');

        fields.forEach((field, index) => {
            // the backslash is very important, otherwise it would count the ${fields[]} an js object.
            html = html.replaceAll(`\${fields[${index}]}`, field);
        });

        //  returns the html
        return html;
    };

    const pages = products
        .filter(row => row !== "")
        .map(splitEachProduct);

    return (pages[product]);
};

module.exports = prepairHTML;