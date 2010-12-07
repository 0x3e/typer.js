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
<script type="text/javascript" src="t.js"></script>
<?php else:?>
<script type="text/javascript" src="json2.js"></script>
<script type="text/javascript" src="words_classic_texts.js"></script>
<script type="text/javascript" src="words_database.js"></script>
<script type="text/javascript" src="display.js"></script>
<script type="text/javascript" src="menu_display.js"></script>
<script type="text/javascript" src="level_display.js"></script>
<script type="text/javascript" src="score_display.js"></script>
<script type="text/javascript" src="menu.js"></script>
<script type="text/javascript" src="keys.js"></script>
<script type="text/javascript" src="level.js"></script>
<script type="text/javascript" src="store.js"></script>
<script type="text/javascript" src="typer.js"></script>
<script type="text/javascript" src="js.js"></script>
<?php endif?>
</body>
</html>
