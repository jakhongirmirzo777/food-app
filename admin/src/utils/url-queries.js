export const updateURLqueries = (router, queries, replace = false) => {
  const newQueries = replace ? queries : { ...router.query, ...queries };

  router.replace(
    {
      query: filterQueries(newQueries),
    },
    null,
    { shallow: true }
  );
};

export const filterQueries = (queries) => {
  const result = {};

  for (const query in queries) {
    let value = queries[query];

    if (typeof value === "string") {
      value = value.trim();
    }

    if (value) {
      result[query] = value;
    }
  }

  return result;
};
