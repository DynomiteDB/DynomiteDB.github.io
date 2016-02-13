$(document).ready(function() {
    $('.collapse').on('show.bs.collapse', function() {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('dyno-accordion-active');
        $('a[href="#' + id + '"] i').addClass('fa-minus');
        $('a[href="#' + id + '"] i').removeClass('fa-plus');
    });
    $('.collapse').on('hide.bs.collapse', function() {
        var id = $(this).attr('id');
        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('dyno-accordion-active');
        $('a[href="#' + id + '"] i').addClass('fa-plus');
        $('a[href="#' + id + '"] i').removeClass('fa-minus');
    });
});

/* Tabs */
$('#myTabs a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
});