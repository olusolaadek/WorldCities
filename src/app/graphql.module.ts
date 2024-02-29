import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { environment } from 'src/environments/environment';

const uri = 'https://localhost:40443/api/graphql'; // <-- add the URL of the GraphQL server here
// export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
//   return {
//     link: httpLink.create({ uri }),
//     cache: new InMemoryCache(),
//   };
// }

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache({
            addTypename: false,
          }),
          link: httpLink.create({
            uri: environment.baseUrl + 'api/graphql',
          }),
          defaultOptions: {
            watchQuery: { fetchPolicy: 'no-cache' },
          },
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
