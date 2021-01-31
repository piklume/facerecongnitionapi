const handelProfileGet = (req, res, db) => {
    const { id } =req.params;
    db.select('*').from('users').where({id: id})
    .then(user => {
        if(user.length) {
            res.json(user[0]);
        } else {
            res.status(400).json("Not found");
        }
    })
    .catch (err => res.status(400).json("Error happened when getting user data")
    );
}

module.exports = {
    handelProfileGet: handelProfileGet
};