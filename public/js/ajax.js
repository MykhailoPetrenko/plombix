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
$('select').on('change',function () {
    let sity = $("option:selected", this).text();
    getData(sity);
});
// $('.change_lang').on('click', function (event) {
//     event.preventDefault();
//     $.ajax({
//         url: $(this).attr('href'),
//         method: 'GET',
//         success:function (data) {
//             console.log(data)
//         }
//     });
// });
function getData(sity) {
    let mainData;
    $.ajax({
        url:'/get-data-post',
        method:'GET',
        data:{sity : sity},
        success:function (data) {
            mainData = data.city;
            autocompleteCity(mainData);
        }
    });
}
function autocompleteCity(mainData) {
    $('#address').autocomplete({
        source:  function(request, response) {
            let results = $.ui.autocomplete.filter(mainData, request.term);
            response(results.slice(0, 10));
        }
    });
}

/**
  $("#auto").autocomplete({
    source: function(request, response) {
        var results = $.ui.autocomplete.filter(myarray, request.term);

        response(results.slice(0, 10));
    }
});
 */

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
        frm[0].getElementsByClassName('btn')[0].value='Добавлено';
        Toast.add({
            text: 'Добавлено: ' + frm.parent()[0].innerText.split('\n')[0],
            color: '#28a745',
            autohide: true,
            delay: 3000
        })
    }
}

/**
 * {
 "apiKey": "api key",
 "modelName": "Address",
    "calledMethod": "getWarehouses",
    "methodProperties": {
        "CityName": "Київ",
        "FindByString":"П"
    }
}
 */

