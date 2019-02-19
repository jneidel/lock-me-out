import viewRoutes from "./view";
import apiRoutes from "./api";
import * as errorRoutes from "./error";

export default ( app, ENVIRONMENT: string ) => {
  app.use( "/", viewRoutes );
  app.use( "/api", apiRoutes );

  app.use( errorRoutes.notFound );
  app.use( errorRoutes.flashValidationErrors );

  if ( ENVIRONMENT === "production" )
    app.use( errorRoutes.productionErrors );
  else
    app.use( errorRoutes.developmentErrors );
};

