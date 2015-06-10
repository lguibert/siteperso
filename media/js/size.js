$( document ).ready( function(){
  resizeInfos();
});  

$( window ).resize(function() {
  resizeInfos();
});


function resizeInfos(){
  var navbar = $("#navbar");
  var offshore = navbar.height() + $("#footer").height();
  $(".infos").height($("body").height() - offshore);

  if(navbar.height() > 52){
    $(".cover-container").css("margin-top", 100);
  }else if(navbar.height() <= 52){
    $(".cover-container").css("margin-top", 70);
  }

  
}