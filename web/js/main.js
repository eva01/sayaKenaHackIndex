
$( document ).ready(function() {


$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});



document.getElementById('callAPI').onclick = callAPI;
$('#img-load').hide();

$('#icNum').keypress(function(e) {
   if(e.which == 13) {
       callAPI ();
   }
});

function createNode(element) {
     return document.createElement(element);
 }

 function append(parent, el) {
   return parent.appendChild(el);
 }

function callAPI(){
   $('#img-load').show();
  
   const baseUrl = "https://api.sayakenahack.com/v1/breach?icNum=";
   var url = baseUrl.concat(document.getElementById("icNum").value);
   const resultsDiv = document.getElementById('pwns');
   resultsDiv.innerHTML = "";
 
   fetch(url).then(function(response) {
 if(response.status === 200){ $('#img-load').hide();
   let span = createNode('span');
   let spanHead = "<br><br><h2 class=\"found\"> Oh-oh! You've been pwned</h2>";
   let spanBody = "<p class=\"resultDescription\"> Your IC number is in the breach, and tied to the following phone numbers:</p>"
   span.innerHTML = spanHead + spanBody
   append(resultsDiv, span);
   }
 if(response.status === 	404){ $('#img-load').hide();
   let span = createNode('span');
   let spanHead = "<br><br><h2> Woohoo! Your IC is not in the breach</h2>";
   let spanBody = "<p class=\"resultDescription\"> We've not found IC number in the breach data (so far). <br></p>"
   span.innerHTML = spanHead + spanBody
   append(resultsDiv, span);
   }

 return response.json();
   }).then(function(j) {$('#img-load').hide();
 
   j.forEach(function(element) {
       let span = createNode('span');
       span.innerHTML = "<p class=\"results\"><br>Telco: " + `${element.subName}` +"<br>Number: " + `${element.userData}` + "</p>";
       append(resultsDiv, span);
 });
 }).catch(function(error) {
  return;
});

  
} // end api




});
