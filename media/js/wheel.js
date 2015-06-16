$(document).ready(function () {
    var i = 0;
    var delta = 10;
    var actual = 0;
    var all = ["accueil", "experiences", "formation", "bdd", "programmation", "langue", "passions"];
    var done = [false,false,false,false,false,false,false];

    $('.naviton').on("click",function(){
        var name = $(this).find("a").attr("href").split("#")[1];
        if(!done[actual]){
            animateContent();
            console.log("animated with click");
        }else{
            console.log("already animated (used click)");
        }
        actual = getIndexWithName(name);
    });

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
                var index_next = getIndexWithName(getNext(actual));
                console.log("done for index next: "+ done[index_next]);
                if(!done[index_next]){
                    animateContent();
                    done[index_next] = true;
                }else{
                    console.log("Animation déjà effectuée pour: "+ actual);
                    console.log(done);
                }

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
                /*var index_actual = getIndexWithName(getNext(actual));
                if(!done[index_actual]){
                    animateContent();
                    done[index_actual] = true;
                    console.log("ok pour le up");
                }else{
                    console.log("Animation déjà effectuée pour: "+ index_actual);
                    console.log(done);
                }*/
                actual--;
            }
        }
    }

    function animateContent(){
        $("#" + getNext(actual)).addClass("animated fadeInDown").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            console.log("end of first animation");
            $("#" + all[actual]).find('.containerInfo').each(function(){
                console.log("actual index: "+actual);
                $(this).show(0).addClass("animated zoomIn").delay(20);
            });
        });
    }

    function asNext(index) {
        return all[index + 1];
    }

    function asPrev(index) {
        return all[index - 1];
    }

    function getNext(index) {
        return all[index + 1];
    }

    function getPrev(index) {
        return all[index - 1];
    }

    function getIndexWithName(name){
        for (data in all){
            if (all[data] == name){
                return parseInt(data);
            }
        }
    }

});  
