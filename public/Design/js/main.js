

/* ============ TITLE TOOLTIP TOOGLE ============== */
	
$(function () 
{
	$('[data-toggle="tooltip"]').tooltip();
});

/* ============ VALIDATE EMAIL ============== */

function ValidateEmail(mail) 
{
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
    {
        return (true);
    }
    return (false);
}

/* ============ VALIDATE PHONE NUMBER ============== */

function phonenumber(inputtxt)
{
    var cleaned = String(inputtxt).replace(/[\s\-\+\(\)]/g, '');
    var phoneno = /^[0-9]{8,15}$/;
    return phoneno.test(cleaned);
}

/* ============ SEND CONTACT FORM ============== */

$('#contact_send').click(function()
{
    var contact_name = $('#contact_name').val();
    var contact_email = $('#contact_email').val();
    var contact_subject = $('#contact_subject').val();
    var contact_message = $('#contact_message').val();

    if($.trim(contact_name) === "" || $.trim(contact_email) === "" || $.trim(contact_message) === "")
    {
        $('#contact_status_message').html("<div class='alert alert-danger' style='background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #fca5a5;'>Harap lengkapi kolom nama, email, dan pesan Anda!</div>");
    }
    else
    {
        if(!ValidateEmail(contact_email))
        {
            $('#contact_status_message').html("<div class='alert alert-danger' style='background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #fca5a5;'>Format email yang Anda masukkan tidak valid!</div>");
        }
        else
        {
            $.ajax({
                url: "Includes/php-files-ajax/contact.php",
                type: "POST",
                data:{contact_name:contact_name, contact_email:contact_email, contact_subject:contact_subject, contact_message:contact_message},
                cache: false,
                beforeSend: function(){
                    $('#contact_ajax_loader').show();
                },
                complete: function(){
                    $('#contact_ajax_loader').hide();
                },
                success: function (data) 
                {
                    $('#contact_status_message').html(data);
                },
                error: function(xhr, status, error) 
                {
                    alert("Terjadi kendala saat mengirim pesan, silakan coba lagi.");
                }
            });
        }
    }
});                               

/* ============ TOGGLE MOBILE NAVBAR ============== */

$(".mob-menu-toggle").click(function()
{
	$("#menu_mobile").toggleClass("active");
	$("#menu_mobile_overlay").toggleClass("active");
});

$('.mob-close-toggle, #menu_mobile_overlay, .a-mob-menu').click(function() 
{
	$("#menu_mobile").removeClass("active"); 
	$("#menu_mobile_overlay").removeClass("active"); 
});


/* ============ APPOINTMENT PAGE TOGGLE CHECKBOX ============== */

$('.service_label').click(function() 
{
    $(this).button('toggle');
}); 

/* ============ APPOINTMENT PAGE MULTISTEPS FORM JS CODE ============== */

var currentTab = 0;
showTab(currentTab);

function showTab(n) 
{
    var x = document.getElementsByClassName("tab_reservation");

    if(x[0] == null)
    {
        return;
    }
    x[n].style.display = "block";
    
    if (n == 0) 
    {
        document.getElementById("prevBtn").style.display = "none";
    }
    else 
    {
        document.getElementById("prevBtn").style.display = "inline";
    }

    document.getElementById("prevBtn").innerHTML = "<i class='fas fa-arrow-left mr-1'></i> Kembali";

    if (n == (x.length - 1)) 
    {
        document.getElementById("nextBtn").innerHTML = "<i class='fas fa-check-circle mr-1'></i> Konfirmasi Reservasi";
    }
    else 
    {
        document.getElementById("nextBtn").innerHTML = "Lanjut <i class='fas fa-arrow-right ml-1'></i>";
    }

    fixStepIndicator(n);
}


function nextPrev(n) 
{
    var x = document.getElementsByClassName("tab_reservation");

    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;

    if (currentTab >= x.length) 
    {
        document.getElementById("appointment_form").submit();
        return false;
    }
    
    showTab(currentTab);
}




function validateForm() 
{
    var x, id_tab, valid = true;
    x = document.getElementsByClassName("tab_reservation");
    id_tab = x[currentTab].id;

    if(id_tab == "services_tab")
    {
        if(x[currentTab].querySelectorAll('input[type="checkbox"]:checked').length == 0)
        {
            x[currentTab].getElementsByClassName("alert")[0].style.display = "block";
            valid = false;
        }
        else
        {
            x[currentTab].getElementsByClassName("alert")[0].style.display = "none";
        }
    }

    if(id_tab == "employees_tab")
    {
        if(x[currentTab].querySelectorAll('input[type="radio"]:checked').length == 0)
        {
            x[currentTab].getElementsByClassName("alert")[0].style.display = "block";
            valid = false;
        }
        else
        {
            x[currentTab].getElementsByClassName("alert")[0].style.display = "none";

            var selected_services = [];

            $("input[name='selected_services[]']:checked").each(function(){
                selected_services.push($(this).val());
            })


            var selected_employee = $("input[name='selected_employee']:checked").val();

            $.ajax(
            {

                url:"calendar.php",
                method:"POST",
                data:{selected_services:selected_services,selected_employee:selected_employee},
                success: function (data) 
                {
                    $('#calendar_tab_in').html(data);
                },
                beforeSend: function()
                {
                    $('#calendar_loading').show();
                },
                complete: function()
                {
                    $('#calendar_loading').hide();
                },
                error: function(xhr, status, error) 
                {
                    alert('Terjadi kesalahan saat memuat jadwal. Silakan coba kembali.');
                }
            });

        }
    }

    if(id_tab == "calendar_tab")
    {
        if(x[currentTab].querySelectorAll('input[type="radio"]:checked').length == 0)
        {
            x[currentTab].getElementsByClassName("alert")[0].style.display = "block";
            valid = false;
        }
        else
        {
            x[currentTab].getElementsByClassName("alert")[0].style.display = "none";
        }
    }

    if(id_tab == "client_tab")
    {
        var client_f_name = $('#client_first_name').val();
        var client_l_name = $('#client_last_name').val();
        var client_email = $('#client_email').val();
        var client_phone_number = $('#client_phone_number').val();

        if($.trim(client_f_name) == "")
        {
            $('#client_first_name').css("border", "2px solid #dc3545");
            $("#client_first_name ~ span").css("display", "block");
            valid = false;
        }
        else
        {
            $('#client_first_name').css("border", "0px");
            $("#client_first_name ~ span").css("display", "none");

            if($.trim(client_l_name) == "")
            {
                $('#client_last_name').css("border", "2px solid #dc3545");
                $("#client_last_name ~ span").css("display", "block");
                valid = false;
            }
            else
            {
                $('#client_last_name').css("border", "0px");
                $("#client_last_name ~ span").css("display", "none");

                if(!ValidateEmail(client_email))
                {
                    $('#client_email').css("border", "2px solid #dc3545");
                    $("#client_email ~ span").css("display", "block");
                    valid = false;
                }
                else
                {
                    $('#client_email').css("border", "0px");
                    $("#client_email ~ span").css("display", "none");

                    if(!phonenumber(client_phone_number))
                    {
                        $('#client_phone_number').css("border", "2px solid #dc3545");
                        $("#client_phone_number ~ span").css("display", "block");
                        valid = false;
                    }
                    else
                    {
                        $('#client_phone_number').css("border", "0px");
                        $("#client_phone_number ~ span").css("display", "none");
                    }
                }
            }
        }
    }

    if (valid) 
    {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    
    return valid;
}

function fixStepIndicator(n) 
{
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++)
    {
        x[i].className = x[i].className.replace(" active", "");
    }

    x[n].className += " active";
}


