var projectForm = document.getElementById('projectForm');
var projectImageInput = document.getElementById('projectImageInput');
var projectImage = document.getElementById('projectImage');
projectImageInput.addEventListener('change', function (event) {
    var _a;
    var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            projectImage.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        };
        reader.readAsDataURL(file);
    }
});
projectForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var projectName = document.getElementById('PName').value;
    var projectDescription = document.getElementById('Description').value;
    console.log({ projectName: projectName, projectDescription: projectDescription, imageUrl: projectImage.src });
    var projectsList = document.getElementById('Projects');
    var listItem = document.createElement('li');
    listItem.innerHTML = "\n    <img src=\"".concat(projectImage.src, "\" alt=\"").concat(projectName, "\">\n    <article>\n        <h3>").concat(projectName, "</h3>\n        <p>").concat(projectDescription, "</p>\n    </article>\n");
    projectsList === null || projectsList === void 0 ? void 0 : projectsList.appendChild(listItem);
    projectForm.reset();
    projectImage.src = "https://placehold.co/250x250";
});
