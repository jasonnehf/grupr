/*
Group Organizer

This app will allow a user to add items, and move them between 
groups by selecting items and clicking a group.

MVP:
x/	Add items.  They must have at least a name and some kind of numerical value.
		(these could represent anything: people, groceries, whatever).
x/	You'll need at least a name input and a number input, with a button to add it.
x/	The inputs should clear when you add a new item.
x/	Have at least 4 groups to start. (one unsorted group, and three others)
x/	When added, the should be put in an unsorted group.
x/	By clicking to select, and then clicking another group, you can move items. 
x		(you should only be able to select one item at a time, and items should 
x		unselect after they are moved)
x/	Each group should show a current total of all of the numerical values of the items inside.

Extra Features:
:( /	Add and remove groups.  If you remove a group with items in it, those items should go back to the unsorted group.  (you shouldn't be able to remove the unsorted group!)
	- was in the works! made it possible (or, at least, not IMpossible)
:D /	Be able to remove items somehow.
:( /	Give your items more complicated data.
:( /	Do more complicated math on the data!  Grand totals!  Averages! Be creative!
*/
/*
	add items to unsorted list
		via user-entry
		each item shall contain (description:value) associated with it -- editable?

	move/sort items into groups
		by click-source -> click-destination
		3 groups, minimum
	
	*	create/delete/rename groups on the fly
		*	deleting a non-empty group places group's contents back into unsorted list

	each group displays total info from interior items
*/
/*
	Use NYAH as a starting point?
		for item input
		for group generation
		for layout
		for removal functionality of main-list (port main-list dblclick-to-remove to all group lists)

	Store an item's data in its element's <data-???> attribute in HTML?


*/