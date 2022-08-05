//------------------------------------------------------------
//Aboutmoer(index.thml)sp版のテキスト表示挙動
//------------------------------------------------------------
$(".item").click(function () {
    $(".p-fv__hovermask").toggleClass("active");
});

//------------------------------------------------------------
//toggle(SP)
//------------------------------------------------------------
$(".l-header__toggle").click(function () { //ボタンがクリックされたら
    $(this).toggleClass('open'); //ボタン自身に activeクラスを付与し
    $(".l-header__inner").toggleClass('panelactive'); //ナビゲーションにpanelactiveクラスを付与
});

$(".l-header__inner li").click(function () { //ナビゲーションのリンクがクリックされたら
    $(".l-header__toggle").removeClass('open'); //ボタンの activeクラスを除去し
    $(".l-header__inner").removeClass('panelactive'); //ナビゲーションのpanelactiveクラスも除去
});

$(".l-header__list a").on('click', function (event) {
    $(".l-header__toggle").trigger('click');
});

//------------------------------------------------------------
//swipe(mainvisual)
//------------------------------------------------------------

const mySwiper = new Swiper('.swiper', {
    effect: 'fade',
    fadeEffect: {
        crossFade: true,
    },
    loop: true,
    loopAdditionalSlides: 1,
    speed: 2000,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        waitForTransition: false,
    },
    followFinger: false,

});

//------------------------------------------------------------
//hexagon(skill)
//------------------------------------------------------------
$(function () {
    $('.card').on('click', function () {
        $(this).toggleClass('flipped')
    });
});

//------------------------------------------------------------
//page-top(footer)
//------------------------------------------------------------
//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
    var scroll = $(window).scrollTop();
    if (scroll >= 200) { //上から200pxスクロールしたら
        $('#page-top').removeClass('DownMove'); //#page-topについているDownMoveというクラス名を除く
        $('#page-top').addClass('UpMove'); //#page-topについているUpMoveというクラス名を付与
    } else {
        if ($('#page-top').hasClass('UpMove')) { //すでに#page-topにUpMoveというクラス名がついていたら
            $('#page-top').removeClass('UpMove'); //UpMoveというクラス名を除き
            $('#page-top').addClass('DownMove'); //DownMoveというクラス名を#page-topに付与
        }
    }
}
// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
    PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
});
// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
    PageTopAnime(); /* スクロールした際の動きの関数を呼ぶ*/
});
// #page-topをクリックした際の設定
$('#page-top a').click(function () {
    $('body,html').animate({
        scrollTop: 0 //ページトップまでスクロール
    }, 500); //ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false; //リンク自体の無効化
});


//------------------------------------------------------------
//波(footer)
//------------------------------------------------------------
var unit = 100,
    canvasList, // キャンバスの配列
    info = {}, // 全キャンバス共通の描画情報
    colorList; // 各キャンバスの色情報

function init() {
    info.seconds = 0;
    info.t = 0;
    canvasList = [];
    colorList = [];
    // canvas1個めの色指定
    canvasList.push(document.getElementById("waveCanvas"));
    colorList.push(['#363636']);
    // 各キャンバスの初期化
    for (var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
        canvas.height = 80; //波の高さ
        canvas.contextCache = canvas.getContext("2d");
    }
    // 共通の更新処理呼び出し
    update();
}

function update() {
    for (var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        // 各キャンバスの描画
        draw(canvas, colorList[canvasIndex]);
    }
    // 共通の描画情報の更新
    info.seconds = info.seconds + .014;
    info.t = info.seconds * Math.PI;
    // 自身の再起呼び出し
    setTimeout(update, 35);
}

function draw(canvas, color) {
    // 対象のcanvasのコンテキストを取得
    var context = canvas.contextCache;
    // キャンバスの描画をクリア
    context.clearRect(0, 0, canvas.width, canvas.height);

    //波を描画 drawWave(canvas, color[数字（波の数を0から数えて指定）], 透過, 波の幅のzoom,波の開始位置の遅れ )
    drawWave(canvas, color[0], 1, 3, 0); //drawWave(canvas, color[0],0.5, 3, 0);とすると透過50%の波が出来る
}
/**
 * 波を描画
 * drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
 */
function drawWave(canvas, color, alpha, zoom, delay) {
    var context = canvas.contextCache;
    context.fillStyle = color; //塗りの色
    context.globalAlpha = alpha;
    context.beginPath(); //パスの開始
    drawSine(canvas, info.t / 0.5, zoom, delay);
    context.lineTo(canvas.width + 10, canvas.height); //パスをCanvasの右下へ
    context.lineTo(0, canvas.height); //パスをCanvasの左下へ
    context.closePath() //パスを閉じる
    context.fill(); //波を塗りつぶす
}

function drawSine(canvas, t, zoom, delay) {
    var xAxis = Math.floor(canvas.height / 2);
    var yAxis = 0;
    var context = canvas.contextCache;
    // Set the initial x and y, starting at 0,0 and translating to the origin on
    // the canvas.
    var x = t; //時間を横の位置とする
    var y = Math.sin(x) / zoom;
    context.moveTo(yAxis, unit * y + xAxis); //スタート位置にパスを置く

    // Loop to draw segments (横幅の分、波を描画)
    for (i = yAxis; i <= canvas.width + 10; i += 10) {
        x = t + (-yAxis + i) / unit / zoom;
        y = Math.sin(x - delay) / 3;
        context.lineTo(i, unit * y + xAxis);
    }
}
init();

//------------------------------------------------------------
//スムーススクロール
//------------------------------------------------------------
$(function () {
    $('a[href^="#"]').click(function () {
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        var speed = 500;
        $("html, body").animate({
            scrollTop: position
        }, speed, "swing");
        return false;
    });
});

//------------------------------------------------------------
//scrollfadein
//------------------------------------------------------------
$(window).scroll(function () {
    var scrollAnimationElm = document.querySelectorAll('.scroll_up');
    var scrollAnimationFunc = function () {
        for (var i = 0; i < scrollAnimationElm.length; i++) {
            var triggerMargin = 100;
            if (window.innerHeight > scrollAnimationElm[i].getBoundingClientRect().top + triggerMargin) {
                scrollAnimationElm[i].classList.add('on');
            }
        }
    }
    window.addEventListener('load', scrollAnimationFunc);
    window.addEventListener('scroll', scrollAnimationFunc);
});



//------------------------------------------------------------
//#text(mainvisual)
//------------------------------------------------------------
let spanText = document.getElementById('text');
let text = document.getElementById('text').innerHTML;
let newText = "";

text.split("").forEach(function (value, i) {
    newText += '<span style ="animation:showtext 1s ease ' + [i] * 0.1 + 's forwards;">' + value + '</span>';
});
spanText.innerHTML = newText;