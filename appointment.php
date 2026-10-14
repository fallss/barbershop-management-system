<!-- PHP INCLUDES -->

<?php

    include "connect.php";
    include "Includes/functions/functions.php";
    include "Includes/templates/header.php";
    include "Includes/templates/navbar.php";

?>
<!-- Appointment Page Stylesheet -->
<link rel="stylesheet" href="Design/css/appointment-page-style.css">

<!-- BOOKING APPOINTMENT SECTION -->

<section class="booking_section">
	<div class="container">

        <div class="booking-header-title">
            <span class="hero-badge mb-2">
                <i class="far fa-calendar-check"></i> Reservasi Mudah & Cepat
            </span>
            <h2>Formulir Booking Janji Temu</h2>
            <p>Silakan ikuti 4 langkah mudah berikut untuk memilih layanan, barber pilihan, dan jadwal kunjungan Anda.</p>
        </div>

        <!-- Step Indicator Nodes -->
        <div class="step-wizard-nav">
            <div class="wizard-step-node active">
                <div class="wizard-step-circle">1</div>
                <span class="wizard-step-label">Layanan</span>
            </div>
            <div class="wizard-step-node">
                <div class="wizard-step-circle">2</div>
                <span class="wizard-step-label">Barber</span>
            </div>
            <div class="wizard-step-node">
                <div class="wizard-step-circle">3</div>
                <span class="wizard-step-label">Waktu</span>
            </div>
            <div class="wizard-step-node">
                <div class="wizard-step-circle">4</div>
                <span class="wizard-step-label">Data Diri</span>
            </div>
        </div>

		<?php

            if(isset($_POST['submit_book_appointment_form']) && $_SERVER['REQUEST_METHOD'] === 'POST')
            {
            	// Selected SERVICES
                $selected_services = isset($_POST['selected_services']) ? $_POST['selected_services'] : [];

                // Selected EMPLOYEE
                $selected_employee = isset($_POST['selected_employee']) ? $_POST['selected_employee'] : '';

                // Selected DATE+TIME
                $selected_date_time = isset($_POST['desired_date_time']) ? explode(' ', $_POST['desired_date_time']) : [];

                if(count($selected_services) > 0 && !empty($selected_employee) && count($selected_date_time) >= 3)
                {
                    $date_selected = $selected_date_time[0];
                    $start_time = $date_selected." ".$selected_date_time[1];
                    $end_time = $date_selected." ".$selected_date_time[2];

                    //Client Details
                    $client_first_name = test_input($_POST['client_first_name']);
                    $client_last_name = test_input($_POST['client_last_name']);
                    $client_phone_number = test_input($_POST['client_phone_number']);
                    $client_email = test_input($_POST['client_email']);

                    $con->beginTransaction();

                    try
                    {
                        // Check If client already exists by email
                        $stmtCheckClient = $con->prepare("SELECT client_id FROM clients WHERE client_email = ?");
                        $stmtCheckClient->execute(array($client_email));
                        $client_result = $stmtCheckClient->fetch();
                        
                        if($client_result)
                        {
                            $client_id = $client_result["client_id"];
                            // Update phone number if changed
                            $stmtUpdateClient = $con->prepare("UPDATE clients SET phone_number = ?, first_name = ?, last_name = ? WHERE client_id = ?");
                            $stmtUpdateClient->execute(array($client_phone_number, $client_first_name, $client_last_name, $client_id));
                        }
                        else
                        {
                            $stmtClient = $con->prepare("INSERT INTO clients (first_name, last_name, phone_number, client_email) VALUES (?, ?, ?, ?)");
                            $stmtClient->execute(array($client_first_name, $client_last_name, $client_phone_number, $client_email));
                            $client_id = $con->lastInsertId();
                        }

                        // Insert Appointment
                        $stmt_appointment = $con->prepare("INSERT INTO appointments (date_created, client_id, employee_id, start_time, end_time_expected, canceled) VALUES (?, ?, ?, ?, ?, 0)");
                        $stmt_appointment->execute(array(date("Y-m-d H:i:s"), $client_id, $selected_employee, $start_time, $end_time));
                        $appointment_id = $con->lastInsertId();

                        // Insert Booked Services
                        foreach($selected_services as $service)
                        {
                            $stmt = $con->prepare("INSERT INTO services_booked (appointment_id, service_id) VALUES (?, ?)");
                            $stmt->execute(array($appointment_id, $service));
                        }

                        $con->commit();

                        echo "<div class='alert alert-success' style='background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #a7f3d0; border-radius: 12px; padding: 22px; font-size: 15px; margin-bottom: 30px;'>";
                            echo "<h4 class='text-white mb-2'><i class='fas fa-check-circle mr-2' style='color: #10b981;'></i> Reservasi Berhasil Dikonfirmasi!</h4>";
                            echo "<p class='mb-1'>Terima kasih, <strong>" . htmlspecialchars($client_first_name . " " . $client_last_name) . "</strong>! Jadwal Anda pada <strong>" . date('d M Y, H:i', strtotime($start_time)) . " WIB</strong> telah tersimpan di sistem kami.</p>";
                            echo "<p class='mb-0 small' style='opacity: 0.85;'>Silakan datang 5-10 menit sebelum jadwal untuk menikmati welcome drink di lounge kami.</p>";
                        echo "</div>";
                    }
                    catch(Exception $e)
                    {
                        $con->rollBack();
                        echo "<div class='alert alert-danger' style='background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #fca5a5; border-radius: 12px; padding: 20px; margin-bottom: 30px;'>";
                            echo "<i class='fas fa-exclamation-triangle mr-2'></i> Gagal menyimpan reservasi: " . htmlspecialchars($e->getMessage());
                        echo "</div>";
                    }
                }
            }

        ?>

		<!-- RESERVATION FORM -->

		<form method="post" id="appointment_form" action="appointment.php">
		
			<!-- 1. SELECT SERVICE -->

			<div class="select_services_div tab_reservation" id="services_tab">

				<!-- ALERT MESSAGE -->

				<div class="alert alert-danger" role="alert" style="display: none; background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #fca5a5; border-radius: 8px;">
					<i class="fas fa-exclamation-circle mr-2"></i> Harap pilih minimal satu layanan sebelum melanjutkan!
				</div>

				<div class="text_header mb-3">
					<h3 style="font-size: 20px; color: #fff; margin: 0;">
						<span style="color: var(--primary-gold);">Langkah 1:</span> Pilih Layanan Barbershop
					</h3>
                    <p style="color: var(--text-muted); font-size: 13.5px; margin-top: 4px;">
                        Anda dapat mencentang lebih dari satu layanan (misal: Potong Rambut + Cukur Handuk Hangat).
                    </p>
				</div>

				<!-- SERVICES TAB -->
				
				<div class="service-select-grid">
        			<?php
        				$stmt = $con->prepare("SELECT * FROM services ORDER BY category_id ASC, service_price ASC");
                    	$stmt->execute();
                    	$rows = $stmt->fetchAll();

                    	foreach($rows as $row)
                    	{
                            $sid = $row['service_id'];
                        ?>
                            <label class="service-card-item" for="srv_<?php echo $sid; ?>">
                                <div class="service-card-left">
                                    <div class="service-check-box">
                                        <i class="fas fa-check" style="font-size: 12px;"></i>
                                    </div>
                                    <input type="checkbox" id="srv_<?php echo $sid; ?>" name="selected_services[]" value="<?php echo $sid; ?>" style="position: absolute; opacity: 0; pointer-events: none;" onchange="this.closest('.service-card-item').classList.toggle('selected', this.checked)">
                                    <div>
                                        <div class="service-info-name"><?php echo htmlspecialchars($row['service_name']); ?></div>
                                        <div class="service-info-desc"><?php echo htmlspecialchars($row['service_description']); ?></div>
                                    </div>
                                </div>
                                <div class="service-card-right">
                                    <span class="service-badge-duration">
                                        <i class="far fa-clock"></i> <?php echo $row['service_duration']; ?> Menit
                                    </span>
                                    <span class="service-badge-price">
                                        Rp <?php echo number_format($row['service_price'], 0, ',', '.'); ?>
                                    </span>
                                </div>
                            </label>
                        <?php
                    	}
            		?>
    			</div>
			</div>

			<!-- 2. SELECT EMPLOYEE -->

			<div class="select_employee_div tab_reservation" id="employees_tab">

				<!-- ALERT MESSAGE -->

				<div class="alert alert-danger" role="alert" style="display: none; background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #fca5a5; border-radius: 8px;">
					<i class="fas fa-exclamation-circle mr-2"></i> Silakan tentukan barber favorit Anda sebelum melanjutkan!
				</div>

				<div class="text_header mb-3">
					<h3 style="font-size: 20px; color: #fff; margin: 0;">
						<span style="color: var(--primary-gold);">Langkah 2:</span> Pilih Barber / Stylist Favorit
					</h3>
                    <p style="color: var(--text-muted); font-size: 13.5px; margin-top: 4px;">
                        Setiap barber kami memiliki keahlian khusus untuk memastikan penampilan terbaik Anda.
                    </p>
				</div>

				<!-- EMPLOYEES TAB -->
				
				<div class="employee-select-grid">
    				<?php
    					$stmt = $con->prepare("SELECT * FROM employees ORDER BY employee_id ASC");
                		$stmt->execute();
                		$rows = $stmt->fetchAll();

                        $emp_roles = [
                            1 => 'Head Master Barber',
                            2 => 'Senior Fade & Modern Stylist',
                            3 => 'Beard & Shave Specialist'
                        ];

                		foreach($rows as $row)
                		{
                            $eid = $row['employee_id'];
                            $role = isset($emp_roles[$eid]) ? $emp_roles[$eid] : 'Professional Barber';
                        ?>
                            <label class="employee-card-item" for="emp_<?php echo $eid; ?>" onclick="document.querySelectorAll('.employee-card-item').forEach(el => el.classList.remove('selected')); this.classList.add('selected');">
                                <input type="radio" id="emp_<?php echo $eid; ?>" class="radio_employee_select" name="selected_employee" value="<?php echo $eid; ?>" style="position: absolute; opacity: 0; pointer-events: none;">
                                <div class="employee-avatar">
                                    <i class="fas fa-user-tie"></i>
                                </div>
                                <div class="employee-card-name"><?php echo htmlspecialchars(trim($row['first_name'])." ".trim($row['last_name'])); ?></div>
                                <span class="employee-card-role"><?php echo $role; ?></span>
                                <div class="employee-select-indicator">
                                    <i class="far fa-check-circle mr-1"></i> Pilih Barber Ini
                                </div>
                            </label>
                        <?php
                		}
        			?>
				</div>
			</div>

			<!-- 3. SELECT DATE & TIME -->

			<div class="select_date_time_div tab_reservation" id="calendar_tab">

				<!-- ALERT MESSAGE -->
				
		        <div class="alert alert-danger" role="alert" style="display: none; background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #fca5a5; border-radius: 8px;">
		          <i class="fas fa-exclamation-circle mr-2"></i> Silakan klik salah satu jam yang tersedia di tabel kalender!
		        </div>

				<div class="text_header mb-3">
					<h3 style="font-size: 20px; color: #fff; margin: 0;">
						<span style="color: var(--primary-gold);">Langkah 3:</span> Tentukan Tanggal & Jam Kunjungan
					</h3>
                    <p style="color: var(--text-muted); font-size: 13.5px; margin-top: 4px;">
                        Pilih slot waktu yang cocok untuk Anda dari jadwal 10 hari ke depan.
                    </p>
				</div>
				
				<div class="calendar_tab_container" id="calendar_tab_in">
					<div id="calendar_loading" style="text-align: center; padding: 40px;">
						<img src="Design/images/ajax_loader_gif.gif" style="display: block; margin: 0 auto 15px auto;">
                        <span style="color: var(--primary-gold); font-size: 14px;">Menyiapkan ketersediaan jadwal barber...</span>
					</div>
				</div>

			</div>

			<!-- 4. CLIENT DETAILS -->

			<div class="client_details_div tab_reservation" id="client_tab">

                <div class="text_header mb-3">
                    <h3 style="font-size: 20px; color: #fff; margin: 0;">
                        <span style="color: var(--primary-gold);">Langkah 4:</span> Informasi & Kontak Pemesan
                    </h3>
                    <p style="color: var(--text-muted); font-size: 13.5px; margin-top: 4px;">
                        Informasi ini digunakan untuk mengirimkan konfirmasi reservasi dan pengingat jadwal Anda.
                    </p>
                </div>

                <div class="contact-form p-4" style="background: var(--dark-card); border-radius: var(--radius-md);">
                    <div class="form-group row">
                        <div class="col-sm-6 mb-3 mb-sm-0">
                            <label class="text-white small font-weight-bold mb-1">Nama Depan *</label>
                            <input type="text" name="client_first_name" id="client_first_name" class="form-control" placeholder="Contoh: Budi">
							<span class="invalid-feedback text-danger" style="font-size: 12px;">Kolom nama depan wajib diisi!</span>
                        </div>
                        <div class="col-sm-6">
                            <label class="text-white small font-weight-bold mb-1">Nama Belakang *</label>
                            <input type="text" name="client_last_name" id="client_last_name" class="form-control" placeholder="Contoh: Nugroho">
							<span class="invalid-feedback text-danger" style="font-size: 12px;">Kolom nama belakang wajib diisi!</span>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-6 mb-3 mb-sm-0">
                            <label class="text-white small font-weight-bold mb-1">Alamat Email *</label>
                            <input type="email" name="client_email" id="client_email" class="form-control" placeholder="nama@email.com">
							<span class="invalid-feedback text-danger" style="font-size: 12px;">Format email tidak valid!</span>
                        </div>
                        <div class="col-sm-6">
                            <label class="text-white small font-weight-bold mb-1">Nomor WhatsApp / HP *</label>
                            <input type="text" name="client_phone_number" id="client_phone_number" class="form-control" placeholder="0812xxxxxxxx">
							<span class="invalid-feedback text-danger" style="font-size: 12px;">Nomor telepon minimal 8-15 digit angka!</span>
						</div>
                    </div>
                </div>
            </div>

			<!-- NEXT AND PREVIOUS BUTTONS -->

			<div class="wizard-btn-row">
                <input type="hidden" name="submit_book_appointment_form">
                <button type="button" id="prevBtn" class="btn-wizard-prev" onclick="nextPrev(-1)">
                    <i class="fas fa-arrow-left mr-1"></i> Kembali
                </button>
                <button type="button" id="nextBtn" class="btn-wizard-next" onclick="nextPrev(1)">
                    Lanjut <i class="fas fa-arrow-right ml-1"></i>
                </button>
  			</div>

  			<!-- Hidden old step dots for JS compatibility -->
  			<div style="display: none;">
    			<span class="step"></span>
    			<span class="step"></span>
    			<span class="step"></span>
    			<span class="step"></span>
  			</div>

		</form>
	</div>
</section>

<!-- SYNC WIZARD NODES JS -->
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const observer = new MutationObserver(function() {
            var dots = document.getElementsByClassName("step");
            var nodes = document.getElementsByClassName("wizard-step-node");
            for(var i = 0; i < dots.length; i++) {
                if(dots[i] && nodes[i]) {
                    nodes[i].className = "wizard-step-node" + (dots[i].classList.contains("active") ? " active" : "") + (dots[i].classList.contains("finish") ? " finish" : "");
                }
            }
        });
        var dotsParent = document.querySelector(".step") ? document.querySelector(".step").parentNode : null;
        if(dotsParent) {
            observer.observe(dotsParent, { attributes: true, subtree: true, attributeFilter: ['class'] });
        }
    });
</script>

<!-- FOOTER BOTTOM -->

<?php include "Includes/templates/footer.php"; ?>