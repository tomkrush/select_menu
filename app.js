$(function() {
	var popoverIsOpen = false;
	
	$('select.links').each(function(){ 
		var label = $(this).prev('label');
		var select = this;

		label.click(function() {
			if ( popoverIsOpen )
			{
				popoverIsOpen.trigger('blur');
			}
			else
			{
				var popover = create_popover(select);

	      popover.css({
	          bottom: $(this).offset().bottom,
	          left: $(this).offset().left,
						opacity: 0
	      });
	
				popover.trigger('focus');
			}		
		});
	});
	
	function create_popover(select)
	{
		// Create Popover HTML
		var popover = $('<div id="popover" class="links" rel="'+$(select).attr('id')+'"></div>');
		var list = $('<ul></ul>');
		
		popover.append(list);
	
    var optionsEl = $(select).find('option');
    var options = [];
    optionsEl.each(function () {
        options.push({
            value: $(this).val(),
            text: $(this).text()
        });
    });
		
		for (var i = 0; i < options.length; i++) {
			list.append('<li rel="'+options[i].value+'">'+options[i].text+'</li>');
		}
		
		// Click on list item
		popover.find('li').click(function () {
			var rel = $(this).parent().parent().attr('rel');
			var select = $('#'+rel).val($(this).attr('rel'));
			
			$(this).trigger('blur');
		});
		
		// Popover Open
		popover.focus(function() {
			if ( popoverIsOpen )
			{
				$('#popover').trigger('blur');
			}
			
			$('body').append(this);
			
			popover.animate({
	        opacity: 1
	    }, 150, function() {
				popoverIsOpen = popover;
			});
		});

		// Popover Close
		popover.blur(function() {
			var popover = $('#popover');

	    popover.animate({
	        opacity: 0
	    }, 150, function () {
	        popover.remove();
	    });

	    popoverIsOpen = false;		
		});
		
		return popover;
	}
});