//Products Data Dynamically Allocated
var categories = [
    "clothing",
    "books",
    "electronics"
]
const products = [
    {id: 1, category: 'clothing', title: 'Tommy Hilfiger Solid Cotton Regular Fit Men\'s Casual Shirt', image: 'https://m.media-amazon.com/images/I/71RZBxkZPOL._SX679_.jpg', price: '$43.99'},
    {id: 2, category: 'clothing', title: 'Levi\'s Men\'s 512 Blue Slim Tapered Jeans', image: 'https://m.media-amazon.com/images/I/810vX1GAlEL._SY879_.jpg', price: '$20.99'},
    {id: 3, category: 'clothing', title: 'AERICKON Men Hoodies Long Sleeve Comfortable Hooded T-Shirts Cozy Lightweight Autumn Outfit for Athletic Party', image: 'https://m.media-amazon.com/images/I/71PYHX4-k0L._SX679_.jpg', price: '$49.99'},
    {id: 4, category: 'books', title: 'THE SILENT PATIENT [Paperback] Michaelides, Alex', image: 'https://m.media-amazon.com/images/I/81JJPDNlxSL._SY466_.jpg', price: '$12.99'},
    {id: 5, category: 'books', title: 'Dark Matter: The Most Mind-Blowing And Twisted Thriller Of The Year', image: 'https://m.media-amazon.com/images/I/81xS77gfCgL._SY466_.jpg', price: '$18.99'},
    {id: 6, category: 'books', title: 'Blood & Brown Sugar: The Ride of His Life', image: 'https://m.media-amazon.com/images/I/61pZ6Qju5FL._SY466_.jpg', price: '$14.89'},
    {id: 7, category: 'electronics', title: 'Samsung Galaxy S23 FE 5G (Mint, 8GB, 128GB Storage)', image: 'https://m.media-amazon.com/images/I/41W99DkNCYL._SX300_SY300_QL70_FMwebp_.jpg', price: '$720.99'},
    {id: 8, category: 'electronics', title: 'Samsung Galaxy Book3 Pro Intel 13th Gen i7 EvoTM 35.56cm(14") Dynamic Amoled 2X, 3K Display, 120Hz, Ultra Thin & Light Laptop(16 GB/512 GB SSD/Windows 11/MS Office/Graphite/1.17Kg), NP940XFG-KC4IN', image: 'https://m.media-amazon.com/images/I/71Dh450OVpL._SX522_.jpg', price: '$1699.99'},
    {id: 9, category: 'electronics', title: 'Samsung 138 cm (55 inches) 4K Ultra HD Smart OLED TV QA55S90CAKLXL (Titan Black)', image: 'https://m.media-amazon.com/images/I/81qzesFxZvL._SX522_.jpg', price: '$1799.99'},

];

function populateProducts(category, isFeatured = false) {
    const containerId = isFeatured ? "featured-product-container" : "product-container";
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container with ID '${containerId}' not found.`);
        return;
    }


    const categoryProducts =  products.filter(product => product.category === category);

    if (isFeatured) {
        const numberOfFeaturedProducts = 1;

        const shuffledProducts = categoryProducts.sort(() => Math.random() - 0.5);

        const featuredProducts = shuffledProducts.slice(0 , numberOfFeaturedProducts);

        featuredProducts.forEach(product => {
            const productDiv = createProductDiv(product, "featured-product");
            container.appendChild(productDiv);
        });
    }   else {
            if (categoryProducts.length > 0) {
                categoryProducts.forEach(product => {
                    const productDiv = createProductDiv(product, "product");
                    container.appendChild(productDiv);
                });
            }
            else {
                container.innerHTML = "<p>No Products are available for this category.</p>"
            }
    }

}

function createProductDiv(product, cssClass) {
    const productDiv = document.createElement("div");
    productDiv.classList.add(cssClass);

    productDiv.onclick = function () {
        redirectToProductDetails(product.id);
    };

    productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <p>${product.title}</p>
        <p>${product.price}</p>
    `;

    return productDiv;
}

function redirectToProductDetails(productId) {
    const productDetailsUrl = `product-details.html?id=${productId}`;
    window.open(productDetailsUrl, '_blank');
}

function openCategory(category) {
    populateProducts(category);
}

function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    console.log(productId);

    if (productId) {
        const productDetails = products.find(product => product.id === parseInt(productId, 10));

        const container = document.getElementById("product-details-container");
                
        container.innerHTML = `
            <h2>${productDetails.title}</h2>
            <img src="${productDetails.image}" alt="${productDetails.title}">
            <p>Price - ${productDetails.price}</p>
            <button>Add to Cart</button>
            <!-- Add more details as needed -->
        `;
    }

    else {
        console.error('Product ID not provided in the URL')
    }
}



document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes('product-details.html')) {
        // If on the product details page, load product details
        loadProductDetails();
    } else {
        // Otherwise, populate featured products on other pages
        for (var i = 0; i < categories.length; i++) {
            populateProducts(categories[i], true);
        }
    }
});