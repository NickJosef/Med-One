const db = require("../server");
const ErrorHandler = require("../utils/ErrorHandler");

exports.getAllSensorDatabyUser = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("Please Enter Your ID", 400));
  }

  let sqlquery = `SELECT au.user_id, au.name,  (SELECT bp.bp_value FROM a0to3z5f_medical.blood_pressures AS bp WHERE bp.user_id = au.user_id LIMIT 1) as bp_value,
  (SELECT bp.upper_blood_pressure FROM a0to3z5f_medical.blood_pressures AS bp WHERE bp.user_id = au.user_id LIMIT 1) as upper_blood_pressure,
  (SELECT bpm.bpm_value FROM a0to3z5f_medical.bpm WHERE bpm.user_id = au.user_id LIMIT 1) as bpm_value,
  (SELECT bpm.oxygen_level FROM a0to3z5f_medical.bpm WHERE bpm.user_id = au.user_id LIMIT 1) as oxygen_level,
  (SELECT gl.glucose_level FROM a0to3z5f_medical.glucose AS gl WHERE gl.user_id = au.user_id LIMIT 1) as glucose_level,
  (SELECT v.file_name FROM a0to3z5f_medical.video_file AS v WHERE v.user_id = au.user_id LIMIT 1) as video_file,
  au.created_at
  FROM a0to3z5f_medical.audios AS au WHERE au.user_id = "${id}" `;

  db.query(sqlquery, (err, result) => {
    if (err) {
      return next(new ErrorHandler(err, 400));
    } else {
      res.status(200).json({
        status: "success",
        length: result.length,
        data: result,
      });
    }
  });
};
