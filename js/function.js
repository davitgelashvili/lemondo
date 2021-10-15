$(document).ready(function(){
    let fav = [];
    let domains = []
    let cat = []

    fetchFunction('js/domainList.json', 'domains');
    fetchFunction('js/categories.json', 'categories');

    function fetchFunction(link, name){
        fetch(link)
        .then(response => response.json())
        .then(json => {
            if(name == 'domains'){
                json.map( item=> {
                    domains.push(item);
                })
            }

            if(name == 'categories'){
                json.map( item=> {
                    cat.push(item);
                })
            }

            domainList();
            categoriesList()
            // itemId()
        });
    }

    // json.filter(function (item, key) {
    //     if(item.price > minPrice && item.price < maxPrice) {
    //         Item(item, key)
    //     }

    //     if($('.categories__item--input').data('id') == item.categories[0] || $('.categories__item--input').data('id') == item.categories[1]) {
    //         Item(item, key)
    //     }
    // });

    // function itemId(id){
    //     domainList(id)
    // }

    // $('.categories').on('change', '.categories__item--input', function() {
    //     if ($(this).is(":checked")) {
    //         let id = $(this).data('id')
    //         itemId(id)
    //     }
    // })



    function domainList(id){
        $('.domains__list').html('')
        domains.map((item, key)=>{
            if(item.price > $('#minPrice').val() && item.price < $('#maxPrice').val()) {
                domainItem(item, key)
            }
            
            if($('.categories__item--input').is(":checked")){
                $('.categories__item--input').on( function() {
                    let zone = $(this).data('zone')
                    console.log(this)
                    if(zone == item.domainExtension){
                        console.log('dsds',zone == item.domainExtension)
                        domainItem(item, key)
                    }  
                })
            }
        })
    }

    function categoriesList(){
        cat.map((item, key)=>{
            categoriesItem(item, key);
            console.log(item)
        })
    }

    // function price(item){
    //     if(item.price > minPrice && item.price < maxPrice) {
    //         domainItem(item, key)
    //     }
    // }

    // function ragaca(item, key){
    //     $('.categories').on('change', '.categories__item--input', function() {
    //         if ($(this).is(":checked")) {
    //             console.log($(this).data('id'))
    //             // fetchFunction('js/domainList.json', 'domains');
    //             if($(this).data('id') == item.categories[0] || $(this).data('id') == item.categories[1]) {
    //                 cat.push(item)
    //                 console.log(cat)
    //             }
    //         }
    //     })
    // }

    // function domainCategories(data){
    //     data.map( items=> {
    //         items.categories.filter( item=> {
    //             $('.categories').on('change', '.categories__item--input', function() {
    //                 if ($(this).is(":checked")) {
    //                     item.filter( i=> {
    //                         console.log(i)
    //                     })
    //                 }
    //             })
    //         })
    //     })
    // }

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
    $('.filter').submit(function( event ) {
        event.preventDefault();
        domainList()
    });


})