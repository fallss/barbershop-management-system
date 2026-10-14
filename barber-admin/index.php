<?php 
	session_start();

	//Check If user is already logged in
	if(isset($_SESSION['username_barbershop_Xw211qAAsq4']) && isset($_SESSION['password_barbershop_Xw211qAAsq4']))
	{
        //Page Title
        $pageTitle = 'Dashboard Utama';

        //Includes
        include 'connect.php';
        include 'Includes/functions/functions.php'; 
        include 'Includes/templates/header.php';

?>
	<!-- Begin Page Content -->
	<div class="container-fluid">
		
		<!-- Page Heading -->
		<div class="d-sm-flex align-items-center justify-content-between mb-4">
			<div>
                <h1 class="h3 mb-1 text-gray-800 font-weight-bold">Dashboard Manajemen</h1>
                <p class="text-muted small mb-0">Selamat datang kembali, pantau jadwal dan aktivitas reservasi barbershop Anda di sini.</p>
            </div>
			<a href="../appointment.php" target="_blank" class="btn btn-sm btn-primary shadow-sm">
				<i class="far fa-calendar-plus fa-sm text-white-50 mr-1"></i>
				Tambah Reservasi Baru
			</a>
		</div>

		<!-- Content Row: Metric Cards -->
		<div class="row">

			<div class="col-xl-3 col-md-6 mb-4">
				<div class="card border-left-primary shadow h-100 py-2">
					<div class="card-body">
				  		<div class="row no-gutters align-items-center">
							<div class="col mr-2">
					  			<div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
					  				Total Pelanggan
					  			</div>
					  			<div class="h5 mb-0 font-weight-bold text-gray-800"><?php echo countItems("client_id","clients")?> Orang</div>
							</div>
							<div class="col-auto">
					  			<i class="bs bs-boy fa-2x text-gray-300"></i>
							</div>
				  		</div>
					</div>
			  	</div>
			</div>

			<div class="col-xl-3 col-md-6 mb-4">
				<div class="card border-left-success shadow h-100 py-2">
					<div class="card-body">
				  		<div class="row no-gutters align-items-center">
							<div class="col mr-2">
					  			<div class="text-xs font-weight-bold text-success text-uppercase mb-1">
					  				Total Layanan
					  			</div>
					  			<div class="h5 mb-0 font-weight-bold text-gray-800"><?php echo countItems("service_id","services")?> Menu</div>
							</div>
							<div class="col-auto">
					  			<i class="bs bs-scissors-1 fa-2x text-gray-300"></i>
							</div>
				  		</div>
					</div>
			  	</div>
			</div>

			<div class="col-xl-3 col-md-6 mb-4">
				<div class="card border-left-info shadow h-100 py-2">
					<div class="card-body">
				  		<div class="row no-gutters align-items-center">
							<div class="col mr-2">
					  			<div class="text-xs font-weight-bold text-info text-uppercase mb-1">
					  				Barber / Karyawan
					  			</div>
					  			<div class="row no-gutters align-items-center">
									<div class="col-auto">
						  				<div class="h5 mb-0 mr-3 font-weight-bold text-gray-800"><?php echo countItems("employee_id","employees")?> Staf Aktif</div>
									</div>
					  			</div>
							</div>
							<div class="col-auto">
					  			<i class="bs bs-man fa-2x text-gray-300"></i>
							</div>
				  		</div>
					</div>
			  	</div>
			</div>

			<div class="col-xl-3 col-md-6 mb-4">
				<div class="card border-left-warning shadow h-100 py-2">
					<div class="card-body">
				  		<div class="row no-gutters align-items-center">
							<div class="col mr-2">
					  			<div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
					  				Total Reservasi
					  			</div>
					  			<div class="h5 mb-0 font-weight-bold text-gray-800"><?php echo countItems("appointment_id","appointments")?> Transaksi</div>
							</div>
							<div class="col-auto">
					  			<i class="fas fa-calendar fa-2x text-gray-300"></i>
							</div>
				 		</div>
					</div>
			  	</div>
			</div>
		</div>

		<!-- Appointment Tables Card -->
        <div class="card shadow mb-4">
            <div class="card-header tab" style="padding: 0px !important; background: #2e59d9 !important;">
            	<button class="tablinks active font-weight-bold" onclick="openTab(event, 'Upcoming')">
            		<i class="far fa-clock mr-1"></i> Jadwal Mendatang
            	</button>
                <button class="tablinks font-weight-bold" onclick="openTab(event, 'All')">
                	<i class="fas fa-list-alt mr-1"></i> Semua Riwayat Reservasi
                </button>
                <button class="tablinks font-weight-bold" onclick="openTab(event, 'Canceled')">
                	<i class="fas fa-calendar-times mr-1"></i> Reservasi Dibatalkan
                </button>
            </div>
            <div class="card-body">
            	<div class="table-responsive">
                    <!-- UPCOMING TAB -->
                	<table class="table table-bordered tabcontent" id="Upcoming" style="display:table" width="100%" cellspacing="0">
                  		<thead>
                            <tr>
                                <th>Waktu Mulai</th>
                                <th>Layanan Dipesan</th>
                                <th>Estimasi Selesai</th>
                                <th>Pelanggan</th>
                                <th>Barber Bertugas</th>
                                <th>Aksi / Kelola</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                                $stmt = $con->prepare("SELECT * 
                                                FROM appointments a , clients c
                                                where start_time >= ?
                                                and a.client_id = c.client_id
                                                and canceled = 0
                                                order by start_time ASC;
                                                ");
                                $stmt->execute(array(date('Y-m-d H:i:s')));
                                $rows = $stmt->fetchAll();
                                $count = $stmt->rowCount();

                                if($count == 0)
                                {
                                    echo "<tr>";
                                        echo "<td colspan='6' class='text-center py-4 text-muted'>";
                                            echo "<i class='fas fa-info-circle mr-1'></i> Belum ada jadwal reservasi aktif mendatang saat ini.";
                                        echo "</td>";
                                    echo "</tr>";
                                }
                                else
                                {
                                    foreach($rows as $row)
                                    {
                                        echo "<tr>";
                                            echo "<td><strong>" . date('d M Y, H:i', strtotime($row['start_time'])) . "</strong></td>";
                                            echo "<td>";
                                                $stmtServices = $con->prepare("SELECT service_name, service_price
                                                        from services s, services_booked sb
                                                        where s.service_id = sb.service_id
                                                        and appointment_id = ?");
                                                $stmtServices->execute(array($row['appointment_id']));
                                                $rowsServices = $stmtServices->fetchAll();
                                                foreach($rowsServices as $rowsService)
                                                {
                                                    echo "<span class='badge badge-light border mr-1 mb-1'>" . htmlspecialchars($rowsService['service_name']) . "</span>";
                                                }
                                            echo "</td>";
                                            echo "<td>" . date('H:i', strtotime($row['end_time_expected'])) . " WIB</td>";
                                            echo "<td>";
                                                echo "<strong>" . htmlspecialchars($row['first_name'] . " " . $row['last_name']) . "</strong><br>";
                                                echo "<small class='text-muted'><i class='fas fa-phone-alt mr-1'></i> " . htmlspecialchars($row['phone_number']) . "</small>";
                                            echo "</td>";
                                            echo "<td>";
                                                $stmtEmployees = $con->prepare("SELECT first_name,last_name
                                                        from employees e, appointments a
                                                        where e.employee_id = a.employee_id
                                                        and a.appointment_id = ?");
                                                $stmtEmployees->execute(array($row['appointment_id']));
                                                $rowsEmployees = $stmtEmployees->fetchAll();
                                                foreach($rowsEmployees as $rowsEmployee)
                                                {
                                                    echo "<span class='badge badge-primary px-2 py-1'><i class='fas fa-user-tie mr-1'></i> " . htmlspecialchars(trim($rowsEmployee['first_name'])." ".trim($rowsEmployee['last_name'])) . "</span>";
                                                }
                                            echo "</td>";
                                            
                                            echo "<td>";
                                                $cancel_data = "cancel_appointment_".$row["appointment_id"];
                                                ?>
                                                <button class="btn btn-danger btn-sm" type="button" data-toggle="modal" data-target="#<?php echo $cancel_data; ?>" title="Batalkan Reservasi">
                                                    <i class="fas fa-times mr-1"></i> Batalkan
                                                </button>

                                                <!-- CANCEL MODAL -->
                                                <div class="modal fade" id="<?php echo $cancel_data; ?>" tabindex="-1" role="dialog" aria-labelledby="<?php echo $cancel_data; ?>" aria-hidden="true">
                                                    <div class="modal-dialog" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header bg-danger text-white">
                                                                <h5 class="modal-title font-weight-bold"><i class="fas fa-exclamation-triangle mr-2"></i> Konfirmasi Pembatalan</h5>
                                                                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body text-dark">
                                                                <p>Apakah Anda yakin ingin membatalkan jadwal reservasi pelanggan <strong><?php echo htmlspecialchars($row['first_name']." ".$row['last_name']); ?></strong>?</p>
                                                                <div class="form-group">
                                                                    <label class="font-weight-bold">Alasan Pembatalan:</label>
                                                                    <textarea class="form-control" id="<?php echo "appointment_cancellation_reason_".$row['appointment_id'] ?>" placeholder="Contoh: Pelanggan meminta reschedule atau ada halangan darurat"></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Tutup</button>
                                                                <button type="button" data-id="<?php echo $row['appointment_id']; ?>" class="btn btn-danger cancel_appointment_button">Ya, Batalkan Jadwal</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <?php
                                            echo "</td>";
                                        echo "</tr>";
                                    }
                                }
                            ?>
                        </tbody>
                	</table>

                    <!-- ALL BOOKINGS TAB -->
                	<table class="table table-bordered tabcontent" id="All" width="100%" cellspacing="0">
                  		<thead>
                            <tr>
                                <th>Waktu Mulai</th>
                                <th>Layanan Dipesan</th>
                                <th>Estimasi Selesai</th>
                                <th>Nama Pelanggan</th>
                                <th>Barber Bertugas</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                                $stmt = $con->prepare("SELECT * 
                                                FROM appointments a , clients c
                                                where a.client_id = c.client_id
                                                order by start_time DESC;
                                                ");
                                $stmt->execute(array());
                                $rows = $stmt->fetchAll();
                                $count = $stmt->rowCount();

                                if($count == 0)
                                {
                                    echo "<tr>";
                                        echo "<td colspan='6' class='text-center py-4 text-muted'>";
                                            echo "Belum ada riwayat reservasi yang tercatat.";
                                        echo "</td>";
                                    echo "</tr>";
                                }
                                else
                                {
                                    foreach($rows as $row)
                                    {
                                        echo "<tr>";
                                            echo "<td>" . date('d M Y, H:i', strtotime($row['start_time'])) . "</td>";
                                            echo "<td>";
                                                $stmtServices = $con->prepare("SELECT service_name
                                                        from services s, services_booked sb
                                                        where s.service_id = sb.service_id
                                                        and appointment_id = ?");
                                                $stmtServices->execute(array($row['appointment_id']));
                                                $rowsServices = $stmtServices->fetchAll();
                                                foreach($rowsServices as $rowsService)
                                                {
                                                    echo "<span class='badge badge-light border mr-1'>" . htmlspecialchars($rowsService['service_name']) . "</span>";
                                                }
                                            echo "</td>";
                                            echo "<td>" . date('H:i', strtotime($row['end_time_expected'])) . "</td>";
                                            echo "<td><strong>" . htmlspecialchars($row['first_name'] . " " . $row['last_name']) . "</strong></td>";
                                            echo "<td>";
                                                $stmtEmployees = $con->prepare("SELECT first_name,last_name
                                                        from employees e, appointments a
                                                        where e.employee_id = a.employee_id
                                                        and a.appointment_id = ?");
                                                $stmtEmployees->execute(array($row['appointment_id']));
                                                $rowsEmployees = $stmtEmployees->fetchAll();
                                                foreach($rowsEmployees as $rowsEmployee)
                                                {
                                                    echo htmlspecialchars(trim($rowsEmployee['first_name'])." ".trim($rowsEmployee['last_name']));
                                                }
                                            echo "</td>";
                                            echo "<td>";
                                                if($row['canceled'] == 1) {
                                                    echo "<span class='badge badge-danger'>Dibatalkan</span>";
                                                } else if(strtotime($row['start_time']) > time()) {
                                                    echo "<span class='badge badge-success'>Mendatang</span>";
                                                } else {
                                                    echo "<span class='badge badge-secondary'>Selesai</span>";
                                                }
                                            echo "</td>";
                                        echo "</tr>";
                                    }
                                }
                            ?>
                        </tbody>
                	</table>

                    <!-- CANCELED TAB -->
                	<table class="table table-bordered tabcontent" id="Canceled" width="100%" cellspacing="0">
                  		<thead>
                            <tr>
                                <th>Waktu Mulai</th>
                                <th>Nama Pelanggan</th>
                                <th>Alasan Pembatalan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                                $stmt = $con->prepare("SELECT * 
                                                FROM appointments a , clients c
                                                where canceled = 1
                                                and a.client_id = c.client_id
                                                order by start_time DESC;
                                                ");
                                $stmt->execute(array());
                                $rows = $stmt->fetchAll();
                                $count = $stmt->rowCount();

                                if($count == 0)
                                {
                                    echo "<tr>";
                                        echo "<td colspan='3' class='text-center py-4 text-muted'>";
                                            echo "Tidak ada riwayat reservasi yang dibatalkan.";
                                        echo "</td>";
                                    echo "</tr>";
                                }
                                else
                                {
                                    foreach($rows as $row)
                                    {
                                        echo "<tr>";
                                            echo "<td>" . date('d M Y, H:i', strtotime($row['start_time'])) . "</td>";
                                            echo "<td><strong>" . htmlspecialchars($row['first_name'] . " " . $row['last_name']) . "</strong></td>";
                                            echo "<td><span class='text-danger font-italic'>" . htmlspecialchars($row['cancellation_reason'] ?: 'Tidak ada alasan disebutkan') . "</span></td>";
                                        echo "</tr>";
                                    }
                                }
                            ?>
                        </tbody>
                	</table>
              	</div>
            </div>
        </div>
	</div>

<?php
		//Include Footer
		include 'Includes/templates/footer.php';
	}
	else
    {
    	header('Location: login.php');
        exit();
    }
?>
