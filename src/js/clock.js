(

	function(jQuery){

		var intervalId,
			nbSwitch;

		var setClockHeight= function(){

			var newHeight= $(document).height()/100*70;
			$('.clock').height(newHeight);

		};


		var initClockText= function(){

			if (intervalId){
				window.clearInterval(intervalId);
			}

			nbSwitch= 0;

			$('.clock').each(function(i, val){
				var selectorStart='.configBar ' + (i===0?'.left ':'.right '),
					minutes= $(selectorStart + 'input[name=minutes]').val() || 0,
					seconds= $(selectorStart + 'input[name=seconds]').val() || 0,
					inc=  $(selectorStart + 'input[name=increment]').val() || 0,
		        	ourText = $(this).find('span');

		        //define inc time
		        $(this).data('inc', parseInt(inc));

				ourText.text(minutes + ':' + seconds);

		        var fontSize = 0;
		        	maxHeight = $(this).height(),
		        	maxWidth = $(this).width(),
		        	textHeight= ourText.height(),
		        	textWidth= ourText.width();

		        while(textHeight*2 < maxHeight || textWidth*2 < maxWidth){
		        	fontSize+=1;
		        	ourText.css('font-size', fontSize);
		        	textHeight= ourText.height(),
		        	textWidth= ourText.width();		        	
		        }
			});
		}

		var incrementTime= function(elt){
			if (nbSwitch === 0){
				return;
			}
			var time= elt.text().split(':'),
				seconds= parseInt(time[0])*60 + parseInt(time[1]) + elt.data('inc'),
				newMinutes= Math.floor(seconds/60),
				newSeconds= seconds - newMinutes*60;

			elt.find('span').text(newMinutes + ':' + newSeconds);

		}

		
		var updateTime= function(elt){
			var time= elt.text().split(':'),
				seconds= parseInt(time[0])*60 + parseInt(time[1]);

				if (intervalId){
					window.clearInterval(intervalId);
				};
				intervalId= window.setInterval(function(){
					if (seconds === 0){
						window.clearInterval(intervalId);
						elt.css('background-color', 'red');
						return;
					}
					seconds--;
					newMinutes= Math.floor(seconds/60),
					newSeconds= seconds - newMinutes*60;
					elt.find('span').text(newMinutes + ':' + newSeconds);
				}, 1000);

		};

	    var handleEvents= function(){

	    	$('#save').on('click', function(e){
	    		initClockText();
	    	});

	    	var clocks= $('.clock');

	    	$('.clock').on('click', function(e){
	    		var currentClock, opposedClock;
	    		if (e.currentTarget == clocks[0]){
	    			currentClock= $(clocks[0]);
	    			opposedClock= $(clocks[1]);
	    		}else{
	    			currentClock= $(clocks[1]);
	    			opposedClock= $(clocks[0]);
	    		}

	    		currentClock.css('color', 'green');
	    		opposedClock.css('color', '#FFCB1C');

	    		incrementTime(currentClock);
    			updateTime(opposedClock);
    			nbSwitch++;
	    	})

	    };		

		$(document).ready(function(){

			setClockHeight();
			initClockText();
			handleEvents();
			console.log();

		});

	}

)(jQuery)