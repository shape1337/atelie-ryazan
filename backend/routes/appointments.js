const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/services - список услуг
router.get('/services', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, name, description, price, duration_minutes FROM services ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// POST /api/appointments - создать заявку/запись
router.post('/appointments', async (req, res) => {
  const { name, phone, email, service_id, date_time, comment } = req.body;
  if (!name || !phone || !service_id || !date_time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Найти или создать пользователя по телефону
    const [existing] = await conn.query('SELECT id FROM users WHERE phone = ? LIMIT 1', [phone]);
    let userId;
    if (existing.length) {
      userId = existing[0].id;
    } else {
      const [r] = await conn.query('INSERT INTO users (name, phone, email) VALUES (?, ?, ?)', [name, phone, email || null]);
      userId = r.insertId;
    }

    // Вставить запись
    const [resInsert] = await conn.query(
      'INSERT INTO appointments (user_id, service_id, date_time, comment, status) VALUES (?, ?, ?, ?, ?)',
      [userId, service_id, date_time, comment || null, 'new']
    );

    await conn.commit();
    res.json({ success: true, appointmentId: resInsert.insertId });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  } finally {
    conn.release();
  }
});

module.exports = router;
