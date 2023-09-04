const { createClient } = require('graphql-ws');
const WebSocket = require('ws'); // Import the 'ws' library
require('dotenv').config();

const headers = {
  "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
};

const client = createClient({
  url: process.env.HASURA_ENDPOINT,
  connectionParams: {
    headers,
  },
  webSocketImpl: WebSocket, // Pass the WebSocket implementation
});

// Query
// (async () => {
//   try {
//     const query = client.iterate({
//       query: '{ hello }',
//     });

//     const { value } = await query.next();
//     console.log(value);
//   } catch (error) {
//     console.error("Query error:", error);
//   }
// })();

// Subscription (with your query)
(async () => {
  try {
    const subscription = client.iterate({
      query: `
        subscription MySubscription {
          author {
            id
            name
          }
        }
      `,
    });

    for await (const event of subscription) {
      // console.log(JSON.stringify(event.data.data, null, 2));
      console.log(event.data)

      // Complete the subscription by breaking the iterator loop
      // break;
    }
  } catch (error) {
    console.error("Subscription error:", error);
  }
})();
