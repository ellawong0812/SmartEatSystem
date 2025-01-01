// When we create Promise, it run the code inside immediately
// resolve controls when to go to the next step
// The use of resolve(): we only move to the next line when loadProduct() is finished
// Promise can be used to replace callback
new Promise((resolve) => {
    loadProduct(()=>{
        resolve('value1');
    });
}).then((value)=>{
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        })
    })
}).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});

loadProduct()=>{
    console.log("Load Product")
}

loadProducts(()=>{
    loadCart(()=>{
        renderOrderSummary();
        renderPaymentSummary();
    });
});

Promise.all([
    new Promise((resolve) => {
        loadProduct(()=>{
            resolve('value1');
        }),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        })
    })
]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});

// HTTP request
// "fetch" would send request to the backend
// go to the next step only after sending request and get the response
// save the response into the paramter in then()
// calling fetch() which creates promise and then we save the promise into the variable "promise"
export function loadProductFetch(){
    const promise = fetch("link").then((response)=>{
        return response.json(); //Promise
    }).then((responseContainsProductData)=>{
        // json automatically convert into string
        products=responseContainsProductData.map((productDetail)=>{
            if (productDetail.type=='clothing'){
                return new Clothing(productDetail);
            }
            return new Product(productDetail);
        });
        console.log('load products');
    });
    return promise;
}

loadProductFetch().then(()=>{
    console.group('next step');
});