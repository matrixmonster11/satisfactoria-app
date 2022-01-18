const Navigation = require("../models/Navigation"),
  Partner = require("../models//Partner"),
  { nanoid } = require("nanoid");

module.exports = {
  getNavigationItems: (request, reply, next) => {
    let partnerId = request.userData.partnerId;
    let userType = request.userData.userType;

    Navigation.findOne()
      .lean()
      .then((result) => {
        if (result) {
          let fetchedNavigation = result.navigation;
          console.log("FETCHED NAVIGATION SUCCESSFULLY");
          Partner.findOne({ _id: partnerId })
            .lean()
            .then((partner) => {
              let userRoutes = partner.userRoutes.find(
                (userRoute) => userRoute.userType == userType
              );
              if (!userRoutes) {
                reply.status(401).send({
                  message:
                    "This user's navigation items do not exist in the partner",
                });
                next();
              }

              fetchedNavigation = fetchedNavigation.filter((item) => {
                if (userRoutes.routes.includes(item.id)) {
                  return true;
                }
              });

              console.log("fetched navigation after :", fetchedNavigation);
              reply.status(200).send(fetchedNavigation);
            });
        } else {
          reply.status(401).send({ message: "No Navigation for this user" });
        }
      })
      .catch((error) => {
        console.log("error :", error);
      });
  },
};
