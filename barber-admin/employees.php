<?php
    ob_start();
    session_start();

    //Page Title
    $pageTitle = 'Data Karyawan / Barber';

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
                    <h1 class="h3 mb-1 text-gray-800 font-weight-bold">Manajemen Karyawan / Barber</h1>
                    <p class="text-muted small mb-0">Kelola profil barber, nomor kontak, dan penugasan jadwal kerja.</p>
                </div>
                <?php if(!isset($_GET['do']) || $_GET['do'] == 'Manage') { ?>
                    <a href="employees.php?do=Add" class="btn btn-primary btn-sm shadow-sm">
                        <i class="fa fa-plus fa-sm text-white-50 mr-1"></i> 
                        Tambah Barber Baru
                    </a>
                <?php } else { ?>
                    <a href="employees.php" class="btn btn-secondary btn-sm shadow-sm">
                        <i class="fa fa-arrow-left fa-sm text-white-50 mr-1"></i> 
                        Kembali ke Daftar Barber
                    </a>
                <?php } ?>
            </div>

            <?php
                $do = '';

                if(isset($_GET['do']) && in_array($_GET['do'], array('Add','Edit')))
                {
                    $do = htmlspecialchars($_GET['do']);
                }
                else
                {
                    $do = 'Manage';
                }

                if($do == 'Manage')
                {
                    $stmt = $con->prepare("SELECT * FROM employees ORDER BY employee_id ASC");
                    $stmt->execute();
                    $rows_employees = $stmt->fetchAll(); 
                    ?>
                        <div class="card shadow mb-4">
                            <div class="card-header py-3 d-flex align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">Daftar Barber Aktif</h6>
                                <span class="badge badge-primary px-3 py-2"><?php echo count($rows_employees); ?> Barber</span>
                            </div>
                            <div class="card-body">
                                <!-- Employees Table -->
                                <div class="table-responsive">
                                    <table class="table table-bordered table-hover">
                                        <thead class="thead-light">
                                            <tr>
                                                <th style="width: 70px;">ID#</th>
                                                <th>Nama Lengkap Barber</th>
                                                <th>Nomor Telepon / WhatsApp</th>
                                                <th>Alamat Email</th>
                                                <th class="text-center" style="width: 130px;">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php
                                                foreach($rows_employees as $employee)
                                                {
                                                    echo "<tr>";
                                                        echo "<td class='font-weight-bold text-primary'>#" . $employee['employee_id'] . "</td>";
                                                        echo "<td><strong><i class='fas fa-user-tie text-muted mr-2'></i>" . htmlspecialchars(trim($employee['first_name'])." ".trim($employee['last_name'])) . "</strong></td>";
                                                        echo "<td><i class='fab fa-whatsapp text-success mr-1'></i> " . htmlspecialchars($employee['phone_number']) . "</td>";
                                                        echo "<td><i class='far fa-envelope text-muted mr-1'></i> " . htmlspecialchars($employee['email']) . "</td>";
                                                        echo "<td class='text-center'>";
                                                            $delete_data = "delete_employee_".$employee["employee_id"];
                                                            ?>
                                                            <a href="employees.php?do=Edit&employee_id=<?php echo $employee['employee_id']; ?>" class="btn btn-success btn-sm" title="Ubah Data">
                                                                <i class="fa fa-edit"></i>
                                                            </a>
                                                            <a href="employees-schedule.php" class="btn btn-info btn-sm" title="Atur Jam Kerja">
                                                                <i class="fas fa-calendar-alt"></i>
                                                            </a>
                                                            <button class="btn btn-danger btn-sm" type="button" data-toggle="modal" data-target="#<?php echo $delete_data; ?>" title="Hapus">
                                                                <i class="fa fa-trash"></i>
                                                            </button>

                                                            <!-- Delete Modal -->
                                                            <div class="modal fade" id="<?php echo $delete_data; ?>" tabindex="-1" role="dialog" aria-hidden="true">
                                                                <div class="modal-dialog" role="document">
                                                                    <div class="modal-content">
                                                                        <div class="modal-header bg-danger text-white">
                                                                            <h5 class="modal-title font-weight-bold"><i class="fas fa-trash-alt mr-2"></i> Hapus Barber</h5>
                                                                            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                                                                                <span aria-hidden="true">&times;</span>
                                                                            </button>
                                                                        </div>
                                                                        <div class="modal-body text-left">
                                                                            Apakah Anda yakin ingin menghapus data barber <strong>"<?php echo htmlspecialchars(trim($employee['first_name'])." ".trim($employee['last_name'])); ?>"</strong>?
                                                                        </div>
                                                                        <div class="modal-footer">
                                                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
                                                                            <button type="button" data-id="<?php echo $employee['employee_id']; ?>" class="btn btn-danger delete_employee_bttn">Ya, Hapus</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <?php
                                                        echo "</td>";
                                                    echo "</tr>";
                                                }
                                            ?>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    <?php
                }
                elseif($do == 'Add')
                {
                    ?>
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Formulir Tambah Barber Baru</h6>
                        </div>
                        <div class="card-body">
                            <form method="POST" action="employees.php?do=Add">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="font-weight-bold">Nama Depan *</label>
                                            <input type="text" class="form-control" name="employee_fname" placeholder="Contoh: Rian" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="font-weight-bold">Nama Belakang *</label>
                                            <input type="text" class="form-control" name="employee_lname" placeholder="Contoh: Pratama" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="font-weight-bold">Nomor WhatsApp / Telepon *</label>
                                            <input type="text" class="form-control" name="employee_phone" placeholder="0812xxxxxxxx" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="font-weight-bold">Alamat Email *</label>
                                            <input type="email" class="form-control" name="employee_email" placeholder="barber@barberialuxe.id" required>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" name="add_new_employee" class="btn btn-primary">
                                    <i class="fas fa-save mr-1"></i> Simpan Data Barber
                                </button>
                                <a href="employees.php" class="btn btn-secondary ml-2">Batal</a>
                            </form>

                            <?php
                                if(isset($_POST['add_new_employee']) && $_SERVER['REQUEST_METHOD'] == 'POST')
                                {
                                    $employee_fname = test_input($_POST['employee_fname']);
                                    $employee_lname = test_input($_POST['employee_lname']);
                                    $employee_phone = test_input($_POST['employee_phone']);
                                    $employee_email = test_input($_POST['employee_email']);

                                    if(!empty($employee_fname) && !empty($employee_lname) && !empty($employee_phone) && !empty($employee_email))
                                    {
                                        try
                                        {
                                            $stmt = $con->prepare("INSERT INTO employees (first_name, last_name, phone_number, email) VALUES (?, ?, ?, ?)");
                                            $stmt->execute(array($employee_fname, $employee_lname, $employee_phone, $employee_email));
                                            ?>
                                            <script type="text/javascript">
                                                swal("Berhasil Disimpan!","Data barber baru telah berhasil ditambahkan.","success").then(() => {
                                                    window.location.replace("employees.php");
                                                });
                                            </script>
                                            <?php
                                        }
                                        catch(Exception $e)
                                        {
                                            echo "<div class='alert alert-danger mt-3'>Terjadi kesalahan: " . htmlspecialchars($e->getMessage()) . "</div>";
                                        }
                                    }
                                }
                            ?>
                        </div>
                    </div>
                    <?php
                }
                elseif($do == 'Edit')
                {
                    $employee_id = (isset($_GET['employee_id']) && is_numeric($_GET['employee_id'])) ? intval($_GET['employee_id']) : 0;
                    $stmt = $con->prepare("SELECT * FROM employees WHERE employee_id = ?");
                    $stmt->execute(array($employee_id));
                    $employee = $stmt->fetch();

                    if($employee)
                    {
                        ?>
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Edit Profil Barber: <?php echo htmlspecialchars(trim($employee['first_name'])." ".trim($employee['last_name'])); ?></h6>
                            </div>
                            <div class="card-body">
                                <form method="POST" action="employees.php?do=Edit&employee_id=<?php echo $employee_id; ?>">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="font-weight-bold">Nama Depan *</label>
                                                <input type="text" class="form-control" name="employee_fname" value="<?php echo htmlspecialchars(trim($employee['first_name'])); ?>" required>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="font-weight-bold">Nama Belakang *</label>
                                                <input type="text" class="form-control" name="employee_lname" value="<?php echo htmlspecialchars(trim($employee['last_name'])); ?>" required>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="font-weight-bold">Nomor WhatsApp / Telepon *</label>
                                                <input type="text" class="form-control" name="employee_phone" value="<?php echo htmlspecialchars($employee['phone_number']); ?>" required>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="font-weight-bold">Alamat Email *</label>
                                                <input type="email" class="form-control" name="employee_email" value="<?php echo htmlspecialchars($employee['email']); ?>" required>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" name="edit_employee_sbmt" class="btn btn-success">
                                        <i class="fas fa-check mr-1"></i> Simpan Perubahan
                                    </button>
                                    <a href="employees.php" class="btn btn-secondary ml-2">Batal</a>
                                </form>

                                <?php
                                    if(isset($_POST['edit_employee_sbmt']) && $_SERVER['REQUEST_METHOD'] == 'POST')
                                    {
                                        $employee_fname = test_input($_POST['employee_fname']);
                                        $employee_lname = test_input($_POST['employee_lname']);
                                        $employee_phone = test_input($_POST['employee_phone']);
                                        $employee_email = test_input($_POST['employee_email']);

                                        try
                                        {
                                            $stmt = $con->prepare("UPDATE employees SET first_name = ?, last_name = ?, phone_number = ?, email = ? WHERE employee_id = ?");
                                            $stmt->execute(array($employee_fname, $employee_lname, $employee_phone, $employee_email, $employee_id));
                                            ?>
                                            <script type="text/javascript">
                                                swal("Berhasil Diperbarui!","Data barber berhasil diperbarui.","success").then(() => {
                                                    window.location.replace("employees.php");
                                                });
                                            </script>
                                            <?php
                                        }
                                        catch(Exception $e)
                                        {
                                            echo "<div class='alert alert-danger mt-3'>Terjadi kesalahan: " . htmlspecialchars($e->getMessage()) . "</div>";
                                        }
                                    }
                                ?>
                            </div>
                        </div>
                        <?php
                    }
                }
            ?>
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