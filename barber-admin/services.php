<?php
    ob_start();
    session_start();

    //Page Title
    $pageTitle = 'Daftar Layanan';

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
                    <h1 class="h3 mb-1 text-gray-800 font-weight-bold">Daftar Menu Layanan</h1>
                    <p class="text-muted small mb-0">Atur paket, harga, durasi, dan deskripsi layanan yang tersedia di barbershop.</p>
                </div>
                <?php if(!isset($_GET['do']) || $_GET['do'] == 'Manage') { ?>
                    <a href="services.php?do=Add" class="btn btn-primary btn-sm shadow-sm">
                        <i class="fa fa-plus fa-sm text-white-50 mr-1"></i> 
                        Tambah Layanan Baru
                    </a>
                <?php } else { ?>
                    <a href="services.php" class="btn btn-secondary btn-sm shadow-sm">
                        <i class="fa fa-arrow-left fa-sm text-white-50 mr-1"></i> 
                        Kembali ke Daftar Layanan
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
                    $stmt = $con->prepare("SELECT * FROM services s, service_categories sc where s.category_id = sc.category_id ORDER BY s.service_id ASC");
                    $stmt->execute();
                    $rows_services = $stmt->fetchAll();
                ?>
                    <div class="card shadow mb-4">
                        <div class="card-header py-3 d-flex align-items-center justify-content-between">
                            <h6 class="m-0 font-weight-bold text-primary">Semua Layanan Aktif</h6>
                            <span class="badge badge-primary px-3 py-2"><?php echo count($rows_services); ?> Layanan</span>
                        </div>
                        <div class="card-body">

                            <!-- SERVICES TABLE -->
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover">
                                    <thead class="thead-light">
                                        <tr>
                                            <th>Nama Layanan</th>
                                            <th>Kategori</th>
                                            <th>Deskripsi Layanan</th>
                                            <th>Harga / Tarif</th>
                                            <th>Durasi</th>
                                            <th class="text-center" style="width: 120px;">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php
                                            foreach($rows_services as $service)
                                            {
                                                echo "<tr>";
                                                    echo "<td><strong>" . htmlspecialchars($service['service_name']) . "</strong></td>";
                                                    echo "<td><span class='badge badge-info px-2 py-1'>" . htmlspecialchars($service['category_name']) . "</span></td>";
                                                    echo "<td style='font-size: 13.5px; color: #4b5563;'>" . htmlspecialchars($service['service_description']) . "</td>";
                                                    echo "<td class='font-weight-bold text-success'>Rp " . number_format($service['service_price'], 0, ',', '.') . "</td>";
                                                    echo "<td><span class='badge badge-light border'><i class='far fa-clock mr-1'></i> " . $service['service_duration'] . " Menit</span></td>";
                                                    echo "<td class='text-center'>";
                                                        $delete_data = "delete_".$service["service_id"];
                                                        ?>
                                                        <a href="services.php?do=Edit&service_id=<?php echo $service['service_id']; ?>" class="btn btn-success btn-sm" title="Ubah Layanan">
                                                            <i class="fa fa-edit"></i>
                                                        </a>

                                                        <button class="btn btn-danger btn-sm" type="button" data-toggle="modal" data-target="#<?php echo $delete_data; ?>" title="Hapus Layanan">
                                                            <i class="fa fa-trash"></i>
                                                        </button>

                                                        <!-- Delete Modal -->
                                                        <div class="modal fade" id="<?php echo $delete_data; ?>" tabindex="-1" role="dialog" aria-hidden="true">
                                                            <div class="modal-dialog" role="document">
                                                                <div class="modal-content">
                                                                    <div class="modal-header bg-danger text-white">
                                                                        <h5 class="modal-title font-weight-bold"><i class="fas fa-trash-alt mr-2"></i> Hapus Layanan</h5>
                                                                        <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                                                                            <span aria-hidden="true">&times;</span>
                                                                        </button>
                                                                    </div>
                                                                    <div class="modal-body text-left">
                                                                        Apakah Anda yakin ingin menghapus layanan <strong>"<?php echo htmlspecialchars($service['service_name']); ?>"</strong>?
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
                                                                        <button type="button" data-id="<?php echo $service['service_id']; ?>" class="btn btn-danger delete_service_bttn">Ya, Hapus</button>
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
                            <h6 class="m-0 font-weight-bold text-primary">Formulir Tambah Layanan Baru</h6>
                        </div>
                        <div class="card-body">
                            <form method="POST" action="services.php?do=Add">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="font-weight-bold">Nama Layanan *</label>
                                            <input type="text" class="form-control" placeholder="Contoh: Fade Cut & Hot Towel" name="service_name" value="<?php echo isset($_POST['service_name']) ? htmlspecialchars($_POST['service_name']) : ''; ?>" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <?php
                                            $stmt = $con->prepare("SELECT * FROM service_categories ORDER BY category_id ASC");
                                            $stmt->execute();
                                            $rows_categories = $stmt->fetchAll();
                                        ?>
                                        <div class="form-group">
                                            <label class="font-weight-bold">Kategori Layanan *</label>
                                            <select class="custom-select" name="service_category" required>
                                                <?php
                                                    foreach($rows_categories as $category)
                                                    {
                                                        echo "<option value='".$category['category_id']."'>".htmlspecialchars($category['category_name'])."</option>";
                                                    }
                                                ?>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="font-weight-bold">Durasi Layanan (Menit) *</label>
                                            <input type="number" class="form-control" placeholder="Contoh: 30" name="service_duration" value="<?php echo isset($_POST['service_duration']) ? htmlspecialchars($_POST['service_duration']) : '30'; ?>" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="font-weight-bold">Tarif / Harga (Rupiah) *</label>
                                            <input type="number" class="form-control" placeholder="Contoh: 60000" name="service_price" value="<?php echo isset($_POST['service_price']) ? htmlspecialchars($_POST['service_price']) : ''; ?>" required>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="font-weight-bold">Deskripsi Layanan *</label>
                                            <textarea class="form-control" name="service_description" rows="3" placeholder="Jelaskan detail apa saja yang didapat pelanggan..." required><?php echo isset($_POST['service_description']) ? htmlspecialchars($_POST['service_description']) : ''; ?></textarea>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" name="add_new_service" class="btn btn-primary">
                                    <i class="fas fa-save mr-1"></i> Simpan Layanan Baru
                                </button>
                                <a href="services.php" class="btn btn-secondary ml-2">Batal</a>
                            </form>

                            <?php
                                if(isset($_POST['add_new_service']) && $_SERVER['REQUEST_METHOD'] == 'POST')
                                {
                                    $service_name = test_input($_POST['service_name']);
                                    $service_category = $_POST['service_category'];
                                    $service_duration = intval($_POST['service_duration']);
                                    $service_price = floatval($_POST['service_price']);
                                    $service_description = test_input($_POST['service_description']);

                                    if(!empty($service_name) && !empty($service_description) && $service_duration > 0 && $service_price >= 0)
                                    {
                                        try
                                        {
                                            $stmt = $con->prepare("INSERT INTO services (service_name, service_description, service_price, service_duration, category_id) VALUES (?, ?, ?, ?, ?)");
                                            $stmt->execute(array($service_name, $service_description, $service_price, $service_duration, $service_category));
                                            ?> 
                                            <script type="text/javascript">
                                                swal("Berhasil Disimpan!","Layanan baru telah berhasil ditambahkan ke katalog.","success").then(() => {
                                                    window.location.replace("services.php");
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
                elseif($do == "Edit")
                {
                    $service_id = (isset($_GET['service_id']) && is_numeric($_GET['service_id'])) ? intval($_GET['service_id']) : 0;
                    $stmt = $con->prepare("SELECT * FROM services WHERE service_id = ?");
                    $stmt->execute(array($service_id));
                    $service = $stmt->fetch();

                    if($service)
                    {
                        ?>
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Edit Layanan: <?php echo htmlspecialchars($service['service_name']); ?></h6>
                            </div>
                            <div class="card-body">
                                <form method="POST" action="services.php?do=Edit&service_id=<?php echo $service_id; ?>">
                                    <input type="hidden" name="service_id" value="<?php echo $service['service_id']; ?>">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="font-weight-bold">Nama Layanan *</label>
                                                <input type="text" class="form-control" name="service_name" value="<?php echo htmlspecialchars($service['service_name']); ?>" required>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <?php
                                                $stmt = $con->prepare("SELECT * FROM service_categories ORDER BY category_id ASC");
                                                $stmt->execute();
                                                $rows_categories = $stmt->fetchAll();
                                            ?>
                                            <div class="form-group">
                                                <label class="font-weight-bold">Kategori Layanan *</label>
                                                <select class="custom-select" name="service_category" required>
                                                    <?php
                                                        foreach($rows_categories as $category)
                                                        {
                                                            $selected = ($category['category_id'] == $service['category_id']) ? 'selected' : '';
                                                            echo "<option value='".$category['category_id']."' $selected>".htmlspecialchars($category['category_name'])."</option>";
                                                        }
                                                    ?>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="font-weight-bold">Durasi Layanan (Menit) *</label>
                                                <input type="number" class="form-control" name="service_duration" value="<?php echo $service['service_duration']; ?>" required>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label class="font-weight-bold">Tarif / Harga (Rupiah) *</label>
                                                <input type="number" class="form-control" name="service_price" value="<?php echo intval($service['service_price']); ?>" required>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="font-weight-bold">Deskripsi Layanan *</label>
                                                <textarea class="form-control" name="service_description" rows="3" required><?php echo htmlspecialchars($service['service_description']); ?></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button type="submit" name="edit_service_sbmt" class="btn btn-success">
                                        <i class="fas fa-check mr-1"></i> Simpan Perubahan
                                    </button>
                                    <a href="services.php" class="btn btn-secondary ml-2">Batal</a>
                                </form>
                                
                                <?php
                                    if(isset($_POST['edit_service_sbmt']) && $_SERVER['REQUEST_METHOD'] == 'POST')
                                    {
                                        $service_name = test_input($_POST['service_name']);
                                        $service_category = $_POST['service_category'];
                                        $service_duration = intval($_POST['service_duration']);
                                        $service_price = floatval($_POST['service_price']);
                                        $service_description = test_input($_POST['service_description']);

                                        try
                                        {
                                            $stmt = $con->prepare("UPDATE services SET service_name = ?, service_description = ?, service_price = ?, service_duration = ?, category_id = ? WHERE service_id = ?");
                                            $stmt->execute(array($service_name, $service_description, $service_price, $service_duration, $service_category, $service_id));
                                            ?> 
                                            <script type="text/javascript">
                                                swal("Berhasil Diperbarui!","Layanan telah berhasil diperbarui.","success").then(() => {
                                                    window.location.replace("services.php");
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