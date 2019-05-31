pageSize = 3;

showPage = function (page) {
    $(".content_1").hide();
    $(".content_1").each(function (n) {
        if (n >= pageSize * (page - 1) && n < pageSize * page)
            $(this).show();
    });
}

showPage(1);

$("#pagin_1 li a").click(function () {
    $("#pagin_1 li a").removeClass("current_1");
    $(this).addClass("current_1");
    showPage(parseInt($(this).text()))
});