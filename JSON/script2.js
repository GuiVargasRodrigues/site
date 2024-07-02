$(document).ready(function() {
    $('#loadButton').click(function() {
        $.getJSON('alunos2.json', function(data) {
            displayStudents(data);
        }).fail(function() {
            alert('Erro ao carregar o arquivo JSON.');
        });
    });

    function displayStudents(courses) {
        let table = $('<table></table>');
        let header = $('<tr></tr>');
        header.append('<th>Curso</th><th>Alunos</th>');
        table.append(header);

        $.each(courses, function(course, students) {
            let row = $('<tr></tr>');
            row.append('<td>' + course + '</td>');
            let studentsList = students.join(', ');
            row.append('<td>' + studentsList + '</td>');
            table.append(row);
        });

        $('#tableContainer').html(table);
    }
});
