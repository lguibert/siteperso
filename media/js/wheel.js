$(document).ready(function () {
    var i = 0;
    var delta = 10;
    var actual = 0;
    var all = ["accueil", "experiences", "formation", "bdd", "programmation", "langue", "passions"];

    //FF
    $('body').bind('DOMMouseScroll', function (e) {
        i++;
        $("#visualizer").html(i);
        if (e.originalEvent.detail > 0) {
            wheeldown();
        } else {
            wheelup();
        }
        return false;
    });

    //IE, Opera, Safari, Chrome
    $('body').bind('mousewheel', function (e) {
        i++;
        $("#visualizer").html(i);
        if (e.originalEvent.wheelDelta < 0) {
            wheeldown();
        }
        else {
            wheelup();
        }
        return false;
    });

    function wheeldown() {
        if (i >= delta) {
            i = 0;
            if (asNext(actual)) {
                $('html, body').animate({
                    scrollTop: $($("a[href='#" + getNext(actual) + "']").attr('href')).offset().top - $("#navbar").height()
                });
                $("#" + getNext(actual)).addClass("animated fadeInDown").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $("#" + all[actual]).find('.containerInfo').each(function(){
                            $(this).show(0).addClass("animated zoomIn").delay(20);
                    });
                });
                actual++;
            }
        }
    }

    function wheelup() {
        if (i >= delta) {
            i = 0;
            if (asPrev(actual)) {
                $('html, body').animate({
                    scrollTop: $($("a[href='#" + getPrev(actual) + "']").attr('href')).offset().top - $("#navbar").height()
                });
                actual--;
            }
        }
    }

    function asNext(index) {
        if (all[index + 1]) {
            return true;
        }
        else {
            return false;
        }
    }

    function asPrev(index) {
        if (all[index - 1]) {
            return true;
        }
        else {
            return false;
        }
    }

    function getNext(index) {
        return all[index + 1];
    }

    function getPrev(index) {
        return all[index - 1];
    }

});  
