<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class= "formulario">
        <?php
        $nota1 = $_POST["nota1"];
        $nota2 = $_POST["nota2"];
        $nalunos = isset($_POST["nalunos"]) ? $_POSTM["nalunos"] : 0;
        $i = 1;
        $s = 0;
        echo "<table>";
        echo "<thead><tr><th>Nota1</th><th>Nota2</th><th>Média</th></tr></thead>";
        echo "<tbody>";
        while ($i <= $nalunos) {
            $mediaAluno = ($nota1 + $nota2) / 2;
            $s += $mediaAluno;
            echo "<tr>";
            echo "<td>$nota1</td>";
            echo "<td>$nota2</td>";
            echo "<td>$mediaAluno</td>";
            echo "</tr>";
            $i++;
        }
        echo "</tbody>";
        echo "</table>";

        $mediaTurma = $s / $nalunos;
        echo "A média da Turma é igual a: $mediaTurma";
        ?>
    </div>
</body>
</html>
