const express = require('express');
const bcrypt = require('bcryptjs');
const { getDb } = require('../database');

const router = express.Router();
const db = getDb();

// Validação de email
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validação de senha
const isValidPassword = (password) => {
  return password.length >= 6;
};

// Rota de cadastro
router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    // Validação no backend
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }

    if (name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: 'O nome deve ter pelo menos 3 caracteres'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email inválido'
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        message: 'A senha deve ter pelo menos 6 caracteres'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'As senhas não coincidem'
      });
    }

    // Verificar se email já existe
    db.get('SELECT email FROM users WHERE email = ?', [email], async (err, row) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Erro ao verificar email'
        });
      }

      if (row) {
        return res.status(409).json({
          success: false,
          message: 'Email já cadastrado'
        });
      }

      // Hash da senha
      try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserir usuário
        db.run(
          'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
          [name, email, hashedPassword],
          function(err) {
            if (err) {
              return res.status(500).json({
                success: false,
                message: 'Erro ao cadastrar usuário'
              });
            }

            res.status(201).json({
              success: true,
              message: 'Cadastro realizado com sucesso',
              user: {
                id: this.lastID,
                name,
                email
              }
            });
          }
        );
      } catch (hashErr) {
        res.status(500).json({
          success: false,
          message: 'Erro ao processar cadastro'
        });
      }
    });
  } catch (error) {
    console.error('Erro na rota de registro:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Rota de login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Email inválido'
      });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Erro ao consultar usuário'
        });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Email ou senha incorretos'
        });
      }

      try {
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          return res.status(401).json({
            success: false,
            message: 'Email ou senha incorretos'
          });
        }

        res.json({
          success: true,
          message: 'Login realizado com sucesso',
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });
      } catch (compareErr) {
        res.status(500).json({
          success: false,
          message: 'Erro ao verificar credenciais'
        });
      }
    });
  } catch (error) {
    console.error('Erro na rota de login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

module.exports = router;
