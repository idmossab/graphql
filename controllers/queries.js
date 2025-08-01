// query
//mutation
//subscription

export const USER_PROFILE_QUERY = `
  query {
    user {
      login
      firstName
      lastName
      email
      campus
      auditRatio
      totalUp
      totalDown
      transactions(
        where: {
          _and: [
            { type: { _eq: "level" } },
            { eventId: { _eq: 41 } }
          ]
        }
        order_by: { amount: desc }
        limit: 1
      ) {
        amount
      }
      xps(
        where: { originEventId: { _eq: 41 } }
        order_by: { amount: asc }
      ) {
        path
        amount
      }
    }
    totalXp: transaction_aggregate(
      where: {
        type: { _eq: "xp" },
        eventId: { _eq: 41 }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
`;
