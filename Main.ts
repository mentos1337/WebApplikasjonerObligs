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

    const fetchDataFromServer = async () => {
        const response = await fetch("http://localhost:4000/json", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
      
        console.log(result);
      
        const id = document.getElementById("json");
        if (!id) return;
        for (const habit of result) {
          const element = document.createElement("p");
          element.textContent = habit.title;
          id.appendChild(element);
        }
      };    

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
    fetchDataFromServer();
});
