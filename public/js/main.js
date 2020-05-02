$(document).click('.search__icon',function () {
    svg4everybody({});

    let openSerchForm = () => {
        if (document.getElementsByClassName('search--open').length === 0) {
            $(document).on('click', '.search__icon', function () {
                $(this).parent().addClass('search--open');
            });
        } else {
            $(document).on('click', '.search__icon', function () {
                $(this).parent().removeClass('search--open');
            });
        }
    };

    let clearSerchForm = () => {
        $(document).on('click', '.search__clear', function () {
            $('.search__input').val('');
        });
    };
    let clearSerchFormCall = () => {
        $(document).on('click', '.search__clear', function () {
            $('.call-menu__input').val('');
        });
    };
    openSerchForm();
    clearSerchForm();
    clearSerchFormCall();
});
$(document).ready(function () {
    svg4everybody({});

    let tabs = function () {
        $('.tabs-navigation__item').click(function () {
            let tabName = $(this).attr('show-tab'),
                tabsBody = $(this).closest('.tabs').find('.tabs__body')[0],
                tab = $(tabsBody).find('.' + tabName);
            $(this).addClass('tabs-navigation__item--active').siblings()
                .removeClass('tabs-navigation__item--active');
            $(tab).addClass('tab--active').siblings()
                .removeClass('tab--active');
            if($(tabsBody).find('.js-products-line-slider').length){
                $('.js-products-line-slider').each(function () {
                    $(this).slick('refresh');
                });
                $('.js-product-prev__slider').each(function () {
                    $(this).slick('refresh');
                });
            }
        });
    };
    let productPrevSlider = function(){
        $('.js-product-prev__slider').each(function (idx) {
            let productPrevSliderId = "product-prev-slider-" + idx;
            this.closest('.product-prev').classList.add(productPrevSliderId);
            $(this).slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: false,
                appendDots: '.' + productPrevSliderId + ' .product-prev__colors',
                swipe: false,
                infinite: false,
                customPaging: function (slider, i) {
                    let color = $(slider.$slides[i]).data('color');
                    return '<div class="product-prev__color" style="background-color: ' + color + '"></div>'
                }
            });
        });
    };
    //na mobil. will slider:
    let productLineSlider = function () {
        $('.js-products-line-slider').each(function (idx) {
            let productLineSliderId = "products-line-slider-" + idx;
            this.closest('.products-line-slider').id = productLineSliderId;
            $(this).slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
                dots: true,
                appendDots: '#' + productLineSliderId + ' .products-line-slider__dots',
                prevArrow: '#' + productLineSliderId + ' .products-line-slider__btn--prev',
                nextArrow: '#' + productLineSliderId + ' .products-line-slider__btn--next',
                customPaging: function (slider, i) {
                    return '<div class="products-line-slider__dot"></div>'
                },
                responsive: [
                    {
                        breakpoint: 1139,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 850,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 800,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            })
        });
    };
    let mobileMenu = function () {
        $(document).on('click','.mobile-menu__toogle', function () {
            $(this).parent().addClass('mobile-menu--open');
        });
        $(document).on('click', '.mobile-menu__close', function () {
            $(this).closest('.mobile-menu').removeClass('mobile-menu--open');
        })
    };
    let callMenu = function () {
        $(document).on('click','.header__link', function () {
            $(this).parent().addClass('call-menu--open');
            // $(this).closest('.mobile-menu').removeClass('mobile-menu--open');
        });
        $(document).on('click', '.call-menu__close', function () {
            $('.call-menu').removeClass('call-menu--open');
        });
        $(document).on('click','.header__link-helper', function () {
            $('.call-menu-helper').addClass('call-menu--open');
            // $(this).closest('.mobile-menu').removeClass('mobile-menu--open');
        });
        $(document).on('click', '.call-menu__close', function () {
            $('.call-menu').removeClass('call-menu--open');
        })
    };
    let productSlider = function () {
        $('.js-product-slider-dots').slick({
            asNavFor: '.js-product-slider',
            slidesToShow: 2,
            slidesToScroll: 1,
            vertical: true,
            prevArrow: '.product-slider-dots__btn--prev',
            nextArrow: '.product-slider-dots__btn--next',
            focusOnSelect: true,
            infinite:false
        });

        $('.js-product-slider').slick({
            asNavFor: '.js-product-slider-dots',
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            infinite:false
        });
    };
    let colorClick = function () {
        $(document).on('click','.color-list__item', function () {
            $(this).addClass('color-list__item--active').siblings().removeClass('color-list__item--active');
        })
    };
    let productDetailWidth = function () {
        let detailArr = $('.product-details-navigation__item'),
            detailWidth =0;
        for (let i=0; i< detailArr.length; i++){
            detailWidth = detailWidth + detailArr[i].offsetWidth;
        }
        $('.product-details-navigation').css('min-width', detailWidth);
    };
    let productFooterTablet = function () {
        if(window.innerWidth < 1140){
            $('.product-info__footer').appendTo('.product__header');
            $('.product-info__header').prependTo('.product__header');
        }else if(window.innerWidth > 1140){
            $('.product-info__header').prependTo('.product-info');
        }
    };

    //polifils IE
    (function () {
        if(!Element.prototype.closest){
            Element.prototype.closest = function (css) {
                let node = this;
                while(node){
                    if (node.matches(css)) return node;
                    else node = node.parentElement;
                }
                return null;
            } ;
        }
    })();
    (function () {
        if(!Element.prototype.matches){
            Element.prototype.matches = Element.prototype.matchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector;
        }
    })();

    tabs();
    productPrevSlider();
    productLineSlider();
    mobileMenu();
    callMenu();
    productSlider();
    colorClick();
    // productDetailWidth();
    //productFooterTablet();

    /**********************************************************
                    OTHER SCRIPTS
     ********************************************************/

    /**    SCROLLING  */
    $('a[href*="#"]').on('click', function (e) {
        let anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 1000);
        let tabName = $(anchor.attr('href')).attr('show-tab'),
            tabsBody = $(anchor.attr('href')).closest('.tabs').find('.tabs__body')[0],
            tab = $(tabsBody).find('.' + tabName);
        console.log(tabName);
        $(anchor.attr('href')).addClass('tabs-navigation__item--active').siblings()
            .removeClass('tabs-navigation__item--active');
        $(tab).addClass('tab--active').siblings()
            .removeClass('tab--active');
        if($(tabsBody).find('.js-products-line-slider').length){
            $('.js-products-line-slider').each(function () {
                $(this).slick('refresh');
            });
            $('.js-product-prev__slider').each(function () {
                $(this).slick('refresh');
            });
        }
        e.preventDefault();
    });




});
$(window).resize(function(){
    if (window.matchMedia('(max-width: 1140px)').matches) {
        $('.product-info__footer').appendTo('.product__header');
        $('.product-info__header').prependTo('.product__header');
    } else {
        $('.product-info__header').prependTo('.product-info');
        $('.product-info__footer').appendTo('.product-info__body');
    }
});

















