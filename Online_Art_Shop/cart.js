document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.getElementById("icart");
    const cartContainer = document.querySelector(".cart-container");
    const cartClose = document.getElementById("cart-close");
    const cartContent = document.querySelector(".cart-content");
    const cartCount = document.getElementById("cart-count");
    const totalPriceEl = document.querySelector(".total-price");

    let productList = [];

    cartIcon.addEventListener("click", () => {
        cartContainer.classList.add("cart-active");
    });

    cartClose.addEventListener("click", () => {
        cartContainer.classList.remove("cart-active");
    });

    function attachEventListeners() {
        // Attach event listeners for existing cart items
        document.querySelectorAll(".cart-remove").forEach(btn => {
            btn.addEventListener("click", removeParent);
        });

        document.querySelectorAll(".cart-quantity").forEach(input => {
            input.addEventListener("change", quantityBox);
        });

        // Attach event listeners for add to cart buttons
        document.querySelectorAll(".btn-cart").forEach(btn => {
            btn.addEventListener("click", addToCart);
        });
    }

    function removeParent() {
        const productTitle = this.parentElement.querySelector(".cart-food-title").innerText;
        productList = productList.filter(item => item.productTitle !== productTitle);
        this.parentElement.remove();
        updateTotal();
    }

    function quantityBox() {
        const quantity = parseInt(this.value);
        if (isNaN(quantity) || quantity < 1) {
            this.value = 1;
        }
        const productTitle = this.parentElement.querySelector(".cart-food-title").innerText;
        const product = productList.find(item => item.productTitle === productTitle);
        if (product) {
            product.quantity = parseInt(this.value);
            updateTotal();
        }
    }

    function addToCart() {
        const product = this.parentElement;
        const productTitle = product.querySelector(".product-title-link").innerText;
        const productPrice = product.querySelector(".price").innerText.replace('Rs.', '');
        const productImg = product.querySelector(".product-img").src;
        const price = parseFloat(productPrice);

        let existingProduct = productList.find(item => item.productTitle === productTitle);

        if (existingProduct) {
            existingProduct.quantity += 1;
            updateCartItem(existingProduct, price);
        } else {
            let newProduct = { productTitle, productPrice: `Rs.${price}`, productImg, quantity: 1 };
            productList.push(newProduct);

            const newDiv = document.createElement("div");
            newDiv.innerHTML = createCartProduct(productTitle, `Rs.${price}`, productImg, 1);
            cartContent.append(newDiv);
        }

        attachEventListeners();
        updateTotal();
    }

    function createCartProduct(productTitle, productPrice, productImg, quantity) {
        const price = parseFloat(productPrice.replace('Rs.', ''));
        return `
            <div class="cart-box">
                <img src="${productImg}" class="cart-img">
                <div class="detail-box">
                    <div class="cart-food-title">${productTitle}</div>
                    <div class="price-box">
                        <div class="cart-price">${productPrice}</div>
                        <div class="cart-amt">Rs.${(price * quantity).toFixed(2)}</div>
                    </div>
                    <input type="number" value="${quantity}" class="cart-quantity">
                </div>
                <i name="trash" class="bi bi-trash cart-remove"></i>
            </div>
        `;
    }

    function updateCartItem(product, price) {
        const cartItem = [...cartContent.children].find(
            item => item.querySelector('.cart-food-title').innerText === product.productTitle
        );
        if (cartItem) {
            const quantityInput = cartItem.querySelector('.cart-quantity');
            const newQuantity = product.quantity;
            quantityInput.value = newQuantity;
            cartItem.querySelector('.cart-amt').innerText = `Rs.${(price * newQuantity).toFixed(2)}`;
        }
    }

    function updateTotal() {
        const cartItems = document.querySelectorAll('.cart-box');
        let total = 0;

        cartItems.forEach(product => {
            const priceElement = product.querySelector('.cart-price');
            const price = parseFloat(priceElement.innerText.replace("Rs.", ""));
            const quantity = parseInt(product.querySelector('.cart-quantity').value);
            total += (price * quantity);
            product.querySelector('.cart-amt').innerText = "Rs." + (price * quantity).toFixed(2);
        });

        totalPriceEl.innerText = 'Rs.' + total.toFixed(2);
        cartCount.innerText = cartItems.length;
        cartCount.style.display = cartItems.length === 0 ? "none" : "block";
    }

    // Initial attachment of event listeners
    attachEventListeners();
});
