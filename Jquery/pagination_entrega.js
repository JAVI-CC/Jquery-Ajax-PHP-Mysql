pageSize = 3;

showPage = function (page) {
    $(".content_2").hide();
    $(".content_2").each(function (n) {
        if (n >= pageSize * (page - 1) && n < pageSize * page)
            $(this).show();
    });
}

showPage(1);

$("#pagin_2 li a").click(function () {
    $("#pagin_2 li a").removeClass("current_2");
    $(this).addClass("current_2");
    showPage(parseInt($(this).text()))
});