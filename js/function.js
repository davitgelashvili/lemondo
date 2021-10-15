$(document).ready(function(){
    let fav = [];
    let domainExtension = new Array()
    let cat = []

    fetchDomain('js/domainList.json');
    fetchCategories('js/categories.json');

    function fetchDomain(link){
        $('.domains__list').html('')
        fetch(link)
        .then(response => response.json())
        .then(json => {
            json.map( (item, key)=> {
                domainExtension.push(item);
                domainItem(item, key)
            })
        });
    }

    function fetchCategories(link){
        fetch(link)
        .then(response => response.json())
        .then(json => {
            json.map( (item, key)=> {
                categoriesItem(item, key);
            })
        });
    }

    $('.filter').on('change', 'input', function(event) {
        if(true){
            $('.domains__list').html('');
            domainExtension.map((item, key)=>{
                console.log(item.price > $('#minPrice').val() && item.price < $('#maxPrice').val())
                if(item.price > $('#minPrice').val() && item.price < $('#maxPrice').val()){
                    domainItem(item, key)
                }
            })
        }

        if($(this).data('zone') && $(this).is(":checked")){
            $('.domains__list').html('')
            domainExtension.map((item, key)=>{
                if(item.domainExtension == $(this).data('zone')){
                    domainItem(item, key)
                }
            })
        }
    })

    // select categories vizual
    function categoriesItem(item, key){
        $('.categories').append(`
            <label class="categories__item d-flex align-items-center">
                <div class="categories__item--checked"></div>
                <input type="checkbox" class="categories__item--input" data-id="${item.id}">
                <div class="categories__item--title">
                    ${item.name}
                </div>
            </label>
        `)
    }

    // domain item visual
    function domainItem(item, key){
        $('.domains__list').append(`
            <div class="domains__item d-flex justify-content-between align-items-center" data-id="${key}">
                <div class="d-flex align-items-center">
                    <figure class="domains__item--icon">
                        <img src="img/svg/Btn_send.svg" class="show-icon" alt="">
                        <img src="img/svg/Btn_send-green.svg" class="hiden-icon" alt="">
                    </figure>
                    <div class="domains__item--title">
                        ${item.domainName}${item.domainExtension}
                    </div>
                </div><!-- end left -->
                <div class="d-flex align-items-center">
                    <div>
                        <div class="domains__item--price big">
                            ${item.price} ₾
                        </div>
                        <div class="domains__item--price smoll">
                            14 000 ₾
                        </div>
                    </div>
                    <div class="domains__item--btn d-flex align-items-center">
                        <div class="domains__item--btn-add align-items-center" data-key="${key}">
                            <p class="domains__item--add-text">დამატება</p>
                            <img src="img/svg/addbox.svg" alt="">
                        </div>
                        <div class="domains__item--btn-delete align-items-center">
                            +
                            <p class="domains__item--delete-text">კალათაშია</p>
                        </div>
                    </div>
                </div><!-- end right -->
            </div>
        `)
    }

    // favorite
    $('.domains__list').on('click', '.domains__item--btn-add', function() {
        $(this).css('display','none')
        $(this).parent().find('.domains__item--btn-delete').css('display','flex')

        let key = $(this).data('key')
        fav.push(key)
        $('.header__top--favorite-text').html(fav.length);
    })

    // range slide
    $( ".slide__range--js" ).slider({
        range: true,
        min: 0,
        max: 1200,
        values: [ 0, 1000 ],
        slide: function( event, ui ) {
            let inputCount = $(this).parent().parent().find('.input__form');
            for (i = 0 ; i < inputCount.length; i++){
                inputCount[i].value = ui.values[i]
            }
        }
    });

    // submit
    // $('.filter').submit(function( event ) {
    //     event.preventDefault();
    //     domainList()
    // });

})