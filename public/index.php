<?php
$roomWidth = 25;
$roomHeight = 15;

$width = $roomWidth * 5;
$height = $roomHeight * 5;

$tileSize = 16;


?>
<!DOCTYPE html>
<html>
<head>
    <title>Title of the document</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Optional theme -->
    <!--
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
          integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    -->
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body>
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-default navbar-btn">Write</button>
            <button type="button" class="btn btn-default navbar-btn">Erase</button>
            <button type="button" class="btn btn-default navbar-btn">Right</button>
        </div>
    </div>
</nav>
<div class="container-fluid">
    <div class="row">
        <div class="col-md-12">
            <div id="map">
                <table style="width:<?php echo $width * $tileSize ?>px; height:<?php echo $height * $tileSize ?>px;">
                    <?php for ($i = 1; $i < $height - 1; $i++): ?>
                        <tr>
                            <?php for ($j = 1; $j < $width - 1; $j++): ?>
                                <td class="<?php echo ($j % $roomWidth === 0) ? 'layout-w' : '' ?> <?php echo ($i % $roomHeight === 0) ? 'layout-h' : '' ?>"></td>
                            <?php endfor ?>
                        </tr>
                    <?php endfor ?>
                </table>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
        integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
        crossorigin="anonymous"></script>

<script type="text/javascript" src="js/main.js"></script>
</body>

</html>