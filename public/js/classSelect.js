$(document).ready(function(){
	$("select")
	.change(function () {
		var url = "/image/class/";
		$("select option:selected").each(function() {
		url += this.value+".png";
		});
		$( "#classImg" ).attr('src',url);
	})
	.change();

	$("#create-deck").click(function(){
		var selectedClass = $( "#classSelect option:selected" ).val();
		window.location.href = '/createDeck/'+selectedClass;
	})
});