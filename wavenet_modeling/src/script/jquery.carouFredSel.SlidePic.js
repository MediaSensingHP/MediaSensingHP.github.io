$(function() {
    $('#carousel').carouFredSel({
        responsive: true,
        items: {
            visible: 1,
            width: 900,
            height: 500
        },
        scroll: {
            items: 1,
            duration: 2000,
            timeoutDuration: 5000,
            fx: 'fade'
        },
        pagination: '#pager',
    });
});