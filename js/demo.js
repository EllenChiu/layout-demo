
$(function() {
  draw()
  init()

  $(".list-panel:not('.disabled')").on("click", function() {
    var target = $(this);
    var type = $(this).data('type');
    var getData = {
      go: $(this).find(".go").text(),
      arv: $(this).find(".arrive").text(),
      price: $(this).find(".price").data("price")
    }

    var intoDom = "." + type;
    $(intoDom).find(".time").text(getData.go + " ~ " + getData.arv);
    $(intoDom).find(".count").text(getData.price);

    var total = countTotal();
    $(".total").text(numDot(total))
  })

})

function init() {
  var loadingHtml = '<div class="loading-div"><i class="fa fa-spinner fa-spin fa-3x fa-fw"></i></div>';
  $(".draw").append(loadingHtml);

  setTimeout(function(){
    $(".loading-div").fadeOut(500)
    $(".content").fadeIn(300);
  }, 3000)

}

function draw() {
    // $(".content").html()
    $.each(departData, function(key, idx) {
      var depDom = $(".temp").find(".panel").clone();
      if(idx.soldOut) {
        $(depDom).find(".list-panel").addClass("disabled");
        $(depDom).find(".detail").html("SOLD OUT")
      }
      $(depDom).find(".list-panel").data("type", "dep");
      $(depDom).find(".go").text(idx.start);
      $(depDom).find(".arrive").text(idx.arrive);
      $(depDom).find(".price").text(numDot(idx.price)).data("price", idx.price)
      $(".depart-area").append(depDom)
    })

    $.each(returnData, function(key, idx) {
      var retDom = $(".temp").find(".panel").clone();
      if(idx.soldOut) {
        $(retDom).find(".list-panel").addClass("disabled");
        $(retDom).find(".detail").html("SOLD OUT")
      }
      $(retDom).find(".go").text(idx.start);
      $(retDom).find(".list-panel").data("type", "ret");
      $(retDom).find(".arrive").text(idx.arrive);
      $(retDom).find(".price").text(numDot(idx.price)).data("price", idx.price)
      $(".return-area").append(retDom)
    })

}

function countTotal() {
  var total = 0;
  $(".count").each(function(key, idx) {

    total = total + parseInt($(idx).html())
  })

  return total;
}

function numDot(d) {
  d = parseInt(d);
  d = d + "";
  var re = /(-?\d+)(\d{3})/
  while (re.test(d)) {
      d = d.replace(re, "$1,$2")
  }
  return d;
}
