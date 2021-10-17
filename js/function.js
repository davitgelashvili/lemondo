$(document).ready(function(){
    // favorites data
    let fav = [];

    //item data
    let array = [
    ];

    // filter
    let filters = {
        text: null,
        priceMin: null,
        priceMax: null,
        symbolMin: null,
        symbolMax: null,
        categories: [],
        zone: [],
    }

    let data = (link, name) => {
        fetch(link)
        .then(response => response.json())
        .then(json => {
            json.forEach( (item, key)=> {
                if(name == 'domains'){
                    array.push(item)
                    domainItem(item, key)
                }

                if(name == 'categories') {
                    categoriesItem(item, key)
                }
            })
        });
    }
    data('js/domainList.json', 'domains');
    data('js/categories.json', 'categories');

    // filter func
    let filterDomains = () =>{
        var text =  $("[name='text']").val();

        // min & max price value
        var priceMin =  $("[name='minprice']").val();
        var priceMax = $("[name='maxprice']").val();

        // min & max symbol value
        var symbolMin =  $("[name='minsymbol']").val();
        var symbolMax = $("[name='maxsymbol']").val();

        // get checked
        var zones = $("[name='zone']:checkbox:checked").map(function(){
            return $(this).data('zone');
        }).get();  

        var categories = $("[name='categories']:checkbox:checked").map(function(){
            return $(this).data('id');
        }).get();  
        
        let filtered =  array.filter(item => 
            (!text || item.domainName == text) &&
            (!priceMin || item.price >= priceMin) &&
            (!priceMax || item.price <= priceMax) &&
            (!symbolMin || item.domainName.length >= symbolMin) &&
            (!symbolMax || item.domainName.length <= symbolMax) &&
            (!zones.length || zones.some(zone => zone == item.domainExtension)) &&
            (!categories.length || categories.some((categorie, key) => categorie == item.categories[key]))
        )

        // clear html element
        $('.domains__list').html('');
 
        return filtered.map ( (item, key) => domainItem(item, key));
    }

    // input change
    $('.filter').on('change', 'input', function(event) {
        filters.name =  $("[name='text']").val();
        filters.minPrice =  $("[name='minprice']").val();
        filters.maxPrice = $("[name='maxprice']").val();

        filters.minPrice =  $("[name='minsymbol']").val();
        filters.maxPrice = $("[name='maxsymbol']").val();
        
        // call filter func 
        filterDomains();
    })

    // select categories vizual
    var categoriesItem = (item) => {
        $('.categories').append(`
            <label class="categories__item d-flex align-items-center">
                <div class="categories__item--checked"></div>
                <input type="checkbox" name="categories" class="categories__item--input" data-id="${item.id}">
                <div class="categories__item--title">
                    ${item.name}
                </div>
            </label>
        `)
    }

    // domain item visual
    var domainItem = (item, key) => {
        $('.domains__list').append(`
            <div class="domains__item d-flex justify-content-between align-items-center">
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
        $(this).hide();
        $(this).parent().find('.domains__item--btn-delete').css('display','flex')

        let key = $(this).data('key')
        fav.push(array[key] )
        localStorage.setItem('fav', JSON.stringify(fav) );
        $('.header__top--favorite-text').html(JSON.parse(localStorage.fav).length);
    })

    localStorage.fav ? $('.header__top--favorite-text').html(JSON.parse(localStorage.fav).length) : '';

    $('.header__top--favorite').on('click', function() {
        let favoriteDAta = localStorage.fav ? JSON.parse(localStorage.fav) : '';
        $('.domains__list').html('');
        localStorage.fav ? favoriteDAta.map( (item, key)=> {
            domainItem(item, key)
            console.log(item)
        }) : filterDomains();;
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
                inputCount[i].value 
            }
        }
    });
})
