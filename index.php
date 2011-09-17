<!DOCTYPE html>
<html lang=en>
<head>
<meta charset=utf-8 />
<title>0x3e</title>
<?php if($_REQUEST['cmp']):?>
<link href="c.css" rel="stylesheet" type="text/css" />
<?php else:?>
<link href="css.css" rel="stylesheet" type="text/css" />
<?php endif?>
</head>
<body>
<?php if($_REQUEST['cmp']):?>
<script type="text/javascript" src="typer_all.js"></script>
<?php else:?>
<script type="text/javascript" src="lib/json2.js"></script>
<script type="text/javascript" src="controller/score.js"></script>
<script type="text/javascript" src="model/words_classic_texts.js"></script>
<script type="text/javascript" src="controller/words_database.js"></script>
<script type="text/javascript" src="view/display.js"></script>
<script type="text/javascript" src="view/menu_display.js"></script>
<script type="text/javascript" src="view/level_display.js"></script>
<script type="text/javascript" src="view/score_display.js"></script>
<script type="text/javascript" src="controller/menu.js"></script>
<script type="text/javascript" src="model/keys.js"></script>
<script type="text/javascript" src="controller/level.js"></script>
<script type="text/javascript" src="controller/typer.js"></script>
<script type="text/javascript" src="controller/store.js"></script>
<script type="text/javascript" src="js.js"></script>
<?php endif?>
</body>
</html>
