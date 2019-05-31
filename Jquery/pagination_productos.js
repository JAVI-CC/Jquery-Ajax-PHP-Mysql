pageSize = 3;

showPage = function (page) {
    $(".content_3").hide();
    $(".content_3").each(function (n) {
        if (n >= pageSize * (page - 1) && n < pageSize * page)
            $(this).show();
    });
}

showPage(1);

$("#pagin_3 li a").click(function () {
    $("#pagin_3 li a").removeClass("current_3");
    $(this).addClass("current_3");
    showPage(parseInt($(this).text()))
});