$(document).ready(function () {

    nav();
    navMob();
    visualSlide();
    kindMenu();
    tabMenu02();
    resizeEvent();
    newsSlide();
    bannerSlide();

    $(document).scroll(function(){
        headerfix();
    });

    noclick();
    youtube();

})

function youtube(){
    var src1 = "https://www.youtube.com/embed/caFdBkLUjiA";
    var src2 = "https://www.youtube.com/embed/R4CRmTIpwfU";
    var src3 = "https://www.youtube.com/embed/SO8tTm_41Ls";

    $('.youtube .y-block').click(function(){
        if($(this).hasClass('yb1')){
            $('.youtube .y-left iframe').attr('src', src1);
        }else if($(this).hasClass('yb2')){
            $('.youtube .y-left iframe').attr('src', src2);
        }else if($(this).hasClass('yb3')){
            $('.youtube .y-left iframe').attr('src', src3);
        }
        return false;
    });
}

function noclick(){
    $('.h-container a').click(function(){return false;});
    $('.visual a').click(function(){return false;});
    $('.medi-team a').click(function(){return false;});
    $('.medi-kind a').click(function(){return false;});
    $('.review a').click(function(){return false;});
    $('.news a').click(function(){return false;});
    // $('.youtube a').click(function(){return false;});
    // $('.location a').click(function(){return false;});
    $('.reservation a').click(function(){return false;});
}

function headerfix(){
    var scrollH = $(document).scrollTop();
    if(scrollH > 0){
        $('.h-container').addClass('fixed');
    }else{
        $('.h-container').removeClass('fixed');
    }
}

function nav() {
    //menu
    var menu = $('.gnb').children();
    var submenu = $('.submenu');

    menu.on('mouseenter', function () {
        $(this).children(submenu).stop().animate({ 'opacity': 1 }, 150)

    })
    menu.on('mouseleave', function () {
        submenu.stop().animate({ 'opacity': 0 }, 150);
    })
}
function navMob(){
    $('.gnb-mob-wrapper').addClass('on');
    var openBtn = $('.nav-bar')
    var closeBtn = $('.close-wrapper')

    var mobMenu = $('.gnb-mob-wrapper .white_bg');
    var menuWidth = mobMenu.innerWidth();
    var gnb = $('.gnb-mob').children('li').children('a')
    var winWidth
    var menuRwdWidth
    $('.gnb-mob-wrapper').removeClass('on');

    mobMenu.css({'margin-left':-menuWidth});

    openBtn.on('click', function(){
       $('.gnb-mob-wrapper').addClass('on');
       mobMenu.stop().animate({'margin-left':'0'},300);
    });
    closeBtn.on('click', function(){
        $('.gnb-mob-wrapper').removeClass('on');
        gnb.children('.submenu').slideUp(0);
        mobMenu.stop().animate({'margin-left':-menuWidth},0);
    });
    $('.gnb-mob-wrapper .black_bg').on('click', function(){
        $('.gnb-mob-wrapper').removeClass('on');
        gnb.children('.submenu').slideUp(0);
        mobMenu.stop().animate({'margin-left':-menuWidth},0);
    });


    gnb.each(function(index,data){
        $(this).data('willOpen',true);
    })

    gnb.on('click', function(){
        if($(this).data('willOpen') == true){
            $('.gnb-mob li a').removeClass('on');
            $(this).addClass('on');

            $('.gnb-mob li .submenu').slideUp(300);
            $(this).siblings('.submenu').slideDown(300);

            gnb.data('willOpen',true);
            $(this).data('willOpen',false);
        }else{
            $('.gnb-mob li a').removeClass('on');
            $('.gnb-mob li .submenu').slideUp(300);
            gnb.data('willOpen',true);
        }
        return false
    }
    )
    $(window).on('resize', function(){
        winWidth = $(window).innerWidth();
        //console.log(winWidth)
        if(winWidth > 1024){
            mobMenu.hide();
        }else if(winWidth > 490 && winWidth < 1024){
            $('.gnb-mob-wrapper').addClass('on');
            mobMenu.show();
            menuRwdWidth = mobMenu.innerWidth();
            //console.log(menuRwdWidth)
            mobMenu.stop().animate({'margin-left':-menuRwdWidth},0);
            $('.gnb-mob-wrapper').removeClass('on');
        }else{
            $('.gnb-mob-wrapper').addClass('on');
            mobMenu.show();
            $('.gnb-mob-wrapper').removeClass('on');
        }
    })
}
function visualSlide() {
    //visual
    var visualAll = $('.visual-all-wrapper');
    var visualContent = $('.visual-wrapper');
    var contentSize = visualContent.innerWidth();
    var contentList = visualAll.children().size();
    var timer
    var indexNum = 0
    var visualImgWidth// 변하는 윈도우 가로사이즈 넣을 변수
    

    visualAll.css({ 'width': contentSize * contentList })
    visualAll.css({ 'display': 'flex' })
    visualContent.css({ 'width': contentSize })

    $('.slide-btn-list').children().on('click', imgSlide)

    function imgSlide() {
        rwdEvent();
        indexNum = $('.slide-btn-list').children().index($(this));
        //console.log(indexNum)

        $('.slide-btn-list').children().removeClass('active')
        $('.slide-btn-list').children().eq(indexNum).addClass('active')

        visualAll.stop().animate({ 'margin-left': -visualImgWidth * indexNum }, 500)
    }

    autoPlay();
    rwdEvent();

    function autoPlay() {
        timer = setInterval(moveAuto, 4000)
    }
    function moveAuto() {
        indexNum++

        if(indexNum >= contentList){
            indexNum = 0;
        }
        visualImgWidth=$('.visual').innerWidth();
        //console.log(visualImgWidth)
        visualAll.stop().animate({ 'margin-left': -visualImgWidth * indexNum }, 500)
        //console.log(indexNum)

        $('.slide-btn-list').children().removeClass('active')
        $('.slide-btn-list').children().eq(indexNum).addClass('active')
    }
    function rwdEvent(){
        $(window).on("resize",visualReset)
    }
    function visualReset(){
        visualImgWidth=$('.visual').innerWidth();// 리사이즈 될때마다 나오는 새로운 사이즈
        visualContent.css({"width":visualImgWidth}) // 각 컨텐츠 크기를 visualImgWidth와 맞춤     
        visualAll.css({"width":visualImgWidth*contentList}); // 리사이즈된 새로운사이즈 * 리스트 갯수
  
      }

}
function kindMenu() { //리스트 메뉴 클릭이벤트
    var indexNum = 0;
    var menu = $('.kind-list').children() //li
    var activeCon = $('.active-container > div > div') //standard,classic
    var contentHeight = $('.active-container').innerHeight();

    activeCon.hide() //전체 숨김
    activeCon.eq(indexNum).show() //최초 보여질 인덱스

    //windowEvent();

    menu.on('click', menuActive)

    function menuActive() {
        indexNum = $(this).index()
        //console.log(indexNum)
        menu.removeClass('active')
        $(this).addClass('active')

        activeCon.fadeOut(500)
        activeCon.eq(indexNum).fadeIn(500)

        resizeEvent()
    }

}
function tabMenu02() {
    var ulTitle = $('h4').children('a');
    var contentHeight = $('.active-container').innerHeight();
    var willOpen;
    //var enableClick = true;

    ulTitle.parent('h4').next('ul').stop().slideUp(0)

    ulTitle.on('click', tabEvent)
    $(window).on('resize', resizeHeight)

    function tabEvent() {
        var subHeight = $(this).parent('h4').next('ul').innerHeight()
        willOpen = $(this).parent('h4').next('ul').is(':hidden');
        //console.log(isOpen)

        if (willOpen) {
            ulTitle.parent('h4').next('ul').stop().slideUp(300)
            $(this).parent('h4').next('ul').slideDown(300)
            $(this).closest('.active-container').stop().animate({ 'height': contentHeight + subHeight }, 500)
        } else {
            $('.active-container').stop().animate({ 'height': contentHeight }, 500)
            //console.log(contentHeight)
            ulTitle.parent('h4').next('ul').stop().slideUp(300)
        }

        return false
    }

    function resizeHeight(){
        var winH = $(window).innerWidth();
        //console.log(winH)
        if (!window.matchMedia('(max-width:490px)').matches) {
            contentHeight = 500;
        } else if (winH < 490) {
            contentHeight = 350;
        }
    }
}
function resizeEvent() { //가로사이즈별 파란박스 높이 설정
    var winH = $(window).innerWidth();
    var ulTitle = $('h4');
    var h1 = 350;
    var h2 = 500;
    var h3 = 650;
    var h4 = 700;
    
    onSize()

    $(window).on('resize', onSize)

    function onSize() {
        //winH = $(window).innerWidth();
        ulTitle.next('ul').stop().slideUp(0)

        if (!window.matchMedia('(max-width:1024px)').matches) {
            ulTitle.next('ul').stop().slideDown(0)
            $('.active-container').css({ 'height': h3 })
        }
        else if (!window.matchMedia('(max-width:768px)').matches) {
            ulTitle.next('ul').stop().slideDown(0)
            $('.active-container').stop().animate({ 'height': h4 }, 500)
        } 
        else if (!window.matchMedia('(max-width:490px)').matches) {
            //console.log(contentHeight)
            ulTitle.next('ul').stop().slideUp(0)
            $('.active-container').stop().animate({ 'height': h2 }, 500)
        }
        else if(winH < 490) {
           //console.log(contentHeight)
            ulTitle.next('ul').stop().slideUp(0)
            $('.active-container').stop().animate({ 'height': h1 }, 500)
        }
    }
}
function newsSlide() {

    var boxContainer = $('.news-box-wrapper')
    var box = boxContainer.children()
    var boxRwdWidth;

    boxContainer.children().each(function (index) { //each로 순번 다 돌려줌
        //console.log($(this).eq(index))
        $(this).children('.news-img').css({ 'background-image': 'url("images/news_' + (index + 1) + '.jpg"' })
    })

    setInterval(newsMove, 3000)

    function newsMove() {
        boxRwdWidth = box.outerWidth(true)
        boxContainer.stop().animate({ 'margin-left': -boxRwdWidth }, 500, function () {
            boxContainer.children().first().appendTo(boxContainer)
            boxContainer.css({ 'margin-left': 0 })
        })
    }
}
function bannerSlide() {
    var bannerWrap = $('.banner-wrap')
    var bannerCon = $('.banner-wrap').children() //a태그들
    var conWidth = bannerCon.innerWidth()
    var conSize = bannerCon.size()
    //window 가로사이즈에 따라 변한 새로운사이즈(계속바뀜)

    var leftBtn = $('.bx-chevron-left')
    var rightBtn = $('.bx-chevron-right')

    var timer

    bannerWrap.css({ 'width': conWidth * conSize })
    bannerWrap.css({ 'display': 'flex' })
    bannerWrap.children().last().prependTo(bannerWrap)
    bannerWrap.css({ 'margin-left': -conWidth })

    leftBtn.on('click', moveLeft)
    rightBtn.on('click', moveRight)

    autoPlay();
    resize();

    bannerCon.on('mouseenter', function () {
        clearInterval(timer)
    })
    bannerCon.on('mouseleave', autoPlay)

    function moveRight() {
        /*리사이즈*/
        visualImgWidth=$('.banner-content').innerWidth();
        bannerCon.css({"width":visualImgWidth})     
        bannerWrap.css({"width":visualImgWidth*conSize});

        bannerWrap.stop().animate({ 'margin-left': -visualImgWidth * 2 }, 500, function () {
            bannerWrap.css({ 'margin-left': -visualImgWidth })
            bannerWrap.children().first().appendTo(bannerWrap)
        })
    }
    function moveLeft() {
        /*리사이즈*/
        visualImgWidth=$('.banner-content').innerWidth();
        bannerCon.css({"width":visualImgWidth})    
        bannerWrap.css({"width":visualImgWidth*conSize});

        bannerWrap.stop().animate({ 'margin-left': 0 }, 500, function () {
            bannerWrap.css({ 'margin-left': -visualImgWidth })
            bannerWrap.children().last().prependTo(bannerWrap)
        })
    }

    function autoPlay() {
        timer = setInterval(moveRight, 3000)
    }

    function resize(){
        $(window).on("resize",bannerReset)
    }
    function bannerReset(){ 
        var visualImgWidth=$('.banner-content').innerWidth();//window 가로사이즈에 따라 변한 새로운사이즈(계속바뀜)
        bannerCon.css({"width":visualImgWidth}) // 각 리스트 가로사이즈 =  visualImgWidth
        //console.log(bannerCon.innerWidth())
        bannerWrap.css({"width":visualImgWidth*conSize}); //리사이즈된 사이즈*리스트 갯수
  
      }



}
// function menuTab() { (지워둠)
//     sizeEvent()

//     var ulTitle = $('h4')
//     var contentHeight = $('.active-container').innerHeight();
//     var isClose;

//     ulTitle.on('click', tabMenu)
//     function tabMenu() {

//         var subHeight = $(this).next('ul').innerHeight()
//         isClose = $(this).next('ul').is(':hidden')
//         if (isClose) {
//             ulTitle.next('ul').stop().slideUp(500) //기존꺼 리셋
//             $(this).next('ul').stop().slideDown(500)
//             // $('.active-container').stop().animate({ 'height': contentHeight }, 500)
//             $(this).parents('.active-container').stop().animate({ 'height': contentHeight + subHeight }, 500)
//         } else {
//             ulTitle.next('ul').stop().slideUp(500)
//             $('.active-container').stop().animate({ 'height': contentHeight }, 500)
//         }
//     }


// function sizeEvent() {
//     var ulTitle = $('h4')
//     var h1 = 500;
//     var h2 = 600;
//     var h3 = 650;
//     var isClickable = true
//     //onSize()
//     $(window).on('resize', onSize);
//     function onSize() {
//         var winH = $(window).innerWidth();
//         ulTitle.next('ul').stop().slideUp(0)

//         if (winH > 768) {
//             ulTitle.next('ul').stop().slideDown(0)
//             $('.active-container').stop().animate({ 'height': h3 }, 500)
//             if (isClickable) {
//                 ulTitle.off('click', tabMenu)
//                 isClickable = false
//             }
//         } else if (winH > 1024) {
//             ulTitle.next('ul').stop().slideUp(0)
//             $('.active-container').stop().animate({ 'height': h2 }, 500)
//         } else {
//             if (!isClickable) {
//                 ulTitle.on('click', tabMenu)
//                 isClickable = true
//             }
//             $('.active-container').stop().animate({ 'height': h1 }, 500)
//         }

//     }

// }
// function menuTab() { //서브메뉴 올렸다내렸다 이벤트(지워둠)
//     sizeEvent()

//     var ulTitle = $('h4')
//     var contentHeight = $('.active-container').innerHeight(); //파란박스 높이
//     var isClose;

//     ulTitle.on('click', tabMenu)
//     function tabMenu() {
//         var subHeight = $(this).next('ul').innerHeight() //서브메뉴 높이
//         isClose = $(this).next('ul').is(':hidden')
//         if (isClose) { //isClose값이 true면
//             ulTitle.next('ul').stop().slideUp(500) //기존꺼 리셋
//             $(this).next('ul').stop().slideDown(500) //다음ul을 내린다
//             // $('.active-container').stop().animate({ 'height': contentHeight }, 500)
//             $(this).parents('.active-container').stop().animate({ 'height': contentHeight + subHeight }, 500)
//         } else {//isClose값이 false
//             ulTitle.next('ul').stop().slideUp(500) //서브메뉴를 올린 후
//             $('.active-container').stop().animate({ 'height': contentHeight }, 500)
//             //기존컨텐츠 높이로 다시 잡아줌
//         }
//     }

//     function sizeEvent() {
//         var ulTitle = $('h4')
//         var h1 = 500;
//         var h2 = 600;
//         var h3 = 650;
//         var isClickable = true //클릭할수있는 상태인가?
//         //onSize()
//         $(window).on('resize', onSize);
//         function onSize() {
//             var winH = $(window).innerWidth(); //윈도우의 가로사이즈
//             //console.log(winH)
//             ulTitle.next('ul').stop().slideUp(0) //모든 서브메뉴리셋
//             }

//         }
// }
// function tabMenu02() { (지워둠)
//     var ulTitle = $('h4')
//     var contentHeight = $('.active-container').innerHeight();
//     var isOpen;
//     //var enableClick = true;

//     ulTitle.next('ul').stop().slideUp(0)

//     ulTitle.on('click', tabEvent)

//     function tabEvent() {
//         var subHeight = $(this).next('ul').innerHeight()
//         isOpen = $(this).next('ul').is(':hidden');
//         console.log(isOpen)

//         if (isOpen) {
//             ulTitle.next('ul').stop().slideUp(300)
//             $(this).next('ul').slideDown(300)
//             $(this).parents('.active-container').stop().animate({ 'height': contentHeight + subHeight }, 500)
//         } else {
//             $('.active-container').stop().animate({ 'height': contentHeight }, 500)
//             ulTitle.next('ul').stop().slideUp(300)
//         }
//     }
// }