// const url="https://fakestoreapi.com/products";

// async function fetchData(){
//     try{
//         const res=await fetch(url);
//         const data=await res.json();
//         renderData(data);
//     }catch(e){
//         console.log(e);
//     }
    
// }

// fetchData();

// function renderData(data){
//     console.log(data);

                //or

(async()=>{
    const productContainerEl=document.getElementById("productContainer");
    const searchInput=document.getElementById("searchInput");


    const url="https://fakestoreapi.com/products";
    const fetchProducts=async()=>{
        try{
            const res=await fetch(url);
            return await res.json();
        }catch(e){
            return e;
        }
    };

    console.log(await fetchProducts());

    const products=await fetchProducts();

    const generateProducts=(product)=>{
        return `<div class="product_card">
        <div class="image_container">
            <img src=${product.image} alt="picture">
        </div>
        <div class="product_content">
            <h2>${product.title}</h2>
            <p>${product.description.split(" ").slice(0,20).join(" ")}</p>
            <button>$${product.price}</button>
        </div>
    </div>`
    };
    const renderProducts=(products)=>{
        productContainerEl.innerHTML="";
        products.forEach((product)=>{
            productContainerEl.innerHTML+=generateProducts(product)
        });
    };


    const checkTextContain=(text,searchText)=>{

        //kyunki  price  no  hai toh pusko pehle  to string me convert  karenge
       return  text.toString().toLowerCase().includes(searchText)
    }


    const filterHandler=(event)=>{
        const  searchText=event.target.value.toLowerCase();
        const filterProducts=products.filter((product)=>{
           
            // return ( //leking is tarike se code bhara bhara lag raha toh dedicated cuntion bana  lenge
            // product.title.toLowerCase().includes(searchText),//it  filter based n title
            // product.description.toLowerCase().includes(searchText)//it  filter based n title
            // )

            return (checkTextContain(product.description,searchText),
                    checkTextContain(product.title,searchText),
                    checkTextContain(product.price,searchText));


        });
        renderProducts(filterProducts)
    }

    searchInput.addEventListener("keyup",filterHandler)



    renderProducts(products); 

})();
