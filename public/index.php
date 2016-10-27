<?php
$roomWidth = 20;
$roomHeight = 15;

$width = $roomWidth * 10;
$height = $roomHeight * 10;

$tileSize = 16;


?>
<!DOCTYPE html>
<html>
<head>
    <title>Title of the document</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body>
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

<script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>
<script type="text/javascript" src="js/main.js"></script>
</body>

</html>