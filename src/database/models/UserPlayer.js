module.exports = (sequelize, dataTypes) => {

  let alias = 'UserPlayer';
  let cols = {

    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: dataTypes.STRING(45),
      allowNull: false
    },
    apellido: {
      type: dataTypes.STRING(45),
      allowNull: false
    },
    email: {
      type: dataTypes.STRING(45),
      allowNull: false
    },
    password: {
      type: dataTypes.STRING(200),
      allowNull: false
    },
    fecha_nacimiento: {
      type: dataTypes.DATEONLY(),
      allowNull: false
    },
    zonas_de_juego_id: dataTypes.BIGINT(10),
    auto_valoracion_id: dataTypes.BIGINT(10),
    deportes_players_id: dataTypes.BIGINT(10),
    deportes_players_id2: dataTypes.BIGINT(10)
  };
  let config = {
    tableName: 'users_players',
    timestamps: false,
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
    // deletedAt: false
  }
  const UserPlayer = sequelize.define(alias, cols, config);

  UserPlayer.associate = function (models) {

    UserPlayer.hasMany(models.ImagenPlayer, {
      as: "imagenPlayer",
      foreignKey: "users_players_id"
    })

    //   UserPlayer.belongsToMany(models.Deporte, {
    //     as: "deporte",
    //     through: 'deportes_users_player',
    //     foreignKey: 'user_players_id',
    //     otherKey: 'deportes_id',
    //     timestamps: false
    //   })
    UserPlayer.hasMany(models.TelefonoPlayer, {
      as: "telefono",
      foreignKey: "users_players_id"
    })
    UserPlayer.hasMany(models.DiaHorarioPlayer, {
      as: "diaYhora",
      foreignKey: "users_players_id"
    })
    //  UserPlayer.belongsToMany(models.DiaPlayer, HoraPlayer, {
    //   as: "dia_hora",
    //   through: 'dias_horarios_users_players',
    //   foreignKey: 'user_players_id',
    //   otherKey: 'dias_players_id',
    //   otherKey: 'horas_players_id',
    //   timestamps: false
    //  })
    UserPlayer.belongsTo(models.ZonaDeJuego, {
      as: "zonas",
      foreignKey: "zonas_de_juego_id"
    })
    UserPlayer.belongsTo(models.AutoValoracion, {
      as: "autoV",
      foreignKey: "auto_valoracion_id"
    })
    UserPlayer.belongsTo(models.Deporte, {
      as: "deporte1",
      foreignKey: "deportes_players_id"
    })
    UserPlayer.belongsTo(models.Deporte, {
      as: "deporte2",
      foreignKey: "deportes_players_id2"
    })
  }


  return UserPlayer;

}