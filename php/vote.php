<?php
$vote = $_REQUEST['vote'];

//getting content of textfile
$filename = "vote_result.txt";
$content = file($filename);

//putting content in array
$array = explode("||", $content[0]);
$yes = $array[0];
$no = $array[1];

if ($vote == 1)
  {
  $yes = $yes + 1;
  }
if ($vote == 0)
  {
  $no = $no + 1;
  }

//inserting votes into the txt file
$addvote = $yes."||".$no;
$fp = fopen($filename,"w");
fputs($fp,$addvote);
fclose($fp);
?>

<h2>Result:</h2>
<table>
	<tr>
	<td>Yes:</td>
		<td>
			<img src="pollyes.jpg" width='<?php echo(100*round($yes/($no+$yes),2)); ?>' height='20'>
			<?php echo(100*round($yes/($no+$yes),2)); ?>%
		</td>
	</tr>
	<tr>
	<td>No:</td>
		<td>
			<img src="pollno.jpg" width='<?php echo(100*round($no/($no+$yes),2)); ?>' height='20'>
			<?php echo(100*round($no/($no+$yes),2)); ?>%
		</td>
	</tr>
</table> 