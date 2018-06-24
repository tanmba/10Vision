// Wait for window load

setInterval(function() {
    $('.loader-container').fadeOut("fast");
    $('#load').fadeIn(2900);
    $('#overlay').fadeOut(1900).promise().done(function () {
        $('#pagepiling').fadeIn("2900");
    })
},4000);

$(document).ready(function() {
    /*
     * Plugin intialization
     */
    $('#pagepiling').pagepiling({
        direction: 'horizontal',
        menu: '#menu',
        anchors: ['page1', 'page2', 'page3', 'page4'],
        sectionsColor: ['white', '#ee005a', '#2C3E50', '#39C'],
        navigation: {
            'position': 'right',
            'tooltips': ['Accueil', 'A propos', 'Page 3', 'Pgae 4']
        },
        afterRender: function(){
            $('#pp-nav').addClass('custom');
        },
        afterLoad: function(anchorLink, index){
            if(index>1){
                $('#pp-nav').removeClass('custom');
            }else{
                $('#pp-nav').addClass('custom');
            }
        }
    });
});

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}