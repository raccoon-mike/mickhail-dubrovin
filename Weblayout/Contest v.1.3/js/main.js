
//medal hover animation
$(".leaderBoard").mouseenter(function () {
	$(this).find(".animated").addClass("tada")
})

$(".leaderBoard").mouseleave(function () {
	$(this).find(".animated").removeClass("tada")
})

if ($(window).width() > 800) {
	$(".s3infoIcon").mouseenter(function () {
		$(this).parent(".s3infoCover").find(".s3infoInner").css("opacity", "1").css("visibility", 'visible')
	})

	$(".s3infoIcon").mouseleave(function () {
		$(this).parent(".s3infoCover").find(".s3infoInner").css("opacity", "0").css("visibility", 'hidden')
	})
}
//medal hover animation
