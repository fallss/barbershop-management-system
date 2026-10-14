<?php
    session_start();

    //Page Title
    $pageTitle = 'Jadwal Jam Kerja Barber';

    //Includes
    include 'connect.php';
    include 'Includes/functions/functions.php'; 
    include 'Includes/templates/header.php';

    //Extra JS FILES
    echo "<script src='https://unpkg.com/sweetalert/dist/sweetalert.min.js'></script>";

    //Check If user is already logged in
    if(isset($_SESSION['username_barbershop_Xw211qAAsq4']) && isset($_SESSION['password_barbershop_Xw211qAAsq4']))
    {
?>
        <!-- Begin Page Content -->
        <div class="container-fluid">
    
            <!-- Page Heading -->
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <div>
                    <h1 class="h3 mb-1 text-gray-800 font-weight-bold">Pengaturan Jam Kerja Barber</h1>
                    <p class="text-muted small mb-0">Tentukan hari kerja aktif serta jam mulai dan jam selesai untuk masing-masing barber.</p>
                </div>
            </div>

            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Jadwal Mingguan Karyawan</h6>
                </div>
                <div class="card-body">
                    <div class="sb-entity-selector" style="max-width: 450px;">
                        <form action="employees-schedule.php" method="POST">
                            <div class="form-group">
                                <label class="font-weight-bold" for="emloyee_schedule_select">
                                    Pilih Barber untuk Menampilkan / Mengatur Jadwal:
                                </label>
                                <div class="d-flex align-items-center">
                                    <?php 
                                        $stmt = $con->prepare('SELECT * FROM employees ORDER BY employee_id ASC');
                                        $stmt->execute();
                                        $employees = $stmt->fetchAll();
                                    
                                        echo "<select class='form-control mr-2' name='employee_selected' id='emloyee_schedule_select'>";
                                            foreach ($employees as $employee) 
                                            {
                                                $selected = (isset($_POST['employee_selected']) && $_POST['employee_selected'] == $employee['employee_id']) ? 'selected' : '';
                                                echo "<option value='".$employee['employee_id']."' $selected>".htmlspecialchars(trim($employee['first_name'])." ".trim($employee['last_name']))."</option>";
                                            }
                                        echo "</select>";                                    
                                    ?>
                                    <button type="submit" name="show_schedule_sbmt" class="btn btn-primary" style="white-space: nowrap;">
                                        <i class="fas fa-search mr-1"></i> Tampilkan
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle mr-1"></i> Centang hari kerja yang aktif, lalu tentukan jam mulai dan jam selesai kerja. Klik tombol <strong>Simpan Jadwal</strong> di bawah.
                    </div>
                    
                    <!-- SCHEDULE PART -->
                    <div class="sb-content">
                        <?php
                            if(isset($_POST['show_schedule_sbmt']))
                            {
                                $employee_id = $_POST['employee_selected'];
                        ?>
                                <form method="POST" action="employees-schedule.php">
                                    <input type="hidden" name="employee_id" value="<?php echo htmlspecialchars($employee_id); ?>">     
                                    <div class="worktime-days border rounded p-3 mb-4 bg-light">
                                        <?php
                                            $stmt = $con->prepare('SELECT * FROM employees e, employees_schedule es WHERE es.employee_id = e.employee_id AND e.employee_id = ?');
                                            $stmt->execute(array($employee_id));
                                            $employee_sched = $stmt->fetchAll();
                            
                                            $days = array(
                                                "1" => array("name" => "Monday", "label" => "Senin"),
                                                "2" => array("name" => "Tuesday", "label" => "Selasa"),
                                                "3" => array("name" => "Wednsday", "label" => "Rabu"),
                                                "4" => array("name" => "Thursday", "label" => "Kamis"),
                                                "5" => array("name" => "Friday", "label" => "Jumat"),
                                                "6" => array("name" => "Saturday", "label" => "Sabtu"),
                                                "7" => array("name" => "Sunday", "label" => "Minggu")
                                            );
                                        
                                            $av_days = array();
                                            $day_hours = array();
                                            foreach($employee_sched as $sch)
                                            {
                                                $av_days[] = $sch['day_id'];
                                                $day_hours[$sch['day_id']] = array('from' => $sch['from_hour'], 'to' => $sch['to_hour']);
                                            }
                                        
                                            foreach($days as $key => $dInfo)
                                            {
                                                $varName = $dInfo['name'];
                                                $dayLabel = $dInfo['label'];
                                                $isChecked = in_array($key, $av_days);
                                                $fromVal = $isChecked ? $day_hours[$key]['from'] : '09:00:00';
                                                $toVal = $isChecked ? $day_hours[$key]['to'] : '18:00:00';

                                                echo "<div class='worktime-day row align-items-center py-2 border-bottom'>";
                                                    echo "<div class='col-md-4 d-flex align-items-center'>";
                                                        echo "<input name='".$varName."' id='chk_".$key."' class='sb-worktime-day-switch mr-2' type='checkbox' ".($isChecked ? 'checked' : '')." style='transform: scale(1.3);'>";
                                                        echo "<label for='chk_".$key."' class='day-name font-weight-bold mb-0 text-dark' style='cursor:pointer;'>";                
                                                            echo $dayLabel;
                                                        echo "</label>";
                                                    echo "</div>";
                                                    
                                                    echo "<div class='time_ col-md-8 row' style='".($isChecked ? '' : 'display:none;')."'>";
                                                        echo "<div class='col-6 d-flex align-items-center'>";
                                                            echo "<span class='small mr-2 text-muted'>Mulai:</span>";
                                                            echo "<input type='time' name='".$varName."-from' value='".$fromVal."' class='form-control'>";
                                                        echo "</div>";
                                                        echo "<div class='col-6 d-flex align-items-center'>";
                                                            echo "<span class='small mr-2 text-muted'>Selesai:</span>";
                                                            echo "<input type='time' name='".$varName."-to' value='".$toVal."' class='form-control'>";
                                                        echo "</div>";
                                                    echo "</div>";
                                                echo "</div>";
                                            }
                                        ?>
                                    </div>

                                    <!-- SAVE SCHEDULE BUTTON -->
                                    <div class="form-group mb-0">
                                        <button type="submit" name="save_schedule_sbmt" class="btn btn-success font-weight-bold">
                                            <i class="fas fa-save mr-1"></i> Simpan Jadwal Kerja
                                        </button>
                                    </div>
                                </form>
                        <?php
                            }
                        ?>
                    </div>

                    <?php
                        if(isset($_POST['save_schedule_sbmt']))
                        {
                            $days_save = array(
                                "1" => "Monday",
                                "2" => "Tuesday",
                                "3" => "Wednsday",
                                "4" => "Thursday",
                                "5" => "Friday",
                                "6" => "Saturday",
                                "7" => "Sunday"
                            );
                            
                            $stmt = $con->prepare("DELETE FROM employees_schedule WHERE employee_id = ?");
                            $stmt->execute(array($_POST['employee_id']));
                            
                            foreach($days_save as $key => $value)
                            {
                                if(isset($_POST[$value]))
                                {   
                                    $stmt = $con->prepare("INSERT INTO employees_schedule (employee_id, day_id, from_hour, to_hour) VALUES (?, ?, ?, ?)");
                                    $stmt->execute(array($_POST['employee_id'], $key, $_POST[$value.'-from'], $_POST[$value.'-to']));
                                }
                            }
                            ?>
                                <script type="text/javascript">
                                    swal("Berhasil Disimpan!","Jadwal kerja barber telah berhasil diperbarui di database.","success"); 
                                </script>
                            <?php
                        }
                    ?>
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