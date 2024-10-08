var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
document.addEventListener('DOMContentLoaded', function () {
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
    projectForm.addEventListener('submit', function (event) { return __awaiter(_this, void 0, void 0, function () {
        var projectName, projectDescription, newProject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    projectName = document.getElementById('PName').value;
                    projectDescription = document.getElementById('Description').value;
                    newProject = {
                        Title: projectName,
                        Description: projectDescription,
                        "Image Source": projectImage.src,
                    };
                    // Send the project data to the backend
                    return [4 /*yield*/, fetch("http://localhost:4000/json", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(newProject),
                        })];
                case 1:
                    // Send the project data to the backend
                    _a.sent();
                    // Fetch and display the updated project list
                    return [4 /*yield*/, fetchDataFromServer()];
                case 2:
                    // Fetch and display the updated project list
                    _a.sent();
                    projectForm.reset();
                    projectImage.src = "https://placehold.co/250x250";
                    return [2 /*return*/];
            }
        });
    }); });
    var fetchDataFromServer = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, projects, projectsList_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:4000/json", {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    projects = _a.sent();
                    projectsList_1 = document.getElementById('Projects');
                    if (!projectsList_1)
                        return [2 /*return*/];
                    // Clear the list before repopulating
                    projectsList_1.innerHTML = '';
                    projects.forEach(function (project) {
                        var listItem = document.createElement('li');
                        listItem.innerHTML = "\n              <img src=\"".concat(project["Image Source"], "\" alt=\"").concat(project.Title, "\">\n              <article>\n                  <h3>").concat(project.Title, "</h3>\n                  <p>").concat(project.Description, "</p>\n              </article>\n              ");
                        projectsList_1.appendChild(listItem);
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching data:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    // Fetch and display the existing projects on page load
    fetchDataFromServer();
});
