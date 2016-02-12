$(document).ready(function() {
    $('.collapse').on('show.bs.collapse', function() {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('dyno-faq-active');
        $('a[href="#' + id + '"] i').addClass('fa-minus');
        $('a[href="#' + id + '"] i').removeClass('fa-plus');
    });
    $('.collapse').on('hide.bs.collapse', function() {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('dyno-faq-active');
        $('a[href="#' + id + '"] i').addClass('fa-plus');
        $('a[href="#' + id + '"] i').removeClass('fa-minus');
    });
});
