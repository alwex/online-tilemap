<?php
$roomWidth = 25;
$roomHeight = 15;

$width = $roomWidth * 4;
$height = $roomHeight * 4;

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

        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Online Map Designer</a>
        </div>

        <div class="collapse navbar-collapse">

            <div class="btn-group" role="group">
                <button type="button" class="btn btn-default navbar-btn">
                    <span class="glyphicon glyphicon-file"></span>
                </button>
                <button type="button" class="btn btn-default navbar-btn">
                    <span class="glyphicon glyphicon-folder-open"></span>
                </button>
                <button type="button" class="btn btn-default navbar-btn">
                    <span class="glyphicon glyphicon-save"></span>
                </button>
            </div>
            <div id="panel-tools" class="btn-group" role="group">
                <button id="btn-pencil" type="button" class="btn btn-default navbar-btn">
                    <span class="glyphicon glyphicon-pencil"></span>
                </button>
                <button id="btn-erase" type="button" class="btn btn-default navbar-btn">
                    <span class="glyphicon glyphicon-erase"></span>
                </button>
                <button id="btn-font" type="button" class="btn btn-default navbar-btn">
                    <span class="glyphicon glyphicon-font"></span>
                </button>

            </div>

            <div id="panel-tools-2" class="btn-group" role="group">
                <button id="btn-hide" type="button" class="btn btn-default navbar-btn">
                    <span class="glyphicon glyphicon-eye-close"></span>
                </button>
            </div>

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
<div id="popover-content">
    <div class="form-group">
        <textarea class="form-control" rows="2" cols="10"></textarea>
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