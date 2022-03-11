/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

import { GraphQLClient, gql } from 'graphql-request';
import type { NextApiRequest, NextApiResponse } from 'next'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphqlCMS = process.env.GRAPHCMS_TOKEN;

// type Data = {
//   graphqlAPI: string
// }

// export a default function for API route to work
export default async function asynchandler(req: NextApiRequest, res: NextApiResponse) {
  const graphQLClient = new GraphQLClient((graphqlAPI!), {
    // headers: {
    //   authorization: `Bearer ${graphqlCMS}`
    // }
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}})
    }
  `;

  try {
    const result = await graphQLClient.request(query,  {
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment,
      slug: req.body.slug,
    });
    return res.status(200).send(result);
    
  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }


}