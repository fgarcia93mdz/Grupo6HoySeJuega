const fs = require('fs');
const path = require('path');
const PlayerFilePath = path.join(__dirname, '../database/userPlayer.json');
const players = JSON.parse(fs.readFileSync(PlayerFilePath, 'utf-8'));
const ownersFilePath = path.join(__dirname, '../database/userOwner.json');
const owners = JSON.parse(fs.readFileSync(ownersFilePath, 'utf-8'));


const userPlayerController = {

  loginPlayer: (req, res) => {
    res.render("partial/login/loginPlayer")
  },
  processLoginPlayer: (req, res) => {

    let userPlayerToLogin = userPlayer.findByField('email', req.body.email)

    if (userPlayerToLogin) {
      let isOkPassword = bcryptjs.compareSync(req.body.password, userPlayerToLogin.password);
      if (isOkPassword) {

        delete userPlayerToLogin.password;
        req.session.userLoggedPlayer = userPlayerToLogin
        return res.redirect("/userPlayer/perfilDeJugador/" + req.session.userLoggedPlayer.id)
      }

      return res.render('partial/login/loginPlayer', {
        errors: {
          password: {
            msg: 'Error en tu contraseña'
          }
        }
      });
    }

    return res.render('partial/login/loginPlayer', {
      errors: {
        email: {
          msg: 'No se encuentra registrado este mail'
        }
      }
    });

  },
  logout: (req, res) => {
    res.clearCookie('userPlayerEmail');
    req.session.destroy();
    return res.redirect("/")
  },

  vistaJugador: (req, res) => {

    res.render("partial/userPlayer/vistaJugador")
  },

  perfilDeJugador: (req, res) => {

    let id = req.params.id
    let userPlayer = players.find(userPlayer => userPlayer.id == id)
    res.render("partial/userPlayer/perfilDeJugador", {
      userPlayer
    })
  },

  carrito: (req, res) => {

    res.render("partial/userPlayer/carrito")
  },
  reservarCancha: (req, res) => {

    res.render("partial/userPlayer/reservarCancha")
  },

  vistaCanchaInfo: (req, res) => {
    let id = req.params.id
    let userOwner = owners.find(userOwner => userOwner.id == id)
    res.render("partial/userPlayer/vistaCanchaInfo", {
      userOwner
    })
  },

  elegirCancha: (req, res) => {

    res.render("partial/userPlayer/elegirCancha")
  },
  equipo: (req, res) => {

    res.render("partial/userPlayer/equipo")
  },
}

module.exports = userPlayerController