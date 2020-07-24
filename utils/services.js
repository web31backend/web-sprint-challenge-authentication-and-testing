module.exports = {
    handleError,
}

function handleError(err, res) {
    res.status(500).json({ message: err.message });
}