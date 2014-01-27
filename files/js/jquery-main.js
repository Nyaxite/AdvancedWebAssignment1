$(document).ready(function()
{
	/*$("#pic1").zoom().fadeTo(100, 0.7);*/
	/*$(".sticky-element").waypoint('sticky');*/
	$("nav").onePageNav();
	checkScreenWidth();
	mathQuestion();
	$("#btnRefresh").hide();
});

$(window).on('resize', function()
{
	checkScreenWidth();
});

/* Checks for screen width and moves/hides/changes elements as required to make sure page looks alright on most resolutions. */
function checkScreenWidth()
{
	if($(window).width() < 820)
	{
		var headerFontSize = 22;
		var navFontSize = 15;
		
		$("h1").css('font-size', headerFontSize+'px');
		$("h1").css('float','none');
		$("h1").css('text-align','center');
		$("h1").css('padding-left','0px');
		
		$("nav ul li a").css('font-size', navFontSize+'px');
		$("nav ul").css('float','none');
		$("nav ul").css('text-align','center');
		$("nav ul").css('padding-top','0px');
		
		$(".game").css('width','100%');
	}
	else
	{
		$("h1").removeAttr('style');
		$(".game").removeAttr('style');
		$("nav").find('*').removeAttr('style');
	}
	
	if($(window).width() < 450)
	{
		$("nav").hide();
	}
	else
	{
		$("nav").show();
	}	
	
}

$("#pic1").hover(function() 
{
	$(this).fadeTo(300, 1);
}, function()
{
	$(this).fadeTo(300, 0.7);
});

////////////////////////////////////////////////////////////////////////

$('#btnMathEasy').click(function() 
{
	removeMathSelect();
	$(this).addClass("btn-selected");
	mathQuestion();
});

$('#btnMathMedium').click(function() 
{
	removeMathSelect();
	$(this).addClass("btn-selected");
	mathQuestion();
});

$('#btnMathHard').click(function() 
{
	removeMathSelect();
	$(this).addClass("btn-selected");
	mathQuestion();
});

function removeMathSelect()
{
	$('#btnMathEasy').removeClass("btn-selected");
	$('#btnMathMedium').removeClass("btn-selected");
	$('#btnMathHard').removeClass("btn-selected");
}

/* Build the math game and validate answers from the input textfield */
function mathQuestion()
{
	var answer = createQuestion();
	var correctAnswers = 0;
	$("#txtAnswer").keyup(function()
	{
		var userAnswer = $("#txtAnswer").val();
		if(parseInt(userAnswer) == answer)
		{
			$("#txtAnswer").val("");				
			answer = createQuestion();
			correctAnswers++;
			$("#math-correct-answers").html("<p>Correct Answers: " + correctAnswers + "</p>");
		}
	});
}

/* Generate a math question using pseudo randomization */
function createQuestion()
{
	if($('#btnMathEasy').hasClass('btn-selected'))
	{
		var max = 10;
		var min = 0;
	}
	else if($('#btnMathMedium').hasClass('btn-selected'))
	{
		var max = -15;
		var min = 15;
	}
	else if($('#btnMathHard').hasClass('btn-selected'))
	{
		var max = 100;
		var min = -100;
	}
	else
	{
		var max = 10;
		var min = 1;
	}
	
	var num1 = Math.floor((Math.random()*max)+min);
	var num2 = Math.floor((Math.random()*max)+min);
	var operatorNum = Math.floor((Math.random()*4)+1);
	var operator = "+";
	var answer;
	if(operatorNum == 1)
	{
		operator = "+";
		answer = num1 + num2;
	}
	else if(operatorNum == 2)
	{
		operator = "-";
		answer = num1 - num2;
	}
	else if(operatorNum == 3)
	{
		operator = "x";
		answer = num1 * num2;
	}
	else if(operatorNum == 4)
	{
		while(num1 % num2 != 0)
		{
			while(num2 == 0)
			{
				num2 = Math.floor((Math.random()*max)+min); 
			}
			num1 = Math.floor((Math.random()*max*10)+min);
		}
		operator = "&#247;";
		answer = num1 / num2;
	}
	
	if(num1 < 0)
	{
		num1 = "(" + num1 + ")";
	}
	
	if(num2 < 0)
	{
		num2 = "(" + num2 + ")";
	}
	
	var question = "<strong>" + num1 + " " + operator + " " + num2 + "</strong>";
	
	$("#math-question").html(question);
	
	return answer;
}

////////////////////////////////////////////////////////////////////////

$("#btnTextModifier").click(function() 
{
	if($('#radThirdPerson').prop('checked'))
	{
		thirdPersonMode();
		modifierContentManager();
	}
	else if($('#radBasically').prop('checked'))
	{
		basicallyMode();
		modifierContentManager();
	}
});

function modifierContentManager()
{
	$("#btnRefresh").show();
	$("#btnTextModifier").hide();
	$("#modifier-radio-list").hide();
	$("#modifier-instructions").hide();
}

$("#btnRefresh").click(function() 
{
	location.reload();
});

function thirdPersonMode()
{
	$("p, h2, h3, h4").each(function() {
		$(this).hide();
		var text = $(this).html();
		/*I should probably use more of the global replacement but I found it to be unruly. Let me know if you have a better way of doing this!
		Also, the English isn't exactly perfect upon translation, but sacrifices needed to be made to compensate for laziness.*/
		text = text.replace(". I ", ". Michael Burnie ");
		text = text.replace(", I ", ", Michael Burnie ");
		text = text.replace("I ", "Michael Burnie ");
		text = text.replace(/ I /g, " he ");
		text = text.replace(" me ", " him ");
		text = text.replace(" me.", " Michael Burnie.");
		text = text.replace(" me, ", " Michael Burnie, ");
		text = text.replace(" Me", " Him");
		text = text.replace("—I ", "—Michael Burnie ");
		
		text = text.replace(" am I ", " is he ");
				
		text = text.replace(/I'd/g, "Michael Burnie would");
		
		text = text.replace(" I am ", " Michael Burnie is ");
		text = text.replace(/I'm/g, "Michael Burnie is");
		
		text = text.replace(/I've/g, "Michael Burnie has");
		
		text = text.replace(/ my /g, " his ");		
		text = text.replace(" am ", " is ");
		text = text.replace(" he don't ", " he doesn't ");
		text = text.replace(" Michael Burnie don't ", " Michael Burnie doesn't ");
		text = text.replace(" he have ", " he has ");
		text = text.replace(/Michael Burnie have/g, " Michael Burnie has ");
		text = text.replace(" haven't "," hasn't ");
		$(this).fadeIn(300);
		$(this).html(text);
	});
}

////////////////////////////////////////////////////////////////////////

function basicallyMode()
{	
	$("p, h2, h3, h4").each(function() {
		$(this).hide();
		var text = $(this).html();
		text = randomReplace(text, 3, ". ", ". Basically ");
		text = randomReplace(text, 2, " to ", " to basically ");
		text = randomReplace(text, 15, ". ", " basically ");
		text = randomReplace(text, 2, ", ", ", basically ");
		text = randomReplace(text, 3, ".", ", and so forth.");
		text = randomReplace(text, 3, ". ", ". The reality is ");
		text = text.replace(" really ", " basically ");
		text = text.replace(/however/g, "the reality is");
		text = text.replace(/Current Projects/g, "Status");
		text = text.replace(/Michael Burnie/g, "MB");
		$(this).fadeIn(300);
		$(this).html(text);
	});
}

function randomReplace(text, occurence, beforeVal, afterVal)
{
	var chance = Math.floor((Math.random()*occurence)+1);
	if(chance == 1)
	{
		text = text.replace(beforeVal, afterVal);
	}
	return text;
}

////////////////////////////////////////////////////////////////////////

$("#btnShowGame").click(function() 
{
	drawCanvas();
	$("#btnShowGame").hide();
});

function drawCanvas()
{
	var divGameCanvas = document.getElementById("divGameCanvas");
	if(!document.getElementById("gameCanvas"))
	{
		var canvas = document.createElement("canvas");
		canvas.id = 'gameCanvas';
		canvas.width = 200;
		canvas.height = 500;
		divGameCanvas.appendChild(canvas);
	}
}



