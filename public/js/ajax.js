$('.plomb_form').on('submit', function (event) {
    event.preventDefault();
    let frm = $(this);
    $.ajax({
        url: '/add-to-cart',
        method: 'POST',
        data: $(this).serialize(),
        success: function (r) {
            replaceInAdd(frm);
        }
    });
});
$('.btn-remove').on('click',function (event) {
    event.preventDefault();
    $.ajax({
        url:'/delete-from-cart',
        method: 'POST',
        data: {plombName: $(this)[0].name}
    });
});
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
function replaceInAdd(frm){
    frm[0].getElementsByClassName('btn')[0].className = 'btn btnAdd';
    if(frm[0].getElementsByClassName('btn')[0].value !== 'Добавлено'){
        let count = $('.header-goods__count')[0].innerText.split(/(\s+)/)[0];
        $('.header-goods__count')[0].innerText = (Number.parseInt(count) + 1) + GetNameCount(Number.parseInt(count) + 1);
    }
    frm[0].getElementsByClassName('btn')[0].value='Добавлено';
}

