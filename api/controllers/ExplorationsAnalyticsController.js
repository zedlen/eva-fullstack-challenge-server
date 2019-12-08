/**
 * ExplorationsAnalyticsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  /**
   * This fuction will list the bookings with its exploration results
   * is needed to be sended by query params the following params:
   * date_start = date string from when the search should take place the format of date have to be: YYYY-MM-DD
   * date_end = date string until when the search should take place the format of date have to be: YYYY-MM-DD
   * clinic = the name of the clinic to search, it have to ve in upper case
   * mode = the mode of the filter for medications only this two are accepted: LAX, STRICT
   * medications = an array of medications to filter, i.e.: ["HORMONE_THERAPY","ANTIBIOTICS"]
   * 
   * All of its params are requiered
   */
  consumedMedicationsAnalytics : async function(req,res){
    const dateStart = req.query.date_start;
    if (dateStart === undefined) {
      return res.status(400).json({error:'date_start is requiered in query params.'});
    }
    const dateEnd = req.query.date_end;
    if (dateEnd === undefined) {
      return res.status(400).json({error:'date_end is requiered in query params.'});
    }
    const clinic = req.query.clinic;
    if (clinic === undefined) {
      return res.status(400).json({error:'clinic is requiered in query params.'});
    }
    const mode = req.query.mode;
    if (mode === undefined) {
      return res.status(400).json({error:'mode is requiered in query params.'});
    }
    if (mode !=='STRICT' && mode !=='LAX') {
      return res.status(400).json({error:'Not aviable mode.'});
    }
    const medications = req.query.medications;
    if (medications === undefined) {
      return res.status(400).json({error:'medications is requiered in query params.'});
    }
    var resultQuery = await Bookings.find({
      datetime: { '>': dateStart, '<': dateEnd },
      clinicName: clinic
    }).populate('exploration')
    const result = resultQuery.map(item =>{
      item.exploration = item.exploration? item.exploration[0]:{consumedMedications: '[]' };
      return item;
    }).filter(item =>{
      let bookingMedications = JSON.parse(item.exploration.consumedMedications);
      let medicationsSearch = JSON.parse(medications);
      
      if (mode === 'LAX') {
        return bookingMedications.some( ai => medicationsSearch.includes(ai) );
      }
      if (mode === 'STRICT') {
        return medicationsSearch.every( ai => bookingMedications.includes(ai) ) && medicationsSearch.length === bookingMedications.length ;
      }
      return true;
    });
    return res.json(result);
  }

};

