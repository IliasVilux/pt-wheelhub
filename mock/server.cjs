module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/users') {
    const db = req.app.db
    const existing = db.data.users.find((u) => u.email === req.body.email)

    if (existing) {
      return res.status(409).json({ field: 'email', message: 'Este email ya está registrado' })
    }
  }
  next()
}
