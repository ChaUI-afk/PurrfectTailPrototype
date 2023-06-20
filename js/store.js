    // CHECK IF THE document is ready
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready(){
    //Accordion Button
    const accordion = document.getElementsByClassName('accordion');
    for(let i = 0; i < accordion.length; i++){
        let accordionBtn = accordion[i];
        accordionBtn.addEventListener('click', accordionToggle);
    }
    //Cart Button


    let cartBtn = document.getElementsByClassName('shopping-cart');
    cartBtn[0].addEventListener('click', showCart);
    //Remove Button
    let removeBtn = document.getElementsByClassName('btn-remove');
    for(let i = 0; i < removeBtn.length; i++){
        let button = removeBtn[i];
        button.addEventListener('click', removeItem);
    }
    //Quantity Input Change
    let quantityChange = document.getElementsByClassName('cart-quantity-input');
    for(let i = 0; i < quantityChange.length; i++){
        let quantity = quantityChange[i];
        quantity.addEventListener('change', quantityUpdate);
    }
    //Add To Cart Button
    let addToCartButtons = document.getElementsByClassName('add-to-cart-btn');
    for(let i = 0; i < addToCartButtons.length; i++){
        let button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }
    //Purchase Button
    let purchaseBtn = document.getElementsByClassName('btn-purchase');
    purchaseBtn[0].addEventListener('click', purchaseSuccess);

}

function purchaseSuccess(){
    let cartItems = document.getElementsByClassName('cart-items')[0];
    if(cartItems.hasChildNodes()){
        alert('Thank you for your purchase!');
        while(cartItems.hasChildNodes()){
            cartItems.removeChild(cartItems.firstChild);
        }
        updateCartTotal();
    } else {
        alert("You don't have anything on your cart!")
    }
}

function addItemToCart(name, image, price){
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartItemNames = cartItems.getElementsByClassName('cart-item-name');
    for(let i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == name){
            alert('This is already added in your cart');
            return
        }
    }
    let cartRowContent = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${image}" width="100" height="100">
            <span class="cart-item-name">${name}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input type="number" class="cart-quantity-input" value="1">
            <button type="button" class="btn-remove">REMOVE</button>
        </div>`;
    cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityUpdate);
}

function addToCartClicked(event){
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let name = shopItem.getElementsByClassName('shop-item-name')[0].innerText;
    let image = shopItem.getElementsByClassName('shop-item-image')[0].src;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    console.log(name, image, price);

    addItemToCart(name, image, price);
    updateCartTotal();
}

function quantityUpdate(event){
    let input = event.target;
    if(input == isNaN || input.value <= 0){
        input.value = 1;
        alert('You cannot have negative number of Items!')
    }
    updateCartTotal();
}

function updateCartTotal(){
    let total = 0;
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-row');
    for(let i = 0; i < cartRows.length; i++){
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        let price = parseFloat(priceElement.innerText.replace('₱', ''));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = total.toFixed(2);
    document.getElementsByClassName('cart-total-price')[0].innerText = '₱' + total;
}

function removeItem(event){
    let button = event.target;
    button.parentElement.parentElement.remove();
    updateCartTotal();
}

function accordionToggle(){
    this.classList.toggle('active');
}

function showCart(){
    this.classList.toggle('active');
    let block = document.getElementsByClassName('shopping-cart-block')[0];
    block.style.width = "min(100% - 2.5rem, 75rem)";
    block.style.height = "75%";

    let toBeBlurred = document.getElementsByTagName('body')[0];
    let children = toBeBlurred.children;
    for(let i = 0; i < children.length; i++){
        let blurBgContent = children[i];
        console.log(blurBgContent);
    }
}




