$(function() {
    
        $('#login-form-link').click(function(e) {
            $("#login-form").delay(100).fadeIn(100);
             $("#register-form").fadeOut(100);
            $('#register-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });
        $('#register-form-link').click(function(e) {
            $("#register-form").delay(100).fadeIn(100);
             $("#login-form").fadeOut(100);
            $('#login-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });
    
    });
    





    $(document).ready(
    function(){
        $('#button').click(
            function(){
                var toAdd = $('input[name=ListItem]').val();
                    $('ol').append('<li>' + toAdd + '</li>');
            });
        
        $("input[name=ListItem]").keyup(function(event){
            if(event.keyCode == 13){
            $("#button").click();
            }         
        });
        
        $(document).on('dblclick','li', function(){
        $(this).toggleClass('strike').fadeOut('slow');    
        });
        
        $('input').focus(function() {
        $(this).val('');
        });
        
        $('ol').sortable();  
        
    }
    );