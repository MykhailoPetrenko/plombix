if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}
function ready() {
    updateCartTotal();
    let removeButtons = document.getElementsByClassName('btn-remove');
    for (let i = 0; i < removeButtons.length; i++) {
        let button = removeButtons[i];
        button.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChange);
    }
}

function removeCartItem(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal()
}
function quantityChange(event) {
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0 || input.value >= 200000){
        input.value = 1;
    }
    updateCartTotal();
}
function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let total = 0;
    for(let i=0; i<cartRows.length; i++){
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        let price = parseFloat(priceElement.innerText);
        let quantity = quantityElement.value;
        total = Math.floor((total + (price * quantity))*100)/100;
        //total = (total + (price * quantity));
    }
    //total = Math.round(total * 100)/100;
    document.getElementsByClassName('header-goods__price')[0].innerHTML = total + " ₴";
    document.getElementsByClassName('header-goods__count')[0].innerHTML = cartRows.length + GetNameCount(cartRows.length);
    document.getElementsByClassName('cart-total-price')[0].innerText = total + " грн";
}
/**
 * @return {string}
 */
function GetNameCount(len) {
    if(len === 1)
        return ' товар';
    if(len >1 && len < 5)
        return ' товара';
    else return ' товаров'
}

$('.btn-purchase').on('click', function (e) {
    if($('.cart-row').length>1) {
        $('.s-cart').fadeOut(800, function () {
            $('.s-cart').css({display: "none", display: 'block'}).slideUp();
            $('.btn-purchase').css('display', 'none');
            $('.cart-items').addClass('cart-items-purchace')
                .appendTo('.purchase-wrapper');
            $('.form-style-5, .cart-items').css({display: 'block', display: "none"}).slideDown();
            $('html,body').stop().animate({scrollTop: $('#purchace').offset().top - 23}, 1000);

        });
        e.preventDefault();
    }else{
        Toast.add({
            text: 'Корзина пуста...',
            color: '#a74e37',
            autohide: true,
            delay: 3000
        });
    }
});
$('.btn-purchase-main').on('click', function () {
    if($('.cart-row').length > 1){

    }else{
        Toast.add({
            text: 'Корзина пуста...',
            color: '#a74e37',
            autohide: true,
            delay: 3000
        });
    }
});


