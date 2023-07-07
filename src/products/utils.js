const excelGenerator = (products,name, res) => {
    const xl = require('excel4node');
    
    products = products.map((product) => {
        let id = product._id.toString();
        delete product._id;
        return {
            id,
            ...product
        }
    })
    
    let wb = new xl.Workbook(); //genera libro en excel
    let ws = wb.addWorksheet('inventario') //genera nueva hoja

   for(let i = 1; i <= products.length; i++){
     for(let j = 1; j <= Object.values(products[0]).length;j++){
        let data = Object.values(products[i - 1])[j - 1];
        if(typeof data === 'string'){
            ws.cell(i, j).string(data)
        }else{
            ws.cell(i, j).number(data)
        }
     }
   }
   wb.write(`${name}.xlsx`, res)
}

module.exports.ProductUtills = {
    excelGenerator
}