const projectForm = document.getElementById('projectForm') as HTMLFormElement;
const projectImageInput = document.getElementById('projectImageInput') as HTMLInputElement;
const projectImage = document.getElementById('projectImage') as HTMLImageElement;


projectImageInput.addEventListener('change', (event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            projectImage.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }
});


projectForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const projectName = (document.getElementById('PName') as HTMLInputElement).value;
    const projectDescription = (document.getElementById('Description') as HTMLTextAreaElement).value;
    

    console.log({ projectName, projectDescription, imageUrl: projectImage.src });


    const projectsList = document.getElementById('Projects');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
    <img src="${projectImage.src}" alt="${projectName}">
    <article>
        <h3>${projectName}</h3>
        <p>${projectDescription}</p>
    </article>
`;
    projectsList?.appendChild(listItem);


    projectForm.reset();
    projectImage.src = "https://placehold.co/250x250";
});
