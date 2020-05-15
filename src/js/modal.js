import $ from 'jquery';

//FABボタンを押したらモーダル出現　キャンセルボタンを押したら閉じる
$(function () {
    let fabBtn = $('.js-fbaBtn');
    $(fabBtn).on('click', function () {
        $('.c-modal-cover').toggleClass('active--modal');
    });
    $('.js-cancel').on('click', function () {
        $('.c-modal-cover').toggleClass('active--modal');
    })
});

