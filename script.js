'use strict';

$(document).ready(init);

var jasondebug=false;
function init(event) {
	

	console.log("ready!");
	$("#entry-button").on('click', addItemToMain);
	$(".group-container").on('click', '.list-item, .group', itemClicked);		// 2nd arg in .on(): deferred event handling
	$(".group-container").on('dblclick', '.list-item', itemDblClicked);		// 2nd arg in .on(): deferred event handling
	// if(jasondebug)	$("input").on('focus', function() {$(this).select()});
	// if(jasondebug)	$("input").on('mouseup', function() {$(this).select()});
	// $("#entry-name").select();
	// $("#entry-key").select();
	// $("#entry-value").select();
}
// if(jasondebug)	var entryvaluecounter=0;
function addItemToMain(event)
{
	var $this=$(this);
	var entryname=$("#entry-name").val();
	// if(jasondebug)	entryname=entryname+entryvaluecounter;	
	// var entrykey=$("#entry-key").val();
	var entryvalue=parseInt($("#entry-value").val(),10);
	
	if(!entryname || !entryvalue)	return;

	// if(jasondebug)	entryvalue+=entryvaluecounter++;
	// console.log({name: entryname,key:entrykey,value:entryvalue});

	var $entryname=$('<div>').text(entryname).addClass("item-name");
	// var $entrykey=$('<div>').text(entrykey).addClass("item-key");
	var $entryvalue=$('<div>').text(getDuration(entryvalue)).addClass("item-value");

	var $li=$("<li>").addClass("list-item");
	$li.data("value", entryvalue);
	$li.append($entryname).append($entryvalue);
	$("#grouplist0").append($li);
	$('li.clicked').removeClass("clicked");
	$("#entry-name").val("");
	$("#entry-value").val("");
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
		var $allGroupLI=$(whichIds[x]+" li");
		var allLiData=$allGroupLI.map(function(i) { return $(this).data().value}).get();
		var sumAllLiData=(allLiData.length ? allLiData.reduce((p,c)=>p+c) : 0);
		// console.log("sumAllLiData: ", sumAllLiData);
		// console.log("allLiData: ", allLiData);
		var duration=getDuration(sumAllLiData);
		$(whichIds[x]+" .group-footer").text(`Duration: ${duration}`)
		
	}
}

function itemDblClicked(event)
{
	var $this=$(this);
	$this.remove();
	updateGroupTotals();
}