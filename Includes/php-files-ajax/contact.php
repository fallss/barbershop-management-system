<?php

    include "../functions/functions.php";
	
	if(isset($_POST['contact_name']) && isset($_POST['contact_email']) && isset($_POST['contact_message']))
	{
		$contact_name = test_input($_POST['contact_name']);
        $contact_email  = test_input($_POST['contact_email']);
        $contact_subject = isset($_POST['contact_subject']) ? test_input($_POST['contact_subject']) : 'Pertanyaan dari Website';
        $contact_message = test_input($_POST['contact_message']);        

        try
        {
            @mail("contact@barberialuxe.id", $contact_subject, $contact_message);
            echo "<div class='alert alert-success' style='background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #a7f3d0; border-radius: 8px; padding: 14px;'>";
                echo "<i class='fas fa-check-circle mr-2'></i> <strong>Pesan Berhasil Terkirim!</strong> Terima kasih " . htmlspecialchars($contact_name) . ", tim kami akan segera menghubungi Anda melalui email atau nomor WhatsApp.";
            echo "</div>";
        }
        catch(Exception $ex)
        {
            echo "<div class='alert alert-warning' style='background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; color: #fde68a; border-radius: 8px; padding: 14px;'>";
                echo "<i class='fas fa-exclamation-triangle mr-2'></i> Terjadi kendala saat mengirim pesan, silakan hubungi kami langsung via WhatsApp atau coba sesaat lagi.";
            echo "</div>";
        }
	}

?>