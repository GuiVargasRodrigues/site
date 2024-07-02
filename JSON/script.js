document.getElementById('loadButton').addEventListener('click', () => {
    fetch('alunos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar o arquivo JSON');
            }
            return response.json();
        })
        .then(data => {
            displayStudents(data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
});

function displayStudents(courses) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Limpar conteúdo anterior

    for (const [course, students] of Object.entries(courses)) {
        const courseSection = document.createElement('div');
        const courseTitle = document.createElement('h2');
        courseTitle.textContent = course;
        courseSection.appendChild(courseTitle);

        const studentList = document.createElement('ul');
        students.forEach(student => {
            const listItem = document.createElement('li');
            listItem.textContent = student;
            studentList.appendChild(listItem);
        });

        courseSection.appendChild(studentList);
        outputDiv.appendChild(courseSection);
    }
}
