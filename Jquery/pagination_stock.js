pageSize = 3;

showPage = function (page) {
    $(".content_4").hide();
    $(".content_4").each(function (n) {
        if (n >= pageSize * (page - 1) && n < pageSize * page)
            $(this).show();
    });
}

showPage(1);

$("#pagin_4 li a").click(function () {
    $("#pagin_4 li a").removeClass("current_4");
    $(this).addClass("current_4");
    showPage(parseInt($(this).text()))
});