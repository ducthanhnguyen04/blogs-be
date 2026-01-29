const model = require("../models/index");
const AuthoritiesModel = model.Authority;
class Authorities {
  async getAll(req, res) {
    try {
      const authorities = await AuthoritiesModel.findAll();
      return res.status(200).json({
        success: true,
        data: authorities
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "BUG!"
      });
    }
  }
}
module.exports = new Authorities();