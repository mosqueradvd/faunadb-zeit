const faunadb = require("faunadb");

// secret hash
const secret = process.env.FAUNADB_SECRET_KEY;
const query = fauna.query;
const client = new faunadb.Client({ secret });

module.exports = async (req, res) => {
  try {
    const dbs = await client.query(
      query.Map(
        // irerates each item in result
        query.Paginate(
          // makes it paginatable
          query.Match(
            query.Index("all_customers") // specifies the source
          )
        ),
        (ref) => query.Get(ref)
      )
    );
    // ok
    res.status(200).json(dbs.data);
  } catch (e) {
    // someting went wrong
    res.status(500).json({ erro: e.message });
  }
};
