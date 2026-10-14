<?php
    session_start();

    //Page Title
    $pageTitle = 'Kategori Layanan';

    //Includes
    include 'connect.php';
    include 'Includes/functions/functions.php'; 
    include 'Includes/templates/header.php';

    //Check If user is already logged in
    if(isset($_SESSION['username_barbershop_Xw211qAAsq4']) && isset($_SESSION['password_barbershop_Xw211qAAsq4']))
    {
?>
        <!-- Begin Page Content -->
        <div class="container-fluid">
    
            <!-- Page Heading -->
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <div>
                    <h1 class="h3 mb-1 text-gray-800 font-weight-bold">Kategori Layanan</h1>
                    <p class="text-muted small mb-0">Kelola kelompok kategori untuk menu perawatan dan cukur di barbershop.</p>
                </div>
                <button class="btn btn-primary btn-sm shadow-sm" type="button" data-toggle="modal" data-target="#add_new_category">
                    <i class="fa fa-plus fa-sm text-white-50 mr-1"></i> 
                    Tambah Kategori Baru
                </button>
            </div>

            <!-- Service Categories Table -->
            <?php
                $stmt = $con->prepare("SELECT * FROM service_categories ORDER BY category_id ASC");
                $stmt->execute();
                $rows_categories = $stmt->fetchAll(); 
            ?>
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Daftar Kategori Layanan</h6>
                    <span class="badge badge-primary px-3 py-2"><?php echo count($rows_categories); ?> Kategori</span>
                </div>
                <div class="card-body">

                    <!-- Add New Category Modal -->
                    <div class="modal fade" id="add_new_category" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header bg-primary text-white">
                                    <h5 class="modal-title font-weight-bold"><i class="fas fa-folder-plus mr-2"></i> Tambah Kategori Baru</h5>
                                    <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="form-group">
                                        <label for="category_name" class="font-weight-bold">Nama Kategori *</label>
                                        <input type="text" id="category_name_input" class="form-control" placeholder="Contoh: Perawatan Jenggot & Kumis" name="category_name">
                                        <div class="invalid-feedback text-danger" id="required_category_name" style="display: none;">
                                            Nama kategori wajib diisi!
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
                                    <button type="button" class="btn btn-primary" id="add_category_bttn">Simpan Kategori</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Categories Table -->
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
                            <thead class="thead-light">
                                <tr>
                                    <th style="width: 80px;">ID#</th>
                                    <th>Nama Kategori</th>
                                    <th style="width: 140px;" class="text-center">Kelola / Aksi</th>
                                </tr>
                            </thead> 
                            <tbody>
                                <?php
                                foreach($rows_categories as $category)
                                {
                                    echo "<tr>";
                                        echo "<td class='font-weight-bold text-primary'>#" . $category['category_id'] . "</td>";
                                        echo "<td><strong>" . htmlspecialchars($category['category_name']) . "</strong></td>";
                                        echo "<td class='text-center'>";
                                            if(strtolower($category["category_name"]) != "uncategorized")
                                            {
                                                $delete_data = "delete_".$category["category_id"];
                                                $edit_data = "edit_".$category["category_id"];
                                            ?>
                                                <button class="btn btn-success btn-sm mr-1" type="button" data-toggle="modal" data-target="#<?php echo $edit_data; ?>" title="Ubah Kategori">
                                                    <i class="fa fa-edit"></i>
                                                </button>

                                                <!-- EDIT Modal -->
                                                <div class="modal fade" id="<?php echo $edit_data; ?>" tabindex="-1" role="dialog" aria-hidden="true">
                                                    <div class="modal-dialog" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header bg-success text-white">
                                                                <h5 class="modal-title font-weight-bold"><i class="fas fa-edit mr-2"></i> Perbarui Kategori</h5>
                                                                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body text-left">
                                                                <div class="form-group">
                                                                    <label class="font-weight-bold">Nama Kategori *</label>
                                                                    <input type="text" class="form-control" id="<?php echo "input_category_name_".$category["category_id"]; ?>" value="<?php echo htmlspecialchars($category["category_name"]); ?>">
                                                                    <div class="invalid-feedback text-danger" id="<?php echo "invalid_input_".$category["category_id"]; ?>" style="display: none;">
                                                                        Nama kategori wajib diisi!
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
                                                                <button type="button" data-id="<?php echo $category['category_id']; ?>" class="btn btn-success edit_category_bttn">Simpan Perubahan</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button class="btn btn-danger btn-sm" type="button" data-toggle="modal" data-target="#<?php echo $delete_data; ?>" title="Hapus Kategori">
                                                    <i class="fa fa-trash"></i>
                                                </button>

                                                <!-- Delete Modal -->
                                                <div class="modal fade" id="<?php echo $delete_data; ?>" tabindex="-1" role="dialog" aria-hidden="true">
                                                    <div class="modal-dialog" role="document">
                                                        <div class="modal-content">
                                                            <div class="modal-header bg-danger text-white">
                                                                <h5 class="modal-title font-weight-bold"><i class="fas fa-trash-alt mr-2"></i> Hapus Kategori</h5>
                                                                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body text-left">
                                                                Apakah Anda yakin ingin menghapus kategori <strong>"<?php echo htmlspecialchars($category['category_name']); ?>"</strong>? Layanan di dalam kategori ini akan otomatis dialihkan ke kategori umum.
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
                                                                <button type="button" data-id="<?php echo $category['category_id']; ?>" class="btn btn-danger delete_category_bttn">Ya, Hapus</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            <?php
                                            } else {
                                                echo "<span class='badge badge-secondary'>Default</span>";
                                            }
                                        echo "</td>";
                                    echo "</tr>";
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