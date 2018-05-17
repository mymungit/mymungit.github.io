var locked = true;


$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});


function check(form)/*function to check userid & password*/
{
 /*the following code checkes whether the entered userid and password are matching*/
 if(md5(form.userid.value) == "21232f297a57a5a743894a0e4a801fc3" && md5(form.pswrd.value) == "2c74b134a25e6bb29c9035937542c906")
  {
    //window.moveTo('tsp.html')/*opens the target page while Id & password matches*/
	locked = false;
	window.open("home.html","_self");
  }
 else
 {
   alert("Error Password or Username")/*displays error message*/
  }
}

