//Thanks to Netflix killing their api for new developers, these are the ids for every standup special. Will need to be updated manually. 
standup = "70279934, 70048311,70217162,70111651,70140257,70128945,70166106,70126749,70128560,70063285,70260318,70128049,70275181,70128398,70174823,70242584,70174733,70103999,70245034,70063216,70125079,70002363,70254501,70076206,70266168,70241182,70249708,70183219,70132571,70174723,70201121,70221377,70042139,70112830,70022347,70075543,70055211,70180007,70115172,70167094,70270530,70251915,70112756,70063218,60032405,70257246,70257247,70201119,70184836,70073590,70181655,70089034,60035790,70012821,60026028,70012819,70126929,70012823,70270361,70104828,70128645,70072945,70235391,60021129,60027110,60021130,60021131,70005319,70035984,70074012,70061774,60026408,60021133,60026166,60028180,60032951,70181698,60026890,70057637,70125140,70069788,70048983,70131900,70129058,60023486,70259112,70276469,70044256,70237054,70256293,70129356,70039644,70116693,70273399,70059731,70204315,70123298,70250700,70059013,70155040,70256206,70256207,70053885,70124649,70264392,70111504,70211216,70140322,70141836,70236163,70154976,70041536,70044122,70045330,70047384,70261055,60037590,70066215,70127117,60030268,70050870,70003911,70143592,70229214,70135987,70061384,70114496,70061385,70174630,70243176,70139568,70226966,70179977,70257500,70108425,70266228,70125139,70256512,70260536,70243674,70187694,70215425,60001854,60030278,70056547,70208257,70060888,70248602,70128947,70115402,70057755,70083410,70233180,70002522,70217185,70138944,70257248,70273400,70000633,70044358,70074549,70226940,70184201,70250699,70110844,70225030,70115527,70237212,70123090,70144098,70229069,70104097,70123102,70138835,70063217,70230749,70118865,70237049,70224969,70055534,70082302,70026387,70257634,70267544,70266169,70257633,70259883,70128946,70123286,70270369,70055220,70229037,70174741,70243553,70233951,70106073,70039645"
standup = standup.split(",")
oldheight = $(document).height();
hidden = [];
nostandupswitch = "<select style='' id='nostandupswitch'> <option value='1'>On</option>  <option value='0'>Off</option> </select>";


$("#genreControls").append("<span style='float:right; font-weight:bold; font-size:14px; padding-top:0px; padding-right: 10px;'>" + nostandupswitch + "</span><span style='float:right; font-weight:bold; font-size:14px; padding-top:10px; padding-right: 10px;'>Standup:</span>");

$('#nostandupswitch').switchify().data('switch').bind('switch:slide', function (e, type)
{

	if (type == "on")
	{
		ShowStandup()
	}
	else
	{
		HideStandup()
	}
});

var switchurl = chrome.extension.getURL("jquery.switch.png");


$(".ui-switch-handle").css("background-image", "url('" + switchurl + "')");



$(document).scroll(function ()
{

	if ($(document).height() != oldheight)
	{
		if ($('#nostandupswitch').val() == 0)
		{
			HideStandup()
		}

		oldheight = $(document).height()
	}
})


function ShowStandup()
{
	$(".nostanduptemp").remove();
	for (id in hidden)
	{
		$("#" + hidden[id] + "_0").show();
	}
}


function HideStandup()
{
	//$(".nostanduptemp").remove();
	$(".lockup:not(.nostanduptemp):not(:hidden)").each(function (index)
	{
		id = $(this).attr("data-titleid"); 
		if (standup.indexOf(id) > -1)
		{
			//$(this).css("background-color", "rgb(225, 225, 225)");
			//$(this).css("border-color", "rgb(225, 225, 225)")
			hidden.push(id);
			$(this).attr("id", id + "_0"); // Add a unique ID so they can be shown easily. 
			$(this).hide();
          	//This is a little weird, but in order to keep the infinite scrolling working we need to add blank movies at the end. 
			$(".gallery").append("<div class='nostanduptemp agMovie agMovie-lulg mrNR'><span style='border-color: #e1e1e1;background-color:#e1e1e1;' class='nostanduptemp boxShot boxShot-166 queueable hoverPlay bobbable'><img class='boxShotImg hideBobBoxshot' style='display:none' src=''></span></div>");
			//$(this).children().hide()

		}
	});
}