const routes = {
  home: "home-template",
  login: "login-template",
  register: "register-template",
  details: "details-template",
  edit: "edit-template",
  "about-us": "aboutUs-template",
};

const router = async (fullPath) => {
  let [path, id] = fullPath.split("/");

  let app = document.getElementById("root");
  let templateData = authServices.getData();

  switch (
    path //
  ) {
    case "home":
      let postsData = await itemSurvices.getAll().then((res) => {
        if (Object.keys(res).length != 0) {
          templateData.posts = res;
        }
      });
      break;
    case "details":
      let postDetails = await itemSurvices.getOne(id);

      console.log(postDetails);
      Object.assign(templateData, postDetails);
      break;
    case "delete":
      await itemSurvices.deleteOne(id);
      navigate("home");
      break;
    case "logout":
      authServices.logout();
      return navigate("home");
      break;
    case "about-us":
      console.log("We are currently in about-us page!");
      break;
    default:
      break;
  }

  let temp = Handlebars.compile(
    document.getElementById(routes[path]).innerHTML
  );
  app.innerHTML = temp(templateData);
};
