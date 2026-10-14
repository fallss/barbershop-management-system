<?php
    
    //PHP INCLUDES

	include "connect.php";

	if(isset($_POST['selected_employee']) && isset($_POST['selected_services']))
	{
        $hari_indo = [
            'Sun' => 'Minggu',
            'Mon' => 'Senin',
            'Tue' => 'Selasa',
            'Wed' => 'Rabu',
            'Thu' => 'Kamis',
            'Fri' => 'Jumat',
            'Sat' => 'Sabtu'
        ];
        $bulan_indo = [
            'Jan' => 'Jan',
            'Feb' => 'Feb',
            'Mar' => 'Mar',
            'Apr' => 'Apr',
            'May' => 'Mei',
            'Jun' => 'Jun',
            'Jul' => 'Jul',
            'Aug' => 'Agu',
            'Sep' => 'Sep',
            'Oct' => 'Okt',
            'Nov' => 'Nov',
            'Dec' => 'Des'
        ];

		?>

        <!-- CALENDAR STYLE -->
        
        <style type="text/css">
            
            .calendar_tab
            {
                background: #141820;
                margin-top: 10px;
                width: 100%;
                position: relative;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                overflow-x: auto;
                border-radius: 12px;
                border: 1px solid rgba(212, 175, 55, 0.25);
            }

            .appointments_days
            {
                border-top-left-radius: 12px;
                border-top-right-radius: 12px;
                display: flex;
                min-height: 65px;
                position: relative;
                justify-content: space-between;
                padding: 12px 8px;
                background: #1a202c;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            }

            .appointment_day
            {
                flex: 1;
                min-width: 75px;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-size: 13px;
                line-height: 1.3;
            }

            .appointment_day .day-name
            {
                color: #d4af37;
                font-weight: 700;
                text-transform: uppercase;
                font-size: 11px;
                letter-spacing: 1px;
                margin-bottom: 2px;
            }

            .appointment_day .day-date
            {
                color: #ffffff;
                font-weight: 600;
                font-size: 13px;
            }

            .available_booking_hours
            {
                display: flex;
                justify-content: space-between;
                padding: 14px 8px;
                background: #141820;
            }

            .available_booking_hours_colum
            {
                flex: 1;
                min-width: 75px;
                text-align: center;
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding: 0 4px;
            }

            .available_booking_hour
            {
                font-size: 12.5px;
                font-weight: 600;
                padding: 9px 4px;
                line-height: 1.2;
                cursor: pointer;
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 8px;
                color: #cbd5e1;
                display: block;
                transition: all 0.25s ease;
                margin: 0;
            }

            .available_booking_hour:hover
            {
                background: rgba(212, 175, 55, 0.15);
                border-color: #d4af37;
                color: #ffffff;
                transform: translateY(-1px);
            }

            input[type="radio"] 
            {
                display: none;
            }

            input[type="radio"]:checked + label 
            {
                background: linear-gradient(135deg, #d4af37 0%, #aa8524 100%) !important;
                border-color: #d4af37 !important;
                color: #0b0c10 !important;
                font-weight: 700 !important;
                box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
            }

            .slot-legend {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 20px;
                padding: 10px;
                font-size: 12px;
                color: #94a3b8;
                border-top: 1px solid rgba(255, 255, 255, 0.06);
            }

            .slot-legend-item {
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .legend-box {
                width: 14px;
                height: 14px;
                border-radius: 4px;
            }

        </style>

        <!-- END CALENDAR STYLE -->

        <!-- START CALENDAR SLOT -->

        <div class="calendar_slots" style="min-width: 650px;">

            <!-- NEXT 10 DAYS -->

            <div class="appointments_days">
                <?php
                    
                    $appointment_date = date('Y-m-d');

                    for($i = 0; $i < 10; $i++)
                    {
                        $appointment_date = date('Y-m-d', strtotime($appointment_date . ' +1 day'));
                        $raw_day = date('D', strtotime($appointment_date));
                        $raw_month = date('M', strtotime($appointment_date));
                        $day_label = isset($hari_indo[$raw_day]) ? $hari_indo[$raw_day] : $raw_day;
                        $month_label = isset($bulan_indo[$raw_month]) ? $bulan_indo[$raw_month] : $raw_month;
                        
                        echo "<div class='appointment_day'>";
                            echo "<span class='day-name'>" . $day_label . "</span>";
                            echo "<span class='day-date'>" . date('d', strtotime($appointment_date)) . " " . $month_label . "</span>";
                        echo "</div>";
                    } 
                ?>
            </div>

            <!-- DAY HOURS -->

            <div class='available_booking_hours'>
                <?php

                    //SELECTED SERVICES
		            $desired_services = $_POST['selected_services'];
		            
                    //SELECTED EMPLOYEE
		            $selected_employee = $_POST['selected_employee'];

            		//Services Duration - End time expected
		            $sum_duration = 0;
		            
                    foreach($desired_services as $service)
		            {
		                $stmtServices = $con->prepare("select service_duration from services where service_id = ?");
		                $stmtServices->execute(array($service));
		                $rowS =  $stmtServices->fetch();
		                if($rowS) {
                            $sum_duration += $rowS['service_duration'];
                        }
		            }
            
		            $sum_duration = date('H:i',mktime(0,$sum_duration));
		            $secs = strtotime($sum_duration)-strtotime("00:00:00");

                    $open_time = date('H:i',mktime(9,0,0));
                    $close_time = date('H:i',mktime(21,0,0));

                    $start = $open_time;
                    $secs = strtotime($sum_duration)-strtotime("00:00:00");
                    $result = date("H:i:s",strtotime($start)+$secs);

                    $appointment_date = date('Y-m-d');

                    for($i = 0; $i < 10; $i++)
                    {
                        echo "<div class='available_booking_hours_colum'>";

                            $appointment_date = date('Y-m-d', strtotime($appointment_date . ' +1 day'));
                            $start = $open_time;
                            $secs = strtotime($sum_duration)-strtotime("00:00:00");
                            $result = date("H:i:s",strtotime($start)+$secs);

                            $day_id = date('w',strtotime($appointment_date));
                            if($day_id == 0) $day_id = 7; // Convert Sunday to 7 to match table convention if needed
                            
                            $has_slot = false;

                            while($start >= $open_time && $result <= $close_time)
                            {
                                // Check If the employee is available in schedule
                                $stmt_emp = $con->prepare("
                                    Select employee_id
                                    from employees_schedule
                                    where employee_id = ?
                                    and day_id = ?
                                    and ? between from_hour and to_hour
                                    and ? between from_hour and to_hour
                                ");
                                $stmt_emp->execute(array($selected_employee,$day_id,$start, $result));
                                $emp = $stmt_emp->fetchAll();

                                //If employee is available
                                if($stmt_emp->rowCount() != 0)
                                {
                                    //Check If there are no intersecting appointments with the current one
                                    $stmt = $con->prepare("
                                        Select * 
                                        from appointments a
                                        where
                                            date(start_time) = ?
                                            and
                                            a.employee_id = ?
                                            and
                                            canceled = 0
                                            and
                                            (   
                                                time(start_time) between ? and ?
                                                or
                                                time(end_time_expected) between ? and ?
                                            )
                                    ");
                                    
                                    $stmt->execute(array($appointment_date,$selected_employee,$start,$result,$start,$result));
                                    $rows = $stmt->fetchAll();
                        
                                    if($stmt->rowCount() == 0)
                                    {
                                        $has_slot = true;
                                        $radio_id = "slot_".$i."_".str_replace(':', '', $start);
                                        ?>
                                            <input type="radio" id="<?php echo $radio_id; ?>" name="desired_date_time" value="<?php echo $appointment_date." ".$start." ".$result; ?>">
                                            <label class="available_booking_hour" for="<?php echo $radio_id; ?>" title="<?php echo $start . ' - ' . substr($result,0,5); ?>">
                                                <?php echo substr($start, 0, 5); ?>
                                            </label>
                                        <?php
                                    }
                                }

                                $start = strtotime("+30 minutes", strtotime($start));
                                $start =  date('H:i', $start);

                                $secs = strtotime($sum_duration)-strtotime("00:00:00");
                                $result = date("H:i",strtotime($start)+$secs);
                            }

                            if(!$has_slot)
                            {
                                echo "<span style='font-size: 11px; color: #64748b; padding-top: 15px;'>Penuh / Libur</span>";
                            }

                        echo "</div>";
                    }
                ?>
            </div>

            <div class="slot-legend">
                <div class="slot-legend-item">
                    <span class="legend-box" style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15);"></span>
                    <span>Tersedia</span>
                </div>
                <div class="slot-legend-item">
                    <span class="legend-box" style="background: #d4af37;"></span>
                    <span style="color: #d4af37;">Dipilih</span>
                </div>
            </div>

        </div>
	<?php
	}
    else
    {
        header('location: index.php');
        exit();
    }
?>