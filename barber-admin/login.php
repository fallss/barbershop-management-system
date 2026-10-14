<?php
	ob_start();
	session_start();

	include 'connect.php';
	include 'Includes/functions/functions.php';

	// IF THE USER HAS ALREADY LOGGED IN
	if(isset($_SESSION['username_barbershop_Xw211qAAsq4']) && isset($_SESSION['password_barbershop_Xw211qAAsq4']))
	{
		header('Location: index.php');
		exit();
	}

	$login_error = '';

	if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['signin-button']))
	{
		$username = test_input($_POST['username']);
		$password = test_input($_POST['password']);
		$hashedPass = sha1($password);

		//Check if User Exist In database
		$stmt = $con->prepare("Select admin_id, username, password from barber_admin where username = ? and password = ?");
		$stmt->execute(array($username, $hashedPass));
		$row = $stmt->fetch();
		$count = $stmt->rowCount();

		if($count > 0)
		{
			$_SESSION['username_barbershop_Xw211qAAsq4'] = $username;
			$_SESSION['password_barbershop_Xw211qAAsq4'] = $password;
			$_SESSION['admin_id_barbershop_Xw211qAAsq4'] = $row['admin_id'];
			header('Location: index.php');
			exit();
		}
		else
		{
			$login_error = "Nama pengguna atau kata sandi yang Anda masukkan salah!";
		}
	}

	$pageTitle = 'Portal Masuk Admin || Barberia Luxe';
?>

<!DOCTYPE html>
<html lang="id">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Portal Masuk Admin || Barberia Luxe</title>
		
		<!-- FONTS FILE -->
		<link href="Design/fonts/css/all.min.css" rel="stylesheet" type="text/css">
		<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">

		<!-- CSS FILES -->
		<link href="Design/css/sb-admin-2.min.css" rel="stylesheet">
		<link href="Design/css/main.css" rel="stylesheet">

        <style>
            body {
                background: linear-gradient(135deg, #0d0f13 0%, #171b24 100%) !important;
                font-family: 'Plus Jakarta Sans', sans-serif !important;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }
            .login-card-pro {
                background: #141820;
                border: 1px solid rgba(212, 175, 55, 0.3);
                border-radius: 16px;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
                width: 100%;
                max-width: 440px;
                padding: 40px 32px;
                color: #fff;
            }
            .login-brand {
                text-align: center;
                margin-bottom: 28px;
            }
            .login-brand-title {
                font-family: 'Playfair Display', serif;
                font-size: 24px;
                font-weight: 700;
                color: #fff;
                letter-spacing: 1.5px;
                margin-top: 10px;
            }
            .login-brand-subtitle {
                font-size: 11px;
                letter-spacing: 2px;
                color: #d4af37;
                text-transform: uppercase;
                font-weight: 600;
            }
            .form-control-pro {
                background: #1c222e !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                color: #fff !important;
                border-radius: 8px !important;
                padding: 12px 16px !important;
                font-size: 14px;
                transition: all 0.3s ease;
            }
            .form-control-pro:focus {
                border-color: #d4af37 !important;
                box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.25) !important;
            }
            .btn-admin-submit {
                background: linear-gradient(135deg, #d4af37 0%, #aa8524 100%);
                color: #0b0c10;
                font-weight: 700;
                border: none;
                border-radius: 50px;
                padding: 13px;
                width: 100%;
                font-size: 15px;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
            }
            .btn-admin-submit:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 25px rgba(212, 175, 55, 0.45);
                color: #000;
            }
            .demo-box {
                background: rgba(212, 175, 55, 0.08);
                border: 1px dashed rgba(212, 175, 55, 0.3);
                border-radius: 8px;
                padding: 10px 14px;
                font-size: 12px;
                color: #cbd5e1;
                margin-bottom: 20px;
                text-align: center;
            }
        </style>
	</head>
	<body>
		<div class="login-card-pro">
            <div class="login-brand">
                <div style="width: 50px; height: 50px; background: rgba(212, 175, 55, 0.15); border: 1px solid #d4af37; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; color: #d4af37; font-size: 22px;">
                    <i class="fas fa-user-shield"></i>
                </div>
                <div class="login-brand-title">BARBERIA LUXE</div>
                <div class="login-brand-subtitle">Portal Manajemen Admin</div>
            </div>

            <div class="demo-box">
                <i class="fas fa-info-circle text-warning mr-1"></i> Akun Demo: User <b>admin</b> | Sandi <b>admin123</b>
            </div>

			<form name="login-form" method="POST" action="login.php" onsubmit="return validateLogInForm()">
				<!-- DISPLAY ERROR IF ANY -->
				<?php if(!empty($login_error)): ?>
					<div class="alert alert-danger" style="background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #fca5a5; font-size: 13px; border-radius: 8px;">
						<i class="fas fa-exclamation-circle mr-1"></i> <?php echo htmlspecialchars($login_error); ?>
					</div>
				<?php endif; ?>

				<!-- USERNAME INPUT -->

				<div class="form-group mb-3">
					<label class="text-white small font-weight-bold mb-1">Nama Pengguna (Username)</label>
					<input type="text" name="username" class="form-control form-control-pro" placeholder="Masukkan username admin" oninput="getElementById('required_username').style.display = 'none'" autocomplete="off" required>
					<span class="invalid-feedback text-danger" id="required_username" style="display:none; font-size: 12px;">Username wajib diisi!</span>
				</div>
				
				<!-- PASSWORD INPUT -->

				<div class="form-group mb-4">
					<label class="text-white small font-weight-bold mb-1">Kata Sandi (Password)</label>
					<input type="password" name="password" class="form-control form-control-pro" placeholder="Masukkan kata sandi" oninput="getElementById('required_password').style.display = 'none'" autocomplete="new-password" required>
					<span class="invalid-feedback text-danger" id="required_password" style="display:none; font-size: 12px;">Kata sandi wajib diisi!</span>
				</div>
				
				<!-- SIGN IN BUTTON -->

				<div class="form-group mb-3">
					<button type="submit" name="signin-button" class="btn-admin-submit">
                        <i class="fas fa-sign-in-alt mr-2"></i> Masuk ke Dashboard
                    </button>
				</div>

				<div class="text-center mt-3">
                    <a href="../index.php" style="color: #94a3b8; font-size: 13px; text-decoration: none;">
                        <i class="fas fa-arrow-left mr-1"></i> Kembali ke Website Utama
                    </a>
                </div>
			</form>
		</div>

		<!-- INCLUDE JS SCRIPTS -->
		<script src="Design/js/jquery.min.js"></script>
		<script src="Design/js/bootstrap.bundle.min.js"></script>
		<script src="Design/js/sb-admin-2.min.js"></script>
		<script src="Design/js/main.js"></script>
	</body>
</html>