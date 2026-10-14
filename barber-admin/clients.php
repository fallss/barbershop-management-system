<?php
    session_start();

     //Page Title
    $pageTitle = 'Data Pelanggan';

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
                    <h1 class="h3 mb-1 text-gray-800 font-weight-bold">Data Pelanggan</h1>
                    <p class="text-muted small mb-0">Daftar pelanggan setia yang telah terdaftar melalui sistem reservasi online.</p>
                </div>
            </div>

            <!-- Clients Table -->
            <?php
                $stmt = $con->prepare("SELECT * FROM clients ORDER BY client_id DESC");
                $stmt->execute();
                $rows_clients = $stmt->fetchAll(); 
            ?>
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Daftar Seluruh Pelanggan</h6>
                    <span class="badge badge-primary px-3 py-2"><?php echo count($rows_clients); ?> Pelanggan Terdaftar</span>
                </div>
                <div class="card-body">
                    
                    <!-- Clients Table -->
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead class="thead-light">
                                <tr>
                                    <th scope="col" style="width: 70px;">ID#</th>
                                    <th scope="col">Nama Lengkap</th>
                                    <th scope="col">Nomor WhatsApp / HP</th>
                                    <th scope="col">Alamat Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                    if(count($rows_clients) == 0)
                                    {
                                        echo "<tr><td colspan='4' class='text-center py-4 text-muted'>Belum ada data pelanggan yang tersimpan.</td></tr>";
                                    }
                                    else
                                    {
                                        foreach($rows_clients as $client)
                                        {
                                            echo "<tr>";
                                                echo "<td class='font-weight-bold text-primary'>#" . $client['client_id'] . "</td>";
                                                echo "<td><strong>" . htmlspecialchars($client['first_name'] . " " . $client['last_name']) . "</strong></td>";
                                                echo "<td><i class='fab fa-whatsapp text-success mr-1'></i> " . htmlspecialchars($client['phone_number']) . "</td>";
                                                echo "<td><i class='far fa-envelope text-muted mr-1'></i> " . htmlspecialchars($client['client_email']) . "</td>";
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