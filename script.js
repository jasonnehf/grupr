'use strict';

var $entrynameinput;
var $entryvalueinput;
$(document).ready(init);

function init(event) {
	$entrynameinput=$("#entry-name");
	$entryvalueinput=$("#entry-value");
	// console.log("ready!");
	$("#entry-button").on('click', addItemToMain);
	$(".group-container").on('click', '.list-item, .group', itemClicked);		
	$(".group-container").on('dblclick', '.list-item', itemDblClicked);	
	
	updateGroupTotals();
}

function addItemToMain(event)
{
	var $this=$(this);
	var entryname=$entrynameinput.val();
	var entryvalue=parseInt($entryvalueinput.val(),10);
	
	if(!entryname || !entryvalue)	return;

	var $itemname=$('<div>').text(entryname).addClass("item-name");
	var $itemvalue=$('<div>').text(getDuration(entryvalue)).addClass("item-value");

	var $li=$("<li>").addClass("list-item");
	$li.data("value", entryvalue);
	$li.append($itemname).append($itemvalue);
	$("#grouplist0").append($li);
	$('li.clicked').removeClass("clicked");
	$entrynameinput.val("");
	$entryvalueinput.val("");
	updateGroupTotals();
}

function itemClicked(event)
{
	event.stopPropagation();
	var $this=$(this);
	// console.log("this: ",{x:this});
	// console.log("$this: ",{x:$this});
	// console.log("event: ", {x:event});
	if($this.hasClass("group"))
	{
		var $toDetach= $(".list-item.clicked");

		$toDetach.detach();
		$this.children().eq(1).append($toDetach);

		$(".list-item").removeClass("clicked");
		var data=$toDetach.data();
		// console.log(data);

	}
	else if($this.hasClass('clicked list-item'))
	{
		$this.removeClass("clicked");
	}
	else if($this.hasClass('list-item'))
	{
		if(!event.shiftKey)	$('.clicked').removeClass('clicked');
		$this.addClass("clicked");
	}
	updateGroupTotals();
}

function getDuration(secs)
{
	var dataSecs=("0"+secs%60).slice(-2);
	var dataMins=Math.floor(secs/60);
	var duration=`${dataMins}m${dataSecs}s`;
	return duration;
}

function updateGroupTotals(which=[0,1,2,3])
{
	
	var whichIds=which.map(function(i){return "#group"+i;});
	for(var x=0; x<whichIds.length;x++)
	{
		var $allGroup=$(whichIds[x]);
		var $allGroupLI=$allGroup.find('li');
		var allLiData=$allGroupLI.map(function(i) { return $(this).data().value;}).get();
		var sumAllLiData=(allLiData.length ? allLiData.reduce((p,c)=>p+c) : 0);
		// console.log("sumAllLiData: ", sumAllLiData);
		// console.log("allLiData: ", allLiData);
		var duration=getDuration(sumAllLiData);
		$allGroup.find(".group-footer").append('<div>').addClass('total').text(`Duration: ${duration}`);
		
	}
}

function itemDblClicked(event)
{
	var $this=$(this);
	$this.remove();
	updateGroupTotals();
}