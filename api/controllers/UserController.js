module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
  getOneUser: function (req, res) {
    if (req.body) {
      User.getOneUser(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  },
  saveUser: function (req, res) {
    if (req.body) {
      User.saveUser(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  },
  index: function (req, res) {
    res.json({
      name: "Hello World"
    });
  },

  loginFacebook: function (req, res) {
    if (req.query.returnUrl) {
      req.session.returnUrl = req.query.returnUrl;
    }
    passport.authenticate(
      "facebook", {
        scope: ["public_profile", "email"],
        successRedirect: "/",
        failureRedirect: "/"
      },
      res.socialLoginFacebook
    )(req, res);
  },
  loginGoogle: function (req, res) {
    if (req.query.returnUrl) {
      req.session.returnUrl = req.query.returnUrl;
    }
    console.log(req.session.returnUrl);
    var verifyUrl = req.session.returnUrl;
    var verifiedUrl = /backend/.test(verifyUrl);
    console.log(verifiedUrl);
    if (!verifiedUrl) {
      passport.authenticate(
        "google", {
          scope: ["openid", "profile", "email"],
          failureRedirect: "/"
        },
        res.socialLoginGoogle
      )(req, res);
    } else {
      passport.authenticate(
        "google", {
          scope: ["openid", "profile", "email"],
          failureRedirect: "/"
        },
        res.socialLogin
      )(req, res);
    }
  },

  profile: function (req, res) {
    if (req.body && req.body.accessToken) {
      User.profile(req.body, res.callback);
    } else {
      res.callback("Please provide Valid AccessToken", null);
    }
  },

  pdf: function (req, res) {
    var html = fs.readFileSync("./views/pdf/demo.ejs", "utf8");
    var options = {
      format: "A4"
    };
    var id = mongoose.Types.ObjectId();
    var newFilename = id + ".pdf";
    var writestream = gfs.createWriteStream({
      filename: newFilename
    });
    writestream.on("finish", function () {
      res.callback(null, {
        name: newFilename
      });
    });
    pdf.create(html).toStream(function (err, stream) {
      stream.pipe(writestream);
    });
  },
  backupDatabase: function (req, res) {
    res.connection.setTimeout(200000000);
    req.connection.setTimeout(200000000);
    var q = req.host.search("127.0.0.1");
    if (q >= 0) {
      _.times(20, function (n) {
        var name = moment()
          .subtract(5 + n, "days")
          .format("ddd-Do-MMM-YYYY");
        exec("cd backup && rm -rf " + name + "*", function (
          err,
          stdout,
          stderr
        ) {});
      });
      var jagz = _.map(mongoose.models, function (Model, key) {
        var name = Model.collection.collectionName;
        return {
          key: key,
          name: name
        };
      });
      res.json("Files deleted and new has to be created.");
      jagz.push({
        key: "fs.chunks",
        name: "fs.chunks"
      }, {
        key: "fs.files",
        name: "fs.files"
      });
      var isBackup = fs.existsSync("./backup");
      if (!isBackup) {
        fs.mkdirSync("./backup");
      }
      var mom = moment();
      var folderName = "./backup/" + mom.format("ddd-Do-MMM-YYYY-HH-mm-SSSSS");
      var retVal = [];
      fs.mkdirSync(folderName);
      async.eachSeries(
        jagz,
        function (obj, callback) {
          exec(
            "mongoexport --db " +
            database +
            " --collection " +
            obj.name +
            " --out " +
            folderName +
            "/" +
            obj.name +
            ".json",
            function (data1, data2, data3) {
              retVal.push(
                data3 + " VALUES OF " + obj.name + " MODEL NAME " + obj.key
              );
              callback();
            }
          );
        },
        function () {
          // res.json(retVal);
        }
      );
    } else {
      res.callback("Access Denied for Database Backup");
    }
  },
  getAllMedia: function (req, res) {
    Media.getAllMedia(req.body, res.callback);
  },
  sendmail: function (req, res) {
    Config.sendEmail(
      "chintan@wohlig.com",
      "jagruti@wohlig.com",
      "first email from endgrid",
      "",
      "<html><body>dome content</body></html>"
    );
  },
  removeUserRelationMember: function (req, res) {
    if (req.body) {
      User.removeUserRelationMember(
        req.body.userId,
        req.body.mobile,
        res.callback
      );
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  },
  verifyUserWithOtpWhileSignUP: function (req, res) {
    if (req.body) {
      User.verifyUserWithOtpWhileSignUP(
        req.body.mobile,
        req.body.otp,
        req.body.name,
        req.body.email,
        res.callback
      );
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  },
  verifyUserWithOtp: function (req, res) {
    if (req.body) {
      User.verifyUserWithOtp(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  },
  verifyUser: function (req, res) {
    if (req.body) {
      User.verifyUser(req.body.mobile, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  },

  sendOtp: function (req, res) {
    if (req.body) {
      User.sendOtp(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  },

  sendOtpTest: function (req, res) {
    if (req.body) {
      User.sendOtpTest(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  },

  addUserRelationMember: function (req, res) {
    if (req.body) {
      User.addUserRelationMember(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  },

  addRelation: function (req, res) {
    if (req.body) {
      User.addRelation(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  },

  getAllMembersForSearch: function (req, res) {
    if (req.body) {
      User.getAllMembersForSearch(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  },

  getConfig: function (req, res) {
    res.json(env);
  },

  sendMobileOtp: function (req, res) {
    if (req.body) {
      User.sendMobileOtp(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  },

  verifyMobileOtp: function (req, res) {
    if (req.body) {
      User.verifyMobileOtp(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  },

  searchUser: function (req, res) {
    if (req.body) {
      User.searchUser(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  },
  saveUpdatedData: function (req, res) {
    if (req.body) {
      User.saveUpdatedData(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  },
  verifyEmail: function (req, res) {
    if (req.body) {
      User.verifyEmail(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  },
  addressEditEmail: function (req, res) {
    if (req.body) {
      User.addressEditEmail(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  },
  sendEmailToFamily: function (req, res) {
    if (req.body) {
      User.sendEmailToFamily(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  },
  saveEditedUSer: function (req, res) {
    if (req.body) {
      User.saveEditedUSer(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  },
  saveProfilePic: function (req, res) {
    if (req.body) {
      User.saveProfilePic(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  },
  searchUsers: function (req, res) {
    if (req.body) {
      User.searchUsers(req.body, res.callback);
    } else {
      res.json({
        value: false,
        data: {
          message: "Invalid Request"
        }
      });
    }
  }

  // verifyEmail: function (req, res) {
  //   User.verifyEmail(req.query, function (err, data) {
  //     if (err) {
  //       res.send("There was some error Processing Request");
  //     } else {
  //       res.send("Your Email is verified Successfully");
  //     }
  //   });
  // },
};
module.exports = _.assign(module.exports, controller);