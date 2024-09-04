document.addEventListener('DOMContentLoaded', () => {
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

  projectForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const projectName = (document.getElementById('PName') as HTMLInputElement).value;
      const projectDescription = (document.getElementById('Description') as HTMLTextAreaElement).value;
      
      const newProject = {
          Title: projectName,
          Description: projectDescription,
          "Image Source": projectImage.src,
      };

      await fetch("http://localhost:4000/json", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(newProject),
      });

      await fetchDataFromServer();

      projectForm.reset();
      projectImage.src = "https://placehold.co/250x250";
  });

  const fetchDataFromServer = async () => {
      try {
          const response = await fetch("http://localhost:4000/json", {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
          });
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const projects = await response.json();

          const projectsList = document.getElementById('Projects');
          if (!projectsList) return;

          projectsList.innerHTML = '';

          projects.forEach((project: any) => {
              const listItem = document.createElement('li');
              listItem.innerHTML = `
              <img src="${project["Image Source"]}" alt="${project.Title}">
              <article>
                  <h3>${project.Title}</h3>
                  <p>${project.Description}</p>
              </article>
              `;
              projectsList.appendChild(listItem);
          });
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  fetchDataFromServer();
});